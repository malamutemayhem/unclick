// Fret saw marquetry calculator - marquetry fret saw cutting tools

export type FretSawMarquetryType =
  | "hand_frame_deep"
  | "jeweler_frame_small"
  | "scroll_saw_electric"
  | "coping_frame_adjust"
  | "chevalet_seat_saw";

const FRET_DATA: Record<
  FretSawMarquetryType,
  {
    cutPrecision: number;
    curveFollow: number;
    bladeRange: number;
    controlFeel: number;
    cost: number;
    powered: boolean;
    forThick: boolean;
    frameDepth: string;
    bestUse: string;
  }
> = {
  hand_frame_deep: {
    cutPrecision: 8,
    curveFollow: 8,
    bladeRange: 7,
    controlFeel: 8,
    cost: 4,
    powered: false,
    forThick: false,
    frameDepth: "deep_12_inch",
    bestUse: "general_fret_cut",
  },
  jeweler_frame_small: {
    cutPrecision: 10,
    curveFollow: 9,
    bladeRange: 5,
    controlFeel: 9,
    cost: 3,
    powered: false,
    forThick: false,
    frameDepth: "shallow_3_inch",
    bestUse: "fine_detail_fret",
  },
  scroll_saw_electric: {
    cutPrecision: 7,
    curveFollow: 7,
    bladeRange: 9,
    controlFeel: 6,
    cost: 8,
    powered: true,
    forThick: true,
    frameDepth: "table_mount_deep",
    bestUse: "production_stack_cut",
  },
  coping_frame_adjust: {
    cutPrecision: 7,
    curveFollow: 8,
    bladeRange: 6,
    controlFeel: 7,
    cost: 3,
    powered: false,
    forThick: false,
    frameDepth: "adjustable_6_inch",
    bestUse: "curved_inside_cut",
  },
  chevalet_seat_saw: {
    cutPrecision: 9,
    curveFollow: 9,
    bladeRange: 8,
    controlFeel: 10,
    cost: 9,
    powered: false,
    forThick: true,
    frameDepth: "seat_mount_large",
    bestUse: "boulle_packet_cut",
  },
};

export function cutPrecision(type: FretSawMarquetryType): number {
  return FRET_DATA[type].cutPrecision;
}
export function curveFollow(type: FretSawMarquetryType): number {
  return FRET_DATA[type].curveFollow;
}
export function bladeRange(type: FretSawMarquetryType): number {
  return FRET_DATA[type].bladeRange;
}
export function controlFeel(type: FretSawMarquetryType): number {
  return FRET_DATA[type].controlFeel;
}
export function fretCost(type: FretSawMarquetryType): number {
  return FRET_DATA[type].cost;
}
export function powered(type: FretSawMarquetryType): boolean {
  return FRET_DATA[type].powered;
}
export function forThick(type: FretSawMarquetryType): boolean {
  return FRET_DATA[type].forThick;
}
export function frameDepth(type: FretSawMarquetryType): string {
  return FRET_DATA[type].frameDepth;
}
export function bestUse(type: FretSawMarquetryType): string {
  return FRET_DATA[type].bestUse;
}
export function fretSawMarquetrys(): FretSawMarquetryType[] {
  return Object.keys(FRET_DATA) as FretSawMarquetryType[];
}
