export interface UseCase<I = unknown, O = unknown> {
  execute: (params: I) => O;
}
