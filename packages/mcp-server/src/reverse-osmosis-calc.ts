export type ReverseOsmosisType =
  | "residential_under_sink"
  | "commercial_light_industrial"
  | "industrial_brackish_water"
  | "seawater_desalination"
  | "high_purity_laboratory";

interface ReverseOsmosisData {
  rejection: number;
  flowRate: number;
  efficiency: number;
  maintenance: number;
  roCost: number;
  energyRecovery: boolean;
  forDrinking: boolean;
  membrane: string;
  bestUse: string;
}

const DATA: Record<ReverseOsmosisType, ReverseOsmosisData> = {
  residential_under_sink: {
    rejection: 7, flowRate: 3, efficiency: 5, maintenance: 8, roCost: 2,
    energyRecovery: false, forDrinking: true,
    membrane: "tfc_spiral_wound_75gpd",
    bestUse: "home_drinking_water_point_of_use",
  },
  commercial_light_industrial: {
    rejection: 8, flowRate: 6, efficiency: 7, maintenance: 7, roCost: 5,
    energyRecovery: false, forDrinking: true,
    membrane: "tfc_4040_low_pressure_multi",
    bestUse: "restaurant_brewery_small_plant",
  },
  industrial_brackish_water: {
    rejection: 9, flowRate: 8, efficiency: 8, maintenance: 6, roCost: 7,
    energyRecovery: true, forDrinking: false,
    membrane: "brackish_8040_high_rejection",
    bestUse: "municipal_well_water_treatment",
  },
  seawater_desalination: {
    rejection: 10, flowRate: 7, efficiency: 6, maintenance: 5, roCost: 10,
    energyRecovery: true, forDrinking: true,
    membrane: "swro_8040_high_pressure_duplex",
    bestUse: "coastal_city_desalination_plant",
  },
  high_purity_laboratory: {
    rejection: 10, flowRate: 4, efficiency: 5, maintenance: 6, roCost: 8,
    energyRecovery: false, forDrinking: false,
    membrane: "double_pass_ro_edi_polisher",
    bestUse: "pharmaceutical_lab_ultrapure",
  },
};

function get(t: ReverseOsmosisType): ReverseOsmosisData {
  return DATA[t];
}

export const rejection = (t: ReverseOsmosisType) => get(t).rejection;
export const flowRate = (t: ReverseOsmosisType) => get(t).flowRate;
export const efficiency = (t: ReverseOsmosisType) => get(t).efficiency;
export const maintenance = (t: ReverseOsmosisType) => get(t).maintenance;
export const roCost = (t: ReverseOsmosisType) => get(t).roCost;
export const energyRecovery = (t: ReverseOsmosisType) => get(t).energyRecovery;
export const forDrinking = (t: ReverseOsmosisType) => get(t).forDrinking;
export const membrane = (t: ReverseOsmosisType) => get(t).membrane;
export const bestUse = (t: ReverseOsmosisType) => get(t).bestUse;
export const reverseOsmosisTypes = (): ReverseOsmosisType[] =>
  Object.keys(DATA) as ReverseOsmosisType[];
