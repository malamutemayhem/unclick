// Parceling tape calculator - rigging parceling tape tools

export type ParcelingTapeType =
  | "tarred_cotton_standard"
  | "self_amalgam_rubber"
  | "pvc_stretch_wrap"
  | "linen_canvas_heavy"
  | "polyester_uv_resist";

const TAPE_DATA: Record<
  ParcelingTapeType,
  {
    sealQuality: number;
    waterBlock: number;
    stretchConform: number;
    durability: number;
    cost: number;
    tarred: boolean;
    selfFusing: boolean;
    baseMaterial: string;
    bestUse: string;
  }
> = {
  tarred_cotton_standard: {
    sealQuality: 8,
    waterBlock: 9,
    stretchConform: 6,
    durability: 8,
    cost: 3,
    tarred: true,
    selfFusing: false,
    baseMaterial: "cotton_tar_impreg",
    bestUse: "wire_rope_parcel",
  },
  self_amalgam_rubber: {
    sealQuality: 10,
    waterBlock: 10,
    stretchConform: 9,
    durability: 7,
    cost: 6,
    tarred: false,
    selfFusing: true,
    baseMaterial: "rubber_amalgamate",
    bestUse: "watertight_seal_wrap",
  },
  pvc_stretch_wrap: {
    sealQuality: 7,
    waterBlock: 7,
    stretchConform: 10,
    durability: 6,
    cost: 2,
    tarred: false,
    selfFusing: false,
    baseMaterial: "pvc_film_stretch",
    bestUse: "temporary_wrap_hold",
  },
  linen_canvas_heavy: {
    sealQuality: 8,
    waterBlock: 7,
    stretchConform: 5,
    durability: 9,
    cost: 4,
    tarred: false,
    selfFusing: false,
    baseMaterial: "linen_heavy_weave",
    bestUse: "heavy_wire_parcel",
  },
  polyester_uv_resist: {
    sealQuality: 8,
    waterBlock: 8,
    stretchConform: 7,
    durability: 10,
    cost: 5,
    tarred: false,
    selfFusing: false,
    baseMaterial: "polyester_uv_stable",
    bestUse: "outdoor_long_term",
  },
};

export function sealQuality(type: ParcelingTapeType): number {
  return TAPE_DATA[type].sealQuality;
}
export function waterBlock(type: ParcelingTapeType): number {
  return TAPE_DATA[type].waterBlock;
}
export function stretchConform(type: ParcelingTapeType): number {
  return TAPE_DATA[type].stretchConform;
}
export function durability(type: ParcelingTapeType): number {
  return TAPE_DATA[type].durability;
}
export function tapeCost(type: ParcelingTapeType): number {
  return TAPE_DATA[type].cost;
}
export function tarred(type: ParcelingTapeType): boolean {
  return TAPE_DATA[type].tarred;
}
export function selfFusing(type: ParcelingTapeType): boolean {
  return TAPE_DATA[type].selfFusing;
}
export function baseMaterial(type: ParcelingTapeType): string {
  return TAPE_DATA[type].baseMaterial;
}
export function bestUse(type: ParcelingTapeType): string {
  return TAPE_DATA[type].bestUse;
}
export function parcelingTapes(): ParcelingTapeType[] {
  return Object.keys(TAPE_DATA) as ParcelingTapeType[];
}
