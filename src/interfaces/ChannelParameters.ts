import { ChannelType } from "discord.js";

import { MockGuild } from "../mocks/MockGuild";

export interface ChannelParameters {
  name: string;
  type: ChannelType;
  guild?: MockGuild;
}
