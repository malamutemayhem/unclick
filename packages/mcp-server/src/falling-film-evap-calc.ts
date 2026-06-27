export type FallingFilmEvapType =
  | "tubular_vertical_standard"
  | "plate_type_compact"
  | "wiped_film_viscous"
  | "agitated_thin_film"
  | "horizontal_tube_spray";

interface FallingFilmEvapData {
  heatTransfer: number;
  residence: number;
  foulingResist: number;
  capacity: number;
  ffCost: number;
  shortResidence: boolean;
  forViscous: boolean;
  surface: string;
  bestUse: string;
}

const DATA: Record<FallingFilmEvapType, FallingFilmEvapData> = {
  tubular_vertical_standard: {
    heatTransfer: 8, residence: 8, foulingResist: 6, capacity: 9, ffCost: 5,
    shortResidence: true, forViscous: false,
    surface: "vertical_tube_bundle_liquid_film_inside",
    bestUse: "juice_milk_sugar_syrup_multi_effect",
  },
  plate_type_compact: {
    heatTransfer: 9, residence: 9, foulingResist: 7, capacity: 7, ffCost: 6,
    shortResidence: true, forViscous: false,
    surface: "corrugated_plate_pack_thin_film_channel",
    bestUse: "dairy_whey_concentrate_compact_cip_clean",
  },
  wiped_film_viscous: {
    heatTransfer: 7, residence: 10, foulingResist: 9, capacity: 4, ffCost: 8,
    shortResidence: true, forViscous: true,
    surface: "rotating_wiper_blade_thin_film_cylinder",
    bestUse: "polymer_resin_viscous_solvent_strip",
  },
  agitated_thin_film: {
    heatTransfer: 8, residence: 9, foulingResist: 10, capacity: 5, ffCost: 9,
    shortResidence: true, forViscous: true,
    surface: "hinged_blade_agitator_heated_wall_scrape",
    bestUse: "pharma_api_purify_high_boil_residue",
  },
  horizontal_tube_spray: {
    heatTransfer: 7, residence: 7, foulingResist: 5, capacity: 8, ffCost: 5,
    shortResidence: false, forViscous: false,
    surface: "horizontal_tube_spray_film_outside",
    bestUse: "seawater_desalination_brine_concentrate",
  },
};

function get(t: FallingFilmEvapType): FallingFilmEvapData {
  return DATA[t];
}

export const heatTransfer = (t: FallingFilmEvapType) => get(t).heatTransfer;
export const residence = (t: FallingFilmEvapType) => get(t).residence;
export const foulingResist = (t: FallingFilmEvapType) => get(t).foulingResist;
export const capacity = (t: FallingFilmEvapType) => get(t).capacity;
export const ffCost = (t: FallingFilmEvapType) => get(t).ffCost;
export const shortResidence = (t: FallingFilmEvapType) => get(t).shortResidence;
export const forViscous = (t: FallingFilmEvapType) => get(t).forViscous;
export const surface = (t: FallingFilmEvapType) => get(t).surface;
export const bestUse = (t: FallingFilmEvapType) => get(t).bestUse;
export const fallingFilmEvapTypes = (): FallingFilmEvapType[] =>
  Object.keys(DATA) as FallingFilmEvapType[];
