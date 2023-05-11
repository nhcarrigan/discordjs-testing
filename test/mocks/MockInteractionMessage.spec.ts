import { assert } from "chai";
import { ChannelType } from "discord.js";

import { MockChannel } from "../../src/mocks/MockChannel";
import { MockInteractionMessage } from "../../src/mocks/MockInteractionMessage";
import { MockUser } from "../../src/mocks/MockUser";

suite("Mock Interaction Message", () => {
  test("should instantiate", () => {
    const message = new MockInteractionMessage({
      id: "1",
      content: "test",
      channel: new MockChannel({
        id: "1",
        name: "test",
        type: ChannelType.GuildText,
      }),
      author: new MockUser({
        id: "1",
        username: "test",
        avatar: "https://cdn.nhcarrigan.com/profile.png",
        bot: true,
        discriminator: 1,
        system: false,
      }),
    });
    assert.exists(message);
    assert.instanceOf(message, MockInteractionMessage);
  });
});
