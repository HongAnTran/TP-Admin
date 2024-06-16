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

export type { CategoryArtice }
export {
  CategoryArticeStatus
}
