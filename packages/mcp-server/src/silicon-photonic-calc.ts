export type SiliconPhotonic =
  | "ring_modulator"
  | "mzi_switch"
  | "grating_coupler"
  | "edge_coupler"
  | "awg_demux";

const DATA: Record<SiliconPhotonic, {
  bandwidth: number; insertionLoss: number; footprint: number;
  powerDraw: number; siPhCost: number; tunable: boolean;
  forDatacenter: boolean; mechanism: string; bestUse: string;
}> = {
  ring_modulator: {
    bandwidth: 8, insertionLoss: 7, footprint: 9,
    powerDraw: 7, siPhCost: 6, tunable: true,
    forDatacenter: true, mechanism: "carrier_depletion_ring",
    bestUse: "100g_per_lane_transceiver",
  },
  mzi_switch: {
    bandwidth: 9, insertionLoss: 6, footprint: 5,
    powerDraw: 5, siPhCost: 7, tunable: true,
    forDatacenter: true, mechanism: "thermo_optic_mach_zehnder",
    bestUse: "optical_crossbar_switch",
  },
  grating_coupler: {
    bandwidth: 6, insertionLoss: 5, footprint: 7,
    powerDraw: 9, siPhCost: 4, tunable: false,
    forDatacenter: true, mechanism: "periodic_etch_diffraction",
    bestUse: "wafer_level_test_io",
  },
  edge_coupler: {
    bandwidth: 9, insertionLoss: 8, footprint: 6,
    powerDraw: 9, siPhCost: 5, tunable: false,
    forDatacenter: true, mechanism: "inverse_taper_mode",
    bestUse: "low_loss_fiber_attach",
  },
  awg_demux: {
    bandwidth: 7, insertionLoss: 6, footprint: 4,
    powerDraw: 9, siPhCost: 8, tunable: false,
    forDatacenter: false, mechanism: "slab_waveguide_array",
    bestUse: "dwdm_channel_filter",
  },
};

const get = (t: SiliconPhotonic) => DATA[t];

export const bandwidth = (t: SiliconPhotonic) => get(t).bandwidth;
export const insertionLoss = (t: SiliconPhotonic) => get(t).insertionLoss;
export const footprint = (t: SiliconPhotonic) => get(t).footprint;
export const powerDraw = (t: SiliconPhotonic) => get(t).powerDraw;
export const siPhCost = (t: SiliconPhotonic) => get(t).siPhCost;
export const tunable = (t: SiliconPhotonic) => get(t).tunable;
export const forDatacenter = (t: SiliconPhotonic) => get(t).forDatacenter;
export const mechanism = (t: SiliconPhotonic) => get(t).mechanism;
export const bestUse = (t: SiliconPhotonic) => get(t).bestUse;
export const siliconPhotonics = (): SiliconPhotonic[] => Object.keys(DATA) as SiliconPhotonic[];
