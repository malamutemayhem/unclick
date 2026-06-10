export type EpistemologySchool = "empiricism" | "rationalism" | "pragmatism" | "constructivism" | "skepticism";

export function evidenceEmphasis(e: EpistemologySchool): number {
  const m: Record<EpistemologySchool, number> = {
    empiricism: 10, rationalism: 4, pragmatism: 7, constructivism: 5, skepticism: 8,
  };
  return m[e];
}

export function reasonEmphasis(e: EpistemologySchool): number {
  const m: Record<EpistemologySchool, number> = {
    empiricism: 5, rationalism: 10, pragmatism: 6, constructivism: 7, skepticism: 8,
  };
  return m[e];
}

export function scientificRelevance(e: EpistemologySchool): number {
  const m: Record<EpistemologySchool, number> = {
    empiricism: 10, rationalism: 6, pragmatism: 8, constructivism: 5, skepticism: 7,
  };
  return m[e];
}

export function accessibilityScore(e: EpistemologySchool): number {
  const m: Record<EpistemologySchool, number> = {
    empiricism: 8, rationalism: 5, pragmatism: 9, constructivism: 4, skepticism: 7,
  };
  return m[e];
}

export function modernInfluence(e: EpistemologySchool): number {
  const m: Record<EpistemologySchool, number> = {
    empiricism: 9, rationalism: 7, pragmatism: 8, constructivism: 6, skepticism: 5,
  };
  return m[e];
}

export function trustsSenses(e: EpistemologySchool): boolean {
  const m: Record<EpistemologySchool, boolean> = {
    empiricism: true, rationalism: false, pragmatism: true, constructivism: false, skepticism: false,
  };
  return m[e];
}

export function innateKnowledge(e: EpistemologySchool): boolean {
  const m: Record<EpistemologySchool, boolean> = {
    empiricism: false, rationalism: true, pragmatism: false, constructivism: false, skepticism: false,
  };
  return m[e];
}

export function keyThinker(e: EpistemologySchool): string {
  const m: Record<EpistemologySchool, string> = {
    empiricism: "locke", rationalism: "descartes", pragmatism: "james",
    constructivism: "piaget", skepticism: "hume",
  };
  return m[e];
}

export function knowledgeSource(e: EpistemologySchool): string {
  const m: Record<EpistemologySchool, string> = {
    empiricism: "sensory_experience", rationalism: "innate_reason",
    pragmatism: "practical_consequences", constructivism: "social_construction",
    skepticism: "doubt_and_inquiry",
  };
  return m[e];
}

export function epistemologySchools(): EpistemologySchool[] {
  return ["empiricism", "rationalism", "pragmatism", "constructivism", "skepticism"];
}
