// Bung borer calculator - cooperage hole-boring tools for barrel bungs

export type BungBorerType =
  | "tapered_reamer_cone"
  | "spoon_bit_scoop"
  | "pod_auger_pull"
  | "adjustable_bit_set"
  | "plug_cutter_match";

const BORER_DATA: Record<
  BungBorerType,
  {
    holeClean: number;
    sizeAccuracy: number;
    cutSpeed: number;
    taperControl: number;
    cost: number;
    adjustable: boolean;
    forTaper: boolean;
    bitShape: string;
    bestUse: string;
  }
> = {
  tapered_reamer_cone: {
    holeClean: 7,
    sizeAccuracy: 8,
    cutSpeed: 7,
    taperControl: 10,
    cost: 4,
    adjustable: false,
    forTaper: true,
    bitShape: "cone_taper_ream",
    bestUse: "bung_hole_taper",
  },
  spoon_bit_scoop: {
    holeClean: 8,
    sizeAccuracy: 7,
    cutSpeed: 8,
    taperControl: 5,
    cost: 3,
    adjustable: false,
    forTaper: false,
    bitShape: "spoon_scoop_edge",
    bestUse: "initial_hole_bore",
  },
  pod_auger_pull: {
    holeClean: 9,
    sizeAccuracy: 8,
    cutSpeed: 9,
    taperControl: 4,
    cost: 5,
    adjustable: false,
    forTaper: false,
    bitShape: "shell_pod_twist",
    bestUse: "deep_barrel_bore",
  },
  adjustable_bit_set: {
    holeClean: 7,
    sizeAccuracy: 9,
    cutSpeed: 6,
    taperControl: 7,
    cost: 8,
    adjustable: true,
    forTaper: false,
    bitShape: "expandable_arm_cut",
    bestUse: "variable_bung_size",
  },
  plug_cutter_match: {
    holeClean: 9,
    sizeAccuracy: 10,
    cutSpeed: 6,
    taperControl: 8,
    cost: 6,
    adjustable: false,
    forTaper: true,
    bitShape: "matching_plug_ring",
    bestUse: "tight_plug_fit",
  },
};

export function holeClean(type: BungBorerType): number {
  return BORER_DATA[type].holeClean;
}
export function sizeAccuracy(type: BungBorerType): number {
  return BORER_DATA[type].sizeAccuracy;
}
export function cutSpeed(type: BungBorerType): number {
  return BORER_DATA[type].cutSpeed;
}
export function taperControl(type: BungBorerType): number {
  return BORER_DATA[type].taperControl;
}
export function borerCost(type: BungBorerType): number {
  return BORER_DATA[type].cost;
}
export function adjustable(type: BungBorerType): boolean {
  return BORER_DATA[type].adjustable;
}
export function forTaper(type: BungBorerType): boolean {
  return BORER_DATA[type].forTaper;
}
export function bitShape(type: BungBorerType): string {
  return BORER_DATA[type].bitShape;
}
export function bestUse(type: BungBorerType): string {
  return BORER_DATA[type].bestUse;
}
export function bungBorers(): BungBorerType[] {
  return Object.keys(BORER_DATA) as BungBorerType[];
}
