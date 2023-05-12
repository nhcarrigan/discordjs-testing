import { MockChannel } from "../mocks/MockChannel";
import { MockGuild } from "../mocks/MockGuild";
import { MockUser } from "../mocks/MockUser";

import { ReplyParameters } from "./ReplyParameters";

export interface MessageParameters extends ReplyParameters {
  channel: MockChannel;
  guild?: MockGuild;
  author: MockUser;
}
