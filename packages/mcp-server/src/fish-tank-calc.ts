export type FishTankType = "nano_5_gallon" | "standard_20_gallon" | "rimless_cube" | "bow_front_display" | "planted_high_tech";

export function waterVolume(t: FishTankType): number {
  const m: Record<FishTankType, number> = {
    nano_5_gallon: 2, standard_20_gallon: 6, rimless_cube: 4, bow_front_display: 8, planted_high_tech: 7,
  };
  return m[t];
}

export function viewClarity(t: FishTankType): number {
  const m: Record<FishTankType, number> = {
    nano_5_gallon: 7, standard_20_gallon: 6, rimless_cube: 10, bow_front_display: 9, planted_high_tech: 8,
  };
  return m[t];
}

export function maintenanceEase(t: FishTankType): number {
  const m: Record<FishTankType, number> = {
    nano_5_gallon: 6, standard_20_gallon: 8, rimless_cube: 5, bow_front_display: 4, planted_high_tech: 3,
  };
  return m[t];
}

export function fishCapacity(t: FishTankType): number {
  const m: Record<FishTankType, number> = {
    nano_5_gallon: 2, standard_20_gallon: 7, rimless_cube: 3, bow_front_display: 9, planted_high_tech: 6,
  };
  return m[t];
}

export function tankCost(t: FishTankType): number {
  const m: Record<FishTankType, number> = {
    nano_5_gallon: 2, standard_20_gallon: 3, rimless_cube: 7, bow_front_display: 8, planted_high_tech: 10,
  };
  return m[t];
}

export function lidIncluded(t: FishTankType): boolean {
  const m: Record<FishTankType, boolean> = {
    nano_5_gallon: true, standard_20_gallon: true, rimless_cube: false, bow_front_display: true, planted_high_tech: false,
  };
  return m[t];
}

export function co2Ready(t: FishTankType): boolean {
  const m: Record<FishTankType, boolean> = {
    nano_5_gallon: false, standard_20_gallon: false, rimless_cube: false, bow_front_display: false, planted_high_tech: true,
  };
  return m[t];
}

export function glassMaterial(t: FishTankType): string {
  const m: Record<FishTankType, string> = {
    nano_5_gallon: "standard_float_glass",
    standard_20_gallon: "tempered_silicone_seal",
    rimless_cube: "low_iron_ultra_clear",
    bow_front_display: "curved_front_panel",
    planted_high_tech: "low_iron_optiwhite",
  };
  return m[t];
}

export function bestKeeper(t: FishTankType): string {
  const m: Record<FishTankType, string> = {
    nano_5_gallon: "betta_shrimp_desktop",
    standard_20_gallon: "community_fish_beginner",
    rimless_cube: "aquascape_minimalist",
    bow_front_display: "living_room_centerpiece",
    planted_high_tech: "dutch_iwagumi_expert",
  };
  return m[t];
}

export function fishTanks(): FishTankType[] {
  return ["nano_5_gallon", "standard_20_gallon", "rimless_cube", "bow_front_display", "planted_high_tech"];
}
