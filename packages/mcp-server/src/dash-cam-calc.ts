export type DashCamType = "single_front" | "dual_front_rear" | "mirror_cam" | "four_k_premium" | "fleet_gps";

export function videoResolution(t: DashCamType): number {
  const m: Record<DashCamType, number> = {
    single_front: 6, dual_front_rear: 7, mirror_cam: 7, four_k_premium: 10, fleet_gps: 6,
  };
  return m[t];
}

export function fieldOfView(t: DashCamType): number {
  const m: Record<DashCamType, number> = {
    single_front: 7, dual_front_rear: 9, mirror_cam: 8, four_k_premium: 8, fleet_gps: 7,
  };
  return m[t];
}

export function nightQuality(t: DashCamType): number {
  const m: Record<DashCamType, number> = {
    single_front: 5, dual_front_rear: 7, mirror_cam: 6, four_k_premium: 10, fleet_gps: 6,
  };
  return m[t];
}

export function installEase(t: DashCamType): number {
  const m: Record<DashCamType, number> = {
    single_front: 10, dual_front_rear: 5, mirror_cam: 7, four_k_premium: 8, fleet_gps: 3,
  };
  return m[t];
}

export function camCost(t: DashCamType): number {
  const m: Record<DashCamType, number> = {
    single_front: 2, dual_front_rear: 5, mirror_cam: 4, four_k_premium: 9, fleet_gps: 10,
  };
  return m[t];
}

export function parkingMode(t: DashCamType): boolean {
  const m: Record<DashCamType, boolean> = {
    single_front: false, dual_front_rear: true, mirror_cam: true, four_k_premium: true, fleet_gps: true,
  };
  return m[t];
}

export function cloudUpload(t: DashCamType): boolean {
  const m: Record<DashCamType, boolean> = {
    single_front: false, dual_front_rear: false, mirror_cam: false, four_k_premium: true, fleet_gps: true,
  };
  return m[t];
}

export function storageType(t: DashCamType): string {
  const m: Record<DashCamType, string> = {
    single_front: "micro_sd_loop_record", dual_front_rear: "micro_sd_dual_channel",
    mirror_cam: "internal_emmc_plus_sd", four_k_premium: "high_endurance_sd_256gb",
    fleet_gps: "ssd_cloud_backup_lte",
  };
  return m[t];
}

export function bestDriver(t: DashCamType): string {
  const m: Record<DashCamType, string> = {
    single_front: "budget_basic_evidence", dual_front_rear: "rideshare_full_coverage",
    mirror_cam: "clean_install_rear_view", four_k_premium: "enthusiast_detail_capture",
    fleet_gps: "business_fleet_management",
  };
  return m[t];
}

export function dashCams(): DashCamType[] {
  return ["single_front", "dual_front_rear", "mirror_cam", "four_k_premium", "fleet_gps"];
}
