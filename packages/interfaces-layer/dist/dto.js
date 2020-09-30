"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dto = void 0;
const entity_1 = require("./entity");
var dto;
(function (dto) {
    const addRoleName = (array, flag, enumValue) => {
        if ((flag & enumValue) !== enumValue) {
            return;
        }
        array.push(entity_1.entity.RoleEnum[enumValue]);
    };
    dto.getRoleNames = (roleFlag) => {
        const result = [];
        addRoleName(result, roleFlag, entity_1.entity.RoleEnum.Administrator);
        addRoleName(result, roleFlag, entity_1.entity.RoleEnum.Employee);
        addRoleName(result, roleFlag, entity_1.entity.RoleEnum.Owner);
        addRoleName(result, roleFlag, entity_1.entity.RoleEnum.Customer);
        return result;
    };
})(dto = exports.dto || (exports.dto = {}));
//# sourceMappingURL=dto.js.map