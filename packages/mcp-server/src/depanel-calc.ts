export type DepanelType =
  | "v_score_break"
  | "router_cnc_cut"
  | "laser_depanel"
  | "pizza_cutter_wheel"
  | "punch_die_stamp";

const DATA: Record<DepanelType, {
  edgeQuality: number; boardStress: number; speed: number;
  flexibility: number; systemCost: number; dustFree: boolean;
  forFlex: boolean; cutMethod: string; bestUse: string;
}> = {
  v_score_break: { edgeQuality: 5, boardStress: 4, speed: 9, flexibility: 3, systemCost: 2, dustFree: true, forFlex: false, cutMethod: "snap_along_score", bestUse: "simple_linear_panel" },
  router_cnc_cut: { edgeQuality: 8, boardStress: 7, speed: 6, flexibility: 9, systemCost: 6, dustFree: false, forFlex: false, cutMethod: "cnc_end_mill_route", bestUse: "complex_outline_board" },
  laser_depanel: { edgeQuality: 10, boardStress: 10, speed: 7, flexibility: 10, systemCost: 10, dustFree: true, forFlex: true, cutMethod: "uv_laser_cut", bestUse: "flex_pcb_stress_free" },
  pizza_cutter_wheel: { edgeQuality: 4, boardStress: 3, speed: 10, flexibility: 2, systemCost: 1, dustFree: false, forFlex: false, cutMethod: "circular_blade_roll", bestUse: "high_vol_v_score_panel" },
  punch_die_stamp: { edgeQuality: 6, boardStress: 5, speed: 10, flexibility: 4, systemCost: 5, dustFree: true, forFlex: false, cutMethod: "hydraulic_die_press", bestUse: "mass_production_stamp" },
};

const get = (t: DepanelType) => DATA[t];

export const edgeQuality = (t: DepanelType) => get(t).edgeQuality;
export const boardStress = (t: DepanelType) => get(t).boardStress;
export const speed = (t: DepanelType) => get(t).speed;
export const flexibility = (t: DepanelType) => get(t).flexibility;
export const systemCost = (t: DepanelType) => get(t).systemCost;
export const dustFree = (t: DepanelType) => get(t).dustFree;
export const forFlex = (t: DepanelType) => get(t).forFlex;
export const cutMethod = (t: DepanelType) => get(t).cutMethod;
export const bestUse = (t: DepanelType) => get(t).bestUse;
export const depanels = (): DepanelType[] => Object.keys(DATA) as DepanelType[];
