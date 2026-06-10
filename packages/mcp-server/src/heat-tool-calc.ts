export type HeatToolType = "emboss_heat_gun" | "craft_iron_mini" | "sealing_wax_spoon" | "wood_burn_pen" | "heat_press_flat";

export function heatOutput(t: HeatToolType): number {
  const m: Record<HeatToolType, number> = {
    emboss_heat_gun: 8, craft_iron_mini: 6, sealing_wax_spoon: 4, wood_burn_pen: 9, heat_press_flat: 10,
  };
  return m[t];
}

export function tempControl(t: HeatToolType): number {
  const m: Record<HeatToolType, number> = {
    emboss_heat_gun: 6, craft_iron_mini: 8, sealing_wax_spoon: 3, wood_burn_pen: 10, heat_press_flat: 9,
  };
  return m[t];
}

export function precision(t: HeatToolType): number {
  const m: Record<HeatToolType, number> = {
    emboss_heat_gun: 5, craft_iron_mini: 7, sealing_wax_spoon: 8, wood_burn_pen: 10, heat_press_flat: 4,
  };
  return m[t];
}

export function safetyLevel(t: HeatToolType): number {
  const m: Record<HeatToolType, number> = {
    emboss_heat_gun: 7, craft_iron_mini: 8, sealing_wax_spoon: 6, wood_burn_pen: 5, heat_press_flat: 6,
  };
  return m[t];
}

export function heatCost(t: HeatToolType): number {
  const m: Record<HeatToolType, number> = {
    emboss_heat_gun: 2, craft_iron_mini: 2, sealing_wax_spoon: 1, wood_burn_pen: 3, heat_press_flat: 4,
  };
  return m[t];
}

export function handheld(t: HeatToolType): boolean {
  const m: Record<HeatToolType, boolean> = {
    emboss_heat_gun: true, craft_iron_mini: true, sealing_wax_spoon: true, wood_burn_pen: true, heat_press_flat: false,
  };
  return m[t];
}

export function adjustableTemp(t: HeatToolType): boolean {
  const m: Record<HeatToolType, boolean> = {
    emboss_heat_gun: true, craft_iron_mini: false, sealing_wax_spoon: false, wood_burn_pen: true, heat_press_flat: true,
  };
  return m[t];
}

export function heatMethod(t: HeatToolType): string {
  const m: Record<HeatToolType, string> = {
    emboss_heat_gun: "forced_hot_air",
    craft_iron_mini: "heated_flat_plate",
    sealing_wax_spoon: "flame_heated_bowl",
    wood_burn_pen: "resistive_wire_tip",
    heat_press_flat: "clamshell_platen_press",
  };
  return m[t];
}

export function bestProject(t: HeatToolType): string {
  const m: Record<HeatToolType, string> = {
    emboss_heat_gun: "emboss_powder_melt",
    craft_iron_mini: "foil_transfer_apply",
    sealing_wax_spoon: "wax_seal_stamp",
    wood_burn_pen: "pyrography_design",
    heat_press_flat: "sublimation_print",
  };
  return m[t];
}

export function heatTools(): HeatToolType[] {
  return ["emboss_heat_gun", "craft_iron_mini", "sealing_wax_spoon", "wood_burn_pen", "heat_press_flat"];
}
