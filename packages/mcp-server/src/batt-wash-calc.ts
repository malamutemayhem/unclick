// batt-wash-calc - kiln batt wash coating types

export type BattWash =
  | "alumina_wash_standard"
  | "zircon_wash_premium"
  | "kaolin_wash_basic"
  | "silica_wash_light"
  | "commercial_wash_ready";

const DATA: Record<BattWash, {
  releaseClean: number; durability: number; applyEase: number; tempRange: number;
  cost: number; premixed: boolean; forHighFire: boolean; coatBase: string; bestUse: string;
}> = {
  alumina_wash_standard:  { releaseClean: 8, durability: 8, applyEase: 7, tempRange: 9, cost: 5, premixed: false, forHighFire: true, coatBase: "alumina_hydrate_mix", bestUse: "general_shelf_protect" },
  zircon_wash_premium:    { releaseClean: 10, durability: 10, applyEase: 6, tempRange: 10, cost: 9, premixed: false, forHighFire: true, coatBase: "zirconium_silicate_mix", bestUse: "high_fire_shelf_coat" },
  kaolin_wash_basic:      { releaseClean: 6, durability: 5, applyEase: 9, tempRange: 6, cost: 2, premixed: false, forHighFire: false, coatBase: "kaolin_clay_slurry", bestUse: "low_fire_basic_coat" },
  silica_wash_light:      { releaseClean: 7, durability: 6, applyEase: 8, tempRange: 7, cost: 3, premixed: false, forHighFire: false, coatBase: "fine_silica_flour_mix", bestUse: "earthenware_shelf_dust" },
  commercial_wash_ready:  { releaseClean: 8, durability: 7, applyEase: 10, tempRange: 8, cost: 7, premixed: true, forHighFire: true, coatBase: "premixed_shelf_coat", bestUse: "convenience_quick_coat" },
};

const get = (w: BattWash) => DATA[w];
export const releaseClean = (w: BattWash) => get(w).releaseClean;
export const durability = (w: BattWash) => get(w).durability;
export const applyEase = (w: BattWash) => get(w).applyEase;
export const tempRange = (w: BattWash) => get(w).tempRange;
export const washCost = (w: BattWash) => get(w).cost;
export const premixed = (w: BattWash) => get(w).premixed;
export const forHighFire = (w: BattWash) => get(w).forHighFire;
export const coatBase = (w: BattWash) => get(w).coatBase;
export const bestUse = (w: BattWash) => get(w).bestUse;
export const battWashs = (): BattWash[] => Object.keys(DATA) as BattWash[];
