import { Address } from "./address";
type CustomerGender = "male" | "female" | "other" | "unknown";
interface Customer {
  id: number
  email: string | null; // Địa chỉ email của người nhận hàng (có thể là null)
  address: Address[]; // Địa chỉ giao hàng
  phone: string; // Số điện thoại liên hệ
  gender : CustomerGender
  birtday : Date | null
  image : string
  name : string
}

export type { Customer , CustomerGender}