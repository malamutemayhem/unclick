export type EtchType =
  | "wet_isotropic_acid"
  | "rie_reactive_ion"
  | "drie_bosch_process"
  | "ibe_ion_beam"
  | "ale_atomic_layer";

const DATA: Record<EtchType, {
  anisotropy: number; selectivity: number; uniformity: number;
  damageLevel: number; etCost: number; isotropic: boolean;
  forMems: boolean; chemistry: string; bestUse: string;
}> = {
  wet_isotropic_acid: {
    anisotropy: 2, selectivity: 9, uniformity: 6,
    damageLevel: 10, etCost: 1, isotropic: true,
    forMems: true, chemistry: "hf_buffered_oxide_strip",
    bestUse: "sacrificial_layer_release",
  },
  rie_reactive_ion: {
    anisotropy: 8, selectivity: 7, uniformity: 8,
    damageLevel: 5, etCost: 4, isotropic: false,
    forMems: false, chemistry: "cf4_o2_fluorine_plasma",
    bestUse: "dielectric_contact_via_open",
  },
  drie_bosch_process: {
    anisotropy: 10, selectivity: 6, uniformity: 7,
    damageLevel: 4, etCost: 6, isotropic: false,
    forMems: true, chemistry: "sf6_c4f8_cyclic_passivate",
    bestUse: "silicon_deep_trench_tsv",
  },
  ibe_ion_beam: {
    anisotropy: 9, selectivity: 3, uniformity: 9,
    damageLevel: 3, etCost: 8, isotropic: false,
    forMems: false, chemistry: "argon_physical_sputter",
    bestUse: "magnetic_tunnel_junction_mtj",
  },
  ale_atomic_layer: {
    anisotropy: 7, selectivity: 10, uniformity: 10,
    damageLevel: 9, etCost: 10, isotropic: false,
    forMems: false, chemistry: "self_limiting_halogen_cycle",
    bestUse: "sub_5nm_gate_spacer_recess",
  },
};

const get = (t: EtchType) => DATA[t];

export const anisotropy = (t: EtchType) => get(t).anisotropy;
export const selectivity = (t: EtchType) => get(t).selectivity;
export const uniformity = (t: EtchType) => get(t).uniformity;
export const damageLevel = (t: EtchType) => get(t).damageLevel;
export const etCost = (t: EtchType) => get(t).etCost;
export const isotropic = (t: EtchType) => get(t).isotropic;
export const forMems = (t: EtchType) => get(t).forMems;
export const chemistry = (t: EtchType) => get(t).chemistry;
export const bestUse = (t: EtchType) => get(t).bestUse;
export const etchTypes = (): EtchType[] => Object.keys(DATA) as EtchType[];
