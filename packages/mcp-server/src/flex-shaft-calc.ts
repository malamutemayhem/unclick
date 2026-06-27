export type FlexShaftType = "pendant_motor_hang" | "bench_motor_fixed" | "micro_motor_compact" | "rotary_dremel_handheld" | "polishing_lathe_dual";

export function powerOutput(t: FlexShaftType): number {
  const m: Record<FlexShaftType, number> = {
    pendant_motor_hang: 9, bench_motor_fixed: 10, micro_motor_compact: 6, rotary_dremel_handheld: 7, polishing_lathe_dual: 8,
  };
  return m[t];
}

export function precision(t: FlexShaftType): number {
  const m: Record<FlexShaftType, number> = {
    pendant_motor_hang: 9, bench_motor_fixed: 8, micro_motor_compact: 10, rotary_dremel_handheld: 7, polishing_lathe_dual: 6,
  };
  return m[t];
}

export function speedRange(t: FlexShaftType): number {
  const m: Record<FlexShaftType, number> = {
    pendant_motor_hang: 10, bench_motor_fixed: 9, micro_motor_compact: 8, rotary_dremel_handheld: 7, polishing_lathe_dual: 6,
  };
  return m[t];
}

export function portability(t: FlexShaftType): number {
  const m: Record<FlexShaftType, number> = {
    pendant_motor_hang: 5, bench_motor_fixed: 3, micro_motor_compact: 10, rotary_dremel_handheld: 9, polishing_lathe_dual: 2,
  };
  return m[t];
}

export function shaftCost(t: FlexShaftType): number {
  const m: Record<FlexShaftType, number> = {
    pendant_motor_hang: 3, bench_motor_fixed: 4, micro_motor_compact: 3, rotary_dremel_handheld: 2, polishing_lathe_dual: 4,
  };
  return m[t];
}

export function footPedal(t: FlexShaftType): boolean {
  const m: Record<FlexShaftType, boolean> = {
    pendant_motor_hang: true, bench_motor_fixed: true, micro_motor_compact: true, rotary_dremel_handheld: false, polishing_lathe_dual: true,
  };
  return m[t];
}

export function handheldUnit(t: FlexShaftType): boolean {
  const m: Record<FlexShaftType, boolean> = {
    pendant_motor_hang: false, bench_motor_fixed: false, micro_motor_compact: true, rotary_dremel_handheld: true, polishing_lathe_dual: false,
  };
  return m[t];
}

export function driveSystem(t: FlexShaftType): string {
  const m: Record<FlexShaftType, string> = {
    pendant_motor_hang: "cable_drive_shaft",
    bench_motor_fixed: "belt_drive_shaft",
    micro_motor_compact: "brushless_dc_motor",
    rotary_dremel_handheld: "inline_motor_collet",
    polishing_lathe_dual: "spindle_arbor_direct",
  };
  return m[t];
}

export function bestTask(t: FlexShaftType): string {
  const m: Record<FlexShaftType, string> = {
    pendant_motor_hang: "general_bench_jewelry",
    bench_motor_fixed: "heavy_duty_carving",
    micro_motor_compact: "fine_detail_engraving",
    rotary_dremel_handheld: "hobby_craft_general",
    polishing_lathe_dual: "buff_polish_finish",
  };
  return m[t];
}

export function flexShafts(): FlexShaftType[] {
  return ["pendant_motor_hang", "bench_motor_fixed", "micro_motor_compact", "rotary_dremel_handheld", "polishing_lathe_dual"];
}
