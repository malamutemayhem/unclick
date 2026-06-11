export type UltrasonicLevelType =
  | "non_contact_air_gap"
  | "submersible_pressure_comp"
  | "clamp_on_external"
  | "guided_wave_probe"
  | "open_channel_flow";

interface UltrasonicLevelData {
  accuracy: number;
  range: number;
  foamImmune: number;
  tempRange: number;
  ulCost: number;
  nonContact: boolean;
  forSolids: boolean;
  transducer: string;
  bestUse: string;
}

const DATA: Record<UltrasonicLevelType, UltrasonicLevelData> = {
  non_contact_air_gap: {
    accuracy: 8, range: 8, foamImmune: 4, tempRange: 6, ulCost: 5,
    nonContact: true, forSolids: true,
    transducer: "piezo_ceramic_air_gap_echo_reflect",
    bestUse: "liquid_solid_general_purpose_non_contact",
  },
  submersible_pressure_comp: {
    accuracy: 7, range: 10, foamImmune: 8, tempRange: 5, ulCost: 6,
    nonContact: false, forSolids: false,
    transducer: "submersed_transducer_bottom_up_measure",
    bestUse: "deep_well_open_pit_submerge_measure",
  },
  clamp_on_external: {
    accuracy: 5, range: 5, foamImmune: 6, tempRange: 4, ulCost: 4,
    nonContact: true, forSolids: false,
    transducer: "external_clamp_through_wall_propagate",
    bestUse: "retrofit_no_penetration_existing_tank",
  },
  guided_wave_probe: {
    accuracy: 9, range: 7, foamImmune: 9, tempRange: 8, ulCost: 7,
    nonContact: false, forSolids: true,
    transducer: "guided_wave_rod_cable_tdr_pulse",
    bestUse: "foam_vapor_turbulent_surface_reliable",
  },
  open_channel_flow: {
    accuracy: 7, range: 6, foamImmune: 5, tempRange: 5, ulCost: 5,
    nonContact: true, forSolids: false,
    transducer: "downward_facing_flume_weir_flow_calc",
    bestUse: "open_channel_weir_flume_flow_measure",
  },
};

function get(t: UltrasonicLevelType): UltrasonicLevelData {
  return DATA[t];
}

export const accuracy = (t: UltrasonicLevelType) => get(t).accuracy;
export const range = (t: UltrasonicLevelType) => get(t).range;
export const foamImmune = (t: UltrasonicLevelType) => get(t).foamImmune;
export const tempRange = (t: UltrasonicLevelType) => get(t).tempRange;
export const ulCost = (t: UltrasonicLevelType) => get(t).ulCost;
export const nonContact = (t: UltrasonicLevelType) => get(t).nonContact;
export const forSolids = (t: UltrasonicLevelType) => get(t).forSolids;
export const transducer = (t: UltrasonicLevelType) => get(t).transducer;
export const bestUse = (t: UltrasonicLevelType) => get(t).bestUse;
export const ultrasonicLevelTypes = (): UltrasonicLevelType[] =>
  Object.keys(DATA) as UltrasonicLevelType[];
