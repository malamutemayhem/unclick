export type SpongeToolType =
  | "natural_sea_standard"
  | "synthetic_foam_durable"
  | "elephant_ear_large"
  | "silk_sponge_fine"
  | "pop_up_compressed";

const specs: Record<SpongeToolType, {
  waterAbsorb: number; smoothFinish: number; durability: number;
  controlWet: number; cost: number; natural: boolean; compressed: boolean;
  poreSize: string; use: string;
}> = {
  natural_sea_standard: {
    waterAbsorb: 90, smoothFinish: 85, durability: 70,
    controlWet: 88, cost: 12, natural: true, compressed: false,
    poreSize: "medium_irregular_pore", use: "general_wheel_smooth",
  },
  synthetic_foam_durable: {
    waterAbsorb: 78, smoothFinish: 80, durability: 92,
    controlWet: 82, cost: 5, natural: false, compressed: false,
    poreSize: "uniform_fine_pore", use: "student_cleanup_wipe",
  },
  elephant_ear_large: {
    waterAbsorb: 85, smoothFinish: 92, durability: 65,
    controlWet: 90, cost: 8, natural: false, compressed: true,
    poreSize: "thin_sheet_compress", use: "plate_rim_smooth",
  },
  silk_sponge_fine: {
    waterAbsorb: 82, smoothFinish: 95, durability: 60,
    controlWet: 92, cost: 15, natural: true, compressed: false,
    poreSize: "fine_dense_pore", use: "fine_surface_polish",
  },
  pop_up_compressed: {
    waterAbsorb: 88, smoothFinish: 78, durability: 75,
    controlWet: 80, cost: 3, natural: false, compressed: true,
    poreSize: "compressed_expand_pore", use: "bulk_studio_cleanup",
  },
};

export function waterAbsorb(t: SpongeToolType): number { return specs[t].waterAbsorb; }
export function smoothFinish(t: SpongeToolType): number { return specs[t].smoothFinish; }
export function durability(t: SpongeToolType): number { return specs[t].durability; }
export function controlWet(t: SpongeToolType): number { return specs[t].controlWet; }
export function spongeCost(t: SpongeToolType): number { return specs[t].cost; }
export function natural(t: SpongeToolType): boolean { return specs[t].natural; }
export function compressed(t: SpongeToolType): boolean { return specs[t].compressed; }
export function poreSize(t: SpongeToolType): string { return specs[t].poreSize; }
export function bestUse(t: SpongeToolType): string { return specs[t].use; }
export function spongeTools(): SpongeToolType[] { return Object.keys(specs) as SpongeToolType[]; }
