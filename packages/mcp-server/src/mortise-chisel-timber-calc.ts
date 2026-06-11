// Mortise chisel timber calculator - timber framing mortise chisel tools

export type MortiseChiselTimberType =
  | "registered_socket_heavy"
  | "swan_neck_lock_mortise"
  | "corner_chisel_square"
  | "pigsticker_narrow_deep"
  | "japanese_nomi_laminate";

const CHISEL_DATA: Record<
  MortiseChiselTimberType,
  {
    wasteRemove: number;
    wallClean: number;
    depthReach: number;
    durability: number;
    cost: number;
    socketHandle: boolean;
    forDeep: boolean;
    bladeSection: string;
    bestUse: string;
  }
> = {
  registered_socket_heavy: {
    wasteRemove: 9,
    wallClean: 8,
    depthReach: 8,
    durability: 9,
    cost: 6,
    socketHandle: true,
    forDeep: true,
    bladeSection: "thick_rect_section",
    bestUse: "large_mortise_chop",
  },
  swan_neck_lock_mortise: {
    wasteRemove: 7,
    wallClean: 10,
    depthReach: 9,
    durability: 7,
    cost: 7,
    socketHandle: false,
    forDeep: true,
    bladeSection: "cranked_offset_blade",
    bestUse: "lock_mortise_clean",
  },
  corner_chisel_square: {
    wasteRemove: 5,
    wallClean: 10,
    depthReach: 6,
    durability: 7,
    cost: 5,
    socketHandle: false,
    forDeep: false,
    bladeSection: "l_shape_corner",
    bestUse: "square_corner_clean",
  },
  pigsticker_narrow_deep: {
    wasteRemove: 8,
    wallClean: 7,
    depthReach: 10,
    durability: 8,
    cost: 5,
    socketHandle: true,
    forDeep: true,
    bladeSection: "narrow_deep_rect",
    bestUse: "deep_narrow_mortise",
  },
  japanese_nomi_laminate: {
    wasteRemove: 8,
    wallClean: 9,
    depthReach: 8,
    durability: 7,
    cost: 8,
    socketHandle: false,
    forDeep: true,
    bladeSection: "laminate_hollow_back",
    bestUse: "precision_timber_joint",
  },
};

export function wasteRemove(type: MortiseChiselTimberType): number {
  return CHISEL_DATA[type].wasteRemove;
}
export function wallClean(type: MortiseChiselTimberType): number {
  return CHISEL_DATA[type].wallClean;
}
export function depthReach(type: MortiseChiselTimberType): number {
  return CHISEL_DATA[type].depthReach;
}
export function durability(type: MortiseChiselTimberType): number {
  return CHISEL_DATA[type].durability;
}
export function chiselCost(type: MortiseChiselTimberType): number {
  return CHISEL_DATA[type].cost;
}
export function socketHandle(type: MortiseChiselTimberType): boolean {
  return CHISEL_DATA[type].socketHandle;
}
export function forDeep(type: MortiseChiselTimberType): boolean {
  return CHISEL_DATA[type].forDeep;
}
export function bladeSection(type: MortiseChiselTimberType): string {
  return CHISEL_DATA[type].bladeSection;
}
export function bestUse(type: MortiseChiselTimberType): string {
  return CHISEL_DATA[type].bestUse;
}
export function mortiseChiselTimbers(): MortiseChiselTimberType[] {
  return Object.keys(CHISEL_DATA) as MortiseChiselTimberType[];
}
