export type PrimerType =
  | "latex_pva_drywall"
  | "shellac_stain_block"
  | "alkyd_oil_adhesion"
  | "etch_primer_metal_acid"
  | "epoxy_primer_heavy_duty";

interface PrimerData {
  adhesion: number;
  stainBlock: number;
  dryTime: number;
  coverage: number;
  prCost: number;
  waterBased: boolean;
  forMetal: boolean;
  vehicle: string;
  bestUse: string;
}

const DATA: Record<PrimerType, PrimerData> = {
  latex_pva_drywall: {
    adhesion: 5, stainBlock: 4, dryTime: 9, coverage: 9, prCost: 3,
    waterBased: true, forMetal: false,
    vehicle: "polyvinyl_acetate_water_emulsion",
    bestUse: "new_drywall_plaster_seal_porosity",
  },
  shellac_stain_block: {
    adhesion: 7, stainBlock: 10, dryTime: 10, coverage: 6, prCost: 7,
    waterBased: false, forMetal: false,
    vehicle: "shellac_resin_denatured_alcohol",
    bestUse: "smoke_water_stain_knot_odor_seal",
  },
  alkyd_oil_adhesion: {
    adhesion: 9, stainBlock: 7, dryTime: 3, coverage: 7, prCost: 5,
    waterBased: false, forMetal: false,
    vehicle: "alkyd_resin_mineral_spirit_solvent",
    bestUse: "bare_wood_chalky_surface_adhesion",
  },
  etch_primer_metal_acid: {
    adhesion: 10, stainBlock: 3, dryTime: 8, coverage: 5, prCost: 6,
    waterBased: false, forMetal: true,
    vehicle: "phosphoric_acid_vinyl_butyral",
    bestUse: "bare_aluminum_galvanized_metal_bite",
  },
  epoxy_primer_heavy_duty: {
    adhesion: 10, stainBlock: 5, dryTime: 4, coverage: 6, prCost: 8,
    waterBased: false, forMetal: true,
    vehicle: "two_part_epoxy_amine_hardener",
    bestUse: "marine_industrial_steel_corrosion",
  },
};

function get(t: PrimerType): PrimerData {
  return DATA[t];
}

export const adhesion = (t: PrimerType) => get(t).adhesion;
export const stainBlock = (t: PrimerType) => get(t).stainBlock;
export const dryTime = (t: PrimerType) => get(t).dryTime;
export const coverage = (t: PrimerType) => get(t).coverage;
export const prCost = (t: PrimerType) => get(t).prCost;
export const waterBased = (t: PrimerType) => get(t).waterBased;
export const forMetal = (t: PrimerType) => get(t).forMetal;
export const vehicle = (t: PrimerType) => get(t).vehicle;
export const bestUse = (t: PrimerType) => get(t).bestUse;
export const primerTypes = (): PrimerType[] =>
  Object.keys(DATA) as PrimerType[];
