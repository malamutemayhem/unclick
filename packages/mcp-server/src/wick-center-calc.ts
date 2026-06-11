export type WickCenterType =
  | "metal_centering_bar"
  | "wooden_centering_stick"
  | "clip_centering_ring"
  | "adhesive_dot_base"
  | "magnetic_center_hold";

const specs: Record<WickCenterType, {
  alignAccuracy: number; holdSecure: number; setupSpeed: number;
  sizeRange: number; cost: number; reusable: boolean; magnetic: boolean;
  mountStyle: string; use: string;
}> = {
  metal_centering_bar: {
    alignAccuracy: 90, holdSecure: 88, setupSpeed: 85,
    sizeRange: 85, cost: 5, reusable: true, magnetic: false,
    mountStyle: "bridge_bar_rest", use: "general_container_center",
  },
  wooden_centering_stick: {
    alignAccuracy: 82, holdSecure: 80, setupSpeed: 88,
    sizeRange: 78, cost: 3, reusable: true, magnetic: false,
    mountStyle: "split_stick_clip", use: "budget_diy_center",
  },
  clip_centering_ring: {
    alignAccuracy: 88, holdSecure: 85, setupSpeed: 90,
    sizeRange: 82, cost: 6, reusable: true, magnetic: false,
    mountStyle: "spring_clip_ring", use: "quick_snap_center",
  },
  adhesive_dot_base: {
    alignAccuracy: 85, holdSecure: 92, setupSpeed: 82,
    sizeRange: 80, cost: 4, reusable: false, magnetic: false,
    mountStyle: "sticky_dot_anchor", use: "secure_base_attach",
  },
  magnetic_center_hold: {
    alignAccuracy: 92, holdSecure: 90, setupSpeed: 78,
    sizeRange: 88, cost: 8, reusable: true, magnetic: true,
    mountStyle: "magnet_disc_base", use: "precision_multi_wick",
  },
};

export function alignAccuracy(t: WickCenterType): number { return specs[t].alignAccuracy; }
export function holdSecure(t: WickCenterType): number { return specs[t].holdSecure; }
export function setupSpeed(t: WickCenterType): number { return specs[t].setupSpeed; }
export function sizeRange(t: WickCenterType): number { return specs[t].sizeRange; }
export function centerCost(t: WickCenterType): number { return specs[t].cost; }
export function reusable(t: WickCenterType): boolean { return specs[t].reusable; }
export function magnetic(t: WickCenterType): boolean { return specs[t].magnetic; }
export function mountStyle(t: WickCenterType): string { return specs[t].mountStyle; }
export function bestUse(t: WickCenterType): string { return specs[t].use; }
export function wickCenters(): WickCenterType[] { return Object.keys(specs) as WickCenterType[]; }
