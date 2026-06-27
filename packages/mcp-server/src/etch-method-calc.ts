export type EtchMethod =
  | "wet_chemical"
  | "rie_reactive_ion"
  | "drie_bosch"
  | "icp_high_density"
  | "ald_atomic_layer";

const DATA: Record<EtchMethod, {
  anisotropy: number; selectivity: number; uniformity: number;
  damage: number; etchCost: number; isotropic: boolean;
  forMems: boolean; mechanism: string; bestUse: string;
}> = {
  wet_chemical: {
    anisotropy: 2, selectivity: 9, uniformity: 6,
    damage: 10, etchCost: 1, isotropic: true,
    forMems: true, mechanism: "chemical_dissolution",
    bestUse: "koh_si_v_groove",
  },
  rie_reactive_ion: {
    anisotropy: 7, selectivity: 6, uniformity: 7,
    damage: 5, etchCost: 4, isotropic: false,
    forMems: false, mechanism: "ion_radical_bombard",
    bestUse: "gate_poly_etch",
  },
  drie_bosch: {
    anisotropy: 10, selectivity: 7, uniformity: 6,
    damage: 4, etchCost: 6, isotropic: false,
    forMems: true, mechanism: "passivate_etch_cycle",
    bestUse: "tsv_deep_via",
  },
  icp_high_density: {
    anisotropy: 9, selectivity: 8, uniformity: 9,
    damage: 3, etchCost: 7, isotropic: false,
    forMems: false, mechanism: "inductively_coupled_plasma",
    bestUse: "finfet_recess_etch",
  },
  ald_atomic_layer: {
    anisotropy: 8, selectivity: 10, uniformity: 10,
    damage: 8, etchCost: 9, isotropic: false,
    forMems: false, mechanism: "self_limiting_monolayer",
    bestUse: "gaa_inner_spacer",
  },
};

const get = (t: EtchMethod) => DATA[t];

export const anisotropy = (t: EtchMethod) => get(t).anisotropy;
export const selectivity = (t: EtchMethod) => get(t).selectivity;
export const uniformity = (t: EtchMethod) => get(t).uniformity;
export const damage = (t: EtchMethod) => get(t).damage;
export const etchCost = (t: EtchMethod) => get(t).etchCost;
export const isotropic = (t: EtchMethod) => get(t).isotropic;
export const forMems = (t: EtchMethod) => get(t).forMems;
export const mechanism = (t: EtchMethod) => get(t).mechanism;
export const bestUse = (t: EtchMethod) => get(t).bestUse;
export const etchMethods = (): EtchMethod[] => Object.keys(DATA) as EtchMethod[];
