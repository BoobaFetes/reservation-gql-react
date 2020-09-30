"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServices = void 0;
const data_access_layer_1 = require("@reservation-gql-react/data-access-layer");
const PersonService_1 = require("./PersonService");
const ReservationService_1 = require("./ReservationService");
var ReservationService_2 = require("./ReservationService");
Object.defineProperty(exports, "ReservationService", { enumerable: true, get: function () { return ReservationService_2.ReservationService; } });
var PersonService_2 = require("./PersonService");
Object.defineProperty(exports, "PersonService", { enumerable: true, get: function () { return PersonService_2.PersonService; } });
function createServices(connectionString = ":memory:") {
    data_access_layer_1.runCreateDbScript(connectionString);
    const personCmd = new data_access_layer_1.PersonCommand(connectionString);
    const reservationCmd = new data_access_layer_1.ReservationCommand(connectionString);
    return {
        personService: new PersonService_1.PersonService(personCmd),
        reservationService: new ReservationService_1.ReservationService(reservationCmd),
    };
}
exports.createServices = createServices;
//# sourceMappingURL=index.js.map