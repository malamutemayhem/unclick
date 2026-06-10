export type DadoType = "through" | "stopped" | "half_blind" | "sliding" | "rabbeted";

export function depthFraction(type: DadoType): number {
  const d: Record<DadoType, number> = {
    through: 0.33, stopped: 0.33, half_blind: 0.33,
    sliding: 0.25, rabbeted: 0.5,
  };
  return d[type];
}

export function strengthRating(type: DadoType): number {
  const s: Record<DadoType, number> = {
    through: 6, stopped: 7, half_blind: 8, sliding: 9, rabbeted: 7,
  };
  return s[type];
}

export function visibleFromFront(type: DadoType): boolean {
  return type === "through";
}

export function routerRequired(type: DadoType): boolean {
  return type === "stopped" || type === "half_blind" || type === "sliding";
}

export function cuttingTimeMinutes(type: DadoType): number {
  const t: Record<DadoType, number> = {
    through: 5, stopped: 10, half_blind: 15, sliding: 20, rabbeted: 8,
  };
  return t[type];
}

export function shelfSupport(type: DadoType): number {
  const s: Record<DadoType, number> = {
    through: 7, stopped: 8, half_blind: 8, sliding: 10, rabbeted: 6,
  };
  return s[type];
}

export function glueRequired(type: DadoType): boolean {
  return type !== "sliding";
}

export function bestForApplication(type: DadoType): string {
  const a: Record<DadoType, string> = {
    through: "utility_shelf", stopped: "bookcase",
    half_blind: "fine_cabinet", sliding: "drawer_divider",
    rabbeted: "back_panel",
  };
  return a[type];
}

export function difficultyRating(type: DadoType): number {
  const d: Record<DadoType, number> = {
    through: 2, stopped: 4, half_blind: 6, sliding: 8, rabbeted: 3,
  };
  return d[type];
}

export function dadoTypes(): DadoType[] {
  return ["through", "stopped", "half_blind", "sliding", "rabbeted"];
}
