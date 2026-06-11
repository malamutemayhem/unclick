export type PitFireType =
  | "open_pit_standard"
  | "sawdust_pit_slow"
  | "dung_fuel_earthy"
  | "seaweed_pit_salt"
  | "banana_leaf_wrap";

const specs: Record<PitFireType, {
  carbonMark: number; colorVariety: number; tempControl: number;
  smokePattern: number; cost: number; wrapped: boolean; organic: boolean;
  fuelType: string; use: string;
}> = {
  open_pit_standard: {
    carbonMark: 85, colorVariety: 82, tempControl: 65,
    smokePattern: 80, cost: 5, wrapped: false, organic: true,
    fuelType: "mixed_wood_fire", use: "general_pit_fire",
  },
  sawdust_pit_slow: {
    carbonMark: 92, colorVariety: 88, tempControl: 78,
    smokePattern: 90, cost: 8, wrapped: false, organic: true,
    fuelType: "fine_sawdust_pack", use: "slow_carbon_pattern",
  },
  dung_fuel_earthy: {
    carbonMark: 80, colorVariety: 78, tempControl: 72,
    smokePattern: 85, cost: 3, wrapped: false, organic: true,
    fuelType: "dried_dung_cake", use: "earthy_traditional_fire",
  },
  seaweed_pit_salt: {
    carbonMark: 78, colorVariety: 90, tempControl: 68,
    smokePattern: 82, cost: 6, wrapped: true, organic: true,
    fuelType: "wet_seaweed_wrap", use: "salt_glaze_flash",
  },
  banana_leaf_wrap: {
    carbonMark: 88, colorVariety: 85, tempControl: 75,
    smokePattern: 88, cost: 4, wrapped: true, organic: true,
    fuelType: "green_leaf_wrap", use: "leaf_pattern_mark",
  },
};

export function carbonMark(t: PitFireType): number { return specs[t].carbonMark; }
export function colorVariety(t: PitFireType): number { return specs[t].colorVariety; }
export function tempControl(t: PitFireType): number { return specs[t].tempControl; }
export function smokePattern(t: PitFireType): number { return specs[t].smokePattern; }
export function fireCost(t: PitFireType): number { return specs[t].cost; }
export function wrapped(t: PitFireType): boolean { return specs[t].wrapped; }
export function organic(t: PitFireType): boolean { return specs[t].organic; }
export function fuelType(t: PitFireType): string { return specs[t].fuelType; }
export function bestUse(t: PitFireType): string { return specs[t].use; }
export function pitFires(): PitFireType[] { return Object.keys(specs) as PitFireType[]; }
