export type PickerStickType =
  | "leather_tip_standard"
  | "rubber_tip_quiet"
  | "nylon_tip_durable"
  | "adjustable_weight_set"
  | "buffer_spring_soft";

const specs: Record<PickerStickType, {
  throwForce: number; noiseQuiet: number; durability: number;
  adjustRange: number; cost: number; adjustable: boolean; springBuffer: boolean;
  tipMaterial: string; use: string;
}> = {
  leather_tip_standard: {
    throwForce: 85, noiseQuiet: 78, durability: 80,
    adjustRange: 75, cost: 15, adjustable: false, springBuffer: false,
    tipMaterial: "leather_pad_tip", use: "general_shuttle_throw",
  },
  rubber_tip_quiet: {
    throwForce: 80, noiseQuiet: 92, durability: 82,
    adjustRange: 78, cost: 18, adjustable: false, springBuffer: false,
    tipMaterial: "rubber_cushion_tip", use: "quiet_studio_throw",
  },
  nylon_tip_durable: {
    throwForce: 82, noiseQuiet: 80, durability: 92,
    adjustRange: 78, cost: 20, adjustable: false, springBuffer: false,
    tipMaterial: "nylon_hard_tip", use: "heavy_use_throw",
  },
  adjustable_weight_set: {
    throwForce: 88, noiseQuiet: 75, durability: 85,
    adjustRange: 95, cost: 30, adjustable: true, springBuffer: false,
    tipMaterial: "weighted_leather_tip", use: "variable_force_throw",
  },
  buffer_spring_soft: {
    throwForce: 78, noiseQuiet: 88, durability: 78,
    adjustRange: 82, cost: 25, adjustable: false, springBuffer: true,
    tipMaterial: "spring_cushion_tip", use: "gentle_delicate_throw",
  },
};

export function throwForce(t: PickerStickType): number { return specs[t].throwForce; }
export function noiseQuiet(t: PickerStickType): number { return specs[t].noiseQuiet; }
export function durability(t: PickerStickType): number { return specs[t].durability; }
export function adjustRange(t: PickerStickType): number { return specs[t].adjustRange; }
export function stickCost(t: PickerStickType): number { return specs[t].cost; }
export function adjustable(t: PickerStickType): boolean { return specs[t].adjustable; }
export function springBuffer(t: PickerStickType): boolean { return specs[t].springBuffer; }
export function tipMaterial(t: PickerStickType): string { return specs[t].tipMaterial; }
export function bestUse(t: PickerStickType): string { return specs[t].use; }
export function pickerSticks(): PickerStickType[] { return Object.keys(specs) as PickerStickType[]; }
