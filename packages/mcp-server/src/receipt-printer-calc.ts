export type ReceiptPrinter = "thermal" | "dot_matrix" | "inkjet" | "laser" | "mobile_bluetooth";

export function printSpeed(r: ReceiptPrinter): number {
  const m: Record<ReceiptPrinter, number> = {
    thermal: 10, dot_matrix: 4, inkjet: 6, laser: 8, mobile_bluetooth: 5,
  };
  return m[r];
}

export function printQuality(r: ReceiptPrinter): number {
  const m: Record<ReceiptPrinter, number> = {
    thermal: 6, dot_matrix: 3, inkjet: 8, laser: 10, mobile_bluetooth: 5,
  };
  return m[r];
}

export function operatingCost(r: ReceiptPrinter): number {
  const m: Record<ReceiptPrinter, number> = {
    thermal: 3, dot_matrix: 4, inkjet: 7, laser: 6, mobile_bluetooth: 5,
  };
  return m[r];
}

export function noiseLevel(r: ReceiptPrinter): number {
  const m: Record<ReceiptPrinter, number> = {
    thermal: 2, dot_matrix: 9, inkjet: 5, laser: 4, mobile_bluetooth: 1,
  };
  return m[r];
}

export function durability(r: ReceiptPrinter): number {
  const m: Record<ReceiptPrinter, number> = {
    thermal: 7, dot_matrix: 10, inkjet: 4, laser: 6, mobile_bluetooth: 5,
  };
  return m[r];
}

export function requiresInk(r: ReceiptPrinter): boolean {
  const m: Record<ReceiptPrinter, boolean> = {
    thermal: false, dot_matrix: true, inkjet: true, laser: true, mobile_bluetooth: false,
  };
  return m[r];
}

export function wireless(r: ReceiptPrinter): boolean {
  const m: Record<ReceiptPrinter, boolean> = {
    thermal: false, dot_matrix: false, inkjet: false, laser: false, mobile_bluetooth: true,
  };
  return m[r];
}

export function paperType(r: ReceiptPrinter): string {
  const m: Record<ReceiptPrinter, string> = {
    thermal: "thermal_coated_roll", dot_matrix: "multi_part_carbon",
    inkjet: "plain_roll_sheet", laser: "cut_sheet_standard",
    mobile_bluetooth: "thermal_mini_roll",
  };
  return m[r];
}

export function bestApplication(r: ReceiptPrinter): string {
  const m: Record<ReceiptPrinter, string> = {
    thermal: "retail_pos_fast_service", dot_matrix: "kitchen_order_multipart",
    inkjet: "color_coupon_receipt", laser: "detailed_invoice_report",
    mobile_bluetooth: "delivery_field_service",
  };
  return m[r];
}

export function receiptPrinters(): ReceiptPrinter[] {
  return ["thermal", "dot_matrix", "inkjet", "laser", "mobile_bluetooth"];
}
