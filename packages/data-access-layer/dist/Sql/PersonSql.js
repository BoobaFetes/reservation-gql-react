"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.personSql = void 0;
const baseQuery = `SELECT p.id, p.authName, p.authId, p.email, p.famillyName, p.nickName, p.roleFlag FROM person p`;
exports.personSql = {
    all: `${baseQuery} LIMIT $first OFFSET $offset;`,
    find: `${baseQuery} WHERE p.email = "$email";`,
    findByIds: (ids) => `${baseQuery} WHERE p.id in (${ids.join(",")});`,
    get: `${baseQuery} WHERE p.id = $id;`,
    insert: `
    INSERT INTO person (authName, authId, email, famillyName, nickName, roleFlag) 
    VALUES (
      $authName,
      $authId,
      $email,
      $famillyName,
      $nickName,
      $roleFlag
    );`,
    update: `
    UPDATE person
    SET authName = $authName, 
        authId = $authId, 
        email = $email, 
        famillyName = $famillyName, 
        nickName = $nickName, 
        roleFlag = $roleFlag
    WHERE id = $id;`,
    del: `DELETE FROM person WHERE id = $id;`,
};
//# sourceMappingURL=PersonSql.js.map