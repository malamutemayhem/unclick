export type RfFilterType =
  | "lc_lumped_element"
  | "cavity_resonator_tuned"
  | "saw_surface_acoustic"
  | "ceramic_dielectric_compact"
  | "microstrip_distributed_pcb";

const DATA: Record<RfFilterType, {
  selectivity: number; insertionLoss: number; powerHandling: number;
  size: number; rfCost: number; tunable: boolean;
  forBase: boolean; technology: string; bestUse: string;
}> = {
  lc_lumped_element: {
    selectivity: 5, insertionLoss: 6, powerHandling: 8,
    size: 4, rfCost: 1, tunable: true,
    forBase: false, technology: "inductor_capacitor_discrete",
    bestUse: "low_freq_rf_power_amplifier_match",
  },
  cavity_resonator_tuned: {
    selectivity: 10, insertionLoss: 9, powerHandling: 10,
    size: 2, rfCost: 4, tunable: true,
    forBase: true, technology: "metal_cavity_resonant_coupling",
    bestUse: "base_station_high_power_duplexer",
  },
  saw_surface_acoustic: {
    selectivity: 8, insertionLoss: 7, powerHandling: 3,
    size: 9, rfCost: 2, tunable: false,
    forBase: false, technology: "piezoelectric_surface_wave_idt",
    bestUse: "mobile_handset_if_rf_select",
  },
  ceramic_dielectric_compact: {
    selectivity: 7, insertionLoss: 7, powerHandling: 5,
    size: 8, rfCost: 2, tunable: false,
    forBase: true, technology: "ceramic_resonator_coaxial_mono",
    bestUse: "small_cell_gps_wifi_module",
  },
  microstrip_distributed_pcb: {
    selectivity: 6, insertionLoss: 5, powerHandling: 6,
    size: 7, rfCost: 1, tunable: false,
    forBase: false, technology: "pcb_trace_coupled_line_stub",
    bestUse: "pcb_integrated_prototype_wideband",
  },
};

const get = (t: RfFilterType) => DATA[t];

export const selectivity = (t: RfFilterType) => get(t).selectivity;
export const insertionLoss = (t: RfFilterType) => get(t).insertionLoss;
export const powerHandling = (t: RfFilterType) => get(t).powerHandling;
export const size = (t: RfFilterType) => get(t).size;
export const rfCost = (t: RfFilterType) => get(t).rfCost;
export const tunable = (t: RfFilterType) => get(t).tunable;
export const forBase = (t: RfFilterType) => get(t).forBase;
export const technology = (t: RfFilterType) => get(t).technology;
export const bestUse = (t: RfFilterType) => get(t).bestUse;
export const rfFilterTypes = (): RfFilterType[] => Object.keys(DATA) as RfFilterType[];
