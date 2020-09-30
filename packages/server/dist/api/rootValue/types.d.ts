import { entity, dto } from "@reservation-gql-react/interfaces-layer";
export declare type Paginable = {
    offset?: number;
    first?: number;
};
export declare type Id = dto.IDbObject;
export declare type EntityType<T extends entity.IDbObject> = {
    entry: T;
};
//# sourceMappingURL=types.d.ts.map