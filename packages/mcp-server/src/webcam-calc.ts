export type WebcamType = "built_in_laptop_basic" | "hd_1080p_clip_mount" | "4k_auto_focus_pro" | "conference_wide_angle" | "streaming_ring_light";

export function videoQuality(t: WebcamType): number {
  const m: Record<WebcamType, number> = {
    built_in_laptop_basic: 3, hd_1080p_clip_mount: 6, "4k_auto_focus_pro": 10, conference_wide_angle: 7, streaming_ring_light: 8,
  };
  return m[t];
}

export function lowLightPerf(t: WebcamType): number {
  const m: Record<WebcamType, number> = {
    built_in_laptop_basic: 2, hd_1080p_clip_mount: 5, "4k_auto_focus_pro": 9, conference_wide_angle: 6, streaming_ring_light: 10,
  };
  return m[t];
}

export function fieldOfView(t: WebcamType): number {
  const m: Record<WebcamType, number> = {
    built_in_laptop_basic: 5, hd_1080p_clip_mount: 6, "4k_auto_focus_pro": 7, conference_wide_angle: 10, streaming_ring_light: 7,
  };
  return m[t];
}

export function setupEase(t: WebcamType): number {
  const m: Record<WebcamType, number> = {
    built_in_laptop_basic: 10, hd_1080p_clip_mount: 8, "4k_auto_focus_pro": 6, conference_wide_angle: 5, streaming_ring_light: 7,
  };
  return m[t];
}

export function webcamCost(t: WebcamType): number {
  const m: Record<WebcamType, number> = {
    built_in_laptop_basic: 0, hd_1080p_clip_mount: 3, "4k_auto_focus_pro": 8, conference_wide_angle: 7, streaming_ring_light: 6,
  };
  return m[t];
}

export function hasMic(t: WebcamType): boolean {
  const m: Record<WebcamType, boolean> = {
    built_in_laptop_basic: true, hd_1080p_clip_mount: true, "4k_auto_focus_pro": true, conference_wide_angle: true, streaming_ring_light: false,
  };
  return m[t];
}

export function privacyShutter(t: WebcamType): boolean {
  const m: Record<WebcamType, boolean> = {
    built_in_laptop_basic: false, hd_1080p_clip_mount: true, "4k_auto_focus_pro": true, conference_wide_angle: false, streaming_ring_light: false,
  };
  return m[t];
}

export function sensorType(t: WebcamType): string {
  const m: Record<WebcamType, string> = {
    built_in_laptop_basic: "small_cmos_720p_fixed",
    hd_1080p_clip_mount: "cmos_1080p_auto_focus",
    "4k_auto_focus_pro": "sony_starvis_4k_hdr",
    conference_wide_angle: "wide_cmos_120_degree",
    streaming_ring_light: "cmos_1080p_ring_led",
  };
  return m[t];
}

export function bestUse(t: WebcamType): string {
  const m: Record<WebcamType, string> = {
    built_in_laptop_basic: "casual_video_call",
    hd_1080p_clip_mount: "work_from_home_meeting",
    "4k_auto_focus_pro": "content_creator_youtube",
    conference_wide_angle: "meeting_room_group_call",
    streaming_ring_light: "twitch_stream_face_cam",
  };
  return m[t];
}

export function webcams(): WebcamType[] {
  return ["built_in_laptop_basic", "hd_1080p_clip_mount", "4k_auto_focus_pro", "conference_wide_angle", "streaming_ring_light"];
}
