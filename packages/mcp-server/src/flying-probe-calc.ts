export type FlyingProbeType =
  | "dual_probe_basic"
  | "quad_probe_fast"
  | "six_probe_premium"
  | "boundary_scan_combo"
  | "micro_probe_fine";

const DATA: Record<FlyingProbeType, {
  testCoverage: number; testSpeed: number; accuracy: number;
  setupTime: number; systemCost: number; npiReady: boolean;
  contactless: boolean; probeCount: string; bestUse: string;
}> = {
  dual_probe_basic: { testCoverage: 6, testSpeed: 4, accuracy: 7, setupTime: 9, systemCost: 5, npiReady: true, contactless: false, probeCount: "2_probe_top_bottom", bestUse: "prototype_quick_test" },
  quad_probe_fast: { testCoverage: 8, testSpeed: 7, accuracy: 8, setupTime: 8, systemCost: 7, npiReady: true, contactless: false, probeCount: "4_probe_dual_side", bestUse: "low_volume_mixed_board" },
  six_probe_premium: { testCoverage: 9, testSpeed: 9, accuracy: 9, setupTime: 7, systemCost: 9, npiReady: true, contactless: false, probeCount: "6_probe_multi_axis", bestUse: "mid_volume_complex_board" },
  boundary_scan_combo: { testCoverage: 10, testSpeed: 6, accuracy: 10, setupTime: 5, systemCost: 10, npiReady: false, contactless: true, probeCount: "jtag_plus_4_probe", bestUse: "bga_hidden_net_test" },
  micro_probe_fine: { testCoverage: 7, testSpeed: 3, accuracy: 10, setupTime: 8, systemCost: 8, npiReady: true, contactless: false, probeCount: "2_micro_fine_pitch", bestUse: "fine_pitch_01005_test" },
};

const get = (t: FlyingProbeType) => DATA[t];

export const testCoverage = (t: FlyingProbeType) => get(t).testCoverage;
export const testSpeed = (t: FlyingProbeType) => get(t).testSpeed;
export const accuracy = (t: FlyingProbeType) => get(t).accuracy;
export const setupTime = (t: FlyingProbeType) => get(t).setupTime;
export const systemCost = (t: FlyingProbeType) => get(t).systemCost;
export const npiReady = (t: FlyingProbeType) => get(t).npiReady;
export const contactless = (t: FlyingProbeType) => get(t).contactless;
export const probeCount = (t: FlyingProbeType) => get(t).probeCount;
export const bestUse = (t: FlyingProbeType) => get(t).bestUse;
export const flyingProbes = (): FlyingProbeType[] => Object.keys(DATA) as FlyingProbeType[];
