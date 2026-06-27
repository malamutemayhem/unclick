export type CardSleeveType = "penny_thin" | "standard_clear" | "matte_shuffle" | "art_printed" | "inner_perfect_fit";

export function protection(t: CardSleeveType): number {
  const m: Record<CardSleeveType, number> = {
    penny_thin: 4, standard_clear: 7, matte_shuffle: 8, art_printed: 9, inner_perfect_fit: 6,
  };
  return m[t];
}

export function shuffleFeel(t: CardSleeveType): number {
  const m: Record<CardSleeveType, number> = {
    penny_thin: 4, standard_clear: 7, matte_shuffle: 10, art_printed: 8, inner_perfect_fit: 3,
  };
  return m[t];
}

export function durability(t: CardSleeveType): number {
  const m: Record<CardSleeveType, number> = {
    penny_thin: 3, standard_clear: 7, matte_shuffle: 9, art_printed: 8, inner_perfect_fit: 5,
  };
  return m[t];
}

export function artVisibility(t: CardSleeveType): number {
  const m: Record<CardSleeveType, number> = {
    penny_thin: 9, standard_clear: 10, matte_shuffle: 6, art_printed: 3, inner_perfect_fit: 8,
  };
  return m[t];
}

export function sleeveCost(t: CardSleeveType): number {
  const m: Record<CardSleeveType, number> = {
    penny_thin: 1, standard_clear: 3, matte_shuffle: 6, art_printed: 9, inner_perfect_fit: 4,
  };
  return m[t];
}

export function doubleSleeveInner(t: CardSleeveType): boolean {
  const m: Record<CardSleeveType, boolean> = {
    penny_thin: false, standard_clear: false, matte_shuffle: false, art_printed: false, inner_perfect_fit: true,
  };
  return m[t];
}

export function antiGlare(t: CardSleeveType): boolean {
  const m: Record<CardSleeveType, boolean> = {
    penny_thin: false, standard_clear: false, matte_shuffle: true, art_printed: true, inner_perfect_fit: false,
  };
  return m[t];
}

export function material(t: CardSleeveType): string {
  const m: Record<CardSleeveType, string> = {
    penny_thin: "thin_polypropylene_acid_free", standard_clear: "polypropylene_medium_weight",
    matte_shuffle: "textured_polypropylene_matte", art_printed: "printed_polypropylene_opaque",
    inner_perfect_fit: "snug_fit_thin_film",
  };
  return m[t];
}

export function bestCard(t: CardSleeveType): string {
  const m: Record<CardSleeveType, string> = {
    penny_thin: "bulk_common_card_storage", standard_clear: "board_game_general_protect",
    matte_shuffle: "tournament_competitive_play", art_printed: "custom_deck_identity",
    inner_perfect_fit: "double_sleeve_valuable_card",
  };
  return m[t];
}

export function cardSleeves(): CardSleeveType[] {
  return ["penny_thin", "standard_clear", "matte_shuffle", "art_printed", "inner_perfect_fit"];
}
