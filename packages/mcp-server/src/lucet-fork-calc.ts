export type LucetForkType =
  | "wooden_lucet_standard"
  | "bone_lucet_smooth"
  | "metal_lucet_durable"
  | "ergonomic_lucet_grip"
  | "mini_lucet_fine";

const specs: Record<LucetForkType, {
  cordSmooth: number; speedBraid: number; controlLoop: number;
  comfortGrip: number; cost: number; natural: boolean; ergonomic: boolean;
  forkMaterial: string; use: string;
}> = {
  wooden_lucet_standard: {
    cordSmooth: 82, speedBraid: 80, controlLoop: 85,
    comfortGrip: 82, cost: 10, natural: true, ergonomic: false,
    forkMaterial: "hardwood_carved_fork", use: "general_cord_braid",
  },
  bone_lucet_smooth: {
    cordSmooth: 90, speedBraid: 82, controlLoop: 82,
    comfortGrip: 80, cost: 18, natural: true, ergonomic: false,
    forkMaterial: "polished_bone_fork", use: "smooth_slip_braid",
  },
  metal_lucet_durable: {
    cordSmooth: 85, speedBraid: 85, controlLoop: 80,
    comfortGrip: 75, cost: 20, natural: false, ergonomic: false,
    forkMaterial: "stainless_steel_fork", use: "heavy_duty_braid",
  },
  ergonomic_lucet_grip: {
    cordSmooth: 82, speedBraid: 88, controlLoop: 88,
    comfortGrip: 95, cost: 25, natural: false, ergonomic: true,
    forkMaterial: "shaped_grip_handle", use: "long_session_braid",
  },
  mini_lucet_fine: {
    cordSmooth: 85, speedBraid: 75, controlLoop: 92,
    comfortGrip: 78, cost: 12, natural: true, ergonomic: false,
    forkMaterial: "small_hardwood_fork", use: "fine_thin_cord",
  },
};

export function cordSmooth(t: LucetForkType): number { return specs[t].cordSmooth; }
export function speedBraid(t: LucetForkType): number { return specs[t].speedBraid; }
export function controlLoop(t: LucetForkType): number { return specs[t].controlLoop; }
export function comfortGrip(t: LucetForkType): number { return specs[t].comfortGrip; }
export function lucetCost(t: LucetForkType): number { return specs[t].cost; }
export function natural(t: LucetForkType): boolean { return specs[t].natural; }
export function ergonomic(t: LucetForkType): boolean { return specs[t].ergonomic; }
export function forkMaterial(t: LucetForkType): string { return specs[t].forkMaterial; }
export function bestUse(t: LucetForkType): string { return specs[t].use; }
export function lucetForks(): LucetForkType[] { return Object.keys(specs) as LucetForkType[]; }
