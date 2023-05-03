import { MockChannel } from "../mocks/MockChannel";
import { MockUser } from "../mocks/MockUser";

export interface WebhookParameters {
  channel: MockChannel;
  user: MockUser;
}
