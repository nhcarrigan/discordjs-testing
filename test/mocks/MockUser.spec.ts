import { assert } from "chai";

import { MockUser } from "../../src/mocks/MockUser";

suite("Mock User", () => {
  test("should instantiate", () => {
    const user = new MockUser({
      id: "1",
      username: "test",
      avatar: "https://cdn.nhcarrigan.com/profile.png",
      bot: false,
      discriminator: 1,
      system: false,
    });
    assert.exists(user);
    assert.instanceOf(user, MockUser);
  });
});
