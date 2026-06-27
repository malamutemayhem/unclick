// Veneer press calculator - veneer clamping press tools

export type VeneerPressType =
  | "vacuum_bag_pump"
  | "screw_press_frame"
  | "caul_board_clamp"
  | "hydraulic_platen_flat"
  | "sandbag_weight_simple";

const PRESS_DATA: Record<
  VeneerPressType,
  {
    pressEven: number;
    clampForce: number;
    setupSpeed: number;
    panelRange: number;
    cost: number;
    powered: boolean;
    forCurve: boolean;
    pressMethod: string;
    bestUse: string;
  }
> = {
  vacuum_bag_pump: {
    pressEven: 10,
    clampForce: 8,
    setupSpeed: 7,
    panelRange: 9,
    cost: 7,
    powered: true,
    forCurve: true,
    pressMethod: "vacuum_suction",
    bestUse: "curved_form_press",
  },
  screw_press_frame: {
    pressEven: 8,
    clampForce: 10,
    setupSpeed: 5,
    panelRange: 6,
    cost: 6,
    powered: false,
    forCurve: false,
    pressMethod: "screw_mechanical",
    bestUse: "thick_panel_glue",
  },
  caul_board_clamp: {
    pressEven: 7,
    clampForce: 7,
    setupSpeed: 8,
    panelRange: 8,
    cost: 3,
    powered: false,
    forCurve: false,
    pressMethod: "caul_distribute",
    bestUse: "flat_panel_veneer",
  },
  hydraulic_platen_flat: {
    pressEven: 9,
    clampForce: 10,
    setupSpeed: 6,
    panelRange: 7,
    cost: 9,
    powered: true,
    forCurve: false,
    pressMethod: "hydraulic_ram",
    bestUse: "production_flat_press",
  },
  sandbag_weight_simple: {
    pressEven: 5,
    clampForce: 4,
    setupSpeed: 10,
    panelRange: 5,
    cost: 2,
    powered: false,
    forCurve: true,
    pressMethod: "gravity_weight",
    bestUse: "small_patch_repair",
  },
};

export function pressEven(type: VeneerPressType): number {
  return PRESS_DATA[type].pressEven;
}
export function clampForce(type: VeneerPressType): number {
  return PRESS_DATA[type].clampForce;
}
export function setupSpeed(type: VeneerPressType): number {
  return PRESS_DATA[type].setupSpeed;
}
export function panelRange(type: VeneerPressType): number {
  return PRESS_DATA[type].panelRange;
}
export function pressCost(type: VeneerPressType): number {
  return PRESS_DATA[type].cost;
}
export function powered(type: VeneerPressType): boolean {
  return PRESS_DATA[type].powered;
}
export function forCurve(type: VeneerPressType): boolean {
  return PRESS_DATA[type].forCurve;
}
export function pressMethod(type: VeneerPressType): string {
  return PRESS_DATA[type].pressMethod;
}
export function bestUse(type: VeneerPressType): string {
  return PRESS_DATA[type].bestUse;
}
export function veneerPresses(): VeneerPressType[] {
  return Object.keys(PRESS_DATA) as VeneerPressType[];
}
