export type GlassBreakType =
  | "acoustic_dual_tech"
  | "shock_vibration_contact"
  | "passive_acoustic_listen"
  | "active_glass_screen"
  | "wireless_battery_acoustic";

interface GlassBreakData {
  sensitivity: number;
  falseAlarm: number;
  range: number;
  reliability: number;
  gbCost: number;
  contactless: boolean;
  forStorefront: boolean;
  detection: string;
  bestUse: string;
}

const DATA: Record<GlassBreakType, GlassBreakData> = {
  acoustic_dual_tech: {
    sensitivity: 9, falseAlarm: 9, range: 8, reliability: 9, gbCost: 6,
    contactless: true, forStorefront: true,
    detection: "acoustic_pattern_plus_pressure",
    bestUse: "commercial_storefront_window",
  },
  shock_vibration_contact: {
    sensitivity: 7, falseAlarm: 7, range: 3, reliability: 8, gbCost: 3,
    contactless: false, forStorefront: false,
    detection: "piezo_vibration_on_glass",
    bestUse: "single_window_residential",
  },
  passive_acoustic_listen: {
    sensitivity: 8, falseAlarm: 7, range: 7, reliability: 7, gbCost: 4,
    contactless: true, forStorefront: false,
    detection: "microphone_frequency_analysis",
    bestUse: "residential_room_coverage",
  },
  active_glass_screen: {
    sensitivity: 10, falseAlarm: 10, range: 10, reliability: 9, gbCost: 9,
    contactless: false, forStorefront: true,
    detection: "wire_screen_embedded_in_glass",
    bestUse: "museum_jewelry_high_value",
  },
  wireless_battery_acoustic: {
    sensitivity: 8, falseAlarm: 8, range: 6, reliability: 7, gbCost: 5,
    contactless: true, forStorefront: false,
    detection: "wireless_acoustic_battery_3yr",
    bestUse: "retrofit_wireless_alarm_system",
  },
};

function get(t: GlassBreakType): GlassBreakData {
  return DATA[t];
}

export const sensitivity = (t: GlassBreakType) => get(t).sensitivity;
export const falseAlarm = (t: GlassBreakType) => get(t).falseAlarm;
export const range = (t: GlassBreakType) => get(t).range;
export const reliability = (t: GlassBreakType) => get(t).reliability;
export const gbCost = (t: GlassBreakType) => get(t).gbCost;
export const contactless = (t: GlassBreakType) => get(t).contactless;
export const forStorefront = (t: GlassBreakType) => get(t).forStorefront;
export const detection = (t: GlassBreakType) => get(t).detection;
export const bestUse = (t: GlassBreakType) => get(t).bestUse;
export const glassBreakTypes = (): GlassBreakType[] =>
  Object.keys(DATA) as GlassBreakType[];
