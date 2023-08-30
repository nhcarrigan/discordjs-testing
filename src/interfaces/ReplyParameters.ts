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
  files?: (AttachmentBuilder | APIAttachment)[];
}

export interface InteractionReplyParameters extends ReplyParameters {
  ephemeral?: boolean;
}

export interface WebhookReplyParameters extends ReplyParameters {
  username?: string;
  avatarURL?: string;
}
