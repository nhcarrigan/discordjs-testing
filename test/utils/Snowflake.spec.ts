import { assert } from "chai";

import { Snowflake } from "../../src/utils/Snowflake";

suite("Snowflake", () => {
  /**
   * Instantiation.
   */

  test("should instantiate", () => {
    const flake = new Snowflake();
    assert.exists(flake);
    assert.instanceOf(flake, Snowflake);
  });

  /**
   * Properties.
   */

  /**
   * Methods.
   */

  test("should generate a string snowflake", () => {
    const flake = new Snowflake();
    assert.exists(flake.id);
    assert.isString(flake.id);
  });
});
