export type UsbHubType = "usb_a_7_port" | "usb_c_thunderbolt" | "powered_charging" | "travel_slim_4" | "docking_station";

export function portCount(t: UsbHubType): number {
  const m: Record<UsbHubType, number> = {
    usb_a_7_port: 9, usb_c_thunderbolt: 7, powered_charging: 8, travel_slim_4: 4, docking_station: 10,
  };
  return m[t];
}

export function dataSpeed(t: UsbHubType): number {
  const m: Record<UsbHubType, number> = {
    usb_a_7_port: 5, usb_c_thunderbolt: 10, powered_charging: 6, travel_slim_4: 7, docking_station: 9,
  };
  return m[t];
}

export function chargingPower(t: UsbHubType): number {
  const m: Record<UsbHubType, number> = {
    usb_a_7_port: 3, usb_c_thunderbolt: 8, powered_charging: 10, travel_slim_4: 2, docking_station: 9,
  };
  return m[t];
}

export function portability(t: UsbHubType): number {
  const m: Record<UsbHubType, number> = {
    usb_a_7_port: 5, usb_c_thunderbolt: 7, powered_charging: 3, travel_slim_4: 10, docking_station: 1,
  };
  return m[t];
}

export function hubCost(t: UsbHubType): number {
  const m: Record<UsbHubType, number> = {
    usb_a_7_port: 3, usb_c_thunderbolt: 7, powered_charging: 5, travel_slim_4: 2, docking_station: 10,
  };
  return m[t];
}

export function externalPower(t: UsbHubType): boolean {
  const m: Record<UsbHubType, boolean> = {
    usb_a_7_port: true, usb_c_thunderbolt: false, powered_charging: true, travel_slim_4: false, docking_station: true,
  };
  return m[t];
}

export function videoOut(t: UsbHubType): boolean {
  const m: Record<UsbHubType, boolean> = {
    usb_a_7_port: false, usb_c_thunderbolt: true, powered_charging: false, travel_slim_4: false, docking_station: true,
  };
  return m[t];
}

export function connector(t: UsbHubType): string {
  const m: Record<UsbHubType, string> = {
    usb_a_7_port: "usb_a_3_0_upstream",
    usb_c_thunderbolt: "usb_c_thunderbolt_4",
    powered_charging: "usb_a_bc_1_2_charging",
    travel_slim_4: "usb_c_gen_2",
    docking_station: "usb_c_dp_alt_mode",
  };
  return m[t];
}

export function bestSetup(t: UsbHubType): string {
  const m: Record<UsbHubType, string> = {
    usb_a_7_port: "desktop_peripheral_expand",
    usb_c_thunderbolt: "macbook_pro_creative",
    powered_charging: "device_charging_station",
    travel_slim_4: "laptop_bag_on_go",
    docking_station: "dual_monitor_workstation",
  };
  return m[t];
}

export function usbHubs(): UsbHubType[] {
  return ["usb_a_7_port", "usb_c_thunderbolt", "powered_charging", "travel_slim_4", "docking_station"];
}
