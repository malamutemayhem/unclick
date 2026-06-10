export type PaperClipType = "standard_wire_gem" | "jumbo_smooth_large" | "butterfly_binder_style" | "colored_vinyl_coated" | "magnetic_dispenser_set";

export function gripStrength(t: PaperClipType): number {
  const m: Record<PaperClipType, number> = {
    standard_wire_gem: 5, jumbo_smooth_large: 7, butterfly_binder_style: 9, colored_vinyl_coated: 5, magnetic_dispenser_set: 6,
  };
  return m[t];
}

export function pageCapacity(t: PaperClipType): number {
  const m: Record<PaperClipType, number> = {
    standard_wire_gem: 4, jumbo_smooth_large: 8, butterfly_binder_style: 10, colored_vinyl_coated: 4, magnetic_dispenser_set: 5,
  };
  return m[t];
}

export function reusability(t: PaperClipType): number {
  const m: Record<PaperClipType, number> = {
    standard_wire_gem: 7, jumbo_smooth_large: 8, butterfly_binder_style: 9, colored_vinyl_coated: 6, magnetic_dispenser_set: 8,
  };
  return m[t];
}

export function paperSafe(t: PaperClipType): number {
  const m: Record<PaperClipType, number> = {
    standard_wire_gem: 6, jumbo_smooth_large: 7, butterfly_binder_style: 5, colored_vinyl_coated: 9, magnetic_dispenser_set: 8,
  };
  return m[t];
}

export function clipCost(t: PaperClipType): number {
  const m: Record<PaperClipType, number> = {
    standard_wire_gem: 2, jumbo_smooth_large: 3, butterfly_binder_style: 5, colored_vinyl_coated: 4, magnetic_dispenser_set: 7,
  };
  return m[t];
}

export function colorCoded(t: PaperClipType): boolean {
  const m: Record<PaperClipType, boolean> = {
    standard_wire_gem: false, jumbo_smooth_large: false, butterfly_binder_style: false, colored_vinyl_coated: true, magnetic_dispenser_set: false,
  };
  return m[t];
}

export function rustProof(t: PaperClipType): boolean {
  const m: Record<PaperClipType, boolean> = {
    standard_wire_gem: false, jumbo_smooth_large: false, butterfly_binder_style: true, colored_vinyl_coated: true, magnetic_dispenser_set: true,
  };
  return m[t];
}

export function clipMaterial(t: PaperClipType): string {
  const m: Record<PaperClipType, string> = {
    standard_wire_gem: "galvanized_steel_wire",
    jumbo_smooth_large: "nickel_plated_steel",
    butterfly_binder_style: "spring_steel_chrome",
    colored_vinyl_coated: "vinyl_coated_wire",
    magnetic_dispenser_set: "chrome_wire_magnet_base",
  };
  return m[t];
}

export function bestUse(t: PaperClipType): string {
  const m: Record<PaperClipType, string> = {
    standard_wire_gem: "everyday_office_stack",
    jumbo_smooth_large: "thick_report_bundle",
    butterfly_binder_style: "manuscript_heavy_packet",
    colored_vinyl_coated: "color_sort_organize",
    magnetic_dispenser_set: "desk_tidy_quick_grab",
  };
  return m[t];
}

export function paperClips(): PaperClipType[] {
  return ["standard_wire_gem", "jumbo_smooth_large", "butterfly_binder_style", "colored_vinyl_coated", "magnetic_dispenser_set"];
}
