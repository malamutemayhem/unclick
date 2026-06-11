export type CenterPivotType =
  | "standard_electric_drive"
  | "hydraulic_oil_drive"
  | "towable_lateral_move"
  | "corner_arm_attachment"
  | "low_pressure_lepa_drop";

interface CenterPivotData {
  coverage: number;
  efficiency: number;
  uniformity: number;
  durability: number;
  cpCost: number;
  gps: boolean;
  forLargeField: boolean;
  sprinkler: string;
  bestUse: string;
}

const DATA: Record<CenterPivotType, CenterPivotData> = {
  standard_electric_drive: {
    coverage: 9, efficiency: 8, uniformity: 8, durability: 8, cpCost: 7,
    gps: true, forLargeField: true,
    sprinkler: "impact_spray_nozzle_overhead",
    bestUse: "row_crop_corn_soybean_large",
  },
  hydraulic_oil_drive: {
    coverage: 9, efficiency: 7, uniformity: 8, durability: 9, cpCost: 8,
    gps: true, forLargeField: true,
    sprinkler: "hydraulic_drive_water_motor",
    bestUse: "rough_terrain_hilly_variable",
  },
  towable_lateral_move: {
    coverage: 8, efficiency: 8, uniformity: 9, durability: 7, cpCost: 6,
    gps: false, forLargeField: false,
    sprinkler: "linear_move_rectangular_field",
    bestUse: "rectangular_field_vegetable_crop",
  },
  corner_arm_attachment: {
    coverage: 10, efficiency: 8, uniformity: 8, durability: 7, cpCost: 9,
    gps: true, forLargeField: true,
    sprinkler: "corner_swing_arm_gps_guided",
    bestUse: "maximize_square_field_coverage",
  },
  low_pressure_lepa_drop: {
    coverage: 8, efficiency: 10, uniformity: 9, durability: 8, cpCost: 7,
    gps: true, forLargeField: true,
    sprinkler: "low_energy_precision_drop_nozzle",
    bestUse: "arid_region_water_conservation",
  },
};

function get(t: CenterPivotType): CenterPivotData {
  return DATA[t];
}

export const coverage = (t: CenterPivotType) => get(t).coverage;
export const efficiency = (t: CenterPivotType) => get(t).efficiency;
export const uniformity = (t: CenterPivotType) => get(t).uniformity;
export const durability = (t: CenterPivotType) => get(t).durability;
export const cpCost = (t: CenterPivotType) => get(t).cpCost;
export const gps = (t: CenterPivotType) => get(t).gps;
export const forLargeField = (t: CenterPivotType) => get(t).forLargeField;
export const sprinkler = (t: CenterPivotType) => get(t).sprinkler;
export const bestUse = (t: CenterPivotType) => get(t).bestUse;
export const centerPivotTypes = (): CenterPivotType[] =>
  Object.keys(DATA) as CenterPivotType[];
