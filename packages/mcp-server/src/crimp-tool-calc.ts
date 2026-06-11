export type CrimpToolType =
  | "ratchet_insulated_term"
  | "hydraulic_cable_lug"
  | "bootlace_ferrule_press"
  | "open_barrel_hand"
  | "dupont_pin_crimper";

const DATA: Record<CrimpToolType, {
  crimpForce: number; repeatability: number; gaugeRange: number;
  durability: number; toolCost: number; ratcheted: boolean;
  forFine: boolean; dieType: string; bestUse: string;
}> = {
  ratchet_insulated_term: { crimpForce: 7, repeatability: 9, gaugeRange: 7, durability: 8, toolCost: 5, ratcheted: true, forFine: false, dieType: "nest_indent_insulated", bestUse: "automotive_wire_terminal" },
  hydraulic_cable_lug: { crimpForce: 10, repeatability: 8, gaugeRange: 10, durability: 9, toolCost: 9, ratcheted: false, forFine: false, dieType: "hexagonal_compress_die", bestUse: "heavy_cable_lug_crimp" },
  bootlace_ferrule_press: { crimpForce: 5, repeatability: 8, gaugeRange: 5, durability: 7, toolCost: 4, ratcheted: true, forFine: true, dieType: "square_ferrule_quad", bestUse: "din_rail_wire_end" },
  open_barrel_hand: { crimpForce: 4, repeatability: 5, gaugeRange: 4, durability: 6, toolCost: 2, ratcheted: false, forFine: false, dieType: "w_shape_open_barrel", bestUse: "quick_splice_repair" },
  dupont_pin_crimper: { crimpForce: 3, repeatability: 7, gaugeRange: 3, durability: 6, toolCost: 6, ratcheted: true, forFine: true, dieType: "micro_pin_nest_fold", bestUse: "dupont_jst_connector" },
};

const get = (t: CrimpToolType) => DATA[t];

export const crimpForce = (t: CrimpToolType) => get(t).crimpForce;
export const repeatability = (t: CrimpToolType) => get(t).repeatability;
export const gaugeRange = (t: CrimpToolType) => get(t).gaugeRange;
export const durability = (t: CrimpToolType) => get(t).durability;
export const toolCost = (t: CrimpToolType) => get(t).toolCost;
export const ratcheted = (t: CrimpToolType) => get(t).ratcheted;
export const forFine = (t: CrimpToolType) => get(t).forFine;
export const dieType = (t: CrimpToolType) => get(t).dieType;
export const bestUse = (t: CrimpToolType) => get(t).bestUse;
export const crimpTools = (): CrimpToolType[] => Object.keys(DATA) as CrimpToolType[];
