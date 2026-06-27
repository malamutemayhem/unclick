// Pirn winder calculator - weaving bobbin/pirn winding tools

export type PirnWindType =
  | "hand_spindle_wind"
  | "table_clamp_crank"
  | "electric_motor_auto"
  | "double_end_pair"
  | "cone_wind_transfer";

const PIRN_DATA: Record<
  PirnWindType,
  {
    windEven: number;
    tensionControl: number;
    speedWind: number;
    pirnRange: number;
    cost: number;
    powered: boolean;
    forCone: boolean;
    driveMethod: string;
    bestUse: string;
  }
> = {
  hand_spindle_wind: {
    windEven: 6,
    tensionControl: 7,
    speedWind: 4,
    pirnRange: 5,
    cost: 2,
    powered: false,
    forCone: false,
    driveMethod: "hand_twist_spindle",
    bestUse: "small_batch_pirn",
  },
  table_clamp_crank: {
    windEven: 8,
    tensionControl: 8,
    speedWind: 7,
    pirnRange: 7,
    cost: 4,
    powered: false,
    forCone: false,
    driveMethod: "hand_crank_gear",
    bestUse: "general_pirn_wind",
  },
  electric_motor_auto: {
    windEven: 9,
    tensionControl: 9,
    speedWind: 10,
    pirnRange: 8,
    cost: 8,
    powered: true,
    forCone: false,
    driveMethod: "electric_motor_belt",
    bestUse: "production_pirn_wind",
  },
  double_end_pair: {
    windEven: 8,
    tensionControl: 8,
    speedWind: 8,
    pirnRange: 6,
    cost: 6,
    powered: false,
    forCone: false,
    driveMethod: "dual_spindle_crank",
    bestUse: "two_pirn_batch",
  },
  cone_wind_transfer: {
    windEven: 7,
    tensionControl: 9,
    speedWind: 7,
    pirnRange: 9,
    cost: 5,
    powered: false,
    forCone: true,
    driveMethod: "cone_adapter_crank",
    bestUse: "cone_to_pirn_transfer",
  },
};

export function windEven(type: PirnWindType): number {
  return PIRN_DATA[type].windEven;
}
export function tensionControl(type: PirnWindType): number {
  return PIRN_DATA[type].tensionControl;
}
export function speedWind(type: PirnWindType): number {
  return PIRN_DATA[type].speedWind;
}
export function pirnRange(type: PirnWindType): number {
  return PIRN_DATA[type].pirnRange;
}
export function pirnCost(type: PirnWindType): number {
  return PIRN_DATA[type].cost;
}
export function powered(type: PirnWindType): boolean {
  return PIRN_DATA[type].powered;
}
export function forCone(type: PirnWindType): boolean {
  return PIRN_DATA[type].forCone;
}
export function driveMethod(type: PirnWindType): string {
  return PIRN_DATA[type].driveMethod;
}
export function bestUse(type: PirnWindType): string {
  return PIRN_DATA[type].bestUse;
}
export function pirnWinders(): PirnWindType[] {
  return Object.keys(PIRN_DATA) as PirnWindType[];
}
