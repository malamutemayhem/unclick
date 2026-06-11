export type GrommetDieType =
  | "hand_punch_standard"
  | "bench_press_heavy"
  | "self_piercing_quick"
  | "rolled_rim_smooth"
  | "spur_grommet_grip";

const specs: Record<GrommetDieType, {
  setClean: number; holdStrength: number; speedSet: number;
  sizeRange: number; cost: number; selfPiercing: boolean; benchPress: boolean;
  dieStyle: string; use: string;
}> = {
  hand_punch_standard: {
    setClean: 82, holdStrength: 80, speedSet: 78,
    sizeRange: 85, cost: 20, selfPiercing: false, benchPress: false,
    dieStyle: "hand_anvil_die", use: "general_grommet_set",
  },
  bench_press_heavy: {
    setClean: 90, holdStrength: 92, speedSet: 85,
    sizeRange: 90, cost: 80, selfPiercing: false, benchPress: true,
    dieStyle: "lever_press_die", use: "production_grommet_press",
  },
  self_piercing_quick: {
    setClean: 78, holdStrength: 78, speedSet: 92,
    sizeRange: 75, cost: 25, selfPiercing: true, benchPress: false,
    dieStyle: "pierce_set_combo", use: "quick_field_grommet",
  },
  rolled_rim_smooth: {
    setClean: 92, holdStrength: 85, speedSet: 75,
    sizeRange: 80, cost: 30, selfPiercing: false, benchPress: false,
    dieStyle: "rolled_edge_die", use: "smooth_finish_grommet",
  },
  spur_grommet_grip: {
    setClean: 80, holdStrength: 95, speedSet: 80,
    sizeRange: 78, cost: 28, selfPiercing: false, benchPress: false,
    dieStyle: "toothed_washer_die", use: "heavy_canvas_grommet",
  },
};

export function setClean(t: GrommetDieType): number { return specs[t].setClean; }
export function holdStrength(t: GrommetDieType): number { return specs[t].holdStrength; }
export function speedSet(t: GrommetDieType): number { return specs[t].speedSet; }
export function sizeRange(t: GrommetDieType): number { return specs[t].sizeRange; }
export function dieCost(t: GrommetDieType): number { return specs[t].cost; }
export function selfPiercing(t: GrommetDieType): boolean { return specs[t].selfPiercing; }
export function benchPress(t: GrommetDieType): boolean { return specs[t].benchPress; }
export function dieStyle(t: GrommetDieType): string { return specs[t].dieStyle; }
export function bestUse(t: GrommetDieType): string { return specs[t].use; }
export function grommetDies(): GrommetDieType[] { return Object.keys(specs) as GrommetDieType[]; }
