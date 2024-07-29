interface Attribute {
  id: number,
  name: string
  style: AttributeValue
}

interface AttributeValue {
  id: number,

  value: string
  slug: string
  hex_color: string | null
  attribute_id: number
}
enum AttributeStyle {
  IMAGE = "IMAGE",
  COLOR = "COLOR",
  CIRCLE = "CIRCLE",
  RECTANGLE = "RECTANGLE",
  RADIO = "RADIO"
}

interface ProductAttributeCreateInput {
  position: number,
  attribute: {
    connect: { id: number }
  },
  values: {
    connect: { id: number }[]
  }
}


export type { Attribute, AttributeValue, AttributeStyle , ProductAttributeCreateInput }