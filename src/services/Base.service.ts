import {
  useQuery,
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from "@tanstack/react-query";
import client from "@/api/axios";
import { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import {
  DataResponseList,
  DataUpdate,
  OptionsUseQuery,
} from "@/types/Common.type";

type ErrorRespon = AxiosError;

export class BaseService<DataQuery, CreateInput, UpdateInput, TParams = any> {
  protected url: string;
  protected queryKey: string;
  protected clientApi: AxiosInstance = client;
  constructor(url: string) {
    this.url = url;
    this.queryKey = url;
  }

  async getList(
    params?: TParams,
    config?: AxiosRequestConfig
  ): Promise<DataResponseList<DataQuery>> {
    const response = await this.clientApi.get<DataResponseList<DataQuery>>(
      this.url,
      {
        params,
        ...config,
      }
    );
    return response.data;
  }

  async getDetail(
    id: string | number,
    config?: AxiosRequestConfig
  ): Promise<DataQuery> {
    const response = await this.clientApi.get<DataQuery>(
      `${this.url}/${id}`,
      config
    );
    return response.data;
  }

  async add(
    data: CreateInput,
    config?: AxiosRequestConfig
  ): Promise<DataQuery> {
    const response = await this.clientApi.post<DataQuery>(
      this.url,
      data,
      config
    );
    return response.data;
  }

  async update(
    id: string | number,
    data: UpdateInput,
    config?: AxiosRequestConfig
  ): Promise<DataQuery> {
    const response = await this.clientApi.patch<DataQuery>(
      `${this.url}/${id}`,
      data,
      config
    );
    return response.data;
  }

  async delete(
    id: string | number,
    config?: AxiosRequestConfig
  ): Promise<void> {
    await this.clientApi.delete(`${this.url}/${id}`, config);
  }

  useList(params?: TParams, options?: OptionsUseQuery) {
    return useQuery<DataResponseList<DataQuery>, ErrorRespon>({
      queryKey: [this.queryKey, JSON.stringify(params)],
      queryFn: () =>
        this.clientApi
          .get<DataResponseList<DataQuery>>(this.url, { params })
          .then((res) => res.data),
      ...options,
    });
  }

  useDetail(id: string | number, options?: OptionsUseQuery) {
    return useQuery<DataQuery, ErrorRespon>({
      queryKey: [this.queryKey, id],
      queryFn: () =>
        this.clientApi
          .get<DataQuery>(`${this.url}/${id}`)
          .then((res) => res.data),
      enabled: !!id,
      ...options,
    });
  }

  useAdd(options?: UseMutationOptions<DataQuery, ErrorRespon, CreateInput>) {
    const queryClient = useQueryClient();
    return useMutation<DataQuery, ErrorRespon, CreateInput>({
      mutationFn: (data) =>
        this.clientApi.post<DataQuery>(this.url, data).then((res) => res.data),
      onSuccess: () =>
        queryClient.invalidateQueries({ queryKey: [this.queryKey] }),
      ...options,
    });
  }

  useUpdate(
    options?: UseMutationOptions<
      DataQuery,
      ErrorRespon,
      DataUpdate<UpdateInput>
    >
  ) {
    const queryClient = useQueryClient();
    return useMutation<DataQuery, ErrorRespon, DataUpdate<UpdateInput>>({
      mutationFn: ({ id, data }) =>
        this.clientApi
          .patch<DataQuery>(`${this.url}/${id}`, data)
          .then((res) => res.data),
      onSuccess: (_updatedData, variables) => {
        const { id } = variables;
        return queryClient.invalidateQueries({ queryKey: [this.queryKey, id] });
      },
      ...options,
    });
  }

  useDelete(
    options?: UseMutationOptions<DataQuery, ErrorRespon, number | string>
  ) {
    const queryClient = useQueryClient();
    return useMutation<DataQuery, ErrorRespon, number | string>({
      mutationFn: (id: number | string) =>
        this.clientApi.delete(`${this.url}/${id}`),
      onSuccess: () =>
        queryClient.invalidateQueries({ queryKey: [this.queryKey] }),
      ...options,
    });
  }
}
