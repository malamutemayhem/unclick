export type MoldHeaterType =
  | "oil_circulation"
  | "electric_cartridge"
  | "steam_heat"
  | "induction_surface"
  | "infrared_panel";

interface MoldHeaterData {
  tempUniformity: number;
  throughput: number;
  rampRate: number;
  zoneControl: number;
  mhCost: number;
  rapid: boolean;
  forThermoplastic: boolean;
  heaterConfig: string;
  bestUse: string;
}

const DATA: Record<MoldHeaterType, MoldHeaterData> = {
  oil_circulation: {
    tempUniformity: 9, throughput: 7, rampRate: 5, zoneControl: 7, mhCost: 6,
    rapid: false, forThermoplastic: true,
    heaterConfig: "oil_circulation_mold_heater_pump_loop_jacket_channel_even_heat",
    bestUse: "injection_mold_oil_circulation_mold_heater_even_heat_large_tool",
  },
  electric_cartridge: {
    tempUniformity: 7, throughput: 8, rampRate: 8, zoneControl: 9, mhCost: 5,
    rapid: true, forThermoplastic: true,
    heaterConfig: "electric_cartridge_mold_heater_rod_insert_zone_pid_control",
    bestUse: "press_mold_electric_cartridge_mold_heater_zone_pid_fast_cycle",
  },
  steam_heat: {
    tempUniformity: 8, throughput: 9, rampRate: 7, zoneControl: 5, mhCost: 7,
    rapid: false, forThermoplastic: false,
    heaterConfig: "steam_heat_mold_heater_boiler_supply_channel_condensate_return",
    bestUse: "composite_cure_steam_heat_mold_heater_large_tool_uniform_temp",
  },
  induction_surface: {
    tempUniformity: 7, throughput: 6, rampRate: 9, zoneControl: 8, mhCost: 9,
    rapid: true, forThermoplastic: true,
    heaterConfig: "induction_surface_mold_heater_coil_embed_skin_effect_fast_heat",
    bestUse: "rapid_cycle_induction_surface_mold_heater_skin_effect_seconds",
  },
  infrared_panel: {
    tempUniformity: 6, throughput: 7, rampRate: 8, zoneControl: 6, mhCost: 4,
    rapid: true, forThermoplastic: false,
    heaterConfig: "infrared_panel_mold_heater_ceramic_emitter_radiant_preheat",
    bestUse: "preform_heat_infrared_panel_mold_heater_radiant_preheat_drape",
  },
};

function get(t: MoldHeaterType): MoldHeaterData {
  return DATA[t];
}

export const tempUniformity = (t: MoldHeaterType) => get(t).tempUniformity;
export const throughput = (t: MoldHeaterType) => get(t).throughput;
export const rampRate = (t: MoldHeaterType) => get(t).rampRate;
export const zoneControl = (t: MoldHeaterType) => get(t).zoneControl;
export const mhCost = (t: MoldHeaterType) => get(t).mhCost;
export const rapid = (t: MoldHeaterType) => get(t).rapid;
export const forThermoplastic = (t: MoldHeaterType) => get(t).forThermoplastic;
export const heaterConfig = (t: MoldHeaterType) => get(t).heaterConfig;
export const bestUse = (t: MoldHeaterType) => get(t).bestUse;
export const moldHeaterTypes = (): MoldHeaterType[] =>
  Object.keys(DATA) as MoldHeaterType[];
