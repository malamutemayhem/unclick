export type HearingAid = "behind_the_ear" | "in_the_ear" | "in_the_canal" | "completely_in_canal" | "bone_anchored";

export function amplificationPower(h: HearingAid): number {
  const m: Record<HearingAid, number> = {
    behind_the_ear: 10, in_the_ear: 7, in_the_canal: 6, completely_in_canal: 5, bone_anchored: 8,
  };
  return m[h];
}

export function discreteness(h: HearingAid): number {
  const m: Record<HearingAid, number> = {
    behind_the_ear: 3, in_the_ear: 6, in_the_canal: 8, completely_in_canal: 10, bone_anchored: 4,
  };
  return m[h];
}

export function batteryLife(h: HearingAid): number {
  const m: Record<HearingAid, number> = {
    behind_the_ear: 10, in_the_ear: 7, in_the_canal: 5, completely_in_canal: 3, bone_anchored: 8,
  };
  return m[h];
}

export function feedbackControl(h: HearingAid): number {
  const m: Record<HearingAid, number> = {
    behind_the_ear: 9, in_the_ear: 7, in_the_canal: 6, completely_in_canal: 5, bone_anchored: 8,
  };
  return m[h];
}

export function purchasePrice(h: HearingAid): number {
  const m: Record<HearingAid, number> = {
    behind_the_ear: 6, in_the_ear: 7, in_the_canal: 8, completely_in_canal: 9, bone_anchored: 10,
  };
  return m[h];
}

export function requiresSurgery(h: HearingAid): boolean {
  const m: Record<HearingAid, boolean> = {
    behind_the_ear: false, in_the_ear: false, in_the_canal: false, completely_in_canal: false, bone_anchored: true,
  };
  return m[h];
}

export function bluetoothCapable(h: HearingAid): boolean {
  const m: Record<HearingAid, boolean> = {
    behind_the_ear: true, in_the_ear: true, in_the_canal: true, completely_in_canal: false, bone_anchored: true,
  };
  return m[h];
}

export function transducerType(h: HearingAid): string {
  const m: Record<HearingAid, string> = {
    behind_the_ear: "receiver_in_canal_tube", in_the_ear: "custom_shell_speaker",
    in_the_canal: "miniature_receiver", completely_in_canal: "micro_transducer",
    bone_anchored: "osseointegrated_vibrator",
  };
  return m[h];
}

export function bestCandidate(h: HearingAid): string {
  const m: Record<HearingAid, string> = {
    behind_the_ear: "severe_profound_loss", in_the_ear: "mild_moderate_loss",
    in_the_canal: "mild_moderate_discrete", completely_in_canal: "cosmetic_priority_mild",
    bone_anchored: "conductive_single_sided_deaf",
  };
  return m[h];
}

export function hearingAids(): HearingAid[] {
  return ["behind_the_ear", "in_the_ear", "in_the_canal", "completely_in_canal", "bone_anchored"];
}
