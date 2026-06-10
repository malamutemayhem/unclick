export type TowelRackType = "wall_bar_fixed" | "over_door_hook" | "freestanding_ladder" | "heated_electric" | "swivel_arm";

export function towelCapacity(t: TowelRackType): number {
  const m: Record<TowelRackType, number> = {
    wall_bar_fixed: 6, over_door_hook: 4, freestanding_ladder: 8, heated_electric: 5, swivel_arm: 7,
  };
  return m[t];
}

export function dryingSpeed(t: TowelRackType): number {
  const m: Record<TowelRackType, number> = {
    wall_bar_fixed: 6, over_door_hook: 5, freestanding_ladder: 7, heated_electric: 10, swivel_arm: 8,
  };
  return m[t];
}

export function installEase(t: TowelRackType): number {
  const m: Record<TowelRackType, number> = {
    wall_bar_fixed: 4, over_door_hook: 10, freestanding_ladder: 9, heated_electric: 3, swivel_arm: 5,
  };
  return m[t];
}

export function spaceEfficiency(t: TowelRackType): number {
  const m: Record<TowelRackType, number> = {
    wall_bar_fixed: 7, over_door_hook: 9, freestanding_ladder: 4, heated_electric: 6, swivel_arm: 8,
  };
  return m[t];
}

export function rackCost(t: TowelRackType): number {
  const m: Record<TowelRackType, number> = {
    wall_bar_fixed: 3, over_door_hook: 1, freestanding_ladder: 5, heated_electric: 9, swivel_arm: 4,
  };
  return m[t];
}

export function noDrilling(t: TowelRackType): boolean {
  const m: Record<TowelRackType, boolean> = {
    wall_bar_fixed: false, over_door_hook: true, freestanding_ladder: true, heated_electric: false, swivel_arm: false,
  };
  return m[t];
}

export function heatsUp(t: TowelRackType): boolean {
  const m: Record<TowelRackType, boolean> = {
    wall_bar_fixed: false, over_door_hook: false, freestanding_ladder: false, heated_electric: true, swivel_arm: false,
  };
  return m[t];
}

export function mountStyle(t: TowelRackType): string {
  const m: Record<TowelRackType, string> = {
    wall_bar_fixed: "screw_mount_chrome_bar",
    over_door_hook: "hook_over_door_frame",
    freestanding_ladder: "leaning_ladder_shelf",
    heated_electric: "hardwired_wall_element",
    swivel_arm: "wall_pivot_multi_arm",
  };
  return m[t];
}

export function bestBathroom(t: TowelRackType): string {
  const m: Record<TowelRackType, string> = {
    wall_bar_fixed: "standard_bath_beside_shower",
    over_door_hook: "rental_no_damage",
    freestanding_ladder: "spa_aesthetic_open",
    heated_electric: "luxury_warm_towel",
    swivel_arm: "small_bath_multi_towel",
  };
  return m[t];
}

export function towelRacks(): TowelRackType[] {
  return ["wall_bar_fixed", "over_door_hook", "freestanding_ladder", "heated_electric", "swivel_arm"];
}
