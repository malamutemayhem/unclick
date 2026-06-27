// Saggar box calculator - pottery kiln firing enclosure tools

export type SaggarBoxType =
  | "clay_round_traditional"
  | "fiber_blanket_wrap"
  | "steel_canister_reuse"
  | "foil_saggar_disposable"
  | "brick_chamber_custom";

const SAGGAR_DATA: Record<
  SaggarBoxType,
  {
    sealTight: number;
    heatEven: number;
    fumeContain: number;
    reuseLife: number;
    cost: number;
    reusable: boolean;
    forRaku: boolean;
    wallType: string;
    bestUse: string;
  }
> = {
  clay_round_traditional: {
    sealTight: 9,
    heatEven: 9,
    fumeContain: 9,
    reuseLife: 8,
    cost: 6,
    reusable: true,
    forRaku: false,
    wallType: "thick_clay_wall",
    bestUse: "soda_salt_fire",
  },
  fiber_blanket_wrap: {
    sealTight: 6,
    heatEven: 7,
    fumeContain: 7,
    reuseLife: 5,
    cost: 3,
    reusable: false,
    forRaku: true,
    wallType: "ceramic_fiber_wrap",
    bestUse: "raku_reduction_wrap",
  },
  steel_canister_reuse: {
    sealTight: 8,
    heatEven: 7,
    fumeContain: 8,
    reuseLife: 7,
    cost: 4,
    reusable: true,
    forRaku: true,
    wallType: "steel_can_wall",
    bestUse: "pit_fire_canister",
  },
  foil_saggar_disposable: {
    sealTight: 7,
    heatEven: 6,
    fumeContain: 6,
    reuseLife: 3,
    cost: 2,
    reusable: false,
    forRaku: false,
    wallType: "aluminum_foil_layer",
    bestUse: "quick_fume_test",
  },
  brick_chamber_custom: {
    sealTight: 10,
    heatEven: 10,
    fumeContain: 10,
    reuseLife: 10,
    cost: 8,
    reusable: true,
    forRaku: false,
    wallType: "fire_brick_chamber",
    bestUse: "permanent_saggar_kiln",
  },
};

export function sealTight(type: SaggarBoxType): number {
  return SAGGAR_DATA[type].sealTight;
}
export function heatEven(type: SaggarBoxType): number {
  return SAGGAR_DATA[type].heatEven;
}
export function fumeContain(type: SaggarBoxType): number {
  return SAGGAR_DATA[type].fumeContain;
}
export function reuseLife(type: SaggarBoxType): number {
  return SAGGAR_DATA[type].reuseLife;
}
export function saggarCost(type: SaggarBoxType): number {
  return SAGGAR_DATA[type].cost;
}
export function reusable(type: SaggarBoxType): boolean {
  return SAGGAR_DATA[type].reusable;
}
export function forRaku(type: SaggarBoxType): boolean {
  return SAGGAR_DATA[type].forRaku;
}
export function wallType(type: SaggarBoxType): string {
  return SAGGAR_DATA[type].wallType;
}
export function bestUse(type: SaggarBoxType): string {
  return SAGGAR_DATA[type].bestUse;
}
export function saggarBoxes(): SaggarBoxType[] {
  return Object.keys(SAGGAR_DATA) as SaggarBoxType[];
}
