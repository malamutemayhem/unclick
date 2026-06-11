export type JackLoomType =
  | "floor_jack_standard"
  | "table_jack_compact"
  | "folding_jack_portable"
  | "computer_dobby_auto"
  | "spring_return_easy";

const specs: Record<JackLoomType, {
  shedClean: number; setupEase: number; patternRange: number;
  spaceCompact: number; cost: number; computerized: boolean; folding: boolean;
  liftMethod: string; use: string;
}> = {
  floor_jack_standard: {
    shedClean: 85, setupEase: 80, patternRange: 82,
    spaceCompact: 65, cost: 500, computerized: false, folding: false,
    liftMethod: "rising_shaft_jack", use: "general_floor_weave",
  },
  table_jack_compact: {
    shedClean: 78, setupEase: 85, patternRange: 72,
    spaceCompact: 90, cost: 200, computerized: false, folding: false,
    liftMethod: "lever_lift_shaft", use: "small_space_weave",
  },
  folding_jack_portable: {
    shedClean: 80, setupEase: 82, patternRange: 75,
    spaceCompact: 95, cost: 350, computerized: false, folding: true,
    liftMethod: "folding_jack_lift", use: "portable_class_weave",
  },
  computer_dobby_auto: {
    shedClean: 92, setupEase: 75, patternRange: 95,
    spaceCompact: 60, cost: 2000, computerized: true, folding: false,
    liftMethod: "solenoid_shaft_lift", use: "complex_auto_pattern",
  },
  spring_return_easy: {
    shedClean: 82, setupEase: 88, patternRange: 78,
    spaceCompact: 70, cost: 450, computerized: false, folding: false,
    liftMethod: "spring_assist_jack", use: "easy_treadle_return",
  },
};

export function shedClean(t: JackLoomType): number { return specs[t].shedClean; }
export function setupEase(t: JackLoomType): number { return specs[t].setupEase; }
export function patternRange(t: JackLoomType): number { return specs[t].patternRange; }
export function spaceCompact(t: JackLoomType): number { return specs[t].spaceCompact; }
export function loomCost(t: JackLoomType): number { return specs[t].cost; }
export function computerized(t: JackLoomType): boolean { return specs[t].computerized; }
export function folding(t: JackLoomType): boolean { return specs[t].folding; }
export function liftMethod(t: JackLoomType): string { return specs[t].liftMethod; }
export function bestUse(t: JackLoomType): string { return specs[t].use; }
export function jackLooms(): JackLoomType[] { return Object.keys(specs) as JackLoomType[]; }
