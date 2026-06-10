export type PowerStripType = "basic_6_outlet" | "surge_protector_12" | "tower_vertical" | "travel_international" | "under_desk_clamp";

export function outletCount(t: PowerStripType): number {
  const m: Record<PowerStripType, number> = {
    basic_6_outlet: 6, surge_protector_12: 10, tower_vertical: 8, travel_international: 3, under_desk_clamp: 6,
  };
  return m[t];
}

export function surgeRating(t: PowerStripType): number {
  const m: Record<PowerStripType, number> = {
    basic_6_outlet: 2, surge_protector_12: 10, tower_vertical: 7, travel_international: 4, under_desk_clamp: 6,
  };
  return m[t];
}

export function usbPorts(t: PowerStripType): number {
  const m: Record<PowerStripType, number> = {
    basic_6_outlet: 0, surge_protector_12: 4, tower_vertical: 6, travel_international: 3, under_desk_clamp: 4,
  };
  return m[t];
}

export function portability(t: PowerStripType): number {
  const m: Record<PowerStripType, number> = {
    basic_6_outlet: 5, surge_protector_12: 3, tower_vertical: 4, travel_international: 10, under_desk_clamp: 2,
  };
  return m[t];
}

export function stripCost(t: PowerStripType): number {
  const m: Record<PowerStripType, number> = {
    basic_6_outlet: 1, surge_protector_12: 5, tower_vertical: 6, travel_international: 7, under_desk_clamp: 8,
  };
  return m[t];
}

export function individualSwitch(t: PowerStripType): boolean {
  const m: Record<PowerStripType, boolean> = {
    basic_6_outlet: false, surge_protector_12: true, tower_vertical: true, travel_international: false, under_desk_clamp: true,
  };
  return m[t];
}

export function flatPlug(t: PowerStripType): boolean {
  const m: Record<PowerStripType, boolean> = {
    basic_6_outlet: false, surge_protector_12: true, tower_vertical: false, travel_international: true, under_desk_clamp: false,
  };
  return m[t];
}

export function formFactor(t: PowerStripType): string {
  const m: Record<PowerStripType, string> = {
    basic_6_outlet: "horizontal_bar_standard",
    surge_protector_12: "wide_bar_spaced_outlets",
    tower_vertical: "vertical_stack_rotating",
    travel_international: "compact_multi_adapter",
    under_desk_clamp: "clamp_mount_hidden",
  };
  return m[t];
}

export function bestSetup(t: PowerStripType): string {
  const m: Record<PowerStripType, string> = {
    basic_6_outlet: "simple_lamp_charger",
    surge_protector_12: "home_theater_pc_setup",
    tower_vertical: "nightstand_desk_charge",
    travel_international: "hotel_airport_abroad",
    under_desk_clamp: "clean_desk_cable_manage",
  };
  return m[t];
}

export function powerStrips(): PowerStripType[] {
  return ["basic_6_outlet", "surge_protector_12", "tower_vertical", "travel_international", "under_desk_clamp"];
}
