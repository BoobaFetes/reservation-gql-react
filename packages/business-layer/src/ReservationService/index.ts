import { dto, entity } from "@reservation-gql-react/interfaces-layer";
import { ReservationCommand } from "@reservation-gql-react/data-access-layer";
import { reservationSql } from "@reservation-gql-react/data-access-layer/dist/Sql/ReservationSql";

export class ReservationService {
  private readonly command: ReservationCommand;

  constructor(reservationCmd: ReservationCommand) {
    this.command = reservationCmd;
  }

  public async all(params?: {
    first?: number;
    offset?: number;
  }): Promise<dto.IReservation[]> {
    return await this.command.all(params);
  }
  public async find(filter: {
    start: string;
    end?: string;
    offset?: number;
    first?: number;
  }) {
    return await this.command.find(filter);
  }
  public async get(id: number): Promise<dto.IReservation> {
    return await this.command.get(id);
  }
  public async set(entry: entity.IReservation): Promise<dto.IReservation> {
    return await this.command.set(entry);
  }
  public async del(id: number): Promise<dto.IReservation> {
    return await this.command.del(id);
  }
}
