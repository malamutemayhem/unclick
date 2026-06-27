export type RigidHeddleType =
  | "ten_dent_standard"
  | "twelve_dent_fine"
  | "eight_dent_coarse"
  | "fifteen_dent_very_fine"
  | "variable_dent_combo";

const specs: Record<RigidHeddleType, {
  settRange: number; threadEase: number; patternRange: number;
  fabricFine: number; cost: number; variable: boolean; forFine: boolean;
  dentSpacing: string; use: string;
}> = {
  ten_dent_standard: {
    settRange: 82, threadEase: 85, patternRange: 80,
    fabricFine: 78, cost: 20, variable: false, forFine: false,
    dentSpacing: "ten_per_inch", use: "general_worsted_weave",
  },
  twelve_dent_fine: {
    settRange: 78, threadEase: 80, patternRange: 82,
    fabricFine: 85, cost: 22, variable: false, forFine: true,
    dentSpacing: "twelve_per_inch", use: "fine_cotton_weave",
  },
  eight_dent_coarse: {
    settRange: 85, threadEase: 90, patternRange: 75,
    fabricFine: 70, cost: 18, variable: false, forFine: false,
    dentSpacing: "eight_per_inch", use: "bulky_yarn_weave",
  },
  fifteen_dent_very_fine: {
    settRange: 72, threadEase: 75, patternRange: 85,
    fabricFine: 92, cost: 25, variable: false, forFine: true,
    dentSpacing: "fifteen_per_inch", use: "very_fine_thread_weave",
  },
  variable_dent_combo: {
    settRange: 95, threadEase: 78, patternRange: 88,
    fabricFine: 82, cost: 35, variable: true, forFine: false,
    dentSpacing: "variable_slot_hole", use: "mixed_yarn_weight",
  },
};

export function settRange(t: RigidHeddleType): number { return specs[t].settRange; }
export function threadEase(t: RigidHeddleType): number { return specs[t].threadEase; }
export function patternRange(t: RigidHeddleType): number { return specs[t].patternRange; }
export function fabricFine(t: RigidHeddleType): number { return specs[t].fabricFine; }
export function heddleCost(t: RigidHeddleType): number { return specs[t].cost; }
export function variable(t: RigidHeddleType): boolean { return specs[t].variable; }
export function forFine(t: RigidHeddleType): boolean { return specs[t].forFine; }
export function dentSpacing(t: RigidHeddleType): string { return specs[t].dentSpacing; }
export function bestUse(t: RigidHeddleType): string { return specs[t].use; }
export function rigidHeddles(): RigidHeddleType[] { return Object.keys(specs) as RigidHeddleType[]; }
