// Slip trail calculator - pottery slip trailing decoration tools

export type SlipTrailType =
  | "bulb_squeeze_rubber"
  | "bottle_tip_plastic"
  | "syringe_fine_needle"
  | "bag_cone_pastry"
  | "pump_action_press";

const TRAIL_DATA: Record<
  SlipTrailType,
  {
    lineFineness: number;
    flowControl: number;
    handComfort: number;
    capacity: number;
    cost: number;
    refillable: boolean;
    forFine: boolean;
    tipSize: string;
    bestUse: string;
  }
> = {
  bulb_squeeze_rubber: {
    lineFineness: 6,
    flowControl: 7,
    handComfort: 8,
    capacity: 7,
    cost: 3,
    refillable: true,
    forFine: false,
    tipSize: "medium_round_nozzle",
    bestUse: "general_slip_dot",
  },
  bottle_tip_plastic: {
    lineFineness: 7,
    flowControl: 8,
    handComfort: 7,
    capacity: 8,
    cost: 2,
    refillable: true,
    forFine: false,
    tipSize: "swap_tip_set",
    bestUse: "medium_line_trail",
  },
  syringe_fine_needle: {
    lineFineness: 10,
    flowControl: 9,
    handComfort: 5,
    capacity: 3,
    cost: 4,
    refillable: true,
    forFine: true,
    tipSize: "needle_gauge_fine",
    bestUse: "hairline_detail_work",
  },
  bag_cone_pastry: {
    lineFineness: 4,
    flowControl: 5,
    handComfort: 6,
    capacity: 10,
    cost: 1,
    refillable: false,
    forFine: false,
    tipSize: "cut_tip_variable",
    bestUse: "large_volume_coat",
  },
  pump_action_press: {
    lineFineness: 6,
    flowControl: 6,
    handComfort: 9,
    capacity: 6,
    cost: 6,
    refillable: true,
    forFine: false,
    tipSize: "piston_push_nozzle",
    bestUse: "consistent_bead_line",
  },
};

export function lineFineness(type: SlipTrailType): number {
  return TRAIL_DATA[type].lineFineness;
}
export function flowControl(type: SlipTrailType): number {
  return TRAIL_DATA[type].flowControl;
}
export function handComfort(type: SlipTrailType): number {
  return TRAIL_DATA[type].handComfort;
}
export function capacity(type: SlipTrailType): number {
  return TRAIL_DATA[type].capacity;
}
export function trailCost(type: SlipTrailType): number {
  return TRAIL_DATA[type].cost;
}
export function refillable(type: SlipTrailType): boolean {
  return TRAIL_DATA[type].refillable;
}
export function forFine(type: SlipTrailType): boolean {
  return TRAIL_DATA[type].forFine;
}
export function tipSize(type: SlipTrailType): string {
  return TRAIL_DATA[type].tipSize;
}
export function bestUse(type: SlipTrailType): string {
  return TRAIL_DATA[type].bestUse;
}
export function slipTrails(): SlipTrailType[] {
  return Object.keys(TRAIL_DATA) as SlipTrailType[];
}
