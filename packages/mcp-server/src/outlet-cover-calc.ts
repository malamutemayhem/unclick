export type OutletCoverType = "standard_duplex_nylon" | "decorator_screwless_snap" | "weatherproof_bubble_clear" | "floor_outlet_brass" | "usb_charger_combo";

export function durability(t: OutletCoverType): number {
  const m: Record<OutletCoverType, number> = {
    standard_duplex_nylon: 7, decorator_screwless_snap: 6, weatherproof_bubble_clear: 10, floor_outlet_brass: 9, usb_charger_combo: 5,
  };
  return m[t];
}

export function aestheticAppeal(t: OutletCoverType): number {
  const m: Record<OutletCoverType, number> = {
    standard_duplex_nylon: 4, decorator_screwless_snap: 10, weatherproof_bubble_clear: 3, floor_outlet_brass: 8, usb_charger_combo: 7,
  };
  return m[t];
}

export function installEase(t: OutletCoverType): number {
  const m: Record<OutletCoverType, number> = {
    standard_duplex_nylon: 9, decorator_screwless_snap: 10, weatherproof_bubble_clear: 6, floor_outlet_brass: 4, usb_charger_combo: 5,
  };
  return m[t];
}

export function safetyRating(t: OutletCoverType): number {
  const m: Record<OutletCoverType, number> = {
    standard_duplex_nylon: 7, decorator_screwless_snap: 7, weatherproof_bubble_clear: 10, floor_outlet_brass: 8, usb_charger_combo: 6,
  };
  return m[t];
}

export function coverCost(t: OutletCoverType): number {
  const m: Record<OutletCoverType, number> = {
    standard_duplex_nylon: 2, decorator_screwless_snap: 5, weatherproof_bubble_clear: 6, floor_outlet_brass: 9, usb_charger_combo: 8,
  };
  return m[t];
}

export function outdoorRated(t: OutletCoverType): boolean {
  const m: Record<OutletCoverType, boolean> = {
    standard_duplex_nylon: false, decorator_screwless_snap: false, weatherproof_bubble_clear: true, floor_outlet_brass: false, usb_charger_combo: false,
  };
  return m[t];
}

export function screwless(t: OutletCoverType): boolean {
  const m: Record<OutletCoverType, boolean> = {
    standard_duplex_nylon: false, decorator_screwless_snap: true, weatherproof_bubble_clear: false, floor_outlet_brass: false, usb_charger_combo: false,
  };
  return m[t];
}

export function plateMaterial(t: OutletCoverType): string {
  const m: Record<OutletCoverType, string> = {
    standard_duplex_nylon: "thermoplastic_nylon",
    decorator_screwless_snap: "polycarbonate_snap_on",
    weatherproof_bubble_clear: "die_cast_aluminum_gasket",
    floor_outlet_brass: "solid_brass_hinged",
    usb_charger_combo: "abs_plastic_circuit",
  };
  return m[t];
}

export function bestLocation(t: OutletCoverType): string {
  const m: Record<OutletCoverType, string> = {
    standard_duplex_nylon: "general_interior_room",
    decorator_screwless_snap: "living_room_visible",
    weatherproof_bubble_clear: "exterior_patio_deck",
    floor_outlet_brass: "kitchen_island_desk",
    usb_charger_combo: "bedroom_nightstand_area",
  };
  return m[t];
}

export function outletCovers(): OutletCoverType[] {
  return ["standard_duplex_nylon", "decorator_screwless_snap", "weatherproof_bubble_clear", "floor_outlet_brass", "usb_charger_combo"];
}
