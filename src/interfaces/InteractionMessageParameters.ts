import { MessageParameters } from "./MessageParameters";

export interface InteractionMessageParameters extends MessageParameters {
  ephemeral?: boolean;
}
