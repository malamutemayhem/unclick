export type ClickSpringType =
  | "flat_spring_standard"
  | "coil_spring_round"
  | "hairpin_spring_fold"
  | "leaf_spring_curved"
  | "wire_spring_form";

const specs: Record<ClickSpringType, {
  clickForce: number; returnSnap: number; wearLife: number;
  fitEase: number; cost: number; coiled: boolean; forBarrel: boolean;
  springShape: string; use: string;
}> = {
  flat_spring_standard: {
    clickForce: 80, returnSnap: 82, wearLife: 75,
    fitEase: 85, cost: 10, coiled: false, forBarrel: false,
    springShape: "flat_bent_tab", use: "general_click_hold",
  },
  coil_spring_round: {
    clickForce: 75, returnSnap: 88, wearLife: 82,
    fitEase: 72, cost: 12, coiled: true, forBarrel: false,
    springShape: "helical_coil_wire", use: "compact_click_return",
  },
  hairpin_spring_fold: {
    clickForce: 68, returnSnap: 78, wearLife: 70,
    fitEase: 90, cost: 8, coiled: false, forBarrel: false,
    springShape: "folded_hairpin_bend", use: "simple_click_detent",
  },
  leaf_spring_curved: {
    clickForce: 88, returnSnap: 85, wearLife: 80,
    fitEase: 75, cost: 15, coiled: false, forBarrel: true,
    springShape: "curved_leaf_arc", use: "barrel_ratchet_click",
  },
  wire_spring_form: {
    clickForce: 72, returnSnap: 80, wearLife: 78,
    fitEase: 82, cost: 10, coiled: false, forBarrel: false,
    springShape: "formed_wire_bend", use: "custom_click_shape",
  },
};

export function clickForce(t: ClickSpringType): number { return specs[t].clickForce; }
export function returnSnap(t: ClickSpringType): number { return specs[t].returnSnap; }
export function wearLife(t: ClickSpringType): number { return specs[t].wearLife; }
export function fitEase(t: ClickSpringType): number { return specs[t].fitEase; }
export function springCost(t: ClickSpringType): number { return specs[t].cost; }
export function coiled(t: ClickSpringType): boolean { return specs[t].coiled; }
export function forBarrel(t: ClickSpringType): boolean { return specs[t].forBarrel; }
export function springShape(t: ClickSpringType): string { return specs[t].springShape; }
export function bestUse(t: ClickSpringType): string { return specs[t].use; }
export function clickSprings(): ClickSpringType[] { return Object.keys(specs) as ClickSpringType[]; }
