export type DryingRackType = "accordion_fold" | "ceiling_pulley" | "over_door_hang" | "retractable_clothesline" | "heated_electric_rack";

export function dryingCapacity(t: DryingRackType): number {
  const m: Record<DryingRackType, number> = {
    accordion_fold: 8, ceiling_pulley: 7, over_door_hang: 4, retractable_clothesline: 9, heated_electric_rack: 6,
  };
  return m[t];
}

export function dryingSpeed(t: DryingRackType): number {
  const m: Record<DryingRackType, number> = {
    accordion_fold: 5, ceiling_pulley: 7, over_door_hang: 4, retractable_clothesline: 8, heated_electric_rack: 10,
  };
  return m[t];
}

export function storageWhenEmpty(t: DryingRackType): number {
  const m: Record<DryingRackType, number> = {
    accordion_fold: 7, ceiling_pulley: 10, over_door_hang: 9, retractable_clothesline: 10, heated_electric_rack: 3,
  };
  return m[t];
}

export function stability(t: DryingRackType): number {
  const m: Record<DryingRackType, number> = {
    accordion_fold: 7, ceiling_pulley: 9, over_door_hang: 5, retractable_clothesline: 6, heated_electric_rack: 8,
  };
  return m[t];
}

export function rackCost(t: DryingRackType): number {
  const m: Record<DryingRackType, number> = {
    accordion_fold: 3, ceiling_pulley: 5, over_door_hang: 2, retractable_clothesline: 4, heated_electric_rack: 9,
  };
  return m[t];
}

export function noFloorSpace(t: DryingRackType): boolean {
  const m: Record<DryingRackType, boolean> = {
    accordion_fold: false, ceiling_pulley: true, over_door_hang: true, retractable_clothesline: true, heated_electric_rack: false,
  };
  return m[t];
}

export function usesElectricity(t: DryingRackType): boolean {
  const m: Record<DryingRackType, boolean> = {
    accordion_fold: false, ceiling_pulley: false, over_door_hang: false, retractable_clothesline: false, heated_electric_rack: true,
  };
  return m[t];
}

export function mountType(t: DryingRackType): string {
  const m: Record<DryingRackType, string> = {
    accordion_fold: "freestanding_wood_metal",
    ceiling_pulley: "ceiling_screw_rope_pulley",
    over_door_hang: "hook_over_door_bars",
    retractable_clothesline: "wall_mount_retract_cord",
    heated_electric_rack: "freestanding_plug_in",
  };
  return m[t];
}

export function bestSetup(t: DryingRackType): string {
  const m: Record<DryingRackType, string> = {
    accordion_fold: "laundry_room_balcony",
    ceiling_pulley: "victorian_kitchen_ceiling",
    over_door_hang: "bathroom_door_small",
    retractable_clothesline: "outdoor_yard_patio",
    heated_electric_rack: "rainy_climate_fast_dry",
  };
  return m[t];
}

export function dryingRacks(): DryingRackType[] {
  return ["accordion_fold", "ceiling_pulley", "over_door_hang", "retractable_clothesline", "heated_electric_rack"];
}
