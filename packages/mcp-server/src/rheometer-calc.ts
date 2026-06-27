export type RheometerType =
  | "rotational_cone"
  | "rotational_parallel"
  | "capillary_rheo"
  | "extensional_rheo"
  | "oscillatory_rheo";

interface RheometerData {
  shearRange: number;
  throughput: number;
  torqueSensitivity: number;
  tempControl: number;
  rhCost: number;
  forViscoelastic: boolean;
  forHighShear: boolean;
  rheoConfig: string;
  bestUse: string;
}

const DATA: Record<RheometerType, RheometerData> = {
  rotational_cone: {
    shearRange: 8, throughput: 7, torqueSensitivity: 9, tempControl: 9, rhCost: 7,
    forViscoelastic: true, forHighShear: false,
    rheoConfig: "rotational_cone_plate_rheometer_uniform_shear_rate_viscosity",
    bestUse: "polymer_melt_rotational_cone_plate_rheometer_uniform_shear_flow",
  },
  rotational_parallel: {
    shearRange: 7, throughput: 8, torqueSensitivity: 8, tempControl: 8, rhCost: 6,
    forViscoelastic: true, forHighShear: false,
    rheoConfig: "rotational_parallel_plate_rheometer_variable_gap_suspension",
    bestUse: "suspension_rotational_parallel_plate_rheometer_adjustable_gap",
  },
  capillary_rheo: {
    shearRange: 10, throughput: 6, torqueSensitivity: 6, tempControl: 7, rhCost: 8,
    forViscoelastic: false, forHighShear: true,
    rheoConfig: "capillary_rheometer_high_shear_rate_extrusion_melt_flow_index",
    bestUse: "extrusion_capillary_rheometer_high_shear_rate_process_simulate",
  },
  extensional_rheo: {
    shearRange: 5, throughput: 4, torqueSensitivity: 9, tempControl: 7, rhCost: 9,
    forViscoelastic: true, forHighShear: false,
    rheoConfig: "extensional_rheometer_elongational_flow_filament_stretch_ces",
    bestUse: "fiber_spin_extensional_rheometer_elongational_viscosity_stretch",
  },
  oscillatory_rheo: {
    shearRange: 6, throughput: 5, torqueSensitivity: 10, tempControl: 9, rhCost: 8,
    forViscoelastic: true, forHighShear: false,
    rheoConfig: "oscillatory_rheometer_dynamic_mechanical_storage_loss_modulus",
    bestUse: "gel_cure_oscillatory_rheometer_dynamic_modulus_crosslink_monitor",
  },
};

function get(t: RheometerType): RheometerData {
  return DATA[t];
}

export const shearRange = (t: RheometerType) => get(t).shearRange;
export const throughput = (t: RheometerType) => get(t).throughput;
export const torqueSensitivity = (t: RheometerType) => get(t).torqueSensitivity;
export const tempControl = (t: RheometerType) => get(t).tempControl;
export const rhCost = (t: RheometerType) => get(t).rhCost;
export const forViscoelastic = (t: RheometerType) => get(t).forViscoelastic;
export const forHighShear = (t: RheometerType) => get(t).forHighShear;
export const rheoConfig = (t: RheometerType) => get(t).rheoConfig;
export const bestUse = (t: RheometerType) => get(t).bestUse;
export const rheometerTypes = (): RheometerType[] =>
  Object.keys(DATA) as RheometerType[];
