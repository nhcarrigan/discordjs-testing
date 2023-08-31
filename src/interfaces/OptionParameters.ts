import {
  ApplicationCommandOptionType,
  ApplicationCommandType,
} from "discord.js";

import { MockAttachment } from "../mocks/MockAttachment";
import { MockChannel } from "../mocks/MockChannel";
import { MockMessage } from "../mocks/MockMessage";
import { MockRole } from "../mocks/MockRole";
import { MockUser } from "../mocks/MockUser";

/**
 * Accepted types for a command option.
 *
 * @type {ApplicationCommandOptionType} OptionParameters
 */
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
  | MessageOptionParameters
  | SubcommandOptionParameters;

/**
 * Parameters for adding an option to a command.
 *
 * @interface StringOptionParameters
 * @property {string} name - The name of the option.
 * @property {string} value - The value of the option.
 * @property {ApplicationCommandOptionType.String} type - The type of the option.
 * @property {boolean?} required - Whether the option is required.
 */
export interface StringOptionParameters {
  name: string;
  value: string;
  type: ApplicationCommandOptionType.String;
  required?: boolean;
}

/**
 * Parameters for adding an option to a command.
 *
 * @interface UserOptionParameters
 * @property {string} name - The name of the option.
 * @property {MockUser} value - The value of the option.
 * @property {ApplicationCommandOptionType.User} type - The type of the option.
 * @property {boolean?} required - Whether the option is required.
 */
export interface UserOptionParameters {
  name: string;
  value: MockUser;
  type: ApplicationCommandOptionType.User;
  required?: boolean;
}

/**
 * Parameters for adding an option to a command.
 *
 * @interface BooleanOptionParameters
 * @property {string} name - The name of the option.
 * @property {boolean} value - The value of the option.
 * @property {ApplicationCommandOptionType.Boolean} type - The type of the option.
 * @property {boolean?} required - Whether the option is required.
 */
export interface BooleanOptionParameters {
  name: string;
  value: boolean;
  type: ApplicationCommandOptionType.Boolean;
  required?: boolean;
}

/**
 * Parameters for adding an option to a command.
 *
 * @interface IntegerOptionParameters
 * @property {string} name - The name of the option.
 * @property {number} value - The value of the option.
 * @property {ApplicationCommandOptionType.Integer} type - The type of the option.
 * @property {boolean?} required - Whether the option is required.
 */
export interface IntegerOptionParameters {
  name: string;
  value: number;
  type: ApplicationCommandOptionType.Integer;
  required?: boolean;
}

/**
 * Parameters for adding an option to a command.
 *
 * @interface ChannelOptionParameters
 * @property {string} name - The name of the option.
 * @property {MockChannel} value - The value of the option.
 * @property {ApplicationCommandOptionType.Channel} type - The type of the option.
 * @property {boolean?} required - Whether the option is required.
 */
export interface ChannelOptionParameters {
  name: string;
  value: MockChannel;
  type: ApplicationCommandOptionType.Channel;
  required?: boolean;
}

/**
 * Parameters for adding an option to a command.
 *
 * @interface MentionableOptionParameters
 * @property {string} name - The name of the option.
 * @property {MockUser | MockChannel | MockRole} value - The value of the option.
 * @property {ApplicationCommandOptionType.Mentionable} type - The type of the option.
 * @property {boolean?} required - Whether the option is required.
 */
export interface MentionableOptionParameters {
  name: string;
  value: MockUser | MockChannel | MockRole;
  type: ApplicationCommandOptionType.Mentionable;
  required?: boolean;
}

/**
 * Parameters for adding an option to a command.
 *
 * @interface NumberOptionParameters
 * @property {string} name - The name of the option.
 * @property {number} value - The value of the option.
 * @property {ApplicationCommandOptionType.Number} type - The type of the option.
 * @property {boolean?} required - Whether the option is required.
 */
export interface NumberOptionParameters {
  name: string;
  value: number;
  type: ApplicationCommandOptionType.Number;
  required?: boolean;
}

/**
 * Parameters for adding an option to a command.
 *
 * @interface RoleOptionParameters
 * @property {string} name - The name of the option.
 * @property {MockRole} value - The value of the option.
 * @property {ApplicationCommandOptionType.Role} type - The type of the option.
 * @property {boolean?} required - Whether the option is required.
 */
export interface RoleOptionParameters {
  name: string;
  value: MockRole;
  type: ApplicationCommandOptionType.Role;
  required?: boolean;
}

/**
 * Parameters for adding an option to a command.
 *
 * @interface AttachmentOptionParameters
 * @property {string} name - The name of the option.
 * @property {MockAttachment} value - The value of the option.
 * @property {ApplicationCommandOptionType.Attachment} type - The type of the option.
 * @property {boolean?} required - Whether the option is required.
 */
export interface AttachmentOptionParameters {
  name: string;
  value: MockAttachment;
  type: ApplicationCommandOptionType.Attachment;
  required?: boolean;
}

/**
 * Parameters for adding an option to a command.
 *
 * @interface MessageOptionParameters
 * @property {string} name - The name of the option.
 * @property {MockMessage} value - The value of the option.
 * @property {ApplicationCommandOptionType.Message} type - The type of the option.
 * @property {boolean?} required - Whether the option is required.
 */
export interface MessageOptionParameters {
  name: string;
  value: MockMessage;
  type: ApplicationCommandType.Message;
  required?: boolean;
}

/**
 * Parameters for adding an option to a command.
 *
 * @interface SubcommandOptionParameters
 * @property {string} name - The name of the option.
 * @property {string} value - The value of the option.
 * @property {ApplicationCommandOptionType.Subcommand} type - The type of the option.
 * @property {boolean?} required - Whether the option is required.
 */
export interface SubcommandOptionParameters {
  name: string;
  value: string;
  type: ApplicationCommandOptionType.Subcommand;
}
