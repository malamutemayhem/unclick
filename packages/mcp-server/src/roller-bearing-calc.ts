export type RollerBearingType =
  | "cylindrical_roller"
  | "tapered_roller"
  | "spherical_roller"
  | "needle_roller"
  | "toroidal_roller";

interface RollerBearingData {
  radialLoad: number;
  axialLoad: number;
  misalignment: number;
  speedLimit: number;
  rbCost: number;
  selfAligning: boolean;
  forHeavyLoad: boolean;
  roller: string;
  bestUse: string;
}

const DATA: Record<RollerBearingType, RollerBearingData> = {
  cylindrical_roller: {
    radialLoad: 10, axialLoad: 3, misalignment: 2, speedLimit: 8, rbCost: 5,
    selfAligning: false, forHeavyLoad: true,
    roller: "straight_cylindrical_roller_line_contact",
    bestUse: "electric_motor_gearbox_high_radial_load",
  },
  tapered_roller: {
    radialLoad: 9, axialLoad: 9, misalignment: 2, speedLimit: 6, rbCost: 6,
    selfAligning: false, forHeavyLoad: true,
    roller: "tapered_roller_cone_cup_combined_load",
    bestUse: "wheel_hub_differential_gearbox_combined_load",
  },
  spherical_roller: {
    radialLoad: 10, axialLoad: 7, misalignment: 10, speedLimit: 5, rbCost: 7,
    selfAligning: true, forHeavyLoad: true,
    roller: "barrel_shaped_roller_spherical_outer_race",
    bestUse: "paper_mill_mining_crusher_heavy_shock_misalign",
  },
  needle_roller: {
    radialLoad: 7, axialLoad: 2, misalignment: 2, speedLimit: 9, rbCost: 4,
    selfAligning: false, forHeavyLoad: false,
    roller: "long_thin_needle_roller_compact_radial_section",
    bestUse: "gearbox_rocker_arm_compact_space_light_load",
  },
  toroidal_roller: {
    radialLoad: 9, axialLoad: 4, misalignment: 8, speedLimit: 6, rbCost: 8,
    selfAligning: true, forHeavyLoad: true,
    roller: "barrel_roller_toroidal_race_axial_float",
    bestUse: "continuous_caster_paper_machine_thermal_growth",
  },
};

function get(t: RollerBearingType): RollerBearingData {
  return DATA[t];
}

export const radialLoad = (t: RollerBearingType) => get(t).radialLoad;
export const axialLoad = (t: RollerBearingType) => get(t).axialLoad;
export const misalignment = (t: RollerBearingType) => get(t).misalignment;
export const speedLimit = (t: RollerBearingType) => get(t).speedLimit;
export const rbCost = (t: RollerBearingType) => get(t).rbCost;
export const selfAligning = (t: RollerBearingType) => get(t).selfAligning;
export const forHeavyLoad = (t: RollerBearingType) => get(t).forHeavyLoad;
export const roller = (t: RollerBearingType) => get(t).roller;
export const bestUse = (t: RollerBearingType) => get(t).bestUse;
export const rollerBearingTypes = (): RollerBearingType[] =>
  Object.keys(DATA) as RollerBearingType[];
