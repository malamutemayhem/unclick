export type StrandHookType =
  | "swivel_hook_standard"
  | "fixed_hook_simple"
  | "triple_hook_three"
  | "four_hook_hawser"
  | "spring_loaded_tension";

const specs: Record<StrandHookType, {
  holdSecure: number; swivel: number; strandCount: number;
  loadCapacity: number; cost: number; hasSwivel: boolean; forHawser: boolean;
  hookPattern: string; use: string;
}> = {
  swivel_hook_standard: {
    holdSecure: 82, swivel: 95, strandCount: 65,
    loadCapacity: 75, cost: 35, hasSwivel: true, forHawser: false,
    hookPattern: "single_swivel_eye", use: "general_strand_twist",
  },
  fixed_hook_simple: {
    holdSecure: 88, swivel: 30, strandCount: 55,
    loadCapacity: 80, cost: 15, hasSwivel: false, forHawser: false,
    hookPattern: "fixed_bent_hook", use: "simple_twine_twist",
  },
  triple_hook_three: {
    holdSecure: 85, swivel: 88, strandCount: 85,
    loadCapacity: 78, cost: 55, hasSwivel: true, forHawser: false,
    hookPattern: "triple_arm_swivel", use: "three_strand_rope",
  },
  four_hook_hawser: {
    holdSecure: 80, swivel: 85, strandCount: 95,
    loadCapacity: 90, cost: 80, hasSwivel: true, forHawser: true,
    hookPattern: "four_arm_swivel", use: "heavy_hawser_lay",
  },
  spring_loaded_tension: {
    holdSecure: 90, swivel: 78, strandCount: 70,
    loadCapacity: 82, cost: 60, hasSwivel: false, forHawser: false,
    hookPattern: "spring_clamp_hook", use: "tension_control_twist",
  },
};

export function holdSecure(t: StrandHookType): number { return specs[t].holdSecure; }
export function swivel(t: StrandHookType): number { return specs[t].swivel; }
export function strandCount(t: StrandHookType): number { return specs[t].strandCount; }
export function loadCapacity(t: StrandHookType): number { return specs[t].loadCapacity; }
export function hookCost(t: StrandHookType): number { return specs[t].cost; }
export function hasSwivel(t: StrandHookType): boolean { return specs[t].hasSwivel; }
export function forHawser(t: StrandHookType): boolean { return specs[t].forHawser; }
export function hookPattern(t: StrandHookType): string { return specs[t].hookPattern; }
export function bestUse(t: StrandHookType): string { return specs[t].use; }
export function strandHooks(): StrandHookType[] { return Object.keys(specs) as StrandHookType[]; }
