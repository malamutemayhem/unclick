export type PackingGlandType =
  | "braided_graphite_general"
  | "ptfe_yarn_chemical"
  | "carbon_fiber_high_temp"
  | "aramid_kevlar_abrasive"
  | "injectable_live_loaded";

interface PackingGlandData {
  sealing: number;
  temperature: number;
  chemResist: number;
  wear: number;
  pgCost: number;
  liveLoaded: boolean;
  forValve: boolean;
  fiber: string;
  bestUse: string;
}

const DATA: Record<PackingGlandType, PackingGlandData> = {
  braided_graphite_general: {
    sealing: 8, temperature: 9, chemResist: 8, wear: 7, pgCost: 5,
    liveLoaded: false, forValve: true,
    fiber: "expanded_graphite_braided_yarn",
    bestUse: "steam_valve_pump_general_service",
  },
  ptfe_yarn_chemical: {
    sealing: 9, temperature: 6, chemResist: 10, wear: 6, pgCost: 6,
    liveLoaded: false, forValve: true,
    fiber: "ptfe_filament_braided_square",
    bestUse: "chemical_acid_solvent_clean_service",
  },
  carbon_fiber_high_temp: {
    sealing: 8, temperature: 10, chemResist: 8, wear: 9, pgCost: 8,
    liveLoaded: false, forValve: false,
    fiber: "oxidized_pan_carbon_fiber_braid",
    bestUse: "boiler_feedwater_high_temp_pump",
  },
  aramid_kevlar_abrasive: {
    sealing: 7, temperature: 7, chemResist: 6, wear: 10, pgCost: 6,
    liveLoaded: false, forValve: false,
    fiber: "aramid_para_kevlar_lubricated",
    bestUse: "slurry_pump_mixer_abrasive_media",
  },
  injectable_live_loaded: {
    sealing: 10, temperature: 8, chemResist: 9, wear: 8, pgCost: 9,
    liveLoaded: true, forValve: true,
    fiber: "injectable_sealant_spring_energized",
    bestUse: "fugitive_emission_valve_epa_zero",
  },
};

function get(t: PackingGlandType): PackingGlandData {
  return DATA[t];
}

export const sealing = (t: PackingGlandType) => get(t).sealing;
export const temperature = (t: PackingGlandType) => get(t).temperature;
export const chemResist = (t: PackingGlandType) => get(t).chemResist;
export const wear = (t: PackingGlandType) => get(t).wear;
export const pgCost = (t: PackingGlandType) => get(t).pgCost;
export const liveLoaded = (t: PackingGlandType) => get(t).liveLoaded;
export const forValve = (t: PackingGlandType) => get(t).forValve;
export const fiber = (t: PackingGlandType) => get(t).fiber;
export const bestUse = (t: PackingGlandType) => get(t).bestUse;
export const packingGlandTypes = (): PackingGlandType[] =>
  Object.keys(DATA) as PackingGlandType[];
