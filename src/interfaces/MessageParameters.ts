import { MockChannel } from "../mocks/MockChannel";
import { MockGuild } from "../mocks/MockGuild";
import { MockMember } from "../mocks/MockMember";
import { MockUser } from "../mocks/MockUser";

import { ReplyParameters } from "./ReplyParameters";

/**
 * Parameters for the MockMessage constructor.
 *
 * @interface MessageParameters
 * @property {MockChannel} channel - The channel the message was sent in.
 * @property {MockGuild?} guild - The guild the message was sent in.
 * @property {MockUser} author - The author of the message.
 * @property {string?} replyId - The ID of the message being replied to.
 * @property {MockMember?} member - The member who sent the message.
 */
export interface MessageParameters extends ReplyParameters {
  channel: MockChannel;
  guild?: MockGuild;
  author: MockUser;
  replyId?: string;
  member?: MockMember;
}
