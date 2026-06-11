export type IrrigationPivotType =
  | "center_pivot"
  | "linear_move"
  | "drip_subsurface"
  | "traveling_gun"
  | "solid_set_sprinkler";

interface IrrigationPivotData {
  efficiency: number;
  coverage: number;
  uniformity: number;
  laborSaving: number;
  ipCost: number;
  pressurized: boolean;
  forLargeField: boolean;
  delivery: string;
  bestUse: string;
}

const DATA: Record<IrrigationPivotType, IrrigationPivotData> = {
  center_pivot: {
    efficiency: 8, coverage: 10, uniformity: 8, laborSaving: 10, ipCost: 8,
    pressurized: true, forLargeField: true,
    delivery: "rotating_arm_tower_sprinkler_drop_nozzle_circular_pattern",
    bestUse: "large_flat_field_corn_wheat_soybean_circular_coverage",
  },
  linear_move: {
    efficiency: 8, coverage: 9, uniformity: 9, laborSaving: 9, ipCost: 9,
    pressurized: true, forLargeField: true,
    delivery: "lateral_tower_system_moves_straight_rectangular_field",
    bestUse: "rectangular_field_sugar_cane_potato_even_rectangular_coverage",
  },
  drip_subsurface: {
    efficiency: 10, coverage: 5, uniformity: 10, laborSaving: 8, ipCost: 7,
    pressurized: true, forLargeField: false,
    delivery: "buried_drip_line_emitter_root_zone_direct_low_pressure",
    bestUse: "orchard_vineyard_vegetable_row_crop_water_scarce_region",
  },
  traveling_gun: {
    efficiency: 5, coverage: 7, uniformity: 5, laborSaving: 6, ipCost: 4,
    pressurized: true, forLargeField: false,
    delivery: "large_single_sprinkler_gun_on_wheeled_cart_hose_reel",
    bestUse: "irregular_field_pasture_small_farm_temporary_irrigation",
  },
  solid_set_sprinkler: {
    efficiency: 7, coverage: 6, uniformity: 8, laborSaving: 7, ipCost: 6,
    pressurized: true, forLargeField: false,
    delivery: "permanently_installed_sprinkler_heads_grid_pattern_valve",
    bestUse: "turf_nursery_frost_protection_high_value_crop_permanent",
  },
};

function get(t: IrrigationPivotType): IrrigationPivotData {
  return DATA[t];
}

export const efficiency = (t: IrrigationPivotType) => get(t).efficiency;
export const coverage = (t: IrrigationPivotType) => get(t).coverage;
export const uniformity = (t: IrrigationPivotType) => get(t).uniformity;
export const laborSaving = (t: IrrigationPivotType) => get(t).laborSaving;
export const ipCost = (t: IrrigationPivotType) => get(t).ipCost;
export const pressurized = (t: IrrigationPivotType) => get(t).pressurized;
export const forLargeField = (t: IrrigationPivotType) => get(t).forLargeField;
export const delivery = (t: IrrigationPivotType) => get(t).delivery;
export const bestUse = (t: IrrigationPivotType) => get(t).bestUse;
export const irrigationPivotTypes = (): IrrigationPivotType[] =>
  Object.keys(DATA) as IrrigationPivotType[];
