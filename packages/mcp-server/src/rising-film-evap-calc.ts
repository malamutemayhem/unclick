export type RisingFilmEvapType =
  | "natural_circulation_calandria"
  | "forced_circulation_pump"
  | "climbing_film_long_tube"
  | "basket_type_removable"
  | "propeller_calandria";

interface RisingFilmEvapData {
  heatTransfer: number;
  foulingHandle: number;
  headroom: number;
  turndown: number;
  rfCost: number;
  forcedCirc: boolean;
  forScaling: boolean;
  design: string;
  bestUse: string;
}

const DATA: Record<RisingFilmEvapType, RisingFilmEvapData> = {
  natural_circulation_calandria: {
    heatTransfer: 7, foulingHandle: 7, headroom: 4, turndown: 6, rfCost: 4,
    forcedCirc: false, forScaling: false,
    design: "short_tube_calandria_natural_thermosyphon",
    bestUse: "sugar_cane_juice_evaporation_multi_effect",
  },
  forced_circulation_pump: {
    heatTransfer: 8, foulingHandle: 9, headroom: 6, turndown: 8, rfCost: 7,
    forcedCirc: true, forScaling: true,
    design: "external_pump_high_velocity_tube_bundle",
    bestUse: "scaling_crystallizing_solution_caustic",
  },
  climbing_film_long_tube: {
    heatTransfer: 8, foulingHandle: 5, headroom: 3, turndown: 5, rfCost: 4,
    forcedCirc: false, forScaling: false,
    design: "long_vertical_tube_natural_climb_boil",
    bestUse: "dilute_solution_high_delta_t_concentrate",
  },
  basket_type_removable: {
    heatTransfer: 6, foulingHandle: 10, headroom: 5, turndown: 5, rfCost: 5,
    forcedCirc: false, forScaling: true,
    design: "removable_basket_tube_bundle_clean_access",
    bestUse: "heavy_fouling_mineral_salt_easy_clean",
  },
  propeller_calandria: {
    heatTransfer: 7, foulingHandle: 8, headroom: 5, turndown: 7, rfCost: 6,
    forcedCirc: true, forScaling: true,
    design: "propeller_driven_calandria_forced_flow",
    bestUse: "viscous_sugar_massecuite_high_brix",
  },
};

function get(t: RisingFilmEvapType): RisingFilmEvapData {
  return DATA[t];
}

export const heatTransfer = (t: RisingFilmEvapType) => get(t).heatTransfer;
export const foulingHandle = (t: RisingFilmEvapType) => get(t).foulingHandle;
export const headroom = (t: RisingFilmEvapType) => get(t).headroom;
export const turndown = (t: RisingFilmEvapType) => get(t).turndown;
export const rfCost = (t: RisingFilmEvapType) => get(t).rfCost;
export const forcedCirc = (t: RisingFilmEvapType) => get(t).forcedCirc;
export const forScaling = (t: RisingFilmEvapType) => get(t).forScaling;
export const design = (t: RisingFilmEvapType) => get(t).design;
export const bestUse = (t: RisingFilmEvapType) => get(t).bestUse;
export const risingFilmEvapTypes = (): RisingFilmEvapType[] =>
  Object.keys(DATA) as RisingFilmEvapType[];
