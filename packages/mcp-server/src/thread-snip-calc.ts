export type ThreadSnipType = "spring_action_squeeze" | "scissor_blade_mini" | "pendant_neck_hang" | "electric_heated_seal" | "retractable_badge_reel";

export function cutPrecision(t: ThreadSnipType): number {
  const m: Record<ThreadSnipType, number> = {
    spring_action_squeeze: 9, scissor_blade_mini: 8, pendant_neck_hang: 7, electric_heated_seal: 10, retractable_badge_reel: 7,
  };
  return m[t];
}

export function easeOfUse(t: ThreadSnipType): number {
  const m: Record<ThreadSnipType, number> = {
    spring_action_squeeze: 10, scissor_blade_mini: 8, pendant_neck_hang: 9, electric_heated_seal: 7, retractable_badge_reel: 9,
  };
  return m[t];
}

export function portability(t: ThreadSnipType): number {
  const m: Record<ThreadSnipType, number> = {
    spring_action_squeeze: 8, scissor_blade_mini: 7, pendant_neck_hang: 10, electric_heated_seal: 5, retractable_badge_reel: 9,
  };
  return m[t];
}

export function bladeLife(t: ThreadSnipType): number {
  const m: Record<ThreadSnipType, number> = {
    spring_action_squeeze: 8, scissor_blade_mini: 9, pendant_neck_hang: 7, electric_heated_seal: 10, retractable_badge_reel: 7,
  };
  return m[t];
}

export function snipCost(t: ThreadSnipType): number {
  const m: Record<ThreadSnipType, number> = {
    spring_action_squeeze: 1, scissor_blade_mini: 1, pendant_neck_hang: 2, electric_heated_seal: 3, retractable_badge_reel: 2,
  };
  return m[t];
}

export function sealsCut(t: ThreadSnipType): boolean {
  const m: Record<ThreadSnipType, boolean> = {
    spring_action_squeeze: false, scissor_blade_mini: false, pendant_neck_hang: false, electric_heated_seal: true, retractable_badge_reel: false,
  };
  return m[t];
}

export function wearable(t: ThreadSnipType): boolean {
  const m: Record<ThreadSnipType, boolean> = {
    spring_action_squeeze: false, scissor_blade_mini: false, pendant_neck_hang: true, electric_heated_seal: false, retractable_badge_reel: true,
  };
  return m[t];
}

export function bladeStyle(t: ThreadSnipType): string {
  const m: Record<ThreadSnipType, string> = {
    spring_action_squeeze: "curved_spring_steel",
    scissor_blade_mini: "straight_stainless_pivot",
    pendant_neck_hang: "fold_away_micro_blade",
    electric_heated_seal: "heated_wire_element",
    retractable_badge_reel: "enclosed_safety_cutter",
  };
  return m[t];
}

export function bestTask(t: ThreadSnipType): string {
  const m: Record<ThreadSnipType, string> = {
    spring_action_squeeze: "quick_thread_trim",
    scissor_blade_mini: "detail_embroidery_snip",
    pendant_neck_hang: "travel_sewing_kit",
    electric_heated_seal: "synthetic_fabric_seal",
    retractable_badge_reel: "classroom_sewing_group",
  };
  return m[t];
}

export function threadSnips(): ThreadSnipType[] {
  return ["spring_action_squeeze", "scissor_blade_mini", "pendant_neck_hang", "electric_heated_seal", "retractable_badge_reel"];
}
