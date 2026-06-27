export type WireLabelType =
  | "self_laminating_wrap"
  | "heat_shrink_print"
  | "flag_style_marker"
  | "sleeve_slide_on"
  | "adhesive_dot_number";

const DATA: Record<WireLabelType, {
  durability: number; readability: number; installSpeed: number;
  tempResist: number; labelCost: number; printable: boolean;
  reusable: boolean; attachMethod: string; bestUse: string;
}> = {
  self_laminating_wrap: { durability: 9, readability: 8, installSpeed: 7, tempResist: 7, labelCost: 5, printable: true, reusable: false, attachMethod: "wrap_laminate_seal", bestUse: "control_panel_wire_id" },
  heat_shrink_print: { durability: 10, readability: 9, installSpeed: 5, tempResist: 9, labelCost: 6, printable: true, reusable: false, attachMethod: "heat_shrink_bond", bestUse: "permanent_harsh_env" },
  flag_style_marker: { durability: 6, readability: 10, installSpeed: 8, tempResist: 5, labelCost: 4, printable: true, reusable: false, attachMethod: "flag_wrap_stick", bestUse: "visible_both_sides_id" },
  sleeve_slide_on: { durability: 7, readability: 7, installSpeed: 6, tempResist: 8, labelCost: 3, printable: true, reusable: true, attachMethod: "slide_over_end", bestUse: "pre_wire_batch_label" },
  adhesive_dot_number: { durability: 4, readability: 6, installSpeed: 10, tempResist: 4, labelCost: 1, printable: false, reusable: false, attachMethod: "peel_stick_wrap", bestUse: "quick_temp_number_tag" },
};

const get = (t: WireLabelType) => DATA[t];

export const durability = (t: WireLabelType) => get(t).durability;
export const readability = (t: WireLabelType) => get(t).readability;
export const installSpeed = (t: WireLabelType) => get(t).installSpeed;
export const tempResist = (t: WireLabelType) => get(t).tempResist;
export const labelCost = (t: WireLabelType) => get(t).labelCost;
export const printable = (t: WireLabelType) => get(t).printable;
export const reusable = (t: WireLabelType) => get(t).reusable;
export const attachMethod = (t: WireLabelType) => get(t).attachMethod;
export const bestUse = (t: WireLabelType) => get(t).bestUse;
export const wireLabels = (): WireLabelType[] => Object.keys(DATA) as WireLabelType[];
