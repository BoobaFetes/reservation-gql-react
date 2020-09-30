import { dto, entity } from "@reservation-gql-react/interfaces-layer";
import { ReservationCommand } from "@reservation-gql-react/data-access-layer";
export declare class ReservationService {
    private readonly command;
    constructor(reservationCmd: ReservationCommand);
    all(params?: {
        first?: number;
        offset?: number;
    }): Promise<dto.IReservation[]>;
    find(filter: {
        start: string;
        end?: string;
        offset?: number;
        first?: number;
    }): Promise<dto.IReservation[]>;
    get(id: number): Promise<dto.IReservation>;
    set(entry: entity.IReservation): Promise<dto.IReservation>;
    del(id: number): Promise<dto.IReservation>;
}
//# sourceMappingURL=index.d.ts.map