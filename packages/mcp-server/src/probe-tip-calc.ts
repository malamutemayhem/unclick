export type ProbeTipType =
  | "sharp_needle_fine"
  | "blunt_spring_loaded"
  | "scope_passive_10x"
  | "scope_active_fet"
  | "current_probe_clamp";

const DATA: Record<ProbeTipType, {
  bandwidth: number; precision: number; durability: number;
  safetyRating: number; probeCost: number; active: boolean;
  forScope: boolean; connectionType: string; bestUse: string;
}> = {
  sharp_needle_fine: { bandwidth: 4, precision: 10, durability: 4, safetyRating: 4, probeCost: 2, active: false, forScope: false, connectionType: "bare_needle_point", bestUse: "fine_pitch_pad_probe" },
  blunt_spring_loaded: { bandwidth: 4, precision: 6, durability: 9, safetyRating: 8, probeCost: 3, active: false, forScope: false, connectionType: "spring_pogo_contact", bestUse: "test_fixture_contact" },
  scope_passive_10x: { bandwidth: 7, precision: 7, durability: 7, safetyRating: 7, probeCost: 4, active: false, forScope: true, connectionType: "bnc_passive_divider", bestUse: "general_scope_measure" },
  scope_active_fet: { bandwidth: 10, precision: 9, durability: 5, safetyRating: 6, probeCost: 9, active: true, forScope: true, connectionType: "proprietary_active_tip", bestUse: "high_speed_signal_capture" },
  current_probe_clamp: { bandwidth: 6, precision: 7, durability: 8, safetyRating: 9, probeCost: 7, active: true, forScope: true, connectionType: "bnc_hall_effect", bestUse: "scope_current_waveform" },
};

const get = (t: ProbeTipType) => DATA[t];

export const bandwidth = (t: ProbeTipType) => get(t).bandwidth;
export const precision = (t: ProbeTipType) => get(t).precision;
export const durability = (t: ProbeTipType) => get(t).durability;
export const safetyRating = (t: ProbeTipType) => get(t).safetyRating;
export const probeCost = (t: ProbeTipType) => get(t).probeCost;
export const active = (t: ProbeTipType) => get(t).active;
export const forScope = (t: ProbeTipType) => get(t).forScope;
export const connectionType = (t: ProbeTipType) => get(t).connectionType;
export const bestUse = (t: ProbeTipType) => get(t).bestUse;
export const probeTips = (): ProbeTipType[] => Object.keys(DATA) as ProbeTipType[];
