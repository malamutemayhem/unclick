export type FloorMatType = "rubber_all_weather" | "carpet_plush_oem" | "thermoplastic_laser_cut" | "vinyl_clear_protector" | "coco_fiber_scraper";

export function dirtTrap(t: FloorMatType): number {
  const m: Record<FloorMatType, number> = {
    rubber_all_weather: 9, carpet_plush_oem: 6, thermoplastic_laser_cut: 10, vinyl_clear_protector: 5, coco_fiber_scraper: 8,
  };
  return m[t];
}

export function cleanEase(t: FloorMatType): number {
  const m: Record<FloorMatType, number> = {
    rubber_all_weather: 9, carpet_plush_oem: 4, thermoplastic_laser_cut: 10, vinyl_clear_protector: 8, coco_fiber_scraper: 6,
  };
  return m[t];
}

export function durability(t: FloorMatType): number {
  const m: Record<FloorMatType, number> = {
    rubber_all_weather: 9, carpet_plush_oem: 5, thermoplastic_laser_cut: 10, vinyl_clear_protector: 6, coco_fiber_scraper: 7,
  };
  return m[t];
}

export function comfort(t: FloorMatType): number {
  const m: Record<FloorMatType, number> = {
    rubber_all_weather: 5, carpet_plush_oem: 9, thermoplastic_laser_cut: 6, vinyl_clear_protector: 4, coco_fiber_scraper: 3,
  };
  return m[t];
}

export function matCost(t: FloorMatType): number {
  const m: Record<FloorMatType, number> = {
    rubber_all_weather: 5, carpet_plush_oem: 4, thermoplastic_laser_cut: 8, vinyl_clear_protector: 3, coco_fiber_scraper: 6,
  };
  return m[t];
}

export function waterproof(t: FloorMatType): boolean {
  const m: Record<FloorMatType, boolean> = {
    rubber_all_weather: true, carpet_plush_oem: false, thermoplastic_laser_cut: true, vinyl_clear_protector: true, coco_fiber_scraper: false,
  };
  return m[t];
}

export function customFit(t: FloorMatType): boolean {
  const m: Record<FloorMatType, boolean> = {
    rubber_all_weather: false, carpet_plush_oem: true, thermoplastic_laser_cut: true, vinyl_clear_protector: false, coco_fiber_scraper: false,
  };
  return m[t];
}

export function matMaterial(t: FloorMatType): string {
  const m: Record<FloorMatType, string> = {
    rubber_all_weather: "heavy_gauge_rubber_molded",
    carpet_plush_oem: "nylon_tufted_pile_backing",
    thermoplastic_laser_cut: "tpe_odorless_precision",
    vinyl_clear_protector: "clear_vinyl_non_slip",
    coco_fiber_scraper: "natural_coconut_husk_fiber",
  };
  return m[t];
}

export function bestSeason(t: FloorMatType): string {
  const m: Record<FloorMatType, string> = {
    rubber_all_weather: "winter_rain_mud_snow",
    carpet_plush_oem: "year_round_comfort_look",
    thermoplastic_laser_cut: "all_season_premium_fit",
    vinyl_clear_protector: "showroom_carpet_preserve",
    coco_fiber_scraper: "muddy_trail_entry_scrape",
  };
  return m[t];
}

export function floorMats(): FloorMatType[] {
  return ["rubber_all_weather", "carpet_plush_oem", "thermoplastic_laser_cut", "vinyl_clear_protector", "coco_fiber_scraper"];
}
