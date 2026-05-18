import { useEffect, useMemo, useRef, useState } from "react";
import {
  AlertTriangle,
  BriefcaseBusiness,
  CheckCircle2,
  Clipboard,
  Download,
  FileText,
  ScrollText,
  ShieldCheck,
  Sparkles,
  Upload,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import { useCanonical } from "@/hooks/use-canonical";
import { useMetaTags } from "@/hooks/useMetaTags";
import {
  buildBrowserCorpus,
  type CorpusFileResult,
} from "@/lib/jobsmith/buildBrowserCorpus";
import { buildVoiceProfile, type VoiceProfile } from "@jobsmith/lib/voiceProfile";
import {
  renderCoverLetterDraft,
  type DraftResult,
} from "@jobsmith/lib/renderDraft";
import {
  renderCvDraft,
  type CvDraftResult,
} from "@jobsmith/lib/renderCvDraft";
import {
  CV_FACTS_TEMPLATE,
  parseMasterCvFacts,
  type MasterCvFacts,
} from "@jobsmith/lib/cvFacts";
import { toDocxBlob, type DocxKind } from "@jobsmith/lib/exportDocx";

const CV_FACTS_STORAGE_KEY = "jobsmith.cvFacts.v1";

function safeFilePart(value: string | null | undefined, fallback: string): string {
  const cleaned = (value ?? "").replace(/[^\w\s-]/g, "").replace(/\s+/g, " ").trim();
  return cleaned.length > 0 ? cleaned : fallback;
}

async function downloadDocx(
  kind: DocxKind,
  text: string,
  company: string | null,
  role: string | null,
): Promise<void> {
  const blob = await toDocxBlob(text, { kind });
  const prefix = kind === "cv" ? "CV" : "Cover Letter";
  const filename = `${prefix} - ${safeFilePart(company, "Company")} - ${safeFilePart(role, "Role")}.docx`;
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

type ReadinessLevel = "blocked" | "review" | "ready";

const SIGNOFF_SUFFIX = "Creative Lead & Founder, Malamute Mayhem";

interface ReadinessCheck {
  label: string;
  level: ReadinessLevel;
  reason: string;
}

const LEVEL_LABELS: Record<ReadinessLevel, string> = {
  blocked: "Blocked",
  review: "Review",
  ready: "Ready",
};

const LEVEL_STYLES: Record<ReadinessLevel, string> = {
  blocked: "border-rose-300/25 bg-rose-300/10 text-rose-100",
  review: "border-[#E2B93B]/30 bg-[#E2B93B]/10 text-[#F4D36B]",
  ready: "border-emerald-300/25 bg-emerald-300/10 text-emerald-100",
};

type CorpusState =
  | { kind: "empty" }
  | { kind: "loading" }
  | {
      kind: "ready";
      profile: VoiceProfile;
      files: CorpusFileResult[];
      letterCount: number;
    }
  | { kind: "error"; message: string };

function hasBrittleFormatLanguage(value: string): boolean {
  return /\b(table|tables|column|columns|two-column|textbox|text box|image-only|pdf-only|scanned|screenshot|infographic|hidden text|keyword stuffing)\b/i.test(
    value,
  );
}

function longestParagraphWords(value: string): number {
  return value
    .split(/\n{2,}/)
    .map((p) => p.trim().split(/\s+/).filter(Boolean).length)
    .reduce((max, count) => Math.max(max, count), 0);
}

function buildReadinessChecks(
  draft: DraftResult | null,
  letterText: string,
  profile: VoiceProfile | null,
  jobText: string,
): ReadinessCheck[] {
  if (!draft) {
    return [
      { label: "Role basics", level: "blocked", reason: "Generate a draft to run readiness checks" },
      { label: "Source-backed claim", level: "blocked", reason: "Generate a draft to run readiness checks" },
      { label: "Portal paste length", level: "blocked", reason: "Generate a draft to run readiness checks" },
      { label: "Format risk", level: "blocked", reason: "Generate a draft to run readiness checks" },
    ];
  }

  const roleBasics: ReadinessLevel =
    draft.detectedRole && draft.detectedCompany
      ? "ready"
      : draft.detectedRole || draft.detectedCompany
        ? "review"
        : "blocked";

  const citedBrands = (profile?.pastBrands ?? []).filter((brand) =>
    letterText.includes(brand),
  );
  const claimLevel: ReadinessLevel = citedBrands.length > 0 ? "ready" : "review";

  const longest = longestParagraphWords(letterText);
  const lengthLevel: ReadinessLevel = longest > 55 ? "review" : "ready";

  const brittle = hasBrittleFormatLanguage(`${jobText}\n${letterText}`);

  return [
    {
      label: "Role basics",
      level: roleBasics,
      reason:
        roleBasics === "ready"
          ? "Role and company detected from the job description"
          : roleBasics === "review"
            ? "Only one of role or company was detected; check the draft"
            : "Could not detect role or company; the draft uses placeholders",
    },
    {
      label: "Source-backed claim",
      level: claimLevel,
      reason:
        claimLevel === "ready"
          ? `Draft cites brands from your corpus: ${citedBrands.join(", ")}`
          : "Upload more cover letters so the draft can cite real past brands",
    },
    {
      label: "Portal paste length",
      level: lengthLevel,
      reason:
        lengthLevel === "review"
          ? `Longest paragraph is ${longest} words; trim before pasting into tight fields`
          : "Paragraph lengths are reasonable for portal fields",
    },
    {
      label: "Format risk",
      level: brittle ? "review" : "ready",
      reason: brittle
        ? "Review table, column, image, hidden text, or keyword-stuffing wording"
        : "No brittle ATS formatting language detected",
    },
  ];
}

function overallLevel(checks: ReadinessCheck[]): ReadinessLevel {
  if (checks.some((c) => c.level === "blocked")) return "blocked";
  if (checks.some((c) => c.level === "review")) return "review";
  return "ready";
}

function LevelBadge({ level }: { level: ReadinessLevel }) {
  const Icon = level === "ready" ? CheckCircle2 : AlertTriangle;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${LEVEL_STYLES[level]}`}
    >
      <Icon className="h-3.5 w-3.5" />
      {LEVEL_LABELS[level]}
    </span>
  );
}

export default function JobsmithPage() {
  const [corpus, setCorpus] = useState<CorpusState>({ kind: "empty" });
  const [profile, setProfile] = useState<VoiceProfile | null>(null);
  const [jobText, setJobText] = useState("");
  const [letterDraft, setLetterDraft] = useState<DraftResult | null>(null);
  const [letterText, setLetterText] = useState("");
  const [cvDraft, setCvDraft] = useState<CvDraftResult | null>(null);
  const [cvText, setCvText] = useState("");
  const [copied, setCopied] = useState<"letter" | "cv" | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [cvFactsRaw, setCvFactsRaw] = useState<string>(() =>
    typeof window === "undefined"
      ? ""
      : (window.localStorage.getItem(CV_FACTS_STORAGE_KEY) ?? ""),
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (cvFactsRaw.trim()) {
      window.localStorage.setItem(CV_FACTS_STORAGE_KEY, cvFactsRaw);
    } else {
      window.localStorage.removeItem(CV_FACTS_STORAGE_KEY);
    }
  }, [cvFactsRaw]);

  const cvFactsParse = useMemo(
    () => (cvFactsRaw.trim() ? parseMasterCvFacts(cvFactsRaw) : null),
    [cvFactsRaw],
  );
  const cvFacts: MasterCvFacts | null =
    cvFactsParse && cvFactsParse.ok ? cvFactsParse.facts : null;
  let cvFactsError = "";
  if (cvFactsParse && !cvFactsParse.ok) {
    cvFactsError = cvFactsParse.error;
  }

  useCanonical("/jobsmith");
  useMetaTags({
    title: "Jobsmith - UnClick",
    description:
      "Browser-local Jobsmith: turn your cover-letter corpus into a tailored, source-backed application draft.",
    ogTitle: "Jobsmith - UnClick",
    ogDescription:
      "Upload your cover letters, paste a job description, get a tailored draft. Nothing leaves your browser.",
    ogUrl: "https://unclick.world/jobsmith",
  });

  const checks = useMemo(
    () => buildReadinessChecks(letterDraft, letterText, profile, jobText),
    [letterDraft, letterText, profile, jobText],
  );
  const level = useMemo(() => overallLevel(checks), [checks]);

  async function handleCorpusFiles(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return;
    setCorpus({ kind: "loading" });
    try {
      const { corpus: built, files } = await buildBrowserCorpus(
        Array.from(fileList),
      );
      const built_profile = buildVoiceProfile(built);
      const letterCount = files.filter((f) => f.ok).length;
      setProfile(built_profile);
      setCorpus({ kind: "ready", profile: built_profile, files, letterCount });
    } catch (err) {
      setProfile(null);
      setCorpus({
        kind: "error",
        message: err instanceof Error ? err.message : String(err),
      });
    }
  }

  function handleGenerate() {
    if (profile) {
      const letter = renderCoverLetterDraft({ rawText: jobText }, profile, {
        brandSuffix: SIGNOFF_SUFFIX,
      });
      setLetterDraft(letter);
      setLetterText(letter.draft);
    }
    if (cvFacts) {
      const cv = renderCvDraft(cvFacts, { rawText: jobText });
      setCvDraft(cv);
      setCvText(cv.draft);
    }
    setCopied(null);
  }

  async function copyText(which: "letter" | "cv", text: string) {
    if (!text) return;
    await navigator.clipboard?.writeText(text);
    setCopied(which);
  }

  const canGenerate = profile !== null && jobText.trim().length > 0;

  return (
    <div className="min-h-screen bg-[#090909] text-white">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 pb-20 pt-20 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#61C1C4]">
                Jobsmith
              </p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Tailored application drafts
              </h1>
            </div>
            <div className="rounded-lg border border-[#61C1C4]/20 bg-[#61C1C4]/10 px-3 py-2 text-xs leading-5 text-[#9EE4E6]">
              Browser-local. No upload, no submit, no external check.
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.05}>
          <section
            aria-label="Jobsmith draft builder"
            className="grid gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(360px,0.9fr)]"
          >
            <div className="space-y-4">
              <section className="rounded-lg border border-white/[0.06] bg-[#111] p-5">
                <div className="mb-4 flex items-center gap-2">
                  <Upload className="h-4 w-4 text-[#61C1C4]" />
                  <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/60">
                    Step 1 - Cover letter corpus
                  </h2>
                </div>
                <p className="mb-3 text-xs leading-5 text-white/50">
                  Pick your past cover letters (.pdf, .txt, or .md). They are
                  parsed in this browser to learn your voice. The files are not
                  uploaded anywhere.
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.txt,.md"
                  multiple
                  aria-label="Cover letter files"
                  onChange={(e) => void handleCorpusFiles(e.target.files)}
                  className="block w-full text-xs text-white/70 file:mr-3 file:rounded-lg file:border file:border-[#61C1C4]/30 file:bg-[#61C1C4]/10 file:px-3 file:py-2 file:text-xs file:font-semibold file:text-[#9EE4E6] hover:file:bg-[#61C1C4]/20"
                />

                {corpus.kind === "loading" && (
                  <p className="mt-3 text-xs text-white/55">Parsing corpus...</p>
                )}
                {corpus.kind === "error" && (
                  <p className="mt-3 text-xs text-rose-200">
                    Could not parse corpus: {corpus.message}
                  </p>
                )}
                {corpus.kind === "ready" && (
                  <CorpusSummary
                    files={corpus.files}
                    profile={corpus.profile}
                    letterCount={corpus.letterCount}
                  />
                )}
              </section>

              <section className="rounded-lg border border-white/[0.06] bg-[#111] p-5">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <ScrollText className="h-4 w-4 text-[#61C1C4]" />
                    <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/60">
                      Step 2 - Master CV facts
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setCvFactsRaw(JSON.stringify(CV_FACTS_TEMPLATE, null, 2))
                    }
                    className="rounded-lg border border-[#61C1C4]/30 bg-[#61C1C4]/10 px-3 py-1.5 text-xs font-semibold text-[#9EE4E6] transition-colors hover:bg-[#61C1C4]/20"
                  >
                    Load template
                  </button>
                </div>
                <p className="mb-3 text-xs leading-5 text-white/50">
                  Optional but recommended. Paste your CV as structured JSON
                  facts, each with an id. The CV draft can only select and
                  reorder these facts, never invent a line. Saved in this
                  browser so you enter it once.
                </p>
                <textarea
                  aria-label="Master CV facts JSON"
                  value={cvFactsRaw}
                  onChange={(e) => setCvFactsRaw(e.target.value)}
                  rows={10}
                  spellCheck={false}
                  placeholder='{ "name": "...", "contact": "...", "experience": [], "education": [], "skills": [] }'
                  className="w-full resize-y rounded-lg border border-white/[0.08] bg-black/30 px-3 py-2.5 font-mono text-xs leading-5 text-white outline-none transition-colors focus:border-[#61C1C4]/45"
                />
                {cvFactsParse === null && (
                  <p className="mt-2 text-xs text-white/40">
                    No CV facts yet. The cover letter still works without them.
                  </p>
                )}
                {cvFactsParse && cvFactsParse.ok && (
                  <p className="mt-2 text-xs text-emerald-200">
                    Valid: {cvFactsParse.facts.experience.length} experience
                    {cvFactsParse.facts.experience.length === 1
                      ? " entry"
                      : " entries"}
                    , {cvFactsParse.facts.skills.length} skills.
                  </p>
                )}
                {cvFactsError && (
                  <p className="mt-2 text-xs text-rose-200">
                    CV facts not usable: {cvFactsError}
                  </p>
                )}
              </section>

              <section className="rounded-lg border border-white/[0.06] bg-[#111] p-5">
                <div className="mb-4 flex items-center gap-2">
                  <BriefcaseBusiness className="h-4 w-4 text-[#61C1C4]" />
                  <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/60">
                    Step 3 - Job description
                  </h2>
                </div>
                <label htmlFor="jobsmith-jd" className="block">
                  <span className="mb-1 block text-xs font-medium text-white/55">
                    Paste the full job description
                  </span>
                  <textarea
                    id="jobsmith-jd"
                    value={jobText}
                    onChange={(e) => setJobText(e.target.value)}
                    rows={10}
                    placeholder="Paste the job description here. The first line is read as the role, the second as the company."
                    className="w-full resize-y rounded-lg border border-white/[0.08] bg-black/30 px-3 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-white/25 focus:border-[#61C1C4]/45"
                  />
                </label>
                <button
                  type="button"
                  onClick={handleGenerate}
                  disabled={!canGenerate}
                  className="mt-3 flex items-center justify-center gap-2 rounded-lg border border-[#61C1C4]/30 bg-[#61C1C4]/10 px-4 py-2.5 text-sm font-semibold text-[#9EE4E6] transition-colors hover:bg-[#61C1C4]/20 disabled:cursor-not-allowed disabled:border-white/[0.08] disabled:bg-white/[0.04] disabled:text-white/30"
                >
                  <Sparkles className="h-4 w-4" />
                  Generate tailored draft
                </button>
                {!profile && (
                  <p className="mt-2 text-xs text-white/40">
                    Load a cover letter corpus first to enable drafting.
                  </p>
                )}
              </section>

              {letterDraft && (
                <section
                  aria-label="Cover letter draft"
                  className="rounded-lg border border-white/[0.06] bg-[#111] p-5"
                >
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-fuchsia-300" />
                      <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/60">
                        Cover letter draft
                      </h2>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => void copyText("letter", letterText)}
                        className="flex items-center gap-1.5 rounded-lg border border-white/[0.12] bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-white/80 transition-colors hover:bg-white/[0.08]"
                      >
                        {copied === "letter" ? (
                          <CheckCircle2 className="h-3.5 w-3.5" />
                        ) : (
                          <Clipboard className="h-3.5 w-3.5" />
                        )}
                        {copied === "letter" ? "Copied" : "Copy letter"}
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          void downloadDocx(
                            "letter",
                            letterText,
                            letterDraft.detectedCompany,
                            letterDraft.detectedRole,
                          )
                        }
                        className="flex items-center gap-1.5 rounded-lg border border-fuchsia-300/30 bg-fuchsia-300/10 px-3 py-1.5 text-xs font-semibold text-fuchsia-100 transition-colors hover:bg-fuchsia-300/20"
                      >
                        <Download className="h-3.5 w-3.5" />
                        Download .docx
                      </button>
                    </div>
                  </div>

                  {letterDraft.warnings.length > 0 && (
                    <ul className="mb-3 space-y-1 rounded-lg border border-[#E2B93B]/20 bg-[#E2B93B]/10 p-3 text-xs leading-5 text-[#F4D36B]">
                      {letterDraft.warnings.map((w) => (
                        <li key={w}>{w}</li>
                      ))}
                    </ul>
                  )}

                  <textarea
                    aria-label="Editable cover letter draft"
                    value={letterText}
                    onChange={(e) => {
                      setLetterText(e.target.value);
                      setCopied(null);
                    }}
                    rows={20}
                    className="w-full resize-y rounded-lg border border-white/[0.08] bg-black/30 px-3 py-2.5 text-sm leading-6 text-white outline-none transition-colors focus:border-[#61C1C4]/45"
                  />
                  <p className="mt-2 text-xs text-white/45">
                    Detected role: {letterDraft.detectedRole ?? "not detected"} -
                    company: {letterDraft.detectedCompany ?? "not detected"}.
                    This is a starter draft: edit it before sending.
                  </p>
                </section>
              )}

              {cvDraft && (
                <section
                  aria-label="CV draft"
                  className="rounded-lg border border-white/[0.06] bg-[#111] p-5"
                >
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-fuchsia-300" />
                      <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/60">
                        Tailored CV draft
                      </h2>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => void copyText("cv", cvText)}
                        className="flex items-center gap-1.5 rounded-lg border border-white/[0.12] bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-white/80 transition-colors hover:bg-white/[0.08]"
                      >
                        {copied === "cv" ? (
                          <CheckCircle2 className="h-3.5 w-3.5" />
                        ) : (
                          <Clipboard className="h-3.5 w-3.5" />
                        )}
                        {copied === "cv" ? "Copied" : "Copy CV"}
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          void downloadDocx(
                            "cv",
                            cvText,
                            letterDraft?.detectedCompany ?? null,
                            letterDraft?.detectedRole ?? null,
                          )
                        }
                        className="flex items-center gap-1.5 rounded-lg border border-fuchsia-300/30 bg-fuchsia-300/10 px-3 py-1.5 text-xs font-semibold text-fuchsia-100 transition-colors hover:bg-fuchsia-300/20"
                      >
                        <Download className="h-3.5 w-3.5" />
                        Download .docx
                      </button>
                    </div>
                  </div>

                  {cvDraft.warnings.length > 0 && (
                    <ul className="mb-3 space-y-1 rounded-lg border border-[#E2B93B]/20 bg-[#E2B93B]/10 p-3 text-xs leading-5 text-[#F4D36B]">
                      {cvDraft.warnings.map((w) => (
                        <li key={w}>{w}</li>
                      ))}
                    </ul>
                  )}

                  <textarea
                    aria-label="Editable CV draft"
                    value={cvText}
                    onChange={(e) => {
                      setCvText(e.target.value);
                      setCopied(null);
                    }}
                    rows={22}
                    className="w-full resize-y rounded-lg border border-white/[0.08] bg-black/30 px-3 py-2.5 text-sm leading-6 text-white outline-none transition-colors focus:border-[#61C1C4]/45"
                  />
                  <p className="mt-2 text-xs text-white/45">
                    Single column, standard ATS headings. Every bullet is one of
                    your master CV facts:{" "}
                    {cvDraft.citations.length} fact
                    {cvDraft.citations.length === 1 ? "" : "s"} used,{" "}
                    {cvDraft.omittedBullets.length} left out for not matching the
                    job. Nothing here is invented.
                  </p>
                </section>
              )}
            </div>

            <aside className="space-y-4 lg:sticky lg:top-20 lg:self-start">
              <section
                aria-label="ATS and paste readiness"
                className="rounded-lg border border-white/[0.06] bg-[#111] p-5"
              >
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-emerald-300" />
                    <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/60">
                      Readiness checks
                    </h2>
                  </div>
                  <LevelBadge level={level} />
                </div>
                <div className="grid gap-2">
                  {checks.map((check) => (
                    <div
                      key={check.label}
                      className="rounded-lg border border-white/[0.06] bg-black/20 p-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-sm font-semibold text-white">
                          {check.label}
                        </p>
                        <LevelBadge level={check.level} />
                      </div>
                      <p className="mt-1 text-xs leading-5 text-white/50">
                        {check.reason}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 rounded-lg border border-[#61C1C4]/15 bg-[#61C1C4]/[0.06] p-3 text-xs leading-5 text-[#9EE4E6]">
                  Every draft is assembled in this browser from your own corpus.
                  Jobsmith does not submit an application or call an external
                  service.
                </div>
              </section>
            </aside>
          </section>
        </FadeIn>
      </main>
      <Footer />
    </div>
  );
}

function CorpusSummary({
  files,
  profile,
  letterCount,
}: {
  files: CorpusFileResult[];
  profile: VoiceProfile;
  letterCount: number;
}) {
  return (
    <div className="mt-3 space-y-3">
      <p className="text-xs font-semibold text-emerald-200">
        {letterCount} of {files.length} file
        {files.length === 1 ? "" : "s"} parsed into your voice profile
      </p>
      <ul className="space-y-1 text-xs leading-5 text-white/55">
        {files.map((file) => (
          <li key={file.fileName} className="flex items-start gap-2">
            {file.ok ? (
              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-300" />
            ) : (
              <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-rose-300" />
            )}
            <span>
              {file.fileName}
              {file.ok
                ? ` - ${file.chars} characters`
                : ` - ${file.error ?? "could not parse"}`}
            </span>
          </li>
        ))}
      </ul>
      <div className="rounded-lg border border-white/[0.06] bg-black/20 p-3 text-xs leading-5 text-white/55">
        <p>
          <strong className="text-white/75">Past brands:</strong>{" "}
          {profile.pastBrands.join(", ") || "none detected yet"}
        </p>
        <p>
          <strong className="text-white/75">Tone:</strong>{" "}
          {profile.tonalAdjectives.join(", ") || "none detected yet"}
        </p>
        {profile.openingFormulas[0] && (
          <p>
            <strong className="text-white/75">Default opener:</strong>{" "}
            <em>{profile.openingFormulas[0]}</em>
          </p>
        )}
      </div>
    </div>
  );
}
