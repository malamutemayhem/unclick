export type AgitatedVesselType =
  | "anchor_paddle_slow"
  | "rushton_turbine_high"
  | "pitched_blade_axial"
  | "helical_ribbon_visc"
  | "magnetic_drive_seal";

interface AgitatedVesselData {
  mixingIntensity: number;
  viscosityRange: number;
  heatTransfer: number;
  scaleUp: number;
  avCost: number;
  sealless: boolean;
  forHighVisc: boolean;
  impeller: string;
  bestUse: string;
}

const DATA: Record<AgitatedVesselType, AgitatedVesselData> = {
  anchor_paddle_slow: {
    mixingIntensity: 4, viscosityRange: 8, heatTransfer: 7, scaleUp: 7, avCost: 4,
    sealless: false, forHighVisc: true,
    impeller: "anchor_gate_paddle_wall_scraping_slow_speed",
    bestUse: "viscous_paste_blending_wall_scraping_heating",
  },
  rushton_turbine_high: {
    mixingIntensity: 10, viscosityRange: 4, heatTransfer: 8, scaleUp: 9, avCost: 5,
    sealless: false, forHighVisc: false,
    impeller: "six_blade_rushton_disc_turbine_radial_flow",
    bestUse: "gas_liquid_dispersion_fermentation_reaction",
  },
  pitched_blade_axial: {
    mixingIntensity: 7, viscosityRange: 6, heatTransfer: 7, scaleUp: 8, avCost: 5,
    sealless: false, forHighVisc: false,
    impeller: "four_blade_pitched_45_degree_axial_flow",
    bestUse: "solids_suspension_blending_general_purpose",
  },
  helical_ribbon_visc: {
    mixingIntensity: 6, viscosityRange: 10, heatTransfer: 9, scaleUp: 6, avCost: 7,
    sealless: false, forHighVisc: true,
    impeller: "double_helical_ribbon_close_clearance_wall",
    bestUse: "polymer_adhesive_high_viscosity_bulk_mixing",
  },
  magnetic_drive_seal: {
    mixingIntensity: 5, viscosityRange: 5, heatTransfer: 6, scaleUp: 5, avCost: 9,
    sealless: true, forHighVisc: false,
    impeller: "magnetic_coupled_impeller_zero_leak_sealed",
    bestUse: "sterile_pharma_toxic_solvent_zero_leak_mixing",
  },
};

function get(t: AgitatedVesselType): AgitatedVesselData {
  return DATA[t];
}

export const mixingIntensity = (t: AgitatedVesselType) => get(t).mixingIntensity;
export const viscosityRange = (t: AgitatedVesselType) => get(t).viscosityRange;
export const heatTransfer = (t: AgitatedVesselType) => get(t).heatTransfer;
export const scaleUp = (t: AgitatedVesselType) => get(t).scaleUp;
export const avCost = (t: AgitatedVesselType) => get(t).avCost;
export const sealless = (t: AgitatedVesselType) => get(t).sealless;
export const forHighVisc = (t: AgitatedVesselType) => get(t).forHighVisc;
export const impeller = (t: AgitatedVesselType) => get(t).impeller;
export const bestUse = (t: AgitatedVesselType) => get(t).bestUse;
export const agitatedVesselTypes = (): AgitatedVesselType[] =>
  Object.keys(DATA) as AgitatedVesselType[];
