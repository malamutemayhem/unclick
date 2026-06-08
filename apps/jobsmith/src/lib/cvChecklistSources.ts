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
    copyRoomSourcePath: "docs/copyroom/cv-checklists/cv-checklists_1.md",
    sha256: "8abec6a418929b711b5841d7d5ac7a8ad61055abb8bbcf58af8f181f42710763",
    bytes: 27173,
    lineCount: 329,
    round: "base",
    purpose: "Core modern CV, ATS, cover letter, anti AI-slop, and defensibility checklist.",
  },
  {
    fileName: "cv-checklists_1a.md",
    repoPath: `${JOBSMITH_CV_CHECKLIST_SOURCE_DIR}/cv-checklists_1a.md`,
    copyRoomSourcePath: "docs/copyroom/cv-checklists/cv-checklists_1a.md",
    sha256: "5a8f0593e8052f075ae7280c566bab5eef3a7415d72504caa8c6bd1e2257bf9a",
    bytes: 42467,
    lineCount: 951,
    round: "round-1a",
    purpose: "Broad master checklist with role-fit, ATS, truthfulness, recruiter scan, and rewrite rules.",
  },
  {
    fileName: "cv-checklists_1b.md",
    repoPath: `${JOBSMITH_CV_CHECKLIST_SOURCE_DIR}/cv-checklists_1b.md`,
    copyRoomSourcePath: "docs/copyroom/cv-checklists/cv-checklists_1b.md",
    sha256: "2616ec5a4858f63b35ce8b0b0cab1ad86b72e4e88e51430bb046a245ebb8b22f",
    bytes: 43176,
    lineCount: 916,
    round: "round-1b",
    purpose: "Evidence-packet, parser, knockout, claim-strength, redaction, and interview consistency pass.",
  },
  {
    fileName: "cv-checklists_2.md",
    repoPath: `${JOBSMITH_CV_CHECKLIST_SOURCE_DIR}/cv-checklists_2.md`,
    copyRoomSourcePath: "docs/copyroom/cv-checklists/cv-checklists_2.md",
    sha256: "941f71191bf2fb86028ed9291796ce24aedb36bd027d2ee845e6afc424baff50",
    bytes: 24906,
    lineCount: 313,
    round: "round-2",
    purpose: "Advanced checks for reconnaissance, local norms, portfolio discipline, metadata, and feedback loops.",
  },
  {
    fileName: "cv-checklists_3.md",
    repoPath: `${JOBSMITH_CV_CHECKLIST_SOURCE_DIR}/cv-checklists_3.md`,
    copyRoomSourcePath: "docs/copyroom/cv-checklists/cv-checklists_3.md",
    sha256: "efdeb0866eb95d8351ca241800dd7ce50fda0e310c38b1812e9ec77798171b4e",
    bytes: 24498,
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
