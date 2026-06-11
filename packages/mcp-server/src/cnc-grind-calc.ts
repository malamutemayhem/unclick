export type CncGrindType =
  | "surface_grind_reciprocate"
  | "cylindrical_od_plunge"
  | "centerless_thrufeed"
  | "creep_feed_deep"
  | "jig_grind_coordinate";

interface CncGrindData {
  precision: number;
  speed: number;
  surfaceFinish: number;
  versatility: number;
  cgCost: number;
  automated: boolean;
  forHardened: boolean;
  wheel: string;
  bestUse: string;
}

const DATA: Record<CncGrindType, CncGrindData> = {
  surface_grind_reciprocate: {
    precision: 9, speed: 7, surfaceFinish: 9, versatility: 8, cgCost: 5,
    automated: true, forHardened: true,
    wheel: "aluminum_oxide_vitrified_bond",
    bestUse: "flat_surface_die_mold_plate",
  },
  cylindrical_od_plunge: {
    precision: 10, speed: 8, surfaceFinish: 9, versatility: 6, cgCost: 7,
    automated: true, forHardened: true,
    wheel: "cbn_vitrified_superabrasive",
    bestUse: "shaft_bearing_journal_race",
  },
  centerless_thrufeed: {
    precision: 8, speed: 10, surfaceFinish: 8, versatility: 5, cgCost: 8,
    automated: true, forHardened: true,
    wheel: "aluminum_oxide_resin_bond",
    bestUse: "pin_rod_tube_high_volume_round",
  },
  creep_feed_deep: {
    precision: 9, speed: 6, surfaceFinish: 8, versatility: 7, cgCost: 9,
    automated: true, forHardened: true,
    wheel: "cbn_plated_single_layer",
    bestUse: "turbine_root_form_deep_profile",
  },
  jig_grind_coordinate: {
    precision: 10, speed: 4, surfaceFinish: 10, versatility: 9, cgCost: 10,
    automated: true, forHardened: true,
    wheel: "small_diameter_cbn_point",
    bestUse: "die_cavity_precision_bore_slot",
  },
};

function get(t: CncGrindType): CncGrindData {
  return DATA[t];
}

export const precision = (t: CncGrindType) => get(t).precision;
export const speed = (t: CncGrindType) => get(t).speed;
export const surfaceFinish = (t: CncGrindType) => get(t).surfaceFinish;
export const versatility = (t: CncGrindType) => get(t).versatility;
export const cgCost = (t: CncGrindType) => get(t).cgCost;
export const automated = (t: CncGrindType) => get(t).automated;
export const forHardened = (t: CncGrindType) => get(t).forHardened;
export const wheel = (t: CncGrindType) => get(t).wheel;
export const bestUse = (t: CncGrindType) => get(t).bestUse;
export const cncGrindTypes = (): CncGrindType[] =>
  Object.keys(DATA) as CncGrindType[];
