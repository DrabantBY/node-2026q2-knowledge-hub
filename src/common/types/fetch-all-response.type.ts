export interface FetchAllResponse<T> {
  data: T;
  total: number;
  page: number;
  limit: number;
}
