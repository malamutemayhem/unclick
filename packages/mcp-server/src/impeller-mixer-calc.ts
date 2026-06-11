export type ImpellerMixerType =
  | "rushton_turbine_radial"
  | "pitched_blade_axial"
  | "hydrofoil_high_eff"
  | "marine_propeller_low"
  | "anchor_gate_viscous";

interface ImpellerMixerData {
  mixIntensity: number;
  pumping: number;
  shear: number;
  powerNumber: number;
  imCost: number;
  axialFlow: boolean;
  forViscous: boolean;
  blade: string;
  bestUse: string;
}

const DATA: Record<ImpellerMixerType, ImpellerMixerData> = {
  rushton_turbine_radial: {
    mixIntensity: 9, pumping: 6, shear: 10, powerNumber: 9, imCost: 5,
    axialFlow: false, forViscous: false,
    blade: "flat_blade_disc_turbine_radial_discharge",
    bestUse: "gas_dispersion_emulsification_fermentation",
  },
  pitched_blade_axial: {
    mixIntensity: 8, pumping: 8, shear: 7, powerNumber: 7, imCost: 5,
    axialFlow: true, forViscous: false,
    blade: "pitched_45_degree_blade_mixed_flow_pattern",
    bestUse: "solid_suspension_blending_general_purpose",
  },
  hydrofoil_high_eff: {
    mixIntensity: 7, pumping: 10, shear: 4, powerNumber: 4, imCost: 7,
    axialFlow: true, forViscous: false,
    blade: "profiled_hydrofoil_blade_low_power_high_flow",
    bestUse: "large_tank_blending_heat_transfer_low_shear",
  },
  marine_propeller_low: {
    mixIntensity: 6, pumping: 9, shear: 3, powerNumber: 3, imCost: 4,
    axialFlow: true, forViscous: false,
    blade: "three_blade_marine_propeller_high_speed_low",
    bestUse: "low_viscosity_blending_tank_circulation",
  },
  anchor_gate_viscous: {
    mixIntensity: 5, pumping: 4, shear: 5, powerNumber: 6, imCost: 6,
    axialFlow: false, forViscous: true,
    blade: "close_clearance_anchor_wall_scrape_viscous",
    bestUse: "high_viscosity_paste_polymer_wall_heat_xfer",
  },
};

function get(t: ImpellerMixerType): ImpellerMixerData {
  return DATA[t];
}

export const mixIntensity = (t: ImpellerMixerType) => get(t).mixIntensity;
export const pumping = (t: ImpellerMixerType) => get(t).pumping;
export const shear = (t: ImpellerMixerType) => get(t).shear;
export const powerNumber = (t: ImpellerMixerType) => get(t).powerNumber;
export const imCost = (t: ImpellerMixerType) => get(t).imCost;
export const axialFlow = (t: ImpellerMixerType) => get(t).axialFlow;
export const forViscous = (t: ImpellerMixerType) => get(t).forViscous;
export const blade = (t: ImpellerMixerType) => get(t).blade;
export const bestUse = (t: ImpellerMixerType) => get(t).bestUse;
export const impellerMixerTypes = (): ImpellerMixerType[] =>
  Object.keys(DATA) as ImpellerMixerType[];
