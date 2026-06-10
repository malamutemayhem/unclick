export type SdCardType = "sdhc_standard" | "sdxc_uhs_i" | "sdxc_uhs_ii" | "cfast_pro" | "microsd_adapter";

export function writeSpeed(t: SdCardType): number {
  const m: Record<SdCardType, number> = {
    sdhc_standard: 3, sdxc_uhs_i: 6, sdxc_uhs_ii: 9, cfast_pro: 10, microsd_adapter: 5,
  };
  return m[t];
}

export function readSpeed(t: SdCardType): number {
  const m: Record<SdCardType, number> = {
    sdhc_standard: 4, sdxc_uhs_i: 7, sdxc_uhs_ii: 9, cfast_pro: 10, microsd_adapter: 6,
  };
  return m[t];
}

export function maxCapacity(t: SdCardType): number {
  const m: Record<SdCardType, number> = {
    sdhc_standard: 3, sdxc_uhs_i: 7, sdxc_uhs_ii: 9, cfast_pro: 8, microsd_adapter: 7,
  };
  return m[t];
}

export function durability(t: SdCardType): number {
  const m: Record<SdCardType, number> = {
    sdhc_standard: 5, sdxc_uhs_i: 7, sdxc_uhs_ii: 8, cfast_pro: 10, microsd_adapter: 4,
  };
  return m[t];
}

export function cardCost(t: SdCardType): number {
  const m: Record<SdCardType, number> = {
    sdhc_standard: 1, sdxc_uhs_i: 3, sdxc_uhs_ii: 7, cfast_pro: 10, microsd_adapter: 2,
  };
  return m[t];
}

export function videoCapable(t: SdCardType): boolean {
  const m: Record<SdCardType, boolean> = {
    sdhc_standard: false, sdxc_uhs_i: true, sdxc_uhs_ii: true, cfast_pro: true, microsd_adapter: true,
  };
  return m[t];
}

export function shockResistant(t: SdCardType): boolean {
  const m: Record<SdCardType, boolean> = {
    sdhc_standard: false, sdxc_uhs_i: true, sdxc_uhs_ii: true, cfast_pro: true, microsd_adapter: false,
  };
  return m[t];
}

export function busInterface(t: SdCardType): string {
  const m: Record<SdCardType, string> = {
    sdhc_standard: "sd_bus_high_speed", sdxc_uhs_i: "uhs_i_104mb_sec",
    sdxc_uhs_ii: "uhs_ii_312mb_sec", cfast_pro: "sata_iii_600mb_sec",
    microsd_adapter: "uhs_i_micro_form",
  };
  return m[t];
}

export function bestDevice(t: SdCardType): string {
  const m: Record<SdCardType, string> = {
    sdhc_standard: "compact_camera_basic", sdxc_uhs_i: "mirrorless_photo_hd_video",
    sdxc_uhs_ii: "pro_dslr_4k_burst", cfast_pro: "cinema_camera_raw_video",
    microsd_adapter: "drone_action_cam_phone",
  };
  return m[t];
}

export function sdCards(): SdCardType[] {
  return ["sdhc_standard", "sdxc_uhs_i", "sdxc_uhs_ii", "cfast_pro", "microsd_adapter"];
}
