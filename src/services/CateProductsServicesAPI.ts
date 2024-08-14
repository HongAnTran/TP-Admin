import { CategoryCreateInput, CategoryUpdateInput } from '@/types/categoryProduct';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ServiceAPI from "./index";
import { CategoryProduct } from "@/types/categoryProduct";
import { Params } from "react-router-dom";
import { DataUpdate, OptionsUseQuery, ResponseList } from "@/types/common";


const URL: string = "/category-product";
const QUERY_KEY = URL;
const serviceAPI = new ServiceAPI(URL);
type DataQuery = CategoryProduct;


export default {
  useList: (params?: Params, options?: OptionsUseQuery) => {
    return useQuery<ResponseList<DataQuery>, Error>(
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
    return useMutation<DataQuery, Error, DataUpdate<CategoryUpdateInput>>(
      {
        mutationFn: (data) => serviceAPI.patch(data.id, data.data),
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