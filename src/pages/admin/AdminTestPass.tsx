import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FlaskConical, Play, Save, CheckCircle2, XCircle, Clock, Copy } from "lucide-react";
import yaml from "js-yaml";
import { EditorState } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
import { yaml as yamlLang } from "@codemirror/lang-yaml";
import { basicSetup } from "codemirror";
import { useSession } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";

const DEFAULT_PACK_YAML = `id: testpass-core
name: TestPass Core v0
version: 0.1.0
description: >
  Baseline conformance checks for MCP servers. Covers JSON-RPC 2.0
  wire-protocol correctness (deterministic) and MCP lifecycle compliance
  (agent-assisted). No LLM calls required for the RPC items.

items:
  # JSON-RPC 2.0 baseline - deterministic (no LLM needed)
  - id: RPC-001
    title: Request must include jsonrpc field set to "2.0"
    category: json-rpc
    severity: critical
    check_type: deterministic
    description: Every request object must contain the field "jsonrpc" with the exact string value "2.0".
    expected: { field: jsonrpc, value: "2.0" }
    on_fail: Server is not JSON-RPC 2.0 compliant. Verify the framework sets jsonrpc correctly.
    tags: [wire-protocol, mandatory]
    profiles: [smoke, standard, deep]

  - id: RPC-002
    title: Request must include an id field (non-null for requests expecting a response)
    category: json-rpc
    severity: high
    check_type: deterministic
    description: Request objects that expect a response must carry an id (string, number, or null). Notifications omit id.
    on_fail: Missing id causes client correlation failures.
    tags: [wire-protocol, mandatory]
    profiles: [smoke, standard, deep]

  - id: RPC-003
    title: Error response must include code and message fields
    category: json-rpc
    severity: high
    check_type: deterministic
    description: When a method call fails, the error object must contain integer code and string message.
    expected: { error_shape: { code: integer, message: string } }
    on_fail: Clients cannot reliably detect or classify errors without a conformant error object.
    tags: [wire-protocol, error-handling]
    profiles: [smoke, standard, deep]

  - id: RPC-004
    title: Method not found returns error code -32601
    category: json-rpc
    severity: high
    check_type: deterministic
    description: Calling a method that does not exist must return error code -32601 (Method not found).
    expected: { error_code: -32601 }
    on_fail: Non-standard error codes break generic JSON-RPC client error handling.
    tags: [wire-protocol, error-handling]
    profiles: [smoke, standard, deep]

  - id: RPC-005
    title: Batch requests return an array of responses
    category: json-rpc
    severity: medium
    check_type: deterministic
    description: A JSON array of request objects must be handled as a batch and return a JSON array of response objects.
    on_fail: Batch support is optional per spec but must not crash the server.
    tags: [wire-protocol, batch]
    profiles: [standard, deep]

  - id: RPC-006
    title: Notification (no id) must not return a response
    category: json-rpc
    severity: medium
    check_type: deterministic
    description: A request object without an id field is a notification. The server must not return a response object.
    on_fail: Returning a response to a notification wastes bandwidth and may confuse clients.
    tags: [wire-protocol, notifications]
    profiles: [standard, deep]

  # MCP lifecycle - agent-assisted
  - id: MCP-001
    title: Server responds to initialize with a valid InitializeResult
    category: mcp-lifecycle
    severity: critical
    check_type: agent
    description: >
      Call the initialize method with a valid ClientInfo and ProtocolVersion.
      The server must respond with serverInfo, protocolVersion, and capabilities.
    on_fail: Without a valid InitializeResult the MCP handshake cannot complete.
    tags: [lifecycle, handshake]
    profiles: [smoke, standard, deep]

  - id: MCP-002
    title: Server returns non-empty instructions in InitializeResult
    category: mcp-lifecycle
    severity: medium
    check_type: agent
    description: InitializeResult.instructions should be a non-empty string describing server capabilities and usage.
    on_fail: Missing instructions means agents cannot self-orient without external documentation.
    tags: [lifecycle, documentation]
    profiles: [standard, deep]

  - id: MCP-003
    title: Server declares at least one capability in InitializeResult
    category: mcp-lifecycle
    severity: high
    check_type: agent
    description: InitializeResult.capabilities must declare at least one of tools, resources, or prompts.
    on_fail: A server with no declared capabilities provides no value to the agent.
    tags: [lifecycle, capabilities]
    profiles: [smoke, standard, deep]

  - id: MCP-004
    title: Server accepts and does not error on initialized notification
    category: mcp-lifecycle
    severity: high
    check_type: agent
    description: >
      After initialize, the client must send the initialized notification.
      The server must not return an error or close the connection.
    on_fail: Rejecting the initialized notification breaks spec-compliant clients.
    tags: [lifecycle, handshake]
    profiles: [smoke, standard, deep]

  - id: MCP-005
    title: Server responds to ping with an empty result
    category: mcp-lifecycle
    severity: medium
    check_type: agent
    description: The ping method must return an empty result object {} within 5 seconds.
    expected: { max_latency_ms: 5000 }
    on_fail: Slow or missing ping breaks liveness probes in agent frameworks.
    tags: [lifecycle, health]
    profiles: [standard, deep]

  - id: MCP-006
    title: Unknown method returns error, does not crash server
    category: mcp-lifecycle
    severity: high
    check_type: agent
    description: >
      Calling a method name not in the server's declared tools/resources/prompts
      must return a JSON-RPC error (code -32601) and leave the server alive for
      subsequent calls.
    expected: { error_code: -32601 }
    on_fail: A crash on unknown methods makes the server unusable after the first agent exploration call.
    tags: [lifecycle, resilience, error-handling]
    profiles: [smoke, standard, deep]
`;

type Profile = "smoke" | "standard" | "deep";

type Verdict = "check" | "na" | "fail" | "other" | "pending";

interface RunItem {
  id: string;
  check_id: string;
  title: string;
  category: string;
  severity: "critical" | "high" | "medium" | "low";
  verdict: Verdict;
  on_fail_comment?: string | null;
}

interface RunStatus {
  status: string;
  summary: { check?: number; fail?: number; na?: number; other?: number; pending?: number; total?: number } | null;
  items: RunItem[];
}

const VERDICT_STYLE: Record<Verdict, { label: string; cls: string }> = {
  check:   { label: "check",   cls: "bg-[#61C1C4]/15 text-[#61C1C4] border-[#61C1C4]/30" },
  na:      { label: "na",      cls: "bg-white/[0.06] text-[#888] border-white/10" },
  fail:    { label: "fail",    cls: "bg-red-500/15 text-red-400 border-red-500/30" },
  other:   { label: "other",   cls: "bg-[#E2B93B]/15 text-[#E2B93B] border-[#E2B93B]/30" },
  pending: { label: "pending", cls: "bg-blue-500/15 text-blue-400 border-blue-500/30" },
};

const SEVERITY_STYLE: Record<string, string> = {
  critical: "bg-red-500/15 text-red-400 border-red-500/30",
  high:     "bg-[#E2B93B]/15 text-[#E2B93B] border-[#E2B93B]/30",
  medium:   "bg-white/[0.06] text-[#bbb] border-white/10",
  low:      "bg-white/[0.04] text-[#888] border-white/10",
};

function Badge({ text, cls }: { text: string; cls: string }) {
  return (
    <span className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium ${cls}`}>
      {text}
    </span>
  );
}

function YamlEditor({ value, onChange }: { value: string; onChange: (next: string) => void }) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const viewRef = useRef<EditorView | null>(null);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  useEffect(() => {
    if (!hostRef.current || viewRef.current) return;

    const state = EditorState.create({
      doc: value,
      extensions: [
        basicSetup,
        yamlLang(),
        EditorView.theme(
          {
            "&": { backgroundColor: "#0A0A0A", color: "#ccc" },
            ".cm-content": { fontFamily: "ui-monospace,SFMono-Regular,Menlo,monospace", fontSize: "13px", caretColor: "#61C1C4" },
            ".cm-gutters": { backgroundColor: "#0A0A0A", color: "#555", borderRight: "1px solid rgba(255,255,255,0.06)" },
            ".cm-activeLineGutter": { backgroundColor: "rgba(97,193,196,0.08)" },
            ".cm-activeLine": { backgroundColor: "rgba(255,255,255,0.02)" },
            ".cm-selectionBackground, ::selection": { backgroundColor: "rgba(97,193,196,0.25)" },
            "&.cm-focused": { outline: "none" },
          },
          { dark: true },
        ),
        EditorView.updateListener.of((update) => {
          if (update.docChanged) onChangeRef.current(update.state.doc.toString());
        }),
      ],
    });

    viewRef.current = new EditorView({ state, parent: hostRef.current });
    return () => {
      viewRef.current?.destroy();
      viewRef.current = null;
    };
  }, [value]);

  return <div ref={hostRef} className="max-h-[460px] min-h-[300px] overflow-auto rounded-md border border-white/[0.06]" />;
}

export default function AdminTestPass() {
  const { session } = useSession();
  const { toast } = useToast();

  const [packYaml, setPackYaml] = useState<string>(DEFAULT_PACK_YAML);
  const [validateError, setValidateError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const [targetUrl, setTargetUrl] = useState("");
  const [profile, setProfile] = useState<Profile>("standard");
  const [starting, setStarting] = useState(false);
  const [runId, setRunId] = useState<string | null>(null);
  const [runStatus, setRunStatus] = useState<RunStatus | null>(null);
  const [showFailOnly, setShowFailOnly] = useState(false);

  const authHeader = useMemo<HeadersInit>(
    () => (session ? { Authorization: `Bearer ${session.access_token}` } : {}),
    [session],
  );

  const isRunning = runStatus?.status === "running" || starting;

  useEffect(() => {
    if (!runId || !session) return;
    let cancelled = false;
    let timer: number | undefined;

    async function poll() {
      try {
        const res = await fetch(`/api/testpass?action=status&run_id=${runId}`, { headers: authHeader });
        if (!res.ok) return;
        const body = (await res.json()) as RunStatus;
        if (cancelled) return;
        setRunStatus(body);
        if (body.status === "running") {
          timer = window.setTimeout(poll, 3000);
        }
      } catch {
        // Swallow transient polling errors; next tick will retry.
        if (!cancelled) timer = window.setTimeout(poll, 3000);
      }
    }
    poll();
    return () => {
      cancelled = true;
      if (timer !== undefined) window.clearTimeout(timer);
    };
  }, [runId, session, authHeader]);

  const validatePack = useCallback(() => {
    try {
      const parsed = yaml.load(packYaml);
      if (!parsed || typeof parsed !== "object") {
        setValidateError("YAML did not parse to an object");
        return false;
      }
      const p = parsed as Record<string, unknown>;
      if (!p.id || !p.name || !p.version || !Array.isArray(p.items) || (p.items as unknown[]).length === 0) {
        setValidateError("Pack is missing required fields (id, name, version, items[])");
        return false;
      }
      setValidateError(null);
      toast({ title: "YAML valid", description: `Parsed ${(p.items as unknown[]).length} items.` });
      return true;
    } catch (err) {
      setValidateError((err as Error).message);
      return false;
    }
  }, [packYaml, toast]);

  async function savePack() {
    if (!session) return;
    if (!validatePack()) return;
    setSaving(true);
    try {
      const res = await fetch("/api/testpass?action=save_pack", {
        method: "POST",
        headers: { ...authHeader, "Content-Type": "application/json" },
        body: JSON.stringify({ action: "save_pack", pack_yaml: packYaml }),
      });
      const body = await res.json();
      if (!res.ok) {
        toast({ title: "Save failed", description: body.error ?? "Unknown error" });
        return;
      }
      toast({ title: "Pack saved", description: `Slug: ${body.slug} - ${body.item_count} items.` });
    } finally {
      setSaving(false);
    }
  }

  async function startRun() {
    if (!session || !targetUrl) return;
    setStarting(true);
    setRunStatus(null);
    setRunId(null);
    try {
      const res = await fetch("/api/testpass?action=run", {
        method: "POST",
        headers: { ...authHeader, "Content-Type": "application/json" },
        body: JSON.stringify({ action: "run", target_url: targetUrl, profile }),
      });
      const body = await res.json();
      if (!res.ok) {
        toast({ title: "Run failed", description: body.error ?? "Unknown error" });
        return;
      }
      setRunId(body.run_id);
    } finally {
      setStarting(false);
    }
  }

  async function copyFixList() {
    if (!runId) return;
    try {
      const res = await fetch(`/api/testpass?action=report_md&run_id=${runId}`, { headers: authHeader });
      const body = await res.json();
      if (!res.ok || !body.markdown) {
        toast({ title: "Report unavailable", description: body.error ?? "Unknown error" });
        return;
      }
      await navigator.clipboard.writeText(body.markdown);
      toast({ title: "Fix list copied to clipboard" });
    } catch (err) {
      toast({ title: "Copy failed", description: (err as Error).message });
    }
  }

  const items = runStatus?.items ?? [];
  const filteredItems = showFailOnly ? items.filter((it) => it.verdict === "fail") : items;
  const summary = runStatus?.summary ?? null;
  const totals = {
    total: summary?.total ?? items.length,
    check: summary?.check ?? items.filter((it) => it.verdict === "check").length,
    fail: summary?.fail ?? items.filter((it) => it.verdict === "fail").length,
    na: summary?.na ?? items.filter((it) => it.verdict === "na").length,
    other: summary?.other ?? items.filter((it) => it.verdict === "other").length,
    pending: summary?.pending ?? items.filter((it) => it.verdict === "pending").length,
  };
  const scored = totals.check + totals.fail;
  const passRate = scored > 0 ? Math.round((totals.check / scored) * 100) : 0;
  const hasFailures = totals.fail > 0;

  if (!session) {
    return <p className="text-sm text-white/50">Sign in to access TestPass.</p>;
  }

  return (
    <>
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#61C1C4]/10">
          <FlaskConical className="h-5 w-5 text-[#61C1C4]" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-white">TestPass</h1>
          <p className="text-sm text-white/50">QC packs for MCP servers - author, run, ship fixes.</p>
        </div>
      </div>

      {/* Pack editor */}
      <section className="mb-10">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Pack editor</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={validatePack}
              className="rounded-md border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-[#ccc] hover:bg-white/[0.06]"
            >
              Validate YAML
            </button>
            <button
              onClick={savePack}
              disabled={saving}
              className="inline-flex items-center gap-1.5 rounded-md bg-[#61C1C4] px-3 py-1.5 text-xs font-semibold text-[#0A0A0A] hover:bg-[#61C1C4]/90 disabled:opacity-60"
            >
              <Save className="h-3.5 w-3.5" />
              {saving ? "Saving..." : "Save Pack"}
            </button>
          </div>
        </div>
        <YamlEditor value={packYaml} onChange={setPackYaml} />
        {validateError && (
          <p className="mt-2 rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-400">
            {validateError}
          </p>
        )}
      </section>

      {/* Run controls */}
      <section className="mb-10 rounded-xl border border-white/[0.06] bg-[#111] p-5">
        <h2 className="mb-4 text-lg font-semibold text-white">Run controls</h2>
        <div className="flex flex-col gap-4">
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-[#888]">Target URL</span>
            <input
              type="url"
              value={targetUrl}
              onChange={(e) => setTargetUrl(e.target.value)}
              placeholder="https://api.example.com/mcp"
              className="rounded-md border border-white/[0.08] bg-[#0A0A0A] px-3 py-2 text-sm text-white placeholder:text-[#555] focus:border-[#61C1C4] focus:outline-none"
            />
          </label>
          <fieldset className="flex flex-col gap-1.5">
            <legend className="text-xs font-medium text-[#888]">Profile</legend>
            <div className="flex gap-2">
              {(["smoke", "standard", "deep"] as const).map((p) => (
                <label
                  key={p}
                  className={`cursor-pointer rounded-md border px-3 py-1.5 text-xs font-medium transition-colors ${
                    profile === p
                      ? "border-[#61C1C4] bg-[#61C1C4]/10 text-[#61C1C4]"
                      : "border-white/[0.08] bg-white/[0.03] text-[#888] hover:bg-white/[0.06]"
                  }`}
                >
                  <input
                    type="radio"
                    name="profile"
                    value={p}
                    checked={profile === p}
                    onChange={() => setProfile(p)}
                    className="sr-only"
                  />
                  {p}
                </label>
              ))}
            </div>
          </fieldset>
          <div className="flex items-center gap-3">
            <button
              onClick={startRun}
              disabled={!targetUrl || starting}
              className="inline-flex items-center gap-1.5 rounded-md bg-[#61C1C4] px-4 py-2 text-sm font-semibold text-[#0A0A0A] hover:bg-[#61C1C4]/90 disabled:opacity-60"
            >
              {starting ? (
                <Clock className="h-4 w-4 animate-spin" />
              ) : (
                <Play className="h-4 w-4" />
              )}
              {starting ? "Starting..." : "Run TestPass"}
            </button>
            {runId && (
              <div className="text-xs text-[#888]">
                <span className="text-[#555]">Run ID:</span>{" "}
                <code className="rounded bg-white/[0.04] px-1.5 py-0.5 text-[#61C1C4]">{runId}</code>
                {runStatus?.status && (
                  <span className="ml-2">
                    <span className="text-[#555]">Status:</span>{" "}
                    <span
                      className={
                        runStatus.status === "complete"
                          ? "text-[#61C1C4]"
                          : runStatus.status === "failed"
                            ? "text-red-400"
                            : "text-blue-400"
                      }
                    >
                      {runStatus.status}
                    </span>
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Results */}
      {runId && (
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Results</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowFailOnly(false)}
                className={`rounded-md px-2.5 py-1 text-xs font-medium ${
                  !showFailOnly
                    ? "bg-[#61C1C4]/10 text-[#61C1C4]"
                    : "text-[#888] hover:text-[#ccc]"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setShowFailOnly(true)}
                className={`rounded-md px-2.5 py-1 text-xs font-medium ${
                  showFailOnly
                    ? "bg-red-500/15 text-red-400"
                    : "text-[#888] hover:text-[#ccc]"
                }`}
              >
                Fail only
              </button>
              {hasFailures && (
                <button
                  onClick={copyFixList}
                  className="inline-flex items-center gap-1.5 rounded-md border border-[#E2B93B]/30 bg-[#E2B93B]/10 px-3 py-1 text-xs font-semibold text-[#E2B93B] hover:bg-[#E2B93B]/20"
                >
                  <Copy className="h-3.5 w-3.5" />
                  Copy Fix List
                </button>
              )}
            </div>
          </div>

          <div className="mb-4 rounded-xl border border-white/[0.06] bg-[#111] p-4">
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                {hasFailures ? (
                  <XCircle className="h-4 w-4 text-red-400" />
                ) : (
                  <CheckCircle2 className="h-4 w-4 text-[#61C1C4]" />
                )}
                <span className="font-semibold text-white">Pass rate: {passRate}%</span>
              </div>
              <div className="text-xs text-[#888]">
                <span className="text-[#555]">Total:</span> {totals.total}
                <span className="mx-2 text-[#61C1C4]">check {totals.check}</span>
                <span className="mx-2 text-red-400">fail {totals.fail}</span>
                <span className="mx-2 text-[#888]">na {totals.na}</span>
                <span className="mx-2 text-[#E2B93B]">other {totals.other}</span>
                <span className="mx-2 text-blue-400">pending {totals.pending}</span>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-white/[0.06] bg-[#111]">
            <table className="w-full text-sm">
              <thead className="border-b border-white/[0.06] bg-white/[0.02] text-left text-xs uppercase tracking-wider text-[#666]">
                <tr>
                  <th className="px-4 py-2.5 font-medium">Check</th>
                  <th className="px-4 py-2.5 font-medium">Title</th>
                  <th className="px-4 py-2.5 font-medium">Category</th>
                  <th className="px-4 py-2.5 font-medium">Severity</th>
                  <th className="px-4 py-2.5 font-medium">Verdict</th>
                  <th className="px-4 py-2.5 font-medium">On fail</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-10 text-center text-xs text-[#666]">
                      {isRunning ? "Running checks..." : "No items to show."}
                    </td>
                  </tr>
                ) : (
                  filteredItems.map((it) => (
                    <tr key={it.id} className="border-t border-white/[0.04] hover:bg-white/[0.02]">
                      <td className="px-4 py-2.5 font-mono text-xs text-[#ccc]">{it.check_id}</td>
                      <td className="px-4 py-2.5 text-[#ddd]">{it.title}</td>
                      <td className="px-4 py-2.5 text-xs text-[#888]">{it.category}</td>
                      <td className="px-4 py-2.5">
                        <Badge text={it.severity} cls={SEVERITY_STYLE[it.severity] ?? SEVERITY_STYLE.medium} />
                      </td>
                      <td className="px-4 py-2.5">
                        <Badge text={VERDICT_STYLE[it.verdict].label} cls={VERDICT_STYLE[it.verdict].cls} />
                      </td>
                      <td className="px-4 py-2.5 text-xs text-[#888]">{it.on_fail_comment ?? ""}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </>
  );
}
