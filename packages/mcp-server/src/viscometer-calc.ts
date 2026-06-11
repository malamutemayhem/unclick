export type ViscometerType =
  | "rotational_brookfield"
  | "capillary_tube_flow"
  | "falling_ball_hoeppler"
  | "vibrating_element_inline"
  | "cone_plate_rheometer";

interface ViscometerData {
  accuracy: number;
  shearRange: number;
  sampleVolume: number;
  easeOfUse: number;
  vmCost: number;
  inline: boolean;
  forNonNewtonian: boolean;
  principle: string;
  bestUse: string;
}

const DATA: Record<ViscometerType, ViscometerData> = {
  rotational_brookfield: {
    accuracy: 7, shearRange: 7, sampleVolume: 5, easeOfUse: 9, vmCost: 4,
    inline: false, forNonNewtonian: true,
    principle: "spindle_rotation_torque_measurement_speed_variable",
    bestUse: "paint_adhesive_cosmetic_food_qc_general_purpose",
  },
  capillary_tube_flow: {
    accuracy: 9, shearRange: 6, sampleVolume: 8, easeOfUse: 6, vmCost: 5,
    inline: false, forNonNewtonian: false,
    principle: "gravity_pressure_driven_flow_through_calibrated_tube",
    bestUse: "petroleum_polymer_solution_kinematic_viscosity_lab",
  },
  falling_ball_hoeppler: {
    accuracy: 8, shearRange: 3, sampleVolume: 8, easeOfUse: 7, vmCost: 3,
    inline: false, forNonNewtonian: false,
    principle: "ball_fall_time_inclined_tube_stokes_law_density",
    bestUse: "transparent_liquid_pharmaceutical_simple_absolute",
  },
  vibrating_element_inline: {
    accuracy: 7, shearRange: 5, sampleVolume: 10, easeOfUse: 8, vmCost: 7,
    inline: true, forNonNewtonian: false,
    principle: "resonant_sensor_frequency_damping_process_fluid",
    bestUse: "process_control_inline_oil_refinery_continuous",
  },
  cone_plate_rheometer: {
    accuracy: 10, shearRange: 10, sampleVolume: 9, easeOfUse: 5, vmCost: 9,
    inline: false, forNonNewtonian: true,
    principle: "cone_plate_geometry_controlled_shear_stress_strain",
    bestUse: "research_polymer_melt_complex_fluid_full_rheology",
  },
};

function get(t: ViscometerType): ViscometerData {
  return DATA[t];
}

export const accuracy = (t: ViscometerType) => get(t).accuracy;
export const shearRange = (t: ViscometerType) => get(t).shearRange;
export const sampleVolume = (t: ViscometerType) => get(t).sampleVolume;
export const easeOfUse = (t: ViscometerType) => get(t).easeOfUse;
export const vmCost = (t: ViscometerType) => get(t).vmCost;
export const inline = (t: ViscometerType) => get(t).inline;
export const forNonNewtonian = (t: ViscometerType) => get(t).forNonNewtonian;
export const principle = (t: ViscometerType) => get(t).principle;
export const bestUse = (t: ViscometerType) => get(t).bestUse;
export const viscometerTypes = (): ViscometerType[] =>
  Object.keys(DATA) as ViscometerType[];
