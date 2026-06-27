export type PipeExtruderType =
  | "single_screw"
  | "twin_screw"
  | "multi_layer_pipe"
  | "corrugated_pipe"
  | "large_diameter";

interface PipeExtruderData {
  wallUniformity: number;
  throughput: number;
  diameterRange: number;
  surfaceFinish: number;
  peCost: number;
  multilayer: boolean;
  forPressure: boolean;
  extruderConfig: string;
  bestUse: string;
}

const DATA: Record<PipeExtruderType, PipeExtruderData> = {
  single_screw: {
    wallUniformity: 8, throughput: 8, diameterRange: 8, surfaceFinish: 8, peCost: 5,
    multilayer: false, forPressure: true,
    extruderConfig: "single_screw_pipe_extruder_annular_die_vacuum_calibrate_haul_off",
    bestUse: "standard_pipe_single_screw_extruder_pe_pvc_water_gas_conduit",
  },
  twin_screw: {
    wallUniformity: 9, throughput: 9, diameterRange: 7, surfaceFinish: 9, peCost: 8,
    multilayer: false, forPressure: true,
    extruderConfig: "twin_screw_pipe_extruder_counter_rotate_pvc_compound_extrude",
    bestUse: "pvc_pipe_twin_screw_extruder_rigid_compound_direct_extrude",
  },
  multi_layer_pipe: {
    wallUniformity: 9, throughput: 7, diameterRange: 7, surfaceFinish: 9, peCost: 9,
    multilayer: true, forPressure: true,
    extruderConfig: "multi_layer_pipe_extruder_coextrude_barrier_skin_core_combine",
    bestUse: "barrier_pipe_multi_layer_extruder_gas_fuel_chemical_resistance",
  },
  corrugated_pipe: {
    wallUniformity: 7, throughput: 10, diameterRange: 9, surfaceFinish: 7, peCost: 7,
    multilayer: false, forPressure: false,
    extruderConfig: "corrugated_pipe_extruder_moving_mold_block_profile_corrugation",
    bestUse: "drainage_corrugated_pipe_extruder_flexible_lightweight_sewer",
  },
  large_diameter: {
    wallUniformity: 8, throughput: 6, diameterRange: 10, surfaceFinish: 8, peCost: 10,
    multilayer: false, forPressure: true,
    extruderConfig: "large_diameter_pipe_extruder_heavy_duty_screw_spiral_die_big",
    bestUse: "infrastructure_large_diameter_pipe_extruder_water_main_sewer",
  },
};

function get(t: PipeExtruderType): PipeExtruderData {
  return DATA[t];
}

export const wallUniformity = (t: PipeExtruderType) => get(t).wallUniformity;
export const throughput = (t: PipeExtruderType) => get(t).throughput;
export const diameterRange = (t: PipeExtruderType) => get(t).diameterRange;
export const surfaceFinish = (t: PipeExtruderType) => get(t).surfaceFinish;
export const peCost = (t: PipeExtruderType) => get(t).peCost;
export const multilayer = (t: PipeExtruderType) => get(t).multilayer;
export const forPressure = (t: PipeExtruderType) => get(t).forPressure;
export const extruderConfig = (t: PipeExtruderType) => get(t).extruderConfig;
export const bestUse = (t: PipeExtruderType) => get(t).bestUse;
export const pipeExtruderTypes = (): PipeExtruderType[] =>
  Object.keys(DATA) as PipeExtruderType[];
