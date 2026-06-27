export type DacType = "delta_sigma" | "r2r_ladder" | "hybrid_fpga" | "usb_dongle" | "portable_battery";

export function resolution(d: DacType): number {
  const m: Record<DacType, number> = {
    delta_sigma: 8, r2r_ladder: 10, hybrid_fpga: 9, usb_dongle: 5, portable_battery: 7,
  };
  return m[d];
}

export function dynamicRange(d: DacType): number {
  const m: Record<DacType, number> = {
    delta_sigma: 9, r2r_ladder: 8, hybrid_fpga: 10, usb_dongle: 6, portable_battery: 7,
  };
  return m[d];
}

export function analogWarmth(d: DacType): number {
  const m: Record<DacType, number> = {
    delta_sigma: 5, r2r_ladder: 10, hybrid_fpga: 7, usb_dongle: 3, portable_battery: 6,
  };
  return m[d];
}

export function jitterPerformance(d: DacType): number {
  const m: Record<DacType, number> = {
    delta_sigma: 8, r2r_ladder: 7, hybrid_fpga: 10, usb_dongle: 5, portable_battery: 6,
  };
  return m[d];
}

export function dacCost(d: DacType): number {
  const m: Record<DacType, number> = {
    delta_sigma: 5, r2r_ladder: 9, hybrid_fpga: 10, usb_dongle: 1, portable_battery: 4,
  };
  return m[d];
}

export function batteryPowered(d: DacType): boolean {
  const m: Record<DacType, boolean> = {
    delta_sigma: false, r2r_ladder: false, hybrid_fpga: false, usb_dongle: false, portable_battery: true,
  };
  return m[d];
}

export function hasHeadphoneAmp(d: DacType): boolean {
  const m: Record<DacType, boolean> = {
    delta_sigma: true, r2r_ladder: true, hybrid_fpga: true, usb_dongle: true, portable_battery: true,
  };
  return m[d];
}

export function chipArchitecture(d: DacType): string {
  const m: Record<DacType, string> = {
    delta_sigma: "ess_sabre_akm_oversampling", r2r_ladder: "discrete_resistor_network",
    hybrid_fpga: "custom_fpga_filter_design", usb_dongle: "integrated_codec_single_chip",
    portable_battery: "dual_dac_balanced_mobile",
  };
  return m[d];
}

export function bestSetup(d: DacType): string {
  const m: Record<DacType, string> = {
    delta_sigma: "desktop_hifi_reference", r2r_ladder: "audiophile_vinyl_like_warmth",
    hybrid_fpga: "mastering_studio_neutral", usb_dongle: "laptop_phone_quick_upgrade",
    portable_battery: "commute_travel_iem_pair",
  };
  return m[d];
}

export function dacTypes(): DacType[] {
  return ["delta_sigma", "r2r_ladder", "hybrid_fpga", "usb_dongle", "portable_battery"];
}
