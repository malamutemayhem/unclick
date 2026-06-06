import { z } from "zod";
import { UI_TOOLBOX_GATE_IDS, UI_TOOLBOX_SOURCE_IDS } from "./ui-toolbox.js";

export const SeveritySchema = z.enum(["critical", "high", "medium", "low"]);

export const ViewportSchema = z.enum(["mobile", "tablet", "desktop"]);

export const ThemeSchema = z.enum(["light", "dark"]);

// Hat ids referenced in the brief Section 6.3 hat roster. The list is open
// (custom hats are allowed) so we accept any non-empty string but document the
// canonical set here for IDE help and tests.
export const HAT_IDS = [
  "graphic-designer",
  "ux-specialist",
  "frontend",
  "accessibility",
  "brand-steward",
  "motion",
  "conversion",
  "information-architect",
  "performance",
  "mobile",
  "i18n",
  "privacy-trust",
  "onboarding",
  "content",
  "visual-designer",
  "cognitive-load",
  "agent-readability",
  "dark-pattern-detector",
] as const;

export const HatIdSchema = z.string().min(1);

const [FIRST_UI_TOOLBOX_SOURCE_ID, ...REST_UI_TOOLBOX_SOURCE_IDS] = UI_TOOLBOX_SOURCE_IDS;
const [FIRST_UI_TOOLBOX_GATE_ID, ...REST_UI_TOOLBOX_GATE_IDS] = UI_TOOLBOX_GATE_IDS;

export const UIToolboxSourceIdSchema = z.enum([
  FIRST_UI_TOOLBOX_SOURCE_ID,
  ...REST_UI_TOOLBOX_SOURCE_IDS,
]);

export const UIToolboxGateIdSchema = z.enum([
  FIRST_UI_TOOLBOX_GATE_ID,
  ...REST_UI_TOOLBOX_GATE_IDS,
]);

// Budget assertions follow the TestPass-style operator string ("&gt;= 80",
// "no critical", "zero", etc.). We keep the values as plain strings here and
// let the runner parse them at execution time.
export const BudgetsSchema = z
  .object({
    "ux-score": z.string().optional(),
    performance: z.string().optional(),
    accessibility: z.string().optional(),
    "dark-patterns": z.string().optional(),
    "agent-readability": z.string().optional(),
    motion: z.string().optional(),
    "first-run": z.string().optional(),
  })
  .catchall(z.string());

export const RemediationTargetSchema = z.enum([
  "report-only",
  "fishbowl-todos",
  "signals",
]);

export const RemediationSchema = z
  .object({
    "high-severity": RemediationTargetSchema.optional(),
    all: RemediationTargetSchema.optional(),
  })
  .catchall(RemediationTargetSchema);

export const UIToolboxCandidateSchema = z.object({
  source_id: UIToolboxSourceIdSchema,
  component_name: z.string().min(1).optional(),
  intended_use: z.string().min(1).optional(),
  required_gates: z.array(UIToolboxGateIdSchema).optional(),
});

export const UIToolboxSchema = z.object({
  sources: z.array(UIToolboxSourceIdSchema).optional(),
  required_gates: z.array(UIToolboxGateIdSchema).optional(),
  candidates: z.array(UIToolboxCandidateSchema).optional(),
  scoreboard: z.boolean().default(true),
});

export const UXPassPackSchema = z.object({
  name: z.string().min(1, "name is required"),
  url: z.string().url("url must be a valid URL"),
  viewports: z.array(ViewportSchema).min(1, "at least one viewport is required"),
  themes: z.array(ThemeSchema).min(1, "at least one theme is required"),
  hats: z.array(HatIdSchema).min(1, "at least one hat is required"),
  synthesiser: z.string().min(1, "synthesiser is required"),
  budgets: BudgetsSchema,
  remediation: RemediationSchema,
  ui_toolbox: UIToolboxSchema.optional(),
  description: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export type UXPassPack = z.infer<typeof UXPassPackSchema>;
export type Severity = z.infer<typeof SeveritySchema>;
export type Viewport = z.infer<typeof ViewportSchema>;
export type Theme = z.infer<typeof ThemeSchema>;
export type Budgets = z.infer<typeof BudgetsSchema>;
export type Remediation = z.infer<typeof RemediationSchema>;
export type RemediationTarget = z.infer<typeof RemediationTargetSchema>;
export type UIToolboxCandidate = z.infer<typeof UIToolboxCandidateSchema>;
export type UIToolboxConfig = z.infer<typeof UIToolboxSchema>;
