import { MockGuild } from "../mocks/MockGuild";
import { MockMember } from "../mocks/MockMember";

export interface BanParameters {
  guild: MockGuild;
  member: MockMember;
  reason: string;
}
