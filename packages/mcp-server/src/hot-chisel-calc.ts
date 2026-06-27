// Hot chisel calculator - blacksmithing hot-cutting chisel tools

export type HotChiselType =
  | "handled_top_cut"
  | "hardy_bottom_cut"
  | "slitting_narrow_deep"
  | "hot_set_wide_flat"
  | "cape_chisel_groove";

const CHISEL_DATA: Record<
  HotChiselType,
  {
    cutClean: number;
    heatResist: number;
    edgeLife: number;
    controlAngle: number;
    cost: number;
    hardiHole: boolean;
    handled: boolean;
    edgeShape: string;
    bestUse: string;
  }
> = {
  handled_top_cut: {
    cutClean: 7,
    heatResist: 8,
    edgeLife: 6,
    controlAngle: 8,
    cost: 4,
    hardiHole: false,
    handled: true,
    edgeShape: "wide_flat_bevel",
    bestUse: "general_hot_cut",
  },
  hardy_bottom_cut: {
    cutClean: 8,
    heatResist: 9,
    edgeLife: 7,
    controlAngle: 6,
    cost: 5,
    hardiHole: true,
    handled: false,
    edgeShape: "upward_sharp_edge",
    bestUse: "anvil_drop_cut",
  },
  slitting_narrow_deep: {
    cutClean: 6,
    heatResist: 7,
    edgeLife: 5,
    controlAngle: 9,
    cost: 5,
    hardiHole: false,
    handled: true,
    edgeShape: "narrow_point_blade",
    bestUse: "slot_split_pierce",
  },
  hot_set_wide_flat: {
    cutClean: 9,
    heatResist: 8,
    edgeLife: 7,
    controlAngle: 7,
    cost: 6,
    hardiHole: false,
    handled: true,
    edgeShape: "wide_thin_edge",
    bestUse: "clean_shoulder_cut",
  },
  cape_chisel_groove: {
    cutClean: 6,
    heatResist: 7,
    edgeLife: 6,
    controlAngle: 8,
    cost: 4,
    hardiHole: false,
    handled: true,
    edgeShape: "narrow_cape_point",
    bestUse: "groove_channel_cut",
  },
};

export function cutClean(type: HotChiselType): number {
  return CHISEL_DATA[type].cutClean;
}
export function heatResist(type: HotChiselType): number {
  return CHISEL_DATA[type].heatResist;
}
export function edgeLife(type: HotChiselType): number {
  return CHISEL_DATA[type].edgeLife;
}
export function controlAngle(type: HotChiselType): number {
  return CHISEL_DATA[type].controlAngle;
}
export function chiselCost(type: HotChiselType): number {
  return CHISEL_DATA[type].cost;
}
export function hardiHole(type: HotChiselType): boolean {
  return CHISEL_DATA[type].hardiHole;
}
export function handled(type: HotChiselType): boolean {
  return CHISEL_DATA[type].handled;
}
export function edgeShape(type: HotChiselType): string {
  return CHISEL_DATA[type].edgeShape;
}
export function bestUse(type: HotChiselType): string {
  return CHISEL_DATA[type].bestUse;
}
export function hotChisels(): HotChiselType[] {
  return Object.keys(CHISEL_DATA) as HotChiselType[];
}
