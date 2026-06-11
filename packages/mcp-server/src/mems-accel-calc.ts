export type MemsAccel =
  | "capacitive_comb"
  | "piezoresistive_bulk"
  | "piezoelectric_shear"
  | "thermal_convective"
  | "optical_fbg";

const DATA: Record<MemsAccel, {
  sensitivity: number; bandwidth: number; noiseFloor: number;
  shockSurvival: number; accCost: number; selfTest: boolean;
  forNav: boolean; transduction: string; bestUse: string;
}> = {
  capacitive_comb: {
    sensitivity: 9, bandwidth: 7, noiseFloor: 9,
    shockSurvival: 7, accCost: 4, selfTest: true,
    forNav: true, transduction: "differential_gap_change",
    bestUse: "inertial_navigation_imu",
  },
  piezoresistive_bulk: {
    sensitivity: 6, bandwidth: 9, noiseFloor: 5,
    shockSurvival: 10, accCost: 3, selfTest: false,
    forNav: false, transduction: "strain_gauge_wheatstone",
    bestUse: "crash_test_impact_sensor",
  },
  piezoelectric_shear: {
    sensitivity: 8, bandwidth: 10, noiseFloor: 7,
    shockSurvival: 8, accCost: 6, selfTest: false,
    forNav: false, transduction: "charge_output_crystal",
    bestUse: "vibration_monitoring_machine",
  },
  thermal_convective: {
    sensitivity: 5, bandwidth: 4, noiseFloor: 4,
    shockSurvival: 10, accCost: 2, selfTest: true,
    forNav: false, transduction: "heated_gas_mass_flow",
    bestUse: "consumer_tilt_detect",
  },
  optical_fbg: {
    sensitivity: 10, bandwidth: 6, noiseFloor: 10,
    shockSurvival: 5, accCost: 9, selfTest: false,
    forNav: true, transduction: "fiber_bragg_wavelength",
    bestUse: "seismic_geophone_array",
  },
};

const get = (t: MemsAccel) => DATA[t];

export const sensitivity = (t: MemsAccel) => get(t).sensitivity;
export const bandwidth = (t: MemsAccel) => get(t).bandwidth;
export const noiseFloor = (t: MemsAccel) => get(t).noiseFloor;
export const shockSurvival = (t: MemsAccel) => get(t).shockSurvival;
export const accCost = (t: MemsAccel) => get(t).accCost;
export const selfTest = (t: MemsAccel) => get(t).selfTest;
export const forNav = (t: MemsAccel) => get(t).forNav;
export const transduction = (t: MemsAccel) => get(t).transduction;
export const bestUse = (t: MemsAccel) => get(t).bestUse;
export const memsAccels = (): MemsAccel[] => Object.keys(DATA) as MemsAccel[];
