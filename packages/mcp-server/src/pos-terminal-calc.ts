export type PosTerminal = "countertop" | "mobile" | "self_service_kiosk" | "integrated" | "virtual";

export function transactionSpeed(p: PosTerminal): number {
  const m: Record<PosTerminal, number> = {
    countertop: 8, mobile: 6, self_service_kiosk: 5, integrated: 9, virtual: 7,
  };
  return m[p];
}

export function hardwareCost(p: PosTerminal): number {
  const m: Record<PosTerminal, number> = {
    countertop: 5, mobile: 3, self_service_kiosk: 9, integrated: 7, virtual: 1,
  };
  return m[p];
}

export function portability(p: PosTerminal): number {
  const m: Record<PosTerminal, number> = {
    countertop: 2, mobile: 10, self_service_kiosk: 1, integrated: 3, virtual: 9,
  };
  return m[p];
}

export function receiptOptions(p: PosTerminal): number {
  const m: Record<PosTerminal, number> = {
    countertop: 8, mobile: 5, self_service_kiosk: 7, integrated: 9, virtual: 6,
  };
  return m[p];
}

export function customerThroughput(p: PosTerminal): number {
  const m: Record<PosTerminal, number> = {
    countertop: 7, mobile: 4, self_service_kiosk: 9, integrated: 8, virtual: 3,
  };
  return m[p];
}

export function acceptsContactless(p: PosTerminal): boolean {
  const m: Record<PosTerminal, boolean> = {
    countertop: true, mobile: true, self_service_kiosk: true, integrated: true, virtual: false,
  };
  return m[p];
}

export function requiresInternet(p: PosTerminal): boolean {
  const m: Record<PosTerminal, boolean> = {
    countertop: false, mobile: true, self_service_kiosk: true, integrated: false, virtual: true,
  };
  return m[p];
}

export function paymentMethods(p: PosTerminal): string {
  const m: Record<PosTerminal, string> = {
    countertop: "chip_swipe_tap_cash", mobile: "tap_chip_qr",
    self_service_kiosk: "card_mobile_wallet", integrated: "all_payment_types",
    virtual: "online_card_not_present",
  };
  return m[p];
}

export function bestBusiness(p: PosTerminal): string {
  const m: Record<PosTerminal, string> = {
    countertop: "retail_store_restaurant", mobile: "food_truck_market_stall",
    self_service_kiosk: "fast_food_cinema", integrated: "large_chain_enterprise",
    virtual: "ecommerce_phone_order",
  };
  return m[p];
}

export function posTerminals(): PosTerminal[] {
  return ["countertop", "mobile", "self_service_kiosk", "integrated", "virtual"];
}
