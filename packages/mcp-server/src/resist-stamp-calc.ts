// Resist stamp calculator - textile resist printing tools

export type ResistStampType =
  | "tjanting_wax_pen"
  | "copper_block_print"
  | "wooden_block_carved"
  | "foam_roller_repeat"
  | "screen_mesh_stencil";

const RESIST_DATA: Record<
  ResistStampType,
  {
    detailFine: number;
    repeatConsist: number;
    speedApply: number;
    patternRange: number;
    cost: number;
    reusable: boolean;
    forWax: boolean;
    applyMethod: string;
    bestUse: string;
  }
> = {
  tjanting_wax_pen: {
    detailFine: 10,
    repeatConsist: 5,
    speedApply: 3,
    patternRange: 10,
    cost: 3,
    reusable: true,
    forWax: true,
    applyMethod: "hot_wax_pen_draw",
    bestUse: "batik_freehand_wax",
  },
  copper_block_print: {
    detailFine: 9,
    repeatConsist: 10,
    speedApply: 8,
    patternRange: 6,
    cost: 8,
    reusable: true,
    forWax: true,
    applyMethod: "heated_block_stamp",
    bestUse: "repeat_wax_pattern",
  },
  wooden_block_carved: {
    detailFine: 7,
    repeatConsist: 8,
    speedApply: 7,
    patternRange: 7,
    cost: 5,
    reusable: true,
    forWax: false,
    applyMethod: "carved_block_press",
    bestUse: "paste_resist_print",
  },
  foam_roller_repeat: {
    detailFine: 4,
    repeatConsist: 7,
    speedApply: 9,
    patternRange: 4,
    cost: 2,
    reusable: false,
    forWax: false,
    applyMethod: "roller_press_repeat",
    bestUse: "simple_repeat_band",
  },
  screen_mesh_stencil: {
    detailFine: 8,
    repeatConsist: 9,
    speedApply: 8,
    patternRange: 8,
    cost: 6,
    reusable: true,
    forWax: false,
    applyMethod: "screen_squeegee_push",
    bestUse: "multi_color_resist",
  },
};

export function detailFine(type: ResistStampType): number {
  return RESIST_DATA[type].detailFine;
}
export function repeatConsist(type: ResistStampType): number {
  return RESIST_DATA[type].repeatConsist;
}
export function speedApply(type: ResistStampType): number {
  return RESIST_DATA[type].speedApply;
}
export function patternRange(type: ResistStampType): number {
  return RESIST_DATA[type].patternRange;
}
export function resistCost(type: ResistStampType): number {
  return RESIST_DATA[type].cost;
}
export function reusable(type: ResistStampType): boolean {
  return RESIST_DATA[type].reusable;
}
export function forWax(type: ResistStampType): boolean {
  return RESIST_DATA[type].forWax;
}
export function applyMethod(type: ResistStampType): string {
  return RESIST_DATA[type].applyMethod;
}
export function bestUse(type: ResistStampType): string {
  return RESIST_DATA[type].bestUse;
}
export function resistStamps(): ResistStampType[] {
  return Object.keys(RESIST_DATA) as ResistStampType[];
}
