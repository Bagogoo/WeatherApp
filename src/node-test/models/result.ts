export interface Result<T> {
  data: T | Error;
  status: number;
}
