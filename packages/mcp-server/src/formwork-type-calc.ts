export type FormworkType = "timber" | "steel" | "aluminum" | "plastic" | "slip_form";

export function surfaceFinish(f: FormworkType): number {
  const m: Record<FormworkType, number> = {
    timber: 5, steel: 9, aluminum: 8, plastic: 7, slip_form: 6,
  };
  return m[f];
}

export function reuseCount(f: FormworkType): number {
  const m: Record<FormworkType, number> = {
    timber: 2, steel: 10, aluminum: 8, plastic: 6, slip_form: 9,
  };
  return m[f];
}

export function weightPerPanel(f: FormworkType): number {
  const m: Record<FormworkType, number> = {
    timber: 4, steel: 9, aluminum: 5, plastic: 3, slip_form: 8,
  };
  return m[f];
}

export function initialCost(f: FormworkType): number {
  const m: Record<FormworkType, number> = {
    timber: 3, steel: 9, aluminum: 8, plastic: 5, slip_form: 10,
  };
  return m[f];
}

export function setupSpeed(f: FormworkType): number {
  const m: Record<FormworkType, number> = {
    timber: 4, steel: 6, aluminum: 8, plastic: 7, slip_form: 3,
  };
  return m[f];
}

export function customShapeable(f: FormworkType): boolean {
  const m: Record<FormworkType, boolean> = {
    timber: true, steel: false, aluminum: false, plastic: true, slip_form: false,
  };
  return m[f];
}

export function continuousPour(f: FormworkType): boolean {
  const m: Record<FormworkType, boolean> = {
    timber: false, steel: false, aluminum: false, plastic: false, slip_form: true,
  };
  return m[f];
}

export function strippingMethod(f: FormworkType): string {
  const m: Record<FormworkType, string> = {
    timber: "manual_pry_bar", steel: "crane_lift_panel",
    aluminum: "hand_strip_pin_release", plastic: "snap_off_modular",
    slip_form: "hydraulic_jack_continuous",
  };
  return m[f];
}

export function bestApplication(f: FormworkType): string {
  const m: Record<FormworkType, string> = {
    timber: "custom_one_off_shape", steel: "repetitive_high_volume",
    aluminum: "slab_wall_residential", plastic: "column_waffle_slab",
    slip_form: "tower_core_silo",
  };
  return m[f];
}

export function formworkTypes(): FormworkType[] {
  return ["timber", "steel", "aluminum", "plastic", "slip_form"];
}
