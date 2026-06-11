export type TuyereForgeType =
  | "side_blast_standard"
  | "bottom_blast_deep"
  | "clinker_breaker_clean"
  | "water_cooled_heavy"
  | "ceramic_lined_high";

const specs: Record<TuyereForgeType, {
  airFlow: number; heatFocus: number; durability: number;
  clinkerClear: number; cost: number; waterCooled: boolean; bottomBlast: boolean;
  blastType: string; use: string;
}> = {
  side_blast_standard: {
    airFlow: 82, heatFocus: 85, durability: 78,
    clinkerClear: 80, cost: 30, waterCooled: false, bottomBlast: false,
    blastType: "side_entry_pipe", use: "general_forge_blast",
  },
  bottom_blast_deep: {
    airFlow: 88, heatFocus: 90, durability: 75,
    clinkerClear: 72, cost: 35, waterCooled: false, bottomBlast: true,
    blastType: "bottom_up_pipe", use: "deep_fire_center",
  },
  clinker_breaker_clean: {
    airFlow: 80, heatFocus: 82, durability: 80,
    clinkerClear: 95, cost: 40, waterCooled: false, bottomBlast: true,
    blastType: "rotating_grate_blast", use: "easy_clinker_clean",
  },
  water_cooled_heavy: {
    airFlow: 85, heatFocus: 88, durability: 95,
    clinkerClear: 78, cost: 60, waterCooled: true, bottomBlast: false,
    blastType: "jacket_cooled_pipe", use: "heavy_welding_heat",
  },
  ceramic_lined_high: {
    airFlow: 78, heatFocus: 92, durability: 88,
    clinkerClear: 82, cost: 50, waterCooled: false, bottomBlast: false,
    blastType: "ceramic_insert_pipe", use: "high_temp_forge",
  },
};

export function airFlow(t: TuyereForgeType): number { return specs[t].airFlow; }
export function heatFocus(t: TuyereForgeType): number { return specs[t].heatFocus; }
export function durability(t: TuyereForgeType): number { return specs[t].durability; }
export function clinkerClear(t: TuyereForgeType): number { return specs[t].clinkerClear; }
export function tuyereCost(t: TuyereForgeType): number { return specs[t].cost; }
export function waterCooled(t: TuyereForgeType): boolean { return specs[t].waterCooled; }
export function bottomBlast(t: TuyereForgeType): boolean { return specs[t].bottomBlast; }
export function blastType(t: TuyereForgeType): string { return specs[t].blastType; }
export function bestUse(t: TuyereForgeType): string { return specs[t].use; }
export function tuyereForges(): TuyereForgeType[] { return Object.keys(specs) as TuyereForgeType[]; }
