export type ImpressedCurrentType =
  | "mmo_titanium_anode"
  | "silicon_iron_anode"
  | "graphite_anode_rod"
  | "platinum_clad_niobium"
  | "conductive_polymer_str";

interface ImpressedCurrentData {
  currentCapacity: number;
  consumptionRate: number;
  durability: number;
  flexibility: number;
  icCost: number;
  inert: boolean;
  forDeepWell: boolean;
  anode: string;
  bestUse: string;
}

const DATA: Record<ImpressedCurrentType, ImpressedCurrentData> = {
  mmo_titanium_anode: {
    currentCapacity: 10, consumptionRate: 10, durability: 9, flexibility: 9, icCost: 8,
    inert: true, forDeepWell: true,
    anode: "mixed_metal_oxide_coated_titanium_substrate",
    bestUse: "pipeline_tank_bottom_versatile_soil_seawater",
  },
  silicon_iron_anode: {
    currentCapacity: 8, consumptionRate: 7, durability: 8, flexibility: 6, icCost: 5,
    inert: false, forDeepWell: true,
    anode: "high_silicon_cast_iron_chromium_alloy_rod",
    bestUse: "deep_anode_bed_utility_pipeline_ground_bed",
  },
  graphite_anode_rod: {
    currentCapacity: 6, consumptionRate: 5, durability: 5, flexibility: 7, icCost: 3,
    inert: false, forDeepWell: false,
    anode: "impregnated_graphite_rod_coke_breeze_backfill",
    bestUse: "shallow_ground_bed_low_current_soil_application",
  },
  platinum_clad_niobium: {
    currentCapacity: 10, consumptionRate: 10, durability: 10, flexibility: 8, icCost: 10,
    inert: true, forDeepWell: false,
    anode: "platinum_clad_niobium_wire_rod_seawater_grade",
    bestUse: "seawater_offshore_concrete_rebar_high_current",
  },
  conductive_polymer_str: {
    currentCapacity: 5, consumptionRate: 8, durability: 7, flexibility: 10, icCost: 6,
    inert: false, forDeepWell: false,
    anode: "conductive_polymer_flexible_strip_distributed",
    bestUse: "concrete_structure_distributed_anode_rebar_cp",
  },
};

function get(t: ImpressedCurrentType): ImpressedCurrentData {
  return DATA[t];
}

export const currentCapacity = (t: ImpressedCurrentType) => get(t).currentCapacity;
export const consumptionRate = (t: ImpressedCurrentType) => get(t).consumptionRate;
export const durability = (t: ImpressedCurrentType) => get(t).durability;
export const flexibility = (t: ImpressedCurrentType) => get(t).flexibility;
export const icCost = (t: ImpressedCurrentType) => get(t).icCost;
export const inert = (t: ImpressedCurrentType) => get(t).inert;
export const forDeepWell = (t: ImpressedCurrentType) => get(t).forDeepWell;
export const anode = (t: ImpressedCurrentType) => get(t).anode;
export const bestUse = (t: ImpressedCurrentType) => get(t).bestUse;
export const impressedCurrentTypes = (): ImpressedCurrentType[] =>
  Object.keys(DATA) as ImpressedCurrentType[];
