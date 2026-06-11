// Side axe calculator - green woodworking hewing tools

export type SideAxeType =
  | "broad_axe_large"
  | "hewing_hatchet_small"
  | "goosewing_curved"
  | "kent_broad_medium"
  | "ship_adze_handle";

const AXE_DATA: Record<
  SideAxeType,
  {
    hewFlat: number;
    edgeKeep: number;
    controlSwing: number;
    surfaceFinish: number;
    cost: number;
    singleBevel: boolean;
    forBeam: boolean;
    headProfile: string;
    bestUse: string;
  }
> = {
  broad_axe_large: {
    hewFlat: 10,
    edgeKeep: 8,
    controlSwing: 7,
    surfaceFinish: 8,
    cost: 8,
    singleBevel: true,
    forBeam: true,
    headProfile: "wide_flat_face",
    bestUse: "beam_face_hew",
  },
  hewing_hatchet_small: {
    hewFlat: 7,
    edgeKeep: 8,
    controlSwing: 9,
    surfaceFinish: 8,
    cost: 5,
    singleBevel: true,
    forBeam: false,
    headProfile: "compact_flat_face",
    bestUse: "small_timber_hew",
  },
  goosewing_curved: {
    hewFlat: 9,
    edgeKeep: 7,
    controlSwing: 7,
    surfaceFinish: 9,
    cost: 9,
    singleBevel: true,
    forBeam: true,
    headProfile: "curved_wing_face",
    bestUse: "decorative_hew_finish",
  },
  kent_broad_medium: {
    hewFlat: 8,
    edgeKeep: 8,
    controlSwing: 8,
    surfaceFinish: 7,
    cost: 6,
    singleBevel: true,
    forBeam: true,
    headProfile: "medium_kent_face",
    bestUse: "general_hewing_work",
  },
  ship_adze_handle: {
    hewFlat: 8,
    edgeKeep: 7,
    controlSwing: 8,
    surfaceFinish: 10,
    cost: 7,
    singleBevel: true,
    forBeam: false,
    headProfile: "adze_cross_handle",
    bestUse: "curved_surface_shape",
  },
};

export function hewFlat(type: SideAxeType): number {
  return AXE_DATA[type].hewFlat;
}
export function edgeKeep(type: SideAxeType): number {
  return AXE_DATA[type].edgeKeep;
}
export function controlSwing(type: SideAxeType): number {
  return AXE_DATA[type].controlSwing;
}
export function surfaceFinish(type: SideAxeType): number {
  return AXE_DATA[type].surfaceFinish;
}
export function axeCost(type: SideAxeType): number {
  return AXE_DATA[type].cost;
}
export function singleBevel(type: SideAxeType): boolean {
  return AXE_DATA[type].singleBevel;
}
export function forBeam(type: SideAxeType): boolean {
  return AXE_DATA[type].forBeam;
}
export function headProfile(type: SideAxeType): string {
  return AXE_DATA[type].headProfile;
}
export function bestUse(type: SideAxeType): string {
  return AXE_DATA[type].bestUse;
}
export function sideAxes(): SideAxeType[] {
  return Object.keys(AXE_DATA) as SideAxeType[];
}
