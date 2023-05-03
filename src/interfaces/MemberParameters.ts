import { MockGuild } from "../mocks/MockGuild";
import { MockUser } from "../mocks/MockUser";

export interface MemberParameters {
  id: string;
  user: MockUser;
  guild: MockGuild;
}
