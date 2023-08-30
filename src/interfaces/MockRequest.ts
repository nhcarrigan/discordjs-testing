export interface MockRequest {
  route: string;
  method: string;
  body: Record<string, unknown>[];
}
