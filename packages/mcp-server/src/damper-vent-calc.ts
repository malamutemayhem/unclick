export type DamperVentType =
  | "top_vent_chimney"
  | "bottom_vent_intake"
  | "side_vent_cross"
  | "damper_plate_slide"
  | "powered_fan_force";

const specs: Record<DamperVentType, {
  airControl: number; heatEven: number; adjustEase: number;
  durability: number; cost: number; powered: boolean; topMount: boolean;
  ventStyle: string; use: string;
}> = {
  top_vent_chimney: {
    airControl: 85, heatEven: 82, adjustEase: 80,
    durability: 88, cost: 15, powered: false, topMount: true,
    ventStyle: "chimney_flue_vent", use: "general_exhaust_draw",
  },
  bottom_vent_intake: {
    airControl: 82, heatEven: 85, adjustEase: 82,
    durability: 85, cost: 12, powered: false, topMount: false,
    ventStyle: "floor_intake_port", use: "combustion_air_feed",
  },
  side_vent_cross: {
    airControl: 80, heatEven: 90, adjustEase: 78,
    durability: 82, cost: 18, powered: false, topMount: false,
    ventStyle: "cross_draft_port", use: "even_cross_draft",
  },
  damper_plate_slide: {
    airControl: 92, heatEven: 80, adjustEase: 88,
    durability: 90, cost: 20, powered: false, topMount: true,
    ventStyle: "sliding_plate_damper", use: "precise_draft_control",
  },
  powered_fan_force: {
    airControl: 95, heatEven: 88, adjustEase: 85,
    durability: 78, cost: 60, powered: true, topMount: false,
    ventStyle: "electric_blower_fan", use: "forced_air_kiln",
  },
};

export function airControl(t: DamperVentType): number { return specs[t].airControl; }
export function heatEven(t: DamperVentType): number { return specs[t].heatEven; }
export function adjustEase(t: DamperVentType): number { return specs[t].adjustEase; }
export function durability(t: DamperVentType): number { return specs[t].durability; }
export function ventCost(t: DamperVentType): number { return specs[t].cost; }
export function powered(t: DamperVentType): boolean { return specs[t].powered; }
export function topMount(t: DamperVentType): boolean { return specs[t].topMount; }
export function ventStyle(t: DamperVentType): string { return specs[t].ventStyle; }
export function bestUse(t: DamperVentType): string { return specs[t].use; }
export function damperVents(): DamperVentType[] { return Object.keys(specs) as DamperVentType[]; }
