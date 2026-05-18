// apps/jobsmith/src/pages/JobsmithDraft.tsx
//
// v0 UI: paste job description → preview voice profile → generate draft cover letter.
// Loads the corpus on mount via ingestCvCorpus(); builds the voice profile once.
//
// In v0, the corpus root must come from env (NEXT_PUBLIC_JOBSMITH_CV_ROOT or
// VITE_JOBSMITH_CV_ROOT depending on the runtime). The lib function defaults to
// process.env.JOBSMITH_CV_ROOT — adapt the env read for your framework.

import { useEffect, useMemo, useState } from "react";

import { ingestCvCorpus, type Corpus } from "../lib/ingestCvCorpus";
import { buildVoiceProfile, type VoiceProfile } from "../lib/voiceProfile";
import { renderCoverLetterDraft, type DraftResult } from "../lib/renderDraft";
import { JOBSMITH_RULE_PACK_V1, summarizeRulePack } from "../lib/checkEngine";

type LoadState =
  | { kind: "loading" }
  | { kind: "ready"; corpus: Corpus; profile: VoiceProfile }
  | { kind: "error"; message: string };

export default function JobsmithDraft() {
  const [state, setState] = useState<LoadState>({ kind: "loading" });
  const [jobText, setJobText] = useState("");
  const [draft, setDraft] = useState<DraftResult | null>(null);
  const ruleSummary = useMemo(() => summarizeRulePack(JOBSMITH_RULE_PACK_V1), []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const corpus = await ingestCvCorpus();
        const profile = buildVoiceProfile(corpus);
        if (!cancelled) setState({ kind: "ready", corpus, profile });
      } catch (err) {
        if (!cancelled)
          setState({ kind: "error", message: err instanceof Error ? err.message : String(err) });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const canGenerate = useMemo(() => state.kind === "ready" && jobText.trim().length > 0, [
    state,
    jobText,
  ]);

  function handleGenerate() {
    if (state.kind !== "ready") return;
    const result = renderCoverLetterDraft(
      { rawText: jobText },
      state.profile,
      { brandSuffix: "Creative Lead & Founder, Malamute Mayhem" },
    );
    setDraft(result);
  }

  return (
    <div className="jobsmith-draft" style={{ maxWidth: 880, margin: "0 auto", padding: 24 }}>
      <header style={{ marginBottom: 16 }}>
        <h1 style={{ marginBottom: 4 }}>Jobsmith v0</h1>
        <p style={{ color: "#666", marginTop: 0 }}>
          Paste a job description, get a starter cover letter in your voice. Always edit before
          sending.
        </p>
      </header>

      <RulePackStatus summary={ruleSummary} />

      {state.kind === "loading" && <p>Loading corpus…</p>}

      {state.kind === "error" && (
        <p style={{ color: "crimson" }}>
          Couldn't load CV corpus: {state.message}
        </p>
      )}

      {state.kind === "ready" && (
        <CorpusSummary corpus={state.corpus} profile={state.profile} />
      )}

      <section style={{ marginTop: 24 }}>
        <label htmlFor="job-text" style={{ display: "block", fontWeight: 600 }}>
          Paste job description:
        </label>
        <textarea
          id="job-text"
          value={jobText}
          onChange={(e) => setJobText(e.target.value)}
          rows={12}
          style={{ width: "100%", fontFamily: "inherit", fontSize: 14, padding: 12 }}
          placeholder="Paste the full job description here…"
        />
        <button
          onClick={handleGenerate}
          disabled={!canGenerate}
          style={{ marginTop: 12, padding: "8px 16px", fontSize: 14 }}
        >
          Generate draft
        </button>
      </section>

      {draft && <DraftView draft={draft} />}
    </div>
  );
}

function RulePackStatus({ summary }: { summary: ReturnType<typeof summarizeRulePack> }) {
  const badgeStyle = {
    display: "inline-flex",
    alignItems: "center",
    borderRadius: 4,
    border: "1px solid #ddd",
    padding: "2px 6px",
    fontSize: 12,
    marginRight: 8,
  } as const;

  return (
    <section
      aria-label="JobSmith rule pack"
      style={{
        border: "1px solid #eee",
        borderRadius: 6,
        padding: 12,
        background: "#fff",
        fontSize: 13,
      }}
    >
      <strong>Universal Rules v{summary.version}</strong>
      <div style={{ marginTop: 6, color: "#555" }}>
        <span style={badgeStyle}>{summary.totalRules} rules</span>
        <span style={badgeStyle}>{summary.categories.length} categories</span>
        <span style={badgeStyle}>{summary.bySeverity.ERROR} blockers</span>
        <span
          style={{
            ...badgeStyle,
            borderColor: summary.needsRefresh > 0 ? "#d99" : "#ddd",
            color: summary.needsRefresh > 0 ? "#8a1f1f" : "#555",
          }}
        >
          {summary.needsRefresh} needs refresh
        </span>
      </div>
    </section>
  );
}

function CorpusSummary({ corpus, profile }: { corpus: Corpus; profile: VoiceProfile }) {
  return (
    <details style={{ background: "#fafafa", padding: 12, borderRadius: 4 }}>
      <summary style={{ cursor: "pointer", fontWeight: 600 }}>
        Corpus loaded: {corpus.coverLetters.length} cover letters, {corpus.jobsApplied.length} jobs
        applied
      </summary>
      <div style={{ marginTop: 12, fontSize: 13, color: "#444" }}>
        <p>
          <strong>Role types:</strong> {profile.roleTypes.join(", ") || "—"}
        </p>
        <p>
          <strong>Past brands:</strong> {profile.pastBrands.join(", ") || "—"}
        </p>
        <p>
          <strong>Tone:</strong> {profile.tonalAdjectives.join(", ") || "—"}
        </p>
        {profile.openingFormulas[0] && (
          <p>
            <strong>Default opener:</strong> <em>{profile.openingFormulas[0]}</em>
          </p>
        )}
      </div>
    </details>
  );
}

function DraftView({ draft }: { draft: DraftResult }) {
  return (
    <section style={{ marginTop: 24 }}>
      <h2 style={{ marginBottom: 8 }}>Draft cover letter</h2>
      {draft.warnings.length > 0 && (
        <ul style={{ color: "#a35", fontSize: 13 }}>
          {draft.warnings.map((w, i) => (
            <li key={i}>{w}</li>
          ))}
        </ul>
      )}
      <textarea
        readOnly
        value={draft.draft}
        rows={20}
        style={{ width: "100%", fontFamily: "inherit", fontSize: 14, padding: 12 }}
      />
      <p style={{ color: "#777", fontSize: 12, marginTop: 4 }}>
        Detected role: {draft.detectedRole ?? "—"} · company: {draft.detectedCompany ?? "—"}
      </p>
    </section>
  );
}
