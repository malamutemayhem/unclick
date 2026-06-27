export type PatinaFinishType =
  | "black_patina_dark"
  | "copper_patina_warm"
  | "green_patina_antique"
  | "brass_patina_gold"
  | "clear_wax_protect";

const specs: Record<PatinaFinishType, {
  colorDepth: number; durability: number; applyEase: number;
  drySpeed: number; cost: number; protective: boolean; antique: boolean;
  chemBase: string; use: string;
}> = {
  black_patina_dark: {
    colorDepth: 92, durability: 85, applyEase: 88,
    drySpeed: 82, cost: 6, protective: false, antique: false,
    chemBase: "selenium_dioxide_acid", use: "dark_solder_line_finish",
  },
  copper_patina_warm: {
    colorDepth: 88, durability: 82, applyEase: 85,
    drySpeed: 80, cost: 7, protective: false, antique: false,
    chemBase: "copper_sulfate_solution", use: "warm_copper_tone_finish",
  },
  green_patina_antique: {
    colorDepth: 85, durability: 78, applyEase: 78,
    drySpeed: 75, cost: 8, protective: false, antique: true,
    chemBase: "ammonia_salt_solution", use: "aged_verdigris_effect",
  },
  brass_patina_gold: {
    colorDepth: 82, durability: 80, applyEase: 82,
    drySpeed: 78, cost: 7, protective: false, antique: false,
    chemBase: "brass_toning_compound", use: "golden_warm_highlight",
  },
  clear_wax_protect: {
    colorDepth: 70, durability: 90, applyEase: 92,
    drySpeed: 88, cost: 5, protective: true, antique: false,
    chemBase: "carnauba_beeswax_blend", use: "seal_protect_patina",
  },
};

export function colorDepth(t: PatinaFinishType): number { return specs[t].colorDepth; }
export function durability(t: PatinaFinishType): number { return specs[t].durability; }
export function applyEase(t: PatinaFinishType): number { return specs[t].applyEase; }
export function drySpeed(t: PatinaFinishType): number { return specs[t].drySpeed; }
export function finishCost(t: PatinaFinishType): number { return specs[t].cost; }
export function protective(t: PatinaFinishType): boolean { return specs[t].protective; }
export function antique(t: PatinaFinishType): boolean { return specs[t].antique; }
export function chemBase(t: PatinaFinishType): string { return specs[t].chemBase; }
export function bestUse(t: PatinaFinishType): string { return specs[t].use; }
export function patinaFinishs(): PatinaFinishType[] { return Object.keys(specs) as PatinaFinishType[]; }
