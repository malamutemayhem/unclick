export type DoorbellCamType = "wired_hd" | "battery_wireless" | "video_intercom" | "peephole_cam" | "floodlight_combo";

export function videoQuality(t: DoorbellCamType): number {
  const m: Record<DoorbellCamType, number> = {
    wired_hd: 9, battery_wireless: 7, video_intercom: 6, peephole_cam: 5, floodlight_combo: 10,
  };
  return m[t];
}

export function fieldOfView(t: DoorbellCamType): number {
  const m: Record<DoorbellCamType, number> = {
    wired_hd: 8, battery_wireless: 7, video_intercom: 5, peephole_cam: 4, floodlight_combo: 10,
  };
  return m[t];
}

export function nightVision(t: DoorbellCamType): number {
  const m: Record<DoorbellCamType, number> = {
    wired_hd: 8, battery_wireless: 7, video_intercom: 4, peephole_cam: 5, floodlight_combo: 10,
  };
  return m[t];
}

export function installEase(t: DoorbellCamType): number {
  const m: Record<DoorbellCamType, number> = {
    wired_hd: 4, battery_wireless: 9, video_intercom: 3, peephole_cam: 10, floodlight_combo: 3,
  };
  return m[t];
}

export function camCost(t: DoorbellCamType): number {
  const m: Record<DoorbellCamType, number> = {
    wired_hd: 7, battery_wireless: 6, video_intercom: 8, peephole_cam: 4, floodlight_combo: 9,
  };
  return m[t];
}

export function twoWayAudio(t: DoorbellCamType): boolean {
  const m: Record<DoorbellCamType, boolean> = {
    wired_hd: true, battery_wireless: true, video_intercom: true, peephole_cam: false, floodlight_combo: true,
  };
  return m[t];
}

export function batteryPowered(t: DoorbellCamType): boolean {
  const m: Record<DoorbellCamType, boolean> = {
    wired_hd: false, battery_wireless: true, video_intercom: false, peephole_cam: true, floodlight_combo: false,
  };
  return m[t];
}

export function storageMethod(t: DoorbellCamType): string {
  const m: Record<DoorbellCamType, string> = {
    wired_hd: "cloud_subscription_plan",
    battery_wireless: "cloud_or_local_sd",
    video_intercom: "onboard_ssd_recorder",
    peephole_cam: "micro_sd_internal",
    floodlight_combo: "cloud_nvr_hybrid",
  };
  return m[t];
}

export function bestEntry(t: DoorbellCamType): string {
  const m: Record<DoorbellCamType, string> = {
    wired_hd: "front_door_wired_home",
    battery_wireless: "rental_apartment_easy",
    video_intercom: "gated_multi_unit_building",
    peephole_cam: "condo_hotel_door",
    floodlight_combo: "driveway_porch_coverage",
  };
  return m[t];
}

export function doorbellCams(): DoorbellCamType[] {
  return ["wired_hd", "battery_wireless", "video_intercom", "peephole_cam", "floodlight_combo"];
}
