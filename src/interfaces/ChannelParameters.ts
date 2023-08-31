import { ChannelType } from "discord.js";

import { MockGuild } from "../mocks/MockGuild";

/**
 * Parameters for the MockChannel constructor.
 *
 * @interface ChannelParameters
 * @property {string} name - The name of the channel.
 * @property {ChannelType} type - The type of the channel.
 * @property {MockGuild?} guild - The guild the channel is in.
 */
export interface ChannelParameters {
  name: string;
  type: ChannelType;
  guild?: MockGuild;
}
