export type BeamDyeingType =
  | "warp_beam_standard"
  | "sectional_beam"
  | "package_beam"
  | "high_pressure_beam"
  | "space_dyeing_beam";

interface BeamDyeingData {
  dyePenetration: number;
  bathCirculation: number;
  yarnTension: number;
  colorEvenness: number;
  bdCost: number;
  pressurized: boolean;
  forWarp: boolean;
  beamConfig: string;
  bestUse: string;
}

const DATA: Record<BeamDyeingType, BeamDyeingData> = {
  warp_beam_standard: {
    dyePenetration: 8, bathCirculation: 7, yarnTension: 7, colorEvenness: 8, bdCost: 5,
    pressurized: false, forWarp: true,
    beamConfig: "perforated_beam_inside_out_flow_warp_sheet_wound_dye_bath",
    bestUse: "warp_yarn_dyeing_denim_indigo_sheet_beam_standard_production",
  },
  sectional_beam: {
    dyePenetration: 9, bathCirculation: 8, yarnTension: 8, colorEvenness: 9, bdCost: 7,
    pressurized: false, forWarp: true,
    beamConfig: "sectional_perforated_beam_zone_control_even_flow_distribution",
    bestUse: "multi_color_warp_sectional_stripe_pattern_yarn_dyed_shirting",
  },
  package_beam: {
    dyePenetration: 7, bathCirculation: 9, yarnTension: 6, colorEvenness: 7, bdCost: 6,
    pressurized: true, forWarp: false,
    beamConfig: "yarn_package_on_perforated_tube_radial_flow_cheese_cone_dye",
    bestUse: "package_yarn_dyeing_knitting_yarn_cheese_cone_cross_wound",
  },
  high_pressure_beam: {
    dyePenetration: 10, bathCirculation: 10, yarnTension: 9, colorEvenness: 10, bdCost: 9,
    pressurized: true, forWarp: true,
    beamConfig: "high_pressure_autoclave_beam_140c_disperse_polyester_warp_dye",
    bestUse: "polyester_warp_disperse_dye_high_temp_pressure_beam_coloring",
  },
  space_dyeing_beam: {
    dyePenetration: 6, bathCirculation: 6, yarnTension: 5, colorEvenness: 5, bdCost: 8,
    pressurized: false, forWarp: false,
    beamConfig: "multi_injector_space_dye_random_color_placement_yarn_effect",
    bestUse: "space_dyed_carpet_yarn_heather_effect_multi_color_random_dye",
  },
};

function get(t: BeamDyeingType): BeamDyeingData {
  return DATA[t];
}

export const dyePenetration = (t: BeamDyeingType) => get(t).dyePenetration;
export const bathCirculation = (t: BeamDyeingType) => get(t).bathCirculation;
export const yarnTension = (t: BeamDyeingType) => get(t).yarnTension;
export const colorEvenness = (t: BeamDyeingType) => get(t).colorEvenness;
export const bdCost = (t: BeamDyeingType) => get(t).bdCost;
export const pressurized = (t: BeamDyeingType) => get(t).pressurized;
export const forWarp = (t: BeamDyeingType) => get(t).forWarp;
export const beamConfig = (t: BeamDyeingType) => get(t).beamConfig;
export const bestUse = (t: BeamDyeingType) => get(t).bestUse;
export const beamDyeingTypes = (): BeamDyeingType[] =>
  Object.keys(DATA) as BeamDyeingType[];
