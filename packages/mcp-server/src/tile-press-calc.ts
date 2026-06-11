export type TilePressType =
  | "hydraulic_press"
  | "toggle_press"
  | "friction_press"
  | "isostatic_press"
  | "electric_servo_press";

interface TilePressData {
  compactionForce: number;
  throughput: number;
  densityUniformity: number;
  sizeRange: number;
  tpCost: number;
  highPressure: boolean;
  forLargeFormat: boolean;
  pressConfig: string;
  bestUse: string;
}

const DATA: Record<TilePressType, TilePressData> = {
  hydraulic_press: {
    compactionForce: 9, throughput: 9, densityUniformity: 9, sizeRange: 9, tpCost: 8,
    highPressure: true, forLargeFormat: true,
    pressConfig: "hydraulic_tile_press_piston_cylinder_high_force_compaction_die",
    bestUse: "ceramic_tile_factory_hydraulic_press_floor_wall_tile_high_volume",
  },
  toggle_press: {
    compactionForce: 8, throughput: 10, densityUniformity: 8, sizeRange: 7, tpCost: 7,
    highPressure: true, forLargeFormat: false,
    pressConfig: "toggle_tile_press_mechanical_linkage_rapid_cycle_compact_tile",
    bestUse: "small_tile_toggle_press_rapid_cycle_mosaic_trim_piece_fast",
  },
  friction_press: {
    compactionForce: 7, throughput: 6, densityUniformity: 7, sizeRange: 8, tpCost: 5,
    highPressure: false, forLargeFormat: false,
    pressConfig: "friction_tile_press_flywheel_screw_impact_compact_refractory",
    bestUse: "refractory_brick_friction_press_simple_impact_compaction_batch",
  },
  isostatic_press: {
    compactionForce: 10, throughput: 5, densityUniformity: 10, sizeRange: 6, tpCost: 10,
    highPressure: true, forLargeFormat: false,
    pressConfig: "isostatic_tile_press_fluid_uniform_pressure_all_sides_dense",
    bestUse: "technical_ceramic_isostatic_press_uniform_density_complex_shape",
  },
  electric_servo_press: {
    compactionForce: 9, throughput: 9, densityUniformity: 9, sizeRange: 8, tpCost: 9,
    highPressure: true, forLargeFormat: true,
    pressConfig: "electric_servo_tile_press_motor_drive_precise_force_energy_save",
    bestUse: "modern_tile_electric_servo_press_energy_efficient_precise_force",
  },
};

function get(t: TilePressType): TilePressData {
  return DATA[t];
}

export const compactionForce = (t: TilePressType) => get(t).compactionForce;
export const throughput = (t: TilePressType) => get(t).throughput;
export const densityUniformity = (t: TilePressType) => get(t).densityUniformity;
export const sizeRange = (t: TilePressType) => get(t).sizeRange;
export const tpCost = (t: TilePressType) => get(t).tpCost;
export const highPressure = (t: TilePressType) => get(t).highPressure;
export const forLargeFormat = (t: TilePressType) => get(t).forLargeFormat;
export const pressConfig = (t: TilePressType) => get(t).pressConfig;
export const bestUse = (t: TilePressType) => get(t).bestUse;
export const tilePressTypes = (): TilePressType[] =>
  Object.keys(DATA) as TilePressType[];
