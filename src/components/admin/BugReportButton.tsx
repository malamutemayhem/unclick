/**
 * BugReportButton - small "Report a bug" control that opens a modal form.
 *
 * Submits to the existing POST /v1/report-bug endpoint. Passes the user's
 * UnClick API key as a Bearer so the report is scoped to their api_key_hash
 * and can later be listed via admin_bug_reports.
 */

import { useEffect, useRef, useState } from "react";
import { Bug, X, Loader2 } from "lucide-react";

const API_KEY_STORAGE = "unclick_api_key";

type Severity = "low" | "medium" | "high" | "critical";
type SubmitState = "idle" | "submitting" | "success" | "error";

export default function BugReportButton() {
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [steps, setSteps] = useState("");
  const [severity, setSeverity] = useState<Severity>("medium");
  const [state, setState] = useState<SubmitState>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const firstFieldRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (open) {
      setState("idle");
      setErrorMsg(null);
      setTimeout(() => firstFieldRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!description.trim()) {
      setErrorMsg("Description is required.");
      return;
    }
    setState("submitting");
    setErrorMsg(null);

    const apiKey = localStorage.getItem(API_KEY_STORAGE) ?? "";
    try {
      const res = await fetch("/v1/report-bug", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
        },
        body: JSON.stringify({
          tool_name: "admin-panel",
          error_message: description.trim(),
          expected_behavior: steps.trim() || undefined,
          agent_context: `severity:${severity} source:admin-shell`,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({ error: "Submission failed" }));
        throw new Error(body.error ?? `HTTP ${res.status}`);
      }
      setState("success");
      setDescription("");
      setSteps("");
      setSeverity("medium");
    } catch (err) {
      setState("error");
      setErrorMsg((err as Error).message);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-xs text-[#888] transition-colors hover:bg-white/[0.04] hover:text-[#ccc]"
      >
        <Bug className="h-3.5 w-3.5" />
        Report a bug
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-md overflow-hidden rounded-xl border border-white/[0.08] bg-[#111] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-[#ccc]">
                <Bug className="h-4 w-4 text-[#E2B93B]" />
                Report a bug
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-md p-1 text-[#666] hover:bg-white/[0.04] hover:text-[#ccc]"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {state === "success" ? (
              <div className="space-y-4 px-5 py-6 text-sm text-[#ccc]">
                <p className="text-[#61C1C4]">Bug reported.</p>
                <p className="text-xs text-[#888]">
                  We will look into it. You can track submitted bugs on the Settings
                  page under Support.
                </p>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-md bg-[#61C1C4] px-3 py-1.5 text-xs font-semibold text-black transition-opacity hover:opacity-90"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 px-5 py-4">
                <div>
                  <label className="mb-1 block text-xs font-medium text-[#ccc]">
                    Description <span className="text-[#E2B93B]">*</span>
                  </label>
                  <textarea
                    ref={firstFieldRef}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    rows={3}
                    placeholder="What went wrong?"
                    className="w-full rounded-md border border-white/[0.08] bg-[#0A0A0A] px-3 py-2 text-sm text-[#ccc] placeholder:text-[#555] focus:border-[#61C1C4]/60 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-[#ccc]">
                    Steps to reproduce
                  </label>
                  <textarea
                    value={steps}
                    onChange={(e) => setSteps(e.target.value)}
                    rows={3}
                    placeholder="Optional. How can we reproduce it?"
                    className="w-full rounded-md border border-white/[0.08] bg-[#0A0A0A] px-3 py-2 text-sm text-[#ccc] placeholder:text-[#555] focus:border-[#61C1C4]/60 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-[#ccc]">
                    Severity
                  </label>
                  <select
                    value={severity}
                    onChange={(e) => setSeverity(e.target.value as Severity)}
                    className="w-full rounded-md border border-white/[0.08] bg-[#0A0A0A] px-3 py-2 text-sm text-[#ccc] focus:border-[#61C1C4]/60 focus:outline-none"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>

                {errorMsg && (
                  <p className="text-xs text-red-400">{errorMsg}</p>
                )}

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="rounded-md px-3 py-1.5 text-xs text-[#888] hover:text-[#ccc]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={state === "submitting"}
                    className="inline-flex items-center gap-1.5 rounded-md bg-[#61C1C4] px-3 py-1.5 text-xs font-semibold text-black transition-opacity hover:opacity-90 disabled:opacity-60"
                  >
                    {state === "submitting" && <Loader2 className="h-3 w-3 animate-spin" />}
                    Submit
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
