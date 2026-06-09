export interface LineItem {
  description: string;
  quantity: number;
  unitPrice: number;
  taxRate: number;
  discount: number;
}

export interface InvoiceTotals {
  subtotal: number;
  totalDiscount: number;
  totalTax: number;
  total: number;
  lineDetails: LineDetail[];
}

export interface LineDetail {
  description: string;
  quantity: number;
  unitPrice: number;
  lineSubtotal: number;
  discountAmount: number;
  afterDiscount: number;
  taxAmount: number;
  lineTotal: number;
}

export function createLineItem(
  description: string,
  quantity: number,
  unitPrice: number,
  taxRate = 0,
  discount = 0
): LineItem {
  return { description, quantity, unitPrice, taxRate, discount };
}

export function computeLineDetail(item: LineItem): LineDetail {
  const lineSubtotal = item.quantity * item.unitPrice;
  const discountAmount = lineSubtotal * item.discount;
  const afterDiscount = lineSubtotal - discountAmount;
  const taxAmount = afterDiscount * item.taxRate;
  const lineTotal = afterDiscount + taxAmount;

  return {
    description: item.description,
    quantity: item.quantity,
    unitPrice: item.unitPrice,
    lineSubtotal,
    discountAmount,
    afterDiscount,
    taxAmount,
    lineTotal,
  };
}

export function computeInvoice(items: LineItem[]): InvoiceTotals {
  const lineDetails = items.map(computeLineDetail);
  const subtotal = lineDetails.reduce((sum, d) => sum + d.lineSubtotal, 0);
  const totalDiscount = lineDetails.reduce((sum, d) => sum + d.discountAmount, 0);
  const totalTax = lineDetails.reduce((sum, d) => sum + d.taxAmount, 0);
  const total = lineDetails.reduce((sum, d) => sum + d.lineTotal, 0);

  return { subtotal, totalDiscount, totalTax, total, lineDetails };
}

export function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

export function formatCurrency(amount: number, symbol = "$", decimals = 2): string {
  const negative = amount < 0;
  const abs = Math.abs(amount).toFixed(decimals);
  return (negative ? "-" : "") + symbol + abs;
}

export function splitPayment(total: number, ways: number): number[] {
  const base = Math.floor(total * 100 / ways) / 100;
  const remainder = round2(total - base * ways);
  const amounts: number[] = new Array(ways).fill(base);
  const cents = Math.round(remainder * 100);
  for (let i = 0; i < cents; i++) {
    amounts[i] = round2(amounts[i] + 0.01);
  }
  return amounts;
}

export function applyEarlyPaymentDiscount(total: number, discountRate: number, daysEarly: number, termDays: number): number {
  if (daysEarly <= 0 || daysEarly > termDays) return total;
  return round2(total * (1 - discountRate));
}

export function lateFee(total: number, dailyRate: number, daysLate: number): number {
  if (daysLate <= 0) return 0;
  return round2(total * dailyRate * daysLate);
}

export function totalWithLateFee(total: number, dailyRate: number, daysLate: number): number {
  return round2(total + lateFee(total, dailyRate, daysLate));
}

export function prorateDays(amount: number, totalDays: number, usedDays: number): number {
  if (totalDays <= 0) return 0;
  return round2(amount * usedDays / totalDays);
}

export function taxInclusiveToExclusive(total: number, taxRate: number): { preTax: number; tax: number } {
  const preTax = round2(total / (1 + taxRate));
  return { preTax, tax: round2(total - preTax) };
}

export function invoiceToText(items: LineItem[]): string {
  const result = computeInvoice(items);
  const lines = result.lineDetails.map(d =>
    `${d.description}: ${d.quantity} x ${formatCurrency(d.unitPrice)} = ${formatCurrency(d.lineTotal)}`
  );
  lines.push("---");
  lines.push(`Subtotal: ${formatCurrency(result.subtotal)}`);
  if (result.totalDiscount > 0) lines.push(`Discount: -${formatCurrency(result.totalDiscount)}`);
  if (result.totalTax > 0) lines.push(`Tax: ${formatCurrency(result.totalTax)}`);
  lines.push(`Total: ${formatCurrency(result.total)}`);
  return lines.join("\n");
}
