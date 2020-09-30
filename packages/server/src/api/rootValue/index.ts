import {
  PersonService,
  ReservationService,
} from "@reservation-gql-react/business-layer";
import { reservationResolver } from "./reservationResolver";
import { personResolver } from "./personResolver";

export interface RootValueParams {
  personService: PersonService;
  reservationService: ReservationService;
}

export const rootValue = ({
  personService,
  reservationService,
}: RootValueParams) => ({
  ...reservationResolver(reservationService),
  ...personResolver(personService),
});
