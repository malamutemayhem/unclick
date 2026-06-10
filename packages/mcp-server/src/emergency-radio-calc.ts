export type EmergencyRadioType = "hand_crank_solar" | "noaa_alert_desktop" | "pocket_am_fm" | "ham_shortwave" | "two_way_walkie";

export function bandRange(t: EmergencyRadioType): number {
  const m: Record<EmergencyRadioType, number> = {
    hand_crank_solar: 6, noaa_alert_desktop: 5, pocket_am_fm: 4, ham_shortwave: 10, two_way_walkie: 3,
  };
  return m[t];
}

export function powerResilience(t: EmergencyRadioType): number {
  const m: Record<EmergencyRadioType, number> = {
    hand_crank_solar: 10, noaa_alert_desktop: 4, pocket_am_fm: 6, ham_shortwave: 5, two_way_walkie: 7,
  };
  return m[t];
}

export function portability(t: EmergencyRadioType): number {
  const m: Record<EmergencyRadioType, number> = {
    hand_crank_solar: 7, noaa_alert_desktop: 3, pocket_am_fm: 10, ham_shortwave: 2, two_way_walkie: 9,
  };
  return m[t];
}

export function alertCapability(t: EmergencyRadioType): number {
  const m: Record<EmergencyRadioType, number> = {
    hand_crank_solar: 7, noaa_alert_desktop: 10, pocket_am_fm: 3, ham_shortwave: 6, two_way_walkie: 4,
  };
  return m[t];
}

export function radioCost(t: EmergencyRadioType): number {
  const m: Record<EmergencyRadioType, number> = {
    hand_crank_solar: 3, noaa_alert_desktop: 4, pocket_am_fm: 1, ham_shortwave: 8, two_way_walkie: 4,
  };
  return m[t];
}

export function canTransmit(t: EmergencyRadioType): boolean {
  const m: Record<EmergencyRadioType, boolean> = {
    hand_crank_solar: false, noaa_alert_desktop: false, pocket_am_fm: false, ham_shortwave: true, two_way_walkie: true,
  };
  return m[t];
}

export function hasFlashlight(t: EmergencyRadioType): boolean {
  const m: Record<EmergencyRadioType, boolean> = {
    hand_crank_solar: true, noaa_alert_desktop: false, pocket_am_fm: false, ham_shortwave: false, two_way_walkie: true,
  };
  return m[t];
}

export function powerSource(t: EmergencyRadioType): string {
  const m: Record<EmergencyRadioType, string> = {
    hand_crank_solar: "dynamo_solar_usb_aaa",
    noaa_alert_desktop: "ac_adapter_battery_backup",
    pocket_am_fm: "aa_battery_analog",
    ham_shortwave: "dc_power_large_battery",
    two_way_walkie: "rechargeable_li_ion_pack",
  };
  return m[t];
}

export function bestScenario(t: EmergencyRadioType): string {
  const m: Record<EmergencyRadioType, string> = {
    hand_crank_solar: "power_outage_disaster_kit",
    noaa_alert_desktop: "severe_weather_home_base",
    pocket_am_fm: "daily_listen_budget",
    ham_shortwave: "licensed_operator_global",
    two_way_walkie: "hiking_group_communicate",
  };
  return m[t];
}

export function emergencyRadios(): EmergencyRadioType[] {
  return ["hand_crank_solar", "noaa_alert_desktop", "pocket_am_fm", "ham_shortwave", "two_way_walkie"];
}
