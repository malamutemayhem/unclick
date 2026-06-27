export type ScrollGougeType =
  | "small_sweep_tight"
  | "medium_sweep_general"
  | "flat_sweep_wide"
  | "fishtail_gouge_access"
  | "bent_gouge_undercut";

const specs: Record<ScrollGougeType, {
  cutClean: number; controlFine: number; accessReach: number;
  edgeKeep: number; cost: number; bent: boolean; fishtail: boolean;
  sweepRadius: string; use: string;
}> = {
  small_sweep_tight: {
    cutClean: 85, controlFine: 92, accessReach: 78,
    edgeKeep: 75, cost: 30, bent: false, fishtail: false,
    sweepRadius: "tight_three_mm", use: "scroll_volute_carve",
  },
  medium_sweep_general: {
    cutClean: 82, controlFine: 80, accessReach: 82,
    edgeKeep: 78, cost: 25, bent: false, fishtail: false,
    sweepRadius: "medium_six_mm", use: "general_scroll_shape",
  },
  flat_sweep_wide: {
    cutClean: 78, controlFine: 75, accessReach: 85,
    edgeKeep: 80, cost: 28, bent: false, fishtail: false,
    sweepRadius: "wide_twelve_mm", use: "scroll_cheek_flatten",
  },
  fishtail_gouge_access: {
    cutClean: 80, controlFine: 85, accessReach: 95,
    edgeKeep: 70, cost: 35, bent: false, fishtail: true,
    sweepRadius: "medium_six_mm", use: "tight_corner_access",
  },
  bent_gouge_undercut: {
    cutClean: 75, controlFine: 78, accessReach: 92,
    edgeKeep: 68, cost: 40, bent: true, fishtail: false,
    sweepRadius: "small_four_mm", use: "undercut_pegbox_carve",
  },
};

export function cutClean(t: ScrollGougeType): number { return specs[t].cutClean; }
export function controlFine(t: ScrollGougeType): number { return specs[t].controlFine; }
export function accessReach(t: ScrollGougeType): number { return specs[t].accessReach; }
export function edgeKeep(t: ScrollGougeType): number { return specs[t].edgeKeep; }
export function gougeCost(t: ScrollGougeType): number { return specs[t].cost; }
export function bent(t: ScrollGougeType): boolean { return specs[t].bent; }
export function fishtail(t: ScrollGougeType): boolean { return specs[t].fishtail; }
export function sweepRadius(t: ScrollGougeType): string { return specs[t].sweepRadius; }
export function bestUse(t: ScrollGougeType): string { return specs[t].use; }
export function scrollGouges(): ScrollGougeType[] { return Object.keys(specs) as ScrollGougeType[]; }
