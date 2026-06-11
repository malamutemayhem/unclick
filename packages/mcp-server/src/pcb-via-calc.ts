export type PcbVia =
  | "through_hole_standard"
  | "blind_laser_drill"
  | "buried_inner_layer"
  | "microvia_hdi"
  | "via_in_pad_filled";

const DATA: Record<PcbVia, {
  density: number; signalPerf: number; reliability: number;
  thermal: number; viaCost: number; filled: boolean;
  forBga: boolean; process: string; bestUse: string;
}> = {
  through_hole_standard: {
    density: 3, signalPerf: 5, reliability: 9,
    thermal: 8, viaCost: 1, filled: false,
    forBga: false, process: "mechanical_drill_plate",
    bestUse: "general_purpose_routing",
  },
  blind_laser_drill: {
    density: 8, signalPerf: 8, reliability: 7,
    thermal: 6, viaCost: 6, filled: true,
    forBga: true, process: "uv_laser_copper_fill",
    bestUse: "hdi_smartphone_board",
  },
  buried_inner_layer: {
    density: 7, signalPerf: 7, reliability: 8,
    thermal: 5, viaCost: 7, filled: false,
    forBga: false, process: "sub_lamination_drill",
    bestUse: "inner_signal_crossover",
  },
  microvia_hdi: {
    density: 10, signalPerf: 9, reliability: 6,
    thermal: 4, viaCost: 9, filled: true,
    forBga: true, process: "laser_ablation_sequential",
    bestUse: "fine_pitch_csp_escape",
  },
  via_in_pad_filled: {
    density: 9, signalPerf: 10, reliability: 8,
    thermal: 9, viaCost: 5, filled: true,
    forBga: true, process: "drill_plate_fill_planarize",
    bestUse: "bga_thermal_pad_connect",
  },
};

const get = (t: PcbVia) => DATA[t];

export const density = (t: PcbVia) => get(t).density;
export const signalPerf = (t: PcbVia) => get(t).signalPerf;
export const reliability = (t: PcbVia) => get(t).reliability;
export const thermal = (t: PcbVia) => get(t).thermal;
export const viaCost = (t: PcbVia) => get(t).viaCost;
export const filled = (t: PcbVia) => get(t).filled;
export const forBga = (t: PcbVia) => get(t).forBga;
export const process = (t: PcbVia) => get(t).process;
export const bestUse = (t: PcbVia) => get(t).bestUse;
export const pcbVias = (): PcbVia[] => Object.keys(DATA) as PcbVia[];
