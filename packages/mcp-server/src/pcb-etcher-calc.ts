export type PcbEtcherType =
  | "spray_etcher"
  | "bubble_etcher"
  | "paddle_etcher"
  | "conveyorized_etcher"
  | "plasma_etcher";

interface PcbEtcherData {
  etchUniformity: number;
  throughput: number;
  lineResolution: number;
  chemicalEfficiency: number;
  peCost_: number;
  automated: boolean;
  forFineTrace: boolean;
  etcherConfig: string;
  bestUse: string;
}

const DATA: Record<PcbEtcherType, PcbEtcherData> = {
  spray_etcher: {
    etchUniformity: 9, throughput: 8, lineResolution: 8, chemicalEfficiency: 8, peCost_: 7,
    automated: true, forFineTrace: false,
    etcherConfig: "spray_pcb_etcher_nozzle_oscillate_etchant_spray_uniform_remove",
    bestUse: "pcb_factory_spray_etcher_uniform_etch_standard_board_production",
  },
  bubble_etcher: {
    etchUniformity: 6, throughput: 4, lineResolution: 6, chemicalEfficiency: 5, peCost_: 3,
    automated: false, forFineTrace: false,
    etcherConfig: "bubble_pcb_etcher_tank_air_agitate_simple_immerse_etch_batch",
    bestUse: "hobby_prototype_bubble_etcher_simple_tank_small_batch_diy",
  },
  paddle_etcher: {
    etchUniformity: 7, throughput: 5, lineResolution: 7, chemicalEfficiency: 6, peCost_: 4,
    automated: false, forFineTrace: false,
    etcherConfig: "paddle_pcb_etcher_tray_rock_agitate_etchant_flow_manual_batch",
    bestUse: "small_shop_paddle_etcher_manual_agitation_moderate_batch_pcb",
  },
  conveyorized_etcher: {
    etchUniformity: 10, throughput: 10, lineResolution: 9, chemicalEfficiency: 9, peCost_: 9,
    automated: true, forFineTrace: true,
    etcherConfig: "conveyorized_pcb_etcher_inline_spray_conveyor_continuous_etch",
    bestUse: "high_volume_pcb_conveyorized_etcher_inline_continuous_etch",
  },
  plasma_etcher: {
    etchUniformity: 10, throughput: 5, lineResolution: 10, chemicalEfficiency: 10, peCost_: 10,
    automated: true, forFineTrace: true,
    etcherConfig: "plasma_pcb_etcher_dry_etch_reactive_ion_fine_feature_clean",
    bestUse: "advanced_pcb_plasma_etcher_dry_etch_fine_line_hdi_microvia",
  },
};

function get(t: PcbEtcherType): PcbEtcherData {
  return DATA[t];
}

export const etchUniformity = (t: PcbEtcherType) => get(t).etchUniformity;
export const throughput = (t: PcbEtcherType) => get(t).throughput;
export const lineResolution = (t: PcbEtcherType) => get(t).lineResolution;
export const chemicalEfficiency = (t: PcbEtcherType) => get(t).chemicalEfficiency;
export const peCost_ = (t: PcbEtcherType) => get(t).peCost_;
export const automated = (t: PcbEtcherType) => get(t).automated;
export const forFineTrace = (t: PcbEtcherType) => get(t).forFineTrace;
export const etcherConfig = (t: PcbEtcherType) => get(t).etcherConfig;
export const bestUse = (t: PcbEtcherType) => get(t).bestUse;
export const pcbEtcherTypes = (): PcbEtcherType[] =>
  Object.keys(DATA) as PcbEtcherType[];
