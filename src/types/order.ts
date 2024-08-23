import { Customer } from "./customer"
import { ProductOrder } from "./product"




interface Order {
  id: number
  token: string
  code: string
  customer_id: number | null
  items: ProductOrder[]
  total_price: number
  temp_price: number
  ship_price: number
  discount: number
  note: string | null
  promotions: []
  shipping: Shipping | null
  status: OrderStatus; // Trạng thái của đơn hàng
  payment: Payment | null,
  customer: Customer | null
  created_at: Date
  updated_at: Date | null
}

interface OrderCheckoutInput {
  customer_id?: number
  discount?: number
  note?: string
  promotions?: []
  shipping: {
    create: ShippingCreate

  },
  payment: {
    create: PaymentCreate
  }
}

interface Shipping {
  id: number
  order_id: number
  address: string
  province: string
  district: string
  ward: string
  address_full: string
  country: string
  ship_date: Date | null
  tracking_number: string | null
  phone: string
  fullname: string
}
type ShippingCreate = Pick<Shipping, "address" | "address_full" | "country" | "district" | "province" | "ward" | "phone" | "fullname">

interface Payment {
  id: number
  order_id: number
  method: string
  transaction_id: string | null
  amount: number
  status: PaymentStatus
  payment_date: Date | null
}

type PaymentCreate = Pick<Payment, "amount" | "method" | "status" | "payment_date">
export enum PaymentStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED"
}


export enum OrderStatus {
  DRAFT = 1,        // Đơn hàng chưa được hoàn tất bởi khách hàng
  PENDING = 2,      // Chờ xử lí
  PROCESSING = 3,   // Đơn hàng đang được xử lý
  FAILED = 4,       // Đơn hàng thất bại do lỗi
  CANCELLED = 5,    // Đơn hàng đã bị hủy
  SHIPPED = 6,      // Đơn hàng đã được gửi đi
  RETURNED = 7,     // Đơn hàng bị trả
  SUCCESS = 8,      // Đơn hàng đã được giao thành công
}

export type { Order, Payment, Shipping, OrderCheckoutInput }
