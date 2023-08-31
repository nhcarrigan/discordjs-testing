import { MockChannel } from "../mocks/MockChannel";
import { MockGuild } from "../mocks/MockGuild";
import { MockMember } from "../mocks/MockMember";
import { MockUser } from "../mocks/MockUser";

import { OptionParameters } from "./OptionParameters";

/**
 * Parameters for the MockChatInputCommandInteraction constructor.
 *
 * @interface ChatInputCommandInteractionParameters
 * @property {string} commandName - The name of the command.
 * @property {string?} subcommandGroupName - The name of the subcommand group.
 * @property {string?} subcommandName - The name of the subcommand.
 * @property {OptionParameters[]?} options - The options for the command.
 * @property {MockGuild?} guild - The guild the command was sent in.
 * @property {MockMember} member - The member who sent the command.
 * @property {MockUser} user - The user who sent the command.
 * @property {MockChannel} channel - The channel the command was sent in.
 * @property {MockUser} bot - The bot user.
 */
export interface ChatInputCommandInteractionParameters {
  commandName: string;
  subcommandGroupName?: string;
  subcommandName?: string;
  options?: OptionParameters[];
  guild?: MockGuild;
  member: MockMember;
  user: MockUser;
  channel: MockChannel;
  bot: MockUser;
}
