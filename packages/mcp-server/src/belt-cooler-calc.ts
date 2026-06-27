export type BeltCoolerType =
  | "steel_belt_cool"
  | "wire_mesh_cool"
  | "modular_plastic"
  | "air_blast_cool"
  | "cryogenic_belt";

interface BeltCoolerData {
  coolingRate: number;
  throughput: number;
  tempDrop: number;
  productGentleness: number;
  bcCost: number;
  contactCool: boolean;
  forChocolate: boolean;
  coolerConfig: string;
  bestUse: string;
}

const DATA: Record<BeltCoolerType, BeltCoolerData> = {
  steel_belt_cool: {
    coolingRate: 8, throughput: 9, tempDrop: 7, productGentleness: 8, bcCost: 8,
    contactCool: true, forChocolate: true,
    coolerConfig: "steel_belt_cooler_chilled_plate_conduction_flat_product_solidify",
    bestUse: "chocolate_slab_steel_belt_cooler_flat_conduction_cool_solidify",
  },
  wire_mesh_cool: {
    coolingRate: 7, throughput: 8, tempDrop: 6, productGentleness: 7, bcCost: 5,
    contactCool: false, forChocolate: false,
    coolerConfig: "wire_mesh_belt_cooler_open_mesh_air_flow_through_ambient_cool",
    bestUse: "baked_goods_wire_mesh_belt_cooler_ambient_air_flow_through_cool",
  },
  modular_plastic: {
    coolingRate: 6, throughput: 8, tempDrop: 5, productGentleness: 9, bcCost: 6,
    contactCool: false, forChocolate: false,
    coolerConfig: "modular_plastic_belt_cooler_gentle_surface_washable_hygienic",
    bestUse: "meat_product_modular_plastic_belt_cooler_hygienic_gentle_wash",
  },
  air_blast_cool: {
    coolingRate: 9, throughput: 9, tempDrop: 8, productGentleness: 6, bcCost: 7,
    contactCool: false, forChocolate: true,
    coolerConfig: "air_blast_belt_cooler_forced_cold_air_jet_rapid_surface_chill",
    bestUse: "confection_air_blast_belt_cooler_rapid_surface_chill_set_coat",
  },
  cryogenic_belt: {
    coolingRate: 10, throughput: 7, tempDrop: 10, productGentleness: 5, bcCost: 9,
    contactCool: false, forChocolate: false,
    coolerConfig: "cryogenic_belt_cooler_liquid_nitrogen_spray_ultra_rapid_freeze",
    bestUse: "iqf_product_cryogenic_belt_cooler_liquid_nitrogen_flash_freeze",
  },
};

function get(t: BeltCoolerType): BeltCoolerData {
  return DATA[t];
}

export const coolingRate = (t: BeltCoolerType) => get(t).coolingRate;
export const throughput = (t: BeltCoolerType) => get(t).throughput;
export const tempDrop = (t: BeltCoolerType) => get(t).tempDrop;
export const productGentleness = (t: BeltCoolerType) => get(t).productGentleness;
export const bcCost = (t: BeltCoolerType) => get(t).bcCost;
export const contactCool = (t: BeltCoolerType) => get(t).contactCool;
export const forChocolate = (t: BeltCoolerType) => get(t).forChocolate;
export const coolerConfig = (t: BeltCoolerType) => get(t).coolerConfig;
export const bestUse = (t: BeltCoolerType) => get(t).bestUse;
export const beltCoolerTypes = (): BeltCoolerType[] =>
  Object.keys(DATA) as BeltCoolerType[];
