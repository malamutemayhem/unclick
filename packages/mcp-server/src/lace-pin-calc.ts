// Lace pin calculator - lace making pin tools

export type LacePinType =
  | "brass_fine_standard"
  | "stainless_rust_proof"
  | "glass_head_visible"
  | "extra_fine_delicate"
  | "map_pin_thick";

const PIN_DATA: Record<
  LacePinType,
  {
    holdFirm: number;
    threadSafe: number;
    visibility: number;
    insertEase: number;
    cost: number;
    rustProof: boolean;
    forFine: boolean;
    headType: string;
    bestUse: string;
  }
> = {
  brass_fine_standard: {
    holdFirm: 8,
    threadSafe: 8,
    visibility: 6,
    insertEase: 8,
    cost: 2,
    rustProof: false,
    forFine: false,
    headType: "small_brass_ball",
    bestUse: "general_bobbin_lace",
  },
  stainless_rust_proof: {
    holdFirm: 8,
    threadSafe: 9,
    visibility: 6,
    insertEase: 7,
    cost: 3,
    rustProof: true,
    forFine: false,
    headType: "flat_stainless_head",
    bestUse: "humid_climate_lace",
  },
  glass_head_visible: {
    holdFirm: 7,
    threadSafe: 7,
    visibility: 10,
    insertEase: 9,
    cost: 3,
    rustProof: false,
    forFine: false,
    headType: "colored_glass_ball",
    bestUse: "teaching_demo_lace",
  },
  extra_fine_delicate: {
    holdFirm: 6,
    threadSafe: 10,
    visibility: 5,
    insertEase: 7,
    cost: 4,
    rustProof: true,
    forFine: true,
    headType: "micro_steel_point",
    bestUse: "fine_silk_lace",
  },
  map_pin_thick: {
    holdFirm: 9,
    threadSafe: 5,
    visibility: 9,
    insertEase: 10,
    cost: 1,
    rustProof: false,
    forFine: false,
    headType: "large_flat_color",
    bestUse: "coarse_practice_lace",
  },
};

export function holdFirm(type: LacePinType): number {
  return PIN_DATA[type].holdFirm;
}
export function threadSafe(type: LacePinType): number {
  return PIN_DATA[type].threadSafe;
}
export function visibility(type: LacePinType): number {
  return PIN_DATA[type].visibility;
}
export function insertEase(type: LacePinType): number {
  return PIN_DATA[type].insertEase;
}
export function pinCost(type: LacePinType): number {
  return PIN_DATA[type].cost;
}
export function rustProof(type: LacePinType): boolean {
  return PIN_DATA[type].rustProof;
}
export function forFine(type: LacePinType): boolean {
  return PIN_DATA[type].forFine;
}
export function headType(type: LacePinType): string {
  return PIN_DATA[type].headType;
}
export function bestUse(type: LacePinType): string {
  return PIN_DATA[type].bestUse;
}
export function lacePins(): LacePinType[] {
  return Object.keys(PIN_DATA) as LacePinType[];
}
