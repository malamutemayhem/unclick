export type SewingMachineType = "mechanical_basic" | "computerized_auto" | "quilting_long_arm" | "industrial_heavy" | "embroidery_multi";

export function stitchCount(t: SewingMachineType): number {
  const m: Record<SewingMachineType, number> = {
    mechanical_basic: 3, computerized_auto: 8, quilting_long_arm: 5, industrial_heavy: 2, embroidery_multi: 10,
  };
  return m[t];
}

export function sewSpeed(t: SewingMachineType): number {
  const m: Record<SewingMachineType, number> = {
    mechanical_basic: 5, computerized_auto: 7, quilting_long_arm: 6, industrial_heavy: 10, embroidery_multi: 4,
  };
  return m[t];
}

export function fabricThickness(t: SewingMachineType): number {
  const m: Record<SewingMachineType, number> = {
    mechanical_basic: 5, computerized_auto: 6, quilting_long_arm: 8, industrial_heavy: 10, embroidery_multi: 4,
  };
  return m[t];
}

export function easeOfUse(t: SewingMachineType): number {
  const m: Record<SewingMachineType, number> = {
    mechanical_basic: 8, computerized_auto: 10, quilting_long_arm: 5, industrial_heavy: 3, embroidery_multi: 6,
  };
  return m[t];
}

export function machineCost(t: SewingMachineType): number {
  const m: Record<SewingMachineType, number> = {
    mechanical_basic: 2, computerized_auto: 5, quilting_long_arm: 9, industrial_heavy: 7, embroidery_multi: 10,
  };
  return m[t];
}

export function autoThreadCut(t: SewingMachineType): boolean {
  const m: Record<SewingMachineType, boolean> = {
    mechanical_basic: false, computerized_auto: true, quilting_long_arm: true, industrial_heavy: true, embroidery_multi: true,
  };
  return m[t];
}

export function portableSize(t: SewingMachineType): boolean {
  const m: Record<SewingMachineType, boolean> = {
    mechanical_basic: true, computerized_auto: true, quilting_long_arm: false, industrial_heavy: false, embroidery_multi: false,
  };
  return m[t];
}

export function feedSystem(t: SewingMachineType): string {
  const m: Record<SewingMachineType, string> = {
    mechanical_basic: "drop_feed_standard",
    computerized_auto: "seven_point_box_feed",
    quilting_long_arm: "stitch_regulated_roller",
    industrial_heavy: "walking_foot_compound",
    embroidery_multi: "hoop_frame_xy_drive",
  };
  return m[t];
}

export function bestProject(t: SewingMachineType): string {
  const m: Record<SewingMachineType, string> = {
    mechanical_basic: "beginner_garment_repair",
    computerized_auto: "home_fashion_craft",
    quilting_long_arm: "large_quilt_blanket",
    industrial_heavy: "leather_upholstery_canvas",
    embroidery_multi: "monogram_logo_decorative",
  };
  return m[t];
}

export function sewingMachines(): SewingMachineType[] {
  return ["mechanical_basic", "computerized_auto", "quilting_long_arm", "industrial_heavy", "embroidery_multi"];
}
