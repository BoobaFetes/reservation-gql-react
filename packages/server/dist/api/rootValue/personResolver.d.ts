import { PersonService } from "@reservation-gql-react/business-layer";
import { Paginable, Id, EntityType } from "./types";
import { entity } from "@reservation-gql-react/interfaces-layer";
export declare const personResolver: (personService: PersonService) => {
    allPerson: ({ offset, first }: Paginable) => Promise<import("@reservation-gql-react/interfaces-layer").dto.IPerson[]>;
    getPerson: ({ id }: Id) => Promise<import("@reservation-gql-react/interfaces-layer").dto.IPerson>;
    delPerson: ({ id }: Id) => Promise<import("@reservation-gql-react/interfaces-layer").dto.IPerson>;
    setPerson: ({ entry }: EntityType<entity.IPerson>) => Promise<import("@reservation-gql-react/interfaces-layer").dto.IPerson>;
};
//# sourceMappingURL=personResolver.d.ts.map