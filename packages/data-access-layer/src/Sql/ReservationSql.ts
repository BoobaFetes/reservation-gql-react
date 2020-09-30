import { entity } from "@reservation-gql-react/interfaces-layer";
import moment from "moment";

const baseQuery = `SELECT id, start, end, type FROM reservation r`;

export const reservationSql = {
  all: `${baseQuery} ORDER BY r.start LIMIT $first OFFSET $offset;`,
  find: (end?: string) => `${baseQuery}
    WHERE r.start >= $start 
      ${end ? `AND r.start <= "${end}"` : ""}
    ORDER BY r.start
    LIMIT $first OFFSET $offset`,
  get: `${baseQuery} WHERE r.id = $id;`,
  insert: `INSERT INTO reservation (start, end, type) VALUES ($start, $end, $type)`,
  update: `UPDATE reservation SET start = $start, end = $end, type = $type WHERE id = $id`,
  del: `DELETE FROM reservation WHERE id = $id;`,
};
