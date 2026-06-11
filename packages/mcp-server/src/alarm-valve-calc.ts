export type AlarmValveType =
  | "wet_pipe_alarm_check"
  | "dry_pipe_air_clapper"
  | "preaction_electric_release"
  | "deluge_open_head"
  | "double_interlock_preaction";

interface AlarmValveData {
  response: number;
  reliability: number;
  frostProtect: number;
  falseTrigger: number;
  avCost: number;
  supervised: boolean;
  forFreezing: boolean;
  trim: string;
  bestUse: string;
}

const DATA: Record<AlarmValveType, AlarmValveData> = {
  wet_pipe_alarm_check: {
    response: 9, reliability: 9, frostProtect: 1, falseTrigger: 7, avCost: 3,
    supervised: true, forFreezing: false,
    trim: "alarm_gong_retard_chamber",
    bestUse: "heated_building_standard_wet",
  },
  dry_pipe_air_clapper: {
    response: 5, reliability: 7, frostProtect: 10, falseTrigger: 7, avCost: 6,
    supervised: true, forFreezing: true,
    trim: "air_supply_accelerator_exhaust",
    bestUse: "unheated_garage_cold_storage",
  },
  preaction_electric_release: {
    response: 7, reliability: 8, frostProtect: 9, falseTrigger: 9, avCost: 8,
    supervised: true, forFreezing: true,
    trim: "solenoid_detector_panel_trip",
    bestUse: "data_center_museum_water_risk",
  },
  deluge_open_head: {
    response: 10, reliability: 7, frostProtect: 5, falseTrigger: 4, avCost: 7,
    supervised: true, forFreezing: false,
    trim: "solenoid_manual_release_open",
    bestUse: "aircraft_hangar_chemical_plant",
  },
  double_interlock_preaction: {
    response: 6, reliability: 8, frostProtect: 9, falseTrigger: 10, avCost: 10,
    supervised: true, forFreezing: true,
    trim: "dual_detector_electric_pneumatic",
    bestUse: "telecom_freezer_highest_protect",
  },
};

function get(t: AlarmValveType): AlarmValveData {
  return DATA[t];
}

export const response = (t: AlarmValveType) => get(t).response;
export const reliability = (t: AlarmValveType) => get(t).reliability;
export const frostProtect = (t: AlarmValveType) => get(t).frostProtect;
export const falseTrigger = (t: AlarmValveType) => get(t).falseTrigger;
export const avCost = (t: AlarmValveType) => get(t).avCost;
export const supervised = (t: AlarmValveType) => get(t).supervised;
export const forFreezing = (t: AlarmValveType) => get(t).forFreezing;
export const trim = (t: AlarmValveType) => get(t).trim;
export const bestUse = (t: AlarmValveType) => get(t).bestUse;
export const alarmValveTypes = (): AlarmValveType[] =>
  Object.keys(DATA) as AlarmValveType[];
