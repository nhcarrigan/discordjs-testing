import { assert } from "chai";

import { MockAttachment } from "../../src/mocks/MockAttachment";

suite("Mock Attachment", () => {
  test("should instantiate", () => {
    const attach = new MockAttachment({ name: "test", description: "test" });
    assert.exists(attach);
    assert.instanceOf(attach, MockAttachment);
  });

  test("should get name", () => {
    const attach = new MockAttachment({ name: "test", description: "test" });
    assert.equal(attach.name, "test");
  });

  test("should get description", () => {
    const attach = new MockAttachment({ name: "test", description: "test" });
    assert.equal(attach.description, "test");
  });
});
