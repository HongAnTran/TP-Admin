import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ServiceAPI from "./index";
import { OptionsUseQuery, Params, Error, DataUpdate} from "@/types/common";
import { Product, ProductCreateInput, Products, ProductUpdateInput } from "@/types/product";


const URL: string = "/products";
const QUERY_KEY = URL;
const serviceAPI = new ServiceAPI(URL);
type DataQuery = Product;


export default {
  useList: (params?: Params, options?: OptionsUseQuery) => {
    return useQuery<Products, Error>(
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
  useAdd: () => {
    const queryClient = useQueryClient();

    return useMutation<ProductCreateInput, Error, Omit<ProductCreateInput, "id">>(
      {
        mutationFn: (data) => serviceAPI.add(data),
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [QUERY_KEY] })
          serviceAPI.revalidate([URL])
        }

      }
    );
  },
  useUpdate: () => {
    const queryClient = useQueryClient();
    return useMutation<Product, Error, DataUpdate<ProductUpdateInput>>(
      {
        mutationFn: (data) => {
            const body = data.data
          return serviceAPI.put(data.id, body)
        },
        onSuccess: (data) =>{
          queryClient.invalidateQueries({ queryKey: [...QUERY_KEY] })
          serviceAPI.revalidate([URL,data.slug])

        }
         ,
      }
    );
  },
  useDelete: () => {
    const queryClient = useQueryClient();
    return useMutation<number | string, Error, number | string>({
      mutationFn: (id: number | string) => serviceAPI.delete(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY] })
        serviceAPI.revalidate([URL])
      },
    }
    );
  },
  revalidate:async (tag : string) => {
    serviceAPI.revalidate([URL,tag])
  },
};
