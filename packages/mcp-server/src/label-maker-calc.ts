export type LabelMakerType = "handheld_tape_emboss" | "thermal_print_battery" | "bluetooth_phone_app" | "desktop_pc_connected" | "industrial_wire_wrap";

export function printQuality(t: LabelMakerType): number {
  const m: Record<LabelMakerType, number> = {
    handheld_tape_emboss: 3, thermal_print_battery: 7, bluetooth_phone_app: 8, desktop_pc_connected: 10, industrial_wire_wrap: 6,
  };
  return m[t];
}

export function portability(t: LabelMakerType): number {
  const m: Record<LabelMakerType, number> = {
    handheld_tape_emboss: 10, thermal_print_battery: 8, bluetooth_phone_app: 7, desktop_pc_connected: 2, industrial_wire_wrap: 5,
  };
  return m[t];
}

export function labelDurability(t: LabelMakerType): number {
  const m: Record<LabelMakerType, number> = {
    handheld_tape_emboss: 9, thermal_print_battery: 5, bluetooth_phone_app: 6, desktop_pc_connected: 8, industrial_wire_wrap: 10,
  };
  return m[t];
}

export function fontOptions(t: LabelMakerType): number {
  const m: Record<LabelMakerType, number> = {
    handheld_tape_emboss: 1, thermal_print_battery: 6, bluetooth_phone_app: 10, desktop_pc_connected: 9, industrial_wire_wrap: 4,
  };
  return m[t];
}

export function makerCost(t: LabelMakerType): number {
  const m: Record<LabelMakerType, number> = {
    handheld_tape_emboss: 2, thermal_print_battery: 4, bluetooth_phone_app: 5, desktop_pc_connected: 7, industrial_wire_wrap: 9,
  };
  return m[t];
}

export function needsPower(t: LabelMakerType): boolean {
  const m: Record<LabelMakerType, boolean> = {
    handheld_tape_emboss: false, thermal_print_battery: true, bluetooth_phone_app: true, desktop_pc_connected: true, industrial_wire_wrap: true,
  };
  return m[t];
}

export function waterproof(t: LabelMakerType): boolean {
  const m: Record<LabelMakerType, boolean> = {
    handheld_tape_emboss: true, thermal_print_battery: false, bluetooth_phone_app: false, desktop_pc_connected: true, industrial_wire_wrap: true,
  };
  return m[t];
}

export function tapeType(t: LabelMakerType): string {
  const m: Record<LabelMakerType, string> = {
    handheld_tape_emboss: "dymo_embossing_tape",
    thermal_print_battery: "thermal_direct_white",
    bluetooth_phone_app: "laminated_tze_cartridge",
    desktop_pc_connected: "continuous_roll_multi_size",
    industrial_wire_wrap: "self_laminating_vinyl_flag",
  };
  return m[t];
}

export function bestUse(t: LabelMakerType): string {
  const m: Record<LabelMakerType, string> = {
    handheld_tape_emboss: "home_organizing_closet",
    thermal_print_battery: "shipping_barcode_label",
    bluetooth_phone_app: "pantry_kitchen_crafts",
    desktop_pc_connected: "office_filing_system",
    industrial_wire_wrap: "electrician_cable_marking",
  };
  return m[t];
}

export function labelMakers(): LabelMakerType[] {
  return ["handheld_tape_emboss", "thermal_print_battery", "bluetooth_phone_app", "desktop_pc_connected", "industrial_wire_wrap"];
}
