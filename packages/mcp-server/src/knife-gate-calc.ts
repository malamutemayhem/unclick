export type KnifeGateType =
  | "rising_stem_handwheel"
  | "non_rising_stem_bevel"
  | "pneumatic_cylinder_actuated"
  | "electric_motor_operated"
  | "bidirectional_full_port";

interface KnifeGateData {
  shutoff: number;
  slurryHandle: number;
  durability: number;
  actuation: number;
  kgCost: number;
  automated: boolean;
  forMining: boolean;
  sealType: string;
  bestUse: string;
}

const DATA: Record<KnifeGateType, KnifeGateData> = {
  rising_stem_handwheel: {
    shutoff: 7, slurryHandle: 8, durability: 8, actuation: 4, kgCost: 4,
    automated: false, forMining: true,
    sealType: "resilient_elastomer_o_ring",
    bestUse: "mining_slurry_isolation",
  },
  non_rising_stem_bevel: {
    shutoff: 7, slurryHandle: 7, durability: 7, actuation: 5, kgCost: 3,
    automated: false, forMining: false,
    sealType: "packing_gland_v_ring",
    bestUse: "tight_space_overhead_clearance",
  },
  pneumatic_cylinder_actuated: {
    shutoff: 8, slurryHandle: 9, durability: 8, actuation: 9, kgCost: 7,
    automated: true, forMining: true,
    sealType: "metal_seated_heavy_duty",
    bestUse: "automated_process_slurry_control",
  },
  electric_motor_operated: {
    shutoff: 9, slurryHandle: 8, durability: 9, actuation: 8, kgCost: 8,
    automated: true, forMining: false,
    sealType: "ptfe_lined_chemical_service",
    bestUse: "wastewater_treatment_headworks",
  },
  bidirectional_full_port: {
    shutoff: 10, slurryHandle: 10, durability: 9, actuation: 7, kgCost: 9,
    automated: true, forMining: true,
    sealType: "dual_direction_perimeter_seal",
    bestUse: "high_solids_pulp_paper_process",
  },
};

function get(t: KnifeGateType): KnifeGateData {
  return DATA[t];
}

export const shutoff = (t: KnifeGateType) => get(t).shutoff;
export const slurryHandle = (t: KnifeGateType) => get(t).slurryHandle;
export const durability = (t: KnifeGateType) => get(t).durability;
export const actuation = (t: KnifeGateType) => get(t).actuation;
export const kgCost = (t: KnifeGateType) => get(t).kgCost;
export const automated = (t: KnifeGateType) => get(t).automated;
export const forMining = (t: KnifeGateType) => get(t).forMining;
export const sealType = (t: KnifeGateType) => get(t).sealType;
export const bestUse = (t: KnifeGateType) => get(t).bestUse;
export const knifeGateTypes = (): KnifeGateType[] =>
  Object.keys(DATA) as KnifeGateType[];
