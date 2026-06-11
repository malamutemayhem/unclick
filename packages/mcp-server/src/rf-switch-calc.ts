export type RfSwitch =
  | "pin_diode"
  | "gaas_fet"
  | "soi_cmos"
  | "mems_mechanical"
  | "gan_hemt_sw";

const DATA: Record<RfSwitch, {
  insertionLoss: number; isolation: number; linearity: number;
  switchSpeed: number; swCost: number; hotSwitch: boolean;
  forMmwave: boolean; technology: string; bestUse: string;
}> = {
  pin_diode: {
    insertionLoss: 6, isolation: 7, linearity: 8,
    switchSpeed: 7, swCost: 4, hotSwitch: true,
    forMmwave: false, technology: "pin_junction_bias",
    bestUse: "radar_tr_module",
  },
  gaas_fet: {
    insertionLoss: 8, isolation: 8, linearity: 7,
    switchSpeed: 9, swCost: 6, hotSwitch: true,
    forMmwave: false, technology: "phemt_depletion",
    bestUse: "sat_comm_redundancy",
  },
  soi_cmos: {
    insertionLoss: 7, isolation: 6, linearity: 6,
    switchSpeed: 10, swCost: 3, hotSwitch: true,
    forMmwave: false, technology: "silicon_on_insulator",
    bestUse: "phone_antenna_tuner",
  },
  mems_mechanical: {
    insertionLoss: 10, isolation: 10, linearity: 10,
    switchSpeed: 3, swCost: 8, hotSwitch: false,
    forMmwave: true, technology: "cantilever_contact",
    bestUse: "test_instrument_matrix",
  },
  gan_hemt_sw: {
    insertionLoss: 7, isolation: 7, linearity: 9,
    switchSpeed: 8, swCost: 7, hotSwitch: true,
    forMmwave: true, technology: "gan_on_sic_hemt",
    bestUse: "5g_beamform_switch",
  },
};

const get = (t: RfSwitch) => DATA[t];

export const insertionLoss = (t: RfSwitch) => get(t).insertionLoss;
export const isolation = (t: RfSwitch) => get(t).isolation;
export const linearity = (t: RfSwitch) => get(t).linearity;
export const switchSpeed = (t: RfSwitch) => get(t).switchSpeed;
export const swCost = (t: RfSwitch) => get(t).swCost;
export const hotSwitch = (t: RfSwitch) => get(t).hotSwitch;
export const forMmwave = (t: RfSwitch) => get(t).forMmwave;
export const technology = (t: RfSwitch) => get(t).technology;
export const bestUse = (t: RfSwitch) => get(t).bestUse;
export const rfSwitches = (): RfSwitch[] => Object.keys(DATA) as RfSwitch[];
