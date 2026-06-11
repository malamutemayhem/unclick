export type ConduitTypeType =
  | "emt_thin_wall_steel"
  | "rigid_galvanized_heavy"
  | "pvc_schedule_40_plastic"
  | "flexible_metal_fmc_spiral"
  | "liquid_tight_flex_lfmc";

interface ConduitTypeData {
  protection: number;
  flexibility: number;
  corrosion: number;
  pullEase: number;
  cdCost: number;
  metallic: boolean;
  forOutdoor: boolean;
  fitting: string;
  bestUse: string;
}

const DATA: Record<ConduitTypeType, ConduitTypeData> = {
  emt_thin_wall_steel: {
    protection: 7, flexibility: 3, corrosion: 5, pullEase: 8, cdCost: 4,
    metallic: true, forOutdoor: false,
    fitting: "compression_set_screw_coupling",
    bestUse: "commercial_interior_branch_circuit",
  },
  rigid_galvanized_heavy: {
    protection: 10, flexibility: 1, corrosion: 8, pullEase: 5, cdCost: 8,
    metallic: true, forOutdoor: true,
    fitting: "threaded_coupling_hub_connector",
    bestUse: "outdoor_exposed_hazardous_location",
  },
  pvc_schedule_40_plastic: {
    protection: 6, flexibility: 2, corrosion: 10, pullEase: 9, cdCost: 2,
    metallic: false, forOutdoor: true,
    fitting: "solvent_weld_glue_coupling",
    bestUse: "underground_direct_bury_duct_bank",
  },
  flexible_metal_fmc_spiral: {
    protection: 5, flexibility: 9, corrosion: 4, pullEase: 7, cdCost: 5,
    metallic: true, forOutdoor: false,
    fitting: "squeeze_connector_clamp_fitting",
    bestUse: "motor_connection_vibrating_equipment",
  },
  liquid_tight_flex_lfmc: {
    protection: 6, flexibility: 8, corrosion: 7, pullEase: 6, cdCost: 6,
    metallic: true, forOutdoor: true,
    fitting: "liquid_tight_connector_gland_seal",
    bestUse: "wet_location_rooftop_hvac_unit",
  },
};

function get(t: ConduitTypeType): ConduitTypeData {
  return DATA[t];
}

export const protection = (t: ConduitTypeType) => get(t).protection;
export const flexibility = (t: ConduitTypeType) => get(t).flexibility;
export const corrosion = (t: ConduitTypeType) => get(t).corrosion;
export const pullEase = (t: ConduitTypeType) => get(t).pullEase;
export const cdCost = (t: ConduitTypeType) => get(t).cdCost;
export const metallic = (t: ConduitTypeType) => get(t).metallic;
export const forOutdoor = (t: ConduitTypeType) => get(t).forOutdoor;
export const fitting = (t: ConduitTypeType) => get(t).fitting;
export const bestUse = (t: ConduitTypeType) => get(t).bestUse;
export const conduitTypeTypes = (): ConduitTypeType[] =>
  Object.keys(DATA) as ConduitTypeType[];
