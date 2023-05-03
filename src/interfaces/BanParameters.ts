import { MockGuild } from "../mocks/MockGuild";
import { MockUser } from "../mocks/MockUser";

export interface BanParameters {
  guild: MockGuild;
  user: MockUser;
  reason: string;
}
