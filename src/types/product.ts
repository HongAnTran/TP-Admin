import { CategoryProduct } from "./categoryProduct";
import { FilterBase } from "./common";
import { Brand } from "./brand";

type ProductId = number
enum ProductStatus {
  DRAFT,
  SHOW,
}
interface Product {
  id: ProductId;
  title: string;
  slug: string
  category_id: number
  category: CategoryProduct
  description_html: string | null
  brand: Brand | null
  brand_id: number | null
  short_description: string | null
  available: boolean
  status: ProductStatus,
  created_at: string
  updated_at: string | null
  published_at: string | null
  barcode: string | null
  options: ProductOption[]
  // tags: ProductTags[] | null
  compare_at_price: number
  price: number
  price_min: number
  price_max: number
  // metadata
  images: ProductImage[]
  categories: ProductCategories[]
  variants: ProductVariant[]
  specifications: ProductSpecifications[]
  ratings: any
  // meta
  meta_data: {
    meta_title?: string
    meta_description?: string
    meta_keywords?: string
  }
}
interface ProductCategories {
  id: number
  category: CategoryProduct
  categoryId: number
  priority: number
}
interface ProductImage {
  created_at: null | string,
  id: number,
  alt_text: string | null
  position: number,
  product_id: ProductId,
  updated_at: null | string,
  url: string,
  is_featured: boolean
  productVariant: number[]
}

// type ProductList = Pick<Product, "id"|"title" | "slug" |"">

interface ProductVariant {
  barcode: null | string,
  compare_at_price: number,
  id: number,
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


interface ProductVariantCreateInput {
  barcode?: string,
  compare_at_price: number,
  option1: string,
  option2: string,
  option3: string,
  position: number,
  price: number,
  sku: string,
  title: string,
  updated_at?: string,
  inventory_quantity: number,
  available: boolean,
}



interface ProductOption {
  name: string,
  position: number,
  product_id: ProductId | null,
  values: string[]
}



interface ProductSpecifications {
  id: number
  group_id: number
  name: string
  value: string
}
interface ProductTypeSpecifications {
  id: number
  name: string
}
interface ProductGroupSpecifications {
  id: number
  name: string
  type_id: number
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
  datas: Product[]
  total: number
}
export { ProductStatus }


type ProductCreateInput = {
  title: string
  slug: string
  description_html?: string | null
  available?: boolean
  brand?: {
    connect: { id: number }

  },

  status?: number
  created_at?: Date | string
  updated_at?: Date | string | null
  published_at?: Date | string | null
  barcode?: string | null
  short_description?: string | null
  meta_data: {
    meta_title?: string | null
    meta_description?: string | null
    meta_keywords?: string | null
  }
  price?: number
  compare_at_price?: number
  price_max?: number
  price_min?: number
  images?: {
    createMany: {
      data: {
        url: string
        alt_text?: string | null
        position: number
        is_featured?: boolean
      }[]
    }
  },
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
  },
  sub_categories?: {
    create: {
      category: { connect : {id:number}}
    }[],

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
  compare_at_price?: number
  price_max?: number
  price_min?: number
  images?: string[]
  category_id?: number
}

type ProductVariantUpdateInput = Omit<Partial<ProductVariant>, "id">
export type { Product, ProductVariantCreateInput, ProductGroupSpecifications, ProductVariantUpdateInput, Products, ProductUpdateInput, ProductCreateInput, ProductsParams, ProductOption, ProductVariant, ProductRating, ProductTypeSpecifications, ProductSpecifications };
