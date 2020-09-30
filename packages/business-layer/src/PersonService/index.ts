import { PersonCommand } from "@reservation-gql-react/data-access-layer";
import { dto, entity } from "@reservation-gql-react/interfaces-layer";

export class PersonService {
  private readonly command: PersonCommand;

  constructor(command: PersonCommand) {
    this.command = command;
  }

  public async all(
    params: {
      first?: number | undefined;
      offset?: number | undefined;
    } = {}
  ): Promise<dto.IPerson[]> {
    return await this.command.all(params);
  }
  public async get(id: number): Promise<dto.IPerson> {
    return await this.command.get(id);
  }
  public async set(entry: entity.IPerson): Promise<dto.IPerson> {
    return await this.command.set(entry);
  }
  public async del(id: number): Promise<dto.IPerson> {
    return await this.command.del(id);
  }
}
