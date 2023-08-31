import { MockGuild } from "../mocks/MockGuild";
import { MockUser } from "../mocks/MockUser";

/**
 * Parameters for the MockMember constructor.
 *
 * @interface MemberParameters
 * @property {MockUser} user - The user the member is based on.
 * @property {MockGuild} guild - The guild the member is in.
 * @property {boolean?} bannable - Whether the member is bannable.
 * @property {boolean?} kickable - Whether the member is kickable.
 */
export interface MemberParameters {
  user: MockUser;
  guild: MockGuild;
  bannable?: boolean;
  kickable?: boolean;
}
