export type BackdropType = "muslin_cotton_wrinkle" | "vinyl_matte_smooth" | "paper_seamless_roll" | "collapsible_popup_reversible" | "canvas_painted_scenic";

export function imageQuality(t: BackdropType): number {
  const m: Record<BackdropType, number> = {
    muslin_cotton_wrinkle: 7, vinyl_matte_smooth: 8, paper_seamless_roll: 9, collapsible_popup_reversible: 6, canvas_painted_scenic: 10,
  };
  return m[t];
}

export function portability(t: BackdropType): number {
  const m: Record<BackdropType, number> = {
    muslin_cotton_wrinkle: 7, vinyl_matte_smooth: 5, paper_seamless_roll: 3, collapsible_popup_reversible: 10, canvas_painted_scenic: 2,
  };
  return m[t];
}

export function durability(t: BackdropType): number {
  const m: Record<BackdropType, number> = {
    muslin_cotton_wrinkle: 8, vinyl_matte_smooth: 9, paper_seamless_roll: 2, collapsible_popup_reversible: 7, canvas_painted_scenic: 6,
  };
  return m[t];
}

export function cleanEase(t: BackdropType): number {
  const m: Record<BackdropType, number> = {
    muslin_cotton_wrinkle: 6, vinyl_matte_smooth: 10, paper_seamless_roll: 1, collapsible_popup_reversible: 8, canvas_painted_scenic: 4,
  };
  return m[t];
}

export function backdropCost(t: BackdropType): number {
  const m: Record<BackdropType, number> = {
    muslin_cotton_wrinkle: 4, vinyl_matte_smooth: 5, paper_seamless_roll: 3, collapsible_popup_reversible: 6, canvas_painted_scenic: 9,
  };
  return m[t];
}

export function washable(t: BackdropType): boolean {
  const m: Record<BackdropType, boolean> = {
    muslin_cotton_wrinkle: true, vinyl_matte_smooth: true, paper_seamless_roll: false, collapsible_popup_reversible: true, canvas_painted_scenic: false,
  };
  return m[t];
}

export function chromakeyReady(t: BackdropType): boolean {
  const m: Record<BackdropType, boolean> = {
    muslin_cotton_wrinkle: true, vinyl_matte_smooth: true, paper_seamless_roll: true, collapsible_popup_reversible: true, canvas_painted_scenic: false,
  };
  return m[t];
}

export function surfaceFinish(t: BackdropType): string {
  const m: Record<BackdropType, string> = {
    muslin_cotton_wrinkle: "matte_woven_cotton",
    vinyl_matte_smooth: "non_reflective_pvc",
    paper_seamless_roll: "matte_recycled_pulp",
    collapsible_popup_reversible: "spring_frame_polyester",
    canvas_painted_scenic: "hand_painted_cotton_duck",
  };
  return m[t];
}

export function bestShoot(t: BackdropType): string {
  const m: Record<BackdropType, string> = {
    muslin_cotton_wrinkle: "portrait_studio_general",
    vinyl_matte_smooth: "product_food_flat_lay",
    paper_seamless_roll: "catalog_ecommerce_clean",
    collapsible_popup_reversible: "onsite_event_headshot",
    canvas_painted_scenic: "fine_art_editorial_theme",
  };
  return m[t];
}

export function backdrops(): BackdropType[] {
  return ["muslin_cotton_wrinkle", "vinyl_matte_smooth", "paper_seamless_roll", "collapsible_popup_reversible", "canvas_painted_scenic"];
}
