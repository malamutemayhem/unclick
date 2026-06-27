export type PagingSystemType =
  | "single_zone_analog"
  | "multi_zone_digital"
  | "ip_network_paging"
  | "wireless_portable_pa"
  | "mass_notification_combo";

interface PagingSystemData {
  coverage: number;
  clarity: number;
  flexibility: number;
  reliability: number;
  psCost: number;
  networked: boolean;
  forEmergency: boolean;
  amplifier: string;
  bestUse: string;
}

const DATA: Record<PagingSystemType, PagingSystemData> = {
  single_zone_analog: {
    coverage: 4, clarity: 6, flexibility: 3, reliability: 8, psCost: 2,
    networked: false, forEmergency: false,
    amplifier: "25v_70v_analog_transformer",
    bestUse: "small_retail_store_warehouse",
  },
  multi_zone_digital: {
    coverage: 7, clarity: 8, flexibility: 7, reliability: 8, psCost: 5,
    networked: false, forEmergency: false,
    amplifier: "multi_channel_dsp_zone_matrix",
    bestUse: "school_office_building_zones",
  },
  ip_network_paging: {
    coverage: 10, clarity: 9, flexibility: 10, reliability: 7, psCost: 7,
    networked: true, forEmergency: true,
    amplifier: "poe_endpoint_sip_multicast",
    bestUse: "large_campus_multi_building",
  },
  wireless_portable_pa: {
    coverage: 5, clarity: 6, flexibility: 9, reliability: 5, psCost: 3,
    networked: false, forEmergency: false,
    amplifier: "battery_powered_uhf_portable",
    bestUse: "event_temporary_outdoor_setup",
  },
  mass_notification_combo: {
    coverage: 9, clarity: 9, flexibility: 8, reliability: 9, psCost: 9,
    networked: true, forEmergency: true,
    amplifier: "redundant_amp_backup_battery_evac",
    bestUse: "hospital_airport_evacuation",
  },
};

function get(t: PagingSystemType): PagingSystemData {
  return DATA[t];
}

export const coverage = (t: PagingSystemType) => get(t).coverage;
export const clarity = (t: PagingSystemType) => get(t).clarity;
export const flexibility = (t: PagingSystemType) => get(t).flexibility;
export const reliability = (t: PagingSystemType) => get(t).reliability;
export const psCost = (t: PagingSystemType) => get(t).psCost;
export const networked = (t: PagingSystemType) => get(t).networked;
export const forEmergency = (t: PagingSystemType) => get(t).forEmergency;
export const amplifier = (t: PagingSystemType) => get(t).amplifier;
export const bestUse = (t: PagingSystemType) => get(t).bestUse;
export const pagingSystemTypes = (): PagingSystemType[] =>
  Object.keys(DATA) as PagingSystemType[];
