// Tabby pick calculator - weaving plain weave pick tools

export type TabbyPickType =
  | "flat_pick_stick"
  | "sword_beater_edge"
  | "belt_pick_narrow"
  | "inkle_pick_card"
  | "backstrap_shed_bar";

const TABBY_DATA: Record<
  TabbyPickType,
  {
    pickSpeed: number;
    weftPlace: number;
    shedClear: number;
    handleEase: number;
    cost: number;
    doubleUse: boolean;
    forBelt: boolean;
    pickShape: string;
    bestUse: string;
  }
> = {
  flat_pick_stick: {
    pickSpeed: 7,
    weftPlace: 8,
    shedClear: 8,
    handleEase: 8,
    cost: 3,
    doubleUse: true,
    forBelt: false,
    pickShape: "flat_tapered_end",
    bestUse: "general_tabby_pick",
  },
  sword_beater_edge: {
    pickSpeed: 8,
    weftPlace: 7,
    shedClear: 9,
    handleEase: 7,
    cost: 5,
    doubleUse: true,
    forBelt: false,
    pickShape: "sword_blade_edge",
    bestUse: "backstrap_beat_pick",
  },
  belt_pick_narrow: {
    pickSpeed: 9,
    weftPlace: 8,
    shedClear: 7,
    handleEase: 9,
    cost: 3,
    doubleUse: false,
    forBelt: true,
    pickShape: "narrow_point_tip",
    bestUse: "inkle_belt_weave",
  },
  inkle_pick_card: {
    pickSpeed: 8,
    weftPlace: 9,
    shedClear: 6,
    handleEase: 8,
    cost: 2,
    doubleUse: false,
    forBelt: true,
    pickShape: "card_flat_edge",
    bestUse: "card_weave_pick",
  },
  backstrap_shed_bar: {
    pickSpeed: 6,
    weftPlace: 7,
    shedClear: 10,
    handleEase: 6,
    cost: 4,
    doubleUse: true,
    forBelt: false,
    pickShape: "round_bar_smooth",
    bestUse: "backstrap_shed_open",
  },
};

export function pickSpeed(type: TabbyPickType): number {
  return TABBY_DATA[type].pickSpeed;
}
export function weftPlace(type: TabbyPickType): number {
  return TABBY_DATA[type].weftPlace;
}
export function shedClear(type: TabbyPickType): number {
  return TABBY_DATA[type].shedClear;
}
export function handleEase(type: TabbyPickType): number {
  return TABBY_DATA[type].handleEase;
}
export function tabbyPickCost(type: TabbyPickType): number {
  return TABBY_DATA[type].cost;
}
export function doubleUse(type: TabbyPickType): boolean {
  return TABBY_DATA[type].doubleUse;
}
export function forBelt(type: TabbyPickType): boolean {
  return TABBY_DATA[type].forBelt;
}
export function pickShape(type: TabbyPickType): string {
  return TABBY_DATA[type].pickShape;
}
export function bestUse(type: TabbyPickType): string {
  return TABBY_DATA[type].bestUse;
}
export function tabbyPicks(): TabbyPickType[] {
  return Object.keys(TABBY_DATA) as TabbyPickType[];
}
