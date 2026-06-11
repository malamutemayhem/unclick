// Flaring tool calculator - plumbing tube flaring/forming tools

export type FlaringToolType =
  | "single_flare_cone"
  | "double_flare_brake"
  | "spin_flare_drill"
  | "hydraulic_press_set"
  | "eccentric_cam_quick";

const FLARING_DATA: Record<
  FlaringToolType,
  {
    flareSmooth: number;
    concentricity: number;
    speedForm: number;
    tubeRange: number;
    cost: number;
    powered: boolean;
    forBrake: boolean;
    dieType: string;
    bestUse: string;
  }
> = {
  single_flare_cone: {
    flareSmooth: 7,
    concentricity: 7,
    speedForm: 8,
    tubeRange: 6,
    cost: 3,
    powered: false,
    forBrake: false,
    dieType: "cone_press_die",
    bestUse: "basic_copper_flare",
  },
  double_flare_brake: {
    flareSmooth: 9,
    concentricity: 9,
    speedForm: 6,
    tubeRange: 7,
    cost: 5,
    powered: false,
    forBrake: true,
    dieType: "two_stage_fold",
    bestUse: "brake_line_double",
  },
  spin_flare_drill: {
    flareSmooth: 8,
    concentricity: 8,
    speedForm: 9,
    tubeRange: 5,
    cost: 6,
    powered: true,
    forBrake: false,
    dieType: "rotating_mandrel",
    bestUse: "rapid_service_flare",
  },
  hydraulic_press_set: {
    flareSmooth: 10,
    concentricity: 10,
    speedForm: 7,
    tubeRange: 9,
    cost: 9,
    powered: true,
    forBrake: true,
    dieType: "hydraulic_ram_die",
    bestUse: "precision_alloy_flare",
  },
  eccentric_cam_quick: {
    flareSmooth: 7,
    concentricity: 7,
    speedForm: 10,
    tubeRange: 6,
    cost: 4,
    powered: false,
    forBrake: false,
    dieType: "cam_lever_press",
    bestUse: "field_quick_flare",
  },
};

export function flareSmooth(type: FlaringToolType): number {
  return FLARING_DATA[type].flareSmooth;
}
export function concentricity(type: FlaringToolType): number {
  return FLARING_DATA[type].concentricity;
}
export function speedForm(type: FlaringToolType): number {
  return FLARING_DATA[type].speedForm;
}
export function tubeRange(type: FlaringToolType): number {
  return FLARING_DATA[type].tubeRange;
}
export function flaringCost(type: FlaringToolType): number {
  return FLARING_DATA[type].cost;
}
export function powered(type: FlaringToolType): boolean {
  return FLARING_DATA[type].powered;
}
export function forBrake(type: FlaringToolType): boolean {
  return FLARING_DATA[type].forBrake;
}
export function dieType(type: FlaringToolType): string {
  return FLARING_DATA[type].dieType;
}
export function bestUse(type: FlaringToolType): string {
  return FLARING_DATA[type].bestUse;
}
export function flaringTools(): FlaringToolType[] {
  return Object.keys(FLARING_DATA) as FlaringToolType[];
}
