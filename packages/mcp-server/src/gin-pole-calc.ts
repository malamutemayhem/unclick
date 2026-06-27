// Gin pole calculator - timber framing lifting/raising poles

export type GinPoleType =
  | "wood_mast_standard"
  | "steel_tube_telescopic"
  | "aluminum_light_portable"
  | "bamboo_lash_field"
  | "tripod_spread_stable";

const POLE_DATA: Record<
  GinPoleType,
  {
    liftCapacity: number;
    setupSpeed: number;
    portability: number;
    stability: number;
    cost: number;
    telescopic: boolean;
    forHeavy: boolean;
    poleLength: string;
    bestUse: string;
  }
> = {
  wood_mast_standard: {
    liftCapacity: 8,
    setupSpeed: 6,
    portability: 5,
    stability: 8,
    cost: 4,
    telescopic: false,
    forHeavy: true,
    poleLength: "twenty_foot_solid",
    bestUse: "timber_frame_raise",
  },
  steel_tube_telescopic: {
    liftCapacity: 10,
    setupSpeed: 7,
    portability: 6,
    stability: 9,
    cost: 8,
    telescopic: true,
    forHeavy: true,
    poleLength: "thirty_foot_extend",
    bestUse: "heavy_beam_hoist",
  },
  aluminum_light_portable: {
    liftCapacity: 6,
    setupSpeed: 9,
    portability: 10,
    stability: 6,
    cost: 7,
    telescopic: true,
    forHeavy: false,
    poleLength: "fifteen_foot_fold",
    bestUse: "light_mast_erect",
  },
  bamboo_lash_field: {
    liftCapacity: 5,
    setupSpeed: 8,
    portability: 7,
    stability: 5,
    cost: 2,
    telescopic: false,
    forHeavy: false,
    poleLength: "twelve_foot_lash",
    bestUse: "field_camp_lift",
  },
  tripod_spread_stable: {
    liftCapacity: 9,
    setupSpeed: 5,
    portability: 4,
    stability: 10,
    cost: 9,
    telescopic: false,
    forHeavy: true,
    poleLength: "eighteen_foot_tri",
    bestUse: "centered_load_lift",
  },
};

export function liftCapacity(type: GinPoleType): number {
  return POLE_DATA[type].liftCapacity;
}
export function setupSpeed(type: GinPoleType): number {
  return POLE_DATA[type].setupSpeed;
}
export function portability(type: GinPoleType): number {
  return POLE_DATA[type].portability;
}
export function stability(type: GinPoleType): number {
  return POLE_DATA[type].stability;
}
export function poleCost(type: GinPoleType): number {
  return POLE_DATA[type].cost;
}
export function telescopic(type: GinPoleType): boolean {
  return POLE_DATA[type].telescopic;
}
export function forHeavy(type: GinPoleType): boolean {
  return POLE_DATA[type].forHeavy;
}
export function poleLength(type: GinPoleType): string {
  return POLE_DATA[type].poleLength;
}
export function bestUse(type: GinPoleType): string {
  return POLE_DATA[type].bestUse;
}
export function ginPoles(): GinPoleType[] {
  return Object.keys(POLE_DATA) as GinPoleType[];
}
