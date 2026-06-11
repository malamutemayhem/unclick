export type PressureTransducerType =
  | "piezoresistive_pt"
  | "capacitive_pt"
  | "thin_film_pt"
  | "resonant_wire_pt"
  | "optical_fiber_pt";

interface PressureTransducerData {
  accuracy: number;
  throughput: number;
  pressureRange: number;
  stability: number;
  ptCost: number;
  digitalProtocol: boolean;
  forCorrosive: boolean;
  transducerConfig: string;
  bestUse: string;
}

const DATA: Record<PressureTransducerType, PressureTransducerData> = {
  piezoresistive_pt: {
    accuracy: 8, throughput: 9, pressureRange: 8, stability: 7, ptCost: 5,
    digitalProtocol: true, forCorrosive: false,
    transducerConfig: "piezoresistive_transducer_silicon_diaphragm_wheatstone_mv_out",
    bestUse: "general_process_piezoresistive_transducer_versatile_fast_response",
  },
  capacitive_pt: {
    accuracy: 9, throughput: 8, pressureRange: 7, stability: 9, ptCost: 7,
    digitalProtocol: true, forCorrosive: true,
    transducerConfig: "capacitive_transducer_ceramic_diaphragm_gap_change_stable_drift",
    bestUse: "sanitary_process_capacitive_transducer_ceramic_no_oil_fill_clean",
  },
  thin_film_pt: {
    accuracy: 8, throughput: 9, pressureRange: 9, stability: 8, ptCost: 6,
    digitalProtocol: true, forCorrosive: true,
    transducerConfig: "thin_film_transducer_sputter_metal_diaphragm_weld_seal_robust",
    bestUse: "hydraulic_system_thin_film_transducer_all_metal_no_oil_fill_robust",
  },
  resonant_wire_pt: {
    accuracy: 10, throughput: 6, pressureRange: 5, stability: 10, ptCost: 9,
    digitalProtocol: true, forCorrosive: false,
    transducerConfig: "resonant_wire_transducer_vibrating_element_frequency_output_precise",
    bestUse: "custody_transfer_resonant_wire_transducer_ultra_stable_reference",
  },
  optical_fiber_pt: {
    accuracy: 9, throughput: 7, pressureRange: 6, stability: 9, ptCost: 10,
    digitalProtocol: true, forCorrosive: true,
    transducerConfig: "optical_fiber_transducer_bragg_grating_wavelength_shift_immune_emi",
    bestUse: "downhole_optical_fiber_transducer_emi_immune_high_temp_remote",
  },
};

function get(t: PressureTransducerType): PressureTransducerData {
  return DATA[t];
}

export const accuracy = (t: PressureTransducerType) => get(t).accuracy;
export const throughput = (t: PressureTransducerType) => get(t).throughput;
export const pressureRange = (t: PressureTransducerType) => get(t).pressureRange;
export const stability = (t: PressureTransducerType) => get(t).stability;
export const ptCost = (t: PressureTransducerType) => get(t).ptCost;
export const digitalProtocol = (t: PressureTransducerType) => get(t).digitalProtocol;
export const forCorrosive = (t: PressureTransducerType) => get(t).forCorrosive;
export const transducerConfig = (t: PressureTransducerType) => get(t).transducerConfig;
export const bestUse = (t: PressureTransducerType) => get(t).bestUse;
export const pressureTransducerTypes = (): PressureTransducerType[] =>
  Object.keys(DATA) as PressureTransducerType[];
