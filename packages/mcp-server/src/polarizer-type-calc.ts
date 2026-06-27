export type PolarizerType =
  | "sheet_dichroic_film"
  | "wire_grid_metallic"
  | "calcite_glan_thompson"
  | "brewster_angle_plate"
  | "liquid_crystal_variable";

const DATA: Record<PolarizerType, {
  extinction: number; transmission: number; damage: number;
  acceptance: number; plCost: number; tunable: boolean;
  forLaser: boolean; mechanism: string; bestUse: string;
}> = {
  sheet_dichroic_film: {
    extinction: 5, transmission: 7, damage: 3,
    acceptance: 9, plCost: 1, tunable: false,
    forLaser: false, mechanism: "stretched_pva_iodine_absorb",
    bestUse: "lcd_display_sunglasses_camera",
  },
  wire_grid_metallic: {
    extinction: 7, transmission: 8, damage: 6,
    acceptance: 8, plCost: 3, tunable: false,
    forLaser: false, mechanism: "sub_wavelength_metal_grating",
    bestUse: "infrared_thermal_imaging_filter",
  },
  calcite_glan_thompson: {
    extinction: 10, transmission: 9, damage: 8,
    acceptance: 4, plCost: 5, tunable: false,
    forLaser: true, mechanism: "birefringent_crystal_prism",
    bestUse: "laser_lab_precision_polarimetry",
  },
  brewster_angle_plate: {
    extinction: 6, transmission: 10, damage: 9,
    acceptance: 3, plCost: 2, tunable: false,
    forLaser: true, mechanism: "brewster_angle_reflection",
    bestUse: "intracavity_laser_loss_element",
  },
  liquid_crystal_variable: {
    extinction: 8, transmission: 6, damage: 4,
    acceptance: 7, plCost: 4, tunable: true,
    forLaser: false, mechanism: "voltage_controlled_lc_retarder",
    bestUse: "polarization_microscopy_imaging",
  },
};

const get = (t: PolarizerType) => DATA[t];

export const extinction = (t: PolarizerType) => get(t).extinction;
export const transmission = (t: PolarizerType) => get(t).transmission;
export const damage = (t: PolarizerType) => get(t).damage;
export const acceptance = (t: PolarizerType) => get(t).acceptance;
export const plCost = (t: PolarizerType) => get(t).plCost;
export const tunable = (t: PolarizerType) => get(t).tunable;
export const forLaser = (t: PolarizerType) => get(t).forLaser;
export const mechanism = (t: PolarizerType) => get(t).mechanism;
export const bestUse = (t: PolarizerType) => get(t).bestUse;
export const polarizerTypes = (): PolarizerType[] => Object.keys(DATA) as PolarizerType[];
