interface Inventory {
  id: number; // ID của mỗi mục tồn kho (có thể tự tăng)
  product_id: number; // ID của sản phẩm trong kho
  quantity: number; // Số lượng sản phẩm có sẵn trong kho
  price: number; // Giá của sản phẩm
  location?: string; // Vị trí vật lý của hàng tồn kho
  last_updated: Date; // Thời điểm cập nhật gần nhất của hàng tồn kho
}

export type {Inventory}
