export type AirDryerType =
  | "refrigerated_cycling_heat"
  | "desiccant_heatless_regen"
  | "desiccant_heated_purge"
  | "membrane_hollow_fiber"
  | "deliquescent_salt_tablet";

interface AirDryerData {
  dewpoint: number;
  capacity: number;
  energy: number;
  maintenance: number;
  adCost: number;
  regenerative: boolean;
  forInstrument: boolean;
  drying: string;
  bestUse: string;
}

const DATA: Record<AirDryerType, AirDryerData> = {
  refrigerated_cycling_heat: {
    dewpoint: 5, capacity: 8, energy: 6, maintenance: 3, adCost: 5,
    regenerative: false, forInstrument: false,
    drying: "heat_exchanger_condense_chill",
    bestUse: "general_plant_air_moderate_dew",
  },
  desiccant_heatless_regen: {
    dewpoint: 10, capacity: 6, energy: 7, maintenance: 5, adCost: 7,
    regenerative: true, forInstrument: true,
    drying: "twin_tower_purge_adsorb_cycle",
    bestUse: "instrument_air_low_dewpoint_critical",
  },
  desiccant_heated_purge: {
    dewpoint: 10, capacity: 8, energy: 5, maintenance: 5, adCost: 8,
    regenerative: true, forInstrument: true,
    drying: "heated_tower_external_blower",
    bestUse: "large_flow_low_dewpoint_process",
  },
  membrane_hollow_fiber: {
    dewpoint: 7, capacity: 4, energy: 2, maintenance: 2, adCost: 4,
    regenerative: false, forInstrument: false,
    drying: "selective_permeation_fiber_tube",
    bestUse: "remote_site_small_flow_simple",
  },
  deliquescent_salt_tablet: {
    dewpoint: 3, capacity: 5, energy: 1, maintenance: 6, adCost: 2,
    regenerative: false, forInstrument: false,
    drying: "hygroscopic_salt_absorb_dissolve",
    bestUse: "wellhead_outdoor_no_power_basic",
  },
};

function get(t: AirDryerType): AirDryerData {
  return DATA[t];
}

export const dewpoint = (t: AirDryerType) => get(t).dewpoint;
export const capacity = (t: AirDryerType) => get(t).capacity;
export const energy = (t: AirDryerType) => get(t).energy;
export const maintenance = (t: AirDryerType) => get(t).maintenance;
export const adCost = (t: AirDryerType) => get(t).adCost;
export const regenerative = (t: AirDryerType) => get(t).regenerative;
export const forInstrument = (t: AirDryerType) => get(t).forInstrument;
export const drying = (t: AirDryerType) => get(t).drying;
export const bestUse = (t: AirDryerType) => get(t).bestUse;
export const airDryerTypes = (): AirDryerType[] =>
  Object.keys(DATA) as AirDryerType[];
