export type CvChecklistSourceRound = "base" | "round-1a" | "round-1b" | "round-2" | "round-3";

export interface CvChecklistSource {
  fileName: string;
  repoPath: string;
  copyRoomSourcePath: string;
  sha256: string;
  bytes: number;
  lineCount: number;
  round: CvChecklistSourceRound;
  purpose: string;
}

export interface JobsmithRulePackHandoff {
  todoId: string;
  sourceCommentIds: string[];
  reportedRuleCount: number;
  reportedSeverityCounts: {
    error: number;
    warn: number;
    info: number;
  };
  reconciliationNeeded: boolean;
  reconciliationNote: string;
}

export const JOBSMITH_CV_CHECKLIST_SOURCE_DIR =
  "apps/jobsmith/docs/copyroom/cv-checklists";

export const JOBSMITH_CV_CHECKLIST_SOURCES: CvChecklistSource[] = [
  {
    fileName: "cv-checklists_1.md",
    repoPath: `${JOBSMITH_CV_CHECKLIST_SOURCE_DIR}/cv-checklists_1.md`,
    copyRoomSourcePath: "C:/Temp/unclick temp/cv-checklists_1.md",
    sha256: "36e1bd88b5eaa6bbe7374681231c5a29a66676b5813bc59cf04ccd429c27fea4",
    bytes: 27174,
    lineCount: 329,
    round: "base",
    purpose: "Core modern CV, ATS, cover letter, anti AI-slop, and defensibility checklist.",
  },
  {
    fileName: "cv-checklists_1a.md",
    repoPath: `${JOBSMITH_CV_CHECKLIST_SOURCE_DIR}/cv-checklists_1a.md`,
    copyRoomSourcePath: "C:/Temp/unclick temp/cv-checklists_1a.md",
    sha256: "5a8f0593e8052f075ae7280c566bab5eef3a7415d72504caa8c6bd1e2257bf9a",
    bytes: 42467,
    lineCount: 951,
    round: "round-1a",
    purpose: "Broad master checklist with role-fit, ATS, truthfulness, recruiter scan, and rewrite rules.",
  },
  {
    fileName: "cv-checklists_1b.md",
    repoPath: `${JOBSMITH_CV_CHECKLIST_SOURCE_DIR}/cv-checklists_1b.md`,
    copyRoomSourcePath: "C:/Temp/unclick temp/cv-checklists_1b.md",
    sha256: "2616ec5a4858f63b35ce8b0b0cab1ad86b72e4e88e51430bb046a245ebb8b22f",
    bytes: 43176,
    lineCount: 916,
    round: "round-1b",
    purpose: "Evidence-packet, parser, knockout, claim-strength, redaction, and interview consistency pass.",
  },
  {
    fileName: "cv-checklists_2.md",
    repoPath: `${JOBSMITH_CV_CHECKLIST_SOURCE_DIR}/cv-checklists_2.md`,
    copyRoomSourcePath: "C:/Temp/unclick temp/cv-checklists_2.md",
    sha256: "bffd24c5663d120c3c86957819bf6c0bdc4e5a46fee7ee0fb89bc1aba2c7577c",
    bytes: 24907,
    lineCount: 313,
    round: "round-2",
    purpose: "Advanced checks for reconnaissance, local norms, portfolio discipline, metadata, and feedback loops.",
  },
  {
    fileName: "cv-checklists_3.md",
    repoPath: `${JOBSMITH_CV_CHECKLIST_SOURCE_DIR}/cv-checklists_3.md`,
    copyRoomSourcePath: "C:/Temp/unclick temp/cv-checklists_3.md",
    sha256: "9f651dec06874771523d41f4fe7d296998ee9beeba09051fcbeb2a1c457bf3d5",
    bytes: 24500,
    lineCount: 266,
    round: "round-3",
    purpose: "Around-the-CV workflow for referrals, LinkedIn, outreach, interview prep, and operational AI hygiene.",
  },
];

export const JOBSMITH_RULE_PACK_HANDOFF: JobsmithRulePackHandoff = {
  todoId: "848eb8db-dfbb-4411-a332-05096b5bf1fb",
  sourceCommentIds: [
    "0bad9e59-03cf-44e9-83e2-33f4473a9209",
    "4438301e-bdd7-4573-98f6-289ffe40941b",
    "b1b49c8f-c3af-44bb-a2d4-363148b4d763",
  ],
  reportedRuleCount: 40,
  reportedSeverityCounts: {
    error: 12,
    warn: 19,
    info: 8,
  },
  reconciliationNeeded: true,
  reconciliationNote:
    "The initial FYI handoff reports 40 rules, but the listed severity counts total 39. Builders must reconcile before claiming full 40-rule encoding.",
};

export const JOBSMITH_RULE_CATEGORIES = [
  "ats",
  "age",
  "truth",
  "voice",
  "ai-detect",
  "cover",
  "linkedin",
  "visual",
  "metadata",
  "privacy",
  "role-specific",
  "interview-prep",
  "application-strategy",
] as const;

export function getCvChecklistSource(fileName: string): CvChecklistSource | undefined {
  return JOBSMITH_CV_CHECKLIST_SOURCES.find((source) => source.fileName === fileName);
}

export function getExpectedCvChecklistFileNames(): string[] {
  return JOBSMITH_CV_CHECKLIST_SOURCES.map((source) => source.fileName);
}
