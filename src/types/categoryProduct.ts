

interface CategoryProduct {
  id: number
  title: string
  description: string | null
  image: string
  slug: string
  published: boolean
  meta_data?: {
    meta_title?: string
    meta_description?: string
    meta_keywords?: string
  }

}
type CategoryCreateInput = {
  title: string
  description?: string | null
  image?: string | null
  slug: string
  published?: boolean
  meta_data?: {
    meta_title?: string
    meta_description?: string
    meta_keywords?: string
  }
}
export type { CategoryProduct, CategoryCreateInput }
