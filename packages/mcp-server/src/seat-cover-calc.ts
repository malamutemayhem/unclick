export type SeatCoverType = "neoprene_waterproof" | "leather_luxury_fit" | "sheepskin_wool_pad" | "mesh_breathable_sport" | "canvas_heavy_duty";

export function comfort(t: SeatCoverType): number {
  const m: Record<SeatCoverType, number> = {
    neoprene_waterproof: 7, leather_luxury_fit: 9, sheepskin_wool_pad: 10, mesh_breathable_sport: 6, canvas_heavy_duty: 5,
  };
  return m[t];
}

export function durability(t: SeatCoverType): number {
  const m: Record<SeatCoverType, number> = {
    neoprene_waterproof: 8, leather_luxury_fit: 7, sheepskin_wool_pad: 5, mesh_breathable_sport: 6, canvas_heavy_duty: 10,
  };
  return m[t];
}

export function waterResist(t: SeatCoverType): number {
  const m: Record<SeatCoverType, number> = {
    neoprene_waterproof: 10, leather_luxury_fit: 6, sheepskin_wool_pad: 3, mesh_breathable_sport: 4, canvas_heavy_duty: 8,
  };
  return m[t];
}

export function breathability(t: SeatCoverType): number {
  const m: Record<SeatCoverType, number> = {
    neoprene_waterproof: 4, leather_luxury_fit: 5, sheepskin_wool_pad: 9, mesh_breathable_sport: 10, canvas_heavy_duty: 6,
  };
  return m[t];
}

export function coverCost(t: SeatCoverType): number {
  const m: Record<SeatCoverType, number> = {
    neoprene_waterproof: 5, leather_luxury_fit: 9, sheepskin_wool_pad: 8, mesh_breathable_sport: 4, canvas_heavy_duty: 6,
  };
  return m[t];
}

export function machineWash(t: SeatCoverType): boolean {
  const m: Record<SeatCoverType, boolean> = {
    neoprene_waterproof: true, leather_luxury_fit: false, sheepskin_wool_pad: false, mesh_breathable_sport: true, canvas_heavy_duty: true,
  };
  return m[t];
}

export function universalFit(t: SeatCoverType): boolean {
  const m: Record<SeatCoverType, boolean> = {
    neoprene_waterproof: true, leather_luxury_fit: false, sheepskin_wool_pad: true, mesh_breathable_sport: true, canvas_heavy_duty: true,
  };
  return m[t];
}

export function coverMaterial(t: SeatCoverType): string {
  const m: Record<SeatCoverType, string> = {
    neoprene_waterproof: "synthetic_rubber_neoprene",
    leather_luxury_fit: "genuine_stitched_leather",
    sheepskin_wool_pad: "natural_sheep_fleece",
    mesh_breathable_sport: "polyester_air_mesh",
    canvas_heavy_duty: "cotton_duck_canvas_treated",
  };
  return m[t];
}

export function bestDriver(t: SeatCoverType): string {
  const m: Record<SeatCoverType, string> = {
    neoprene_waterproof: "outdoor_active_wet_gear",
    leather_luxury_fit: "luxury_sedan_upgrade",
    sheepskin_wool_pad: "cold_climate_comfort",
    mesh_breathable_sport: "hot_climate_daily_drive",
    canvas_heavy_duty: "work_truck_utility",
  };
  return m[t];
}

export function seatCovers(): SeatCoverType[] {
  return ["neoprene_waterproof", "leather_luxury_fit", "sheepskin_wool_pad", "mesh_breathable_sport", "canvas_heavy_duty"];
}
