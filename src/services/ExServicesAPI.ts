import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ServiceAPI from "./index";
import { OptionsUseQuery, Params, Error, DataUpdate} from "@/types/common";

interface Data{
  id : number
}

const URL: string = "/ex";
const QUERY_KEY = URL;
const serviceAPI = new ServiceAPI(URL);
type DataQuery = Data;


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

    return useMutation<Data, Error, Omit<Data, "id">>(
      {
        mutationFn: (data) => serviceAPI.add(data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }),

      }
    );
  },
  useUpdate: () => {
    const queryClient = useQueryClient();
    return useMutation<Data, Error, DataUpdate<Data>>(
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
