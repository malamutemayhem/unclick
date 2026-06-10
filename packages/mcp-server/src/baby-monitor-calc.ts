export type BabyMonitorType = "audio_only" | "video_wifi" | "video_dedicated" | "smart_breathing" | "wearable_sock";

export function videoQuality(t: BabyMonitorType): number {
  const m: Record<BabyMonitorType, number> = {
    audio_only: 0, video_wifi: 8, video_dedicated: 7, smart_breathing: 9, wearable_sock: 0,
  };
  return m[t];
}

export function rangeDistance(t: BabyMonitorType): number {
  const m: Record<BabyMonitorType, number> = {
    audio_only: 7, video_wifi: 10, video_dedicated: 8, smart_breathing: 10, wearable_sock: 10,
  };
  return m[t];
}

export function batteryLife(t: BabyMonitorType): number {
  const m: Record<BabyMonitorType, number> = {
    audio_only: 10, video_wifi: 5, video_dedicated: 7, smart_breathing: 6, wearable_sock: 4,
  };
  return m[t];
}

export function setupEase(t: BabyMonitorType): number {
  const m: Record<BabyMonitorType, number> = {
    audio_only: 10, video_wifi: 6, video_dedicated: 8, smart_breathing: 5, wearable_sock: 7,
  };
  return m[t];
}

export function monitorCost(t: BabyMonitorType): number {
  const m: Record<BabyMonitorType, number> = {
    audio_only: 2, video_wifi: 6, video_dedicated: 5, smart_breathing: 9, wearable_sock: 10,
  };
  return m[t];
}

export function nightVision(t: BabyMonitorType): boolean {
  const m: Record<BabyMonitorType, boolean> = {
    audio_only: false, video_wifi: true, video_dedicated: true, smart_breathing: true, wearable_sock: false,
  };
  return m[t];
}

export function twoWayAudio(t: BabyMonitorType): boolean {
  const m: Record<BabyMonitorType, boolean> = {
    audio_only: true, video_wifi: true, video_dedicated: true, smart_breathing: true, wearable_sock: false,
  };
  return m[t];
}

export function connectType(t: BabyMonitorType): string {
  const m: Record<BabyMonitorType, string> = {
    audio_only: "dect_radio_frequency", video_wifi: "home_wifi_cloud",
    video_dedicated: "fhss_encrypted_signal", smart_breathing: "wifi_plus_sensor_hub",
    wearable_sock: "bluetooth_wifi_app",
  };
  return m[t];
}

export function bestUse(t: BabyMonitorType): string {
  const m: Record<BabyMonitorType, string> = {
    audio_only: "budget_basic_monitoring", video_wifi: "remote_viewing_anywhere",
    video_dedicated: "no_wifi_secure_feed", smart_breathing: "health_tracking_alerts",
    wearable_sock: "oxygen_heart_rate_sleep",
  };
  return m[t];
}

export function babyMonitors(): BabyMonitorType[] {
  return ["audio_only", "video_wifi", "video_dedicated", "smart_breathing", "wearable_sock"];
}
