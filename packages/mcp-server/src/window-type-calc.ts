export type WindowType = "casement" | "double_hung" | "awning" | "fixed" | "sliding";

export function ventilationArea(w: WindowType): number {
  const m: Record<WindowType, number> = {
    casement: 10, double_hung: 6, awning: 5, fixed: 0, sliding: 5,
  };
  return m[w];
}

export function weatherSeal(w: WindowType): number {
  const m: Record<WindowType, number> = {
    casement: 9, double_hung: 6, awning: 8, fixed: 10, sliding: 4,
  };
  return m[w];
}

export function viewClarity(w: WindowType): number {
  const m: Record<WindowType, number> = {
    casement: 8, double_hung: 6, awning: 7, fixed: 10, sliding: 7,
  };
  return m[w];
}

export function easeOfOperation(w: WindowType): number {
  const m: Record<WindowType, number> = {
    casement: 7, double_hung: 6, awning: 8, fixed: 10, sliding: 9,
  };
  return m[w];
}

export function securityRating(w: WindowType): number {
  const m: Record<WindowType, number> = {
    casement: 8, double_hung: 5, awning: 7, fixed: 10, sliding: 4,
  };
  return m[w];
}

export function opensOutward(w: WindowType): boolean {
  const m: Record<WindowType, boolean> = {
    casement: true, double_hung: false, awning: true, fixed: false, sliding: false,
  };
  return m[w];
}

export function allowsScreens(w: WindowType): boolean {
  const m: Record<WindowType, boolean> = {
    casement: false, double_hung: true, awning: false, fixed: false, sliding: true,
  };
  return m[w];
}

export function bestRoom(w: WindowType): string {
  const m: Record<WindowType, string> = {
    casement: "kitchen", double_hung: "bedroom", awning: "bathroom",
    fixed: "living_room", sliding: "patio",
  };
  return m[w];
}

export function costMultiplier(w: WindowType): number {
  const m: Record<WindowType, number> = {
    casement: 1.3, double_hung: 1.0, awning: 1.2, fixed: 0.8, sliding: 0.9,
  };
  return m[w];
}

export function windowTypes(): WindowType[] {
  return ["casement", "double_hung", "awning", "fixed", "sliding"];
}
