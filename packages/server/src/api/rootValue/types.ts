import { entity, dto } from "@reservation-gql-react/interfaces-layer";

export type Paginable = {
  offset?: number;
  first?: number;
};

export type Id = dto.IDbObject;
export type EntityType<T extends entity.IDbObject> = { entry: T };