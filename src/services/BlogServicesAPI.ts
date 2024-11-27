import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ServiceAPI from "./index";
import {
  OptionsUseQuery,
  Params,
  Error,
  ResponseList,
  DataUpdate,
} from "@/types/common";
// import { Product, ProductCreateInput, Products, ProductUpdateInput } from "@/types/product";
import {
  Article,
  ArticleCreateInput,
  ArticleUpdateInput,
} from "@/types/article";

const URL: string = "/articles";
const QUERY_KEY = URL;
const serviceAPI = new ServiceAPI(URL);
type DataQuery = Article;

export default {
  useList: (params?: Params, options?: OptionsUseQuery) => {
    return useQuery<ResponseList<DataQuery>, Error>({
      queryKey: [QUERY_KEY],
      queryFn: () => serviceAPI.getAll(params),
      ...options,
    });
  },
  useDetail: (id: number, options?: OptionsUseQuery) => {
    return useQuery<DataQuery, Error>({
      queryKey: [QUERY_KEY, id],
      queryFn: () => serviceAPI.getOne(id),
      ...options,
    });
  },
  useAdd: () => {
    const queryClient = useQueryClient();

    return useMutation<DataQuery, Error, Omit<ArticleCreateInput, "id">>({
      mutationFn: (data) => serviceAPI.add(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
        serviceAPI.revalidate([URL]);
      },
    });
  },
  useUpdate: () => {
    const queryClient = useQueryClient();
    return useMutation<DataQuery, Error, DataUpdate<ArticleUpdateInput>>({
      mutationFn: (data) => {
        const body = data.data;
        return serviceAPI.put(data.id, body);
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: [...QUERY_KEY] });
        serviceAPI.revalidate([URL, data.slug]);
      },
    });
  },
  useDelete: () => {
    const queryClient = useQueryClient();
    return useMutation<number | string, Error, number | string>({
      mutationFn: (id: number | string) => serviceAPI.delete(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
        serviceAPI.revalidate([URL]);
      },
    });
  },
};
