import { AttributeValue } from "@/types/attribute";
import { Product, ProductVariantCreateInput } from "@/types/product";
const vietnameseToUnaccented: { [x: string]: string } = {
  'À': 'A', 'Á': 'A', 'Â': 'A', 'Ã': 'A', 'È': 'E', 'É': 'E', 'Ê': 'E', 'Ì': 'I', 'Í': 'I',
  'Ò': 'O', 'Ó': 'O', 'Ô': 'O', 'Õ': 'O', 'Ù': 'U', 'Ú': 'U', 'Ý': 'Y', 'à': 'a', 'á': 'a',
  'â': 'a', 'ã': 'a', 'è': 'e', 'é': 'e', 'ê': 'e', 'ì': 'i', 'í': 'i', 'ò': 'o', 'ó': 'o',
  'ô': 'o', 'õ': 'o', 'ù': 'u', 'ú': 'u', 'ý': 'y', 'Ă': 'A', 'ă': 'a', 'Đ': 'D', 'đ': 'd',
  'Ĩ': 'I', 'ĩ': 'i', 'Ũ': 'U', 'ũ': 'u', 'Ơ': 'O', 'ơ': 'o', 'Ư': 'U', 'ư': 'u', 'Ạ': 'A',
  'ạ': 'a', 'Ả': 'A', 'ả': 'a', 'Ấ': 'A', 'ấ': 'a', 'Ầ': 'A', 'ầ': 'a', 'Ẩ': 'A', 'ẩ': 'a',
  'Ẫ': 'A', 'ẫ': 'a', 'Ậ': 'A', 'ậ': 'a', 'Ắ': 'A', 'ắ': 'a', 'Ằ': 'A', 'ằ': 'a', 'Ẳ': 'A',
  'ẳ': 'a', 'Ẵ': 'A', 'ẵ': 'a', 'Ặ': 'A', 'ặ': 'a', 'Ẹ': 'E', 'ẹ': 'e', 'Ẻ': 'E', 'ẻ': 'e',
  'Ẽ': 'E', 'ẽ': 'e', 'Ế': 'E', 'ế': 'e', 'Ề': 'E', 'ề': 'e', 'Ể': 'E', 'ể': 'e', 'Ễ': 'E',
  'ễ': 'e', 'Ệ': 'E', 'ệ': 'e', 'Ỉ': 'I', 'ỉ': 'i', 'Ị': 'I', 'ị': 'i', 'Ọ': 'O', 'ọ': 'o',
  'Ỏ': 'O', 'ỏ': 'o', 'Ố': 'O', 'ố': 'o', 'Ồ': 'O', 'ồ': 'o', 'Ổ': 'O', 'ổ': 'o', 'Ỗ': 'O',
  'ỗ': 'o', 'Ộ': 'O', 'ộ': 'o', 'Ớ': 'O', 'ớ': 'o', 'Ờ': 'O', 'ờ': 'o', 'Ở': 'O', 'ở': 'o',
  'Ỡ': 'O', 'ỡ': 'o', 'Ợ': 'O', 'ợ': 'o', 'Ụ': 'U', 'ụ': 'u', 'Ủ': 'U', 'ủ': 'u', 'Ứ': 'U',
  'ứ': 'u', 'Ừ': 'U', 'ừ': 'u', 'Ử': 'U', 'ử': 'u', 'Ữ': 'U', 'ữ': 'u', 'Ự': 'U', 'ự': 'u',
  'Ỳ': 'Y', 'ỳ': 'y', 'Ỵ': 'Y', 'ỵ': 'y', 'Ỷ': 'Y', 'ỷ': 'y', 'Ỹ': 'Y', 'ỹ': 'y'
};
function replaceVietnameseChars(str: string): string {
  return str.split('').map(char => vietnameseToUnaccented[char] || char).join('');
}

export function createSlug(str: string) {
  // Chuyển đổi ký tự tiếng Việt sang ký tự không dấu
  const unaccentedStr = replaceVietnameseChars(str);
  // Bỏ ký tự đặc biệt và khoảng trắng không cần thiết
  const cleanedStr = unaccentedStr.replace(/[^\w\s]/g, '').trim();
  // Thay thế nhiều khoảng trắng liên tiếp bằng một khoảng trắng
  const normalizedStr = cleanedStr.replace(/\s+/g, ' ');

  const replacedDotStr = normalizedStr.replace(/\./g, '-');
  // Thay thế khoảng trắng bằng dấu gạch ngang và bỏ các ký tự không phải chữ
  return replacedDotStr.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
}
export function generateCombinations(options: Pick<AttributeValue, "id" | "value">[][], index: number = 0, current: { id: number, value: string }[] = []): { id: number, value: string }[][] {
  if (index === options.length) {
    return [current];
  }

  const combinations: { id: number, value: string }[][] = [];
  for (const value of options[index]) {
    combinations.push(...generateCombinations(options, index + 1, [...current, value]));
  }
  return combinations;
}

export function createSKU(productTitle: Product["title"], variant: ProductVariantCreateInput) {
  // Bước 1: Tạo mã sản phẩm từ tên sản phẩm
  const productCode = productTitle[0].toUpperCase() + productTitle[1].toUpperCase() // "iPad Gen 10 10.9 inch 2022 LTE" -> "IG10192022LTE"

  const time = new Date().getTime()

  const sku = `${productCode}${variant.attribute_values.connect.map(va=>va.id).join("")}${time}`;

  return sku;
}


export function generateVariants(options: Pick<AttributeValue, "id" | "value">[][], productTitle: Product["title"]): ProductVariantCreateInput[] {
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
      position: index,
      price: price,
      title: combination.map(com => com.value).join(" / "),
      inventory_quantity: inventoryQuantity,
      available: available,
      sku: "",
      attribute_values: {
        connect: combination.map(com => ({ id: com.id }))
      }
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