import { Command, ICommand } from "./Command";
import { dto, entity } from "@reservation-gql-react/interfaces-layer";
export declare class PersonCommand extends Command<dto.IPerson> implements ICommand<dto.IPerson> {
    static readonly TableName = "person";
    constructor(connectionString: string);
    all(params?: {
        first?: number | undefined;
        offset?: number | undefined;
    }): Promise<dto.IPerson[]>;
    find(email: string): Promise<dto.IPerson>;
    get(id: number): Promise<dto.IPerson>;
    set(input: entity.IPerson): Promise<dto.IPerson>;
    del(id: number): Promise<dto.IPerson>;
    private cmdFlowGet;
}
//# sourceMappingURL=PersonCommand.d.ts.map