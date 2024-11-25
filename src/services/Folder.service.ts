import { Folder } from "@/types/File.type";
import { BaseService } from "./Base.service";

class FolderServiceClass extends BaseService<Folder, Folder, Folder> {
  constructor() {
    super("/static/folders");
  }
}
const FolderService = new FolderServiceClass();
export default FolderService;
