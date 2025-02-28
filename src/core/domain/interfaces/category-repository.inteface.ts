
export interface CategoryRepository {
  findMany: () => Promise<string[]>;
}
