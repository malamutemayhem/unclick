export type HeatExchanger =
  | "shell_and_tube_baffled"
  | "plate_frame_gasketed"
  | "finned_tube_crossflow"
  | "spiral_welded_compact"
  | "double_pipe_concentric";

const DATA: Record<HeatExchanger, {
  heatTransfer: number; pressure: number; compactness: number;
  foulingResist: number; heCost: number; cleanable: boolean;
  forCorrosive: boolean; flow: string; bestUse: string;
}> = {
  shell_and_tube_baffled: {
    heatTransfer: 7, pressure: 10, compactness: 3,
    foulingResist: 8, heCost: 3, cleanable: true,
    forCorrosive: true, flow: "multi_pass_baffle_guided",
    bestUse: "refinery_crude_preheat_train",
  },
  plate_frame_gasketed: {
    heatTransfer: 10, pressure: 6, compactness: 9,
    foulingResist: 5, heCost: 3, cleanable: true,
    forCorrosive: false, flow: "chevron_corrugated_counter",
    bestUse: "dairy_pasteurization_quick_clean",
  },
  finned_tube_crossflow: {
    heatTransfer: 6, pressure: 5, compactness: 5,
    foulingResist: 7, heCost: 2, cleanable: false,
    forCorrosive: false, flow: "air_cross_fin_tube_bank",
    bestUse: "hvac_air_handling_unit_coil",
  },
  spiral_welded_compact: {
    heatTransfer: 9, pressure: 8, compactness: 8,
    foulingResist: 9, heCost: 4, cleanable: false,
    forCorrosive: true, flow: "spiral_counter_single_channel",
    bestUse: "slurry_sludge_heat_recovery",
  },
  double_pipe_concentric: {
    heatTransfer: 5, pressure: 9, compactness: 2,
    foulingResist: 6, heCost: 1, cleanable: true,
    forCorrosive: true, flow: "annular_counter_current",
    bestUse: "pilot_plant_small_flow_test",
  },
};

const get = (t: HeatExchanger) => DATA[t];

export const heatTransfer = (t: HeatExchanger) => get(t).heatTransfer;
export const pressure = (t: HeatExchanger) => get(t).pressure;
export const compactness = (t: HeatExchanger) => get(t).compactness;
export const foulingResist = (t: HeatExchanger) => get(t).foulingResist;
export const heCost = (t: HeatExchanger) => get(t).heCost;
export const cleanable = (t: HeatExchanger) => get(t).cleanable;
export const forCorrosive = (t: HeatExchanger) => get(t).forCorrosive;
export const flow = (t: HeatExchanger) => get(t).flow;
export const bestUse = (t: HeatExchanger) => get(t).bestUse;
export const heatExchangers = (): HeatExchanger[] => Object.keys(DATA) as HeatExchanger[];
