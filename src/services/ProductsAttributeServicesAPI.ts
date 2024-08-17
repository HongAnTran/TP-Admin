import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ServiceAPI from "./index";
import { OptionsUseQuery, Params, Error, DataUpdate } from "@/types/common";
import { ProductAttribute ,ProductAttributeUpdateInput   } from "@/types/product";


const URL: string = "/product-attributes";
const QUERY_KEY = URL;
const serviceAPI = new ServiceAPI(URL);
type DataQuery = ProductAttribute;


export default {
  // useList: (params?: Params, options?: OptionsUseQuery) => {
  //   return useQuery<Products, Error>(
  //     {
  //       queryKey: [QUERY_KEY , JSON.stringify(params)],
  //       queryFn: () => serviceAPI.getAll(params),
  //       ...options
  //     }
  //   );
  // },
  // useDetail: (id: string, options?: OptionsUseQuery) => {
  //   return useQuery<DataQuery, Error>(
  //     {
  //       queryKey: [QUERY_KEY, id],
  //       queryFn: () => serviceAPI.getOne(id),
  //       ...options
  //     }
  //   );
  // },
  // useAdd: () => {
  //   const queryClient = useQueryClient();

  //   return useMutation<ProductCreateInput, Error, Omit<ProductCreateInput, "id">>(
  //     {
  //       mutationFn: (data) => serviceAPI.add(data),
  //       onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }),

  //     }
  //   );
  // },
  useUpdate: () => {
    return useMutation<ProductAttribute, Error, DataUpdate<ProductAttributeUpdateInput>>(
      {
        mutationFn: (data) => {
          const body = data.data
          return serviceAPI.put(data.id, body)
        },
      }

    );
  },
  // useDelete: () => {
  //   const queryClient = useQueryClient();
  //   return useMutation<number | string, Error, number | string>({
  //     mutationFn: (id: number | string) => serviceAPI.delete(id),
  //     onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }),
  //   }

  //   );
  // },
};
