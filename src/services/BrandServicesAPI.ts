import { CategoryCreateInput } from '@/types/categoryProduct';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ServiceAPI from "./index";
import { Params } from "react-router-dom";
import { DataUpdate, OptionsUseQuery } from "@/types/common";
import { Brand } from '@/types/brand';


const URL: string = "/brand";
const QUERY_KEY = URL;
const serviceAPI = new ServiceAPI(URL);
type DataQuery = Brand;


export default {
  useList: (params?: Params, options?: OptionsUseQuery) => {
    return useQuery<DataQuery[], Error>(
      {
        queryKey: [QUERY_KEY],
        queryFn: () => serviceAPI.getAll(params),
        ...options
      }
    );
  },
  useDetail: (id: string, options?: OptionsUseQuery) => {
    return useQuery<DataQuery, Error>(
      {
        queryKey: [QUERY_KEY, id],
        queryFn: () => serviceAPI.getOne(id),
        ...options
      }
    );
  },
  useAdd: () => {
    const queryClient = useQueryClient();

    return useMutation<CategoryCreateInput, Error, Omit<CategoryCreateInput, "id">>(
      {
        mutationFn: (data) => serviceAPI.add(data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }),

      }
    );
  },
  useUpdate: () => {
    const queryClient = useQueryClient();
    return useMutation<DataQuery, Error, DataUpdate<DataQuery>>(
      {
        mutationFn: (data) => serviceAPI.put(data.id, data.data),
        onSuccess: (data) =>
          queryClient.invalidateQueries({ queryKey: [...QUERY_KEY, data.id] }),
      }

    );
  },
  useDelete: () => {
    const queryClient = useQueryClient();
    return useMutation<number | string, Error, number | string>({
      mutationFn: (id: number | string) => serviceAPI.delete(id),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }),
    }

    );
  },
};