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
  parent_id?: number | null
  slug: string
  status: number
}
export type { CategoryArtice  , CategoryArticeCreateInput}
export {
  CategoryArticeStatus
}
