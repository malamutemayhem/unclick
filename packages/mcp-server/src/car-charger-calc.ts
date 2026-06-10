export type CarChargerType = "single_usb_a_basic" | "dual_usb_c_fast" | "wireless_qi_mount" | "multi_port_hub" | "inverter_ac_outlet";

export function chargingSpeed(t: CarChargerType): number {
  const m: Record<CarChargerType, number> = {
    single_usb_a_basic: 3, dual_usb_c_fast: 9, wireless_qi_mount: 6, multi_port_hub: 7, inverter_ac_outlet: 10,
  };
  return m[t];
}

export function portCount(t: CarChargerType): number {
  const m: Record<CarChargerType, number> = {
    single_usb_a_basic: 2, dual_usb_c_fast: 5, wireless_qi_mount: 3, multi_port_hub: 10, inverter_ac_outlet: 6,
  };
  return m[t];
}

export function compactSize(t: CarChargerType): number {
  const m: Record<CarChargerType, number> = {
    single_usb_a_basic: 10, dual_usb_c_fast: 8, wireless_qi_mount: 5, multi_port_hub: 4, inverter_ac_outlet: 2,
  };
  return m[t];
}

export function deviceCompat(t: CarChargerType): number {
  const m: Record<CarChargerType, number> = {
    single_usb_a_basic: 6, dual_usb_c_fast: 8, wireless_qi_mount: 5, multi_port_hub: 9, inverter_ac_outlet: 10,
  };
  return m[t];
}

export function chargerCost(t: CarChargerType): number {
  const m: Record<CarChargerType, number> = {
    single_usb_a_basic: 1, dual_usb_c_fast: 4, wireless_qi_mount: 6, multi_port_hub: 5, inverter_ac_outlet: 7,
  };
  return m[t];
}

export function handsFree(t: CarChargerType): boolean {
  const m: Record<CarChargerType, boolean> = {
    single_usb_a_basic: false, dual_usb_c_fast: false, wireless_qi_mount: true, multi_port_hub: false, inverter_ac_outlet: false,
  };
  return m[t];
}

export function fastChargeProto(t: CarChargerType): boolean {
  const m: Record<CarChargerType, boolean> = {
    single_usb_a_basic: false, dual_usb_c_fast: true, wireless_qi_mount: true, multi_port_hub: true, inverter_ac_outlet: false,
  };
  return m[t];
}

export function connectorType(t: CarChargerType): string {
  const m: Record<CarChargerType, string> = {
    single_usb_a_basic: "usb_a_5v_1a_basic",
    dual_usb_c_fast: "usb_c_pd_45w_dual",
    wireless_qi_mount: "qi_15w_magnetic_coil",
    multi_port_hub: "usb_a_c_combo_hub",
    inverter_ac_outlet: "modified_sine_150w",
  };
  return m[t];
}

export function bestDriver(t: CarChargerType): string {
  const m: Record<CarChargerType, string> = {
    single_usb_a_basic: "occasional_short_commute",
    dual_usb_c_fast: "daily_commuter_fast_top",
    wireless_qi_mount: "rideshare_delivery_driver",
    multi_port_hub: "family_road_trip",
    inverter_ac_outlet: "laptop_power_tool_mobile",
  };
  return m[t];
}

export function carChargers(): CarChargerType[] {
  return ["single_usb_a_basic", "dual_usb_c_fast", "wireless_qi_mount", "multi_port_hub", "inverter_ac_outlet"];
}
