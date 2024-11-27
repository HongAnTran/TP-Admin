import { QueryKey, UseQueryOptions , UseMutationOptions } from "@tanstack/react-query";

interface Params {
  skip?: number;
  take?: number
  page?: number
  limit?: number
  keyword?: string
}
interface TestApi {
  id: number;
  name: string;
}

interface ErrorRespon {
  message?: string;
  status: number;
  code: string
}
type OptionsUseQuery = Omit<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  UseQueryOptions<any, any, any, QueryKey>,
  "queryKey" | "queryFn"
>

type OptionsUseMutation = Omit<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  UseMutationOptions<any, any, any, QueryKey>,
  "mutationFn" | "onSuccess"
>

interface DataUpdate<t> {
  id: string | number;
  data: t;
}
interface FilterBase {
  page?: number
  limit?: number
}

interface DataResponseList<t> {
  rows: t[]
  count: number
}




export type { Params, OptionsUseQuery, TestApi, ErrorRespon, DataUpdate, FilterBase, DataResponseList  , OptionsUseMutation};
