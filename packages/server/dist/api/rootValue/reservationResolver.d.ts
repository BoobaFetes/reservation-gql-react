import { ReservationService } from "@reservation-gql-react/business-layer";
import { Paginable, Id, EntityType } from "./types";
import { entity } from "@reservation-gql-react/interfaces-layer";
export declare const reservationResolver: (reservationService: ReservationService) => {
    allReservation: ({ offset, first }: Paginable) => Promise<import("@reservation-gql-react/interfaces-layer").dto.IReservation[]>;
    findReservation: (filter: {
        start: string;
        end?: string;
        offset?: number;
        first?: number;
    }) => Promise<import("@reservation-gql-react/interfaces-layer").dto.IReservation[]>;
    getReservation: ({ id }: Id) => Promise<import("@reservation-gql-react/interfaces-layer").dto.IReservation | null>;
    delReservation: ({ id }: Id) => Promise<import("@reservation-gql-react/interfaces-layer").dto.IReservation | null>;
    setReservation: ({ entry }: EntityType<entity.IReservation>) => Promise<import("@reservation-gql-react/interfaces-layer").dto.IReservation>;
};
//# sourceMappingURL=reservationResolver.d.ts.map