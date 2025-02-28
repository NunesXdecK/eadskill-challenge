export interface HttpService {
  post: (url:string, params?: unknown) => Promise<unknown>;
  get: (url:string, params?: unknown) => Promise<unknown>;
  put: (url:string, params?: unknown) => Promise<unknown>;
  delete: (url:string, params?: unknown) => Promise<unknown>;
}
