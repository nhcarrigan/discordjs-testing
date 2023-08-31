/**
 * Parameters for sending a request through the MockRest client.
 *
 * @interface MockRequest
 * @property {string} route - The route of the request.
 * @property {string} method - The method of the request.
 * @property {Record<string, unknown>[]} body - The body of the request.
 */
export interface MockRequest {
  route: string;
  method: string;
  body: Record<string, unknown>[];
}
