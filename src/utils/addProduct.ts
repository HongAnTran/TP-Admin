import { Product, ProductOption,  ProductVariantCreateInput } from "@/types/product";
import unidecode from "unidecode"

export function generateCombinations(options: ProductOption[], index: number = 0, current: string[] = []): string[][] {
  if (index === options.length) {
    return [current];
  }

  const combinations: string[][] = [];
  for (const value of options[index].values) {
    combinations.push(...generateCombinations(options, index + 1, [...current, value]));
  }
  return combinations;
}
export function createSlug(str: string) {
  // Bỏ ký tự đặc biệt
  const cleanedStr = str.replace(/[^\w\s]/g, '').trim();
  // Chuyển đổi sang ký tự không dấu
  const unaccentedStr = unidecode(cleanedStr);
  // Thay thế nhiều khoảng trắng liên tiếp bằng một khoảng trắng
  const normalizedStr = unaccentedStr.replace(/\s+/g, ' ');
  // Thay thế khoảng trắng bằng dấu gạch ngang và bỏ các ký tự không phải chữ
  return normalizedStr.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
}

export function createSKU(productTitle: Product["title"], variant: ProductVariantCreateInput) {
   // Bước 1: Tạo mã sản phẩm từ tên sản phẩm
   const productCode = productTitle.split(' ').map(word => word[0].toUpperCase()).join(''); // "iPad Gen 10 10.9 inch 2022 LTE" -> "IG10192022LTE"

    const options = [variant.option1 , variant.option2 , variant.option3].filter(Boolean).map(op=>createSlug(op)).join("-")

   const sku = `${productCode}-${options}-${variant.position}`;
 
   return sku;
}
export function generateVariants(options: ProductOption[], productTitle: Product["title"]): ProductVariantCreateInput[] {
  if (!options.length) return []
  const variants: ProductVariantCreateInput[] = [];
  const compareAtPrice = 0;
  const price = 0;
  const inventoryQuantity = 1;

  const available = true;

  const combinations = generateCombinations(options);

  combinations.forEach((combination, index) => {
    const variant: ProductVariantCreateInput = {
      compare_at_price: compareAtPrice,
      option1: combination[0] || "",
      option2: combination[1] || "",
      option3: combination[2] || "",
      position: index,
      price: price,
      title: combination.join(" / "),
      inventory_quantity: inventoryQuantity,
      available: available,
      sku : ""
    };

    variant.sku = createSKU(productTitle, variant)
    variants.push(variant);
  });

  return variants;
}


export function fillArray(length: number) {
  return Array.from({ length }, () => "");
}

export function fillArrayToLength(arr: any[], length: number, data: any = null) {
  while (arr.length < length) {
    arr.push(data);
  }
  return arr;
}