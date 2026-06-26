import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { Combobox, type ComboOption } from "@/components/admin/Combobox";
import {
  CHAT_PROVIDERS,
  CHAT_API_ENDPOINT,
  findChatProvider,
  getChatApiKey,
  estimateTokens,
  fetchOpenRouterModels,
  type ChatModelOption,
} from "@/components/admin/chatTransportConfig";

// Join the text parts of a UI message into a single string.
function messageText(parts: { type: string }[]): string {
  return parts
    .map((p) => (p.type === "text" ? (p as { type: "text"; text: string }).text : ""))
    .join("");
}

const PROVIDER_OPTIONS: ComboOption[] = CHAT_PROVIDERS.map((p) => ({
  value: p.slug,
  label: p.label,
}));

export default function AdminChatPage() {
  const [providerSlug, setProviderSlug] = useState(CHAT_PROVIDERS[0].slug);
  const [model, setModel] = useState(CHAT_PROVIDERS[0].models[0].value);
  const [input, setInput] = useState("");
  const [liveModels, setLiveModels] = useState<ChatModelOption[] | null>(null);
  const [loadingModels, setLoadingModels] = useState(false);

  const apiKey = getChatApiKey();
  const provider = findChatProvider(providerSlug);

  const transport = useMemo(() => new DefaultChatTransport({ api: CHAT_API_ENDPOINT }), []);
  const { messages, sendMessage, status, stop, error } = useChat({ transport });

  const busy = status === "submitted" || status === "streaming";

  // OpenRouter: pull the live catalog so new and trending models show up on
  // their own. Other providers use their curated list. Always falls back.
  useEffect(() => {
    if (providerSlug !== "openrouter") {
      setLiveModels(null);
      return;
    }
    let cancelled = false;
    setLoadingModels(true);
    fetchOpenRouterModels()
      .then((rows) => {
        if (!cancelled) setLiveModels(rows);
      })
      .finally(() => {
        if (!cancelled) setLoadingModels(false);
      });
    return () => {
      cancelled = true;
    };
  }, [providerSlug]);

  const modelOptions: ComboOption[] =
    providerSlug === "openrouter" && liveModels ? liveModels : provider?.models ?? [];

  function onProviderChange(slug: string) {
    setProviderSlug(slug);
    const next = findChatProvider(slug);
    if (next) setModel(next.models[0].value);
  }

  function onSend() {
    const text = input.trim();
    if (!text || !apiKey || busy) return;
    setInput("");
    sendMessage(
      { text },
      {
        headers: { Authorization: `Bearer ${apiKey}` },
        body: { slug: providerSlug, model, lane: "api" },
      },
    );
  }

  const totalTokens = messages.reduce((sum, m) => sum + estimateTokens(messageText(m.parts)), 0);

  return (
    <div className="space-y-6">
      <header className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-heading">Chat</h1>
          <p className="mt-1 text-sm text-body">
            Talk to a model on your own provider key. API only - the platform never bills for the call.
          </p>
        </div>
        <div className="shrink-0 text-xs text-muted-foreground">~{totalTokens} tokens (est)</div>
      </header>

      {!apiKey && (
        <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-3 text-sm text-body">
          No UnClick key found in this browser. Open the admin from your dashboard so your key is set, then reload.
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2">
        <Combobox
          value={providerSlug}
          options={PROVIDER_OPTIONS}
          onChange={onProviderChange}
          searchPlaceholder="Search providers..."
          className="min-w-[9rem]"
        />
        <Combobox
          value={model}
          options={modelOptions}
          onChange={setModel}
          placeholder="Pick a model"
          searchPlaceholder="Search models..."
          emptyText={loadingModels ? "Loading..." : "No match - type to use a custom id."}
          allowCustom
          loading={loadingModels && modelOptions.length === 0}
          className="min-w-[13rem] flex-1 sm:flex-none"
        />
        {providerSlug === "openrouter" && (
          <span className="text-[10px] text-muted-foreground">
            {liveModels ? `${liveModels.length} live` : loadingModels ? "syncing..." : "curated"}
          </span>
        )}
        <span className="mx-1 text-border">|</span>
        <Link to="/admin/agents/api" className="text-xs text-primary hover:underline">
          Set up API keys
        </Link>
        <Link to="/admin/agents/local" className="text-xs text-primary hover:underline">
          Local models
        </Link>
      </div>

      <div className="min-h-[42vh] space-y-3 rounded-lg border border-border/40 bg-card/30 p-4">
        {messages.length === 0 && (
          <p className="text-sm text-muted-foreground">
            Ask anything. Your provider key runs the model; each reply shows an estimated token cost.
          </p>
        )}
        {messages.map((m) => {
          const text = messageText(m.parts);
          const isUser = m.role === "user";
          return (
            <div key={m.id} className={isUser ? "text-right" : "text-left"}>
              <div
                className={`inline-block max-w-[85%] whitespace-pre-wrap rounded-lg px-3 py-2 text-sm ${
                  isUser ? "bg-primary/10 text-foreground" : "bg-card/60 text-body"
                }`}
              >
                {text || (busy ? "..." : "")}
              </div>
              {!isUser && text && (
                <div className="mt-0.5 text-[10px] text-muted-foreground">
                  {model} - ~{estimateTokens(text)} tokens (est)
                </div>
              )}
            </div>
          );
        })}
        {error && <div className="text-sm text-red-400">Error: {error.message}</div>}
      </div>

      <div className="flex items-end gap-2">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              onSend();
            }
          }}
          rows={2}
          placeholder={apiKey ? "Message... (Enter to send, Shift+Enter for newline)" : "Set your UnClick key to chat"}
          disabled={!apiKey}
          className="flex-1 resize-none rounded-md border border-border/50 bg-card/40 px-3 py-2 text-sm text-body outline-none focus:border-primary/50"
        />
        {busy ? (
          <button
            type="button"
            onClick={() => stop()}
            className="rounded-md border border-border/50 px-4 py-2 text-sm font-medium text-body hover:bg-card/40"
          >
            Stop
          </button>
        ) : (
          <button
            type="button"
            onClick={onSend}
            disabled={!apiKey || !input.trim()}
            className="rounded-md bg-primary/90 px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary disabled:opacity-40"
          >
            Send
          </button>
        )}
      </div>
    </div>
  );
}
