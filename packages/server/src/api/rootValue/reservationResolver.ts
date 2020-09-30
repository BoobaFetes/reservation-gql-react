import { ReservationService } from "@reservation-gql-react/business-layer";
import { Paginable, Id, EntityType } from "./types";
import { entity } from "@reservation-gql-react/interfaces-layer";

export const reservationResolver = (
  reservationService: ReservationService
) => ({
  allReservation: async ({ offset, first }: Paginable) => {
    return await reservationService.all({ offset, first });
  },
  findReservation: async (filter: {
    start: string;
    end?: string;
    offset?: number;
    first?: number;
  }) => {
    return await reservationService.find(filter);
  },
  getReservation: async ({ id }: Id) => {
    if (!id) return null;
    return await reservationService.get(id);
  },
  delReservation: async ({ id }: Id) => {
    if (!id) return null;
    return await reservationService.del(id);
  },
  setReservation: async ({ entry }: EntityType<entity.IReservation>) => {
    return await reservationService.set(entry);
  },
});
