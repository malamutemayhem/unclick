import { useState } from "react";
import { setApiKey, isLikelyApiKey } from "@/lib/apiKeyStore";

// Shown wherever the UnClick api_key is missing from this browser (chat, the
// API providers page, etc). Lets the user paste their existing account key once
// to cache it - no key rotation needed. The server only stores a hash and can
// never hand the raw key back, so pasting it here is the no-rotation way to get
// it into this browser. The key is the same uc_/agt_ value in your MCP URL.
export function CacheKeyPrompt({ onCached }: { onCached?: () => void }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);

  function save() {
    const v = value.trim();
    if (!isLikelyApiKey(v)) {
      setError("That does not look like an UnClick key (it should start with uc_ or agt_).");
      return;
    }
    if (!setApiKey(v)) {
      setError("Could not save the key in this browser.");
      return;
    }
    setError(null);
    if (onCached) onCached();
    else window.location.reload();
  }

  return (
    <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-3 text-sm text-body">
      <p className="font-medium text-heading">Paste your UnClick key once to use this browser</p>
      <p className="mt-1 text-xs text-muted-foreground">
        This browser does not have your UnClick key cached yet, so it cannot save app keys or run
        chat. Paste your account key (starts <code>uc_</code>) - it is the same key in your MCP URL.
        No rotation needed.
      </p>
      <div className="mt-2 flex items-center gap-2">
        <input
          type="password"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") save(); }}
          placeholder="uc_..."
          className="flex-1 rounded-md border border-border/50 bg-card/40 px-3 py-2 text-sm text-body outline-none focus:border-primary/50"
        />
        <button
          type="button"
          onClick={save}
          className="rounded-md bg-primary/90 px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary"
        >
          Save key
        </button>
      </div>
      {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
    </div>
  );
}
