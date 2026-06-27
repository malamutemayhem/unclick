export type BoardStackType =
  | "two_layer_standard"
  | "four_layer_signal"
  | "six_layer_mixed"
  | "eight_layer_hdi"
  | "ten_plus_backplane";

const DATA: Record<BoardStackType, {
  signalLayers: number; powerIntegrity: number; routingDensity: number;
  thermalManage: number; stackCost: number; innerPlanes: boolean;
  forHighSpeed: boolean; stackConfig: string; bestUse: string;
}> = {
  two_layer_standard: { signalLayers: 2, powerIntegrity: 3, routingDensity: 3, thermalManage: 3, stackCost: 1, innerPlanes: false, forHighSpeed: false, stackConfig: "top_bottom_signal", bestUse: "simple_low_density_board" },
  four_layer_signal: { signalLayers: 5, powerIntegrity: 7, routingDensity: 6, thermalManage: 6, stackCost: 3, innerPlanes: true, forHighSpeed: false, stackConfig: "sig_gnd_pwr_sig", bestUse: "standard_digital_mixed" },
  six_layer_mixed: { signalLayers: 7, powerIntegrity: 8, routingDensity: 7, thermalManage: 7, stackCost: 5, innerPlanes: true, forHighSpeed: true, stackConfig: "sig_gnd_sig_sig_pwr_sig", bestUse: "moderate_density_ddr" },
  eight_layer_hdi: { signalLayers: 9, powerIntegrity: 9, routingDensity: 9, thermalManage: 8, stackCost: 8, innerPlanes: true, forHighSpeed: true, stackConfig: "dual_stripline_core", bestUse: "high_speed_bga_breakout" },
  ten_plus_backplane: { signalLayers: 10, powerIntegrity: 10, routingDensity: 10, thermalManage: 9, stackCost: 10, innerPlanes: true, forHighSpeed: true, stackConfig: "multi_core_sequential", bestUse: "server_backplane_networking" },
};

const get = (t: BoardStackType) => DATA[t];

export const signalLayers = (t: BoardStackType) => get(t).signalLayers;
export const powerIntegrity = (t: BoardStackType) => get(t).powerIntegrity;
export const routingDensity = (t: BoardStackType) => get(t).routingDensity;
export const thermalManage = (t: BoardStackType) => get(t).thermalManage;
export const stackCost = (t: BoardStackType) => get(t).stackCost;
export const innerPlanes = (t: BoardStackType) => get(t).innerPlanes;
export const forHighSpeed = (t: BoardStackType) => get(t).forHighSpeed;
export const stackConfig = (t: BoardStackType) => get(t).stackConfig;
export const bestUse = (t: BoardStackType) => get(t).bestUse;
export const boardStacks = (): BoardStackType[] => Object.keys(DATA) as BoardStackType[];
