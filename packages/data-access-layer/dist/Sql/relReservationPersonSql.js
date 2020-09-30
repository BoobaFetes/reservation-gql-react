"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.relReservationPersonSql = void 0;
exports.relReservationPersonSql = {
    findPersonIds: (ids) => `SELECT reservationId, personId FROM relReservationPerson WHERE reservationId in (${ids.join(",")})`,
    findReservationIds: `SELECT reservationId, personId FROM relReservationPerson WHERE personId = $personId`,
    insert: `INSERT INTO relReservationPerson (reservationId, personId) VALUES ($reservationId, $personId);`,
    del: `DELETE FROM relReservationPerson WHERE reservationId = $reservationId;`,
};
//# sourceMappingURL=relReservationPersonSql.js.map