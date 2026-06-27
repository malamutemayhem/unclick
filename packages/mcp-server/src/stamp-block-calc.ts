export type StampBlockType =
  | "rubber_stamp_standard"
  | "clear_stamp_see"
  | "foam_stamp_budget"
  | "wood_mount_heavy"
  | "cling_stamp_versatile";

const specs: Record<StampBlockType, {
  impressClean: number; alignEase: number; durability: number;
  storageCompact: number; cost: number; clear: boolean; mounted: boolean;
  stampBase: string; use: string;
}> = {
  rubber_stamp_standard: {
    impressClean: 88, alignEase: 78, durability: 90,
    storageCompact: 70, cost: 12, clear: false, mounted: true,
    stampBase: "vulcanized_rubber_pad", use: "general_crisp_stamp",
  },
  clear_stamp_see: {
    impressClean: 85, alignEase: 95, durability: 80,
    storageCompact: 92, cost: 8, clear: true, mounted: false,
    stampBase: "photopolymer_sheet", use: "precise_align_stamp",
  },
  foam_stamp_budget: {
    impressClean: 72, alignEase: 80, durability: 65,
    storageCompact: 85, cost: 3, clear: false, mounted: false,
    stampBase: "eva_foam_die_cut", use: "budget_craft_stamp",
  },
  wood_mount_heavy: {
    impressClean: 92, alignEase: 75, durability: 95,
    storageCompact: 60, cost: 15, clear: false, mounted: true,
    stampBase: "rubber_on_wood_block", use: "heavy_pressure_stamp",
  },
  cling_stamp_versatile: {
    impressClean: 85, alignEase: 88, durability: 82,
    storageCompact: 88, cost: 10, clear: false, mounted: false,
    stampBase: "red_rubber_cling", use: "versatile_block_swap",
  },
};

export function impressClean(t: StampBlockType): number { return specs[t].impressClean; }
export function alignEase(t: StampBlockType): number { return specs[t].alignEase; }
export function durability(t: StampBlockType): number { return specs[t].durability; }
export function storageCompact(t: StampBlockType): number { return specs[t].storageCompact; }
export function stampCost(t: StampBlockType): number { return specs[t].cost; }
export function clear(t: StampBlockType): boolean { return specs[t].clear; }
export function mounted(t: StampBlockType): boolean { return specs[t].mounted; }
export function stampBase(t: StampBlockType): string { return specs[t].stampBase; }
export function bestUse(t: StampBlockType): string { return specs[t].use; }
export function stampBlocks(): StampBlockType[] { return Object.keys(specs) as StampBlockType[]; }
