export type UcieChiplet =
  | "ucie_standard_bump"
  | "ucie_advanced_micro"
  | "ucie_retimer"
  | "bowtie_bridge"
  | "emib_embedded";

const DATA: Record<UcieChiplet, {
  bandwidth: number; reach: number; powerEff: number;
  density: number; ucieCost: number; dieToDie: boolean;
  forHpc: boolean; interconnect: string; bestUse: string;
}> = {
  ucie_standard_bump: {
    bandwidth: 7, reach: 7, powerEff: 7,
    density: 6, ucieCost: 5, dieToDie: true,
    forHpc: true, interconnect: "bump_25mm_reach",
    bestUse: "multi_die_processor",
  },
  ucie_advanced_micro: {
    bandwidth: 9, reach: 4, powerEff: 9,
    density: 10, ucieCost: 8, dieToDie: true,
    forHpc: true, interconnect: "hybrid_bond_sub_10um",
    bestUse: "3d_stacked_chiplet",
  },
  ucie_retimer: {
    bandwidth: 8, reach: 9, powerEff: 5,
    density: 5, ucieCost: 6, dieToDie: false,
    forHpc: true, interconnect: "retimed_long_reach",
    bestUse: "cross_package_link",
  },
  bowtie_bridge: {
    bandwidth: 8, reach: 5, powerEff: 8,
    density: 8, ucieCost: 7, dieToDie: true,
    forHpc: true, interconnect: "si_bridge_organic",
    bestUse: "amd_infinity_fabric",
  },
  emib_embedded: {
    bandwidth: 8, reach: 5, powerEff: 8,
    density: 9, ucieCost: 7, dieToDie: true,
    forHpc: true, interconnect: "embedded_multi_die_bridge",
    bestUse: "intel_ponte_vecchio",
  },
};

const get = (t: UcieChiplet) => DATA[t];

export const bandwidth = (t: UcieChiplet) => get(t).bandwidth;
export const reach = (t: UcieChiplet) => get(t).reach;
export const powerEff = (t: UcieChiplet) => get(t).powerEff;
export const density = (t: UcieChiplet) => get(t).density;
export const ucieCost = (t: UcieChiplet) => get(t).ucieCost;
export const dieToDie = (t: UcieChiplet) => get(t).dieToDie;
export const forHpc = (t: UcieChiplet) => get(t).forHpc;
export const interconnect = (t: UcieChiplet) => get(t).interconnect;
export const bestUse = (t: UcieChiplet) => get(t).bestUse;
export const ucieChiplets = (): UcieChiplet[] => Object.keys(DATA) as UcieChiplet[];
