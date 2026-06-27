export type BottleType =
  | "pet_stretch_blow"
  | "hdpe_extrusion_blow"
  | "glass_narrow_neck"
  | "aluminum_drawn_ironed"
  | "bioplastic_pla_compost";

const DATA: Record<BottleType, {
  barrier: number; clarity: number; weight: number;
  recyclability: number; btCost: number; reusable: boolean;
  forCarbonated: boolean; forming: string; bestUse: string;
}> = {
  pet_stretch_blow: {
    barrier: 7, clarity: 9, weight: 9,
    recyclability: 8, btCost: 2, reusable: false,
    forCarbonated: true, forming: "injection_stretch_blow",
    bestUse: "carbonated_soft_drink_water",
  },
  hdpe_extrusion_blow: {
    barrier: 8, clarity: 3, weight: 8,
    recyclability: 8, btCost: 1, reusable: false,
    forCarbonated: false, forming: "extrusion_blow_parison",
    bestUse: "milk_jug_detergent_chemical",
  },
  glass_narrow_neck: {
    barrier: 10, clarity: 10, weight: 2,
    recyclability: 10, btCost: 3, reusable: true,
    forCarbonated: true, forming: "is_blow_blow_gob_press",
    bestUse: "premium_wine_spirits_sauce",
  },
  aluminum_drawn_ironed: {
    barrier: 10, clarity: 1, weight: 7,
    recyclability: 9, btCost: 3, reusable: false,
    forCarbonated: true, forming: "draw_redraw_wall_ironing",
    bestUse: "beer_energy_drink_aerosol",
  },
  bioplastic_pla_compost: {
    barrier: 4, clarity: 7, weight: 8,
    recyclability: 6, btCost: 4, reusable: false,
    forCarbonated: false, forming: "injection_stretch_pla",
    bestUse: "cold_press_juice_kombucha",
  },
};

const get = (t: BottleType) => DATA[t];

export const barrier = (t: BottleType) => get(t).barrier;
export const clarity = (t: BottleType) => get(t).clarity;
export const weight = (t: BottleType) => get(t).weight;
export const recyclability = (t: BottleType) => get(t).recyclability;
export const btCost = (t: BottleType) => get(t).btCost;
export const reusable = (t: BottleType) => get(t).reusable;
export const forCarbonated = (t: BottleType) => get(t).forCarbonated;
export const forming = (t: BottleType) => get(t).forming;
export const bestUse = (t: BottleType) => get(t).bestUse;
export const bottleTypes = (): BottleType[] => Object.keys(DATA) as BottleType[];
