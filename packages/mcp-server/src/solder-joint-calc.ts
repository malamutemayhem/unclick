export type SolderJoint =
  | "sac305_lead_free"
  | "snpb_eutectic"
  | "sintered_silver"
  | "copper_pillar"
  | "anisotropic_conductive";

const DATA: Record<SolderJoint, {
  reliability: number; thermal: number; pitch: number;
  reworkability: number; sjCost: number; leadFree: boolean;
  forAutomotive: boolean; composition: string; bestUse: string;
}> = {
  sac305_lead_free: {
    reliability: 7, thermal: 6, pitch: 5,
    reworkability: 8, sjCost: 3, leadFree: true,
    forAutomotive: true, composition: "sn96_5_ag3_cu0_5",
    bestUse: "standard_smt_assembly",
  },
  snpb_eutectic: {
    reliability: 8, thermal: 7, pitch: 5,
    reworkability: 9, sjCost: 2, leadFree: false,
    forAutomotive: false, composition: "sn63_pb37_eutectic",
    bestUse: "aerospace_military_exempt",
  },
  sintered_silver: {
    reliability: 10, thermal: 10, pitch: 7,
    reworkability: 3, sjCost: 8, leadFree: true,
    forAutomotive: true, composition: "nano_silver_paste_pressure",
    bestUse: "sic_power_module_attach",
  },
  copper_pillar: {
    reliability: 8, thermal: 8, pitch: 10,
    reworkability: 4, sjCost: 6, leadFree: true,
    forAutomotive: false, composition: "cu_pillar_sn_cap",
    bestUse: "fine_pitch_flip_chip",
  },
  anisotropic_conductive: {
    reliability: 5, thermal: 4, pitch: 8,
    reworkability: 6, sjCost: 4, leadFree: true,
    forAutomotive: false, composition: "acf_conductive_particle",
    bestUse: "flex_display_fpc_bond",
  },
};

const get = (t: SolderJoint) => DATA[t];

export const reliability = (t: SolderJoint) => get(t).reliability;
export const thermal = (t: SolderJoint) => get(t).thermal;
export const pitch = (t: SolderJoint) => get(t).pitch;
export const reworkability = (t: SolderJoint) => get(t).reworkability;
export const sjCost = (t: SolderJoint) => get(t).sjCost;
export const leadFree = (t: SolderJoint) => get(t).leadFree;
export const forAutomotive = (t: SolderJoint) => get(t).forAutomotive;
export const composition = (t: SolderJoint) => get(t).composition;
export const bestUse = (t: SolderJoint) => get(t).bestUse;
export const solderJoints = (): SolderJoint[] => Object.keys(DATA) as SolderJoint[];
