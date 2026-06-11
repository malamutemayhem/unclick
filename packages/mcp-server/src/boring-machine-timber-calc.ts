// Boring machine timber calculator - timber framing boring machine tools

export type BoringMachineTimberType =
  | "hand_brace_ratchet"
  | "beam_boring_machine"
  | "electric_drill_modern"
  | "auger_bit_spiral"
  | "forstner_bit_flat";

const BORING_DATA: Record<
  BoringMachineTimberType,
  {
    holeClean: number;
    depthCapacity: number;
    alignAccuracy: number;
    speedBore: number;
    cost: number;
    powered: boolean;
    portable: boolean;
    driveMethod: string;
    bestUse: string;
  }
> = {
  hand_brace_ratchet: {
    holeClean: 8,
    depthCapacity: 7,
    alignAccuracy: 7,
    speedBore: 5,
    cost: 3,
    powered: false,
    portable: true,
    driveMethod: "hand_ratchet_sweep",
    bestUse: "general_peg_hole",
  },
  beam_boring_machine: {
    holeClean: 9,
    depthCapacity: 10,
    alignAccuracy: 10,
    speedBore: 7,
    cost: 8,
    powered: false,
    portable: false,
    driveMethod: "geared_crank_guide",
    bestUse: "deep_beam_bore",
  },
  electric_drill_modern: {
    holeClean: 7,
    depthCapacity: 8,
    alignAccuracy: 6,
    speedBore: 10,
    cost: 4,
    powered: true,
    portable: true,
    driveMethod: "electric_motor_chuck",
    bestUse: "fast_production_bore",
  },
  auger_bit_spiral: {
    holeClean: 9,
    depthCapacity: 9,
    alignAccuracy: 8,
    speedBore: 6,
    cost: 3,
    powered: false,
    portable: true,
    driveMethod: "t_handle_spiral",
    bestUse: "clean_deep_bore",
  },
  forstner_bit_flat: {
    holeClean: 10,
    depthCapacity: 6,
    alignAccuracy: 8,
    speedBore: 7,
    cost: 4,
    powered: false,
    portable: true,
    driveMethod: "brace_flat_center",
    bestUse: "flat_bottom_bore",
  },
};

export function holeClean(type: BoringMachineTimberType): number {
  return BORING_DATA[type].holeClean;
}
export function depthCapacity(type: BoringMachineTimberType): number {
  return BORING_DATA[type].depthCapacity;
}
export function alignAccuracy(type: BoringMachineTimberType): number {
  return BORING_DATA[type].alignAccuracy;
}
export function speedBore(type: BoringMachineTimberType): number {
  return BORING_DATA[type].speedBore;
}
export function boringCost(type: BoringMachineTimberType): number {
  return BORING_DATA[type].cost;
}
export function powered(type: BoringMachineTimberType): boolean {
  return BORING_DATA[type].powered;
}
export function portable(type: BoringMachineTimberType): boolean {
  return BORING_DATA[type].portable;
}
export function driveMethod(type: BoringMachineTimberType): string {
  return BORING_DATA[type].driveMethod;
}
export function bestUse(type: BoringMachineTimberType): string {
  return BORING_DATA[type].bestUse;
}
export function boringMachineTimbers(): BoringMachineTimberType[] {
  return Object.keys(BORING_DATA) as BoringMachineTimberType[];
}
