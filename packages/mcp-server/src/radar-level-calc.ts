export type RadarLevelType =
  | "fmcw_non_contact"
  | "pulse_non_contact"
  | "guided_wave_tdr"
  | "phased_array_tank_gauge"
  | "frequency_modulated_80ghz";

interface RadarLevelData {
  accuracy: number;
  range: number;
  reliability: number;
  dustTolerance: number;
  rlCost: number;
  nonContact: boolean;
  forSolids: boolean;
  frequency: string;
  bestUse: string;
}

const DATA: Record<RadarLevelType, RadarLevelData> = {
  fmcw_non_contact: {
    accuracy: 9, range: 9, reliability: 9, dustTolerance: 8, rlCost: 7,
    nonContact: true, forSolids: true,
    frequency: "26ghz_fmcw_continuous_wave",
    bestUse: "liquid_storage_tank_inventory",
  },
  pulse_non_contact: {
    accuracy: 7, range: 8, reliability: 8, dustTolerance: 7, rlCost: 5,
    nonContact: true, forSolids: true,
    frequency: "6ghz_pulse_time_of_flight",
    bestUse: "general_purpose_open_vessel",
  },
  guided_wave_tdr: {
    accuracy: 10, range: 6, reliability: 9, dustTolerance: 9, rlCost: 6,
    nonContact: false, forSolids: false,
    frequency: "tdr_guided_microwave_probe",
    bestUse: "interface_level_small_vessel",
  },
  phased_array_tank_gauge: {
    accuracy: 10, range: 10, reliability: 10, dustTolerance: 8, rlCost: 10,
    nonContact: true, forSolids: false,
    frequency: "10ghz_phased_array_custody",
    bestUse: "custody_transfer_tank_farm",
  },
  frequency_modulated_80ghz: {
    accuracy: 9, range: 8, reliability: 9, dustTolerance: 9, rlCost: 8,
    nonContact: true, forSolids: true,
    frequency: "80ghz_narrow_beam_focused",
    bestUse: "silo_solids_small_nozzle_install",
  },
};

function get(t: RadarLevelType): RadarLevelData {
  return DATA[t];
}

export const accuracy = (t: RadarLevelType) => get(t).accuracy;
export const range = (t: RadarLevelType) => get(t).range;
export const reliability = (t: RadarLevelType) => get(t).reliability;
export const dustTolerance = (t: RadarLevelType) => get(t).dustTolerance;
export const rlCost = (t: RadarLevelType) => get(t).rlCost;
export const nonContact = (t: RadarLevelType) => get(t).nonContact;
export const forSolids = (t: RadarLevelType) => get(t).forSolids;
export const frequency = (t: RadarLevelType) => get(t).frequency;
export const bestUse = (t: RadarLevelType) => get(t).bestUse;
export const radarLevelTypes = (): RadarLevelType[] =>
  Object.keys(DATA) as RadarLevelType[];
