export type WaveguideType =
  | "strip_silicon"
  | "rib_soi"
  | "slot_enhanced"
  | "photonic_crystal"
  | "plasmonic_metal";

const DATA: Record<WaveguideType, {
  confinement: number; propagationLoss: number; bandwidth: number;
  footprint: number; wgCost: number; cmosFab: boolean;
  forSensor: boolean; platform: string; bestUse: string;
}> = {
  strip_silicon: {
    confinement: 9, propagationLoss: 6, bandwidth: 8,
    footprint: 9, wgCost: 3, cmosFab: true,
    forSensor: false, platform: "220nm_soi",
    bestUse: "photonic_interconnect",
  },
  rib_soi: {
    confinement: 7, propagationLoss: 8, bandwidth: 7,
    footprint: 6, wgCost: 4, cmosFab: true,
    forSensor: false, platform: "thick_soi_partial_etch",
    bestUse: "high_power_modulator",
  },
  slot_enhanced: {
    confinement: 10, propagationLoss: 5, bandwidth: 6,
    footprint: 8, wgCost: 6, cmosFab: true,
    forSensor: true, platform: "nano_slot_oxide_fill",
    bestUse: "evanescent_biosensor",
  },
  photonic_crystal: {
    confinement: 10, propagationLoss: 4, bandwidth: 5,
    footprint: 10, wgCost: 7, cmosFab: false,
    forSensor: true, platform: "periodic_hole_slab",
    bestUse: "slow_light_delay_line",
  },
  plasmonic_metal: {
    confinement: 10, propagationLoss: 2, bandwidth: 10,
    footprint: 10, wgCost: 8, cmosFab: false,
    forSensor: true, platform: "gold_stripe_dielectric",
    bestUse: "nanoscale_light_guide",
  },
};

const get = (t: WaveguideType) => DATA[t];

export const confinement = (t: WaveguideType) => get(t).confinement;
export const propagationLoss = (t: WaveguideType) => get(t).propagationLoss;
export const bandwidth = (t: WaveguideType) => get(t).bandwidth;
export const footprint = (t: WaveguideType) => get(t).footprint;
export const wgCost = (t: WaveguideType) => get(t).wgCost;
export const cmosFab = (t: WaveguideType) => get(t).cmosFab;
export const forSensor = (t: WaveguideType) => get(t).forSensor;
export const platform = (t: WaveguideType) => get(t).platform;
export const bestUse = (t: WaveguideType) => get(t).bestUse;
export const waveguideTypes = (): WaveguideType[] => Object.keys(DATA) as WaveguideType[];
