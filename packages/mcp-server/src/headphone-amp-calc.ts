export type HeadphoneAmpType = "portable_dac_dongle" | "desktop_tube" | "solid_state_balanced" | "battery_pocket" | "integrated_dac_amp";

export function powerOutput(t: HeadphoneAmpType): number {
  const m: Record<HeadphoneAmpType, number> = {
    portable_dac_dongle: 3, desktop_tube: 8, solid_state_balanced: 10, battery_pocket: 5, integrated_dac_amp: 7,
  };
  return m[t];
}

export function soundWarmth(t: HeadphoneAmpType): number {
  const m: Record<HeadphoneAmpType, number> = {
    portable_dac_dongle: 4, desktop_tube: 10, solid_state_balanced: 5, battery_pocket: 6, integrated_dac_amp: 7,
  };
  return m[t];
}

export function portability(t: HeadphoneAmpType): number {
  const m: Record<HeadphoneAmpType, number> = {
    portable_dac_dongle: 10, desktop_tube: 1, solid_state_balanced: 2, battery_pocket: 9, integrated_dac_amp: 3,
  };
  return m[t];
}

export function dacQuality(t: HeadphoneAmpType): number {
  const m: Record<HeadphoneAmpType, number> = {
    portable_dac_dongle: 7, desktop_tube: 5, solid_state_balanced: 8, battery_pocket: 6, integrated_dac_amp: 10,
  };
  return m[t];
}

export function ampCost(t: HeadphoneAmpType): number {
  const m: Record<HeadphoneAmpType, number> = {
    portable_dac_dongle: 3, desktop_tube: 8, solid_state_balanced: 9, battery_pocket: 4, integrated_dac_amp: 7,
  };
  return m[t];
}

export function balancedOutput(t: HeadphoneAmpType): boolean {
  const m: Record<HeadphoneAmpType, boolean> = {
    portable_dac_dongle: false, desktop_tube: false, solid_state_balanced: true, battery_pocket: false, integrated_dac_amp: true,
  };
  return m[t];
}

export function tubeRollable(t: HeadphoneAmpType): boolean {
  const m: Record<HeadphoneAmpType, boolean> = {
    portable_dac_dongle: false, desktop_tube: true, solid_state_balanced: false, battery_pocket: false, integrated_dac_amp: false,
  };
  return m[t];
}

export function circuitType(t: HeadphoneAmpType): string {
  const m: Record<HeadphoneAmpType, string> = {
    portable_dac_dongle: "usb_c_dac_chip_tiny",
    desktop_tube: "vacuum_tube_class_a",
    solid_state_balanced: "thx_aaa_balanced_xlr",
    battery_pocket: "rechargeable_opamp_discrete",
    integrated_dac_amp: "dac_amp_single_chassis",
  };
  return m[t];
}

export function bestSetup(t: HeadphoneAmpType): string {
  const m: Record<HeadphoneAmpType, string> = {
    portable_dac_dongle: "phone_laptop_on_go",
    desktop_tube: "vinyl_warm_listening",
    solid_state_balanced: "planar_magnetic_drive",
    battery_pocket: "commute_iem_upgrade",
    integrated_dac_amp: "all_in_one_desk_stack",
  };
  return m[t];
}

export function headphoneAmps(): HeadphoneAmpType[] {
  return ["portable_dac_dongle", "desktop_tube", "solid_state_balanced", "battery_pocket", "integrated_dac_amp"];
}
