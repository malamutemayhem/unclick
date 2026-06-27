export type TireGaugeType = "pencil_stick_pocket" | "dial_analog_face" | "digital_backlit_auto" | "heavy_duty_truck" | "inflator_gauge_combo";

export function accuracy(t: TireGaugeType): number {
  const m: Record<TireGaugeType, number> = {
    pencil_stick_pocket: 5, dial_analog_face: 8, digital_backlit_auto: 10, heavy_duty_truck: 9, inflator_gauge_combo: 7,
  };
  return m[t];
}

export function readability(t: TireGaugeType): number {
  const m: Record<TireGaugeType, number> = {
    pencil_stick_pocket: 4, dial_analog_face: 7, digital_backlit_auto: 10, heavy_duty_truck: 8, inflator_gauge_combo: 6,
  };
  return m[t];
}

export function durability(t: TireGaugeType): number {
  const m: Record<TireGaugeType, number> = {
    pencil_stick_pocket: 6, dial_analog_face: 8, digital_backlit_auto: 5, heavy_duty_truck: 10, inflator_gauge_combo: 7,
  };
  return m[t];
}

export function portability(t: TireGaugeType): number {
  const m: Record<TireGaugeType, number> = {
    pencil_stick_pocket: 10, dial_analog_face: 7, digital_backlit_auto: 8, heavy_duty_truck: 4, inflator_gauge_combo: 3,
  };
  return m[t];
}

export function gaugeCost(t: TireGaugeType): number {
  const m: Record<TireGaugeType, number> = {
    pencil_stick_pocket: 2, dial_analog_face: 5, digital_backlit_auto: 7, heavy_duty_truck: 8, inflator_gauge_combo: 9,
  };
  return m[t];
}

export function needsBattery(t: TireGaugeType): boolean {
  const m: Record<TireGaugeType, boolean> = {
    pencil_stick_pocket: false, dial_analog_face: false, digital_backlit_auto: true, heavy_duty_truck: false, inflator_gauge_combo: true,
  };
  return m[t];
}

export function autoShutoff(t: TireGaugeType): boolean {
  const m: Record<TireGaugeType, boolean> = {
    pencil_stick_pocket: false, dial_analog_face: false, digital_backlit_auto: true, heavy_duty_truck: false, inflator_gauge_combo: true,
  };
  return m[t];
}

export function displayType(t: TireGaugeType): string {
  const m: Record<TireGaugeType, string> = {
    pencil_stick_pocket: "sliding_calibrated_rod",
    dial_analog_face: "needle_dial_face_psi",
    digital_backlit_auto: "lcd_backlit_multi_unit",
    heavy_duty_truck: "large_dial_dual_range",
    inflator_gauge_combo: "integrated_digital_pump",
  };
  return m[t];
}

export function bestVehicle(t: TireGaugeType): string {
  const m: Record<TireGaugeType, string> = {
    pencil_stick_pocket: "glove_box_quick_check",
    dial_analog_face: "home_garage_routine",
    digital_backlit_auto: "precise_all_vehicle",
    heavy_duty_truck: "commercial_rv_fleet",
    inflator_gauge_combo: "roadside_inflate_check",
  };
  return m[t];
}

export function tireGauges(): TireGaugeType[] {
  return ["pencil_stick_pocket", "dial_analog_face", "digital_backlit_auto", "heavy_duty_truck", "inflator_gauge_combo"];
}
