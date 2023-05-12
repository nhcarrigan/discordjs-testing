import {
  ApplicationCommandOptionType,
  ApplicationCommandType,
} from "discord.js";

import { MockAttachment } from "../mocks/MockAttachment";
import { MockChannel } from "../mocks/MockChannel";
import { MockMessage } from "../mocks/MockMessage";
import { MockRole } from "../mocks/MockRole";
import { MockUser } from "../mocks/MockUser";

export type OptionParameters =
  | StringOptionParameters
  | UserOptionParameters
  | BooleanOptionParameters
  | IntegerOptionParameters
  | ChannelOptionParameters
  | MentionableOptionParameters
  | NumberOptionParameters
  | RoleOptionParameters
  | AttachmentOptionParameters
  | MessageOptionParameters;
export interface StringOptionParameters {
  name: string;
  value: string;
  type: ApplicationCommandOptionType.String;
  required?: boolean;
}

export interface UserOptionParameters {
  name: string;
  value: MockUser;
  type: ApplicationCommandOptionType.User;
  required?: boolean;
}

export interface BooleanOptionParameters {
  name: string;
  value: boolean;
  type: ApplicationCommandOptionType.Boolean;
  required?: boolean;
}

export interface IntegerOptionParameters {
  name: string;
  value: number;
  type: ApplicationCommandOptionType.Integer;
  required?: boolean;
}

export interface ChannelOptionParameters {
  name: string;
  value: MockChannel;
  type: ApplicationCommandOptionType.Channel;
  required?: boolean;
}

export interface MentionableOptionParameters {
  name: string;
  value: MockUser | MockChannel | MockRole;
  type: ApplicationCommandOptionType.Mentionable;
  required?: boolean;
}

export interface NumberOptionParameters {
  name: string;
  value: number;
  type: ApplicationCommandOptionType.Number;
  required?: boolean;
}

export interface RoleOptionParameters {
  name: string;
  value: MockRole;
  type: ApplicationCommandOptionType.Role;
  required?: boolean;
}

export interface AttachmentOptionParameters {
  name: string;
  value: MockAttachment;
  type: ApplicationCommandOptionType.Attachment;
  required?: boolean;
}

export interface MessageOptionParameters {
  name: string;
  value: MockMessage;
  type: ApplicationCommandType.Message;
  required?: boolean;
}
