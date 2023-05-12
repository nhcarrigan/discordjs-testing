import { MockGuild } from "../mocks/MockGuild";
import { MockUser } from "../mocks/MockUser";

export interface MemberParameters {
  user: MockUser;
  guild: MockGuild;
  bannable?: boolean;
  kickable?: boolean;
}
