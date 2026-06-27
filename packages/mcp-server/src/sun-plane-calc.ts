// Sun plane calculator - coopering outside shaping tools

export type SunPlaneType =
  | "long_jointer_flat"
  | "short_block_quick"
  | "hollow_round_concave"
  | "cooper_jointer_bench"
  | "backing_plane_taper";

const PLANE_DATA: Record<
  SunPlaneType,
  {
    surfaceFlat: number;
    jointFit: number;
    controlFeel: number;
    staveRange: number;
    cost: number;
    benchMount: boolean;
    forTaper: boolean;
    soleProfile: string;
    bestUse: string;
  }
> = {
  long_jointer_flat: {
    surfaceFlat: 10,
    jointFit: 9,
    controlFeel: 7,
    staveRange: 8,
    cost: 7,
    benchMount: false,
    forTaper: false,
    soleProfile: "long_flat_sole",
    bestUse: "stave_edge_joint",
  },
  short_block_quick: {
    surfaceFlat: 7,
    jointFit: 7,
    controlFeel: 9,
    staveRange: 6,
    cost: 4,
    benchMount: false,
    forTaper: false,
    soleProfile: "short_flat_sole",
    bestUse: "quick_trim_adjust",
  },
  hollow_round_concave: {
    surfaceFlat: 6,
    jointFit: 8,
    controlFeel: 7,
    staveRange: 7,
    cost: 6,
    benchMount: false,
    forTaper: false,
    soleProfile: "concave_round_sole",
    bestUse: "outside_curve_shape",
  },
  cooper_jointer_bench: {
    surfaceFlat: 10,
    jointFit: 10,
    controlFeel: 6,
    staveRange: 9,
    cost: 9,
    benchMount: true,
    forTaper: false,
    soleProfile: "inverted_bench_sole",
    bestUse: "production_stave_joint",
  },
  backing_plane_taper: {
    surfaceFlat: 8,
    jointFit: 8,
    controlFeel: 8,
    staveRange: 7,
    cost: 6,
    benchMount: false,
    forTaper: true,
    soleProfile: "angled_taper_sole",
    bestUse: "barrel_end_taper",
  },
};

export function surfaceFlat(type: SunPlaneType): number {
  return PLANE_DATA[type].surfaceFlat;
}
export function jointFit(type: SunPlaneType): number {
  return PLANE_DATA[type].jointFit;
}
export function controlFeel(type: SunPlaneType): number {
  return PLANE_DATA[type].controlFeel;
}
export function staveRange(type: SunPlaneType): number {
  return PLANE_DATA[type].staveRange;
}
export function planeCost(type: SunPlaneType): number {
  return PLANE_DATA[type].cost;
}
export function benchMount(type: SunPlaneType): boolean {
  return PLANE_DATA[type].benchMount;
}
export function forTaper(type: SunPlaneType): boolean {
  return PLANE_DATA[type].forTaper;
}
export function soleProfile(type: SunPlaneType): string {
  return PLANE_DATA[type].soleProfile;
}
export function bestUse(type: SunPlaneType): string {
  return PLANE_DATA[type].bestUse;
}
export function sunPlanes(): SunPlaneType[] {
  return Object.keys(PLANE_DATA) as SunPlaneType[];
}
