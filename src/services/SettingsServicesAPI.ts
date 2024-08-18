import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ServiceAPI from "./index";
import { OptionsUseQuery, Params, ResponseList, DataUpdate } from "@/types/common";
import { Setting, SettingCreateInput, SettingUpdateInput } from "@/types/Settings.type";

const URL: string = "/settings";
const QUERY_KEY = URL;
const serviceAPI = new ServiceAPI(URL);
type DataQuery = Setting;


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
        queryFn: () => serviceAPI.getOne<DataQuery>(id, "key"),
        ...options
      }
    );
  },
  useAdd: () => {
    const queryClient = useQueryClient();

    return useMutation<Setting, Error, SettingCreateInput>(
      {
        mutationFn: (data) => serviceAPI.add(data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }),

      }
    );
  },
  useUpdate: () => {
    const queryClient = useQueryClient();
    return useMutation<Setting, Error, DataUpdate<SettingUpdateInput>>(
      {
        mutationFn: (data) => {
          const body = data.data
          return serviceAPI.put(data.id, body)
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
