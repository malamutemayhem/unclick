export type MemoryCardType = "sd_uhs_ii_fast" | "micro_sd_adapter" | "cf_express_pro" | "xqd_broadcast" | "sd_uhs_i_standard";

export function readSpeed(t: MemoryCardType): number {
  const m: Record<MemoryCardType, number> = {
    sd_uhs_ii_fast: 8, micro_sd_adapter: 6, cf_express_pro: 10, xqd_broadcast: 9, sd_uhs_i_standard: 5,
  };
  return m[t];
}

export function writeSpeed(t: MemoryCardType): number {
  const m: Record<MemoryCardType, number> = {
    sd_uhs_ii_fast: 8, micro_sd_adapter: 5, cf_express_pro: 10, xqd_broadcast: 9, sd_uhs_i_standard: 4,
  };
  return m[t];
}

export function reliability(t: MemoryCardType): number {
  const m: Record<MemoryCardType, number> = {
    sd_uhs_ii_fast: 8, micro_sd_adapter: 6, cf_express_pro: 10, xqd_broadcast: 10, sd_uhs_i_standard: 7,
  };
  return m[t];
}

export function compatibility(t: MemoryCardType): number {
  const m: Record<MemoryCardType, number> = {
    sd_uhs_ii_fast: 8, micro_sd_adapter: 10, cf_express_pro: 4, xqd_broadcast: 3, sd_uhs_i_standard: 10,
  };
  return m[t];
}

export function cardCost(t: MemoryCardType): number {
  const m: Record<MemoryCardType, number> = {
    sd_uhs_ii_fast: 6, micro_sd_adapter: 4, cf_express_pro: 10, xqd_broadcast: 9, sd_uhs_i_standard: 3,
  };
  return m[t];
}

export function waterproof(t: MemoryCardType): boolean {
  const m: Record<MemoryCardType, boolean> = {
    sd_uhs_ii_fast: true, micro_sd_adapter: false, cf_express_pro: true, xqd_broadcast: true, sd_uhs_i_standard: true,
  };
  return m[t];
}

export function videoCapable(t: MemoryCardType): boolean {
  const m: Record<MemoryCardType, boolean> = {
    sd_uhs_ii_fast: true, micro_sd_adapter: true, cf_express_pro: true, xqd_broadcast: true, sd_uhs_i_standard: false,
  };
  return m[t];
}

export function formFactor(t: MemoryCardType): string {
  const m: Record<MemoryCardType, string> = {
    sd_uhs_ii_fast: "full_sd_dual_row_pin",
    micro_sd_adapter: "micro_sd_with_adapter",
    cf_express_pro: "cfexpress_type_b_pcie",
    xqd_broadcast: "xqd_sony_nikon_pro",
    sd_uhs_i_standard: "full_sd_single_row_pin",
  };
  return m[t];
}

export function bestCamera(t: MemoryCardType): string {
  const m: Record<MemoryCardType, string> = {
    sd_uhs_ii_fast: "mirrorless_burst_raw",
    micro_sd_adapter: "action_cam_drone_phone",
    cf_express_pro: "flagship_dslr_8k_video",
    xqd_broadcast: "broadcast_cinema_camera",
    sd_uhs_i_standard: "point_shoot_casual_photo",
  };
  return m[t];
}

export function memoryCards(): MemoryCardType[] {
  return ["sd_uhs_ii_fast", "micro_sd_adapter", "cf_express_pro", "xqd_broadcast", "sd_uhs_i_standard"];
}
