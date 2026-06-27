// Peg ramer calculator - timber framing peg ramer tools

export type PegRamerType =
  | "tapered_reamer_standard"
  | "spiral_flute_fast"
  | "stepped_reamer_size"
  | "shell_reamer_smooth"
  | "adjustable_reamer_set";

const RAMER_DATA: Record<
  PegRamerType,
  {
    taperClean: number;
    holeFit: number;
    speedReam: number;
    sizeRange: number;
    cost: number;
    adjustable: boolean;
    forHardwood: boolean;
    fluteStyle: string;
    bestUse: string;
  }
> = {
  tapered_reamer_standard: {
    taperClean: 8,
    holeFit: 9,
    speedReam: 7,
    sizeRange: 7,
    cost: 3,
    adjustable: false,
    forHardwood: true,
    fluteStyle: "straight_taper_flute",
    bestUse: "general_peg_taper",
  },
  spiral_flute_fast: {
    taperClean: 9,
    holeFit: 8,
    speedReam: 10,
    sizeRange: 6,
    cost: 5,
    adjustable: false,
    forHardwood: true,
    fluteStyle: "spiral_chip_clear",
    bestUse: "fast_deep_ream",
  },
  stepped_reamer_size: {
    taperClean: 7,
    holeFit: 8,
    speedReam: 7,
    sizeRange: 10,
    cost: 6,
    adjustable: false,
    forHardwood: false,
    fluteStyle: "stepped_multi_size",
    bestUse: "multi_peg_size_set",
  },
  shell_reamer_smooth: {
    taperClean: 10,
    holeFit: 10,
    speedReam: 6,
    sizeRange: 5,
    cost: 5,
    adjustable: false,
    forHardwood: true,
    fluteStyle: "shell_smooth_bore",
    bestUse: "finish_ream_smooth",
  },
  adjustable_reamer_set: {
    taperClean: 7,
    holeFit: 8,
    speedReam: 7,
    sizeRange: 10,
    cost: 8,
    adjustable: true,
    forHardwood: true,
    fluteStyle: "expand_blade_set",
    bestUse: "variable_peg_fit",
  },
};

export function taperClean(type: PegRamerType): number {
  return RAMER_DATA[type].taperClean;
}
export function holeFit(type: PegRamerType): number {
  return RAMER_DATA[type].holeFit;
}
export function speedReam(type: PegRamerType): number {
  return RAMER_DATA[type].speedReam;
}
export function sizeRange(type: PegRamerType): number {
  return RAMER_DATA[type].sizeRange;
}
export function ramerCost(type: PegRamerType): number {
  return RAMER_DATA[type].cost;
}
export function adjustable(type: PegRamerType): boolean {
  return RAMER_DATA[type].adjustable;
}
export function forHardwood(type: PegRamerType): boolean {
  return RAMER_DATA[type].forHardwood;
}
export function fluteStyle(type: PegRamerType): string {
  return RAMER_DATA[type].fluteStyle;
}
export function bestUse(type: PegRamerType): string {
  return RAMER_DATA[type].bestUse;
}
export function pegRamers(): PegRamerType[] {
  return Object.keys(RAMER_DATA) as PegRamerType[];
}
