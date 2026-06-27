export type CannonPinionType =
  | "friction_fit_standard"
  | "spring_loaded_adjust"
  | "press_fit_tight"
  | "split_sleeve_flex"
  | "precision_ground_fine";

const specs: Record<CannonPinionType, {
  frictionHold: number; setAccuracy: number; adjustEase: number;
  wearLife: number; cost: number; adjustable: boolean; splitDesign: boolean;
  fitMethod: string; use: string;
}> = {
  friction_fit_standard: {
    frictionHold: 78, setAccuracy: 75, adjustEase: 82,
    wearLife: 70, cost: 15, adjustable: false, splitDesign: false,
    fitMethod: "interference_press", use: "general_hand_drive",
  },
  spring_loaded_adjust: {
    frictionHold: 85, setAccuracy: 80, adjustEase: 90,
    wearLife: 82, cost: 35, adjustable: true, splitDesign: false,
    fitMethod: "spring_tension_hold", use: "adjustable_hand_set",
  },
  press_fit_tight: {
    frictionHold: 92, setAccuracy: 72, adjustEase: 55,
    wearLife: 88, cost: 20, adjustable: false, splitDesign: false,
    fitMethod: "heavy_press_lock", use: "secure_hand_drive",
  },
  split_sleeve_flex: {
    frictionHold: 80, setAccuracy: 85, adjustEase: 88,
    wearLife: 75, cost: 25, adjustable: false, splitDesign: true,
    fitMethod: "split_flex_grip", use: "easy_replace_pinion",
  },
  precision_ground_fine: {
    frictionHold: 88, setAccuracy: 95, adjustEase: 65,
    wearLife: 90, cost: 50, adjustable: false, splitDesign: false,
    fitMethod: "ground_taper_fit", use: "chronometer_hand_drive",
  },
};

export function frictionHold(t: CannonPinionType): number { return specs[t].frictionHold; }
export function setAccuracy(t: CannonPinionType): number { return specs[t].setAccuracy; }
export function adjustEase(t: CannonPinionType): number { return specs[t].adjustEase; }
export function wearLife(t: CannonPinionType): number { return specs[t].wearLife; }
export function pinionCost(t: CannonPinionType): number { return specs[t].cost; }
export function adjustable(t: CannonPinionType): boolean { return specs[t].adjustable; }
export function splitDesign(t: CannonPinionType): boolean { return specs[t].splitDesign; }
export function fitMethod(t: CannonPinionType): string { return specs[t].fitMethod; }
export function bestUse(t: CannonPinionType): string { return specs[t].use; }
export function cannonPinions(): CannonPinionType[] { return Object.keys(specs) as CannonPinionType[]; }
