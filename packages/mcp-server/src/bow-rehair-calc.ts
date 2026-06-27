export type BowRehairType =
  | "mongolian_white_standard"
  | "stallion_black_coarse"
  | "synthetic_nylon_durable"
  | "siberian_silver_fine"
  | "salt_pepper_blend_warm";

const specs: Record<BowRehairType, {
  gripBite: number; toneWarm: number; durability: number;
  responseQuick: number; cost: number; natural: boolean; forBass: boolean;
  hairSource: string; use: string;
}> = {
  mongolian_white_standard: {
    gripBite: 82, toneWarm: 85, durability: 75,
    responseQuick: 88, cost: 60, natural: true, forBass: false,
    hairSource: "mongolian_horse_tail", use: "general_violin_rehair",
  },
  stallion_black_coarse: {
    gripBite: 95, toneWarm: 72, durability: 80,
    responseQuick: 78, cost: 70, natural: true, forBass: true,
    hairSource: "stallion_tail_coarse", use: "bass_cello_rehair",
  },
  synthetic_nylon_durable: {
    gripBite: 70, toneWarm: 65, durability: 95,
    responseQuick: 75, cost: 30, natural: false, forBass: false,
    hairSource: "extruded_nylon_fiber", use: "student_bow_rehair",
  },
  siberian_silver_fine: {
    gripBite: 88, toneWarm: 92, durability: 70,
    responseQuick: 90, cost: 90, natural: true, forBass: false,
    hairSource: "siberian_mare_select", use: "concert_bow_rehair",
  },
  salt_pepper_blend_warm: {
    gripBite: 85, toneWarm: 88, durability: 78,
    responseQuick: 82, cost: 75, natural: true, forBass: false,
    hairSource: "mixed_white_black_blend", use: "warm_tone_rehair",
  },
};

export function gripBite(t: BowRehairType): number { return specs[t].gripBite; }
export function toneWarm(t: BowRehairType): number { return specs[t].toneWarm; }
export function durability(t: BowRehairType): number { return specs[t].durability; }
export function responseQuick(t: BowRehairType): number { return specs[t].responseQuick; }
export function hairCost(t: BowRehairType): number { return specs[t].cost; }
export function natural(t: BowRehairType): boolean { return specs[t].natural; }
export function forBass(t: BowRehairType): boolean { return specs[t].forBass; }
export function hairSource(t: BowRehairType): string { return specs[t].hairSource; }
export function bestUse(t: BowRehairType): string { return specs[t].use; }
export function bowRehairs(): BowRehairType[] { return Object.keys(specs) as BowRehairType[]; }
