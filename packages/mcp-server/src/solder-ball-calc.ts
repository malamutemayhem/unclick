export type SolderBall =
  | "sac_305_leadfree"
  | "snpb_eutectic"
  | "copper_pillar"
  | "micro_bump_cu"
  | "solder_paste_print";

const DATA: Record<SolderBall, {
  reliability: number; pitch: number; thermalCycle: number;
  electromigration: number; ballCost: number; leadFree: boolean;
  forFinePitch: boolean; composition: string; bestUse: string;
}> = {
  sac_305_leadfree: {
    reliability: 7, pitch: 5, thermalCycle: 7,
    electromigration: 6, ballCost: 3, leadFree: true,
    forFinePitch: false, composition: "sn96_5_ag3_cu0_5",
    bestUse: "bga_standard_attach",
  },
  snpb_eutectic: {
    reliability: 8, pitch: 5, thermalCycle: 8,
    electromigration: 7, ballCost: 4, leadFree: false,
    forFinePitch: false, composition: "sn63_pb37",
    bestUse: "mil_aero_legacy",
  },
  copper_pillar: {
    reliability: 9, pitch: 8, thermalCycle: 9,
    electromigration: 9, ballCost: 6, leadFree: true,
    forFinePitch: true, composition: "cu_pillar_sn_cap",
    bestUse: "flip_chip_40um",
  },
  micro_bump_cu: {
    reliability: 7, pitch: 10, thermalCycle: 6,
    electromigration: 8, ballCost: 8, leadFree: true,
    forFinePitch: true, composition: "cu_sn_micro_10um",
    bestUse: "hbm_die_stack",
  },
  solder_paste_print: {
    reliability: 6, pitch: 4, thermalCycle: 6,
    electromigration: 5, ballCost: 2, leadFree: true,
    forFinePitch: false, composition: "sac_paste_stencil",
    bestUse: "smt_component_reflow",
  },
};

const get = (t: SolderBall) => DATA[t];

export const reliability = (t: SolderBall) => get(t).reliability;
export const pitch = (t: SolderBall) => get(t).pitch;
export const thermalCycle = (t: SolderBall) => get(t).thermalCycle;
export const electromigration = (t: SolderBall) => get(t).electromigration;
export const ballCost = (t: SolderBall) => get(t).ballCost;
export const leadFree = (t: SolderBall) => get(t).leadFree;
export const forFinePitch = (t: SolderBall) => get(t).forFinePitch;
export const composition = (t: SolderBall) => get(t).composition;
export const bestUse = (t: SolderBall) => get(t).bestUse;
export const solderBalls = (): SolderBall[] => Object.keys(DATA) as SolderBall[];
