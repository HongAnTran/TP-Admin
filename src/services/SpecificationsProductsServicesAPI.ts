import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ServiceAPI from "./index";
import { OptionsUseQuery, Params, Error, DataUpdate } from "@/types/common";
// import { CategoryProduct  , CategoryCreateInput} from "src/types/category";
import { ProductSpecificationsCreateInput } from "@/types/productSpecifications";
import { ProductSpecifications } from "@/types/product";


const URL: string = "/specifications";
const URL_TYPE: string = "/specifications/types";
const QUERY_KEY = URL;
const serviceAPI = new ServiceAPI(URL);
const serviceAPIType = new ServiceAPI(URL_TYPE);
type DataQuery = ProductSpecifications;


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
  useListType: (params?: Params, options?: OptionsUseQuery) => {
    return useQuery<DataQuery[], Error>(
      { queryKey: [URL_TYPE], queryFn: () => serviceAPIType.getAll(params), ...options }
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

    return useMutation<ProductSpecificationsCreateInput, Error, Omit<ProductSpecificationsCreateInput, "id">>(
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

