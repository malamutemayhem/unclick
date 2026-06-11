export type HeatPipe =
  | "sintered_wick_copper"
  | "grooved_axial"
  | "mesh_wick_flexible"
  | "loop_heat_pipe"
  | "pulsating_oscillating";

const DATA: Record<HeatPipe, {
  conductance: number; maxPower: number; flexibility: number;
  orientation: number; hpCost: number; antigravity: boolean;
  forLaptop: boolean; wick: string; bestUse: string;
}> = {
  sintered_wick_copper: {
    conductance: 9, maxPower: 8, flexibility: 3,
    orientation: 8, hpCost: 5, antigravity: true,
    forLaptop: true, wick: "sintered_powder_capillary",
    bestUse: "laptop_cpu_gpu_cooling",
  },
  grooved_axial: {
    conductance: 7, maxPower: 6, flexibility: 2,
    orientation: 4, hpCost: 3, antigravity: false,
    forLaptop: false, wick: "extruded_axial_groove",
    bestUse: "satellite_panel_isotherm",
  },
  mesh_wick_flexible: {
    conductance: 6, maxPower: 5, flexibility: 10,
    orientation: 6, hpCost: 4, antigravity: false,
    forLaptop: true, wick: "woven_screen_wrapped",
    bestUse: "phone_thin_form_factor",
  },
  loop_heat_pipe: {
    conductance: 10, maxPower: 10, flexibility: 7,
    orientation: 10, hpCost: 8, antigravity: true,
    forLaptop: false, wick: "evaporator_compensation_chamber",
    bestUse: "spacecraft_high_power_remote",
  },
  pulsating_oscillating: {
    conductance: 5, maxPower: 4, flexibility: 8,
    orientation: 5, hpCost: 2, antigravity: false,
    forLaptop: false, wick: "wickless_slug_oscillation",
    bestUse: "led_array_passive_cool",
  },
};

const get = (t: HeatPipe) => DATA[t];

export const conductance = (t: HeatPipe) => get(t).conductance;
export const maxPower = (t: HeatPipe) => get(t).maxPower;
export const flexibility = (t: HeatPipe) => get(t).flexibility;
export const orientation = (t: HeatPipe) => get(t).orientation;
export const hpCost = (t: HeatPipe) => get(t).hpCost;
export const antigravity = (t: HeatPipe) => get(t).antigravity;
export const forLaptop = (t: HeatPipe) => get(t).forLaptop;
export const wick = (t: HeatPipe) => get(t).wick;
export const bestUse = (t: HeatPipe) => get(t).bestUse;
export const heatPipes = (): HeatPipe[] => Object.keys(DATA) as HeatPipe[];
