export type CellFormat =
  | "cylindrical_18650"
  | "cylindrical_4680"
  | "prismatic_blade"
  | "pouch_laminate"
  | "coin_button";

const DATA: Record<CellFormat, {
  energyDensity: number; thermal: number; packability: number;
  structural: number; cellCost: number; tabless: boolean;
  forEv: boolean; form: string; bestUse: string;
}> = {
  cylindrical_18650: {
    energyDensity: 7, thermal: 7, packability: 6,
    structural: 8, cellCost: 3, tabless: false,
    forEv: false, form: "steel_can_jelly_roll",
    bestUse: "power_tool_laptop_pack",
  },
  cylindrical_4680: {
    energyDensity: 9, thermal: 8, packability: 7,
    structural: 9, cellCost: 4, tabless: true,
    forEv: true, form: "large_format_tabless_roll",
    bestUse: "ev_structural_battery",
  },
  prismatic_blade: {
    energyDensity: 7, thermal: 6, packability: 10,
    structural: 7, cellCost: 5, tabless: false,
    forEv: true, form: "flat_aluminum_case",
    bestUse: "cell_to_pack_ctp_bus",
  },
  pouch_laminate: {
    energyDensity: 10, thermal: 4, packability: 8,
    structural: 3, cellCost: 6, tabless: false,
    forEv: true, form: "flexible_foil_stacked",
    bestUse: "lightweight_drone_uav",
  },
  coin_button: {
    energyDensity: 3, thermal: 9, packability: 3,
    structural: 10, cellCost: 1, tabless: false,
    forEv: false, form: "sealed_metal_disc",
    bestUse: "iot_sensor_rtc_backup",
  },
};

const get = (t: CellFormat) => DATA[t];

export const energyDensity = (t: CellFormat) => get(t).energyDensity;
export const thermal = (t: CellFormat) => get(t).thermal;
export const packability = (t: CellFormat) => get(t).packability;
export const structural = (t: CellFormat) => get(t).structural;
export const cellCost = (t: CellFormat) => get(t).cellCost;
export const tabless = (t: CellFormat) => get(t).tabless;
export const forEv = (t: CellFormat) => get(t).forEv;
export const form = (t: CellFormat) => get(t).form;
export const bestUse = (t: CellFormat) => get(t).bestUse;
export const cellFormats = (): CellFormat[] => Object.keys(DATA) as CellFormat[];
