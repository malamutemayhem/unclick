export type BioreactorType =
  | "stirred_tank_cstr"
  | "wave_bag_rocking"
  | "fixed_bed_packed"
  | "hollow_fiber_perfusion"
  | "airlift_bubble_column";

const DATA: Record<BioreactorType, {
  scaleUp: number; mixing: number; oxygenTransfer: number;
  shearStress: number; brCost: number; singleUse: boolean;
  forMab: boolean; agitation: string; bestUse: string;
}> = {
  stirred_tank_cstr: {
    scaleUp: 10, mixing: 10, oxygenTransfer: 9,
    shearStress: 4, brCost: 4, singleUse: false,
    forMab: true, agitation: "rushton_impeller_baffled",
    bestUse: "large_scale_mab_fed_batch",
  },
  wave_bag_rocking: {
    scaleUp: 5, mixing: 6, oxygenTransfer: 6,
    shearStress: 9, brCost: 3, singleUse: true,
    forMab: true, agitation: "rocking_platform_wave_motion",
    bestUse: "clinical_trial_seed_expansion",
  },
  fixed_bed_packed: {
    scaleUp: 6, mixing: 4, oxygenTransfer: 7,
    shearStress: 10, brCost: 3, singleUse: false,
    forMab: false, agitation: "recirculate_through_matrix",
    bestUse: "adherent_cell_vaccine_produce",
  },
  hollow_fiber_perfusion: {
    scaleUp: 7, mixing: 5, oxygenTransfer: 8,
    shearStress: 8, brCost: 5, singleUse: false,
    forMab: true, agitation: "perfusion_bleed_harvest_loop",
    bestUse: "continuous_perfusion_high_density",
  },
  airlift_bubble_column: {
    scaleUp: 8, mixing: 7, oxygenTransfer: 10,
    shearStress: 7, brCost: 2, singleUse: false,
    forMab: false, agitation: "sparged_gas_lift_draft_tube",
    bestUse: "microbial_fermentation_high_od",
  },
};

const get = (t: BioreactorType) => DATA[t];

export const scaleUp = (t: BioreactorType) => get(t).scaleUp;
export const mixing = (t: BioreactorType) => get(t).mixing;
export const oxygenTransfer = (t: BioreactorType) => get(t).oxygenTransfer;
export const shearStress = (t: BioreactorType) => get(t).shearStress;
export const brCost = (t: BioreactorType) => get(t).brCost;
export const singleUse = (t: BioreactorType) => get(t).singleUse;
export const forMab = (t: BioreactorType) => get(t).forMab;
export const agitation = (t: BioreactorType) => get(t).agitation;
export const bestUse = (t: BioreactorType) => get(t).bestUse;
export const bioreactorTypes = (): BioreactorType[] => Object.keys(DATA) as BioreactorType[];
