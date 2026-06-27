export type HeatEmbossType =
  | "heat_gun_standard"
  | "mini_heat_tool"
  | "dual_temp_switch"
  | "craft_iron_flat"
  | "emboss_pen_detail";

const specs: Record<HeatEmbossType, {
  heatEven: number; meltSpeed: number; controlTemp: number;
  portability: number; cost: number; dualTemp: boolean; forDetail: boolean;
  heatSource: string; use: string;
}> = {
  heat_gun_standard: {
    heatEven: 85, meltSpeed: 88, controlTemp: 80,
    portability: 82, cost: 25, dualTemp: false, forDetail: false,
    heatSource: "fan_coil_heat", use: "general_powder_emboss",
  },
  mini_heat_tool: {
    heatEven: 78, meltSpeed: 82, controlTemp: 75,
    portability: 95, cost: 12, dualTemp: false, forDetail: false,
    heatSource: "compact_coil_heat", use: "portable_quick_emboss",
  },
  dual_temp_switch: {
    heatEven: 88, meltSpeed: 85, controlTemp: 92,
    portability: 80, cost: 35, dualTemp: true, forDetail: false,
    heatSource: "two_stage_coil", use: "variable_temp_emboss",
  },
  craft_iron_flat: {
    heatEven: 92, meltSpeed: 80, controlTemp: 88,
    portability: 75, cost: 30, dualTemp: false, forDetail: false,
    heatSource: "flat_plate_iron", use: "flat_surface_emboss",
  },
  emboss_pen_detail: {
    heatEven: 75, meltSpeed: 72, controlTemp: 90,
    portability: 90, cost: 15, dualTemp: false, forDetail: true,
    heatSource: "tip_point_heat", use: "fine_detail_emboss",
  },
};

export function heatEven(t: HeatEmbossType): number { return specs[t].heatEven; }
export function meltSpeed(t: HeatEmbossType): number { return specs[t].meltSpeed; }
export function controlTemp(t: HeatEmbossType): number { return specs[t].controlTemp; }
export function portability(t: HeatEmbossType): number { return specs[t].portability; }
export function embossCost(t: HeatEmbossType): number { return specs[t].cost; }
export function dualTemp(t: HeatEmbossType): boolean { return specs[t].dualTemp; }
export function forDetail(t: HeatEmbossType): boolean { return specs[t].forDetail; }
export function heatSource(t: HeatEmbossType): string { return specs[t].heatSource; }
export function bestUse(t: HeatEmbossType): string { return specs[t].use; }
export function heatEmbosss(): HeatEmbossType[] { return Object.keys(specs) as HeatEmbossType[]; }
