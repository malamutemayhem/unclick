export type SmartPlugType = "wifi_mini" | "energy_monitor" | "outdoor_weatherproof" | "power_strip_smart" | "dimmer_plug";

export function appControl(t: SmartPlugType): number {
  const m: Record<SmartPlugType, number> = {
    wifi_mini: 8, energy_monitor: 9, outdoor_weatherproof: 7, power_strip_smart: 10, dimmer_plug: 8,
  };
  return m[t];
}

export function energyTracking(t: SmartPlugType): number {
  const m: Record<SmartPlugType, number> = {
    wifi_mini: 3, energy_monitor: 10, outdoor_weatherproof: 2, power_strip_smart: 7, dimmer_plug: 4,
  };
  return m[t];
}

export function outletCount(t: SmartPlugType): number {
  const m: Record<SmartPlugType, number> = {
    wifi_mini: 1, energy_monitor: 1, outdoor_weatherproof: 2, power_strip_smart: 6, dimmer_plug: 1,
  };
  return m[t];
}

export function compactness(t: SmartPlugType): number {
  const m: Record<SmartPlugType, number> = {
    wifi_mini: 10, energy_monitor: 7, outdoor_weatherproof: 4, power_strip_smart: 2, dimmer_plug: 8,
  };
  return m[t];
}

export function plugCost(t: SmartPlugType): number {
  const m: Record<SmartPlugType, number> = {
    wifi_mini: 2, energy_monitor: 5, outdoor_weatherproof: 5, power_strip_smart: 8, dimmer_plug: 4,
  };
  return m[t];
}

export function voiceAssistant(t: SmartPlugType): boolean {
  const m: Record<SmartPlugType, boolean> = {
    wifi_mini: true, energy_monitor: true, outdoor_weatherproof: true, power_strip_smart: true, dimmer_plug: true,
  };
  return m[t];
}

export function weatherRated(t: SmartPlugType): boolean {
  const m: Record<SmartPlugType, boolean> = {
    wifi_mini: false, energy_monitor: false, outdoor_weatherproof: true, power_strip_smart: false, dimmer_plug: false,
  };
  return m[t];
}

export function protocol(t: SmartPlugType): string {
  const m: Record<SmartPlugType, string> = {
    wifi_mini: "wifi_2_4ghz_direct",
    energy_monitor: "wifi_cloud_analytics",
    outdoor_weatherproof: "wifi_ip65_sealed",
    power_strip_smart: "wifi_individual_control",
    dimmer_plug: "wifi_triac_dimmer",
  };
  return m[t];
}

export function bestUse(t: SmartPlugType): string {
  const m: Record<SmartPlugType, string> = {
    wifi_mini: "lamp_fan_automation",
    energy_monitor: "appliance_cost_tracking",
    outdoor_weatherproof: "holiday_lights_garden",
    power_strip_smart: "entertainment_center",
    dimmer_plug: "mood_lighting_control",
  };
  return m[t];
}

export function smartPlugs(): SmartPlugType[] {
  return ["wifi_mini", "energy_monitor", "outdoor_weatherproof", "power_strip_smart", "dimmer_plug"];
}
