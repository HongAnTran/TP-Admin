import { CategoryProduct } from "./categoryProduct";
import { FilterBase } from "./common";

type ProductId = number
enum ProductStatus {
  DRAFT,
  SHOW,
}

interface Product {
  id: ProductId;
  title: string;
  slug: string
  description_html: string | null
  vendor: string | null
  available: boolean
  status: ProductStatus,
  created_at: string
  updated_at: string | null
  published_at: string | null
  barcode: string | null
  options: ProductOption[]
  short_description: string | null
  tags: ProductTags[] | null
  price: number
  price_min: number
  price_max: number

  // metadata
  category_id: number
  images: string[]
  featured_image: string

  // image: ProductImage | null
  variants: ProductVariant[]
  category: CategoryProduct | null
  rating: ProductRating | null
  specifications: ProductSpecifications[]
  // meta
  meta_title: string | null
  meta_description: string | null
  meta_keywords: string | null
}

// type ProductList = Pick<Product, "id"|"title" | "slug" |"">

interface ProductVariant {
  barcode: null | string,
  compare_at_price: number,
  id?: number,
  option1: string,
  option2: string,
  option3: string,
  position: number,
  price: number,
  sku: string,
  title: string,
  updated_at: null | string,
  inventory_quantity: number,
  // image_id: number,
  available: boolean,
}


// interface ProductImage {
//   created_at: null | string,
//   id: number,
//   position: number,
//   product_id: ProductId,
//   updated_at: null | string,
//   src: string,
//   variant_ids: number[]
// }

interface ProductOption {
  name: string,
  position: number,
  product_id: ProductId | null,
  values: string[]
}


interface ProductTags {
  id: number
  value: string | number
  type_id: number
}
interface ProductSpecifications {
  id: number
  type_id: number
  name: string
  value: string
  description?: string
}
interface ProductTypeSpecifications {
  id: number
  name: string
  description?: string
}


type ProductOrder = Pick<Product, | "title" | "slug" | "category_id" | "vendor" | "barcode"> & {
  id: number,
  line_price: number
  price: number
  price_original: number
  line_price_original: number
  variant_id: number
  product_id: ProductId
  product_title: string
  variant_title: string
  variant_options: string[]
  quantity: number
  image: string
  selected: boolean
}
interface ProductRating {
  id: number,
  count: number
  rate: number
}



interface ProductsParams extends FilterBase {
  include?: string[],
  status?: ProductStatus
  category_id?: Product["category_id"]
  ids?: string
}
interface Products {
  products: Product[]
  total: number
}
export { ProductStatus }


type ProductCreateInput = {
  title: string
  slug: string
  description_html?: string | null
  vendor?: string | null
  available?: boolean
  status?: number
  created_at?: Date | string
  updated_at?: Date | string | null
  published_at?: Date | string | null
  barcode?: string | null
  short_description?: string | null
  meta_title?: string | null
  meta_description?: string | null
  meta_keywords?: string | null
  featured_image?: string | null
  price?: number
  price_max?: number
  price_min?: number
  images?: string[]
  category?: {
    connect: { id: number }
  }
  variants?: {
    createMany: {
      data: Partial<ProductVariant>[]
    }
  }, options?: {
    createMany: {
      data: Partial<ProductOption>[]
    }
  },

  specifications?: {
    connect: { id: number }[]
  }
}

type ProductUpdateInput = {
  title: string
  slug: string
  description_html?: string | null
  vendor?: string | null
  available?: boolean
  status?: number
  created_at?: Date | string
  updated_at?: Date | string | null
  published_at?: Date | string | null
  barcode?: string | null
  short_description?: string | null
  meta_title?: string | null
  meta_description?: string | null
  meta_keywords?: string | null
  featured_image?: string | null
  price?: number
  price_max?: number
  price_min?: number
  images?: string[]
  category?: {
    update: { id: number }
  }
  specifications?: {
    connect: { id: number }[]
  }
}
export type { Product, Products, ProductUpdateInput,ProductCreateInput, ProductsParams, ProductOption, ProductOrder, ProductVariant, ProductRating, ProductTypeSpecifications, ProductSpecifications };
