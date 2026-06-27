export type ArcWeldType =
  | "smaw_stick_electrode"
  | "gmaw_mig_wire"
  | "gtaw_tig_tungsten"
  | "fcaw_flux_core"
  | "saw_submerged_arc";

interface ArcWeldData {
  penetration: number;
  speed: number;
  versatility: number;
  quality: number;
  awCost: number;
  shieldGas: boolean;
  forStructural: boolean;
  electrode: string;
  bestUse: string;
}

const DATA: Record<ArcWeldType, ArcWeldData> = {
  smaw_stick_electrode: {
    penetration: 8, speed: 5, versatility: 10, quality: 6, awCost: 4,
    shieldGas: false, forStructural: true,
    electrode: "consumable_coated_flux_rod",
    bestUse: "field_repair_structural_all_position",
  },
  gmaw_mig_wire: {
    penetration: 7, speed: 9, versatility: 8, quality: 8, awCost: 6,
    shieldGas: true, forStructural: true,
    electrode: "continuous_solid_wire_spool",
    bestUse: "production_sheet_auto_body_fab",
  },
  gtaw_tig_tungsten: {
    penetration: 6, speed: 4, versatility: 7, quality: 10, awCost: 8,
    shieldGas: true, forStructural: false,
    electrode: "non_consumable_tungsten_argon",
    bestUse: "aerospace_pipe_precision_thin_wall",
  },
  fcaw_flux_core: {
    penetration: 9, speed: 8, versatility: 8, quality: 7, awCost: 5,
    shieldGas: false, forStructural: true,
    electrode: "tubular_flux_filled_wire_spool",
    bestUse: "outdoor_structural_heavy_plate",
  },
  saw_submerged_arc: {
    penetration: 10, speed: 10, versatility: 4, quality: 9, awCost: 7,
    shieldGas: false, forStructural: true,
    electrode: "wire_under_granular_flux_blanket",
    bestUse: "thick_plate_vessel_pipe_seam_auto",
  },
};

function get(t: ArcWeldType): ArcWeldData {
  return DATA[t];
}

export const penetration = (t: ArcWeldType) => get(t).penetration;
export const speed = (t: ArcWeldType) => get(t).speed;
export const versatility = (t: ArcWeldType) => get(t).versatility;
export const quality = (t: ArcWeldType) => get(t).quality;
export const awCost = (t: ArcWeldType) => get(t).awCost;
export const shieldGas = (t: ArcWeldType) => get(t).shieldGas;
export const forStructural = (t: ArcWeldType) => get(t).forStructural;
export const electrode = (t: ArcWeldType) => get(t).electrode;
export const bestUse = (t: ArcWeldType) => get(t).bestUse;
export const arcWeldTypes = (): ArcWeldType[] =>
  Object.keys(DATA) as ArcWeldType[];
