import { ApplicationCommandOptionType } from "discord.js";

export interface OptionParameters {
  name: string;
  value: unknown;
  type: ApplicationCommandOptionType;
  required?: boolean;
}
