import { dto, entity } from "@reservation-gql-react/interfaces-layer";
import { Database } from "sqlite3";
export interface ICommand<T extends dto.IDbObject> {
    all(params?: {
        first?: number;
        offset?: number;
    }): Promise<T[]>;
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
export declare class Command<T extends dto.IDbObject> {
    private connectionString;
    constructor(connectionString: string);
    protected exec<Result = T | T[]>(action: (params: CommandAction<Result>) => void, closeDb?: boolean): Promise<Result>;
    protected setCmd(input: entity.IDbObject): "update" | "insert";
}
//# sourceMappingURL=Command.d.ts.map