export type EnamelKilnType =
  | "front_load_standard"
  | "top_load_compact"
  | "muffle_kiln_even"
  | "micro_kiln_small"
  | "programmable_kiln_auto";

const specs: Record<EnamelKilnType, {
  heatEven: number; tempAccuracy: number; loadCapacity: number;
  spaceCompact: number; cost: number; programmable: boolean; topLoad: boolean;
  chamberStyle: string; use: string;
}> = {
  front_load_standard: {
    heatEven: 88, tempAccuracy: 85, loadCapacity: 90,
    spaceCompact: 72, cost: 10, programmable: false, topLoad: false,
    chamberStyle: "front_door_brick_box", use: "general_enamel_fire",
  },
  top_load_compact: {
    heatEven: 82, tempAccuracy: 80, loadCapacity: 78,
    spaceCompact: 88, cost: 7, programmable: false, topLoad: true,
    chamberStyle: "top_open_cylinder", use: "compact_studio_fire",
  },
  muffle_kiln_even: {
    heatEven: 95, tempAccuracy: 90, loadCapacity: 85,
    spaceCompact: 70, cost: 14, programmable: false, topLoad: false,
    chamberStyle: "enclosed_muffle_box", use: "even_heat_precision",
  },
  micro_kiln_small: {
    heatEven: 78, tempAccuracy: 75, loadCapacity: 65,
    spaceCompact: 95, cost: 5, programmable: false, topLoad: true,
    chamberStyle: "tiny_torch_chamber", use: "small_piece_quick_fire",
  },
  programmable_kiln_auto: {
    heatEven: 90, tempAccuracy: 95, loadCapacity: 88,
    spaceCompact: 75, cost: 16, programmable: true, topLoad: false,
    chamberStyle: "digital_control_box", use: "automated_ramp_soak",
  },
};

export function heatEven(t: EnamelKilnType): number { return specs[t].heatEven; }
export function tempAccuracy(t: EnamelKilnType): number { return specs[t].tempAccuracy; }
export function loadCapacity(t: EnamelKilnType): number { return specs[t].loadCapacity; }
export function spaceCompact(t: EnamelKilnType): number { return specs[t].spaceCompact; }
export function kilnCost(t: EnamelKilnType): number { return specs[t].cost; }
export function programmable(t: EnamelKilnType): boolean { return specs[t].programmable; }
export function topLoad(t: EnamelKilnType): boolean { return specs[t].topLoad; }
export function chamberStyle(t: EnamelKilnType): string { return specs[t].chamberStyle; }
export function bestUse(t: EnamelKilnType): string { return specs[t].use; }
export function enamelKilns(): EnamelKilnType[] { return Object.keys(specs) as EnamelKilnType[]; }
