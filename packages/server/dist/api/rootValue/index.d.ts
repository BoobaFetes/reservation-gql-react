import { PersonService, ReservationService } from "@reservation-gql-react/business-layer";
export interface RootValueParams {
    personService: PersonService;
    reservationService: ReservationService;
}
export declare const rootValue: ({ personService, reservationService, }: RootValueParams) => {
    allPerson: ({ offset, first }: import("./types").Paginable) => Promise<import("@reservation-gql-react/interfaces-layer").dto.IPerson[]>;
    getPerson: ({ id }: import("@reservation-gql-react/interfaces-layer").dto.IDbObject) => Promise<import("@reservation-gql-react/interfaces-layer").dto.IPerson>;
    delPerson: ({ id }: import("@reservation-gql-react/interfaces-layer").dto.IDbObject) => Promise<import("@reservation-gql-react/interfaces-layer").dto.IPerson>;
    setPerson: ({ entry }: import("./types").EntityType<import("@reservation-gql-react/interfaces-layer").entity.IPerson>) => Promise<import("@reservation-gql-react/interfaces-layer").dto.IPerson>;
    allReservation: ({ offset, first }: import("./types").Paginable) => Promise<import("@reservation-gql-react/interfaces-layer").dto.IReservation[]>;
    findReservation: (filter: {
        start: string;
        end?: string | undefined;
        offset?: number | undefined;
        first?: number | undefined;
    }) => Promise<import("@reservation-gql-react/interfaces-layer").dto.IReservation[]>;
    getReservation: ({ id }: import("@reservation-gql-react/interfaces-layer").dto.IDbObject) => Promise<import("@reservation-gql-react/interfaces-layer").dto.IReservation | null>;
    delReservation: ({ id }: import("@reservation-gql-react/interfaces-layer").dto.IDbObject) => Promise<import("@reservation-gql-react/interfaces-layer").dto.IReservation | null>;
    setReservation: ({ entry }: import("./types").EntityType<import("@reservation-gql-react/interfaces-layer").entity.IReservation>) => Promise<import("@reservation-gql-react/interfaces-layer").dto.IReservation>;
};
//# sourceMappingURL=index.d.ts.map