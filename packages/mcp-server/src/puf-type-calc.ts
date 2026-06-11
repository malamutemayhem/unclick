export type PufType =
  | "sram_startup"
  | "ring_oscillator"
  | "arbiter_delay"
  | "butterfly_cross"
  | "coating_optical";

const DATA: Record<PufType, {
  uniqueness: number; reliability: number; bitRate: number;
  tamperResist: number; pufCost: number; volatile: boolean;
  forIot: boolean; source: string; bestUse: string;
}> = {
  sram_startup: {
    uniqueness: 8, reliability: 7, bitRate: 9,
    tamperResist: 5, pufCost: 1, volatile: true,
    forIot: true, source: "uninitialized_cell_bias",
    bestUse: "device_key_generation",
  },
  ring_oscillator: {
    uniqueness: 7, reliability: 8, bitRate: 6,
    tamperResist: 6, pufCost: 2, volatile: false,
    forIot: true, source: "frequency_variation_pair",
    bestUse: "fpga_bitstream_auth",
  },
  arbiter_delay: {
    uniqueness: 8, reliability: 6, bitRate: 8,
    tamperResist: 5, pufCost: 2, volatile: false,
    forIot: false, source: "race_condition_path",
    bestUse: "challenge_response_auth",
  },
  butterfly_cross: {
    uniqueness: 9, reliability: 7, bitRate: 7,
    tamperResist: 7, pufCost: 3, volatile: true,
    forIot: true, source: "cross_coupled_latch_meta",
    bestUse: "secure_boot_root_trust",
  },
  coating_optical: {
    uniqueness: 10, reliability: 9, bitRate: 4,
    tamperResist: 10, pufCost: 7, volatile: false,
    forIot: false, source: "random_dielectric_scatter",
    bestUse: "anti_counterfeit_package",
  },
};

const get = (t: PufType) => DATA[t];

export const uniqueness = (t: PufType) => get(t).uniqueness;
export const reliability = (t: PufType) => get(t).reliability;
export const bitRate = (t: PufType) => get(t).bitRate;
export const tamperResist = (t: PufType) => get(t).tamperResist;
export const pufCost = (t: PufType) => get(t).pufCost;
export const volatile_ = (t: PufType) => get(t).volatile;
export const forIot = (t: PufType) => get(t).forIot;
export const source = (t: PufType) => get(t).source;
export const bestUse = (t: PufType) => get(t).bestUse;
export const pufTypes = (): PufType[] => Object.keys(DATA) as PufType[];
