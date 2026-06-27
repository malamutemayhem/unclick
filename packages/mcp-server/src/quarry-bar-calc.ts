export type QuarryBarType =
  | "straight_bar_standard"
  | "pinch_bar_pry"
  | "wedge_bar_split"
  | "channeling_bar_slot"
  | "pneumatic_bar_drill";

const specs: Record<QuarryBarType, {
  leverForce: number; pryControl: number; durability: number;
  reachDepth: number; cost: number; powered: boolean; forSplit: boolean;
  tipProfile: string; use: string;
}> = {
  straight_bar_standard: {
    leverForce: 82, pryControl: 78, durability: 85,
    reachDepth: 75, cost: 45, powered: false, forSplit: false,
    tipProfile: "flat_chisel_tip", use: "general_quarry_lever",
  },
  pinch_bar_pry: {
    leverForce: 75, pryControl: 92, durability: 80,
    reachDepth: 70, cost: 40, powered: false, forSplit: false,
    tipProfile: "pointed_pinch_tip", use: "block_pry_lift",
  },
  wedge_bar_split: {
    leverForce: 90, pryControl: 70, durability: 82,
    reachDepth: 65, cost: 50, powered: false, forSplit: true,
    tipProfile: "wedge_split_tip", use: "seam_split_open",
  },
  channeling_bar_slot: {
    leverForce: 68, pryControl: 75, durability: 78,
    reachDepth: 90, cost: 60, powered: false, forSplit: false,
    tipProfile: "narrow_channel_tip", use: "slot_channel_cut",
  },
  pneumatic_bar_drill: {
    leverForce: 85, pryControl: 60, durability: 70,
    reachDepth: 95, cost: 500, powered: true, forSplit: false,
    tipProfile: "drill_bit_tip", use: "production_hole_drill",
  },
};

export function leverForce(t: QuarryBarType): number { return specs[t].leverForce; }
export function pryControl(t: QuarryBarType): number { return specs[t].pryControl; }
export function durability(t: QuarryBarType): number { return specs[t].durability; }
export function reachDepth(t: QuarryBarType): number { return specs[t].reachDepth; }
export function barCost(t: QuarryBarType): number { return specs[t].cost; }
export function powered(t: QuarryBarType): boolean { return specs[t].powered; }
export function forSplit(t: QuarryBarType): boolean { return specs[t].forSplit; }
export function tipProfile(t: QuarryBarType): string { return specs[t].tipProfile; }
export function bestUse(t: QuarryBarType): string { return specs[t].use; }
export function quarryBars(): QuarryBarType[] { return Object.keys(specs) as QuarryBarType[]; }
