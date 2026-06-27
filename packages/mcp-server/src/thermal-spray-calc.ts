export type ThermalSprayType =
  | "plasma_arc_spray"
  | "hvof_high_velocity"
  | "flame_spray_wire"
  | "cold_spray_kinetic"
  | "electric_arc_twin_wire";

interface ThermalSprayData {
  adhesion: number;
  density: number;
  temperature: number;
  speed: number;
  tsCost: number;
  lowHeat: boolean;
  forWearResist: boolean;
  feedstock: string;
  bestUse: string;
}

const DATA: Record<ThermalSprayType, ThermalSprayData> = {
  plasma_arc_spray: {
    adhesion: 9, density: 9, temperature: 4, speed: 7, tsCost: 8,
    lowHeat: false, forWearResist: true,
    feedstock: "ceramic_powder_alumina_zirconia",
    bestUse: "thermal_barrier_turbine_blade",
  },
  hvof_high_velocity: {
    adhesion: 10, density: 10, temperature: 6, speed: 8, tsCost: 9,
    lowHeat: false, forWearResist: true,
    feedstock: "tungsten_carbide_cobalt_powder",
    bestUse: "wear_resistant_landing_gear",
  },
  flame_spray_wire: {
    adhesion: 6, density: 6, temperature: 5, speed: 9, tsCost: 3,
    lowHeat: false, forWearResist: false,
    feedstock: "metallic_wire_zinc_aluminum",
    bestUse: "corrosion_protection_bridge_steel",
  },
  cold_spray_kinetic: {
    adhesion: 8, density: 9, temperature: 10, speed: 6, tsCost: 9,
    lowHeat: true, forWearResist: false,
    feedstock: "metal_powder_supersonic_gas",
    bestUse: "additive_repair_heat_sensitive",
  },
  electric_arc_twin_wire: {
    adhesion: 7, density: 7, temperature: 5, speed: 10, tsCost: 4,
    lowHeat: false, forWearResist: false,
    feedstock: "twin_wire_arc_melted_atomized",
    bestUse: "large_area_anticorrosion_tank",
  },
};

function get(t: ThermalSprayType): ThermalSprayData {
  return DATA[t];
}

export const adhesion = (t: ThermalSprayType) => get(t).adhesion;
export const density = (t: ThermalSprayType) => get(t).density;
export const temperature = (t: ThermalSprayType) => get(t).temperature;
export const speed = (t: ThermalSprayType) => get(t).speed;
export const tsCost = (t: ThermalSprayType) => get(t).tsCost;
export const lowHeat = (t: ThermalSprayType) => get(t).lowHeat;
export const forWearResist = (t: ThermalSprayType) => get(t).forWearResist;
export const feedstock = (t: ThermalSprayType) => get(t).feedstock;
export const bestUse = (t: ThermalSprayType) => get(t).bestUse;
export const thermalSprayTypes = (): ThermalSprayType[] =>
  Object.keys(DATA) as ThermalSprayType[];
