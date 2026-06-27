export type BindingStyle = "long_stitch" | "link_stitch" | "french_link" | "packed_sewing" | "recessed_cord";

export function stationsPerSignature(style: BindingStyle): number {
  const stations: Record<BindingStyle, number> = {
    long_stitch: 5, link_stitch: 4, french_link: 5, packed_sewing: 6, recessed_cord: 5,
  };
  return stations[style];
}

export function threadLengthMultiplier(style: BindingStyle): number {
  const mult: Record<BindingStyle, number> = {
    long_stitch: 3, link_stitch: 2.5, french_link: 3.5, packed_sewing: 4, recessed_cord: 2.5,
  };
  return mult[style];
}

export function signatureThicknessMm(sheets: number): number {
  return Math.round(sheets * 0.5);
}

export function swellPercent(style: BindingStyle): number {
  const swell: Record<BindingStyle, number> = {
    long_stitch: 5, link_stitch: 8, french_link: 10, packed_sewing: 15, recessed_cord: 3,
  };
  return swell[style];
}

export function spineFlexibility(style: BindingStyle): number {
  const flex: Record<BindingStyle, number> = {
    long_stitch: 5, link_stitch: 4, french_link: 3, packed_sewing: 2, recessed_cord: 4,
  };
  return flex[style];
}

export function decorativeRating(style: BindingStyle): number {
  const dec: Record<BindingStyle, number> = {
    long_stitch: 5, link_stitch: 4, french_link: 5, packed_sewing: 2, recessed_cord: 1,
  };
  return dec[style];
}

export function durabilityRating(style: BindingStyle): number {
  const dur: Record<BindingStyle, number> = {
    long_stitch: 3, link_stitch: 4, french_link: 4, packed_sewing: 5, recessed_cord: 5,
  };
  return dur[style];
}

export function needleSizeMm(style: BindingStyle): number {
  const sizes: Record<BindingStyle, number> = {
    long_stitch: 1.2, link_stitch: 1.0, french_link: 1.0, packed_sewing: 0.8, recessed_cord: 1.2,
  };
  return sizes[style];
}

export function costPerBook(style: BindingStyle): number {
  const costs: Record<BindingStyle, number> = {
    long_stitch: 8, link_stitch: 6, french_link: 10, packed_sewing: 12, recessed_cord: 7,
  };
  return costs[style];
}

export function bindingStyles(): BindingStyle[] {
  return ["long_stitch", "link_stitch", "french_link", "packed_sewing", "recessed_cord"];
}
