import { assert } from "chai";

import { MockAttachment } from "../../src/mocks/MockAttachment";

suite("Mock Attachment", () => {
  /**
   * Instantiation.
   */

  test("should instantiate", () => {
    const attach = new MockAttachment({ name: "test", description: "test" });
    assert.exists(attach);
    assert.instanceOf(attach, MockAttachment);
  });

  /**
   * Properties.
   */

  test("should have name property", () => {
    const attach = new MockAttachment({ name: "test", description: "test" });
    assert.equal(attach.name, "test");
  });

  test("should have description property", () => {
    const attach = new MockAttachment({ name: "test", description: "test" });
    assert.equal(attach.description, "test");
  });

  /**
   * Methods.
   */
});
