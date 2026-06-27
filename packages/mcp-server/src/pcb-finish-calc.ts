export type PcbFinish =
  | "hasl_hot_air"
  | "enig_gold_nickel"
  | "osp_organic"
  | "immersion_silver"
  | "hard_gold_edge";

const DATA: Record<PcbFinish, {
  solderability: number; shelfLife: number; flatness: number;
  contactResist: number; finCost: number; leadFree: boolean;
  forFinePitch: boolean; composition: string; bestUse: string;
}> = {
  hasl_hot_air: {
    solderability: 9, shelfLife: 8, flatness: 3,
    contactResist: 5, finCost: 1, leadFree: false,
    forFinePitch: false, composition: "tin_lead_solder_coat",
    bestUse: "through_hole_general",
  },
  enig_gold_nickel: {
    solderability: 8, shelfLife: 10, flatness: 10,
    contactResist: 9, finCost: 7, leadFree: true,
    forFinePitch: true, composition: "electroless_ni_immersion_au",
    bestUse: "bga_fine_pitch_contact",
  },
  osp_organic: {
    solderability: 7, shelfLife: 4, flatness: 9,
    contactResist: 3, finCost: 2, leadFree: true,
    forFinePitch: true, composition: "benzimidazole_copper_coat",
    bestUse: "smt_cost_sensitive_volume",
  },
  immersion_silver: {
    solderability: 9, shelfLife: 5, flatness: 9,
    contactResist: 7, finCost: 4, leadFree: true,
    forFinePitch: true, composition: "displacement_silver_layer",
    bestUse: "rf_low_loss_signal",
  },
  hard_gold_edge: {
    solderability: 4, shelfLife: 10, flatness: 8,
    contactResist: 10, finCost: 9, leadFree: true,
    forFinePitch: false, composition: "electroplated_hard_au",
    bestUse: "edge_connector_dimm_slot",
  },
};

const get = (t: PcbFinish) => DATA[t];

export const solderability = (t: PcbFinish) => get(t).solderability;
export const shelfLife = (t: PcbFinish) => get(t).shelfLife;
export const flatness = (t: PcbFinish) => get(t).flatness;
export const contactResist = (t: PcbFinish) => get(t).contactResist;
export const finCost = (t: PcbFinish) => get(t).finCost;
export const leadFree = (t: PcbFinish) => get(t).leadFree;
export const forFinePitch = (t: PcbFinish) => get(t).forFinePitch;
export const composition = (t: PcbFinish) => get(t).composition;
export const bestUse = (t: PcbFinish) => get(t).bestUse;
export const pcbFinishes = (): PcbFinish[] => Object.keys(DATA) as PcbFinish[];
