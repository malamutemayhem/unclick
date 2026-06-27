export type ViaFillType =
  | "tented_solder_mask"
  | "plugged_epoxy_fill"
  | "plated_shut_copper"
  | "conductive_paste"
  | "non_conductive_resin";

const DATA: Record<ViaFillType, {
  reliability: number; planarity: number; thermalConduct: number;
  processSpeed: number; fillCost: number; conductive: boolean;
  forViainPad: boolean; fillMethod: string; bestUse: string;
}> = {
  tented_solder_mask: { reliability: 5, planarity: 4, thermalConduct: 2, processSpeed: 10, fillCost: 1, conductive: false, forViainPad: false, fillMethod: "mask_print_cover", bestUse: "standard_through_via" },
  plugged_epoxy_fill: { reliability: 7, planarity: 7, thermalConduct: 3, processSpeed: 6, fillCost: 4, conductive: false, forViainPad: true, fillMethod: "vacuum_epoxy_plug", bestUse: "via_in_pad_flat_top" },
  plated_shut_copper: { reliability: 10, planarity: 10, thermalConduct: 10, processSpeed: 3, fillCost: 9, conductive: true, forViainPad: true, fillMethod: "electrolytic_copper_fill", bestUse: "high_current_thermal_via" },
  conductive_paste: { reliability: 7, planarity: 6, thermalConduct: 7, processSpeed: 7, fillCost: 5, conductive: true, forViainPad: true, fillMethod: "silver_paste_screen", bestUse: "moderate_thermal_fill" },
  non_conductive_resin: { reliability: 8, planarity: 8, thermalConduct: 2, processSpeed: 5, fillCost: 5, conductive: false, forViainPad: true, fillMethod: "resin_plug_planarize", bestUse: "bga_via_in_pad_fill" },
};

const get = (t: ViaFillType) => DATA[t];

export const reliability = (t: ViaFillType) => get(t).reliability;
export const planarity = (t: ViaFillType) => get(t).planarity;
export const thermalConduct = (t: ViaFillType) => get(t).thermalConduct;
export const processSpeed = (t: ViaFillType) => get(t).processSpeed;
export const fillCost = (t: ViaFillType) => get(t).fillCost;
export const conductive = (t: ViaFillType) => get(t).conductive;
export const forViainPad = (t: ViaFillType) => get(t).forViainPad;
export const fillMethod = (t: ViaFillType) => get(t).fillMethod;
export const bestUse = (t: ViaFillType) => get(t).bestUse;
export const viaFills = (): ViaFillType[] => Object.keys(DATA) as ViaFillType[];
