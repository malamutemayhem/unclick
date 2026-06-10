export type Soundbar = "basic_stereo" | "dolby_atmos" | "soundbase_platform" | "multiroom_wireless" | "gaming_rgb";

export function audioQuality(s: Soundbar): number {
  const m: Record<Soundbar, number> = {
    basic_stereo: 5, dolby_atmos: 10, soundbase_platform: 7, multiroom_wireless: 8, gaming_rgb: 6,
  };
  return m[s];
}

export function surroundEffect(s: Soundbar): number {
  const m: Record<Soundbar, number> = {
    basic_stereo: 3, dolby_atmos: 10, soundbase_platform: 5, multiroom_wireless: 7, gaming_rgb: 8,
  };
  return m[s];
}

export function bassResponse(s: Soundbar): number {
  const m: Record<Soundbar, number> = {
    basic_stereo: 4, dolby_atmos: 8, soundbase_platform: 9, multiroom_wireless: 6, gaming_rgb: 7,
  };
  return m[s];
}

export function setupSimplicity(s: Soundbar): number {
  const m: Record<Soundbar, number> = {
    basic_stereo: 10, dolby_atmos: 5, soundbase_platform: 9, multiroom_wireless: 4, gaming_rgb: 7,
  };
  return m[s];
}

export function barCost(s: Soundbar): number {
  const m: Record<Soundbar, number> = {
    basic_stereo: 2, dolby_atmos: 9, soundbase_platform: 5, multiroom_wireless: 8, gaming_rgb: 6,
  };
  return m[s];
}

export function hasSubwoofer(s: Soundbar): boolean {
  const m: Record<Soundbar, boolean> = {
    basic_stereo: false, dolby_atmos: true, soundbase_platform: false, multiroom_wireless: true, gaming_rgb: true,
  };
  return m[s];
}

export function wirelessStreaming(s: Soundbar): boolean {
  const m: Record<Soundbar, boolean> = {
    basic_stereo: false, dolby_atmos: true, soundbase_platform: false, multiroom_wireless: true, gaming_rgb: true,
  };
  return m[s];
}

export function connectivity(s: Soundbar): string {
  const m: Record<Soundbar, string> = {
    basic_stereo: "hdmi_arc_optical_aux", dolby_atmos: "earc_hdmi_wifi_bluetooth",
    soundbase_platform: "optical_hdmi_rca_bluetooth", multiroom_wireless: "wifi_airplay_chromecast",
    gaming_rgb: "usb_optical_bluetooth_low_lat",
  };
  return m[s];
}

export function bestUseCase(s: Soundbar): string {
  const m: Record<Soundbar, string> = {
    basic_stereo: "bedroom_tv_audio_upgrade", dolby_atmos: "home_theater_immersive",
    soundbase_platform: "tv_stand_space_saving", multiroom_wireless: "whole_home_audio_system",
    gaming_rgb: "pc_console_gaming_desk",
  };
  return m[s];
}

export function soundbars(): Soundbar[] {
  return ["basic_stereo", "dolby_atmos", "soundbase_platform", "multiroom_wireless", "gaming_rgb"];
}
