export type DopingMethod =
  | "ion_implant_beam"
  | "plasma_immersion"
  | "solid_source_diffusion"
  | "gas_phase_diffusion"
  | "molecular_beam_delta";

const DATA: Record<DopingMethod, {
  precision: number; uniformity: number; depth: number;
  throughput: number; dopeCost: number; lowDamage: boolean;
  forAdvNode: boolean; mechanism: string; bestUse: string;
}> = {
  ion_implant_beam: {
    precision: 10, uniformity: 9, depth: 8,
    throughput: 7, dopeCost: 6, lowDamage: false,
    forAdvNode: true, mechanism: "accelerated_ion_beam_scan",
    bestUse: "cmos_source_drain_implant",
  },
  plasma_immersion: {
    precision: 7, uniformity: 8, depth: 6,
    throughput: 9, dopeCost: 4, lowDamage: false,
    forAdvNode: true, mechanism: "plasma_sheath_bias_pull",
    bestUse: "conformal_3d_finfet_dope",
  },
  solid_source_diffusion: {
    precision: 4, uniformity: 6, depth: 9,
    throughput: 8, dopeCost: 2, lowDamage: true,
    forAdvNode: false, mechanism: "spin_on_glass_drive_in",
    bestUse: "solar_cell_emitter",
  },
  gas_phase_diffusion: {
    precision: 5, uniformity: 7, depth: 7,
    throughput: 8, dopeCost: 3, lowDamage: true,
    forAdvNode: false, mechanism: "poci3_bbr3_furnace",
    bestUse: "power_device_deep_well",
  },
  molecular_beam_delta: {
    precision: 10, uniformity: 7, depth: 3,
    throughput: 3, dopeCost: 9, lowDamage: true,
    forAdvNode: true, mechanism: "mbe_monolayer_spike",
    bestUse: "quantum_well_sheet_dope",
  },
};

const get = (t: DopingMethod) => DATA[t];

export const precision = (t: DopingMethod) => get(t).precision;
export const uniformity = (t: DopingMethod) => get(t).uniformity;
export const depth = (t: DopingMethod) => get(t).depth;
export const throughput = (t: DopingMethod) => get(t).throughput;
export const dopeCost = (t: DopingMethod) => get(t).dopeCost;
export const lowDamage = (t: DopingMethod) => get(t).lowDamage;
export const forAdvNode = (t: DopingMethod) => get(t).forAdvNode;
export const mechanism = (t: DopingMethod) => get(t).mechanism;
export const bestUse = (t: DopingMethod) => get(t).bestUse;
export const dopingMethods = (): DopingMethod[] => Object.keys(DATA) as DopingMethod[];
