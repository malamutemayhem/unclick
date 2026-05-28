import { createClient } from "@supabase/supabase-js";

export type SignalInput = {
  apiKeyHash: string;
  tool: string;
  action: string;
  severity?: "info" | "action_needed" | "critical";
  summary: string;
  deepLink?: string;
  payload?: Record<string, unknown>;
};

type SignalRequest = {
  body?: { api_key_hash?: unknown };
  headers?: Record<string, unknown>;
};

type SignalResponse = unknown;

function getServiceClient() {
  const url = process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL ?? "";
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.VITE_SUPABASE_ANON_KEY ?? "";
  return createClient(url, key);
}

export async function emitSignal(input: SignalInput): Promise<void> {
  try {
    if (!input.apiKeyHash || input.apiKeyHash === "unknown") return;
    const supabase = getServiceClient();
    await supabase.from("mc_signals").insert({
      api_key_hash: input.apiKeyHash,
      tool: input.tool,
      action: input.action,
      severity: input.severity ?? "info",
      summary: input.summary,
      deep_link: input.deepLink ?? null,
      payload: input.payload ?? {},
    });
  } catch {
    // fire-and-forget, never throws upstream
  }
}

function getApiKeyHash(req: SignalRequest | undefined): string {
  return String(req?.body?.api_key_hash ?? req?.headers?.["x-api-key-hash"] ?? "unknown");
}

export function withSignals<Args extends unknown[], Result>(
  handler: (...args: Args) => Promise<Result>,
  config: {
    tool: string;
    deriveAction?: (req: SignalRequest | undefined, res: SignalResponse | undefined) => string;
    deriveSummary?: (req: SignalRequest | undefined, res: SignalResponse | undefined) => string;
    deriveSeverity?: (
      req: SignalRequest | undefined,
      res: SignalResponse | undefined,
      error?: unknown,
    ) => "info" | "action_needed" | "critical";
  }
): (...args: Args) => Promise<Result> {
  return async (...args: Args) => {
    const [req, res] = args as [SignalRequest | undefined, SignalResponse | undefined, ...unknown[]];
    try {
      const result = await handler(...args);
      void emitSignal({
        apiKeyHash: getApiKeyHash(req),
        tool: config.tool,
        action: config.deriveAction ? config.deriveAction(req, res) : "completed",
        severity: config.deriveSeverity ? config.deriveSeverity(req, res) : "info",
        summary: config.deriveSummary
          ? config.deriveSummary(req, res)
          : `${config.tool} completed successfully`,
      });
      return result;
    } catch (error) {
      void emitSignal({
        apiKeyHash: getApiKeyHash(req),
        tool: config.tool,
        action: config.deriveAction ? config.deriveAction(req, res) : "failed",
        severity: "critical",
        summary: config.deriveSummary
          ? config.deriveSummary(req, res)
          : `${config.tool} failed: ${error instanceof Error ? error.message : String(error)}`,
      });
      throw error;
    }
  };
}
