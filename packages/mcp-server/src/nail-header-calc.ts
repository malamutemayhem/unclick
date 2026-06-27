export type NailHeaderType =
  | "rose_head_standard"
  | "flat_head_common"
  | "clout_head_wide"
  | "brad_head_small"
  | "decorative_head_fancy";

const specs: Record<NailHeaderType, {
  headForm: number; speedMake: number; consistShape: number;
  sizeRange: number; cost: number; decorative: boolean; forFine: boolean;
  headStyle: string; use: string;
}> = {
  rose_head_standard: {
    headForm: 88, speedMake: 82, consistShape: 85,
    sizeRange: 80, cost: 15, decorative: false, forFine: false,
    headStyle: "four_face_pyramid", use: "general_rose_head_nail",
  },
  flat_head_common: {
    headForm: 82, speedMake: 88, consistShape: 80,
    sizeRange: 85, cost: 12, decorative: false, forFine: false,
    headStyle: "flat_disc_top", use: "common_flat_nail",
  },
  clout_head_wide: {
    headForm: 80, speedMake: 80, consistShape: 82,
    sizeRange: 78, cost: 14, decorative: false, forFine: false,
    headStyle: "wide_flat_disc", use: "leather_fabric_tack",
  },
  brad_head_small: {
    headForm: 85, speedMake: 75, consistShape: 88,
    sizeRange: 65, cost: 18, decorative: false, forFine: true,
    headStyle: "tiny_round_brad", use: "fine_trim_brad_nail",
  },
  decorative_head_fancy: {
    headForm: 92, speedMake: 70, consistShape: 90,
    sizeRange: 72, cost: 25, decorative: true, forFine: false,
    headStyle: "ornate_pattern_top", use: "decorative_iron_nail",
  },
};

export function headForm(t: NailHeaderType): number { return specs[t].headForm; }
export function speedMake(t: NailHeaderType): number { return specs[t].speedMake; }
export function consistShape(t: NailHeaderType): number { return specs[t].consistShape; }
export function sizeRange(t: NailHeaderType): number { return specs[t].sizeRange; }
export function headerCost(t: NailHeaderType): number { return specs[t].cost; }
export function decorative(t: NailHeaderType): boolean { return specs[t].decorative; }
export function forFine(t: NailHeaderType): boolean { return specs[t].forFine; }
export function headStyle(t: NailHeaderType): string { return specs[t].headStyle; }
export function bestUse(t: NailHeaderType): string { return specs[t].use; }
export function nailHeaders(): NailHeaderType[] { return Object.keys(specs) as NailHeaderType[]; }
