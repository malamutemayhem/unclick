export type HeaderBoltType =
  | "round_head_standard"
  | "hex_head_wrench"
  | "square_head_carriage"
  | "countersunk_flush"
  | "t_head_slot";

const specs: Record<HeaderBoltType, {
  formClean: number; speedHead: number; strengthJoint: number;
  sizeRange: number; cost: number; flush: boolean; slotted: boolean;
  headShape: string; use: string;
}> = {
  round_head_standard: {
    formClean: 85, speedHead: 82, strengthJoint: 80,
    sizeRange: 88, cost: 10, flush: false, slotted: false,
    headShape: "domed_round_top", use: "general_bolt_head",
  },
  hex_head_wrench: {
    formClean: 82, speedHead: 78, strengthJoint: 90,
    sizeRange: 85, cost: 12, flush: false, slotted: false,
    headShape: "six_sided_hex", use: "wrench_tighten_bolt",
  },
  square_head_carriage: {
    formClean: 80, speedHead: 80, strengthJoint: 85,
    sizeRange: 82, cost: 11, flush: false, slotted: false,
    headShape: "square_carriage_top", use: "anti_spin_carriage",
  },
  countersunk_flush: {
    formClean: 92, speedHead: 75, strengthJoint: 78,
    sizeRange: 75, cost: 15, flush: true, slotted: false,
    headShape: "tapered_cone_flush", use: "flush_surface_mount",
  },
  t_head_slot: {
    formClean: 78, speedHead: 85, strengthJoint: 82,
    sizeRange: 70, cost: 18, flush: false, slotted: true,
    headShape: "t_slot_channel", use: "t_slot_track_mount",
  },
};

export function formClean(t: HeaderBoltType): number { return specs[t].formClean; }
export function speedHead(t: HeaderBoltType): number { return specs[t].speedHead; }
export function strengthJoint(t: HeaderBoltType): number { return specs[t].strengthJoint; }
export function sizeRange(t: HeaderBoltType): number { return specs[t].sizeRange; }
export function boltCost(t: HeaderBoltType): number { return specs[t].cost; }
export function flush(t: HeaderBoltType): boolean { return specs[t].flush; }
export function slotted(t: HeaderBoltType): boolean { return specs[t].slotted; }
export function headShape(t: HeaderBoltType): string { return specs[t].headShape; }
export function bestUse(t: HeaderBoltType): string { return specs[t].use; }
export function headerBolts(): HeaderBoltType[] { return Object.keys(specs) as HeaderBoltType[]; }
