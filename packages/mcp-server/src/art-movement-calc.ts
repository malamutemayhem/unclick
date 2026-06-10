export type ArtMovement = "renaissance" | "impressionism" | "cubism" | "surrealism" | "abstract_expressionism";

export function yearStarted(a: ArtMovement): number {
  const m: Record<ArtMovement, number> = {
    renaissance: 1400, impressionism: 1860, cubism: 1907, surrealism: 1920, abstract_expressionism: 1940,
  };
  return m[a];
}

export function technicalSkillRequired(a: ArtMovement): number {
  const m: Record<ArtMovement, number> = {
    renaissance: 10, impressionism: 7, cubism: 6, surrealism: 8, abstract_expressionism: 5,
  };
  return m[a];
}

export function conceptualDepth(a: ArtMovement): number {
  const m: Record<ArtMovement, number> = {
    renaissance: 7, impressionism: 5, cubism: 9, surrealism: 10, abstract_expressionism: 8,
  };
  return m[a];
}

export function publicAccessibility(a: ArtMovement): number {
  const m: Record<ArtMovement, number> = {
    renaissance: 9, impressionism: 10, cubism: 4, surrealism: 6, abstract_expressionism: 3,
  };
  return m[a];
}

export function marketValue(a: ArtMovement): number {
  const m: Record<ArtMovement, number> = {
    renaissance: 10, impressionism: 9, cubism: 8, surrealism: 7, abstract_expressionism: 8,
  };
  return m[a];
}

export function representational(a: ArtMovement): boolean {
  const m: Record<ArtMovement, boolean> = {
    renaissance: true, impressionism: true, cubism: false, surrealism: true, abstract_expressionism: false,
  };
  return m[a];
}

export function europeanOrigin(a: ArtMovement): boolean {
  const m: Record<ArtMovement, boolean> = {
    renaissance: true, impressionism: true, cubism: true, surrealism: true, abstract_expressionism: false,
  };
  return m[a];
}

export function keyArtist(a: ArtMovement): string {
  const m: Record<ArtMovement, string> = {
    renaissance: "da_vinci", impressionism: "monet",
    cubism: "picasso", surrealism: "dali",
    abstract_expressionism: "pollock",
  };
  return m[a];
}

export function coreIdea(a: ArtMovement): string {
  const m: Record<ArtMovement, string> = {
    renaissance: "humanism", impressionism: "light_and_color",
    cubism: "multiple_perspectives", surrealism: "unconscious_mind",
    abstract_expressionism: "emotion_through_abstraction",
  };
  return m[a];
}

export function artMovements(): ArtMovement[] {
  return ["renaissance", "impressionism", "cubism", "surrealism", "abstract_expressionism"];
}
