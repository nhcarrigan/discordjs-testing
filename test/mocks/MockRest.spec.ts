import { assert } from "chai";

import { MockRest } from "../../src/mocks/MockRest";

suite("Mock Rest", () => {
  /**
   * Instantiation.
   */
  test("should instantiate", () => {
    const rest = new MockRest({ version: "v1" });
    assert.exists(rest);
    assert.instanceOf(rest, MockRest);
  });
  /**
   * Properties.
   */
  test("should have version property", () => {
    const rest = new MockRest({ version: "v1" });
    assert.equal(rest.version, "v1");
  });

  test("should have requests property", () => {
    const rest = new MockRest({ version: "v1" });
    assert.exists(rest.requests);
    assert.isArray(rest.requests);
  });

  /**
   * Methods.
   */
  test("should be able to put", () => {
    const rest = new MockRest({ version: "10" });
    rest.put("/test", { body: [{ command: "hi" }] });
    assert.equal(rest.requests.length, 1);
    assert.deepEqual(rest.requests[0], {
      method: "PUT",
      route: "/test",
      body: [{ command: "hi" }],
    });
  });

  test("should be able to set token", () => {
    const rest = new MockRest({ version: "10" });
    assert.deepEqual(rest.setToken(), rest);
  });
});
