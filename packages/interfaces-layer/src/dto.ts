import { entity } from "./entity";

export namespace dto {
  export interface IDbObject {
    id: number;
  }

  export interface IPerson
    extends IDbObject,
      Omit<entity.IPerson, "id" | "persons"> {}

  export interface IReservation
    extends IDbObject,
      Omit<entity.IReservation, "id" | "persons"> {
    persons: entity.IPerson[];
  }

  const addRoleName = (
    array: string[],
    flag: entity.RoleFlag,
    enumValue: entity.RoleEnum
  ) => {
    if ((flag & enumValue) !== enumValue) {
      return;
    }
    array.push(entity.RoleEnum[enumValue]);
  };
  export const getRoleNames = (roleFlag: entity.RoleFlag) => {
    const result: string[] = [];

    addRoleName(result, roleFlag, entity.RoleEnum.Administrator);
    addRoleName(result, roleFlag, entity.RoleEnum.Employee);
    addRoleName(result, roleFlag, entity.RoleEnum.Owner);
    addRoleName(result, roleFlag, entity.RoleEnum.Customer);

    return result;
  };
}
