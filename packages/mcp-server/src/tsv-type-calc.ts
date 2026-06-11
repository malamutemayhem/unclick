export type TsvType =
  | "via_first_before_feol"
  | "via_middle_after_feol"
  | "via_last_after_bond"
  | "backside_reveal_bsv"
  | "glass_interposer_tgv";

const DATA: Record<TsvType, {
  density: number; aspect: number; resistance: number;
  reliability: number; tvCost: number; cmpRequired: boolean;
  for3d: boolean; fill: string; bestUse: string;
}> = {
  via_first_before_feol: {
    density: 10, aspect: 8, resistance: 9,
    reliability: 7, tvCost: 9, cmpRequired: true,
    for3d: true, fill: "tungsten_cvd_plug",
    bestUse: "image_sensor_bsi_stack",
  },
  via_middle_after_feol: {
    density: 9, aspect: 9, resistance: 8,
    reliability: 8, tvCost: 7, cmpRequired: true,
    for3d: true, fill: "copper_electroplated_fill",
    bestUse: "hbm_dram_die_stack",
  },
  via_last_after_bond: {
    density: 6, aspect: 6, resistance: 6,
    reliability: 9, tvCost: 4, cmpRequired: false,
    for3d: true, fill: "copper_conformal_seed",
    bestUse: "mems_cap_wafer_through",
  },
  backside_reveal_bsv: {
    density: 8, aspect: 7, resistance: 7,
    reliability: 6, tvCost: 6, cmpRequired: true,
    for3d: true, fill: "copper_bottom_up_plate",
    bestUse: "logic_memory_hybrid_bond",
  },
  glass_interposer_tgv: {
    density: 7, aspect: 5, resistance: 5,
    reliability: 10, tvCost: 5, cmpRequired: false,
    for3d: false, fill: "copper_paste_screen_print",
    bestUse: "rf_low_loss_interposer",
  },
};

const get = (t: TsvType) => DATA[t];

export const density = (t: TsvType) => get(t).density;
export const aspect = (t: TsvType) => get(t).aspect;
export const resistance = (t: TsvType) => get(t).resistance;
export const reliability = (t: TsvType) => get(t).reliability;
export const tvCost = (t: TsvType) => get(t).tvCost;
export const cmpRequired = (t: TsvType) => get(t).cmpRequired;
export const for3d = (t: TsvType) => get(t).for3d;
export const fill = (t: TsvType) => get(t).fill;
export const bestUse = (t: TsvType) => get(t).bestUse;
export const tsvTypes = (): TsvType[] => Object.keys(DATA) as TsvType[];
