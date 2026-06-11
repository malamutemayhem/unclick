// Escapement file calculator - clockmaking precision filing tools

export type EscapementFileType =
  | "pivot_round_smooth"
  | "pallet_flat_fine"
  | "slot_knife_thin"
  | "crossing_half_round"
  | "burnish_dead_smooth";

const FILE_DATA: Record<
  EscapementFileType,
  {
    cutPrecision: number;
    finishSmooth: number;
    reachAccess: number;
    controlFeel: number;
    cost: number;
    deadSmooth: boolean;
    forPallets: boolean;
    crossSection: string;
    bestUse: string;
  }
> = {
  pivot_round_smooth: {
    cutPrecision: 8,
    finishSmooth: 8,
    reachAccess: 9,
    controlFeel: 8,
    cost: 5,
    deadSmooth: false,
    forPallets: false,
    crossSection: "round_taper_fine",
    bestUse: "pivot_hole_true",
  },
  pallet_flat_fine: {
    cutPrecision: 9,
    finishSmooth: 8,
    reachAccess: 7,
    controlFeel: 9,
    cost: 6,
    deadSmooth: false,
    forPallets: true,
    crossSection: "flat_narrow_blade",
    bestUse: "pallet_stone_seat",
  },
  slot_knife_thin: {
    cutPrecision: 9,
    finishSmooth: 7,
    reachAccess: 10,
    controlFeel: 7,
    cost: 5,
    deadSmooth: false,
    forPallets: false,
    crossSection: "knife_edge_thin",
    bestUse: "slot_keyway_file",
  },
  crossing_half_round: {
    cutPrecision: 7,
    finishSmooth: 7,
    reachAccess: 8,
    controlFeel: 8,
    cost: 4,
    deadSmooth: false,
    forPallets: false,
    crossSection: "half_round_dual",
    bestUse: "wheel_crossing_shape",
  },
  burnish_dead_smooth: {
    cutPrecision: 6,
    finishSmooth: 10,
    reachAccess: 7,
    controlFeel: 9,
    cost: 7,
    deadSmooth: true,
    forPallets: true,
    crossSection: "flat_polish_face",
    bestUse: "final_surface_burnish",
  },
};

export function cutPrecision(type: EscapementFileType): number {
  return FILE_DATA[type].cutPrecision;
}
export function finishSmooth(type: EscapementFileType): number {
  return FILE_DATA[type].finishSmooth;
}
export function reachAccess(type: EscapementFileType): number {
  return FILE_DATA[type].reachAccess;
}
export function controlFeel(type: EscapementFileType): number {
  return FILE_DATA[type].controlFeel;
}
export function fileCost(type: EscapementFileType): number {
  return FILE_DATA[type].cost;
}
export function deadSmooth(type: EscapementFileType): boolean {
  return FILE_DATA[type].deadSmooth;
}
export function forPallets(type: EscapementFileType): boolean {
  return FILE_DATA[type].forPallets;
}
export function crossSection(type: EscapementFileType): string {
  return FILE_DATA[type].crossSection;
}
export function bestUse(type: EscapementFileType): string {
  return FILE_DATA[type].bestUse;
}
export function escapementFiles(): EscapementFileType[] {
  return Object.keys(FILE_DATA) as EscapementFileType[];
}
