export type UvResinType = "thin_flow_coating" | "thick_dome_build" | "hard_scratch_resist" | "flexible_bend_soft" | "color_tinted_premix";

export function cureSpeed(t: UvResinType): number {
  const m: Record<UvResinType, number> = {
    thin_flow_coating: 10, thick_dome_build: 6, hard_scratch_resist: 7, flexible_bend_soft: 8, color_tinted_premix: 9,
  };
  return m[t];
}

export function clarity(t: UvResinType): number {
  const m: Record<UvResinType, number> = {
    thin_flow_coating: 10, thick_dome_build: 9, hard_scratch_resist: 8, flexible_bend_soft: 7, color_tinted_premix: 5,
  };
  return m[t];
}

export function viscosity(t: UvResinType): number {
  const m: Record<UvResinType, number> = {
    thin_flow_coating: 2, thick_dome_build: 9, hard_scratch_resist: 6, flexible_bend_soft: 4, color_tinted_premix: 5,
  };
  return m[t];
}

export function scratchResist(t: UvResinType): number {
  const m: Record<UvResinType, number> = {
    thin_flow_coating: 6, thick_dome_build: 7, hard_scratch_resist: 10, flexible_bend_soft: 3, color_tinted_premix: 6,
  };
  return m[t];
}

export function resinCost(t: UvResinType): number {
  const m: Record<UvResinType, number> = {
    thin_flow_coating: 2, thick_dome_build: 2, hard_scratch_resist: 3, flexible_bend_soft: 3, color_tinted_premix: 2,
  };
  return m[t];
}

export function selfDoming(t: UvResinType): boolean {
  const m: Record<UvResinType, boolean> = {
    thin_flow_coating: false, thick_dome_build: true, hard_scratch_resist: false, flexible_bend_soft: false, color_tinted_premix: false,
  };
  return m[t];
}

export function flexWhenCured(t: UvResinType): boolean {
  const m: Record<UvResinType, boolean> = {
    thin_flow_coating: false, thick_dome_build: false, hard_scratch_resist: false, flexible_bend_soft: true, color_tinted_premix: false,
  };
  return m[t];
}

export function cureMethod(t: UvResinType): string {
  const m: Record<UvResinType, string> = {
    thin_flow_coating: "uv_lamp_365nm",
    thick_dome_build: "uv_lamp_405nm",
    hard_scratch_resist: "uv_led_high_power",
    flexible_bend_soft: "uv_lamp_broad_spectrum",
    color_tinted_premix: "uv_lamp_365nm",
  };
  return m[t];
}

export function bestProject(t: UvResinType): string {
  const m: Record<UvResinType, string> = {
    thin_flow_coating: "photo_seal_pendant",
    thick_dome_build: "cabochon_dome_ring",
    hard_scratch_resist: "watch_crystal_cover",
    flexible_bend_soft: "phone_case_decal",
    color_tinted_premix: "stained_glass_charm",
  };
  return m[t];
}

export function uvResins(): UvResinType[] {
  return ["thin_flow_coating", "thick_dome_build", "hard_scratch_resist", "flexible_bend_soft", "color_tinted_premix"];
}
