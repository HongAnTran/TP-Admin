import { QueryKey, UseQueryOptions } from "@tanstack/react-query";

interface Params {
  [key:string]: string;

  // skip?: number;
  // take?: number
  // page?: number
  // limit?: number
  // keyword? : string

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

type Theme = "student_admin_theme" | "teacher_vet_theme";
interface DataUpdate<t> {
  id: string | number;
  data: Partial<t>;
}
interface FilterBase {
  take?: number
  skip?: number
}
export type { Params, OptionsUseQuery, TestApi, Error, Theme, DataUpdate, FilterBase };
