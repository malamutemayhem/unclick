export type FlexNibType =
  | "hunt_101_standard"
  | "brause_66_extra_fine"
  | "nikko_g_beginner"
  | "leonardt_principal_flex"
  | "gillott_303_hairline";

const specs: Record<FlexNibType, {
  flexRange: number; lineVariation: number; controlFine: number;
  durability: number; cost: number; forBeginner: boolean; hairline: boolean;
  nibMetal: string; use: string;
}> = {
  hunt_101_standard: {
    flexRange: 85, lineVariation: 88, controlFine: 82,
    durability: 80, cost: 3, forBeginner: false, hairline: false,
    nibMetal: "carbon_steel_tempered", use: "general_pointed_pen",
  },
  brause_66_extra_fine: {
    flexRange: 90, lineVariation: 92, controlFine: 88,
    durability: 78, cost: 4, forBeginner: false, hairline: true,
    nibMetal: "blue_pumpkin_steel", use: "fine_flourish_script",
  },
  nikko_g_beginner: {
    flexRange: 72, lineVariation: 75, controlFine: 90,
    durability: 92, cost: 2, forBeginner: true, hairline: false,
    nibMetal: "chrome_plated_steel", use: "beginner_practice_script",
  },
  leonardt_principal_flex: {
    flexRange: 95, lineVariation: 95, controlFine: 78,
    durability: 75, cost: 5, forBeginner: false, hairline: true,
    nibMetal: "spring_temper_steel", use: "expressive_copperplate",
  },
  gillott_303_hairline: {
    flexRange: 88, lineVariation: 90, controlFine: 85,
    durability: 72, cost: 4, forBeginner: false, hairline: true,
    nibMetal: "fine_point_steel", use: "delicate_ornamental_script",
  },
};

export function flexRange(t: FlexNibType): number { return specs[t].flexRange; }
export function lineVariation(t: FlexNibType): number { return specs[t].lineVariation; }
export function controlFine(t: FlexNibType): number { return specs[t].controlFine; }
export function durability(t: FlexNibType): number { return specs[t].durability; }
export function nibCost(t: FlexNibType): number { return specs[t].cost; }
export function forBeginner(t: FlexNibType): boolean { return specs[t].forBeginner; }
export function hairline(t: FlexNibType): boolean { return specs[t].hairline; }
export function nibMetal(t: FlexNibType): string { return specs[t].nibMetal; }
export function bestUse(t: FlexNibType): string { return specs[t].use; }
export function flexNibs(): FlexNibType[] { return Object.keys(specs) as FlexNibType[]; }
