enum CategoryProductStatus {
  DRAFT,
  SHOW
}


interface CategoryProduct {
  id: number
  title: string
  description: string | null
  image: string
  slug: string
  status: CategoryProductStatus
}
type CategoryCreateInput = {
  title: string
  description?: string | null
  image?: string | null
  parent_id?: number | null
  slug: string
  status: 'DRAFT' | 'SHOW'
}
export type { CategoryProduct  , CategoryCreateInput}
export {
  CategoryProductStatus
}
