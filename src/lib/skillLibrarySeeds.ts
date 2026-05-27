import {
  buildSkillLibrarySummary,
  parseSkillMarkdown,
  sortSkillsForLibrary,
  type SkillPackage,
} from "./skillLibrary";

const seedModules = import.meta.glob("../../seed/skills/*.skill.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

export const STARTER_SKILLS: SkillPackage[] = sortSkillsForLibrary(
  Object.values(seedModules).map((markdown) => parseSkillMarkdown(markdown)),
);

export const STARTER_SKILL_SUMMARY = buildSkillLibrarySummary(STARTER_SKILLS);

export function getSkillBySlug(slug: string): SkillPackage | undefined {
  return STARTER_SKILLS.find((skill) => skill.slug === slug);
}
