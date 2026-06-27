export type KurinukiCarveType =
  | "loop_tool_standard"
  | "wire_tool_fine"
  | "spoon_gouge_hollow"
  | "ribbon_tool_smooth"
  | "knife_edge_detail";

const specs: Record<KurinukiCarveType, {
  carveClean: number; hollowDepth: number; detailFine: number;
  controlSteady: number; cost: number; forHollow: boolean; forDetail: boolean;
  edgeProfile: string; use: string;
}> = {
  loop_tool_standard: {
    carveClean: 85, hollowDepth: 88, detailFine: 75,
    controlSteady: 82, cost: 8, forHollow: true, forDetail: false,
    edgeProfile: "wire_loop_round", use: "general_hollow_carve",
  },
  wire_tool_fine: {
    carveClean: 82, hollowDepth: 80, detailFine: 88,
    controlSteady: 85, cost: 6, forHollow: false, forDetail: true,
    edgeProfile: "thin_wire_edge", use: "fine_surface_detail",
  },
  spoon_gouge_hollow: {
    carveClean: 88, hollowDepth: 95, detailFine: 70,
    controlSteady: 80, cost: 12, forHollow: true, forDetail: false,
    edgeProfile: "curved_spoon_scoop", use: "deep_vessel_hollow",
  },
  ribbon_tool_smooth: {
    carveClean: 92, hollowDepth: 82, detailFine: 80,
    controlSteady: 88, cost: 10, forHollow: false, forDetail: false,
    edgeProfile: "flat_ribbon_blade", use: "smooth_wall_refine",
  },
  knife_edge_detail: {
    carveClean: 80, hollowDepth: 72, detailFine: 95,
    controlSteady: 90, cost: 7, forHollow: false, forDetail: true,
    edgeProfile: "sharp_knife_point", use: "precise_line_carve",
  },
};

export function carveClean(t: KurinukiCarveType): number { return specs[t].carveClean; }
export function hollowDepth(t: KurinukiCarveType): number { return specs[t].hollowDepth; }
export function detailFine(t: KurinukiCarveType): number { return specs[t].detailFine; }
export function controlSteady(t: KurinukiCarveType): number { return specs[t].controlSteady; }
export function carveCost(t: KurinukiCarveType): number { return specs[t].cost; }
export function forHollow(t: KurinukiCarveType): boolean { return specs[t].forHollow; }
export function forDetail(t: KurinukiCarveType): boolean { return specs[t].forDetail; }
export function edgeProfile(t: KurinukiCarveType): string { return specs[t].edgeProfile; }
export function bestUse(t: KurinukiCarveType): string { return specs[t].use; }
export function kurinukiCarves(): KurinukiCarveType[] { return Object.keys(specs) as KurinukiCarveType[]; }
