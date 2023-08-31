import { MockChannel } from "../mocks/MockChannel";
import { MockUser } from "../mocks/MockUser";

/**
 * Parameters for the MockWebhook constructor.
 *
 * @interface WebhookParameters
 * @property {MockChannel} channel - The channel the webhook is in.
 * @property {MockUser} user - The user the webhook is based on.
 */
export interface WebhookParameters {
  channel: MockChannel;
  user: MockUser;
}
