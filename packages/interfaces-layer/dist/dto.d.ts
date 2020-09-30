import { entity } from "./entity";
export declare namespace dto {
    interface IDbObject {
        id: number;
    }
    interface IPerson extends IDbObject, Omit<entity.IPerson, "id" | "persons"> {
    }
    interface IReservation extends IDbObject, Omit<entity.IReservation, "id" | "persons"> {
        persons: entity.IPerson[];
    }
    const getRoleNames: (roleFlag: entity.RoleFlag) => string[];
}
//# sourceMappingURL=dto.d.ts.map