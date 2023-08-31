import {
  APIAttachment,
  APIEmbed,
  AttachmentBuilder,
  EmbedBuilder,
} from "discord.js";

/**
 * Parameters for replying to a message.
 *
 * @interface ReplyParameters
 * @property {string?} content - The content of the reply.
 * @property {(EmbedBuilder | APIEmbed)[]?} embeds - The embeds of the reply.
 * @property {(AttachmentBuilder | APIAttachment)[]?} attachments - The attachments of the reply.
 * @property {(AttachmentBuilder | APIAttachment)[]?} files - The files of the reply.
 */
export interface ReplyParameters {
  content?: string;
  embeds?: (EmbedBuilder | APIEmbed)[];
  attachments?: (AttachmentBuilder | APIAttachment)[];
  files?: (AttachmentBuilder | APIAttachment)[];
}

/**
 * Parameters for replying to a command interaction.
 *
 * @interface InteractionReplyParameters
 * @augments {ReplyParameters}
 * @property {boolean?} ephemeral - Whether the reply is ephemeral.
 */
export interface InteractionReplyParameters extends ReplyParameters {
  ephemeral?: boolean;
}

/**
 * Parameters for sending a message through a webhook.
 *
 * @interface WebhookReplyParameters
 * @augments {ReplyParameters}
 * @property {string?} username - The username of the webhook.
 */
export interface WebhookReplyParameters extends ReplyParameters {
  username?: string;
  avatarURL?: string;
}
