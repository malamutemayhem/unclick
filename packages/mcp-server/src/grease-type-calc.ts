export type GreaseTypeCalc =
  | "lithium_complex_general"
  | "polyurea_electric_motor"
  | "calcium_sulfonate_heavy"
  | "perfluorinated_extreme"
  | "biodegradable_ester";

interface GreaseData {
  loadCapacity: number;
  tempRange: number;
  waterResist: number;
  life: number;
  gtCost: number;
  foodGrade: boolean;
  forHighTemp: boolean;
  thickener: string;
  bestUse: string;
}

const DATA: Record<GreaseTypeCalc, GreaseData> = {
  lithium_complex_general: {
    loadCapacity: 7, tempRange: 7, waterResist: 7, life: 7, gtCost: 3,
    foodGrade: false, forHighTemp: false,
    thickener: "lithium_12_hydroxy_stearate_complex",
    bestUse: "general_bearing_chassis_multipurpose",
  },
  polyurea_electric_motor: {
    loadCapacity: 6, tempRange: 8, waterResist: 8, life: 10, gtCost: 6,
    foodGrade: false, forHighTemp: true,
    thickener: "diurea_polyurea_synthetic_base",
    bestUse: "sealed_bearing_electric_motor_life",
  },
  calcium_sulfonate_heavy: {
    loadCapacity: 10, tempRange: 8, waterResist: 10, life: 9, gtCost: 7,
    foodGrade: false, forHighTemp: false,
    thickener: "overbased_calcium_sulfonate_complex",
    bestUse: "mining_steel_mill_marine_wet_heavy",
  },
  perfluorinated_extreme: {
    loadCapacity: 6, tempRange: 10, waterResist: 9, life: 10, gtCost: 10,
    foodGrade: false, forHighTemp: true,
    thickener: "ptfe_pfpe_fluorinated_base_oil",
    bestUse: "semiconductor_vacuum_oven_extreme",
  },
  biodegradable_ester: {
    loadCapacity: 6, tempRange: 6, waterResist: 6, life: 5, gtCost: 5,
    foodGrade: true, forHighTemp: false,
    thickener: "lithium_ester_base_oil_biodegradable",
    bestUse: "forestry_marine_food_eco_sensitive",
  },
};

function get(t: GreaseTypeCalc): GreaseData {
  return DATA[t];
}

export const loadCapacity = (t: GreaseTypeCalc) => get(t).loadCapacity;
export const tempRange = (t: GreaseTypeCalc) => get(t).tempRange;
export const waterResist = (t: GreaseTypeCalc) => get(t).waterResist;
export const life = (t: GreaseTypeCalc) => get(t).life;
export const gtCost = (t: GreaseTypeCalc) => get(t).gtCost;
export const foodGrade = (t: GreaseTypeCalc) => get(t).foodGrade;
export const forHighTemp = (t: GreaseTypeCalc) => get(t).forHighTemp;
export const thickener = (t: GreaseTypeCalc) => get(t).thickener;
export const bestUse = (t: GreaseTypeCalc) => get(t).bestUse;
export const greaseTypeCalcTypes = (): GreaseTypeCalc[] =>
  Object.keys(DATA) as GreaseTypeCalc[];
