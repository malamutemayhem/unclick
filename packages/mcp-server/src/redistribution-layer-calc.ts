export type RedistributionLayer =
  | "single_cu_rdl"
  | "multi_layer_rdl"
  | "polymer_pi_rdl"
  | "glass_panel_rdl"
  | "fan_out_wafer";

const DATA: Record<RedistributionLayer, {
  lineWidth: number; layerCount: number; resistance: number;
  reliability: number; rdlCost: number; waferLevel: boolean;
  forChiplet: boolean; process: string; bestUse: string;
}> = {
  single_cu_rdl: {
    lineWidth: 5, layerCount: 2, resistance: 7,
    reliability: 7, rdlCost: 3, waferLevel: true,
    forChiplet: false, process: "seed_plate_etch",
    bestUse: "wlcsp_bump_reroute",
  },
  multi_layer_rdl: {
    lineWidth: 7, layerCount: 8, resistance: 6,
    reliability: 8, rdlCost: 6, waferLevel: true,
    forChiplet: true, process: "multi_cu_damascene",
    bestUse: "info_tsmc_chiplet",
  },
  polymer_pi_rdl: {
    lineWidth: 4, layerCount: 4, resistance: 5,
    reliability: 6, rdlCost: 4, waferLevel: false,
    forChiplet: false, process: "pi_spin_coat_cu",
    bestUse: "fan_in_wlcsp",
  },
  glass_panel_rdl: {
    lineWidth: 8, layerCount: 6, resistance: 8,
    reliability: 7, rdlCost: 7, waferLevel: false,
    forChiplet: true, process: "glass_core_semi_add",
    bestUse: "large_panel_interposer",
  },
  fan_out_wafer: {
    lineWidth: 9, layerCount: 7, resistance: 8,
    reliability: 8, rdlCost: 8, waferLevel: true,
    forChiplet: true, process: "mold_first_rdl_last",
    bestUse: "fowlp_5g_module",
  },
};

const get = (t: RedistributionLayer) => DATA[t];

export const lineWidth = (t: RedistributionLayer) => get(t).lineWidth;
export const layerCount = (t: RedistributionLayer) => get(t).layerCount;
export const resistance = (t: RedistributionLayer) => get(t).resistance;
export const reliability = (t: RedistributionLayer) => get(t).reliability;
export const rdlCost = (t: RedistributionLayer) => get(t).rdlCost;
export const waferLevel = (t: RedistributionLayer) => get(t).waferLevel;
export const forChiplet = (t: RedistributionLayer) => get(t).forChiplet;
export const process = (t: RedistributionLayer) => get(t).process;
export const bestUse = (t: RedistributionLayer) => get(t).bestUse;
export const redistributionLayers = (): RedistributionLayer[] => Object.keys(DATA) as RedistributionLayer[];
