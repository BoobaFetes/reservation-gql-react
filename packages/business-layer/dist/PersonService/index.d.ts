import { PersonCommand } from "@reservation-gql-react/data-access-layer";
import { dto, entity } from "@reservation-gql-react/interfaces-layer";
export declare class PersonService {
    private readonly command;
    constructor(command: PersonCommand);
    all(params?: {
        first?: number | undefined;
        offset?: number | undefined;
    }): Promise<dto.IPerson[]>;
    get(id: number): Promise<dto.IPerson>;
    set(entry: entity.IPerson): Promise<dto.IPerson>;
    del(id: number): Promise<dto.IPerson>;
}
//# sourceMappingURL=index.d.ts.map