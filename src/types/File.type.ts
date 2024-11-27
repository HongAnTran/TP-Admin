export interface FileDetail {
  id: number;
  id_root: string;
  url: string;
  format: string;
  name: string;
  size: number;
  created_at: string;
}

export interface Folder {
  id: number;
  name: string;
  created_at: string;
}
