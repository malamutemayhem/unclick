export type BiosafetyCabinetType =
  | "class_i_open_front"
  | "class_ii_a2_recirculate"
  | "class_ii_b2_total_exhaust"
  | "class_iii_glove_box"
  | "laminar_flow_clean_bench";

interface BiosafetyCabinetData {
  protection: number;
  containment: number;
  ergonomics: number;
  energy: number;
  bscCost: number;
  productProtect: boolean;
  forBsl3: boolean;
  airflow: string;
  bestUse: string;
}

const DATA: Record<BiosafetyCabinetType, BiosafetyCabinetData> = {
  class_i_open_front: {
    protection: 5, containment: 6, ergonomics: 7, energy: 6, bscCost: 3,
    productProtect: false, forBsl3: false,
    airflow: "inward_face_velocity_exhaust",
    bestUse: "low_risk_agent_ppe_supplement",
  },
  class_ii_a2_recirculate: {
    protection: 8, containment: 8, ergonomics: 8, energy: 7, bscCost: 6,
    productProtect: true, forBsl3: false,
    airflow: "70pct_recirc_30pct_exhaust",
    bestUse: "microbiology_cell_culture_lab",
  },
  class_ii_b2_total_exhaust: {
    protection: 9, containment: 10, ergonomics: 7, energy: 3, bscCost: 9,
    productProtect: true, forBsl3: true,
    airflow: "100pct_exhaust_no_recirc",
    bestUse: "volatile_toxic_chemical_bio",
  },
  class_iii_glove_box: {
    protection: 10, containment: 10, ergonomics: 4, energy: 4, bscCost: 10,
    productProtect: true, forBsl3: true,
    airflow: "sealed_glove_port_hepa_both",
    bestUse: "bsl4_maximum_containment",
  },
  laminar_flow_clean_bench: {
    protection: 2, containment: 1, ergonomics: 9, energy: 8, bscCost: 2,
    productProtect: true, forBsl3: false,
    airflow: "horizontal_laminar_hepa_flow",
    bestUse: "sterile_prep_non_hazardous",
  },
};

function get(t: BiosafetyCabinetType): BiosafetyCabinetData {
  return DATA[t];
}

export const protection = (t: BiosafetyCabinetType) => get(t).protection;
export const containment = (t: BiosafetyCabinetType) => get(t).containment;
export const ergonomics = (t: BiosafetyCabinetType) => get(t).ergonomics;
export const energy = (t: BiosafetyCabinetType) => get(t).energy;
export const bscCost = (t: BiosafetyCabinetType) => get(t).bscCost;
export const productProtect = (t: BiosafetyCabinetType) => get(t).productProtect;
export const forBsl3 = (t: BiosafetyCabinetType) => get(t).forBsl3;
export const airflow = (t: BiosafetyCabinetType) => get(t).airflow;
export const bestUse = (t: BiosafetyCabinetType) => get(t).bestUse;
export const biosafetyCabinetTypes = (): BiosafetyCabinetType[] =>
  Object.keys(DATA) as BiosafetyCabinetType[];
