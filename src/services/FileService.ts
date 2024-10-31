import { FileDetail } from "@/types/File.type";
import ServiceAPI from "./index";
import { useQuery } from "@tanstack/react-query";
import { OptionsUseQuery, ResponseList } from "@/types/common";
import { Params } from "react-router-dom";


const URL: string = "static/upload/clound";
const QUERY_KEY = URL;
const serviceAPI = new ServiceAPI(URL);
type DataQuery = FileDetail
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
        queryFn: () => serviceAPI.getOne(id),
        ...options
      }
    );
  },
  upload: async (file: FormData, options?: { isOptimize: boolean, width: number, height: number }) => {
    return await serviceAPI.add<FileDetail>(file, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      params : options
    })
  }
};