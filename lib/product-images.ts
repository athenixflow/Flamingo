import manifest from "@/content/product-image-manifest.json";

const map = manifest as Record<string, string>;

export function getProductImage(fCode: string): string | null {
  return map[fCode.toUpperCase()] ?? null;
}

export function hasProductImage(fCode: string): boolean {
  return fCode.toUpperCase() in map;
}
