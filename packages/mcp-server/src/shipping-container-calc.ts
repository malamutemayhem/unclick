export type ShippingContainer = "dry_standard" | "high_cube" | "refrigerated" | "open_top" | "flat_rack";

export function cargoVolume(s: ShippingContainer): number {
  const m: Record<ShippingContainer, number> = {
    dry_standard: 7, high_cube: 9, refrigerated: 6, open_top: 7, flat_rack: 5,
  };
  return m[s];
}

export function maxPayload(s: ShippingContainer): number {
  const m: Record<ShippingContainer, number> = {
    dry_standard: 8, high_cube: 7, refrigerated: 6, open_top: 8, flat_rack: 10,
  };
  return m[s];
}

export function weatherProtection(s: ShippingContainer): number {
  const m: Record<ShippingContainer, number> = {
    dry_standard: 9, high_cube: 9, refrigerated: 10, open_top: 4, flat_rack: 2,
  };
  return m[s];
}

export function loadingFlexibility(s: ShippingContainer): number {
  const m: Record<ShippingContainer, number> = {
    dry_standard: 5, high_cube: 6, refrigerated: 4, open_top: 9, flat_rack: 10,
  };
  return m[s];
}

export function dailyRate(s: ShippingContainer): number {
  const m: Record<ShippingContainer, number> = {
    dry_standard: 3, high_cube: 4, refrigerated: 10, open_top: 6, flat_rack: 7,
  };
  return m[s];
}

export function temperatureControlled(s: ShippingContainer): boolean {
  const m: Record<ShippingContainer, boolean> = {
    dry_standard: false, high_cube: false, refrigerated: true, open_top: false, flat_rack: false,
  };
  return m[s];
}

export function stackable(s: ShippingContainer): boolean {
  const m: Record<ShippingContainer, boolean> = {
    dry_standard: true, high_cube: true, refrigerated: true, open_top: true, flat_rack: false,
  };
  return m[s];
}

export function constructionType(s: ShippingContainer): string {
  const m: Record<ShippingContainer, string> = {
    dry_standard: "corten_steel_enclosed", high_cube: "corten_steel_extra_height",
    refrigerated: "insulated_refrigeration_unit", open_top: "removable_tarp_roof",
    flat_rack: "collapsible_end_wall_platform",
  };
  return m[s];
}

export function bestCargo(s: ShippingContainer): string {
  const m: Record<ShippingContainer, string> = {
    dry_standard: "general_dry_goods", high_cube: "lightweight_voluminous_cargo",
    refrigerated: "perishable_food_pharma", open_top: "tall_machinery_bulk",
    flat_rack: "oversized_heavy_equipment",
  };
  return m[s];
}

export function shippingContainers(): ShippingContainer[] {
  return ["dry_standard", "high_cube", "refrigerated", "open_top", "flat_rack"];
}
