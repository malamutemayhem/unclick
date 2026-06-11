export type KintsugiRepairType =
  | "urushi_gold_traditional"
  | "epoxy_gold_modern"
  | "silver_powder_subtle"
  | "copper_powder_warm"
  | "synthetic_lacquer_quick";

const specs: Record<KintsugiRepairType, {
  bondStrength: number; finishBeauty: number; durability: number;
  workTime: number; cost: number; traditional: boolean; precious: boolean;
  metalPowder: string; use: string;
}> = {
  urushi_gold_traditional: {
    bondStrength: 85, finishBeauty: 95, durability: 92,
    workTime: 60, cost: 80, traditional: true, precious: true,
    metalPowder: "pure_gold_powder", use: "museum_quality_repair",
  },
  epoxy_gold_modern: {
    bondStrength: 92, finishBeauty: 82, durability: 88,
    workTime: 85, cost: 30, traditional: false, precious: true,
    metalPowder: "gold_mica_powder", use: "durable_gold_repair",
  },
  silver_powder_subtle: {
    bondStrength: 85, finishBeauty: 88, durability: 85,
    workTime: 70, cost: 50, traditional: true, precious: true,
    metalPowder: "fine_silver_powder", use: "subtle_elegant_repair",
  },
  copper_powder_warm: {
    bondStrength: 85, finishBeauty: 85, durability: 82,
    workTime: 72, cost: 25, traditional: false, precious: false,
    metalPowder: "copper_bronze_powder", use: "warm_tone_repair",
  },
  synthetic_lacquer_quick: {
    bondStrength: 88, finishBeauty: 75, durability: 80,
    workTime: 92, cost: 15, traditional: false, precious: false,
    metalPowder: "synthetic_gold_flake", use: "quick_practice_repair",
  },
};

export function bondStrength(t: KintsugiRepairType): number { return specs[t].bondStrength; }
export function finishBeauty(t: KintsugiRepairType): number { return specs[t].finishBeauty; }
export function durability(t: KintsugiRepairType): number { return specs[t].durability; }
export function workTime(t: KintsugiRepairType): number { return specs[t].workTime; }
export function repairCost(t: KintsugiRepairType): number { return specs[t].cost; }
export function traditional(t: KintsugiRepairType): boolean { return specs[t].traditional; }
export function precious(t: KintsugiRepairType): boolean { return specs[t].precious; }
export function metalPowder(t: KintsugiRepairType): string { return specs[t].metalPowder; }
export function bestUse(t: KintsugiRepairType): string { return specs[t].use; }
export function kintsugiRepairs(): KintsugiRepairType[] { return Object.keys(specs) as KintsugiRepairType[]; }
