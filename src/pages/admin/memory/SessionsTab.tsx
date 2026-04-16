import { useEffect, useState } from "react";
import { ChevronDown, ChevronRight, MessageSquare, Clock } from "lucide-react";
import EmptyState from "./EmptyState";

interface SessionSummary {
  id: string;
  session_id: string;
  summary: string;
  topics: string[] | null;
  decisions: string[] | null;
  open_loops: string[] | null;
  platform: string | null;
  duration_minutes: number | null;
  created_at: string;
}

interface TranscriptMessage {
  id: string;
  session_id: string;
  role: string;
  content: string;
  created_at: string;
}

const ROLE_STYLES: Record<string, { bg: string; text: string }> = {
  user: { bg: "bg-blue-500/15", text: "text-blue-400" },
  assistant: { bg: "bg-[#E2B93B]/15", text: "text-[#E2B93B]" },
  system: { bg: "bg-white/[0.06]", text: "text-white/50" },
  tool: { bg: "bg-green-500/15", text: "text-green-400" },
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatShortDate(iso: string): string {
  return new Date(iso).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function SessionsTab() {
  const [sessions, setSessions] = useState<SessionSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [transcriptSessionId, setTranscriptSessionId] = useState<string | null>(null);
  const [transcript, setTranscript] = useState<TranscriptMessage[]>([]);
  const [transcriptLoading, setTranscriptLoading] = useState(false);

  useEffect(() => {
    fetch("/api/memory-admin?action=admin_sessions&method=list")
      .then((r) => r.json())
      .then((body) => {
        setSessions((body as { data: SessionSummary[] }).data ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const loadTranscript = (sessionId: string) => {
    if (transcriptSessionId === sessionId) {
      setTranscriptSessionId(null);
      return;
    }
    setTranscriptSessionId(sessionId);
    setTranscriptLoading(true);
    fetch(`/api/memory-admin?action=admin_sessions&method=transcript&session_id=${encodeURIComponent(sessionId)}`)
      .then((r) => r.json())
      .then((body) => {
        setTranscript((body as { data: TranscriptMessage[] }).data ?? []);
        setTranscriptLoading(false);
      })
      .catch(() => setTranscriptLoading(false));
  };

  if (loading) {
    return <div className="py-12 text-center text-xs text-white/40">Loading sessions...</div>;
  }

  if (sessions.length === 0) {
    return (
      <EmptyState
        icon={MessageSquare}
        heading="No sessions recorded yet"
        description="Session summaries appear automatically after conversations. Your agent saves them when a session ends."
      />
    );
  }

  return (
    <div className="space-y-2">
      {sessions.map((session) => {
        const isExpanded = expandedId === session.id;
        const showingTranscript = transcriptSessionId === session.session_id;
        const topicsStr = session.topics?.join(", ") ?? "";
        const previewText =
          session.summary.length > 120
            ? session.summary.slice(0, 120) + "..."
            : session.summary;

        return (
          <div
            key={session.id}
            className="rounded-lg border border-white/[0.06] bg-white/[0.03]"
          >
            {/* Collapsed header */}
            <button
              onClick={() => setExpandedId(isExpanded ? null : session.id)}
              className="flex w-full items-center gap-3 p-4 text-left"
            >
              <span className="shrink-0 text-white/30">
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 text-xs text-white/40">
                  <Clock className="h-3 w-3" />
                  <span>{formatDate(session.created_at)}</span>
                  {session.duration_minutes && (
                    <span>- {session.duration_minutes}min</span>
                  )}
                  {session.platform && (
                    <span className="rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-[10px]">
                      {session.platform}
                    </span>
                  )}
                </div>
                {topicsStr && (
                  <div className="mt-1 flex flex-wrap gap-1">
                    {session.topics?.map((t, i) => (
                      <span
                        key={i}
                        className="rounded bg-[#E2B93B]/10 px-1.5 py-0.5 text-[10px] text-[#E2B93B]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
                {!isExpanded && (
                  <p className="mt-1 text-xs text-white/60">{previewText}</p>
                )}
              </div>
            </button>

            {/* Expanded content */}
            {isExpanded && (
              <div className="border-t border-white/[0.06] px-4 pb-4 pt-3">
                <p className="text-sm text-white/80">{session.summary}</p>

                {session.decisions && session.decisions.length > 0 && (
                  <div className="mt-3">
                    <h4 className="mb-1 text-xs font-medium text-white/50">Decisions</h4>
                    <ul className="list-inside list-disc space-y-0.5 text-xs text-white/60">
                      {session.decisions.map((d, i) => (
                        <li key={i}>{d}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {session.open_loops && session.open_loops.length > 0 && (
                  <div className="mt-3">
                    <h4 className="mb-1 text-xs font-medium text-white/50">Open loops</h4>
                    <ul className="list-inside list-disc space-y-0.5 text-xs text-white/60">
                      {session.open_loops.map((o, i) => (
                        <li key={i}>{o}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <button
                  onClick={() => loadTranscript(session.session_id)}
                  className="mt-3 inline-flex items-center gap-1.5 rounded-md border border-white/[0.06] px-3 py-1.5 text-xs text-white/50 transition-colors hover:border-[#E2B93B]/30 hover:text-[#E2B93B]"
                >
                  <MessageSquare className="h-3 w-3" />
                  {showingTranscript ? "Hide Transcript" : "View Transcript"}
                </button>

                {/* Transcript */}
                {showingTranscript && (
                  <div className="mt-3 rounded-lg border border-white/[0.06] bg-[#0A0A0A] p-3">
                    {transcriptLoading ? (
                      <div className="py-4 text-center text-xs text-white/40">
                        Loading transcript...
                      </div>
                    ) : transcript.length === 0 ? (
                      <div className="py-4 text-center text-xs text-white/40">
                        No transcript messages found for this session.
                      </div>
                    ) : (
                      <div className="space-y-2 max-h-96 overflow-y-auto">
                        {transcript.map((msg) => {
                          const roleStyle = ROLE_STYLES[msg.role] ?? ROLE_STYLES.system;
                          return (
                            <div key={msg.id} className="flex gap-2">
                              <span
                                className={`mt-0.5 inline-flex shrink-0 items-center rounded px-1.5 py-0.5 text-[10px] font-medium uppercase ${roleStyle.bg} ${roleStyle.text}`}
                              >
                                {msg.role}
                              </span>
                              <div className="min-w-0 flex-1">
                                <p className="whitespace-pre-wrap text-xs text-white/70">
                                  {msg.content}
                                </p>
                                <span className="mt-0.5 text-[10px] text-white/20">
                                  {formatShortDate(msg.created_at)}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
