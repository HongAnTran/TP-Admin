interface Setting {
  id: number
  key: string
  value: object
  description: string | null
  access_control: number[]
  createdAt: Date
  updatedAt: Date | null
}

interface SettingCreateInput{
  key: string
  value: string
  description?: string
}
interface SettingUpdateInput{
  value: string
  description?: string
}

export type {Setting ,SettingCreateInput,SettingUpdateInput }