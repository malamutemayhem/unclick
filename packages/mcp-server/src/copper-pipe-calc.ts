export type CopperPipeType = "type_m_thin_wall" | "type_l_medium_wall" | "type_k_heavy_wall" | "dwv_drain_large" | "acr_refrigerant";

export function pressureRating(t: CopperPipeType): number {
  const m: Record<CopperPipeType, number> = {
    type_m_thin_wall: 6, type_l_medium_wall: 8, type_k_heavy_wall: 10, dwv_drain_large: 3, acr_refrigerant: 9,
  };
  return m[t];
}

export function wallThickness(t: CopperPipeType): number {
  const m: Record<CopperPipeType, number> = {
    type_m_thin_wall: 4, type_l_medium_wall: 7, type_k_heavy_wall: 10, dwv_drain_large: 3, acr_refrigerant: 6,
  };
  return m[t];
}

export function solderEase(t: CopperPipeType): number {
  const m: Record<CopperPipeType, number> = {
    type_m_thin_wall: 9, type_l_medium_wall: 7, type_k_heavy_wall: 5, dwv_drain_large: 8, acr_refrigerant: 6,
  };
  return m[t];
}

export function corrosionResist(t: CopperPipeType): number {
  const m: Record<CopperPipeType, number> = {
    type_m_thin_wall: 7, type_l_medium_wall: 8, type_k_heavy_wall: 10, dwv_drain_large: 6, acr_refrigerant: 9,
  };
  return m[t];
}

export function pipeCost(t: CopperPipeType): number {
  const m: Record<CopperPipeType, number> = {
    type_m_thin_wall: 5, type_l_medium_wall: 7, type_k_heavy_wall: 10, dwv_drain_large: 6, acr_refrigerant: 8,
  };
  return m[t];
}

export function burialRated(t: CopperPipeType): boolean {
  const m: Record<CopperPipeType, boolean> = {
    type_m_thin_wall: false, type_l_medium_wall: true, type_k_heavy_wall: true, dwv_drain_large: false, acr_refrigerant: false,
  };
  return m[t];
}

export function cleanInside(t: CopperPipeType): boolean {
  const m: Record<CopperPipeType, boolean> = {
    type_m_thin_wall: false, type_l_medium_wall: false, type_k_heavy_wall: false, dwv_drain_large: false, acr_refrigerant: true,
  };
  return m[t];
}

export function colorCode(t: CopperPipeType): string {
  const m: Record<CopperPipeType, string> = {
    type_m_thin_wall: "red_stripe_marking",
    type_l_medium_wall: "blue_stripe_marking",
    type_k_heavy_wall: "green_stripe_marking",
    dwv_drain_large: "yellow_stripe_marking",
    acr_refrigerant: "no_stripe_clean_bare",
  };
  return m[t];
}

export function bestSystem(t: CopperPipeType): string {
  const m: Record<CopperPipeType, string> = {
    type_m_thin_wall: "interior_water_supply",
    type_l_medium_wall: "commercial_fire_sprinkler",
    type_k_heavy_wall: "underground_main_service",
    dwv_drain_large: "drain_waste_vent_large",
    acr_refrigerant: "hvac_refrigerant_line",
  };
  return m[t];
}

export function copperPipes(): CopperPipeType[] {
  return ["type_m_thin_wall", "type_l_medium_wall", "type_k_heavy_wall", "dwv_drain_large", "acr_refrigerant"];
}
