// Shuttle stick calculator - weaving loom shuttle tools

export type ShuttleStickType =
  | "boat_shuttle_roller"
  | "stick_shuttle_flat"
  | "rag_shuttle_wide"
  | "ski_shuttle_slim"
  | "end_feed_tension";

const SHUTTLE_DATA: Record<
  ShuttleStickType,
  {
    throwSpeed: number;
    weftControl: number;
    loadCapacity: number;
    handleBalance: number;
    cost: number;
    hasRoller: boolean;
    forRag: boolean;
    bodyShape: string;
    bestUse: string;
  }
> = {
  boat_shuttle_roller: {
    throwSpeed: 9,
    weftControl: 8,
    loadCapacity: 7,
    handleBalance: 9,
    cost: 6,
    hasRoller: true,
    forRag: false,
    bodyShape: "boat_hull_curved",
    bestUse: "fine_tabby_weave",
  },
  stick_shuttle_flat: {
    throwSpeed: 6,
    weftControl: 7,
    loadCapacity: 8,
    handleBalance: 7,
    cost: 2,
    hasRoller: false,
    forRag: false,
    bodyShape: "flat_notch_end",
    bestUse: "beginner_plain_weave",
  },
  rag_shuttle_wide: {
    throwSpeed: 5,
    weftControl: 6,
    loadCapacity: 10,
    handleBalance: 6,
    cost: 3,
    hasRoller: false,
    forRag: true,
    bodyShape: "wide_open_frame",
    bestUse: "rag_rug_weave",
  },
  ski_shuttle_slim: {
    throwSpeed: 10,
    weftControl: 7,
    loadCapacity: 5,
    handleBalance: 8,
    cost: 5,
    hasRoller: false,
    forRag: false,
    bodyShape: "slim_ski_taper",
    bestUse: "narrow_band_weave",
  },
  end_feed_tension: {
    throwSpeed: 8,
    weftControl: 10,
    loadCapacity: 6,
    handleBalance: 8,
    cost: 8,
    hasRoller: true,
    forRag: false,
    bodyShape: "tension_feed_body",
    bestUse: "even_selvedge_weave",
  },
};

export function throwSpeed(type: ShuttleStickType): number {
  return SHUTTLE_DATA[type].throwSpeed;
}
export function weftControl(type: ShuttleStickType): number {
  return SHUTTLE_DATA[type].weftControl;
}
export function loadCapacity(type: ShuttleStickType): number {
  return SHUTTLE_DATA[type].loadCapacity;
}
export function handleBalance(type: ShuttleStickType): number {
  return SHUTTLE_DATA[type].handleBalance;
}
export function shuttleCost(type: ShuttleStickType): number {
  return SHUTTLE_DATA[type].cost;
}
export function hasRoller(type: ShuttleStickType): boolean {
  return SHUTTLE_DATA[type].hasRoller;
}
export function forRag(type: ShuttleStickType): boolean {
  return SHUTTLE_DATA[type].forRag;
}
export function bodyShape(type: ShuttleStickType): string {
  return SHUTTLE_DATA[type].bodyShape;
}
export function bestUse(type: ShuttleStickType): string {
  return SHUTTLE_DATA[type].bestUse;
}
export function shuttleSticks(): ShuttleStickType[] {
  return Object.keys(SHUTTLE_DATA) as ShuttleStickType[];
}
