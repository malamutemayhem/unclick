export type WireDrawerType =
  | "single_block"
  | "multi_block"
  | "bull_block"
  | "wet_drawing"
  | "fine_wire";

interface WireDrawerData {
  drawAccuracy: number;
  throughput: number;
  surfaceFinish: number;
  reductionRatio: number;
  wdCost: number;
  continuous: boolean;
  forMicro: boolean;
  drawerConfig: string;
  bestUse: string;
}

const DATA: Record<WireDrawerType, WireDrawerData> = {
  single_block: {
    drawAccuracy: 7, throughput: 5, surfaceFinish: 7, reductionRatio: 7, wdCost: 4,
    continuous: false, forMicro: false,
    drawerConfig: "single_block_wire_drawer_capstan_die_pull_reduce_coil_collect",
    bestUse: "small_shop_single_block_wire_drawer_custom_gauge_short_run",
  },
  multi_block: {
    drawAccuracy: 9, throughput: 9, surfaceFinish: 9, reductionRatio: 9, wdCost: 8,
    continuous: true, forMicro: false,
    drawerConfig: "multi_block_wire_drawer_tandem_die_capstan_progressive_reduce",
    bestUse: "cable_factory_multi_block_wire_drawer_continuous_high_speed",
  },
  bull_block: {
    drawAccuracy: 7, throughput: 7, surfaceFinish: 6, reductionRatio: 8, wdCost: 5,
    continuous: false, forMicro: false,
    drawerConfig: "bull_block_wire_drawer_large_drum_heavy_gauge_single_pass_coil",
    bestUse: "heavy_gauge_bull_block_wire_drawer_rod_bar_large_diameter",
  },
  wet_drawing: {
    drawAccuracy: 9, throughput: 8, surfaceFinish: 10, reductionRatio: 9, wdCost: 7,
    continuous: true, forMicro: false,
    drawerConfig: "wet_drawing_wire_drawer_lubricant_bath_cool_die_smooth_surface",
    bestUse: "stainless_steel_wet_drawing_wire_drawer_bright_finish_spring",
  },
  fine_wire: {
    drawAccuracy: 10, throughput: 6, surfaceFinish: 10, reductionRatio: 10, wdCost: 10,
    continuous: true, forMicro: true,
    drawerConfig: "fine_wire_drawer_diamond_die_precision_micro_diameter_control",
    bestUse: "electronics_fine_wire_drawer_micro_diameter_bonding_wire_sensor",
  },
};

function get(t: WireDrawerType): WireDrawerData {
  return DATA[t];
}

export const drawAccuracy = (t: WireDrawerType) => get(t).drawAccuracy;
export const throughput = (t: WireDrawerType) => get(t).throughput;
export const surfaceFinish = (t: WireDrawerType) => get(t).surfaceFinish;
export const reductionRatio = (t: WireDrawerType) => get(t).reductionRatio;
export const wdCost = (t: WireDrawerType) => get(t).wdCost;
export const continuous = (t: WireDrawerType) => get(t).continuous;
export const forMicro = (t: WireDrawerType) => get(t).forMicro;
export const drawerConfig = (t: WireDrawerType) => get(t).drawerConfig;
export const bestUse = (t: WireDrawerType) => get(t).bestUse;
export const wireDrawerTypes = (): WireDrawerType[] =>
  Object.keys(DATA) as WireDrawerType[];
