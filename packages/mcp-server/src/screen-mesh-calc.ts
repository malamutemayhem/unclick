export type ScreenMeshType = "low_mesh_textile" | "medium_mesh_general" | "high_mesh_halftone" | "ultra_fine_photo" | "monofilament_polyester";

export function inkDeposit(t: ScreenMeshType): number {
  const m: Record<ScreenMeshType, number> = {
    low_mesh_textile: 10, medium_mesh_general: 7, high_mesh_halftone: 4, ultra_fine_photo: 3, monofilament_polyester: 6,
  };
  return m[t];
}

export function detailCapture(t: ScreenMeshType): number {
  const m: Record<ScreenMeshType, number> = {
    low_mesh_textile: 4, medium_mesh_general: 7, high_mesh_halftone: 9, ultra_fine_photo: 10, monofilament_polyester: 8,
  };
  return m[t];
}

export function durability(t: ScreenMeshType): number {
  const m: Record<ScreenMeshType, number> = {
    low_mesh_textile: 9, medium_mesh_general: 8, high_mesh_halftone: 6, ultra_fine_photo: 5, monofilament_polyester: 10,
  };
  return m[t];
}

export function tensionHold(t: ScreenMeshType): number {
  const m: Record<ScreenMeshType, number> = {
    low_mesh_textile: 7, medium_mesh_general: 8, high_mesh_halftone: 9, ultra_fine_photo: 8, monofilament_polyester: 10,
  };
  return m[t];
}

export function meshCost(t: ScreenMeshType): number {
  const m: Record<ScreenMeshType, number> = {
    low_mesh_textile: 1, medium_mesh_general: 1, high_mesh_halftone: 2, ultra_fine_photo: 3, monofilament_polyester: 2,
  };
  return m[t];
}

export function forTextile(t: ScreenMeshType): boolean {
  const m: Record<ScreenMeshType, boolean> = {
    low_mesh_textile: true, medium_mesh_general: true, high_mesh_halftone: false, ultra_fine_photo: false, monofilament_polyester: true,
  };
  return m[t];
}

export function forHalftone(t: ScreenMeshType): boolean {
  const m: Record<ScreenMeshType, boolean> = {
    low_mesh_textile: false, medium_mesh_general: false, high_mesh_halftone: true, ultra_fine_photo: true, monofilament_polyester: false,
  };
  return m[t];
}

export function threadType(t: ScreenMeshType): string {
  const m: Record<ScreenMeshType, string> = {
    low_mesh_textile: "multifilament_polyester",
    medium_mesh_general: "plain_weave_polyester",
    high_mesh_halftone: "twill_weave_fine",
    ultra_fine_photo: "stainless_steel_mesh",
    monofilament_polyester: "single_strand_poly",
  };
  return m[t];
}

export function bestPrint(t: ScreenMeshType): string {
  const m: Record<ScreenMeshType, string> = {
    low_mesh_textile: "heavy_ink_garment",
    medium_mesh_general: "poster_flat_color",
    high_mesh_halftone: "cmyk_process_color",
    ultra_fine_photo: "photo_realistic_fine",
    monofilament_polyester: "spot_color_graphic",
  };
  return m[t];
}

export function screenMeshes(): ScreenMeshType[] {
  return ["low_mesh_textile", "medium_mesh_general", "high_mesh_halftone", "ultra_fine_photo", "monofilament_polyester"];
}
