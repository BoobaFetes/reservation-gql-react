export declare namespace entity {
    interface IDbObject {
        id: number;
    }
    enum RoleEnum {
        Customer = 1,
        Owner = 2,
        Employee = 4,
        Administrator = 8
    }
    type RoleFlag = number;
    enum ReservationType {
        Cours = 1,
        Ballade = 2,
        Competition = 3
    }
    interface IPerson extends IDbObject {
        authName: string;
        authId: string;
        email: string;
        famillyName: string;
        nickName: string;
        roleFlag: RoleFlag;
    }
    type QuarterHour = 15 | 30 | 45 | 60;
    interface IReservation extends IDbObject {
        start: string;
        end: string;
        persons: number[];
        type: ReservationType;
    }
}
//# sourceMappingURL=entity.d.ts.map