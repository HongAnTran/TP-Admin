import { CategoryProduct } from "./categoryProduct";
import { FilterBase } from "./common";
import { Brand } from "./brand";
import { Attribute, AttributeValue, ProductAttributeCreateInput } from "./attribute";

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
  brand_id: number | null
  available: boolean
  status: ProductStatus,
  created_at: string
  updated_at: string | null
  published_at: string | null
  barcode: string | null
  short_description: string | null
  price: number
  compare_at_price: number
  price_min: number
  price_max: number
  related: number[],
  category_id: number
  category: CategoryProduct
  sub_categories: ProductCategories[]
  brand: Brand | null
  tags: Tags[]
  attributes: ProductAttribute[]
  // metadata
  images: ProductImage[]
  variants: ProductVariant[]
  meta_data: {
    meta_title?: string
    meta_description?: string
    meta_keywords?: string
  } | null,
  meta_tags: object | null
}
interface ProductAttribute {
  id: number
  position: number,
  attribute: Attribute
  values: AttributeValue[]
}

interface Tags {
  id: number,
  name: string
  slug: string
  description: string | null
  published: boolean
}
interface ProductCategories {
  id: number
  category: CategoryProduct
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


interface ProductImageUpdate {
  url?: string
  alt_text?: string | null
  position?: number
  is_featured?: boolean
}

interface ProductImageCreate {

  url?: string
  alt_text?: string | null
  position?: number
  is_featured?: boolean
  product?: {
    connect: {
      id: number
    }
  }
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
  image: ProductImage | null,
  image_id: number | null
  available: boolean,
  // optionValues : 
}


interface ProductVariantCreateInput {
  barcode?: string,
  compare_at_price: number,
  position: number,
  price: number,
  sku: string,
  title: string,
  updated_at?: string,
  inventory_quantity: number,
  available: boolean,
  attribute_values: {
    connect: { id: number }[]
  }
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
  price_min?: number,
  related?: number[]

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
    create: Partial<ProductVariant>[]
  },
  attributes?: {
    create: ProductAttributeCreateInput[]
  },
  specifications?: {
    connect: { id: number }[]
  },
  sub_categories?: {
    create: {
      category: { connect: { id: number } }
    }[],
  },
  tags?: {
    connect: { id: number }[]
  }
}

type ProductUpdateInput = {
  title?: string
  slug?: string
  description_html?: string | null
  available?: boolean
  status?: number
  barcode?: string | null
  short_description?: string | null
  meta_data?: {
    meta_title?: string | null
    meta_description?: string | null
    meta_keywords?: string | null
  }
  meta_tags?: object
  price?: number
  compare_at_price?: number
  price_max?: number
  price_min?: number

  brand?: {
    connect: {
      id: number | null
    }
  }
  category?: {
    connect: {
      id: number | null
    }
  },
  sub_categories?: {
    connectOrCreate: {
      where: { category_id: number },
      create: {category: { connect: { id: number } }}[]
    }
  }
}



type ProductVariantUpdateInput = {
  barcode?: null | string,
  compare_at_price?: number,
  option1?: string,
  option2?: string,
  option3?: string,
  position?: number,
  price?: number,
  sku?: string,
  title?: string,
  updated_at?: null | string,
  inventory_quantity?: number,
  image?: {
    connect: { id: number }
  },
  available?: boolean,
}


export type { Product, ProductAttribute,ProductImageCreate, ProductImage, ProductImageUpdate, ProductVariantCreateInput, ProductGroupSpecifications, ProductVariantUpdateInput, Products, ProductUpdateInput, ProductCreateInput, ProductsParams, ProductOption, ProductVariant, ProductRating, ProductTypeSpecifications, ProductSpecifications };
