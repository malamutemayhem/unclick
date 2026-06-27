export type JointSealantType =
  | "silicone_neutral_cure"
  | "polyurethane_self_level"
  | "polysulfide_fuel_resist"
  | "acrylic_latex_paint"
  | "hybrid_ms_polymer";

interface JointSealantData {
  movement: number;
  adhesion: number;
  longevity: number;
  flexibility: number;
  jsCost: number;
  paintable: boolean;
  forExterior: boolean;
  cure: string;
  bestUse: string;
}

const DATA: Record<JointSealantType, JointSealantData> = {
  silicone_neutral_cure: {
    movement: 9, adhesion: 8, longevity: 10, flexibility: 10, jsCost: 6,
    paintable: false, forExterior: true,
    cure: "moisture_cure_neutral_oxime",
    bestUse: "curtain_wall_glazing_facade",
  },
  polyurethane_self_level: {
    movement: 8, adhesion: 9, longevity: 8, flexibility: 8, jsCost: 5,
    paintable: true, forExterior: true,
    cure: "moisture_cure_polyurethane",
    bestUse: "concrete_floor_joint_horizontal",
  },
  polysulfide_fuel_resist: {
    movement: 7, adhesion: 8, longevity: 9, flexibility: 7, jsCost: 7,
    paintable: false, forExterior: true,
    cure: "two_part_chemical_cure",
    bestUse: "fuel_tank_chemical_resistant",
  },
  acrylic_latex_paint: {
    movement: 4, adhesion: 6, longevity: 5, flexibility: 4, jsCost: 2,
    paintable: true, forExterior: false,
    cure: "water_evaporation_latex_dry",
    bestUse: "interior_trim_baseboard_gap",
  },
  hybrid_ms_polymer: {
    movement: 8, adhesion: 10, longevity: 9, flexibility: 9, jsCost: 7,
    paintable: true, forExterior: true,
    cure: "moisture_cure_silane_term",
    bestUse: "multi_substrate_versatile_bond",
  },
};

function get(t: JointSealantType): JointSealantData {
  return DATA[t];
}

export const movement = (t: JointSealantType) => get(t).movement;
export const adhesion = (t: JointSealantType) => get(t).adhesion;
export const longevity = (t: JointSealantType) => get(t).longevity;
export const flexibility = (t: JointSealantType) => get(t).flexibility;
export const jsCost = (t: JointSealantType) => get(t).jsCost;
export const paintable = (t: JointSealantType) => get(t).paintable;
export const forExterior = (t: JointSealantType) => get(t).forExterior;
export const cure = (t: JointSealantType) => get(t).cure;
export const bestUse = (t: JointSealantType) => get(t).bestUse;
export const jointSealantTypes = (): JointSealantType[] =>
  Object.keys(DATA) as JointSealantType[];
