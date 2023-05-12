import {
  APIAttachment,
  APIEmbed,
  AttachmentBuilder,
  EmbedBuilder,
} from "discord.js";

export interface ReplyParameters {
  content?: string;
  embeds?: (EmbedBuilder | APIEmbed)[];
  attachments?: (AttachmentBuilder | APIAttachment)[];
}

export interface InteractionReplyParameters extends ReplyParameters {
  ephemeral?: boolean;
}
