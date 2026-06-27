export type SealantType =
  | "silicone_rtv_flexible"
  | "polyurethane_pu_structural"
  | "polysulfide_fuel_resistant"
  | "acrylic_latex_paintable"
  | "butyl_rubber_tape_strip";

interface SealantData {
  adhesion: number;
  flexibility: number;
  durability: number;
  uvResist: number;
  slCost: number;
  paintable: boolean;
  forGlazing: boolean;
  cure: string;
  bestUse: string;
}

const DATA: Record<SealantType, SealantData> = {
  silicone_rtv_flexible: {
    adhesion: 7, flexibility: 10, durability: 9, uvResist: 9, slCost: 6,
    paintable: false, forGlazing: true,
    cure: "moisture_cure_acetoxy_or_neutral",
    bestUse: "glazing_wet_area_high_movement_joint",
  },
  polyurethane_pu_structural: {
    adhesion: 10, flexibility: 7, durability: 8, uvResist: 5, slCost: 7,
    paintable: true, forGlazing: false,
    cure: "moisture_cure_isocyanate_react",
    bestUse: "concrete_joint_deck_structural_bond",
  },
  polysulfide_fuel_resistant: {
    adhesion: 8, flexibility: 6, durability: 9, uvResist: 4, slCost: 8,
    paintable: false, forGlazing: true,
    cure: "two_part_chemical_cure_mix",
    bestUse: "fuel_tank_aircraft_immersion_chem",
  },
  acrylic_latex_paintable: {
    adhesion: 5, flexibility: 4, durability: 5, uvResist: 6, slCost: 2,
    paintable: true, forGlazing: false,
    cure: "water_evaporation_latex_dry",
    bestUse: "interior_trim_gap_fill_paint_over",
  },
  butyl_rubber_tape_strip: {
    adhesion: 6, flexibility: 8, durability: 7, uvResist: 7, slCost: 3,
    paintable: false, forGlazing: false,
    cure: "pressure_sensitive_no_cure_tacky",
    bestUse: "roof_flashing_vapor_barrier_bedding",
  },
};

function get(t: SealantType): SealantData {
  return DATA[t];
}

export const adhesion = (t: SealantType) => get(t).adhesion;
export const flexibility = (t: SealantType) => get(t).flexibility;
export const durability = (t: SealantType) => get(t).durability;
export const uvResist = (t: SealantType) => get(t).uvResist;
export const slCost = (t: SealantType) => get(t).slCost;
export const paintable = (t: SealantType) => get(t).paintable;
export const forGlazing = (t: SealantType) => get(t).forGlazing;
export const cure = (t: SealantType) => get(t).cure;
export const bestUse = (t: SealantType) => get(t).bestUse;
export const sealantTypes = (): SealantType[] =>
  Object.keys(DATA) as SealantType[];
