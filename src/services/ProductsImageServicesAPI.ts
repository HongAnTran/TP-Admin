import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ServiceAPI from "./index";
import { OptionsUseQuery, Params, Error, DataUpdate } from "@/types/common";
import { ProductImage,ProductImageUpdate , ProductImageCreate } from "@/types/product";


const URL: string = "/product-image";
const QUERY_KEY = URL;
const serviceAPI = new ServiceAPI(URL);
type DataQuery = ProductImage;


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

    return useMutation<ProductImageCreate, Error,ProductImageCreate>(
      {
        mutationFn: (data) => serviceAPI.add(data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }),

      }
    );
  },
  useUpdate: () => {
    const queryClient = useQueryClient();
    return useMutation<ProductImage, Error, DataUpdate<ProductImageUpdate>>(
      {
        mutationFn: (data) => {
          const body = data.data
          return serviceAPI.put<ProductImage>(data.id, body)
        },
        onSuccess: () =>
          queryClient.invalidateQueries({ queryKey: [...QUERY_KEY] }),
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
