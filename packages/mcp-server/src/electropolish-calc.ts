export type ElectropolishType =
  | "rack_immersion_batch"
  | "flow_cell_tube_pipe"
  | "drum_tumble_small_part"
  | "spot_weld_localized"
  | "dry_electropolish_zero_waste";

interface ElectropolishData {
  smoothness: number;
  speed: number;
  uniformity: number;
  passivation: number;
  epCost: number;
  noAcid: boolean;
  forImplant: boolean;
  electrolyte: string;
  bestUse: string;
}

const DATA: Record<ElectropolishType, ElectropolishData> = {
  rack_immersion_batch: {
    smoothness: 9, speed: 7, uniformity: 8, passivation: 9, epCost: 6,
    noAcid: false, forImplant: true,
    electrolyte: "phosphoric_sulfuric_acid_mix",
    bestUse: "stainless_pharma_vessel_fitting",
  },
  flow_cell_tube_pipe: {
    smoothness: 9, speed: 8, uniformity: 10, passivation: 9, epCost: 7,
    noAcid: false, forImplant: false,
    electrolyte: "recirculating_acid_flow_loop",
    bestUse: "sanitary_tube_bpe_bioprocess",
  },
  drum_tumble_small_part: {
    smoothness: 7, speed: 9, uniformity: 7, passivation: 7, epCost: 4,
    noAcid: false, forImplant: false,
    electrolyte: "mild_acid_barrel_contact",
    bestUse: "fastener_spring_small_batch_lot",
  },
  spot_weld_localized: {
    smoothness: 8, speed: 10, uniformity: 5, passivation: 8, epCost: 5,
    noAcid: false, forImplant: false,
    electrolyte: "gel_paste_pad_localized_acid",
    bestUse: "weld_discolor_heat_tint_removal",
  },
  dry_electropolish_zero_waste: {
    smoothness: 8, speed: 5, uniformity: 8, passivation: 10, epCost: 9,
    noAcid: true, forImplant: true,
    electrolyte: "solid_body_particle_ion_exchange",
    bestUse: "medical_implant_additive_mfg_part",
  },
};

function get(t: ElectropolishType): ElectropolishData {
  return DATA[t];
}

export const smoothness = (t: ElectropolishType) => get(t).smoothness;
export const speed = (t: ElectropolishType) => get(t).speed;
export const uniformity = (t: ElectropolishType) => get(t).uniformity;
export const passivation = (t: ElectropolishType) => get(t).passivation;
export const epCost = (t: ElectropolishType) => get(t).epCost;
export const noAcid = (t: ElectropolishType) => get(t).noAcid;
export const forImplant = (t: ElectropolishType) => get(t).forImplant;
export const electrolyte = (t: ElectropolishType) => get(t).electrolyte;
export const bestUse = (t: ElectropolishType) => get(t).bestUse;
export const electropolishTypes = (): ElectropolishType[] =>
  Object.keys(DATA) as ElectropolishType[];
