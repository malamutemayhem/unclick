export type CoaxCableType =
  | "rg6_75ohm_catv"
  | "rg58_50ohm_thin"
  | "rg213_50ohm_thick"
  | "lmr400_low_loss"
  | "semi_rigid_copper_tube";

interface CoaxData {
  bandwidth: number;
  loss: number;
  power: number;
  flexibility: number;
  cxCost: number;
  lowLoss: boolean;
  forRf: boolean;
  shield: string;
  bestUse: string;
}

const DATA: Record<CoaxCableType, CoaxData> = {
  rg6_75ohm_catv: {
    bandwidth: 7, loss: 6, power: 5, flexibility: 8, cxCost: 3,
    lowLoss: false, forRf: false,
    shield: "foil_braid_75ohm_quad",
    bestUse: "cable_tv_satellite_video_cctv",
  },
  rg58_50ohm_thin: {
    bandwidth: 5, loss: 4, power: 4, flexibility: 9, cxCost: 2,
    lowLoss: false, forRf: true,
    shield: "single_braid_50ohm_bnc",
    bestUse: "lab_patch_test_equipment_short",
  },
  rg213_50ohm_thick: {
    bandwidth: 7, loss: 7, power: 7, flexibility: 5, cxCost: 5,
    lowLoss: false, forRf: true,
    shield: "double_braid_50ohm_n_type",
    bestUse: "hf_radio_medium_run_amateur",
  },
  lmr400_low_loss: {
    bandwidth: 9, loss: 9, power: 8, flexibility: 6, cxCost: 7,
    lowLoss: true, forRf: true,
    shield: "foil_braid_low_loss_50ohm",
    bestUse: "antenna_feed_long_run_base_station",
  },
  semi_rigid_copper_tube: {
    bandwidth: 10, loss: 10, power: 9, flexibility: 2, cxCost: 9,
    lowLoss: true, forRf: true,
    shield: "solid_copper_outer_conductor",
    bestUse: "microwave_precision_lab_fixed",
  },
};

function get(t: CoaxCableType): CoaxData {
  return DATA[t];
}

export const bandwidth = (t: CoaxCableType) => get(t).bandwidth;
export const loss = (t: CoaxCableType) => get(t).loss;
export const power = (t: CoaxCableType) => get(t).power;
export const flexibility = (t: CoaxCableType) => get(t).flexibility;
export const cxCost = (t: CoaxCableType) => get(t).cxCost;
export const lowLoss = (t: CoaxCableType) => get(t).lowLoss;
export const forRf = (t: CoaxCableType) => get(t).forRf;
export const shield = (t: CoaxCableType) => get(t).shield;
export const bestUse = (t: CoaxCableType) => get(t).bestUse;
export const coaxCableTypes = (): CoaxCableType[] =>
  Object.keys(DATA) as CoaxCableType[];
