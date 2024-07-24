import { Location } from "./location";


type AddressType = "home" | "office"

interface AddressInffo {
  email: string | null; // Địa chỉ email của người nhận hàng (có thể là null)
  street: string; // 
  phone: string; // Số điện thoại liên hệ
  province: Pick<Location, "code" | "name">
  district: Pick<Location, "code" | "name">
  ward: Pick<Location, "code" | "name">
}
interface Address extends AddressInffo {
  full_name: string
  type: AddressType
  isDefault: boolean
  // Các thuộc tính khác liên quan đến vận chuyển có thể được thêm vào đây
}
export type { Address, AddressInffo, AddressType }