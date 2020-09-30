import { Command, ICommand } from "./Command";
import { dto, entity } from "@reservation-gql-react/interfaces-layer";
export declare class ReservationCommand extends Command<dto.IReservation> implements ICommand<dto.IReservation> {
    static readonly MaxCount = 10;
    constructor(connectionString: string);
    all(params?: {
        first?: number | undefined;
        offset?: number | undefined;
    }): Promise<dto.IReservation[]>;
    find(filter: {
        start: string;
        end?: string | undefined;
        offset?: number | undefined;
        first?: number | undefined;
    }): Promise<dto.IReservation[]>;
    get(id: number, closeDb?: boolean): Promise<dto.IReservation>;
    set(input: entity.IReservation): Promise<dto.IReservation>;
    del(id: number): Promise<dto.IReservation>;
    private cmdFlowGet;
}
//# sourceMappingURL=ReservationCommand.d.ts.map