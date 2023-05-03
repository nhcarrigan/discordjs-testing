import { MockChannel } from "../mocks/MockChannel";
import { MockGuild } from "../mocks/MockGuild";
import { MockMember } from "../mocks/MockMember";
import { MockUser } from "../mocks/MockUser";

export interface ChatInputCommandInteractionParameters {
  commandName: string;
  subcommandGroupName?: string;
  subcommandName?: string;
  options?: [];
  guild: MockGuild;
  member: MockMember;
  user: MockUser;
  channel: MockChannel;
  bot: MockUser;
}
