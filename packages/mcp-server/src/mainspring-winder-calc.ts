// Mainspring winder calculator - clockmaking spring installation tools

export type MainspringWinderType =
  | "barrel_arbor_manual"
  | "bench_key_lever"
  | "universal_set_multi"
  | "automatic_power_feed"
  | "let_down_clamp_safe";

const WINDER_DATA: Record<
  MainspringWinderType,
  {
    windControl: number;
    springSafe: number;
    sizeRange: number;
    speedWind: number;
    cost: number;
    powered: boolean;
    forLetDown: boolean;
    clampType: string;
    bestUse: string;
  }
> = {
  barrel_arbor_manual: {
    windControl: 8,
    springSafe: 7,
    sizeRange: 5,
    speedWind: 6,
    cost: 4,
    powered: false,
    forLetDown: false,
    clampType: "arbor_pin_grip",
    bestUse: "single_barrel_wind",
  },
  bench_key_lever: {
    windControl: 7,
    springSafe: 8,
    sizeRange: 6,
    speedWind: 7,
    cost: 3,
    powered: false,
    forLetDown: false,
    clampType: "square_key_socket",
    bestUse: "clock_key_wind",
  },
  universal_set_multi: {
    windControl: 8,
    springSafe: 8,
    sizeRange: 10,
    speedWind: 7,
    cost: 7,
    powered: false,
    forLetDown: false,
    clampType: "interchangeable_cone",
    bestUse: "all_size_mainspring",
  },
  automatic_power_feed: {
    windControl: 9,
    springSafe: 9,
    sizeRange: 8,
    speedWind: 10,
    cost: 9,
    powered: true,
    forLetDown: false,
    clampType: "motor_feed_chuck",
    bestUse: "production_wind_batch",
  },
  let_down_clamp_safe: {
    windControl: 10,
    springSafe: 10,
    sizeRange: 7,
    speedWind: 5,
    cost: 5,
    powered: false,
    forLetDown: true,
    clampType: "safety_brake_clamp",
    bestUse: "controlled_let_down",
  },
};

export function windControl(type: MainspringWinderType): number {
  return WINDER_DATA[type].windControl;
}
export function springSafe(type: MainspringWinderType): number {
  return WINDER_DATA[type].springSafe;
}
export function sizeRange(type: MainspringWinderType): number {
  return WINDER_DATA[type].sizeRange;
}
export function speedWind(type: MainspringWinderType): number {
  return WINDER_DATA[type].speedWind;
}
export function winderCost(type: MainspringWinderType): number {
  return WINDER_DATA[type].cost;
}
export function powered(type: MainspringWinderType): boolean {
  return WINDER_DATA[type].powered;
}
export function forLetDown(type: MainspringWinderType): boolean {
  return WINDER_DATA[type].forLetDown;
}
export function clampType(type: MainspringWinderType): string {
  return WINDER_DATA[type].clampType;
}
export function bestUse(type: MainspringWinderType): string {
  return WINDER_DATA[type].bestUse;
}
export function mainspringWinders(): MainspringWinderType[] {
  return Object.keys(WINDER_DATA) as MainspringWinderType[];
}
