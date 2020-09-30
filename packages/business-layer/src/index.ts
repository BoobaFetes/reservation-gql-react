import {
  PersonCommand,
  ReservationCommand,
  runCreateDbScript,
} from "@reservation-gql-react/data-access-layer";
import { PersonService } from "./PersonService";
import { ReservationService } from "./ReservationService";

export { ReservationService } from "./ReservationService";
export { PersonService } from "./PersonService";

export function createServices(connectionString: string = ":memory:") {
  runCreateDbScript(connectionString);

  const personCmd = new PersonCommand(connectionString);
  const reservationCmd = new ReservationCommand(connectionString);

  return {
    personService: new PersonService(personCmd),
    reservationService: new ReservationService(reservationCmd),
  };
}
