export type HdmiCableType = "standard_1080p_basic" | "high_speed_4k_hdr" | "ultra_high_speed_8k" | "fiber_optic_long_run" | "micro_hdmi_adapter";

export function bandwidth(t: HdmiCableType): number {
  const m: Record<HdmiCableType, number> = {
    standard_1080p_basic: 4, high_speed_4k_hdr: 7, ultra_high_speed_8k: 10, fiber_optic_long_run: 10, micro_hdmi_adapter: 7,
  };
  return m[t];
}

export function maxResolution(t: HdmiCableType): number {
  const m: Record<HdmiCableType, number> = {
    standard_1080p_basic: 4, high_speed_4k_hdr: 7, ultra_high_speed_8k: 10, fiber_optic_long_run: 10, micro_hdmi_adapter: 7,
  };
  return m[t];
}

export function maxLength(t: HdmiCableType): number {
  const m: Record<HdmiCableType, number> = {
    standard_1080p_basic: 6, high_speed_4k_hdr: 5, ultra_high_speed_8k: 4, fiber_optic_long_run: 10, micro_hdmi_adapter: 2,
  };
  return m[t];
}

export function durability(t: HdmiCableType): number {
  const m: Record<HdmiCableType, number> = {
    standard_1080p_basic: 6, high_speed_4k_hdr: 7, ultra_high_speed_8k: 8, fiber_optic_long_run: 5, micro_hdmi_adapter: 4,
  };
  return m[t];
}

export function cableCost(t: HdmiCableType): number {
  const m: Record<HdmiCableType, number> = {
    standard_1080p_basic: 1, high_speed_4k_hdr: 3, ultra_high_speed_8k: 5, fiber_optic_long_run: 8, micro_hdmi_adapter: 2,
  };
  return m[t];
}

export function supportsArc(t: HdmiCableType): boolean {
  const m: Record<HdmiCableType, boolean> = {
    standard_1080p_basic: false, high_speed_4k_hdr: true, ultra_high_speed_8k: true, fiber_optic_long_run: true, micro_hdmi_adapter: false,
  };
  return m[t];
}

export function supportsVrr(t: HdmiCableType): boolean {
  const m: Record<HdmiCableType, boolean> = {
    standard_1080p_basic: false, high_speed_4k_hdr: false, ultra_high_speed_8k: true, fiber_optic_long_run: true, micro_hdmi_adapter: false,
  };
  return m[t];
}

export function shieldType(t: HdmiCableType): string {
  const m: Record<HdmiCableType, string> = {
    standard_1080p_basic: "foil_shield_basic",
    high_speed_4k_hdr: "braid_foil_dual",
    ultra_high_speed_8k: "triple_shield_48gbps",
    fiber_optic_long_run: "optical_fiber_core",
    micro_hdmi_adapter: "compact_braid_short",
  };
  return m[t];
}

export function bestUse(t: HdmiCableType): string {
  const m: Record<HdmiCableType, string> = {
    standard_1080p_basic: "monitor_basic_display",
    high_speed_4k_hdr: "tv_console_streaming",
    ultra_high_speed_8k: "gaming_8k_high_refresh",
    fiber_optic_long_run: "projector_long_distance",
    micro_hdmi_adapter: "camera_tablet_laptop",
  };
  return m[t];
}

export function hdmiCables(): HdmiCableType[] {
  return ["standard_1080p_basic", "high_speed_4k_hdr", "ultra_high_speed_8k", "fiber_optic_long_run", "micro_hdmi_adapter"];
}
