export type PrecisionCoolType =
  | "downflow_perimeter_crac"
  | "upflow_underfloor_crac"
  | "inrow_close_coupled"
  | "rear_door_heat_exchanger"
  | "chilled_water_crah";

interface PrecisionCoolData {
  capacity: number;
  efficiency: number;
  precision: number;
  density: number;
  pcCost: number;
  waterCooled: boolean;
  forHighDensity: boolean;
  airPath: string;
  bestUse: string;
}

const DATA: Record<PrecisionCoolType, PrecisionCoolData> = {
  downflow_perimeter_crac: {
    capacity: 7, efficiency: 6, precision: 7, density: 5, pcCost: 6,
    waterCooled: false, forHighDensity: false,
    airPath: "downflow_raised_floor_plenum",
    bestUse: "traditional_data_center_room",
  },
  upflow_underfloor_crac: {
    capacity: 7, efficiency: 7, precision: 7, density: 6, pcCost: 6,
    waterCooled: false, forHighDensity: false,
    airPath: "upflow_return_ceiling_plenum",
    bestUse: "telecom_room_ceiling_return",
  },
  inrow_close_coupled: {
    capacity: 9, efficiency: 9, precision: 10, density: 9, pcCost: 8,
    waterCooled: true, forHighDensity: true,
    airPath: "horizontal_row_to_row_contained",
    bestUse: "high_density_rack_containment",
  },
  rear_door_heat_exchanger: {
    capacity: 8, efficiency: 10, precision: 9, density: 10, pcCost: 9,
    waterCooled: true, forHighDensity: true,
    airPath: "passive_rear_door_chilled_water",
    bestUse: "retrofit_existing_rack_cooling",
  },
  chilled_water_crah: {
    capacity: 10, efficiency: 8, precision: 8, density: 7, pcCost: 7,
    waterCooled: true, forHighDensity: false,
    airPath: "chilled_water_coil_variable_fan",
    bestUse: "large_data_center_chiller_plant",
  },
};

function get(t: PrecisionCoolType): PrecisionCoolData {
  return DATA[t];
}

export const capacity = (t: PrecisionCoolType) => get(t).capacity;
export const efficiency = (t: PrecisionCoolType) => get(t).efficiency;
export const precision = (t: PrecisionCoolType) => get(t).precision;
export const density = (t: PrecisionCoolType) => get(t).density;
export const pcCost = (t: PrecisionCoolType) => get(t).pcCost;
export const waterCooled = (t: PrecisionCoolType) => get(t).waterCooled;
export const forHighDensity = (t: PrecisionCoolType) => get(t).forHighDensity;
export const airPath = (t: PrecisionCoolType) => get(t).airPath;
export const bestUse = (t: PrecisionCoolType) => get(t).bestUse;
export const precisionCoolTypes = (): PrecisionCoolType[] =>
  Object.keys(DATA) as PrecisionCoolType[];
