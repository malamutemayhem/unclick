export type WireCutType =
  | "twisted_wire_standard"
  | "single_strand_clean"
  | "braided_wire_strong"
  | "nylon_line_soft"
  | "toggle_handle_grip";

const specs: Record<WireCutType, {
  cutClean: number; controlStraight: number; durability: number;
  handleGrip: number; cost: number; braided: boolean; nylon: boolean;
  wireGauge: string; use: string;
}> = {
  twisted_wire_standard: {
    cutClean: 82, controlStraight: 80, durability: 85,
    handleGrip: 78, cost: 5, braided: false, nylon: false,
    wireGauge: "twenty_gauge_twist", use: "general_pot_cut_off",
  },
  single_strand_clean: {
    cutClean: 90, controlStraight: 85, durability: 70,
    handleGrip: 80, cost: 4, braided: false, nylon: false,
    wireGauge: "twenty_two_gauge_single", use: "clean_base_cut",
  },
  braided_wire_strong: {
    cutClean: 78, controlStraight: 82, durability: 92,
    handleGrip: 82, cost: 8, braided: true, nylon: false,
    wireGauge: "eighteen_gauge_braid", use: "large_form_cut",
  },
  nylon_line_soft: {
    cutClean: 75, controlStraight: 78, durability: 80,
    handleGrip: 85, cost: 3, braided: false, nylon: true,
    wireGauge: "one_mm_nylon_mono", use: "soft_clay_slice",
  },
  toggle_handle_grip: {
    cutClean: 85, controlStraight: 88, durability: 82,
    handleGrip: 92, cost: 10, braided: false, nylon: false,
    wireGauge: "twenty_gauge_toggle", use: "ergonomic_wheel_cut",
  },
};

export function cutClean(t: WireCutType): number { return specs[t].cutClean; }
export function controlStraight(t: WireCutType): number { return specs[t].controlStraight; }
export function durability(t: WireCutType): number { return specs[t].durability; }
export function handleGrip(t: WireCutType): number { return specs[t].handleGrip; }
export function wireCost(t: WireCutType): number { return specs[t].cost; }
export function braided(t: WireCutType): boolean { return specs[t].braided; }
export function nylon(t: WireCutType): boolean { return specs[t].nylon; }
export function wireGauge(t: WireCutType): string { return specs[t].wireGauge; }
export function bestUse(t: WireCutType): string { return specs[t].use; }
export function wireCuts(): WireCutType[] { return Object.keys(specs) as WireCutType[]; }
