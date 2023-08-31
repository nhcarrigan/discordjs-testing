import { MessageParameters } from "./MessageParameters";

/**
 * Parameters for the MockInteractionMessage constructor.
 *
 * @interface InteractionMessageParameters
 * @property {boolean?} ephemeral - Whether the message is ephemeral.
 */
export interface InteractionMessageParameters extends MessageParameters {
  ephemeral?: boolean;
}
