export type HotKnifeSailType =
  | "electric_blade_standard"
  | "battery_blade_portable"
  | "soldering_tip_fine"
  | "rope_cutter_heavy"
  | "bench_mount_fixed";

const specs: Record<HotKnifeSailType, {
  cutClean: number; sealEdge: number; speedCut: number;
  fabricRange: number; cost: number; portable: boolean; benchMount: boolean;
  heatSource: string; use: string;
}> = {
  electric_blade_standard: {
    cutClean: 88, sealEdge: 90, speedCut: 82,
    fabricRange: 85, cost: 30, portable: false, benchMount: false,
    heatSource: "electric_element_blade", use: "general_synthetic_cut",
  },
  battery_blade_portable: {
    cutClean: 82, sealEdge: 85, speedCut: 78,
    fabricRange: 80, cost: 45, portable: true, benchMount: false,
    heatSource: "battery_heated_blade", use: "field_repair_cut",
  },
  soldering_tip_fine: {
    cutClean: 85, sealEdge: 88, speedCut: 70,
    fabricRange: 72, cost: 20, portable: false, benchMount: false,
    heatSource: "soldering_iron_tip", use: "fine_detail_melt_cut",
  },
  rope_cutter_heavy: {
    cutClean: 80, sealEdge: 92, speedCut: 88,
    fabricRange: 78, cost: 35, portable: false, benchMount: false,
    heatSource: "high_watt_element", use: "heavy_rope_seal_cut",
  },
  bench_mount_fixed: {
    cutClean: 92, sealEdge: 90, speedCut: 90,
    fabricRange: 88, cost: 60, portable: false, benchMount: true,
    heatSource: "fixed_heated_wire", use: "production_bench_cut",
  },
};

export function cutClean(t: HotKnifeSailType): number { return specs[t].cutClean; }
export function sealEdge(t: HotKnifeSailType): number { return specs[t].sealEdge; }
export function speedCut(t: HotKnifeSailType): number { return specs[t].speedCut; }
export function fabricRange(t: HotKnifeSailType): number { return specs[t].fabricRange; }
export function knifeCost(t: HotKnifeSailType): number { return specs[t].cost; }
export function portable(t: HotKnifeSailType): boolean { return specs[t].portable; }
export function benchMount(t: HotKnifeSailType): boolean { return specs[t].benchMount; }
export function heatSource(t: HotKnifeSailType): string { return specs[t].heatSource; }
export function bestUse(t: HotKnifeSailType): string { return specs[t].use; }
export function hotKnifeSails(): HotKnifeSailType[] { return Object.keys(specs) as HotKnifeSailType[]; }
