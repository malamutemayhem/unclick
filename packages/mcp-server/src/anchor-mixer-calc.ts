export type AnchorMixerType =
  | "simple_anchor_standard"
  | "gate_impeller_wide"
  | "helical_ribbon_high"
  | "double_helical_ribbon"
  | "sigma_blade_kneader";

interface AnchorMixerData {
  viscosityRange: number;
  wallScraping: number;
  heatTransfer: number;
  blending: number;
  amCost: number;
  closeClearance: boolean;
  forPaste: boolean;
  design: string;
  bestUse: string;
}

const DATA: Record<AnchorMixerType, AnchorMixerData> = {
  simple_anchor_standard: {
    viscosityRange: 7, wallScraping: 8, heatTransfer: 8, blending: 5, amCost: 4,
    closeClearance: true, forPaste: false,
    design: "single_anchor_blade_close_wall_clearance",
    bestUse: "medium_viscosity_polymer_resin_wall_heat",
  },
  gate_impeller_wide: {
    viscosityRange: 6, wallScraping: 7, heatTransfer: 7, blending: 6, amCost: 4,
    closeClearance: true, forPaste: false,
    design: "rectangular_gate_frame_multiple_crossbars",
    bestUse: "tank_agitation_crystallization_gentle_blend",
  },
  helical_ribbon_high: {
    viscosityRange: 9, wallScraping: 9, heatTransfer: 9, blending: 8, amCost: 7,
    closeClearance: true, forPaste: true,
    design: "helical_ribbon_blade_top_to_bottom_turnover",
    bestUse: "high_viscosity_adhesive_paste_polymer_bulk",
  },
  double_helical_ribbon: {
    viscosityRange: 10, wallScraping: 10, heatTransfer: 10, blending: 9, amCost: 8,
    closeClearance: true, forPaste: true,
    design: "counter_rotating_double_helix_intensive_mix",
    bestUse: "extreme_viscosity_silicone_sealant_putty",
  },
  sigma_blade_kneader: {
    viscosityRange: 10, wallScraping: 7, heatTransfer: 6, blending: 10, amCost: 9,
    closeClearance: false, forPaste: true,
    design: "twin_sigma_z_blade_kneading_trough_intensive",
    bestUse: "rubber_compound_dough_mixing_ceramic_paste",
  },
};

function get(t: AnchorMixerType): AnchorMixerData {
  return DATA[t];
}

export const viscosityRange = (t: AnchorMixerType) => get(t).viscosityRange;
export const wallScraping = (t: AnchorMixerType) => get(t).wallScraping;
export const heatTransfer = (t: AnchorMixerType) => get(t).heatTransfer;
export const blending = (t: AnchorMixerType) => get(t).blending;
export const amCost = (t: AnchorMixerType) => get(t).amCost;
export const closeClearance = (t: AnchorMixerType) => get(t).closeClearance;
export const forPaste = (t: AnchorMixerType) => get(t).forPaste;
export const design = (t: AnchorMixerType) => get(t).design;
export const bestUse = (t: AnchorMixerType) => get(t).bestUse;
export const anchorMixerTypes = (): AnchorMixerType[] =>
  Object.keys(DATA) as AnchorMixerType[];
