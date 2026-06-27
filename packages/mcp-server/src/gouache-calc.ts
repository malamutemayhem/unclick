// gouache-calc - gouache paint types

export type Gouache =
  | "designer_gouache_pro"
  | "student_gouache_basic"
  | "acrylic_gouache_bind"
  | "casein_gouache_matte"
  | "watercolor_gouache_blend";

const DATA: Record<Gouache, {
  opacity: number; colorIntense: number; rewetAbility: number; layerSmooth: number;
  cost: number; waterproof: boolean; forIllustration: boolean; binderType: string; bestUse: string;
}> = {
  designer_gouache_pro:     { opacity: 10, colorIntense: 10, rewetAbility: 9, layerSmooth: 9, cost: 9, waterproof: false, forIllustration: true, binderType: "gum_arabic_premium", bestUse: "professional_illustration" },
  student_gouache_basic:    { opacity: 7, colorIntense: 6, rewetAbility: 8, layerSmooth: 6, cost: 3, waterproof: false, forIllustration: false, binderType: "gum_arabic_economy", bestUse: "student_practice_paint" },
  acrylic_gouache_bind:     { opacity: 9, colorIntense: 8, rewetAbility: 3, layerSmooth: 8, cost: 7, waterproof: true, forIllustration: true, binderType: "acrylic_polymer_emulsion", bestUse: "permanent_matte_layer" },
  casein_gouache_matte:     { opacity: 8, colorIntense: 7, rewetAbility: 4, layerSmooth: 7, cost: 6, waterproof: true, forIllustration: false, binderType: "milk_casein_protein", bestUse: "ultra_matte_surface" },
  watercolor_gouache_blend: { opacity: 6, colorIntense: 8, rewetAbility: 10, layerSmooth: 8, cost: 5, waterproof: false, forIllustration: false, binderType: "honey_gum_arabic", bestUse: "translucent_wash_blend" },
};

const get = (g: Gouache) => DATA[g];
export const opacity = (g: Gouache) => get(g).opacity;
export const colorIntense = (g: Gouache) => get(g).colorIntense;
export const rewetAbility = (g: Gouache) => get(g).rewetAbility;
export const layerSmooth = (g: Gouache) => get(g).layerSmooth;
export const gouacheCost = (g: Gouache) => get(g).cost;
export const waterproof = (g: Gouache) => get(g).waterproof;
export const forIllustration = (g: Gouache) => get(g).forIllustration;
export const binderType = (g: Gouache) => get(g).binderType;
export const bestUse = (g: Gouache) => get(g).bestUse;
export const gouaches = (): Gouache[] => Object.keys(DATA) as Gouache[];
