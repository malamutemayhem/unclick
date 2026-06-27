export type PalletType = "wood_stringer" | "wood_block" | "plastic" | "metal" | "presswood";

export function loadCapacity(p: PalletType): number {
  const m: Record<PalletType, number> = {
    wood_stringer: 6, wood_block: 8, plastic: 7, metal: 10, presswood: 4,
  };
  return m[p];
}

export function durability(p: PalletType): number {
  const m: Record<PalletType, number> = {
    wood_stringer: 5, wood_block: 7, plastic: 9, metal: 10, presswood: 3,
  };
  return m[p];
}

export function hygiene(p: PalletType): number {
  const m: Record<PalletType, number> = {
    wood_stringer: 3, wood_block: 4, plastic: 10, metal: 9, presswood: 6,
  };
  return m[p];
}

export function unitWeight(p: PalletType): number {
  const m: Record<PalletType, number> = {
    wood_stringer: 6, wood_block: 7, plastic: 4, metal: 10, presswood: 3,
  };
  return m[p];
}

export function unitCost(p: PalletType): number {
  const m: Record<PalletType, number> = {
    wood_stringer: 2, wood_block: 4, plastic: 7, metal: 10, presswood: 3,
  };
  return m[p];
}

export function exportCompliant(p: PalletType): boolean {
  const m: Record<PalletType, boolean> = {
    wood_stringer: false, wood_block: false, plastic: true, metal: true, presswood: true,
  };
  return m[p];
}

export function recyclable(p: PalletType): boolean {
  const m: Record<PalletType, boolean> = {
    wood_stringer: true, wood_block: true, plastic: true, metal: true, presswood: true,
  };
  return m[p];
}

export function entryType(p: PalletType): string {
  const m: Record<PalletType, string> = {
    wood_stringer: "two_way_notched_stringer", wood_block: "four_way_block_entry",
    plastic: "four_way_molded_entry", metal: "four_way_welded_channel",
    presswood: "four_way_molded_compressed",
  };
  return m[p];
}

export function bestApplication(p: PalletType): string {
  const m: Record<PalletType, string> = {
    wood_stringer: "domestic_general_freight", wood_block: "heavy_industrial_reuse",
    plastic: "food_pharma_cleanroom", metal: "racking_system_heavy_duty",
    presswood: "one_way_export_shipping",
  };
  return m[p];
}

export function palletTypes(): PalletType[] {
  return ["wood_stringer", "wood_block", "plastic", "metal", "presswood"];
}
