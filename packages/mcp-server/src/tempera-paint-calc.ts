// tempera-paint-calc - tempera paint types

export type TemperaPaint =
  | "egg_tempera_traditional"
  | "casein_tempera_matte"
  | "pva_tempera_student"
  | "poster_paint_bright"
  | "gold_ground_tempera";

const DATA: Record<TemperaPaint, {
  colorDepth: number; layerControl: number; drySpeed: number; durability: number;
  cost: number; traditional: boolean; forPanel: boolean; binderBase: string; bestUse: string;
}> = {
  egg_tempera_traditional: { colorDepth: 10, layerControl: 10, drySpeed: 8, durability: 10, cost: 7, traditional: true, forPanel: true, binderBase: "egg_yolk_emulsion", bestUse: "fine_art_panel_paint" },
  casein_tempera_matte:    { colorDepth: 8, layerControl: 8, drySpeed: 9, durability: 8, cost: 6, traditional: true, forPanel: true, binderBase: "milk_protein_binder", bestUse: "matte_illustration_work" },
  pva_tempera_student:     { colorDepth: 5, layerControl: 5, drySpeed: 7, durability: 4, cost: 2, traditional: false, forPanel: false, binderBase: "pva_polymer_binder", bestUse: "student_craft_paint" },
  poster_paint_bright:     { colorDepth: 6, layerControl: 4, drySpeed: 6, durability: 3, cost: 1, traditional: false, forPanel: false, binderBase: "starch_gum_binder", bestUse: "poster_display_paint" },
  gold_ground_tempera:     { colorDepth: 9, layerControl: 9, drySpeed: 7, durability: 9, cost: 9, traditional: true, forPanel: true, binderBase: "egg_gesso_ground", bestUse: "icon_gold_leaf_panel" },
};

const get = (t: TemperaPaint) => DATA[t];
export const colorDepth = (t: TemperaPaint) => get(t).colorDepth;
export const layerControl = (t: TemperaPaint) => get(t).layerControl;
export const drySpeed = (t: TemperaPaint) => get(t).drySpeed;
export const durability = (t: TemperaPaint) => get(t).durability;
export const temperaCost = (t: TemperaPaint) => get(t).cost;
export const traditional = (t: TemperaPaint) => get(t).traditional;
export const forPanel = (t: TemperaPaint) => get(t).forPanel;
export const binderBase = (t: TemperaPaint) => get(t).binderBase;
export const bestUse = (t: TemperaPaint) => get(t).bestUse;
export const temperaPaints = (): TemperaPaint[] => Object.keys(DATA) as TemperaPaint[];
