export type SwitchgearType =
  | "air_insulated_ais"
  | "gas_insulated_gis"
  | "metal_clad_drawout"
  | "ring_main_unit_rmu"
  | "pad_mount_underground";

const DATA: Record<SwitchgearType, {
  voltage: number; compactness: number; reliability: number;
  maintenance: number; swCost: number; gasSealed: boolean;
  forUrban: boolean; insulation: string; bestUse: string;
}> = {
  air_insulated_ais: {
    voltage: 10, compactness: 2, reliability: 7,
    maintenance: 5, swCost: 3, gasSealed: false,
    forUrban: false, insulation: "air_clearance_bus_spacing",
    bestUse: "outdoor_substation_high_voltage",
  },
  gas_insulated_gis: {
    voltage: 10, compactness: 10, reliability: 10,
    maintenance: 9, swCost: 5, gasSealed: true,
    forUrban: true, insulation: "sf6_gas_sealed_enclosure",
    bestUse: "urban_substation_space_limited",
  },
  metal_clad_drawout: {
    voltage: 7, compactness: 6, reliability: 8,
    maintenance: 8, swCost: 4, gasSealed: false,
    forUrban: true, insulation: "vacuum_breaker_metal_clad",
    bestUse: "industrial_plant_main_switchroom",
  },
  ring_main_unit_rmu: {
    voltage: 6, compactness: 8, reliability: 9,
    maintenance: 9, swCost: 3, gasSealed: true,
    forUrban: true, insulation: "sf6_or_solid_insulated",
    bestUse: "distribution_ring_feeder_tap",
  },
  pad_mount_underground: {
    voltage: 5, compactness: 7, reliability: 8,
    maintenance: 7, swCost: 2, gasSealed: false,
    forUrban: true, insulation: "oil_or_dry_type_padmount",
    bestUse: "residential_underground_network",
  },
};

const get = (t: SwitchgearType) => DATA[t];

export const voltage = (t: SwitchgearType) => get(t).voltage;
export const compactness = (t: SwitchgearType) => get(t).compactness;
export const reliability = (t: SwitchgearType) => get(t).reliability;
export const maintenance = (t: SwitchgearType) => get(t).maintenance;
export const swCost = (t: SwitchgearType) => get(t).swCost;
export const gasSealed = (t: SwitchgearType) => get(t).gasSealed;
export const forUrban = (t: SwitchgearType) => get(t).forUrban;
export const insulation = (t: SwitchgearType) => get(t).insulation;
export const bestUse = (t: SwitchgearType) => get(t).bestUse;
export const switchgearTypes = (): SwitchgearType[] => Object.keys(DATA) as SwitchgearType[];
