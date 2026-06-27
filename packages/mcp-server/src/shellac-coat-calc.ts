export type ShellacCoatType =
  | "blonde_shellac_light"
  | "amber_shellac_warm"
  | "garnet_shellac_dark"
  | "dewaxed_shellac_seal"
  | "button_shellac_natural";

const specs: Record<ShellacCoatType, {
  clarityFinish: number; buildSpeed: number; adhesion: number;
  repairEase: number; cost: number; dewaxed: boolean; dark: boolean;
  flakeGrade: string; use: string;
}> = {
  blonde_shellac_light: {
    clarityFinish: 92, buildSpeed: 85, adhesion: 82,
    repairEase: 88, cost: 8, dewaxed: false, dark: false,
    flakeGrade: "blonde_flake_refined", use: "light_wood_clear_coat",
  },
  amber_shellac_warm: {
    clarityFinish: 82, buildSpeed: 88, adhesion: 85,
    repairEase: 85, cost: 7, dewaxed: false, dark: false,
    flakeGrade: "amber_flake_natural", use: "warm_tone_antique_finish",
  },
  garnet_shellac_dark: {
    clarityFinish: 75, buildSpeed: 85, adhesion: 88,
    repairEase: 82, cost: 7, dewaxed: false, dark: true,
    flakeGrade: "garnet_flake_deep", use: "dark_wood_rich_tone",
  },
  dewaxed_shellac_seal: {
    clarityFinish: 90, buildSpeed: 82, adhesion: 92,
    repairEase: 80, cost: 10, dewaxed: true, dark: false,
    flakeGrade: "dewaxed_flake_pure", use: "universal_seal_primer",
  },
  button_shellac_natural: {
    clarityFinish: 78, buildSpeed: 80, adhesion: 85,
    repairEase: 90, cost: 6, dewaxed: false, dark: false,
    flakeGrade: "button_lac_round", use: "traditional_french_polish",
  },
};

export function clarityFinish(t: ShellacCoatType): number { return specs[t].clarityFinish; }
export function buildSpeed(t: ShellacCoatType): number { return specs[t].buildSpeed; }
export function adhesion(t: ShellacCoatType): number { return specs[t].adhesion; }
export function repairEase(t: ShellacCoatType): number { return specs[t].repairEase; }
export function shellacCost(t: ShellacCoatType): number { return specs[t].cost; }
export function dewaxed(t: ShellacCoatType): boolean { return specs[t].dewaxed; }
export function dark(t: ShellacCoatType): boolean { return specs[t].dark; }
export function flakeGrade(t: ShellacCoatType): string { return specs[t].flakeGrade; }
export function bestUse(t: ShellacCoatType): string { return specs[t].use; }
export function shellacCoats(): ShellacCoatType[] { return Object.keys(specs) as ShellacCoatType[]; }
