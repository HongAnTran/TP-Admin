export type SpecificationsTypeCreateInput = {
  name: string
  description?: string | null
}
export type ProductSpecificationsCreateInput = {
  name: string
  value: string
  description?: string | null
  type: {
    connect: { id: number }
  }
}

