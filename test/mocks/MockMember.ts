import { assert } from "chai";

import { MockGuild } from "../../src/mocks/MockGuild";
import { MockMember } from "../../src/mocks/MockMember";
import { MockUser } from "../../src/mocks/MockUser";

suite("Mock Member", () => {
  test("should instantiate", () => {
    const member = new MockMember({
      id: "1",
      user: new MockUser({
        id: "1",
        username: "test",
        avatar: "https://cdn.nhcarrigan.com/profile.png",
        bot: false,
        discriminator: 1,
        system: false,
      }),
      guild: new MockGuild({
        id: "1",
        name: "test",
      }),
    });
    assert.exists(member);
    assert.instanceOf(member, MockMember);
  });
});
