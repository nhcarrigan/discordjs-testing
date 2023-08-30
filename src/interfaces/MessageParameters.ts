import { MockChannel } from "../mocks/MockChannel";
import { MockGuild } from "../mocks/MockGuild";
import { MockMember } from "../mocks/MockMember";
import { MockUser } from "../mocks/MockUser";

import { ReplyParameters } from "./ReplyParameters";

export interface MessageParameters extends ReplyParameters {
  channel: MockChannel;
  guild?: MockGuild;
  author: MockUser;
  replyId?: string;
  member?: MockMember;
}
