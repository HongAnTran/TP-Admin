export interface FileDetail {
  id: number
  id_root: string
  url: string
  format: string
  name: string
  size: number
  created_at: string
  folder_id  :number | null
}

export interface FolderDetail {
  id: number
  name: string
  created_at: string
  parent_id : number | null
}