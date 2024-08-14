import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ServiceAPI from "./index";
import { OptionsUseQuery, Params, Error, DataUpdate } from "@/types/common";
import { ProductSpecificationsCreateInput } from "@/types/productSpecifications";
import { Attribute, AttributeValue } from "@/types/attribute";

const URL: string = "/attributes";
const URL_Value: string = "/attribute-values";
const QUERY_KEY = URL;
const serviceAPI = new ServiceAPI(URL);
const serviceAPIValue = new ServiceAPI(URL_Value);
type DataQuery = Attribute;


export default {
  useList: (params?: Params, options?: OptionsUseQuery) => {
    return useQuery<DataQuery[], Error>(
      {
        queryKey: [QUERY_KEY],
        queryFn: () => serviceAPI.getAll(params),
        staleTime: Infinity,
        ...options
      }
    );
  },
  useListValue: (params?: { attribute_id: number }, options?: OptionsUseQuery) => {
    return useQuery<AttributeValue[], Error>(
      {
        queryKey: [URL_Value], queryFn: () => serviceAPIValue.getAll(params),
        staleTime: Infinity, ...options
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

