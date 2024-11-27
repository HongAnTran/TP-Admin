import { FileDetail } from "@/types/File.type";
import { BaseService } from "./Base.service";
import { OptionsUseQuery } from "@/types/common";
import { useQuery } from "@tanstack/react-query";
import { ErrorRespon } from "@/types/Common.type";

class FileServiceClass extends BaseService<FileDetail, FileDetail, FileDetail> {
  constructor() {
    super("/static/files");
  }
  upload(
    filFileDetaile: FormData,
    options?: { isOptimize: boolean; width: number; height: number }
  ) {
    return this.clientApi.post<FileDetail>(
      "/static/files/clound",
      filFileDetaile,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        params: options,
      }
    );
  }

  useListArr(params?: any, options?: OptionsUseQuery) {
    return useQuery<FileDetail[], ErrorRespon>({
      queryKey: [this.queryKey, JSON.stringify(params)],
      queryFn: () =>
        this.clientApi
          .get<FileDetail[]>(this.url, { params })
          .then((res) => res.data),
      staleTime: Infinity,
      ...options,
    });
  }
}
const FileService = new FileServiceClass();
export default FileService;
