export type StreamingStickType = "basic_hd_budget" | "four_k_hdr_premium" | "android_tv_open" | "gaming_cloud_stream" | "travel_portable_hotel";

export function videoQuality(t: StreamingStickType): number {
  const m: Record<StreamingStickType, number> = {
    basic_hd_budget: 5, four_k_hdr_premium: 10, android_tv_open: 8, gaming_cloud_stream: 9, travel_portable_hotel: 6,
  };
  return m[t];
}

export function appSelection(t: StreamingStickType): number {
  const m: Record<StreamingStickType, number> = {
    basic_hd_budget: 7, four_k_hdr_premium: 9, android_tv_open: 10, gaming_cloud_stream: 6, travel_portable_hotel: 7,
  };
  return m[t];
}

export function responseSpeed(t: StreamingStickType): number {
  const m: Record<StreamingStickType, number> = {
    basic_hd_budget: 5, four_k_hdr_premium: 9, android_tv_open: 7, gaming_cloud_stream: 10, travel_portable_hotel: 5,
  };
  return m[t];
}

export function easeOfUse(t: StreamingStickType): number {
  const m: Record<StreamingStickType, number> = {
    basic_hd_budget: 9, four_k_hdr_premium: 8, android_tv_open: 6, gaming_cloud_stream: 7, travel_portable_hotel: 8,
  };
  return m[t];
}

export function stickCost(t: StreamingStickType): number {
  const m: Record<StreamingStickType, number> = {
    basic_hd_budget: 2, four_k_hdr_premium: 5, android_tv_open: 4, gaming_cloud_stream: 6, travel_portable_hotel: 3,
  };
  return m[t];
}

export function voiceControl(t: StreamingStickType): boolean {
  const m: Record<StreamingStickType, boolean> = {
    basic_hd_budget: true, four_k_hdr_premium: true, android_tv_open: true, gaming_cloud_stream: false, travel_portable_hotel: true,
  };
  return m[t];
}

export function supportsGaming(t: StreamingStickType): boolean {
  const m: Record<StreamingStickType, boolean> = {
    basic_hd_budget: false, four_k_hdr_premium: false, android_tv_open: true, gaming_cloud_stream: true, travel_portable_hotel: false,
  };
  return m[t];
}

export function connectivity(t: StreamingStickType): string {
  const m: Record<StreamingStickType, string> = {
    basic_hd_budget: "hdmi_wifi_only",
    four_k_hdr_premium: "hdmi_wifi6_bluetooth",
    android_tv_open: "hdmi_wifi_chromecast",
    gaming_cloud_stream: "hdmi_wifi6e_ethernet",
    travel_portable_hotel: "hdmi_wifi_captive_portal",
  };
  return m[t];
}

export function bestSetup(t: StreamingStickType): string {
  const m: Record<StreamingStickType, string> = {
    basic_hd_budget: "second_tv_bedroom_guest",
    four_k_hdr_premium: "main_tv_home_theater",
    android_tv_open: "power_user_sideload",
    gaming_cloud_stream: "cloud_gaming_casual",
    travel_portable_hotel: "hotel_rv_portable",
  };
  return m[t];
}

export function streamingSticks(): StreamingStickType[] {
  return ["basic_hd_budget", "four_k_hdr_premium", "android_tv_open", "gaming_cloud_stream", "travel_portable_hotel"];
}
