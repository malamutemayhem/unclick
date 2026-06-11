export type RattanWrapType =
  | "binding_cane_narrow"
  | "flat_oval_medium"
  | "round_reed_thick"
  | "flat_reed_wide"
  | "binder_cane_fine";

const specs: Record<RattanWrapType, {
  wrapTight: number; coverSmooth: number; durability: number;
  flexBend: number; cost: number; flat: boolean; forBinding: boolean;
  profile: string; use: string;
}> = {
  binding_cane_narrow: {
    wrapTight: 92, coverSmooth: 85, durability: 82,
    flexBend: 88, cost: 12, flat: false, forBinding: true,
    profile: "narrow_half_round", use: "edge_binding_wrap",
  },
  flat_oval_medium: {
    wrapTight: 85, coverSmooth: 90, durability: 85,
    flexBend: 82, cost: 15, flat: true, forBinding: false,
    profile: "flat_oval_cross", use: "surface_weave_cover",
  },
  round_reed_thick: {
    wrapTight: 80, coverSmooth: 78, durability: 90,
    flexBend: 75, cost: 10, flat: false, forBinding: false,
    profile: "round_solid_core", use: "structural_frame_wrap",
  },
  flat_reed_wide: {
    wrapTight: 82, coverSmooth: 88, durability: 82,
    flexBend: 85, cost: 8, flat: true, forBinding: false,
    profile: "flat_wide_strip", use: "seat_panel_weave",
  },
  binder_cane_fine: {
    wrapTight: 95, coverSmooth: 82, durability: 78,
    flexBend: 92, cost: 18, flat: false, forBinding: true,
    profile: "fine_half_round", use: "delicate_edge_finish",
  },
};

export function wrapTight(t: RattanWrapType): number { return specs[t].wrapTight; }
export function coverSmooth(t: RattanWrapType): number { return specs[t].coverSmooth; }
export function durability(t: RattanWrapType): number { return specs[t].durability; }
export function flexBend(t: RattanWrapType): number { return specs[t].flexBend; }
export function rattanCost(t: RattanWrapType): number { return specs[t].cost; }
export function flat(t: RattanWrapType): boolean { return specs[t].flat; }
export function forBinding(t: RattanWrapType): boolean { return specs[t].forBinding; }
export function profile(t: RattanWrapType): string { return specs[t].profile; }
export function bestUse(t: RattanWrapType): string { return specs[t].use; }
export function rattanWraps(): RattanWrapType[] { return Object.keys(specs) as RattanWrapType[]; }
