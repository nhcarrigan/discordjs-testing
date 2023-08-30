import { MockRequest } from "../interfaces/MockRequest";

/**
 * Mocks the discord.js REST client.
 * Intended only for testing registering commands at this time.
 *
 * @class
 */
export class MockRest {
  private _requests: MockRequest[] = [];
  private _version: string;

  /**
   * @param {{version: string}} options The options to instantiate with.
   * @public
   */
  constructor({ version }: { version: string }) {
    this._version = version;
    return this;
  }

  /**
   * @type {string}
   * @public
   * @readonly
   */
  public get version(): string {
    return this._version;
  }

  /**
   * @type {string}
   * @public
   * @readonly
   */
  public get requests(): MockRequest[] {
    return this._requests;
  }

  /**
   * Mocks a `put` request.
   *
   * @param {string} route The path the request is being made to.
   * @param {Record<string, unknown>} payload The request payload.
   * @async
   * @public
   */
  public async put(
    route: string,
    payload: Record<string, Record<string, unknown>[]>
  ): Promise<void> {
    this._requests.push({
      method: "PUT",
      route,
      body: payload.body,
    });
  }

  /**
   * Only used to satisfy the interface.
   *
   * @returns {MockRest} This.
   * @public
   */
  public setToken(): MockRest {
    return this;
  }
}
