export type WeightVestType = "plate_carrier_tactical" | "sand_pouch_adjustable" | "slim_profile_running" | "heavy_duty_crossfit" | "weighted_shirt_concealed";

export function loadCapacity(t: WeightVestType): number {
  const m: Record<WeightVestType, number> = {
    plate_carrier_tactical: 10, sand_pouch_adjustable: 7, slim_profile_running: 4, heavy_duty_crossfit: 9, weighted_shirt_concealed: 5,
  };
  return m[t];
}

export function mobility(t: WeightVestType): number {
  const m: Record<WeightVestType, number> = {
    plate_carrier_tactical: 5, sand_pouch_adjustable: 7, slim_profile_running: 10, heavy_duty_crossfit: 6, weighted_shirt_concealed: 9,
  };
  return m[t];
}

export function fitAdjust(t: WeightVestType): number {
  const m: Record<WeightVestType, number> = {
    plate_carrier_tactical: 9, sand_pouch_adjustable: 8, slim_profile_running: 7, heavy_duty_crossfit: 8, weighted_shirt_concealed: 6,
  };
  return m[t];
}

export function breathability(t: WeightVestType): number {
  const m: Record<WeightVestType, number> = {
    plate_carrier_tactical: 6, sand_pouch_adjustable: 7, slim_profile_running: 9, heavy_duty_crossfit: 5, weighted_shirt_concealed: 8,
  };
  return m[t];
}

export function vestCost(t: WeightVestType): number {
  const m: Record<WeightVestType, number> = {
    plate_carrier_tactical: 3, sand_pouch_adjustable: 2, slim_profile_running: 2, heavy_duty_crossfit: 3, weighted_shirt_concealed: 2,
  };
  return m[t];
}

export function removablePlates(t: WeightVestType): boolean {
  const m: Record<WeightVestType, boolean> = {
    plate_carrier_tactical: true, sand_pouch_adjustable: true, slim_profile_running: false, heavy_duty_crossfit: true, weighted_shirt_concealed: false,
  };
  return m[t];
}

export function lowProfile(t: WeightVestType): boolean {
  const m: Record<WeightVestType, boolean> = {
    plate_carrier_tactical: false, sand_pouch_adjustable: false, slim_profile_running: true, heavy_duty_crossfit: false, weighted_shirt_concealed: true,
  };
  return m[t];
}

export function weightType(t: WeightVestType): string {
  const m: Record<WeightVestType, string> = {
    plate_carrier_tactical: "steel_cast_plate",
    sand_pouch_adjustable: "iron_sand_pouch",
    slim_profile_running: "integrated_micro_weight",
    heavy_duty_crossfit: "ductile_iron_curved",
    weighted_shirt_concealed: "flex_gel_strip",
  };
  return m[t];
}

export function bestActivity(t: WeightVestType): string {
  const m: Record<WeightVestType, string> = {
    plate_carrier_tactical: "ruck_march_training",
    sand_pouch_adjustable: "bodyweight_progression",
    slim_profile_running: "weighted_run_walk",
    heavy_duty_crossfit: "murph_wod_competition",
    weighted_shirt_concealed: "daily_wear_stealth",
  };
  return m[t];
}

export function weightVests(): WeightVestType[] {
  return ["plate_carrier_tactical", "sand_pouch_adjustable", "slim_profile_running", "heavy_duty_crossfit", "weighted_shirt_concealed"];
}
