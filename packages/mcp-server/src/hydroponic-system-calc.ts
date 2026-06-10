export type HydroponicSystem = "deep_water_culture" | "nutrient_film" | "ebb_flow" | "drip" | "aeroponics";

export function oxygenDelivery(h: HydroponicSystem): number {
  const m: Record<HydroponicSystem, number> = {
    deep_water_culture: 7, nutrient_film: 8, ebb_flow: 6, drip: 5, aeroponics: 10,
  };
  return m[h];
}

export function waterEfficiency(h: HydroponicSystem): number {
  const m: Record<HydroponicSystem, number> = {
    deep_water_culture: 5, nutrient_film: 8, ebb_flow: 7, drip: 6, aeroponics: 10,
  };
  return m[h];
}

export function setupComplexity(h: HydroponicSystem): number {
  const m: Record<HydroponicSystem, number> = {
    deep_water_culture: 2, nutrient_film: 5, ebb_flow: 6, drip: 4, aeroponics: 10,
  };
  return m[h];
}

export function growthRate(h: HydroponicSystem): number {
  const m: Record<HydroponicSystem, number> = {
    deep_water_culture: 8, nutrient_film: 7, ebb_flow: 6, drip: 7, aeroponics: 10,
  };
  return m[h];
}

export function maintenanceFrequency(h: HydroponicSystem): number {
  const m: Record<HydroponicSystem, number> = {
    deep_water_culture: 4, nutrient_film: 6, ebb_flow: 5, drip: 7, aeroponics: 9,
  };
  return m[h];
}

export function requiresGrowMedia(h: HydroponicSystem): boolean {
  const m: Record<HydroponicSystem, boolean> = {
    deep_water_culture: false, nutrient_film: false, ebb_flow: true, drip: true, aeroponics: false,
  };
  return m[h];
}

export function suitableForLeafyGreens(h: HydroponicSystem): boolean {
  const m: Record<HydroponicSystem, boolean> = {
    deep_water_culture: true, nutrient_film: true, ebb_flow: true, drip: false, aeroponics: true,
  };
  return m[h];
}

export function nutrientDelivery(h: HydroponicSystem): string {
  const m: Record<HydroponicSystem, string> = {
    deep_water_culture: "submerged_root_aerated", nutrient_film: "thin_flowing_channel",
    ebb_flow: "periodic_flood_drain", drip: "emitter_to_root_zone",
    aeroponics: "misted_suspended_root",
  };
  return m[h];
}

export function bestCrop(h: HydroponicSystem): string {
  const m: Record<HydroponicSystem, string> = {
    deep_water_culture: "lettuce_herb_beginner", nutrient_film: "leafy_green_commercial",
    ebb_flow: "tomato_pepper_fruiting", drip: "large_plant_vine_crop",
    aeroponics: "high_value_rapid_growth",
  };
  return m[h];
}

export function hydroponicSystems(): HydroponicSystem[] {
  return ["deep_water_culture", "nutrient_film", "ebb_flow", "drip", "aeroponics"];
}
