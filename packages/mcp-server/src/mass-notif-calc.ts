export type MassNotifType =
  | "outdoor_siren_speaker"
  | "indoor_ceiling_strobe_horn"
  | "desktop_alert_software"
  | "digital_signage_override"
  | "cellular_sms_broadcast";

interface MassNotifData {
  reach: number;
  speed: number;
  clarity: number;
  redundancy: number;
  mnCost: number;
  audible: boolean;
  forOutdoor: boolean;
  channel: string;
  bestUse: string;
}

const DATA: Record<MassNotifType, MassNotifData> = {
  outdoor_siren_speaker: {
    reach: 10, speed: 9, clarity: 6, redundancy: 5, mnCost: 7,
    audible: true, forOutdoor: true,
    channel: "high_power_siren_speaker_pole",
    bestUse: "campus_wide_outdoor_emergency",
  },
  indoor_ceiling_strobe_horn: {
    reach: 7, speed: 9, clarity: 8, redundancy: 7, mnCost: 6,
    audible: true, forOutdoor: false,
    channel: "ceiling_horn_strobe_combo_ada",
    bestUse: "building_floor_fire_lockdown",
  },
  desktop_alert_software: {
    reach: 6, speed: 10, clarity: 9, redundancy: 4, mnCost: 4,
    audible: false, forOutdoor: false,
    channel: "pc_popup_voip_phone_override",
    bestUse: "office_it_network_connected",
  },
  digital_signage_override: {
    reach: 8, speed: 8, clarity: 10, redundancy: 6, mnCost: 8,
    audible: false, forOutdoor: false,
    channel: "display_takeover_text_graphic",
    bestUse: "lobby_hallway_common_area",
  },
  cellular_sms_broadcast: {
    reach: 9, speed: 7, clarity: 7, redundancy: 9, mnCost: 5,
    audible: false, forOutdoor: true,
    channel: "sms_email_app_push_multi",
    bestUse: "university_citywide_alert_system",
  },
};

function get(t: MassNotifType): MassNotifData {
  return DATA[t];
}

export const reach = (t: MassNotifType) => get(t).reach;
export const speed = (t: MassNotifType) => get(t).speed;
export const clarity = (t: MassNotifType) => get(t).clarity;
export const redundancy = (t: MassNotifType) => get(t).redundancy;
export const mnCost = (t: MassNotifType) => get(t).mnCost;
export const audible = (t: MassNotifType) => get(t).audible;
export const forOutdoor = (t: MassNotifType) => get(t).forOutdoor;
export const channel = (t: MassNotifType) => get(t).channel;
export const bestUse = (t: MassNotifType) => get(t).bestUse;
export const massNotifTypes = (): MassNotifType[] =>
  Object.keys(DATA) as MassNotifType[];
