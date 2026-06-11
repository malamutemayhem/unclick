// Tatting shuttle calculator - lace tatting shuttle tools

export type TattingShuttleType =
  | "classic_post_wind"
  | "clover_ergonomic"
  | "pop_shuttle_hook"
  | "needle_tatting_long"
  | "aero_slim_speed";

const SHUTTLE_DATA: Record<
  TattingShuttleType,
  {
    threadControl: number;
    knotSpeed: number;
    threadCapacity: number;
    handComfort: number;
    cost: number;
    hasHook: boolean;
    forBeginner: boolean;
    bodyShape: string;
    bestUse: string;
  }
> = {
  classic_post_wind: {
    threadControl: 8,
    knotSpeed: 7,
    threadCapacity: 8,
    handComfort: 7,
    cost: 3,
    hasHook: false,
    forBeginner: false,
    bodyShape: "oval_post_center",
    bestUse: "traditional_lace_tat",
  },
  clover_ergonomic: {
    threadControl: 9,
    knotSpeed: 8,
    threadCapacity: 7,
    handComfort: 10,
    cost: 5,
    hasHook: true,
    forBeginner: true,
    bodyShape: "ergonomic_contour",
    bestUse: "comfortable_long_session",
  },
  pop_shuttle_hook: {
    threadControl: 8,
    knotSpeed: 9,
    threadCapacity: 6,
    handComfort: 8,
    cost: 4,
    hasHook: true,
    forBeginner: true,
    bodyShape: "compact_hook_tip",
    bestUse: "fast_join_work",
  },
  needle_tatting_long: {
    threadControl: 7,
    knotSpeed: 6,
    threadCapacity: 5,
    handComfort: 8,
    cost: 3,
    hasHook: false,
    forBeginner: true,
    bodyShape: "long_needle_shaft",
    bestUse: "beginner_learn_tat",
  },
  aero_slim_speed: {
    threadControl: 9,
    knotSpeed: 10,
    threadCapacity: 5,
    handComfort: 7,
    cost: 4,
    hasHook: true,
    forBeginner: false,
    bodyShape: "slim_flat_profile",
    bestUse: "speed_fine_thread",
  },
};

export function threadControl(type: TattingShuttleType): number {
  return SHUTTLE_DATA[type].threadControl;
}
export function knotSpeed(type: TattingShuttleType): number {
  return SHUTTLE_DATA[type].knotSpeed;
}
export function threadCapacity(type: TattingShuttleType): number {
  return SHUTTLE_DATA[type].threadCapacity;
}
export function handComfort(type: TattingShuttleType): number {
  return SHUTTLE_DATA[type].handComfort;
}
export function shuttleCost(type: TattingShuttleType): number {
  return SHUTTLE_DATA[type].cost;
}
export function hasHook(type: TattingShuttleType): boolean {
  return SHUTTLE_DATA[type].hasHook;
}
export function forBeginner(type: TattingShuttleType): boolean {
  return SHUTTLE_DATA[type].forBeginner;
}
export function bodyShape(type: TattingShuttleType): string {
  return SHUTTLE_DATA[type].bodyShape;
}
export function bestUse(type: TattingShuttleType): string {
  return SHUTTLE_DATA[type].bestUse;
}
export function tattingShuttles(): TattingShuttleType[] {
  return Object.keys(SHUTTLE_DATA) as TattingShuttleType[];
}
