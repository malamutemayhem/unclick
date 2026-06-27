export type BlisterPackerType =
  | "thermoform_fill"
  | "cold_form_alu"
  | "rotary_blister"
  | "flat_plate"
  | "strip_pack";

interface BlisterPackerData {
  sealQuality: number;
  throughput: number;
  moistureBarrier: number;
  flexibility: number;
  bpCost: number;
  childResistant: boolean;
  forMoisture: boolean;
  packerConfig: string;
  bestUse: string;
}

const DATA: Record<BlisterPackerType, BlisterPackerData> = {
  thermoform_fill: {
    sealQuality: 8, throughput: 9, moistureBarrier: 7, flexibility: 9, bpCost: 7,
    childResistant: false, forMoisture: false,
    packerConfig: "thermoform_fill_blister_heat_form_cavity_fill_seal_foil_lid",
    bestUse: "pharma_otc_thermoform_blister_pack_tablet_capsule_high_speed",
  },
  cold_form_alu: {
    sealQuality: 10, throughput: 7, moistureBarrier: 10, flexibility: 6, bpCost: 9,
    childResistant: false, forMoisture: true,
    packerConfig: "cold_form_alu_blister_press_aluminum_cavity_seal_foil_barrier",
    bestUse: "pharma_sensitive_cold_form_alu_alu_blister_moisture_oxygen_barrier",
  },
  rotary_blister: {
    sealQuality: 9, throughput: 10, moistureBarrier: 7, flexibility: 8, bpCost: 8,
    childResistant: false, forMoisture: false,
    packerConfig: "rotary_blister_packer_continuous_drum_form_fill_seal_high_output",
    bestUse: "mass_pharma_rotary_blister_packer_continuous_high_volume_otc",
  },
  flat_plate: {
    sealQuality: 8, throughput: 6, moistureBarrier: 7, flexibility: 10, bpCost: 5,
    childResistant: false, forMoisture: false,
    packerConfig: "flat_plate_blister_packer_intermittent_plate_form_fill_seal",
    bestUse: "small_pharma_flat_plate_blister_packer_flexible_changeover",
  },
  strip_pack: {
    sealQuality: 9, throughput: 8, moistureBarrier: 9, flexibility: 7, bpCost: 6,
    childResistant: true, forMoisture: true,
    packerConfig: "strip_pack_machine_foil_foil_heat_seal_unit_dose_tamper",
    bestUse: "unit_dose_strip_pack_machine_hospital_tamper_evident_cr_foil",
  },
};

function get(t: BlisterPackerType): BlisterPackerData {
  return DATA[t];
}

export const sealQuality = (t: BlisterPackerType) => get(t).sealQuality;
export const throughput = (t: BlisterPackerType) => get(t).throughput;
export const moistureBarrier = (t: BlisterPackerType) => get(t).moistureBarrier;
export const flexibility = (t: BlisterPackerType) => get(t).flexibility;
export const bpCost = (t: BlisterPackerType) => get(t).bpCost;
export const childResistant = (t: BlisterPackerType) => get(t).childResistant;
export const forMoisture = (t: BlisterPackerType) => get(t).forMoisture;
export const packerConfig = (t: BlisterPackerType) => get(t).packerConfig;
export const bestUse = (t: BlisterPackerType) => get(t).bestUse;
export const blisterPackerTypes = (): BlisterPackerType[] =>
  Object.keys(DATA) as BlisterPackerType[];
