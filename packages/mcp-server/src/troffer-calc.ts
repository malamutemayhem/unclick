export type TrofferType =
  | "led_flat_panel_2x4"
  | "led_volumetric_basket"
  | "led_center_basket_2x2"
  | "led_edge_lit_slim"
  | "led_retrofit_kit_tube";

interface TrofferData {
  lumens: number;
  efficiency: number;
  glare: number;
  aesthetic: number;
  trCost: number;
  dimmable: boolean;
  forOffice: boolean;
  optic: string;
  bestUse: string;
}

const DATA: Record<TrofferType, TrofferData> = {
  led_flat_panel_2x4: {
    lumens: 8, efficiency: 9, glare: 7, aesthetic: 7, trCost: 4,
    dimmable: true, forOffice: true,
    optic: "prismatic_lens_flat_diffuser",
    bestUse: "office_classroom_general_2x4",
  },
  led_volumetric_basket: {
    lumens: 8, efficiency: 8, glare: 9, aesthetic: 9, trCost: 7,
    dimmable: true, forOffice: true,
    optic: "volumetric_indirect_direct",
    bestUse: "corporate_office_premium_light",
  },
  led_center_basket_2x2: {
    lumens: 6, efficiency: 8, glare: 8, aesthetic: 8, trCost: 5,
    dimmable: true, forOffice: true,
    optic: "center_basket_parabol_louver",
    bestUse: "small_office_2x2_ceiling_grid",
  },
  led_edge_lit_slim: {
    lumens: 7, efficiency: 9, glare: 8, aesthetic: 9, trCost: 6,
    dimmable: true, forOffice: false,
    optic: "edge_lit_lgp_uniform_spread",
    bestUse: "healthcare_retail_slim_profile",
  },
  led_retrofit_kit_tube: {
    lumens: 7, efficiency: 7, glare: 6, aesthetic: 5, trCost: 2,
    dimmable: false, forOffice: true,
    optic: "led_tube_in_existing_housing",
    bestUse: "retrofit_existing_fluorescent",
  },
};

function get(t: TrofferType): TrofferData {
  return DATA[t];
}

export const lumens = (t: TrofferType) => get(t).lumens;
export const efficiency = (t: TrofferType) => get(t).efficiency;
export const glare = (t: TrofferType) => get(t).glare;
export const aesthetic = (t: TrofferType) => get(t).aesthetic;
export const trCost = (t: TrofferType) => get(t).trCost;
export const dimmable = (t: TrofferType) => get(t).dimmable;
export const forOffice = (t: TrofferType) => get(t).forOffice;
export const optic = (t: TrofferType) => get(t).optic;
export const bestUse = (t: TrofferType) => get(t).bestUse;
export const trofferTypes = (): TrofferType[] =>
  Object.keys(DATA) as TrofferType[];
