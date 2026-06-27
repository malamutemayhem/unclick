export type BarcodeType = "upc_a" | "ean_13" | "qr_code" | "data_matrix" | "code_128";

export function dataCapacity(b: BarcodeType): number {
  const m: Record<BarcodeType, number> = {
    upc_a: 2, ean_13: 3, qr_code: 10, data_matrix: 9, code_128: 6,
  };
  return m[b];
}

export function scanReliability(b: BarcodeType): number {
  const m: Record<BarcodeType, number> = {
    upc_a: 9, ean_13: 9, qr_code: 8, data_matrix: 7, code_128: 8,
  };
  return m[b];
}

export function printSize(b: BarcodeType): number {
  const m: Record<BarcodeType, number> = {
    upc_a: 6, ean_13: 6, qr_code: 3, data_matrix: 2, code_128: 7,
  };
  return m[b];
}

export function errorCorrection(b: BarcodeType): number {
  const m: Record<BarcodeType, number> = {
    upc_a: 3, ean_13: 3, qr_code: 10, data_matrix: 9, code_128: 4,
  };
  return m[b];
}

export function scanSpeed(b: BarcodeType): number {
  const m: Record<BarcodeType, number> = {
    upc_a: 10, ean_13: 10, qr_code: 7, data_matrix: 6, code_128: 9,
  };
  return m[b];
}

export function twoDimensional(b: BarcodeType): boolean {
  const m: Record<BarcodeType, boolean> = {
    upc_a: false, ean_13: false, qr_code: true, data_matrix: true, code_128: false,
  };
  return m[b];
}

export function supportsUrl(b: BarcodeType): boolean {
  const m: Record<BarcodeType, boolean> = {
    upc_a: false, ean_13: false, qr_code: true, data_matrix: true, code_128: false,
  };
  return m[b];
}

export function encodingType(b: BarcodeType): string {
  const m: Record<BarcodeType, string> = {
    upc_a: "numeric_12_digit", ean_13: "numeric_13_digit",
    qr_code: "alphanumeric_binary_kanji", data_matrix: "ascii_binary_matrix",
    code_128: "full_ascii_128_char",
  };
  return m[b];
}

export function bestApplication(b: BarcodeType): string {
  const m: Record<BarcodeType, string> = {
    upc_a: "north_america_retail", ean_13: "international_retail",
    qr_code: "marketing_mobile_payment", data_matrix: "electronics_pharma_marking",
    code_128: "shipping_logistics_label",
  };
  return m[b];
}

export function barcodeTypes(): BarcodeType[] {
  return ["upc_a", "ean_13", "qr_code", "data_matrix", "code_128"];
}
