export type PinLoomType = "zoom_loom_square" | "weave_it_rect" | "hexagon_hex_loom" | "triangle_tri_loom" | "circle_round_loom";

export function squareSize(t: PinLoomType): number {
  const m: Record<PinLoomType, number> = {
    zoom_loom_square: 7, weave_it_rect: 8, hexagon_hex_loom: 6, triangle_tri_loom: 5, circle_round_loom: 6,
  };
  return m[t];
}

export function easeOfUse(t: PinLoomType): number {
  const m: Record<PinLoomType, number> = {
    zoom_loom_square: 10, weave_it_rect: 8, hexagon_hex_loom: 7, triangle_tri_loom: 6, circle_round_loom: 7,
  };
  return m[t];
}

export function shapeVariety(t: PinLoomType): number {
  const m: Record<PinLoomType, number> = {
    zoom_loom_square: 5, weave_it_rect: 6, hexagon_hex_loom: 8, triangle_tri_loom: 7, circle_round_loom: 9,
  };
  return m[t];
}

export function portability(t: PinLoomType): number {
  const m: Record<PinLoomType, number> = {
    zoom_loom_square: 10, weave_it_rect: 8, hexagon_hex_loom: 9, triangle_tri_loom: 9, circle_round_loom: 7,
  };
  return m[t];
}

export function loomCost(t: PinLoomType): number {
  const m: Record<PinLoomType, number> = {
    zoom_loom_square: 2, weave_it_rect: 3, hexagon_hex_loom: 2, triangle_tri_loom: 2, circle_round_loom: 3,
  };
  return m[t];
}

export function joinable(t: PinLoomType): boolean {
  const m: Record<PinLoomType, boolean> = {
    zoom_loom_square: true, weave_it_rect: true, hexagon_hex_loom: true, triangle_tri_loom: true, circle_round_loom: false,
  };
  return m[t];
}

export function continuous(t: PinLoomType): boolean {
  const m: Record<PinLoomType, boolean> = {
    zoom_loom_square: true, weave_it_rect: false, hexagon_hex_loom: false, triangle_tri_loom: false, circle_round_loom: false,
  };
  return m[t];
}

export function loomMaterial(t: PinLoomType): string {
  const m: Record<PinLoomType, string> = {
    zoom_loom_square: "metal_frame_pins",
    weave_it_rect: "plastic_frame_pegs",
    hexagon_hex_loom: "wood_hex_nails",
    triangle_tri_loom: "wood_triangle_nails",
    circle_round_loom: "wood_circle_pegs",
  };
  return m[t];
}

export function bestUse(t: PinLoomType): string {
  const m: Record<PinLoomType, string> = {
    zoom_loom_square: "quick_square_motif",
    weave_it_rect: "scarf_panel_strip",
    hexagon_hex_loom: "hexagon_blanket_tile",
    triangle_tri_loom: "shawl_triangle_piece",
    circle_round_loom: "coaster_mandala_round",
  };
  return m[t];
}

export function pinLooms(): PinLoomType[] {
  return ["zoom_loom_square", "weave_it_rect", "hexagon_hex_loom", "triangle_tri_loom", "circle_round_loom"];
}
