export type BalunType =
  | "transformer_wound"
  | "marchand_coupled"
  | "lattice_lumped"
  | "integrated_on_die"
  | "ltcc_multilayer";

const DATA: Record<BalunType, {
  bandwidth: number; insertionLoss: number; balance: number;
  powerHandling: number; balunCost: number; dcPass: boolean;
  forMmwave: boolean; construction: string; bestUse: string;
}> = {
  transformer_wound: {
    bandwidth: 8, insertionLoss: 7, balance: 7,
    powerHandling: 9, balunCost: 4, dcPass: true,
    forMmwave: false, construction: "bifilar_ferrite_core",
    bestUse: "hf_push_pull_amp",
  },
  marchand_coupled: {
    bandwidth: 9, insertionLoss: 8, balance: 9,
    powerHandling: 5, balunCost: 6, dcPass: false,
    forMmwave: true, construction: "coupled_line_quarter",
    bestUse: "mixer_lo_balun",
  },
  lattice_lumped: {
    bandwidth: 5, insertionLoss: 6, balance: 6,
    powerHandling: 6, balunCost: 3, dcPass: false,
    forMmwave: false, construction: "lc_lattice_network",
    bestUse: "wifi_front_end",
  },
  integrated_on_die: {
    bandwidth: 7, insertionLoss: 5, balance: 8,
    powerHandling: 3, balunCost: 2, dcPass: false,
    forMmwave: true, construction: "spiral_inductor_ic",
    bestUse: "5g_rfic_diff_pair",
  },
  ltcc_multilayer: {
    bandwidth: 6, insertionLoss: 7, balance: 8,
    powerHandling: 7, balunCost: 5, dcPass: false,
    forMmwave: false, construction: "multilayer_ceramic",
    bestUse: "bt_wifi_combo_module",
  },
};

const get = (t: BalunType) => DATA[t];

export const bandwidth = (t: BalunType) => get(t).bandwidth;
export const insertionLoss = (t: BalunType) => get(t).insertionLoss;
export const balance = (t: BalunType) => get(t).balance;
export const powerHandling = (t: BalunType) => get(t).powerHandling;
export const balunCost = (t: BalunType) => get(t).balunCost;
export const dcPass = (t: BalunType) => get(t).dcPass;
export const forMmwave = (t: BalunType) => get(t).forMmwave;
export const construction = (t: BalunType) => get(t).construction;
export const bestUse = (t: BalunType) => get(t).bestUse;
export const balunTypes = (): BalunType[] => Object.keys(DATA) as BalunType[];
