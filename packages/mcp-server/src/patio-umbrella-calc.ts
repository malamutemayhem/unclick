export type PatioUmbrellaType = "market_center_pole" | "cantilever_offset_arm" | "tilt_crank_table" | "beach_portable_spike" | "commercial_square_large";

export function shadeArea(t: PatioUmbrellaType): number {
  const m: Record<PatioUmbrellaType, number> = {
    market_center_pole: 6, cantilever_offset_arm: 9, tilt_crank_table: 6, beach_portable_spike: 4, commercial_square_large: 10,
  };
  return m[t];
}

export function windResist(t: PatioUmbrellaType): number {
  const m: Record<PatioUmbrellaType, number> = {
    market_center_pole: 6, cantilever_offset_arm: 4, tilt_crank_table: 7, beach_portable_spike: 3, commercial_square_large: 8,
  };
  return m[t];
}

export function adjustability(t: PatioUmbrellaType): number {
  const m: Record<PatioUmbrellaType, number> = {
    market_center_pole: 4, cantilever_offset_arm: 10, tilt_crank_table: 8, beach_portable_spike: 3, commercial_square_large: 5,
  };
  return m[t];
}

export function portability(t: PatioUmbrellaType): number {
  const m: Record<PatioUmbrellaType, number> = {
    market_center_pole: 6, cantilever_offset_arm: 2, tilt_crank_table: 5, beach_portable_spike: 10, commercial_square_large: 1,
  };
  return m[t];
}

export function umbrellaCost(t: PatioUmbrellaType): number {
  const m: Record<PatioUmbrellaType, number> = {
    market_center_pole: 4, cantilever_offset_arm: 8, tilt_crank_table: 5, beach_portable_spike: 2, commercial_square_large: 9,
  };
  return m[t];
}

export function uvProtection(t: PatioUmbrellaType): boolean {
  const m: Record<PatioUmbrellaType, boolean> = {
    market_center_pole: true, cantilever_offset_arm: true, tilt_crank_table: true, beach_portable_spike: true, commercial_square_large: true,
  };
  return m[t];
}

export function hasCrank(t: PatioUmbrellaType): boolean {
  const m: Record<PatioUmbrellaType, boolean> = {
    market_center_pole: true, cantilever_offset_arm: true, tilt_crank_table: true, beach_portable_spike: false, commercial_square_large: true,
  };
  return m[t];
}

export function canopyFabric(t: PatioUmbrellaType): string {
  const m: Record<PatioUmbrellaType, string> = {
    market_center_pole: "polyester_fade_resist",
    cantilever_offset_arm: "sunbrella_acrylic_premium",
    tilt_crank_table: "olefin_tilt_panel",
    beach_portable_spike: "nylon_lightweight_vent",
    commercial_square_large: "solution_dyed_acrylic",
  };
  return m[t];
}

export function bestSpot(t: PatioUmbrellaType): string {
  const m: Record<PatioUmbrellaType, string> = {
    market_center_pole: "table_center_hole_patio",
    cantilever_offset_arm: "pool_deck_lounge_area",
    tilt_crank_table: "deck_balcony_sun_angle",
    beach_portable_spike: "sand_beach_park_field",
    commercial_square_large: "restaurant_cafe_resort",
  };
  return m[t];
}

export function patioUmbrellas(): PatioUmbrellaType[] {
  return ["market_center_pole", "cantilever_offset_arm", "tilt_crank_table", "beach_portable_spike", "commercial_square_large"];
}
