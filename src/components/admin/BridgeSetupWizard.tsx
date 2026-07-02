// ============================================================
// BridgeSetupWizard - the "explain it like I have never used a
// terminal" walkthrough for waking a subscription seat.
//
// A subscription seat answers from the user's own computer, so setup
// means: install the vendor CLI once, then paste ONE line into a
// terminal. This wizard holds the user's hand through exactly that,
// in plain English, and then WATCHES the seat's presence until it
// flips online so the user gets a big green "Connected!" instead of
// wondering whether it worked.
//
// The copy-paste line embeds the user's UnClick key (from the local
// key store) so there is no separate environment-variable step. The
// key never leaves the browser except inside the user's own clipboard.
// ============================================================

import { useEffect, useMemo, useState } from "react";
import { Check, Copy, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { getApiKey } from "@/lib/apiKeyStore";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  detectBridgeOs,
  fetchBridgeSeats,
  findSubscriptionRuntime,
  fullBridgeCommand,
  openTerminalHint,
  type BridgeOs,
} from "@/components/admin/subscriptionSeats";

const PRESENCE_POLL_MS = 4000;

// Install lines for the CLIs we can state confidently; the rest fall back
// to "install and sign in to <name>".
const INSTALL_COMMANDS: Record<string, string> = {
  "claude-code": "npm install -g @anthropic-ai/claude-code",
  "codex-cli": "npm install -g @openai/codex",
  "gemini-cli": "npm install -g @google/gemini-cli",
};

const OS_LABELS: Array<{ os: BridgeOs; label: string }> = [
  { os: "windows", label: "Windows" },
  { os: "mac", label: "Mac" },
  { os: "linux", label: "Linux" },
];

function CopyLine({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* ignore - the text stays selectable */
    }
  }

  return (
    <div className="flex items-start gap-2 rounded-md border border-border/50 bg-background/40 p-2">
      <code className="min-w-0 flex-1 break-all font-mono text-[12px] leading-relaxed text-body">
        {text}
      </code>
      <button
        type="button"
        onClick={copy}
        aria-label={label}
        className={cn(
          "flex shrink-0 items-center gap-1 rounded-md border px-2 py-1 text-[11px] font-medium transition-colors",
          copied
            ? "border-emerald-400/50 bg-emerald-400/10 text-emerald-300"
            : "border-primary/40 bg-primary/10 text-primary hover:bg-primary/20",
        )}
      >
        {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}

function StepNumber({ n }: { n: number }) {
  return (
    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-[12px] font-bold text-primary">
      {n}
    </span>
  );
}

export function BridgeSetupWizard({
  open,
  onOpenChange,
  runtime,
  handle,
  accessToken,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  runtime: string;
  handle: string;
  accessToken: string | null;
}) {
  const option = findSubscriptionRuntime(runtime);
  const cliName = option?.cliName ?? "the AI's app";
  const seatLabel = option?.label ?? "This seat";

  const [os, setOs] = useState<BridgeOs>(() =>
    detectBridgeOs(typeof navigator !== "undefined" ? navigator.userAgent : ""),
  );
  const [connected, setConnected] = useState(false);

  const apiKey = getApiKey();
  const command = useMemo(
    () => fullBridgeCommand({ runtime, handle, apiKey, os }),
    [runtime, handle, apiKey, os],
  );
  const installCommand = INSTALL_COMMANDS[runtime];

  // Watch the seat while the wizard is open: the moment the bridge
  // heartbeats, flip to the big green confirmation.
  useEffect(() => {
    if (!open || !accessToken || connected) return;
    let cancelled = false;
    const timer = window.setInterval(async () => {
      const seats = await fetchBridgeSeats(accessToken);
      if (cancelled || !seats) return;
      if (seats.find((s) => s.handle === handle)?.online) setConnected(true);
    }, PRESENCE_POLL_MS);
    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, [open, accessToken, connected, handle]);

  // No reset-on-open effect: the caller mounts the wizard fresh per open
  // (ChatMemberRail renders it only while a seat is being walked through),
  // so `connected` naturally starts false each time.

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] max-w-lg overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Wake up {seatLabel}</DialogTitle>
          <DialogDescription className="text-[13px] leading-relaxed">
            This seat answers using YOUR plan, from YOUR computer. No API key
            to buy. It only works while your computer is on and the helper
            below is running. Takes about 2 minutes.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 text-[13px] leading-relaxed text-body">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">My computer is:</span>
            {OS_LABELS.map(({ os: value, label }) => (
              <button
                key={value}
                type="button"
                onClick={() => setOs(value)}
                className={cn(
                  "rounded-md border px-2.5 py-1 text-[12px] transition-colors",
                  os === value
                    ? "border-primary/60 bg-primary/15 text-primary"
                    : "border-border/50 text-muted-foreground hover:text-body",
                )}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="flex gap-3">
            <StepNumber n={1} />
            <div className="min-w-0 flex-1 space-y-1.5">
              <p className="font-medium text-heading">
                Have {cliName} on your computer, signed in
              </p>
              <p className="text-muted-foreground">
                Already installed and signed in? Skip to step 2.
                {installCommand
                  ? " If not, install it with this line (in step 2's terminal), then run it once and sign in:"
                  : ` If not, install ${cliName} and sign in first.`}
              </p>
              {installCommand && (
                <CopyLine text={installCommand} label={`Copy ${cliName} install command`} />
              )}
            </div>
          </div>

          <div className="flex gap-3">
            <StepNumber n={2} />
            <div className="min-w-0 flex-1 space-y-1.5">
              <p className="font-medium text-heading">Open a terminal</p>
              <p className="text-muted-foreground">{openTerminalHint(os)}</p>
            </div>
          </div>

          <div className="flex gap-3">
            <StepNumber n={3} />
            <div className="min-w-0 flex-1 space-y-1.5">
              <p className="font-medium text-heading">
                Copy this line, paste it there, press Enter
              </p>
              <CopyLine text={command} label="Copy the start command" />
              {apiKey ? (
                <p className="text-[11px] text-muted-foreground">
                  This line includes your private UnClick key so it just works.
                  Do not share it or paste it anywhere public.
                </p>
              ) : (
                <p className="text-[11px] text-amber-300/90">
                  Replace PASTE-YOUR-UNCLICK-KEY-HERE with your key from the{" "}
                  <a href="/admin/you" className="underline">
                    You page
                  </a>{" "}
                  first.
                </p>
              )}
            </div>
          </div>

          <div className="flex gap-3">
            <StepNumber n={4} />
            <div className="min-w-0 flex-1 space-y-1.5">
              <p className="font-medium text-heading">Leave that window open</p>
              <p className="text-muted-foreground">
                Closing it (or turning the computer off) puts the seat back to
                sleep. Run the same line again any time to wake it.
              </p>
            </div>
          </div>

          <div
            className={cn(
              "flex items-center gap-2 rounded-md border px-3 py-2.5",
              connected
                ? "border-emerald-400/50 bg-emerald-400/10 text-emerald-200"
                : "border-border/50 bg-card/40 text-muted-foreground",
            )}
            role="status"
          >
            {connected ? (
              <>
                <Check className="h-4 w-4 shrink-0 text-emerald-300" />
                <span className="text-[13px] font-medium">
                  Connected! The seat is awake - you can close this and start
                  chatting.
                </span>
              </>
            ) : (
              <>
                <Loader2 className="h-4 w-4 shrink-0 animate-spin" />
                <span className="text-[13px]">
                  Waiting for your computer... this turns green by itself once
                  the line above is running.
                </span>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
