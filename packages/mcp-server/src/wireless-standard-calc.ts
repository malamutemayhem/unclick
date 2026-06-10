export type WirelessStandard = "wifi6" | "bluetooth5" | "zigbee" | "lora" | "five_g_nr";

export function maxThroughputMbps(w: WirelessStandard): number {
  const m: Record<WirelessStandard, number> = {
    wifi6: 9600, bluetooth5: 2, zigbee: 0.25, lora: 0.05, five_g_nr: 20000,
  };
  return m[w];
}

export function rangeMeters(w: WirelessStandard): number {
  const m: Record<WirelessStandard, number> = {
    wifi6: 120, bluetooth5: 240, zigbee: 100, lora: 15000, five_g_nr: 500,
  };
  return m[w];
}

export function powerConsumption(w: WirelessStandard): number {
  const m: Record<WirelessStandard, number> = {
    wifi6: 7, bluetooth5: 3, zigbee: 1, lora: 1, five_g_nr: 10,
  };
  return m[w];
}

export function latencyMs(w: WirelessStandard): number {
  const m: Record<WirelessStandard, number> = {
    wifi6: 5, bluetooth5: 10, zigbee: 15, lora: 1000, five_g_nr: 1,
  };
  return m[w];
}

export function deviceDensity(w: WirelessStandard): number {
  const m: Record<WirelessStandard, number> = {
    wifi6: 8, bluetooth5: 5, zigbee: 10, lora: 9, five_g_nr: 10,
  };
  return m[w];
}

export function licensedSpectrum(w: WirelessStandard): boolean {
  const m: Record<WirelessStandard, boolean> = {
    wifi6: false, bluetooth5: false, zigbee: false, lora: false, five_g_nr: true,
  };
  return m[w];
}

export function meshCapable(w: WirelessStandard): boolean {
  const m: Record<WirelessStandard, boolean> = {
    wifi6: true, bluetooth5: true, zigbee: true, lora: false, five_g_nr: false,
  };
  return m[w];
}

export function primaryUseCase(w: WirelessStandard): string {
  const m: Record<WirelessStandard, string> = {
    wifi6: "high_speed_lan", bluetooth5: "short_range_peripherals",
    zigbee: "home_automation", lora: "remote_iot_sensors",
    five_g_nr: "mobile_broadband",
  };
  return m[w];
}

export function frequencyBand(w: WirelessStandard): string {
  const m: Record<WirelessStandard, string> = {
    wifi6: "2_4_and_5_ghz", bluetooth5: "2_4_ghz",
    zigbee: "2_4_ghz", lora: "sub_ghz",
    five_g_nr: "sub6_and_mmwave",
  };
  return m[w];
}

export function wirelessStandards(): WirelessStandard[] {
  return ["wifi6", "bluetooth5", "zigbee", "lora", "five_g_nr"];
}
