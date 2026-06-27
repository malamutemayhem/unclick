export type CmosProcess =
  | "planar_28nm"
  | "finfet_7nm"
  | "gaafet_3nm"
  | "fdsoi_22nm"
  | "cfet_2nm";

const DATA: Record<CmosProcess, {
  density: number; performance: number; powerEff: number;
  yield_: number; processCost: number; backside: boolean;
  forMobile: boolean; transistor: string; bestUse: string;
}> = {
  planar_28nm: {
    density: 3, performance: 3, powerEff: 3,
    yield_: 9, processCost: 2, backside: false,
    forMobile: false, transistor: "bulk_planar_mosfet",
    bestUse: "iot_mcu_baseband",
  },
  finfet_7nm: {
    density: 7, performance: 8, powerEff: 8,
    yield_: 7, processCost: 6, backside: false,
    forMobile: true, transistor: "tri_gate_fin",
    bestUse: "flagship_mobile_soc",
  },
  gaafet_3nm: {
    density: 9, performance: 9, powerEff: 9,
    yield_: 5, processCost: 9, backside: false,
    forMobile: true, transistor: "nanosheet_gaa",
    bestUse: "ai_datacenter_chip",
  },
  fdsoi_22nm: {
    density: 4, performance: 5, powerEff: 7,
    yield_: 8, processCost: 4, backside: false,
    forMobile: false, transistor: "ultra_thin_body",
    bestUse: "automotive_radar_rf",
  },
  cfet_2nm: {
    density: 10, performance: 10, powerEff: 10,
    yield_: 3, processCost: 10, backside: true,
    forMobile: false, transistor: "complementary_stacked",
    bestUse: "next_gen_hpc_gpu",
  },
};

const get = (t: CmosProcess) => DATA[t];

export const density = (t: CmosProcess) => get(t).density;
export const performance = (t: CmosProcess) => get(t).performance;
export const powerEff = (t: CmosProcess) => get(t).powerEff;
export const yield_ = (t: CmosProcess) => get(t).yield_;
export const processCost = (t: CmosProcess) => get(t).processCost;
export const backside = (t: CmosProcess) => get(t).backside;
export const forMobile = (t: CmosProcess) => get(t).forMobile;
export const transistor = (t: CmosProcess) => get(t).transistor;
export const bestUse = (t: CmosProcess) => get(t).bestUse;
export const cmosProcesses = (): CmosProcess[] => Object.keys(DATA) as CmosProcess[];
