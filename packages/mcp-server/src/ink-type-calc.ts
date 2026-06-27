export type InkType = "dye_based" | "pigment" | "latex" | "uv_curable" | "solvent";

export function colorVibrancy(ink: InkType): number {
  const m: Record<InkType, number> = {
    dye_based: 10, pigment: 7, latex: 8, uv_curable: 9, solvent: 6,
  };
  return m[ink];
}

export function lightfastnessYears(ink: InkType): number {
  const m: Record<InkType, number> = {
    dye_based: 5, pigment: 50, latex: 30, uv_curable: 40, solvent: 20,
  };
  return m[ink];
}

export function waterResistance(ink: InkType): number {
  const m: Record<InkType, number> = {
    dye_based: 2, pigment: 8, latex: 9, uv_curable: 10, solvent: 7,
  };
  return m[ink];
}

export function dryingSpeedRating(ink: InkType): number {
  const m: Record<InkType, number> = {
    dye_based: 5, pigment: 6, latex: 7, uv_curable: 10, solvent: 8,
  };
  return m[ink];
}

export function environmentalImpact(ink: InkType): number {
  const m: Record<InkType, number> = {
    dye_based: 3, pigment: 4, latex: 8, uv_curable: 7, solvent: 1,
  };
  return m[ink];
}

export function odorless(ink: InkType): boolean {
  const m: Record<InkType, boolean> = {
    dye_based: true, pigment: true, latex: true, uv_curable: true, solvent: false,
  };
  return m[ink];
}

export function outdoorSuitable(ink: InkType): boolean {
  const m: Record<InkType, boolean> = {
    dye_based: false, pigment: true, latex: true, uv_curable: true, solvent: true,
  };
  return m[ink];
}

export function bestApplication(ink: InkType): string {
  const m: Record<InkType, string> = {
    dye_based: "photo_printing", pigment: "fine_art", latex: "signage",
    uv_curable: "industrial", solvent: "vehicle_wrap",
  };
  return m[ink];
}

export function costPerLiter(ink: InkType): number {
  const m: Record<InkType, number> = {
    dye_based: 50, pigment: 150, latex: 100, uv_curable: 200, solvent: 80,
  };
  return m[ink];
}

export function inkTypes(): InkType[] {
  return ["dye_based", "pigment", "latex", "uv_curable", "solvent"];
}
