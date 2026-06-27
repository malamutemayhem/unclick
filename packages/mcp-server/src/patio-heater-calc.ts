export type PatioHeaterType = "mushroom_propane" | "pyramid_flame" | "infrared_electric" | "wall_mount_radiant" | "tabletop_portable";

export function heatingRadius(t: PatioHeaterType): number {
  const m: Record<PatioHeaterType, number> = {
    mushroom_propane: 9, pyramid_flame: 7, infrared_electric: 6, wall_mount_radiant: 8, tabletop_portable: 3,
  };
  return m[t];
}

export function windResistance(t: PatioHeaterType): number {
  const m: Record<PatioHeaterType, number> = {
    mushroom_propane: 5, pyramid_flame: 4, infrared_electric: 9, wall_mount_radiant: 10, tabletop_portable: 3,
  };
  return m[t];
}

export function energyEfficiency(t: PatioHeaterType): number {
  const m: Record<PatioHeaterType, number> = {
    mushroom_propane: 5, pyramid_flame: 4, infrared_electric: 9, wall_mount_radiant: 8, tabletop_portable: 6,
  };
  return m[t];
}

export function visualAppeal(t: PatioHeaterType): number {
  const m: Record<PatioHeaterType, number> = {
    mushroom_propane: 5, pyramid_flame: 10, infrared_electric: 4, wall_mount_radiant: 3, tabletop_portable: 6,
  };
  return m[t];
}

export function heaterCost(t: PatioHeaterType): number {
  const m: Record<PatioHeaterType, number> = {
    mushroom_propane: 6, pyramid_flame: 8, infrared_electric: 7, wall_mount_radiant: 7, tabletop_portable: 3,
  };
  return m[t];
}

export function needsVentilation(t: PatioHeaterType): boolean {
  const m: Record<PatioHeaterType, boolean> = {
    mushroom_propane: true, pyramid_flame: true, infrared_electric: false, wall_mount_radiant: false, tabletop_portable: true,
  };
  return m[t];
}

export function tipOverSafe(t: PatioHeaterType): boolean {
  const m: Record<PatioHeaterType, boolean> = {
    mushroom_propane: true, pyramid_flame: true, infrared_electric: true, wall_mount_radiant: true, tabletop_portable: true,
  };
  return m[t];
}

export function heatSource(t: PatioHeaterType): string {
  const m: Record<PatioHeaterType, string> = {
    mushroom_propane: "propane_burner_reflector",
    pyramid_flame: "quartz_tube_open_flame",
    infrared_electric: "carbon_fiber_element",
    wall_mount_radiant: "halogen_quartz_panel",
    tabletop_portable: "mini_propane_canister",
  };
  return m[t];
}

export function bestPatio(t: PatioHeaterType): string {
  const m: Record<PatioHeaterType, string> = {
    mushroom_propane: "open_restaurant_deck",
    pyramid_flame: "upscale_lounge_terrace",
    infrared_electric: "covered_porch_garage",
    wall_mount_radiant: "narrow_balcony_alcove",
    tabletop_portable: "camping_picnic_table",
  };
  return m[t];
}

export function patioHeaters(): PatioHeaterType[] {
  return ["mushroom_propane", "pyramid_flame", "infrared_electric", "wall_mount_radiant", "tabletop_portable"];
}
