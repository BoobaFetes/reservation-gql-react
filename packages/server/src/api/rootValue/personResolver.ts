import { PersonService } from "@reservation-gql-react/business-layer";
import { Paginable, Id, EntityType } from "./types";
import { entity } from "@reservation-gql-react/interfaces-layer";

export const personResolver = (personService: PersonService) => ({
  allPerson: async ({ offset, first }: Paginable) => {
    return await personService.all({ offset, first });
  },
  getPerson: async ({ id }: Id) => {
    return await personService.get(id);
  },
  delPerson: async ({ id }: Id) => {
    return await personService.del(id);
  },
  setPerson: async ({ entry }: EntityType<entity.IPerson>) => {
    return await personService.set(entry);
  },
});
