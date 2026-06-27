export type UfMembraneType =
  | "hollow_fiber_outside_in"
  | "hollow_fiber_inside_out"
  | "tubular_ceramic_robust"
  | "flat_sheet_submerged"
  | "spiral_wound_uf";

interface UfMembraneData {
  rejection: number;
  flux: number;
  backwash: number;
  chemResist: number;
  ufCost: number;
  submerged: boolean;
  forDrinkWater: boolean;
  membrane: string;
  bestUse: string;
}

const DATA: Record<UfMembraneType, UfMembraneData> = {
  hollow_fiber_outside_in: {
    rejection: 7, flux: 8, backwash: 9, chemResist: 6, ufCost: 5,
    submerged: true, forDrinkWater: true,
    membrane: "pvdf_pes_hollow_fiber_outside_in_flow",
    bestUse: "municipal_drink_water_clarify_pretreat",
  },
  hollow_fiber_inside_out: {
    rejection: 7, flux: 7, backwash: 8, chemResist: 6, ufCost: 5,
    submerged: false, forDrinkWater: true,
    membrane: "pvdf_hollow_fiber_pressurize_inside_out",
    bestUse: "industrial_process_water_pretreat_ro",
  },
  tubular_ceramic_robust: {
    rejection: 8, flux: 6, backwash: 10, chemResist: 10, ufCost: 9,
    submerged: false, forDrinkWater: false,
    membrane: "alumina_titania_tube_high_temp_chem",
    bestUse: "oily_wastewater_harsh_chemical_clean",
  },
  flat_sheet_submerged: {
    rejection: 7, flux: 7, backwash: 7, chemResist: 7, ufCost: 6,
    submerged: true, forDrinkWater: false,
    membrane: "flat_sheet_cassette_submerge_aerate",
    bestUse: "mbr_sewage_treat_activated_sludge",
  },
  spiral_wound_uf: {
    rejection: 6, flux: 9, backwash: 5, chemResist: 5, ufCost: 4,
    submerged: false, forDrinkWater: false,
    membrane: "spiral_wound_low_mwco_spacer_feed",
    bestUse: "whey_protein_concentrate_dairy_process",
  },
};

function get(t: UfMembraneType): UfMembraneData {
  return DATA[t];
}

export const rejection = (t: UfMembraneType) => get(t).rejection;
export const flux = (t: UfMembraneType) => get(t).flux;
export const backwash = (t: UfMembraneType) => get(t).backwash;
export const chemResist = (t: UfMembraneType) => get(t).chemResist;
export const ufCost = (t: UfMembraneType) => get(t).ufCost;
export const submerged = (t: UfMembraneType) => get(t).submerged;
export const forDrinkWater = (t: UfMembraneType) => get(t).forDrinkWater;
export const membrane = (t: UfMembraneType) => get(t).membrane;
export const bestUse = (t: UfMembraneType) => get(t).bestUse;
export const ufMembraneTypes = (): UfMembraneType[] =>
  Object.keys(DATA) as UfMembraneType[];
