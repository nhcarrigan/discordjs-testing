import { MockGuild } from "../mocks/MockGuild";

/**
 * Parameters for the MockRole constructor.
 *
 * @interface RoleParameters
 * @property {string} name - The name of the role.
 * @property {MockGuild} guild - The guild the role is in.
 */
export interface RoleParameters {
  name: string;
  guild: MockGuild;
}
