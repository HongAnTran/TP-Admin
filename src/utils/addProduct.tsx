import { ProductOption, ProductVariant } from "@/types/product";
import { v4 as uuidv4 } from 'uuid';
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
  const unaccentedStr = unidecode(str);
  return unaccentedStr.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
}
export function generateVariants(options: ProductOption[]): ProductVariant[] {
  const variants: ProductVariant[] = [];
  const compareAtPrice = 14990000;
  const price = 11490000;
  const inventoryQuantity = 1;

  const available = true;

  const combinations = generateCombinations(options);

  combinations.forEach((combination, index) => {
    const variant: ProductVariant = {
      barcode: null,
      compare_at_price: compareAtPrice,
      option1: combination[0] || "",
      option2: combination[1] || "",
      option3: combination[2] || "",
      position: index,
      price: price,
      sku: uuidv4(),
      title: combination.join(" / "),
      updated_at: null,
      inventory_quantity: inventoryQuantity,
      available: available,

    };
    variants.push(variant);
  });

  return variants;
}