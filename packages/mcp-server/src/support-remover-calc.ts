export type SupportRemoverType =
  | "manual_break"
  | "waterjet_blast"
  | "alkaline_dissolve"
  | "electrochemical_etch"
  | "wire_edm_cut";

interface SupportRemoverData {
  removalSpeed: number;
  throughput: number;
  surfaceDamage: number;
  geometryAccess: number;
  srCost_: number;
  automated: boolean;
  forMetal: boolean;
  removerConfig: string;
  bestUse: string;
}

const DATA: Record<SupportRemoverType, SupportRemoverData> = {
  manual_break: {
    removalSpeed: 7, throughput: 4, surfaceDamage: 4, geometryAccess: 5, srCost_: 2,
    automated: false, forMetal: true,
    removerConfig: "manual_break_support_remover_pliers_grinder_hand_snap_deburr",
    bestUse: "simple_part_manual_break_support_remover_hand_snap_grind_clean",
  },
  waterjet_blast: {
    removalSpeed: 8, throughput: 7, surfaceDamage: 7, geometryAccess: 8, srCost_: 6,
    automated: true, forMetal: false,
    removerConfig: "waterjet_blast_support_remover_high_pressure_nozzle_polymer_wash",
    bestUse: "polymer_part_waterjet_blast_support_remover_soluble_support_wash",
  },
  alkaline_dissolve: {
    removalSpeed: 5, throughput: 8, surfaceDamage: 9, geometryAccess: 9, srCost_: 5,
    automated: true, forMetal: false,
    removerConfig: "alkaline_dissolve_support_remover_heated_tank_naoh_soluble_melt",
    bestUse: "internal_channel_alkaline_dissolve_support_remover_soluble_fdm",
  },
  electrochemical_etch: {
    removalSpeed: 4, throughput: 5, surfaceDamage: 8, geometryAccess: 9, srCost_: 8,
    automated: true, forMetal: true,
    removerConfig: "electrochemical_etch_support_remover_acid_current_selective_etch",
    bestUse: "metal_am_part_electrochemical_etch_support_remover_internal_void",
  },
  wire_edm_cut: {
    removalSpeed: 6, throughput: 5, surfaceDamage: 8, geometryAccess: 4, srCost_: 7,
    automated: true, forMetal: true,
    removerConfig: "wire_edm_cut_support_remover_spark_erode_base_plate_separate",
    bestUse: "build_plate_wire_edm_cut_support_remover_separate_part_from_plate",
  },
};

function get(t: SupportRemoverType): SupportRemoverData {
  return DATA[t];
}

export const removalSpeed = (t: SupportRemoverType) => get(t).removalSpeed;
export const throughput = (t: SupportRemoverType) => get(t).throughput;
export const surfaceDamage = (t: SupportRemoverType) => get(t).surfaceDamage;
export const geometryAccess = (t: SupportRemoverType) => get(t).geometryAccess;
export const srCost_ = (t: SupportRemoverType) => get(t).srCost_;
export const automated = (t: SupportRemoverType) => get(t).automated;
export const forMetal = (t: SupportRemoverType) => get(t).forMetal;
export const removerConfig = (t: SupportRemoverType) => get(t).removerConfig;
export const bestUse = (t: SupportRemoverType) => get(t).bestUse;
export const supportRemoverTypes = (): SupportRemoverType[] =>
  Object.keys(DATA) as SupportRemoverType[];
