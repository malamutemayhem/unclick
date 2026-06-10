export type PrintFinish = "uv_coating" | "aqueous_coating" | "lamination" | "soft_touch" | "spot_varnish";

export function glossLevel(p: PrintFinish): number {
  const m: Record<PrintFinish, number> = {
    uv_coating: 10, aqueous_coating: 7, lamination: 8, soft_touch: 2, spot_varnish: 9,
  };
  return m[p];
}

export function durability(p: PrintFinish): number {
  const m: Record<PrintFinish, number> = {
    uv_coating: 9, aqueous_coating: 5, lamination: 10, soft_touch: 8, spot_varnish: 7,
  };
  return m[p];
}

export function tactileFeel(p: PrintFinish): number {
  const m: Record<PrintFinish, number> = {
    uv_coating: 4, aqueous_coating: 3, lamination: 5, soft_touch: 10, spot_varnish: 7,
  };
  return m[p];
}

export function printability(p: PrintFinish): number {
  const m: Record<PrintFinish, number> = {
    uv_coating: 6, aqueous_coating: 9, lamination: 4, soft_touch: 5, spot_varnish: 7,
  };
  return m[p];
}

export function processCost(p: PrintFinish): number {
  const m: Record<PrintFinish, number> = {
    uv_coating: 7, aqueous_coating: 3, lamination: 6, soft_touch: 9, spot_varnish: 10,
  };
  return m[p];
}

export function recyclable(p: PrintFinish): boolean {
  const m: Record<PrintFinish, boolean> = {
    uv_coating: true, aqueous_coating: true, lamination: false, soft_touch: false, spot_varnish: true,
  };
  return m[p];
}

export function requiresSpecialEquipment(p: PrintFinish): boolean {
  const m: Record<PrintFinish, boolean> = {
    uv_coating: true, aqueous_coating: false, lamination: true, soft_touch: true, spot_varnish: true,
  };
  return m[p];
}

export function applicationMethod(p: PrintFinish): string {
  const m: Record<PrintFinish, string> = {
    uv_coating: "roller_uv_lamp_cure", aqueous_coating: "inline_flood_roller",
    lamination: "thermal_adhesive_film", soft_touch: "matte_laminate_rubberized",
    spot_varnish: "screen_plate_selective",
  };
  return m[p];
}

export function bestProduct(p: PrintFinish): string {
  const m: Record<PrintFinish, string> = {
    uv_coating: "brochure_catalog_cover", aqueous_coating: "general_commercial_print",
    lamination: "book_cover_menu_card", soft_touch: "luxury_packaging_business_card",
    spot_varnish: "premium_invite_label",
  };
  return m[p];
}

export function printFinishes(): PrintFinish[] {
  return ["uv_coating", "aqueous_coating", "lamination", "soft_touch", "spot_varnish"];
}
