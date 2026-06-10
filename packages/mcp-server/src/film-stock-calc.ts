export type FilmStockType = "color_negative_400" | "black_white_tri_x" | "slide_chrome_100" | "cinema_motion_500t" | "instant_peel_apart";

export function grainCharacter(t: FilmStockType): number {
  const m: Record<FilmStockType, number> = {
    color_negative_400: 6, black_white_tri_x: 8, slide_chrome_100: 2, cinema_motion_500t: 5, instant_peel_apart: 7,
  };
  return m[t];
}

export function dynamicRange(t: FilmStockType): number {
  const m: Record<FilmStockType, number> = {
    color_negative_400: 9, black_white_tri_x: 8, slide_chrome_100: 5, cinema_motion_500t: 10, instant_peel_apart: 4,
  };
  return m[t];
}

export function colorSaturation(t: FilmStockType): number {
  const m: Record<FilmStockType, number> = {
    color_negative_400: 7, black_white_tri_x: 1, slide_chrome_100: 10, cinema_motion_500t: 8, instant_peel_apart: 6,
  };
  return m[t];
}

export function lowLightAbility(t: FilmStockType): number {
  const m: Record<FilmStockType, number> = {
    color_negative_400: 7, black_white_tri_x: 8, slide_chrome_100: 3, cinema_motion_500t: 10, instant_peel_apart: 4,
  };
  return m[t];
}

export function filmCost(t: FilmStockType): number {
  const m: Record<FilmStockType, number> = {
    color_negative_400: 5, black_white_tri_x: 5, slide_chrome_100: 8, cinema_motion_500t: 10, instant_peel_apart: 7,
  };
  return m[t];
}

export function homeDevPossible(t: FilmStockType): boolean {
  const m: Record<FilmStockType, boolean> = {
    color_negative_400: true, black_white_tri_x: true, slide_chrome_100: false, cinema_motion_500t: false, instant_peel_apart: false,
  };
  return m[t];
}

export function instantResult(t: FilmStockType): boolean {
  const m: Record<FilmStockType, boolean> = {
    color_negative_400: false, black_white_tri_x: false, slide_chrome_100: false, cinema_motion_500t: false, instant_peel_apart: true,
  };
  return m[t];
}

export function emulsionType(t: FilmStockType): string {
  const m: Record<FilmStockType, string> = {
    color_negative_400: "c41_color_negative",
    black_white_tri_x: "silver_halide_panchro",
    slide_chrome_100: "e6_reversal_chrome",
    cinema_motion_500t: "ecn2_tungsten_balanced",
    instant_peel_apart: "integral_dye_diffusion",
  };
  return m[t];
}

export function bestShoot(t: FilmStockType): string {
  const m: Record<FilmStockType, string> = {
    color_negative_400: "everyday_street_travel",
    black_white_tri_x: "documentary_portrait_art",
    slide_chrome_100: "landscape_product_vivid",
    cinema_motion_500t: "movie_production_studio",
    instant_peel_apart: "party_event_fun",
  };
  return m[t];
}

export function filmStocks(): FilmStockType[] {
  return ["color_negative_400", "black_white_tri_x", "slide_chrome_100", "cinema_motion_500t", "instant_peel_apart"];
}
