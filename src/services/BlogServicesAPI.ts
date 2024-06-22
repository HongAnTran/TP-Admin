import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ServiceAPI from "./index";
import { OptionsUseQuery, Params, Error} from "@/types/common";
// import { Product, ProductCreateInput, Products, ProductUpdateInput } from "@/types/product";
import { Article } from "@/types/article";

const URL: string = "/articles";
const QUERY_KEY = URL;
const serviceAPI = new ServiceAPI(URL);
type DataQuery = Article;


export default {
  useList: (params?: Params, options?: OptionsUseQuery) => {
    return useQuery<DataQuery, Error>(
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
  //       onSuccess: (data) =>
  //         queryClient.invalidateQueries({ queryKey: [...QUERY_KEY] }),
  //     }

  //   );
  // },
  useDelete: () => {
    const queryClient = useQueryClient();
    return useMutation<number | string, Error, number | string>({
      mutationFn: (id: number | string) => serviceAPI.delete(id),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }),
    }

    );
  },
};
