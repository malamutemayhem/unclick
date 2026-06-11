export type JewelPressType =
  | "hand_press_standard"
  | "lever_press_heavy"
  | "screw_press_precise"
  | "pneumatic_press_power"
  | "micro_press_delicate";

const specs: Record<JewelPressType, {
  pressForce: number; alignAccuracy: number; controlFine: number;
  jewelRange: number; cost: number; powered: boolean; forDelicate: boolean;
  ramStyle: string; use: string;
}> = {
  hand_press_standard: {
    pressForce: 72, alignAccuracy: 80, controlFine: 78,
    jewelRange: 75, cost: 60, powered: false, forDelicate: false,
    ramStyle: "direct_push_ram", use: "general_jewel_set",
  },
  lever_press_heavy: {
    pressForce: 90, alignAccuracy: 75, controlFine: 70,
    jewelRange: 80, cost: 120, powered: false, forDelicate: false,
    ramStyle: "lever_multiply_ram", use: "tight_jewel_press",
  },
  screw_press_precise: {
    pressForce: 82, alignAccuracy: 92, controlFine: 90,
    jewelRange: 72, cost: 150, powered: false, forDelicate: false,
    ramStyle: "fine_thread_screw", use: "precise_jewel_seat",
  },
  pneumatic_press_power: {
    pressForce: 95, alignAccuracy: 78, controlFine: 65,
    jewelRange: 88, cost: 400, powered: true, forDelicate: false,
    ramStyle: "air_piston_ram", use: "production_jewel_press",
  },
  micro_press_delicate: {
    pressForce: 55, alignAccuracy: 95, controlFine: 95,
    jewelRange: 60, cost: 200, powered: false, forDelicate: true,
    ramStyle: "spring_micro_ram", use: "delicate_jewel_place",
  },
};

export function pressForce(t: JewelPressType): number { return specs[t].pressForce; }
export function alignAccuracy(t: JewelPressType): number { return specs[t].alignAccuracy; }
export function controlFine(t: JewelPressType): number { return specs[t].controlFine; }
export function jewelRange(t: JewelPressType): number { return specs[t].jewelRange; }
export function pressCost(t: JewelPressType): number { return specs[t].cost; }
export function powered(t: JewelPressType): boolean { return specs[t].powered; }
export function forDelicate(t: JewelPressType): boolean { return specs[t].forDelicate; }
export function ramStyle(t: JewelPressType): string { return specs[t].ramStyle; }
export function bestUse(t: JewelPressType): string { return specs[t].use; }
export function jewelPresses(): JewelPressType[] { return Object.keys(specs) as JewelPressType[]; }
