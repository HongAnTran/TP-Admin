enum PageStatus {
  DRAFT ,
  PUBLISHED,
}

enum PageLayoutType {
  FULL ,
  CONTAINER,
}

interface Page{
  id: number
  title: string
  slug: string
  content: string
  created_at: Date
  updated_at: Date
  status: PageStatus
  layout_type: PageLayoutType,
  meta_title?: string
  meta_description?: string
  meta_keywords?: string

}

export {  PageStatus, PageLayoutType }
export type { Page }