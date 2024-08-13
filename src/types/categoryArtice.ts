enum CategoryArticeStatus {
  DRAFT,
  SHOW,
}


interface CategoryArtice {
  id: number
  title: string
  description: string | null
  image: string
  slug: string
  status: CategoryArticeStatus
}
type CategoryArticeCreateInput = {
  title: string
  description?: string | null
  image?: string | null
  slug: string
  published?: boolean
  meta_data?: {
    meta_title?: string | null
    meta_description?: string | null
    meta_keywords?: string | null
  }

}
export type { CategoryArtice, CategoryArticeCreateInput }
export {
  CategoryArticeStatus
}
