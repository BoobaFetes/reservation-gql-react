import { dto, entity } from "@reservation-gql-react/interfaces-layer";
import { Database, OPEN_READWRITE } from "sqlite3";

export interface ICommand<T extends dto.IDbObject> {
  all(params?: { first?: number; offset?: number }): Promise<T[]>;
  find(filter: {} | string | number | string[] | number[]): Promise<T | T[]>;
  get(id: number): Promise<T>;
  set(input: dto.IDbObject): Promise<T>;
  del(id: number): Promise<T>;
}

export interface CommandAction<Result = dto.IDbObject | dto.IDbObject[]> {
  db: Database;
  resolve: (value?: Result | PromiseLike<Result>) => void;
  reject: (reason?: any) => void;
}
export class Command<T extends dto.IDbObject> {
  private connectionString: string;

  constructor(connectionString: string) {
    this.connectionString = connectionString;
  }

  protected exec<Result = T | T[]>(
    action: (params: CommandAction<Result>) => void,
    closeDb: boolean = true
  ): Promise<Result> {
    return new Promise((resolve, reject) => {
      const db = new Database(this.connectionString, OPEN_READWRITE, (err) => {
        if (err) {
          reject(err);
        }
      });

      try {
        action({ db, resolve, reject });
      } catch (err) {
        db.close((err) => {
          if (err) {
            reject(err);
          }
        });
        reject(err);
      }
    });
  }

  protected setCmd(input: entity.IDbObject) {
    return input.id ? "update" : "insert";
  }
}
