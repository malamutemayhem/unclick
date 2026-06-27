// Timber scribe calculator - timber framing marking/scribing tools

export type TimberScribeType =
  | "race_knife_scratch"
  | "log_scribe_compass"
  | "marking_gauge_pin"
  | "chalk_line_snap"
  | "timber_crayon_wax";

const SCRIBE_DATA: Record<
  TimberScribeType,
  {
    lineFineness: number;
    visibility: number;
    durability: number;
    adjustRange: number;
    cost: number;
    adjustable: boolean;
    permanent: boolean;
    markMethod: string;
    bestUse: string;
  }
> = {
  race_knife_scratch: {
    lineFineness: 10,
    visibility: 5,
    durability: 9,
    adjustRange: 3,
    cost: 4,
    adjustable: false,
    permanent: true,
    markMethod: "knife_scratch_cut",
    bestUse: "precision_layout_line",
  },
  log_scribe_compass: {
    lineFineness: 7,
    visibility: 7,
    durability: 8,
    adjustRange: 9,
    cost: 6,
    adjustable: true,
    permanent: true,
    markMethod: "compass_point_drag",
    bestUse: "log_profile_transfer",
  },
  marking_gauge_pin: {
    lineFineness: 9,
    visibility: 6,
    durability: 8,
    adjustRange: 7,
    cost: 5,
    adjustable: true,
    permanent: true,
    markMethod: "pin_drag_score",
    bestUse: "parallel_edge_mark",
  },
  chalk_line_snap: {
    lineFineness: 5,
    visibility: 10,
    durability: 7,
    adjustRange: 10,
    cost: 2,
    adjustable: false,
    permanent: false,
    markMethod: "chalk_snap_dust",
    bestUse: "long_straight_layout",
  },
  timber_crayon_wax: {
    lineFineness: 4,
    visibility: 9,
    durability: 5,
    adjustRange: 10,
    cost: 1,
    adjustable: false,
    permanent: false,
    markMethod: "wax_crayon_draw",
    bestUse: "rough_mark_label",
  },
};

export function lineFineness(type: TimberScribeType): number {
  return SCRIBE_DATA[type].lineFineness;
}
export function visibility(type: TimberScribeType): number {
  return SCRIBE_DATA[type].visibility;
}
export function durability(type: TimberScribeType): number {
  return SCRIBE_DATA[type].durability;
}
export function adjustRange(type: TimberScribeType): number {
  return SCRIBE_DATA[type].adjustRange;
}
export function scribeCost(type: TimberScribeType): number {
  return SCRIBE_DATA[type].cost;
}
export function adjustable(type: TimberScribeType): boolean {
  return SCRIBE_DATA[type].adjustable;
}
export function permanent(type: TimberScribeType): boolean {
  return SCRIBE_DATA[type].permanent;
}
export function markMethod(type: TimberScribeType): string {
  return SCRIBE_DATA[type].markMethod;
}
export function bestUse(type: TimberScribeType): string {
  return SCRIBE_DATA[type].bestUse;
}
export function timberScribes(): TimberScribeType[] {
  return Object.keys(SCRIBE_DATA) as TimberScribeType[];
}
