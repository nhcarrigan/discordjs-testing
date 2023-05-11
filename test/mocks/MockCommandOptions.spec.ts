import { assert } from "chai";

import { MockCommandOptions } from "../../src/mocks/MockCommandOptions";

suite("Mock Command Options", () => {
  /**
   * Instantiation.
   */
  test("should instantiate", () => {
    const options = new MockCommandOptions();
    assert.exists(options);
    assert.instanceOf(options, MockCommandOptions);
  });

  /**
   * Properties.
   */

  /**
   * Methods.
   */

  test("should be able to get string options", () => {
    assert.fail();
  });

  test("should be able to get boolean options", () => {
    assert.fail();
  });

  test("should be able to get number options", () => {
    assert.fail();
  });

  test("should be able to get user options", () => {
    assert.fail();
  });

  test("should be able to get channel options", () => {
    assert.fail();
  });

  test("should be able to get role options", () => {
    assert.fail();
  });

  test("should be able to get mentionable options", () => {
    assert.fail();
  });

  test("should be able to get integer options", () => {
    assert.fail();
  });

  // this is for context commands
  test("should be able to get message options", () => {
    assert.fail();
  });
});
