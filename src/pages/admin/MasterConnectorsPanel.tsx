import { useCallback, useEffect, useState } from "react";
import { Crown, KeyRound, Loader2, RefreshCw, ShieldCheck } from "lucide-react";

type Field = { key: string; label: string; secret: boolean; configured: boolean; public_value?: string; placeholder: string };
type Connector = {
  provider: "gitea" | "vercel" | "supabase";
  name: string;
  source: "master" | "deployment_fallback" | "missing";
  configured: boolean;
  fields: Field[];
};
type Status = { viewer: { role: "god" | "superuser"; can_update: boolean }; connectors: Connector[] };

function label(source: Connector["source"]): string {
  return source === "master" ? "Master configured" : source === "deployment_fallback" ? "Deployment ready" : "Needs token";
}

export function MasterConnectorsPanel({ token }: { token?: string }) {
  const [status, setStatus] = useState<Status | null>(null);
  const [forms, setForms] = useState<Record<string, Record<string, string>>>({});
  const [busy, setBusy] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!token) return;
    const response = await fetch("/api/system-connectors?action=status", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const body = await response.json().catch(() => null) as Status | { error?: string } | null;
    if (!response.ok || !body || !("connectors" in body)) {
      setNotice((body as { error?: string } | null)?.error ?? "Could not load master connector status.");
      return;
    }
    setStatus(body);
    setForms((previous) => {
      const next = { ...previous };
      for (const connector of body.connectors) {
        next[connector.provider] ??= {};
        for (const field of connector.fields) {
          if (!field.secret && next[connector.provider][field.key] === undefined) {
            next[connector.provider][field.key] = field.public_value ?? "";
          }
        }
      }
      return next;
    });
  }, [token]);

  useEffect(() => { void load(); }, [load]);

  const save = useCallback(async (connector: Connector) => {
    if (!token) return;
    setBusy(connector.provider);
    setNotice(null);
    try {
      const response = await fetch("/api/system-connectors?action=upsert", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ provider: connector.provider, credentials: forms[connector.provider] ?? {} }),
      });
      const body = await response.json().catch(() => null) as { error?: string } | null;
      if (!response.ok) throw new Error(body?.error ?? "Could not save master connector.");
      setForms((previous) => ({ ...previous, [connector.provider]: Object.fromEntries(
        connector.fields.filter((field) => !field.secret).map((field) => [field.key, previous[connector.provider]?.[field.key] ?? field.public_value ?? ""]),
      ) }));
      setNotice(`${connector.name} master saved. Its token was not returned to this browser.`);
      await load();
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Could not save master connector.");
    } finally {
      setBusy(null);
    }
  }, [forms, load, token]);

  const importDefaults = useCallback(async () => {
    if (!token) return;
    setBusy("import");
    setNotice(null);
    try {
      const response = await fetch("/api/system-connectors?action=import_deployment_defaults", {
        method: "POST", headers: { Authorization: `Bearer ${token}` },
      });
      const body = await response.json().catch(() => null) as { imported?: string[]; error?: string } | null;
      if (!response.ok) throw new Error(body?.error ?? "Could not import deployment defaults.");
      setNotice(body?.imported?.length
        ? `Imported ${body.imported.join(", ")} without revealing a token.`
        : "No complete deployment defaults were available to import.");
      await load();
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Could not import deployment defaults.");
    } finally {
      setBusy(null);
    }
  }, [load, token]);

  if (!token) return null;
  return (
    <section className="mt-6 rounded-xl border border-[#E2B93B]/35 bg-[#E2B93B]/[0.055] p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex gap-3">
          <Crown className="mt-0.5 h-5 w-5 shrink-0 text-[#E2B93B]" />
          <div>
            <h2 className="text-base font-semibold text-[#f4d96f]">Master Superuser access</h2>
            <p className="mt-1 max-w-3xl text-sm leading-5 text-white/65">
              Gitea, Vercel, and Supabase master credentials stay on the server. Superusers use configured project connectors for UnClick work without connecting personal accounts.
            </p>
          </div>
        </div>
        <button type="button" onClick={() => void load()} disabled={busy !== null} className="inline-flex items-center gap-1.5 rounded-md border border-white/10 px-2.5 py-1.5 text-xs text-white/70 hover:bg-white/5 disabled:opacity-50"><RefreshCw className="h-3.5 w-3.5" />Refresh</button>
      </div>
      {notice && <p className="mt-4 rounded-md border border-white/10 bg-black/10 px-3 py-2 text-xs text-white/75">{notice}</p>}
      {status ? <>
        <div className="mt-4 grid gap-3 lg:grid-cols-3">
          {status.connectors.map((connector) => <article key={connector.provider} className="rounded-lg border border-white/10 bg-black/10 p-3">
            <div className="flex items-center justify-between gap-2"><h3 className="font-medium text-white/90">{connector.name}</h3><span className={`rounded-full px-2 py-0.5 text-[11px] ${connector.configured ? "bg-emerald-400/15 text-emerald-200" : "bg-red-400/15 text-red-200"}`}>{label(connector.source)}</span></div>
            <div className="mt-3 space-y-2">{connector.fields.map((field) => <label key={field.key} className="block text-xs text-white/60">
              <span className="flex justify-between gap-2"><span>{field.label}</span><span>{field.configured ? "Configured" : "Missing"}</span></span>
              {status.viewer.can_update && <input type={field.secret ? "password" : "text"} autoComplete="off" value={forms[connector.provider]?.[field.key] ?? (field.secret ? "" : field.public_value ?? "")} placeholder={field.placeholder} onChange={(event) => setForms((previous) => ({ ...previous, [connector.provider]: { ...previous[connector.provider], [field.key]: event.target.value } }))} className="mt-1 w-full rounded-md border border-white/10 bg-black/20 px-2 py-1.5 text-xs text-white outline-none placeholder:text-white/25 focus:border-[#E2B93B]/60" />}
            </label>)}</div>
            {status.viewer.can_update && <button type="button" disabled={busy !== null} onClick={() => void save(connector)} className="mt-3 inline-flex items-center gap-1.5 rounded-md border border-[#E2B93B]/40 bg-[#E2B93B]/10 px-2.5 py-1.5 text-xs font-medium text-[#f4d96f] hover:bg-[#E2B93B]/20 disabled:opacity-50">{busy === connector.provider ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <KeyRound className="h-3.5 w-3.5" />}Save master</button>}
          </article>)}
        </div>
        {status.viewer.can_update ? <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-white/10 bg-black/10 p-3"><p className="flex items-center gap-2 text-xs text-white/65"><ShieldCheck className="h-4 w-4 text-[#E2B93B]" />Import existing deployment values without rendering their tokens.</p><button type="button" disabled={busy !== null} onClick={() => void importDefaults()} className="inline-flex items-center gap-1.5 rounded-md border border-white/15 px-2.5 py-1.5 text-xs text-white/75 hover:bg-white/5 disabled:opacity-50">{busy === "import" ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <KeyRound className="h-3.5 w-3.5" />}Import deployment defaults</button></div> : <p className="mt-4 text-xs text-white/50">Only the God account, or the single configured admin during initial setup, can rotate master values. Superusers never receive reusable project tokens.</p>}
      </> : <p className="mt-4 flex items-center gap-2 text-sm text-white/55"><Loader2 className="h-4 w-4 animate-spin" />Loading master connector status...</p>}
    </section>
  );
}
