"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.entity = void 0;
var entity;
(function (entity) {
    let RoleEnum;
    (function (RoleEnum) {
        RoleEnum[RoleEnum["Customer"] = 1] = "Customer";
        RoleEnum[RoleEnum["Owner"] = 2] = "Owner";
        RoleEnum[RoleEnum["Employee"] = 4] = "Employee";
        RoleEnum[RoleEnum["Administrator"] = 8] = "Administrator";
    })(RoleEnum = entity.RoleEnum || (entity.RoleEnum = {}));
    let ReservationType;
    (function (ReservationType) {
        ReservationType[ReservationType["Cours"] = 1] = "Cours";
        ReservationType[ReservationType["Ballade"] = 2] = "Ballade";
        ReservationType[ReservationType["Competition"] = 3] = "Competition";
    })(ReservationType = entity.ReservationType || (entity.ReservationType = {}));
})(entity = exports.entity || (exports.entity = {}));
//# sourceMappingURL=entity.js.map