import { ChannelType } from "discord.js";

export interface ChannelParameters {
  id: string;
  name: string;
  type: ChannelType;
}
