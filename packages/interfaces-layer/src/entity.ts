export namespace entity {
  export interface IDbObject {
    id: number;
  }

  export enum RoleEnum {
    Customer = 1,
    Owner = 2,
    Employee = 4,
    Administrator = 8,
  }

  export type RoleFlag = number;
  export enum ReservationType {
    Cours = 1,
    Ballade = 2,
    Competition = 3,
  }
  export interface IPerson extends IDbObject {
    authName: string;
    authId: string;
    email: string;
    famillyName: string;
    nickName: string;
    roleFlag: RoleFlag;
  }

  export type QuarterHour = 15 | 30 | 45 | 60;
  export interface IReservation extends IDbObject {
    start: string;
    end:  string;
    persons: number[];
    type: ReservationType;
  }
}
