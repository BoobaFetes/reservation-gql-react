import { Command, ICommand, CommandAction } from "./Command";
import { dto, entity } from "@reservation-gql-react/interfaces-layer";
import moment from "moment";
import { reservationSql } from "../Sql/ReservationSql";
import { relReservationPersonSql } from "../Sql/relReservationPersonSql";
import { personSql } from "../Sql/PersonSql";

export class ReservationCommand
  extends Command<dto.IReservation>
  implements ICommand<dto.IReservation> {
  public static readonly MaxCount = 10;
  constructor(connectionString: string) {
    super(connectionString);
  }

  public async all(
    params: {
      first?: number | undefined;
      offset?: number | undefined;
    } = {}
  ): Promise<dto.IReservation[]> {
    return this.exec<dto.IReservation[]>(({ db, resolve, reject }) => {
      db.all(
        reservationSql.all,
        {
          $first: params.first || ReservationCommand.MaxCount,
          $offset: params.offset || 0,
        },
        function (err: Error | null, rows: entity.IReservation[]) {
          if (err) {
            reject(err);
          } else {
            resolve(
              rows.map(
                (r) =>
                  ({ ...(r as any), persons: undefined } as dto.IReservation)
              )
            );
          }
          db.close();
        }
      );
    });
  }
  public async find(filter: {
    start: string;
    end?: string | undefined;
    offset?: number | undefined;
    first?: number | undefined;
  }): Promise<dto.IReservation[]> {
    const that = this;
    return this.exec<dto.IReservation[]>(({ db, resolve, reject }) => {
      db.all(
        reservationSql.find(filter.end),
        {
          $start: filter.start,
          $first: filter.first || ReservationCommand.MaxCount,
          $offset: filter.offset || 0,
        },
        function (err, reservations: entity.IReservation[]) {
          if (err) {
            reject(err);
          } else {
            if (!reservations || reservations.length === 0) {
              resolve([]);
              return;
            }
            const reservationIdSet = new Set<number>(
              reservations.map((r) => r.id)
            );

            db.all(
              relReservationPersonSql.findPersonIds(
                Array.from(reservationIdSet)
              ),
              function (
                err,
                rel: Array<{ reservationId: number; personId: number }> = []
              ) {
                if (err) {
                  reject(err);
                  return;
                }

                const personByReservation = rel.reduce((mem, _rel) => {
                  if (!mem[_rel.reservationId]) {
                    mem[_rel.reservationId] = [];
                  }
                  if (!mem[_rel.reservationId].includes(_rel.personId)) {
                    mem[_rel.reservationId].push(_rel.personId);
                  }
                  return mem;
                }, {} as Record<number, number[]>);

                db.all(
                  personSql.findByIds(rel.map((p) => p.personId)),
                  function (err, persons: entity.IPerson[]) {
                    if (err) {
                      reject(err);
                      return;
                    }

                    const personByItsId = persons.reduce((mem, person) => {
                      mem[person.id] = person;
                      return mem;
                    }, {} as Record<number, entity.IPerson>);

                    const result: dto.IReservation[] = reservations.reduce(
                      (mem, resa) => {
                        mem.push({
                          ...resa,
                          persons: (personByReservation[resa.id] || []).map(
                            (pId) => personByItsId[pId]
                          ),
                        });
                        return mem;
                      },
                      [] as dto.IReservation[]
                    );

                    resolve(result);
                  }
                );
              }
            );
          }
        }
      );
      db.close();
    });
  }

  public get(id: number, closeDb: boolean = true): Promise<dto.IReservation> {
    return this.exec<dto.IReservation>((params) => {
      this.cmdFlowGet(params, id);
      if (closeDb) {
        params.db.close();
      }
    });
  }
  public async set(input: entity.IReservation): Promise<dto.IReservation> {
    const that = this;
    return this.exec<dto.IReservation>(async ({ db, resolve, reject }) => {
      const cmd = this.setCmd(input);
      const params = {
        $start: moment(input.start).format(),
        $end: moment(input.end).format(),
        $type: input.type,
      } as any;
      if (cmd === "insert") {
        params["$id"] = input.id;
      }

      db.serialize(function () {
        db.run(reservationSql[cmd], params, async function (err) {
          if (err) {
            reject(err);
            db.close();
            return;
          }
          const id = cmd === "insert" ? this.lastID : input.id;

          db.run(relReservationPersonSql.del, { $reservationId: id });
          db.parallelize(() => {
            input.persons.forEach((personId) => {
              db.run(relReservationPersonSql.insert, {
                $reservationId: id,
                $personId: personId,
              });
            });
          });
          that.cmdFlowGet({ db, resolve, reject }, id);
          db.close();
        });
      });
    });
  }
  public async del(id: number): Promise<dto.IReservation> {
    return this.exec<dto.IReservation>(async ({ db, resolve, reject }) => {
      const entity = await this.get(id);

      db.run("BEGIN TRANSACTION;");
      try {
        db.run(relReservationPersonSql.del, { $reservationId: id });
        db.run(reservationSql.del, { $id: id });
        resolve(entity);
        db.run("COMMIT;");
      } catch (error) {
        db.run("ROLLBACK;");
        reject(error);
      }
      db.close();
    });
  }
  private cmdFlowGet(
    { db, resolve, reject }: CommandAction<dto.IReservation>,
    id: number
  ) {
    db.get(reservationSql.get, { $id: id }, function (
      err,
      item: entity.IReservation
    ) {
      if (err) {
        reject(err);
      } else {
        if (!item) {
          resolve(item);
          return;
        }
        db.all(relReservationPersonSql.findPersonIds([id]), function (
          err,
          rel: Array<{ personId: number }> = []
        ) {
          if (err) {
            reject(err);
            return;
          }
          db.all(personSql.findByIds(rel.map((p) => p.personId)), function (
            err,
            rows: entity.IPerson[]
          ) {
            if (err) {
              reject(err);
              return;
            }
            resolve({ ...item, persons: rows });
          });
        });
      }
    });
  }
}
