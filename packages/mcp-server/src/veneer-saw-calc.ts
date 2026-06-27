export type VeneerSawType = "double_edge_thin" | "single_edge_offset" | "flush_cut_bent" | "veneer_knife_pull" | "craft_razor_blade";

export function cutClean(t: VeneerSawType): number {
  const m: Record<VeneerSawType, number> = {
    double_edge_thin: 9, single_edge_offset: 8, flush_cut_bent: 7, veneer_knife_pull: 10, craft_razor_blade: 6,
  };
  return m[t];
}

export function curveFollow(t: VeneerSawType): number {
  const m: Record<VeneerSawType, number> = {
    double_edge_thin: 5, single_edge_offset: 6, flush_cut_bent: 4, veneer_knife_pull: 9, craft_razor_blade: 10,
  };
  return m[t];
}

export function straightCut(t: VeneerSawType): number {
  const m: Record<VeneerSawType, number> = {
    double_edge_thin: 9, single_edge_offset: 10, flush_cut_bent: 7, veneer_knife_pull: 6, craft_razor_blade: 5,
  };
  return m[t];
}

export function depthControl(t: VeneerSawType): number {
  const m: Record<VeneerSawType, number> = {
    double_edge_thin: 7, single_edge_offset: 9, flush_cut_bent: 10, veneer_knife_pull: 6, craft_razor_blade: 5,
  };
  return m[t];
}

export function sawCost(t: VeneerSawType): number {
  const m: Record<VeneerSawType, number> = {
    double_edge_thin: 2, single_edge_offset: 2, flush_cut_bent: 2, veneer_knife_pull: 1, craft_razor_blade: 1,
  };
  return m[t];
}

export function doubleEdge(t: VeneerSawType): boolean {
  const m: Record<VeneerSawType, boolean> = {
    double_edge_thin: true, single_edge_offset: false, flush_cut_bent: false, veneer_knife_pull: false, craft_razor_blade: false,
  };
  return m[t];
}

export function flushCut(t: VeneerSawType): boolean {
  const m: Record<VeneerSawType, boolean> = {
    double_edge_thin: false, single_edge_offset: false, flush_cut_bent: true, veneer_knife_pull: false, craft_razor_blade: false,
  };
  return m[t];
}

export function bladeType(t: VeneerSawType): string {
  const m: Record<VeneerSawType, string> = {
    double_edge_thin: "thin_double_tooth",
    single_edge_offset: "offset_handle_blade",
    flush_cut_bent: "bent_flexible_blade",
    veneer_knife_pull: "sharp_pull_knife",
    craft_razor_blade: "replaceable_razor",
  };
  return m[t];
}

export function bestUse(t: VeneerSawType): string {
  const m: Record<VeneerSawType, string> = {
    double_edge_thin: "straight_veneer_joint",
    single_edge_offset: "edge_trim_veneer",
    flush_cut_bent: "flush_trim_plug",
    veneer_knife_pull: "curved_inlay_cut",
    craft_razor_blade: "freehand_shape_cut",
  };
  return m[t];
}

export function veneerSaws(): VeneerSawType[] {
  return ["double_edge_thin", "single_edge_offset", "flush_cut_bent", "veneer_knife_pull", "craft_razor_blade"];
}
