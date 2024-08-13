import { QueryKey, UseQueryOptions } from "@tanstack/react-query";

interface Params {
  [key:string]: string | number;
}
interface TestApi {
  id: number;
  name: string;
}

interface Error {
  message: string;
  status: number;
}
type OptionsUseQuery = Omit<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  UseQueryOptions<any, any, any, QueryKey>,
  "queryKey" | "queryFn"
>


interface DataUpdate<t> {
  id: string | number;
  data: Partial<t>;
}
interface FilterBase {
  page?: number
  limit?: number
}

interface ResponseList<T> {
  datas: T[]
  total: number
}

export type { Params, OptionsUseQuery, TestApi, Error, DataUpdate, FilterBase , ResponseList };
