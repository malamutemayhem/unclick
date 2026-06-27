export type ReflowOvenType =
  | "desktop_ir_convection"
  | "conveyor_inline_prod"
  | "vapor_phase_vps"
  | "hot_plate_bottom"
  | "diy_toaster_mod";

const DATA: Record<ReflowOvenType, {
  tempAccuracy: number; throughput: number; profileControl: number;
  boardSize: number; ovenCost: number; conveyor: boolean;
  forProduction: boolean; heatMethod: string; bestUse: string;
}> = {
  desktop_ir_convection: { tempAccuracy: 7, throughput: 4, profileControl: 8, boardSize: 5, ovenCost: 5, conveyor: false, forProduction: false, heatMethod: "ir_plus_convection", bestUse: "prototype_small_batch" },
  conveyor_inline_prod: { tempAccuracy: 9, throughput: 10, profileControl: 10, boardSize: 10, ovenCost: 10, conveyor: true, forProduction: true, heatMethod: "multi_zone_convection", bestUse: "volume_smt_production" },
  vapor_phase_vps: { tempAccuracy: 10, throughput: 5, profileControl: 9, boardSize: 6, ovenCost: 9, conveyor: false, forProduction: false, heatMethod: "vapor_phase_galden", bestUse: "bga_thermal_sensitive" },
  hot_plate_bottom: { tempAccuracy: 5, throughput: 3, profileControl: 4, boardSize: 4, ovenCost: 2, conveyor: false, forProduction: false, heatMethod: "conductive_plate_heat", bestUse: "quick_single_side_reflow" },
  diy_toaster_mod: { tempAccuracy: 3, throughput: 2, profileControl: 3, boardSize: 3, ovenCost: 1, conveyor: false, forProduction: false, heatMethod: "modified_resistive_elem", bestUse: "hobby_budget_reflow" },
};

const get = (t: ReflowOvenType) => DATA[t];

export const tempAccuracy = (t: ReflowOvenType) => get(t).tempAccuracy;
export const throughput = (t: ReflowOvenType) => get(t).throughput;
export const profileControl = (t: ReflowOvenType) => get(t).profileControl;
export const boardSize = (t: ReflowOvenType) => get(t).boardSize;
export const ovenCost = (t: ReflowOvenType) => get(t).ovenCost;
export const conveyor = (t: ReflowOvenType) => get(t).conveyor;
export const forProduction = (t: ReflowOvenType) => get(t).forProduction;
export const heatMethod = (t: ReflowOvenType) => get(t).heatMethod;
export const bestUse = (t: ReflowOvenType) => get(t).bestUse;
export const reflowOvens = (): ReflowOvenType[] => Object.keys(DATA) as ReflowOvenType[];
