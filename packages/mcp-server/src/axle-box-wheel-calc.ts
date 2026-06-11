export type AxleBoxWheelType =
  | "cast_iron_standard"
  | "bronze_bearing_heavy"
  | "lignum_vitae_wooden"
  | "roller_bearing_modern"
  | "split_box_adjustable";

const specs: Record<AxleBoxWheelType, {
  frictionLow: number; loadCapacity: number; wearLife: number;
  adjustEase: number; cost: number; adjustable: boolean; forHeavy: boolean;
  bearingType: string; use: string;
}> = {
  cast_iron_standard: {
    frictionLow: 70, loadCapacity: 78, wearLife: 72,
    adjustEase: 60, cost: 40, adjustable: false, forHeavy: false,
    bearingType: "plain_cast_sleeve", use: "general_cart_axle",
  },
  bronze_bearing_heavy: {
    frictionLow: 82, loadCapacity: 92, wearLife: 88,
    adjustEase: 55, cost: 90, adjustable: false, forHeavy: true,
    bearingType: "bronze_sleeve_bearing", use: "heavy_wagon_axle",
  },
  lignum_vitae_wooden: {
    frictionLow: 75, loadCapacity: 65, wearLife: 60,
    adjustEase: 70, cost: 30, adjustable: false, forHeavy: false,
    bearingType: "self_lubricant_wood", use: "light_carriage_axle",
  },
  roller_bearing_modern: {
    frictionLow: 95, loadCapacity: 88, wearLife: 90,
    adjustEase: 65, cost: 150, adjustable: false, forHeavy: true,
    bearingType: "tapered_roller_set", use: "modern_wheel_bearing",
  },
  split_box_adjustable: {
    frictionLow: 72, loadCapacity: 75, wearLife: 68,
    adjustEase: 95, cost: 55, adjustable: true, forHeavy: false,
    bearingType: "split_cap_adjust", use: "adjustable_wear_box",
  },
};

export function frictionLow(t: AxleBoxWheelType): number { return specs[t].frictionLow; }
export function loadCapacity(t: AxleBoxWheelType): number { return specs[t].loadCapacity; }
export function wearLife(t: AxleBoxWheelType): number { return specs[t].wearLife; }
export function adjustEase(t: AxleBoxWheelType): number { return specs[t].adjustEase; }
export function boxCost(t: AxleBoxWheelType): number { return specs[t].cost; }
export function adjustable(t: AxleBoxWheelType): boolean { return specs[t].adjustable; }
export function forHeavy(t: AxleBoxWheelType): boolean { return specs[t].forHeavy; }
export function bearingType(t: AxleBoxWheelType): string { return specs[t].bearingType; }
export function bestUse(t: AxleBoxWheelType): string { return specs[t].use; }
export function axleBoxWheels(): AxleBoxWheelType[] { return Object.keys(specs) as AxleBoxWheelType[]; }
