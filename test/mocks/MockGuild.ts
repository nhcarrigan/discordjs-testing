import { assert } from "chai";

import { MockGuild } from "../../src/mocks/MockGuild";

suite("Mock Guild", () => {
  test("should instantiate", () => {
    const guild = new MockGuild({
      id: "1",
      name: "test",
    });
    assert.exists(guild);
    assert.instanceOf(guild, MockGuild);
  });
});
