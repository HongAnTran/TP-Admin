import { Address } from "@/types/address"
import { ProductOrder } from "./product"




export enum OrderStatus {
  DRAFT = 15,       // Đơn hàng chưa được hoàn tất bởi khách hàng
  PENDING = 3, // Chờ xử lí
  PROCESSING = 5, // Đơn hàng đang được xử lý
  SHIPPED = 9, // Đơn hàng đã được gửi đi
  SUCCESS = 1, // Đơn hàng đã được giao thành công
  CANCELLED = 10, // Đơn hàng đã bị hủy
  RETURNED  = 12, // Đơn hàng bị trả
}


interface Order {
  id: number
  token: string
  code: string
  customer_id: number
  items: ProductOrder[]
  total_price: number
  temp_price: number
  ship_price: number
  discount: number
  note: string | null
  promotions: []
  shipping: Address
  status: OrderStatus; // Trạng thái của đơn hàng
  payment: {
    method: string,
    total: number
    debt: number
    paid: number
  }
}


export type { Order }
