export type SailHookType =
  | "bench_hook_standard"
  | "floor_hook_heavy"
  | "clamp_hook_portable"
  | "magnetic_hook_steel"
  | "suction_hook_smooth";

const specs: Record<SailHookType, {
  holdSecure: number; adjustAngle: number; setupSpeed: number;
  fabricRange: number; cost: number; portable: boolean; magnetic: boolean;
  mountStyle: string; use: string;
}> = {
  bench_hook_standard: {
    holdSecure: 88, adjustAngle: 82, setupSpeed: 78,
    fabricRange: 85, cost: 15, portable: false, magnetic: false,
    mountStyle: "screw_bench_mount", use: "general_bench_hold",
  },
  floor_hook_heavy: {
    holdSecure: 92, adjustAngle: 78, setupSpeed: 70,
    fabricRange: 90, cost: 25, portable: false, magnetic: false,
    mountStyle: "floor_bolt_mount", use: "large_sail_spread",
  },
  clamp_hook_portable: {
    holdSecure: 80, adjustAngle: 85, setupSpeed: 90,
    fabricRange: 78, cost: 18, portable: true, magnetic: false,
    mountStyle: "clamp_edge_grip", use: "portable_field_hold",
  },
  magnetic_hook_steel: {
    holdSecure: 75, adjustAngle: 88, setupSpeed: 95,
    fabricRange: 72, cost: 20, portable: true, magnetic: true,
    mountStyle: "magnet_steel_attach", use: "quick_steel_bench",
  },
  suction_hook_smooth: {
    holdSecure: 70, adjustAngle: 85, setupSpeed: 92,
    fabricRange: 75, cost: 12, portable: true, magnetic: false,
    mountStyle: "suction_cup_mount", use: "smooth_surface_hold",
  },
};

export function holdSecure(t: SailHookType): number { return specs[t].holdSecure; }
export function adjustAngle(t: SailHookType): number { return specs[t].adjustAngle; }
export function setupSpeed(t: SailHookType): number { return specs[t].setupSpeed; }
export function fabricRange(t: SailHookType): number { return specs[t].fabricRange; }
export function hookCost(t: SailHookType): number { return specs[t].cost; }
export function portable(t: SailHookType): boolean { return specs[t].portable; }
export function magnetic(t: SailHookType): boolean { return specs[t].magnetic; }
export function mountStyle(t: SailHookType): string { return specs[t].mountStyle; }
export function bestUse(t: SailHookType): string { return specs[t].use; }
export function sailHooks(): SailHookType[] { return Object.keys(specs) as SailHookType[]; }
