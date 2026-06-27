export type DesiccantSystemType =
  | "rotary_wheel_silica_gel"
  | "liquid_desiccant_spray"
  | "solid_packed_tower"
  | "hybrid_desiccant_dx"
  | "solar_regenerated_wheel";

interface DesiccantSystemData {
  dehumidify: number;
  efficiency: number;
  capacity: number;
  maintenance: number;
  dsCost: number;
  regenerative: boolean;
  forProcess: boolean;
  medium: string;
  bestUse: string;
}

const DATA: Record<DesiccantSystemType, DesiccantSystemData> = {
  rotary_wheel_silica_gel: {
    dehumidify: 9, efficiency: 7, capacity: 8, maintenance: 7, dsCost: 7,
    regenerative: true, forProcess: true,
    medium: "silica_gel_honeycomb_wheel_regen",
    bestUse: "pharmaceutical_clean_room_hvac",
  },
  liquid_desiccant_spray: {
    dehumidify: 10, efficiency: 8, capacity: 10, maintenance: 5, dsCost: 9,
    regenerative: true, forProcess: true,
    medium: "lithium_chloride_spray_contactor",
    bestUse: "large_ahu_tropical_climate",
  },
  solid_packed_tower: {
    dehumidify: 7, efficiency: 6, capacity: 6, maintenance: 8, dsCost: 5,
    regenerative: false, forProcess: false,
    medium: "molecular_sieve_packed_bed",
    bestUse: "compressed_air_drying_industrial",
  },
  hybrid_desiccant_dx: {
    dehumidify: 8, efficiency: 9, capacity: 7, maintenance: 7, dsCost: 8,
    regenerative: true, forProcess: false,
    medium: "wheel_plus_dx_coil_staged",
    bestUse: "supermarket_grocery_humid_zone",
  },
  solar_regenerated_wheel: {
    dehumidify: 7, efficiency: 10, capacity: 6, maintenance: 6, dsCost: 8,
    regenerative: true, forProcess: false,
    medium: "solar_thermal_regen_silica_wheel",
    bestUse: "net_zero_building_humid_climate",
  },
};

function get(t: DesiccantSystemType): DesiccantSystemData {
  return DATA[t];
}

export const dehumidify = (t: DesiccantSystemType) => get(t).dehumidify;
export const efficiency = (t: DesiccantSystemType) => get(t).efficiency;
export const capacity = (t: DesiccantSystemType) => get(t).capacity;
export const maintenance = (t: DesiccantSystemType) => get(t).maintenance;
export const dsCost = (t: DesiccantSystemType) => get(t).dsCost;
export const regenerative = (t: DesiccantSystemType) => get(t).regenerative;
export const forProcess = (t: DesiccantSystemType) => get(t).forProcess;
export const medium = (t: DesiccantSystemType) => get(t).medium;
export const bestUse = (t: DesiccantSystemType) => get(t).bestUse;
export const desiccantSystemTypes = (): DesiccantSystemType[] =>
  Object.keys(DATA) as DesiccantSystemType[];
