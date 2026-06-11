export type MedicalGasType =
  | "oxygen_bulk_liquid"
  | "medical_air_compressor"
  | "vacuum_rotary_pump"
  | "nitrous_oxide_manifold"
  | "nitrogen_generator_psa";

interface MedicalGasData {
  purity: number;
  reliability: number;
  capacity: number;
  safety: number;
  mgCost: number;
  redundant: boolean;
  forSurgical: boolean;
  supply: string;
  bestUse: string;
}

const DATA: Record<MedicalGasType, MedicalGasData> = {
  oxygen_bulk_liquid: {
    purity: 10, reliability: 9, capacity: 10, safety: 9, mgCost: 7,
    redundant: true, forSurgical: true,
    supply: "bulk_liquid_vaporizer_tank",
    bestUse: "large_hospital_campus_main",
  },
  medical_air_compressor: {
    purity: 8, reliability: 8, capacity: 7, safety: 8, mgCost: 6,
    redundant: true, forSurgical: true,
    supply: "oil_free_scroll_compressor_dryer",
    bestUse: "respiratory_therapy_ventilator",
  },
  vacuum_rotary_pump: {
    purity: 7, reliability: 9, capacity: 8, safety: 7, mgCost: 5,
    redundant: true, forSurgical: true,
    supply: "rotary_vane_pump_receiver_tank",
    bestUse: "surgical_suction_waste_anesthesia",
  },
  nitrous_oxide_manifold: {
    purity: 9, reliability: 7, capacity: 5, safety: 8, mgCost: 4,
    redundant: false, forSurgical: true,
    supply: "cylinder_manifold_auto_switchover",
    bestUse: "dental_office_labor_delivery",
  },
  nitrogen_generator_psa: {
    purity: 9, reliability: 8, capacity: 6, safety: 9, mgCost: 8,
    redundant: false, forSurgical: false,
    supply: "psa_generator_onsite_membrane",
    bestUse: "surgical_instrument_pneumatic_tool",
  },
};

function get(t: MedicalGasType): MedicalGasData {
  return DATA[t];
}

export const purity = (t: MedicalGasType) => get(t).purity;
export const reliability = (t: MedicalGasType) => get(t).reliability;
export const capacity = (t: MedicalGasType) => get(t).capacity;
export const safety = (t: MedicalGasType) => get(t).safety;
export const mgCost = (t: MedicalGasType) => get(t).mgCost;
export const redundant = (t: MedicalGasType) => get(t).redundant;
export const forSurgical = (t: MedicalGasType) => get(t).forSurgical;
export const supply = (t: MedicalGasType) => get(t).supply;
export const bestUse = (t: MedicalGasType) => get(t).bestUse;
export const medicalGasTypes = (): MedicalGasType[] =>
  Object.keys(DATA) as MedicalGasType[];
