import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ServiceAPI from "./index";
import { OptionsUseQuery, Params, Error, DataUpdate } from "@/types/common";
import {  ProductCreateInput,  ProductVariant,  ProductVariantUpdateInput } from "@/types/product";


const URL: string = "/product-variant";
const URL_REVALIDATE: string = "/products";
const QUERY_KEY = URL;
const serviceAPI = new ServiceAPI(URL);
type DataQuery = ProductVariant;


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

    return useMutation<ProductCreateInput, Error, Omit<ProductCreateInput, "id">>(
      {
        mutationFn: (data) => serviceAPI.add(data),
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [QUERY_KEY] })
          serviceAPI.revalidate([URL_REVALIDATE])
        },

      }
    );
  },
  useUpdate: () => {
    const queryClient = useQueryClient();
    return useMutation<ProductVariant, Error, DataUpdate<ProductVariantUpdateInput>>(
      {
        mutationFn: (data) => {
          const body = data.data
          return serviceAPI.put<ProductVariant>(data.id, body)
        },
        onSuccess: () =>
         {
          queryClient.invalidateQueries({ queryKey: [...QUERY_KEY] })
          serviceAPI.revalidate([URL_REVALIDATE])
         },
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

  useDeleteMany: () => {
    return useMutation<string, Error, any>({
      mutationFn: (ids:  string) => serviceAPI.deleteMany(ids),
    }
    );
  },
};
