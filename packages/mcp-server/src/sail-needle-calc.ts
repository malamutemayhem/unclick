export type SailNeedleType =
  | "triangular_point_standard"
  | "round_point_light"
  | "heavy_gauge_canvas"
  | "curved_needle_patch"
  | "machine_needle_power";

const specs: Record<SailNeedleType, {
  penetrate: number; controlStitch: number; durability: number;
  fabricRange: number; cost: number; curved: boolean; forMachine: boolean;
  pointStyle: string; use: string;
}> = {
  triangular_point_standard: {
    penetrate: 90, controlStitch: 85, durability: 82,
    fabricRange: 85, cost: 5, curved: false, forMachine: false,
    pointStyle: "three_edge_cut", use: "general_sail_stitch",
  },
  round_point_light: {
    penetrate: 75, controlStitch: 88, durability: 78,
    fabricRange: 80, cost: 4, curved: false, forMachine: false,
    pointStyle: "round_taper_point", use: "light_fabric_stitch",
  },
  heavy_gauge_canvas: {
    penetrate: 95, controlStitch: 78, durability: 92,
    fabricRange: 70, cost: 8, curved: false, forMachine: false,
    pointStyle: "heavy_triangular_cut", use: "heavy_canvas_sew",
  },
  curved_needle_patch: {
    penetrate: 82, controlStitch: 90, durability: 75,
    fabricRange: 78, cost: 6, curved: true, forMachine: false,
    pointStyle: "curved_arc_point", use: "patch_repair_stitch",
  },
  machine_needle_power: {
    penetrate: 88, controlStitch: 72, durability: 85,
    fabricRange: 92, cost: 12, curved: false, forMachine: true,
    pointStyle: "machine_feed_point", use: "power_machine_sew",
  },
};

export function penetrate(t: SailNeedleType): number { return specs[t].penetrate; }
export function controlStitch(t: SailNeedleType): number { return specs[t].controlStitch; }
export function durability(t: SailNeedleType): number { return specs[t].durability; }
export function fabricRange(t: SailNeedleType): number { return specs[t].fabricRange; }
export function needleCost(t: SailNeedleType): number { return specs[t].cost; }
export function curved(t: SailNeedleType): boolean { return specs[t].curved; }
export function forMachine(t: SailNeedleType): boolean { return specs[t].forMachine; }
export function pointStyle(t: SailNeedleType): string { return specs[t].pointStyle; }
export function bestUse(t: SailNeedleType): string { return specs[t].use; }
export function sailNeedles(): SailNeedleType[] { return Object.keys(specs) as SailNeedleType[]; }
