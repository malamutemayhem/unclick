export type VacuumCrystallizerType =
  | "single_stage_batch"
  | "multi_stage_continuous"
  | "oslo_growth_type"
  | "dtb_draft_tube_baffle"
  | "forced_circulation_fc";

interface VacuumCrystallizerData {
  crystalSize: number;
  uniformity: number;
  capacity: number;
  purity: number;
  vcCost: number;
  continuous: boolean;
  forLargeCrystal: boolean;
  design: string;
  bestUse: string;
}

const DATA: Record<VacuumCrystallizerType, VacuumCrystallizerData> = {
  single_stage_batch: {
    crystalSize: 6, uniformity: 6, capacity: 4, purity: 8, vcCost: 4,
    continuous: false, forLargeCrystal: false,
    design: "batch_vessel_vacuum_cool_crystal_harvest",
    bestUse: "pharma_fine_chemical_small_batch_high_pur",
  },
  multi_stage_continuous: {
    crystalSize: 7, uniformity: 8, capacity: 9, purity: 7, vcCost: 7,
    continuous: true, forLargeCrystal: false,
    design: "cascade_stages_continuous_vacuum_flash",
    bestUse: "sugar_refinery_sodium_chloride_continuous",
  },
  oslo_growth_type: {
    crystalSize: 10, uniformity: 9, capacity: 6, purity: 8, vcCost: 8,
    continuous: true, forLargeCrystal: true,
    design: "oslo_fluidized_bed_classified_suspension",
    bestUse: "ammonium_sulfate_large_uniform_crystal",
  },
  dtb_draft_tube_baffle: {
    crystalSize: 8, uniformity: 9, capacity: 8, purity: 8, vcCost: 7,
    continuous: true, forLargeCrystal: true,
    design: "draft_tube_baffle_internal_classification",
    bestUse: "potassium_chloride_citric_acid_crystal",
  },
  forced_circulation_fc: {
    crystalSize: 5, uniformity: 5, capacity: 10, purity: 6, vcCost: 5,
    continuous: true, forLargeCrystal: false,
    design: "pump_recirculate_high_velocity_nucleate",
    bestUse: "sodium_sulfate_inorganic_salt_high_volume",
  },
};

function get(t: VacuumCrystallizerType): VacuumCrystallizerData {
  return DATA[t];
}

export const crystalSize = (t: VacuumCrystallizerType) => get(t).crystalSize;
export const uniformity = (t: VacuumCrystallizerType) => get(t).uniformity;
export const capacity = (t: VacuumCrystallizerType) => get(t).capacity;
export const purity = (t: VacuumCrystallizerType) => get(t).purity;
export const vcCost = (t: VacuumCrystallizerType) => get(t).vcCost;
export const continuous = (t: VacuumCrystallizerType) => get(t).continuous;
export const forLargeCrystal = (t: VacuumCrystallizerType) => get(t).forLargeCrystal;
export const design = (t: VacuumCrystallizerType) => get(t).design;
export const bestUse = (t: VacuumCrystallizerType) => get(t).bestUse;
export const vacuumCrystallizerTypes = (): VacuumCrystallizerType[] =>
  Object.keys(DATA) as VacuumCrystallizerType[];
