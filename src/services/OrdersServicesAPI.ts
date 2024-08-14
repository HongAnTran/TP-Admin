import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ServiceAPI from "./index";
import { OptionsUseQuery, Params, Error, DataUpdate, ResponseList} from "@/types/common";
import { Order } from "@/types/order";


const URL: string = "/orders";
const QUERY_KEY = URL;
const serviceAPI = new ServiceAPI(URL);
type DataQuery = Order;


export default {
  useList: (params?: Params, options?: OptionsUseQuery) => {
    return useQuery<ResponseList<Order>, Error>(
      {
        queryKey: [QUERY_KEY , JSON.stringify(params)],
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
  // useAdd: () => {
  //   const queryClient = useQueryClient();

  //   return useMutation<ProductCreateInput, Error, Omit<ProductCreateInput, "id">>(
  //     {
  //       mutationFn: (data) => serviceAPI.add(data),
  //       onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }),

  //     }
  //   );
  // },
  // useUpdate: () => {
  //   const queryClient = useQueryClient();
  //   return useMutation<ProductUpdateInput, Error, DataUpdate<ProductUpdateInput>>(
  //     {
  //       mutationFn: (data) => {
  //           const body = data.data
  //         return serviceAPI.put(data.id, body)
  //       },
  //       onSuccess: () =>
  //         queryClient.invalidateQueries({ queryKey: [...QUERY_KEY] }),
  //     }

  //   );
  // },
  // useDelete: () => {
  //   const queryClient = useQueryClient();
  //   return useMutation<number | string, Error, number | string>({
  //     mutationFn: (id: number | string) => serviceAPI.delete(id),
  //     onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }),
  //   }

  //   );
  // },
};
