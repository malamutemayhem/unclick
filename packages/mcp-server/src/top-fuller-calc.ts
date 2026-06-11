export type TopFullerType =
  | "half_round_standard"
  | "narrow_round_detail"
  | "wide_flat_spread"
  | "vee_edge_crease"
  | "handled_top_safe";

const specs: Record<TopFullerType, {
  impressClean: number; depthControl: number; speedWork: number;
  handleSafe: number; cost: number; handled: boolean; veeEdge: boolean;
  radiusSize: string; use: string;
}> = {
  half_round_standard: {
    impressClean: 85, depthControl: 82, speedWork: 80,
    handleSafe: 78, cost: 20, handled: false, veeEdge: false,
    radiusSize: "half_inch_radius", use: "general_top_fuller",
  },
  narrow_round_detail: {
    impressClean: 90, depthControl: 88, speedWork: 75,
    handleSafe: 80, cost: 22, handled: false, veeEdge: false,
    radiusSize: "quarter_inch_radius", use: "narrow_groove_detail",
  },
  wide_flat_spread: {
    impressClean: 80, depthControl: 78, speedWork: 85,
    handleSafe: 75, cost: 25, handled: false, veeEdge: false,
    radiusSize: "one_inch_flat", use: "wide_draw_spread",
  },
  vee_edge_crease: {
    impressClean: 82, depthControl: 90, speedWork: 78,
    handleSafe: 78, cost: 24, handled: false, veeEdge: true,
    radiusSize: "sharp_vee_edge", use: "sharp_crease_mark",
  },
  handled_top_safe: {
    impressClean: 85, depthControl: 82, speedWork: 82,
    handleSafe: 95, cost: 30, handled: true, veeEdge: false,
    radiusSize: "half_inch_handled", use: "safe_solo_fuller",
  },
};

export function impressClean(t: TopFullerType): number { return specs[t].impressClean; }
export function depthControl(t: TopFullerType): number { return specs[t].depthControl; }
export function speedWork(t: TopFullerType): number { return specs[t].speedWork; }
export function handleSafe(t: TopFullerType): number { return specs[t].handleSafe; }
export function fullerCost(t: TopFullerType): number { return specs[t].cost; }
export function handled(t: TopFullerType): boolean { return specs[t].handled; }
export function veeEdge(t: TopFullerType): boolean { return specs[t].veeEdge; }
export function radiusSize(t: TopFullerType): string { return specs[t].radiusSize; }
export function bestUse(t: TopFullerType): string { return specs[t].use; }
export function topFullers(): TopFullerType[] { return Object.keys(specs) as TopFullerType[]; }
