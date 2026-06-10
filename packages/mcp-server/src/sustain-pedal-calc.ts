export type SustainPedalType = "switch_basic_on_off" | "piano_style_weighted" | "half_damper_continuous" | "triple_pedal_unit" | "bluetooth_wireless_pedal";

export function responsiveness(t: SustainPedalType): number {
  const m: Record<SustainPedalType, number> = {
    switch_basic_on_off: 4, piano_style_weighted: 8, half_damper_continuous: 10, triple_pedal_unit: 9, bluetooth_wireless_pedal: 6,
  };
  return m[t];
}

export function realism(t: SustainPedalType): number {
  const m: Record<SustainPedalType, number> = {
    switch_basic_on_off: 3, piano_style_weighted: 8, half_damper_continuous: 10, triple_pedal_unit: 10, bluetooth_wireless_pedal: 5,
  };
  return m[t];
}

export function durability(t: SustainPedalType): number {
  const m: Record<SustainPedalType, number> = {
    switch_basic_on_off: 6, piano_style_weighted: 9, half_damper_continuous: 8, triple_pedal_unit: 10, bluetooth_wireless_pedal: 5,
  };
  return m[t];
}

export function portability(t: SustainPedalType): number {
  const m: Record<SustainPedalType, number> = {
    switch_basic_on_off: 10, piano_style_weighted: 5, half_damper_continuous: 6, triple_pedal_unit: 2, bluetooth_wireless_pedal: 9,
  };
  return m[t];
}

export function pedalCost(t: SustainPedalType): number {
  const m: Record<SustainPedalType, number> = {
    switch_basic_on_off: 1, piano_style_weighted: 4, half_damper_continuous: 6, triple_pedal_unit: 8, bluetooth_wireless_pedal: 5,
  };
  return m[t];
}

export function halfPedal(t: SustainPedalType): boolean {
  const m: Record<SustainPedalType, boolean> = {
    switch_basic_on_off: false, piano_style_weighted: false, half_damper_continuous: true, triple_pedal_unit: true, bluetooth_wireless_pedal: false,
  };
  return m[t];
}

export function wireless(t: SustainPedalType): boolean {
  const m: Record<SustainPedalType, boolean> = {
    switch_basic_on_off: false, piano_style_weighted: false, half_damper_continuous: false, triple_pedal_unit: false, bluetooth_wireless_pedal: true,
  };
  return m[t];
}

export function pedalAction(t: SustainPedalType): string {
  const m: Record<SustainPedalType, string> = {
    switch_basic_on_off: "spring_toggle_click",
    piano_style_weighted: "weighted_pivot_smooth",
    half_damper_continuous: "continuous_resistance_curve",
    triple_pedal_unit: "three_pedal_grand_action",
    bluetooth_wireless_pedal: "button_wireless_transmit",
  };
  return m[t];
}

export function bestSetup(t: SustainPedalType): string {
  const m: Record<SustainPedalType, string> = {
    switch_basic_on_off: "beginner_portable_keyboard",
    piano_style_weighted: "home_digital_piano",
    half_damper_continuous: "advanced_player_expression",
    triple_pedal_unit: "stage_piano_full_setup",
    bluetooth_wireless_pedal: "tablet_app_wireless_jam",
  };
  return m[t];
}

export function sustainPedals(): SustainPedalType[] {
  return ["switch_basic_on_off", "piano_style_weighted", "half_damper_continuous", "triple_pedal_unit", "bluetooth_wireless_pedal"];
}
