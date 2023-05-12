import { assert } from "chai";
import { ChannelType } from "discord.js";

import { MockChannel } from "../../src/mocks/MockChannel";
import { MockGuild } from "../../src/mocks/MockGuild";
import { MockUser } from "../../src/mocks/MockUser";

const guild = new MockGuild({ name: "test" });
const channel = new MockChannel({
  name: "test",
  type: ChannelType.GuildText,
  guild: guild,
});

suite("Mock User", () => {
  test("should instantiate", () => {
    /**
     * Instantiation.
     */
    const user = new MockUser({
      username: "test",
      avatar: "https://cdn.nhcarrigan.com/profile.png",
      bot: false,
      discriminator: 1,
      system: false,
    });
    assert.exists(user);
    assert.instanceOf(user, MockUser);
  });

  /**
   * Properties.
   */

  /**
   * Methods.
   */

  test("should be able to send direct message", () => {
    const user = new MockUser({
      username: "test",
      avatar: "https://cdn.nhcarrigan.com/profile.png",
      bot: false,
      discriminator: 1,
      system: false,
    });
    user.send({ content: "test", author: user, channel }).then((message) => {
      assert.equal(message.content, "test");
      assert.lengthOf(user.dms, 1);
    });
  });
});
