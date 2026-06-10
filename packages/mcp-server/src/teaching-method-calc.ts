export type TeachingMethod = "lecture" | "socratic" | "project_based" | "flipped_classroom" | "montessori";

export function studentEngagement(t: TeachingMethod): number {
  const m: Record<TeachingMethod, number> = {
    lecture: 3, socratic: 8, project_based: 10, flipped_classroom: 8, montessori: 9,
  };
  return m[t];
}

export function contentCoverage(t: TeachingMethod): number {
  const m: Record<TeachingMethod, number> = {
    lecture: 10, socratic: 5, project_based: 6, flipped_classroom: 8, montessori: 4,
  };
  return m[t];
}

export function prepTimeHours(t: TeachingMethod): number {
  const m: Record<TeachingMethod, number> = {
    lecture: 4, socratic: 6, project_based: 9, flipped_classroom: 10, montessori: 7,
  };
  return m[t];
}

export function retentionRate(t: TeachingMethod): number {
  const m: Record<TeachingMethod, number> = {
    lecture: 3, socratic: 7, project_based: 9, flipped_classroom: 8, montessori: 8,
  };
  return m[t];
}

export function scalability(t: TeachingMethod): number {
  const m: Record<TeachingMethod, number> = {
    lecture: 10, socratic: 3, project_based: 5, flipped_classroom: 8, montessori: 2,
  };
  return m[t];
}

export function studentLed(t: TeachingMethod): boolean {
  const m: Record<TeachingMethod, boolean> = {
    lecture: false, socratic: false, project_based: true, flipped_classroom: true, montessori: true,
  };
  return m[t];
}

export function requiresTechnology(t: TeachingMethod): boolean {
  const m: Record<TeachingMethod, boolean> = {
    lecture: false, socratic: false, project_based: false, flipped_classroom: true, montessori: false,
  };
  return m[t];
}

export function keyPedagogue(t: TeachingMethod): string {
  const m: Record<TeachingMethod, string> = {
    lecture: "traditional", socratic: "socrates", project_based: "dewey",
    flipped_classroom: "bergmann_sams", montessori: "maria_montessori",
  };
  return m[t];
}

export function bestAgeGroup(t: TeachingMethod): string {
  const m: Record<TeachingMethod, string> = {
    lecture: "university", socratic: "high_school", project_based: "middle_school",
    flipped_classroom: "high_school_university", montessori: "early_childhood",
  };
  return m[t];
}

export function teachingMethods(): TeachingMethod[] {
  return ["lecture", "socratic", "project_based", "flipped_classroom", "montessori"];
}
