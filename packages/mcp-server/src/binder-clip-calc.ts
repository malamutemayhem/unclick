export type BinderClipType = "mini_15mm_tiny" | "small_19mm_standard" | "medium_32mm_common" | "large_51mm_heavy" | "fold_back_color_set";

export function clampForce(t: BinderClipType): number {
  const m: Record<BinderClipType, number> = {
    mini_15mm_tiny: 3, small_19mm_standard: 5, medium_32mm_common: 7, large_51mm_heavy: 10, fold_back_color_set: 6,
  };
  return m[t];
}

export function pageCapacity(t: BinderClipType): number {
  const m: Record<BinderClipType, number> = {
    mini_15mm_tiny: 2, small_19mm_standard: 4, medium_32mm_common: 7, large_51mm_heavy: 10, fold_back_color_set: 5,
  };
  return m[t];
}

export function compactSize(t: BinderClipType): number {
  const m: Record<BinderClipType, number> = {
    mini_15mm_tiny: 10, small_19mm_standard: 8, medium_32mm_common: 5, large_51mm_heavy: 2, fold_back_color_set: 6,
  };
  return m[t];
}

export function handleFold(t: BinderClipType): number {
  const m: Record<BinderClipType, number> = {
    mini_15mm_tiny: 6, small_19mm_standard: 8, medium_32mm_common: 9, large_51mm_heavy: 10, fold_back_color_set: 10,
  };
  return m[t];
}

export function clipCost(t: BinderClipType): number {
  const m: Record<BinderClipType, number> = {
    mini_15mm_tiny: 2, small_19mm_standard: 3, medium_32mm_common: 4, large_51mm_heavy: 6, fold_back_color_set: 5,
  };
  return m[t];
}

export function colorCoded(t: BinderClipType): boolean {
  const m: Record<BinderClipType, boolean> = {
    mini_15mm_tiny: false, small_19mm_standard: false, medium_32mm_common: false, large_51mm_heavy: false, fold_back_color_set: true,
  };
  return m[t];
}

export function stackFriendly(t: BinderClipType): boolean {
  const m: Record<BinderClipType, boolean> = {
    mini_15mm_tiny: true, small_19mm_standard: true, medium_32mm_common: true, large_51mm_heavy: false, fold_back_color_set: true,
  };
  return m[t];
}

export function clipFinish(t: BinderClipType): string {
  const m: Record<BinderClipType, string> = {
    mini_15mm_tiny: "black_oxide_steel",
    small_19mm_standard: "black_oxide_steel",
    medium_32mm_common: "nickel_plated_spring",
    large_51mm_heavy: "tempered_steel_matte",
    fold_back_color_set: "powder_coated_assorted",
  };
  return m[t];
}

export function bestUse(t: BinderClipType): string {
  const m: Record<BinderClipType, string> = {
    mini_15mm_tiny: "receipt_note_bookmark",
    small_19mm_standard: "memo_letter_daily",
    medium_32mm_common: "report_packet_meeting",
    large_51mm_heavy: "manuscript_thick_stack",
    fold_back_color_set: "project_color_sort",
  };
  return m[t];
}

export function binderClips(): BinderClipType[] {
  return ["mini_15mm_tiny", "small_19mm_standard", "medium_32mm_common", "large_51mm_heavy", "fold_back_color_set"];
}
