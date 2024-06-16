interface Location {
  _id: string,
  name: string,
  slug: string,
  type: string,
  name_with_type: string,
  code: string,
  isDeleted: boolean
  parent_code?: string
  path?: string,
  path_with_type?: string
}

export type { Location }