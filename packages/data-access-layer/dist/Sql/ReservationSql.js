"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reservationSql = void 0;
const baseQuery = `SELECT id, start, end, type FROM reservation r`;
exports.reservationSql = {
    all: `${baseQuery} ORDER BY r.start LIMIT $first OFFSET $offset;`,
    find: (end) => `${baseQuery}
    WHERE r.start >= $start 
      ${end ? `AND r.start <= "${end}"` : ""}
    ORDER BY r.start
    LIMIT $first OFFSET $offset`,
    get: `${baseQuery} WHERE r.id = $id;`,
    insert: `INSERT INTO reservation (start, end, type) VALUES ($start, $end, $type)`,
    update: `UPDATE reservation SET start = $start, end = $end, type = $type WHERE id = $id`,
    del: `DELETE FROM reservation WHERE id = $id;`,
};
//# sourceMappingURL=ReservationSql.js.map