"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rootValue = void 0;
const reservationResolver_1 = require("./reservationResolver");
const personResolver_1 = require("./personResolver");
exports.rootValue = ({ personService, reservationService, }) => (Object.assign(Object.assign({}, reservationResolver_1.reservationResolver(reservationService)), personResolver_1.personResolver(personService)));
//# sourceMappingURL=index.js.map