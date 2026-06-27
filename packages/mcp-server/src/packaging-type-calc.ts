export type PackagingType =
  | "corrugated_rsc_box"
  | "rigid_setup_luxury"
  | "flexible_pouch_stand"
  | "blister_thermoform"
  | "shrink_wrap_bundle";

const DATA: Record<PackagingType, {
  protection: number; presentation: number; stackability: number;
  sustainability: number; pkCost: number; recyclable: boolean;
  forEcommerce: boolean; material: string; bestUse: string;
}> = {
  corrugated_rsc_box: {
    protection: 8, presentation: 4, stackability: 9,
    sustainability: 8, pkCost: 2, recyclable: true,
    forEcommerce: true, material: "kraft_fluted_cardboard",
    bestUse: "shipping_ecommerce_fulfillment",
  },
  rigid_setup_luxury: {
    protection: 9, presentation: 10, stackability: 7,
    sustainability: 4, pkCost: 5, recyclable: false,
    forEcommerce: false, material: "chipboard_wrapped_paper",
    bestUse: "luxury_cosmetic_electronics_unbox",
  },
  flexible_pouch_stand: {
    protection: 6, presentation: 7, stackability: 3,
    sustainability: 5, pkCost: 2, recyclable: false,
    forEcommerce: false, material: "laminated_film_foil",
    bestUse: "snack_food_coffee_retail_shelf",
  },
  blister_thermoform: {
    protection: 9, presentation: 8, stackability: 6,
    sustainability: 3, pkCost: 3, recyclable: false,
    forEcommerce: false, material: "pvc_pet_thermoform_card",
    bestUse: "pharmaceutical_hardware_peg_hang",
  },
  shrink_wrap_bundle: {
    protection: 5, presentation: 3, stackability: 8,
    sustainability: 4, pkCost: 1, recyclable: true,
    forEcommerce: true, material: "polyethylene_shrink_film",
    bestUse: "beverage_multipack_pallet_wrap",
  },
};

const get = (t: PackagingType) => DATA[t];

export const protection = (t: PackagingType) => get(t).protection;
export const presentation = (t: PackagingType) => get(t).presentation;
export const stackability = (t: PackagingType) => get(t).stackability;
export const sustainability = (t: PackagingType) => get(t).sustainability;
export const pkCost = (t: PackagingType) => get(t).pkCost;
export const recyclable = (t: PackagingType) => get(t).recyclable;
export const forEcommerce = (t: PackagingType) => get(t).forEcommerce;
export const material = (t: PackagingType) => get(t).material;
export const bestUse = (t: PackagingType) => get(t).bestUse;
export const packagingTypes = (): PackagingType[] => Object.keys(DATA) as PackagingType[];
