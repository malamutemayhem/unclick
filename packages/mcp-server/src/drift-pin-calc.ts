// Drift pin calculator - timber/marine alignment and fastening pins

export type DriftPinType =
  | "steel_round_standard"
  | "tapered_align_draw"
  | "threaded_bolt_lock"
  | "copper_marine_resist"
  | "hardwood_treenail_peg";

const PIN_DATA: Record<
  DriftPinType,
  {
    alignForce: number;
    holdStrength: number;
    driveEase: number;
    corrosionResist: number;
    cost: number;
    tapered: boolean;
    forMarine: boolean;
    pinMaterial: string;
    bestUse: string;
  }
> = {
  steel_round_standard: {
    alignForce: 8,
    holdStrength: 8,
    driveEase: 7,
    corrosionResist: 5,
    cost: 3,
    tapered: false,
    forMarine: false,
    pinMaterial: "mild_steel_rod",
    bestUse: "general_beam_align",
  },
  tapered_align_draw: {
    alignForce: 10,
    holdStrength: 7,
    driveEase: 8,
    corrosionResist: 5,
    cost: 4,
    tapered: true,
    forMarine: false,
    pinMaterial: "tool_steel_taper",
    bestUse: "hole_align_draw_up",
  },
  threaded_bolt_lock: {
    alignForce: 7,
    holdStrength: 10,
    driveEase: 6,
    corrosionResist: 6,
    cost: 5,
    tapered: false,
    forMarine: false,
    pinMaterial: "grade8_bolt_steel",
    bestUse: "permanent_joint_lock",
  },
  copper_marine_resist: {
    alignForce: 7,
    holdStrength: 7,
    driveEase: 8,
    corrosionResist: 10,
    cost: 8,
    tapered: false,
    forMarine: true,
    pinMaterial: "silicon_bronze_rod",
    bestUse: "saltwater_hull_pin",
  },
  hardwood_treenail_peg: {
    alignForce: 5,
    holdStrength: 6,
    driveEase: 9,
    corrosionResist: 8,
    cost: 2,
    tapered: true,
    forMarine: true,
    pinMaterial: "locust_wood_peg",
    bestUse: "traditional_plank_fix",
  },
};

export function alignForce(type: DriftPinType): number {
  return PIN_DATA[type].alignForce;
}
export function holdStrength(type: DriftPinType): number {
  return PIN_DATA[type].holdStrength;
}
export function driveEase(type: DriftPinType): number {
  return PIN_DATA[type].driveEase;
}
export function corrosionResist(type: DriftPinType): number {
  return PIN_DATA[type].corrosionResist;
}
export function pinCost(type: DriftPinType): number {
  return PIN_DATA[type].cost;
}
export function tapered(type: DriftPinType): boolean {
  return PIN_DATA[type].tapered;
}
export function forMarine(type: DriftPinType): boolean {
  return PIN_DATA[type].forMarine;
}
export function pinMaterial(type: DriftPinType): string {
  return PIN_DATA[type].pinMaterial;
}
export function bestUse(type: DriftPinType): string {
  return PIN_DATA[type].bestUse;
}
export function driftPins(): DriftPinType[] {
  return Object.keys(PIN_DATA) as DriftPinType[];
}
