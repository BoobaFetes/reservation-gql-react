import { Command, ICommand, CommandAction } from "./Command";
import { dto, entity } from "@reservation-gql-react/interfaces-layer";
import { personSql } from "../Sql/PersonSql";

export class PersonCommand
  extends Command<dto.IPerson>
  implements ICommand<dto.IPerson> {
  public static readonly TableName = "person";

  constructor(connectionString: string) {
    super(connectionString);
  }

  public all(
    params: {
      first?: number | undefined;
      offset?: number | undefined;
    } = {}
  ): Promise<dto.IPerson[]> {
    return this.exec<dto.IPerson[]>(({ db, resolve, reject }) => {
      db.all(
        personSql.all,
        { $first: params.first || 10, $offset: params.offset || 0 },
        function (err, rows: entity.IPerson[]) {
          if (err) {
            reject(err);
          } else {
            resolve(rows as dto.IPerson[]);
          }
        }
      );
      db.close();
    });
  }

  public find(email: string): Promise<dto.IPerson> {
    return this.exec<dto.IPerson>(({ db, resolve, reject }) => {
      db.get(personSql.find, { $email: email }, function (
        err,
        rows: entity.IPerson
      ) {
        if (err) {
          reject(err);
        } else {
          resolve(rows as dto.IPerson);
        }
      });
      db.close();
    });
  }
  public get(id: number): Promise<dto.IPerson> {
    return this.exec<dto.IPerson>(({ db, resolve, reject }) => {
      this.cmdFlowGet({ db, resolve, reject }, id);
      db.close();
    });
  }
  public set(input: entity.IPerson): Promise<dto.IPerson> {
    const that = this;
    const cmd = this.setCmd(input);

    return this.exec<dto.IPerson>(({ db, resolve, reject }) => {
      db.run(
        personSql[cmd],
        {
          $authName: input.authName,
          $authId: input.authId,
          $email: "bidule",//input.email,
          $famillyName: input.famillyName,
          $nickName: input.nickName,
          $roleFlag: 0//input.roleFlag,
        },
        async function (err) {
          if (err) {
            reject(err);
          } else {
            that.cmdFlowGet(
              { db, resolve, reject },
              cmd === "insert" ? this.lastID : input.id
            );
          }
        }
      );
      db.close();
    });
  }
  public del(id: number): Promise<dto.IPerson> {
    return this.exec<dto.IPerson>(async ({ db, resolve, reject }) => {
      let entity: dto.IPerson = await this.get(id);
      db.run(personSql.del, { $id: id }, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(entity);
        }
      });
      db.close();
    });
  }

  private cmdFlowGet(
    { db, resolve, reject }: CommandAction<dto.IPerson>,
    id: number
  ) {
    db.get(personSql.get, { $id: id }, function (err, rows: entity.IPerson) {
      if (err) {
        reject(err);
      } else {
        resolve(rows as dto.IPerson);
      }
    });
  }
}
