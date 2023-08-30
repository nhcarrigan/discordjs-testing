import { assert } from "chai";

import { logHandler } from "../../src/utils/logHandler";

suite("logHandler", () => {
  /**
   * Instantiation.
   */
  test("should be defined", () => {
    assert.isDefined(logHandler);
  });
  /**
   * Properties.
   */

  /**
   * Methods.
   */
  test("should be able to log", () => {
    assert.property(logHandler, "log");
    assert.isFunction(logHandler.log);
    assert.doesNotThrow(() => logHandler.log("info", "test"));
  });
});
