export const relReservationPersonSql = {
  findPersonIds: (ids: number[]) =>
    `SELECT reservationId, personId FROM relReservationPerson WHERE reservationId in (${ids.join(
      ","
    )})`,
  findReservationIds: `SELECT reservationId, personId FROM relReservationPerson WHERE personId = $personId`,
  insert: `INSERT INTO relReservationPerson (reservationId, personId) VALUES ($reservationId, $personId);`,
  del: `DELETE FROM relReservationPerson WHERE reservationId = $reservationId;`,
};
