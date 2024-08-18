interface Setting {
  id: number
  key: string
  value: any
  active : boolean
  description: string | null
  access_control: number[]
  createdAt: Date
  updatedAt: Date | null
}

interface SettingCreateInput{
  key: string
  value: string
  description?: string
  active:boolean
}
interface SettingUpdateInput{
  value: string
  description?: string
  active?:boolean

}

export type {Setting ,SettingCreateInput,SettingUpdateInput }