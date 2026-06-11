export type BlisterSealerType =
  | "thermoform_seal"
  | "cold_form_seal"
  | "clamshell_seal"
  | "skin_pack_seal"
  | "rotary_blister";

interface BlisterSealerData {
  sealIntegrity: number;
  throughput: number;
  cavityDepth: number;
  materialRange: number;
  bsCost: number;
  childResist: boolean;
  forPharma: boolean;
  sealerConfig: string;
  bestUse: string;
}

const DATA: Record<BlisterSealerType, BlisterSealerData> = {
  thermoform_seal: {
    sealIntegrity: 8, throughput: 8, cavityDepth: 7, materialRange: 7, bsCost: 7,
    childResist: false, forPharma: true,
    sealerConfig: "thermoform_blister_sealer_heat_form_cavity_fill_lid_seal_punch",
    bestUse: "tablet_pack_thermoform_blister_sealer_pvc_foil_cavity_push_pop",
  },
  cold_form_seal: {
    sealIntegrity: 9, throughput: 6, cavityDepth: 5, materialRange: 4, bsCost: 8,
    childResist: false, forPharma: true,
    sealerConfig: "cold_form_blister_sealer_alu_alu_stamp_form_moisture_barrier",
    bestUse: "moisture_sensitive_cold_form_blister_sealer_alu_alu_full_barrier",
  },
  clamshell_seal: {
    sealIntegrity: 7, throughput: 7, cavityDepth: 8, materialRange: 8, bsCost: 5,
    childResist: true, forPharma: false,
    sealerConfig: "clamshell_blister_sealer_preform_shell_rf_seal_hang_card_retail",
    bestUse: "retail_hardware_clamshell_blister_sealer_hang_card_tamper_resist",
  },
  skin_pack_seal: {
    sealIntegrity: 8, throughput: 6, cavityDepth: 9, materialRange: 6, bsCost: 6,
    childResist: false, forPharma: false,
    sealerConfig: "skin_pack_blister_sealer_vacuum_draw_film_conform_product_shape",
    bestUse: "tool_display_skin_pack_blister_sealer_vacuum_draw_conform_shape",
  },
  rotary_blister: {
    sealIntegrity: 8, throughput: 9, cavityDepth: 6, materialRange: 6, bsCost: 9,
    childResist: false, forPharma: true,
    sealerConfig: "rotary_blister_sealer_drum_form_fill_seal_continuous_high_speed",
    bestUse: "high_volume_rotary_blister_sealer_continuous_drum_pharma_output",
  },
};

function get(t: BlisterSealerType): BlisterSealerData {
  return DATA[t];
}

export const sealIntegrity = (t: BlisterSealerType) => get(t).sealIntegrity;
export const throughput = (t: BlisterSealerType) => get(t).throughput;
export const cavityDepth = (t: BlisterSealerType) => get(t).cavityDepth;
export const materialRange = (t: BlisterSealerType) => get(t).materialRange;
export const bsCost = (t: BlisterSealerType) => get(t).bsCost;
export const childResist = (t: BlisterSealerType) => get(t).childResist;
export const forPharma = (t: BlisterSealerType) => get(t).forPharma;
export const sealerConfig = (t: BlisterSealerType) => get(t).sealerConfig;
export const bestUse = (t: BlisterSealerType) => get(t).bestUse;
export const blisterSealerTypes = (): BlisterSealerType[] =>
  Object.keys(DATA) as BlisterSealerType[];
