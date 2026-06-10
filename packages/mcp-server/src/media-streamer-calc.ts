export type MediaStreamerType = "hdmi_stick" | "streaming_box" | "smart_tv_built_in" | "htpc_mini_pc" | "game_console_app";

export function appLibrary(t: MediaStreamerType): number {
  const m: Record<MediaStreamerType, number> = {
    hdmi_stick: 8, streaming_box: 10, smart_tv_built_in: 7, htpc_mini_pc: 6, game_console_app: 5,
  };
  return m[t];
}

export function videoQuality(t: MediaStreamerType): number {
  const m: Record<MediaStreamerType, number> = {
    hdmi_stick: 7, streaming_box: 9, smart_tv_built_in: 7, htpc_mini_pc: 10, game_console_app: 9,
  };
  return m[t];
}

export function remoteInterface(t: MediaStreamerType): number {
  const m: Record<MediaStreamerType, number> = {
    hdmi_stick: 7, streaming_box: 10, smart_tv_built_in: 6, htpc_mini_pc: 5, game_console_app: 7,
  };
  return m[t];
}

export function setupEase(t: MediaStreamerType): number {
  const m: Record<MediaStreamerType, number> = {
    hdmi_stick: 10, streaming_box: 9, smart_tv_built_in: 10, htpc_mini_pc: 3, game_console_app: 7,
  };
  return m[t];
}

export function streamerCost(t: MediaStreamerType): number {
  const m: Record<MediaStreamerType, number> = {
    hdmi_stick: 2, streaming_box: 5, smart_tv_built_in: 1, htpc_mini_pc: 8, game_console_app: 9,
  };
  return m[t];
}

export function voiceControl(t: MediaStreamerType): boolean {
  const m: Record<MediaStreamerType, boolean> = {
    hdmi_stick: true, streaming_box: true, smart_tv_built_in: true, htpc_mini_pc: false, game_console_app: true,
  };
  return m[t];
}

export function localMedia(t: MediaStreamerType): boolean {
  const m: Record<MediaStreamerType, boolean> = {
    hdmi_stick: false, streaming_box: true, smart_tv_built_in: false, htpc_mini_pc: true, game_console_app: true,
  };
  return m[t];
}

export function connectivity(t: MediaStreamerType): string {
  const m: Record<MediaStreamerType, string> = {
    hdmi_stick: "wifi_only_dongle",
    streaming_box: "wifi_ethernet_bluetooth",
    smart_tv_built_in: "integrated_wifi_ethernet",
    htpc_mini_pc: "full_io_usb_ethernet",
    game_console_app: "wifi_ethernet_hdmi_2_1",
  };
  return m[t];
}

export function bestViewer(t: MediaStreamerType): string {
  const m: Record<MediaStreamerType, string> = {
    hdmi_stick: "budget_travel_portable",
    streaming_box: "primary_living_room",
    smart_tv_built_in: "casual_no_extra_device",
    htpc_mini_pc: "power_user_plex_server",
    game_console_app: "gamer_entertainment_hub",
  };
  return m[t];
}

export function mediaStreamers(): MediaStreamerType[] {
  return ["hdmi_stick", "streaming_box", "smart_tv_built_in", "htpc_mini_pc", "game_console_app"];
}
