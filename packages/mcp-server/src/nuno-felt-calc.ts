// nuno-felt-calc - nuno felting fabric types

export type NunoFelt =
  | "silk_gauze_sheer"
  | "cotton_muslin_light"
  | "silk_chiffon_drape"
  | "linen_scrim_open"
  | "organza_silk_fine";

const DATA: Record<NunoFelt, {
  feltBond: number; drapeQuality: number; shrinkControl: number; textureRange: number;
  cost: number; natural: boolean; forGarment: boolean; weaveType: string; bestUse: string;
}> = {
  silk_gauze_sheer:    { feltBond: 8, drapeQuality: 9, shrinkControl: 6, textureRange: 7, cost: 8, natural: true, forGarment: true, weaveType: "open_plain_weave", bestUse: "sheer_scarf_felt" },
  cotton_muslin_light: { feltBond: 9, drapeQuality: 6, shrinkControl: 8, textureRange: 6, cost: 3, natural: true, forGarment: false, weaveType: "loose_plain_weave", bestUse: "beginner_practice_felt" },
  silk_chiffon_drape:  { feltBond: 7, drapeQuality: 10, shrinkControl: 5, textureRange: 8, cost: 9, natural: true, forGarment: true, weaveType: "twisted_yarn_weave", bestUse: "flowing_garment_felt" },
  linen_scrim_open:    { feltBond: 10, drapeQuality: 4, shrinkControl: 9, textureRange: 5, cost: 4, natural: true, forGarment: false, weaveType: "open_grid_weave", bestUse: "structured_art_felt" },
  organza_silk_fine:   { feltBond: 6, drapeQuality: 8, shrinkControl: 7, textureRange: 9, cost: 7, natural: true, forGarment: true, weaveType: "crisp_plain_weave", bestUse: "textured_accent_felt" },
};

const get = (n: NunoFelt) => DATA[n];
export const feltBond = (n: NunoFelt) => get(n).feltBond;
export const drapeQuality = (n: NunoFelt) => get(n).drapeQuality;
export const shrinkControl = (n: NunoFelt) => get(n).shrinkControl;
export const textureRange = (n: NunoFelt) => get(n).textureRange;
export const nunoCost = (n: NunoFelt) => get(n).cost;
export const natural = (n: NunoFelt) => get(n).natural;
export const forGarment = (n: NunoFelt) => get(n).forGarment;
export const weaveType = (n: NunoFelt) => get(n).weaveType;
export const bestUse = (n: NunoFelt) => get(n).bestUse;
export const nunoFelts = (): NunoFelt[] => Object.keys(DATA) as NunoFelt[];
