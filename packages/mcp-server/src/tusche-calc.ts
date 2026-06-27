// tusche-calc - lithographic tusche ink types

export type Tusche =
  | "liquid_tusche_flow"
  | "stick_tusche_solid"
  | "crayon_tusche_draw"
  | "spray_tusche_mist"
  | "pencil_tusche_fine";

const DATA: Record<Tusche, {
  toneRange: number; controlDraw: number; grainHold: number; mixEase: number;
  cost: number; waterSoluble: boolean; forWash: boolean; greaseBinder: string; bestUse: string;
}> = {
  liquid_tusche_flow:  { toneRange: 10, controlDraw: 6, grainHold: 8, mixEase: 9, cost: 5, waterSoluble: true, forWash: true, greaseBinder: "liquid_grease_emulsion", bestUse: "tonal_wash_litho" },
  stick_tusche_solid:  { toneRange: 7, controlDraw: 8, grainHold: 9, mixEase: 5, cost: 6, waterSoluble: false, forWash: false, greaseBinder: "solid_wax_grease_bar", bestUse: "bold_mark_litho" },
  crayon_tusche_draw:  { toneRange: 6, controlDraw: 9, grainHold: 8, mixEase: 4, cost: 4, waterSoluble: false, forWash: false, greaseBinder: "crayon_wax_grease", bestUse: "textured_draw_litho" },
  spray_tusche_mist:   { toneRange: 8, controlDraw: 4, grainHold: 6, mixEase: 7, cost: 7, waterSoluble: true, forWash: true, greaseBinder: "aerosolized_grease_mist", bestUse: "gradient_spray_litho" },
  pencil_tusche_fine:  { toneRange: 5, controlDraw: 10, grainHold: 7, mixEase: 3, cost: 5, waterSoluble: false, forWash: false, greaseBinder: "grease_pencil_core", bestUse: "fine_detail_litho" },
};

const get = (t: Tusche) => DATA[t];
export const toneRange = (t: Tusche) => get(t).toneRange;
export const controlDraw = (t: Tusche) => get(t).controlDraw;
export const grainHold = (t: Tusche) => get(t).grainHold;
export const mixEase = (t: Tusche) => get(t).mixEase;
export const tuscheCost = (t: Tusche) => get(t).cost;
export const waterSoluble = (t: Tusche) => get(t).waterSoluble;
export const forWash = (t: Tusche) => get(t).forWash;
export const greaseBinder = (t: Tusche) => get(t).greaseBinder;
export const bestUse = (t: Tusche) => get(t).bestUse;
export const tusches = (): Tusche[] => Object.keys(DATA) as Tusche[];
