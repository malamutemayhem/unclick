export type CapsuleFillerType =
  | "manual_hand"
  | "semi_automatic"
  | "automatic_tamping"
  | "dosator_nozzle"
  | "liquid_fill";

interface CapsuleFillerData {
  fillAccuracy: number;
  throughput: number;
  capsuleRange: number;
  dustControl: number;
  cfCost: number;
  automated: boolean;
  forPowder: boolean;
  fillerConfig: string;
  bestUse: string;
}

const DATA: Record<CapsuleFillerType, CapsuleFillerData> = {
  manual_hand: {
    fillAccuracy: 5, throughput: 2, capsuleRange: 8, dustControl: 3, cfCost: 2,
    automated: false, forPowder: true,
    fillerConfig: "manual_hand_capsule_filler_tray_spread_tamp_close_small_batch",
    bestUse: "compounding_pharmacy_manual_capsule_filler_custom_small_batch",
  },
  semi_automatic: {
    fillAccuracy: 7, throughput: 5, capsuleRange: 8, dustControl: 6, cfCost: 5,
    automated: false, forPowder: true,
    fillerConfig: "semi_automatic_capsule_filler_hopper_feed_tamp_eject_operator",
    bestUse: "small_pharma_semi_auto_capsule_filler_moderate_batch_flexible",
  },
  automatic_tamping: {
    fillAccuracy: 9, throughput: 9, capsuleRange: 9, dustControl: 9, cfCost: 9,
    automated: true, forPowder: true,
    fillerConfig: "automatic_tamping_capsule_filler_multi_station_tamp_dose_close",
    bestUse: "pharma_factory_automatic_tamping_capsule_filler_high_speed_gmp",
  },
  dosator_nozzle: {
    fillAccuracy: 10, throughput: 10, capsuleRange: 8, dustControl: 9, cfCost: 10,
    automated: true, forPowder: true,
    fillerConfig: "dosator_nozzle_capsule_filler_plug_form_transfer_eject_precise",
    bestUse: "large_pharma_dosator_capsule_filler_precise_dose_high_output",
  },
  liquid_fill: {
    fillAccuracy: 9, throughput: 7, capsuleRange: 6, dustControl: 10, cfCost: 8,
    automated: true, forPowder: false,
    fillerConfig: "liquid_fill_capsule_filler_pump_dose_seal_band_gelatin_liquid",
    bestUse: "nutraceutical_liquid_capsule_filler_oil_suspension_sealed_dose",
  },
};

function get(t: CapsuleFillerType): CapsuleFillerData {
  return DATA[t];
}

export const fillAccuracy = (t: CapsuleFillerType) => get(t).fillAccuracy;
export const throughput = (t: CapsuleFillerType) => get(t).throughput;
export const capsuleRange = (t: CapsuleFillerType) => get(t).capsuleRange;
export const dustControl = (t: CapsuleFillerType) => get(t).dustControl;
export const cfCost = (t: CapsuleFillerType) => get(t).cfCost;
export const automated = (t: CapsuleFillerType) => get(t).automated;
export const forPowder = (t: CapsuleFillerType) => get(t).forPowder;
export const fillerConfig = (t: CapsuleFillerType) => get(t).fillerConfig;
export const bestUse = (t: CapsuleFillerType) => get(t).bestUse;
export const capsuleFillerTypes = (): CapsuleFillerType[] =>
  Object.keys(DATA) as CapsuleFillerType[];
