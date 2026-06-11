export type CompressedAirDryerType =
  | "refrigerated_cycling"
  | "desiccant_heatless"
  | "desiccant_heated"
  | "membrane_dryer"
  | "deliquescent_salt";

interface CompressedAirDryerData {
  dewPoint: number;
  energyEff: number;
  airLoss: number;
  maintenance: number;
  caCost: number;
  lowDewPoint: boolean;
  forInstrumentAir: boolean;
  drying: string;
  bestUse: string;
}

const DATA: Record<CompressedAirDryerType, CompressedAirDryerData> = {
  refrigerated_cycling: {
    dewPoint: 4, energyEff: 9, airLoss: 10, maintenance: 9, caCost: 4,
    lowDewPoint: false, forInstrumentAir: false,
    drying: "refrigerant_heat_exchanger_condense_moisture_separator",
    bestUse: "general_plant_air_workshop_pneumatic_tool_supply",
  },
  desiccant_heatless: {
    dewPoint: 10, energyEff: 4, airLoss: 4, maintenance: 7, caCost: 7,
    lowDewPoint: true, forInstrumentAir: true,
    drying: "twin_tower_alumina_silica_gel_purge_air_regeneration",
    bestUse: "instrument_air_spray_paint_food_pharma_dry_air",
  },
  desiccant_heated: {
    dewPoint: 10, energyEff: 7, airLoss: 8, maintenance: 6, caCost: 9,
    lowDewPoint: true, forInstrumentAir: true,
    drying: "twin_tower_heated_blower_regeneration_low_purge",
    bestUse: "large_plant_low_dew_point_energy_conscious_operation",
  },
  membrane_dryer: {
    dewPoint: 6, energyEff: 6, airLoss: 5, maintenance: 10, caCost: 5,
    lowDewPoint: false, forInstrumentAir: false,
    drying: "hollow_fiber_membrane_sweep_air_permeation_moisture",
    bestUse: "point_of_use_remote_location_small_flow_no_electric",
  },
  deliquescent_salt: {
    dewPoint: 3, energyEff: 10, airLoss: 10, maintenance: 4, caCost: 2,
    lowDewPoint: false, forInstrumentAir: false,
    drying: "hygroscopic_salt_tablet_dissolve_absorb_drain_brine",
    bestUse: "wellhead_natural_gas_remote_site_no_power_simple",
  },
};

function get(t: CompressedAirDryerType): CompressedAirDryerData {
  return DATA[t];
}

export const dewPoint = (t: CompressedAirDryerType) => get(t).dewPoint;
export const energyEff = (t: CompressedAirDryerType) => get(t).energyEff;
export const airLoss = (t: CompressedAirDryerType) => get(t).airLoss;
export const maintenance = (t: CompressedAirDryerType) => get(t).maintenance;
export const caCost = (t: CompressedAirDryerType) => get(t).caCost;
export const lowDewPoint = (t: CompressedAirDryerType) => get(t).lowDewPoint;
export const forInstrumentAir = (t: CompressedAirDryerType) => get(t).forInstrumentAir;
export const drying = (t: CompressedAirDryerType) => get(t).drying;
export const bestUse = (t: CompressedAirDryerType) => get(t).bestUse;
export const compressedAirDryerTypes = (): CompressedAirDryerType[] =>
  Object.keys(DATA) as CompressedAirDryerType[];
