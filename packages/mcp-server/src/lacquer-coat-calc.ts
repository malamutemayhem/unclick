export type LacquerCoatType =
  | "nitrocellulose_spray"
  | "acrylic_lacquer_clear"
  | "catalyzed_lacquer_hard"
  | "water_lacquer_safe"
  | "brushing_lacquer_hand";

const specs: Record<LacquerCoatType, {
  clarityGloss: number; durability: number; drySpeed: number;
  buildLayer: number; cost: number; sprayApply: boolean; waterBased: boolean;
  resinBase: string; use: string;
}> = {
  nitrocellulose_spray: {
    clarityGloss: 90, durability: 82, drySpeed: 92,
    buildLayer: 78, cost: 8, sprayApply: true, waterBased: false,
    resinBase: "nitrocellulose_solvent", use: "fast_spray_furniture",
  },
  acrylic_lacquer_clear: {
    clarityGloss: 92, durability: 85, drySpeed: 88,
    buildLayer: 80, cost: 9, sprayApply: true, waterBased: false,
    resinBase: "acrylic_thermoplastic", use: "crystal_clear_topcoat",
  },
  catalyzed_lacquer_hard: {
    clarityGloss: 88, durability: 95, drySpeed: 80,
    buildLayer: 90, cost: 12, sprayApply: true, waterBased: false,
    resinBase: "acid_catalyzed_resin", use: "heavy_duty_commercial",
  },
  water_lacquer_safe: {
    clarityGloss: 85, durability: 80, drySpeed: 78,
    buildLayer: 82, cost: 10, sprayApply: true, waterBased: true,
    resinBase: "waterborne_acrylic", use: "low_voc_indoor_finish",
  },
  brushing_lacquer_hand: {
    clarityGloss: 82, durability: 78, drySpeed: 75,
    buildLayer: 85, cost: 7, sprayApply: false, waterBased: false,
    resinBase: "slow_evap_solvent", use: "hand_brush_small_project",
  },
};

export function clarityGloss(t: LacquerCoatType): number { return specs[t].clarityGloss; }
export function durability(t: LacquerCoatType): number { return specs[t].durability; }
export function drySpeed(t: LacquerCoatType): number { return specs[t].drySpeed; }
export function buildLayer(t: LacquerCoatType): number { return specs[t].buildLayer; }
export function lacquerCost(t: LacquerCoatType): number { return specs[t].cost; }
export function sprayApply(t: LacquerCoatType): boolean { return specs[t].sprayApply; }
export function waterBased(t: LacquerCoatType): boolean { return specs[t].waterBased; }
export function resinBase(t: LacquerCoatType): string { return specs[t].resinBase; }
export function bestUse(t: LacquerCoatType): string { return specs[t].use; }
export function lacquerCoats(): LacquerCoatType[] { return Object.keys(specs) as LacquerCoatType[]; }
