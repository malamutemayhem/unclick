// Wise (formerly TransferWise) international transfers integration for the UnClick MCP server.
// Uses the Wise REST API via fetch - no external dependencies.
// Users must create an API token at wise.com/settings/api-tokens.

// Use production by default. Set WISE_SANDBOX=true to use the sandbox environment.
const WISE_BASE = process.env.WISE_SANDBOX === "true"
  ? "https://api.sandbox.transferwise.tech/v1"
  : "https://api.wise.com/v1";

// --- API helper ---

function requireToken(): string {
  const token = (process.env.WISE_API_TOKEN ?? "").trim();
  if (!token) throw new Error("WISE_API_TOKEN environment variable is required.");
  return token;
}

async function wiseFetch(
  path: string,
  params: Record<string, string> = {},
  method: "GET" | "POST" = "GET",
  body?: unknown
): Promise<unknown> {
  const token = requireToken();
  const url = new URL(`${WISE_BASE}${path}`);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);

  const headers: Record<string, string> = {
    "Authorization": `Bearer ${token}`,
    "Accept": "application/json",
    "Content-Type": "application/json",
  };

  const options: RequestInit = { method, headers };
  if (method === "POST" && body !== undefined) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url.toString(), options);
  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`HTTP ${response.status} from Wise API${text ? `: ${text}` : ""}`);
  }

  return response.json();
}

// --- Operations ---

export async function wiseExchangeRates(args: Record<string, unknown>): Promise<unknown> {
  const source = String(args.source ?? "").trim().toUpperCase();
  const target = String(args.target ?? "").trim().toUpperCase();
  if (!source) throw new Error("source currency is required (e.g. USD).");
  if (!target) throw new Error("target currency is required (e.g. EUR).");

  const params: Record<string, string> = { source, target };
  const amount = args.amount !== undefined ? String(Number(args.amount)) : undefined;
  if (amount) params.amount = amount;

  const data = await wiseFetch("/rates", params);
  const rates = Array.isArray(data) ? data : [data];

  return {
    source,
    target,
    amount: amount ? Number(amount) : null,
    rates: (rates as Array<Record<string, unknown>>).map((r) => ({
      rate: r.rate,
      source: r.source,
      target: r.target,
      time: r.time,
    })),
  };
}

export async function wiseProfile(_args: Record<string, unknown>): Promise<unknown> {
  const data = await wiseFetch("/profiles");
  const profiles = Array.isArray(data) ? data : [data];

  return {
    count: profiles.length,
    profiles: (profiles as Array<Record<string, unknown>>).map((p) => ({
      id: p.id,
      type: p.type,
      name: (p.details as Record<string, unknown> | undefined)?.name
        ?? (p.details as Record<string, unknown> | undefined)?.firstName
        ?? null,
      created_at: p.created,
    })),
  };
}

export async function wiseAccounts(args: Record<string, unknown>): Promise<unknown> {
  const profileId = String(args.profileId ?? "").trim();
  if (!profileId) throw new Error("profileId is required. Use wise_profile to get your profile ID.");

  const data = await wiseFetch("/borderless-accounts", { profileId });
  const accounts = Array.isArray(data) ? data : [data];

  return {
    profileId,
    count: accounts.length,
    accounts: (accounts as Array<Record<string, unknown>>).map((a) => ({
      id: a.id,
      profile_id: a.profileId,
      balances: (a.balances as Array<Record<string, unknown>> | undefined)?.map((b) => ({
        currency: b.currency,
        amount: (b.amount as Record<string, unknown> | undefined)?.value ?? b.amount,
        reserved: (b.reservedAmount as Record<string, unknown> | undefined)?.value ?? null,
        cash_amount: (b.cashAmount as Record<string, unknown> | undefined)?.value ?? null,
      })) ?? [],
    })),
  };
}

export async function wiseCreateQuote(args: Record<string, unknown>): Promise<unknown> {
  const sourceCurrency = String(args.sourceCurrency ?? "").trim().toUpperCase();
  const targetCurrency = String(args.targetCurrency ?? "").trim().toUpperCase();
  if (!sourceCurrency) throw new Error("sourceCurrency is required.");
  if (!targetCurrency) throw new Error("targetCurrency is required.");

  const sourceAmount = args.sourceAmount !== undefined ? Number(args.sourceAmount) : undefined;
  const targetAmount = args.targetAmount !== undefined ? Number(args.targetAmount) : undefined;

  if (sourceAmount === undefined && targetAmount === undefined) {
    throw new Error("Either sourceAmount or targetAmount is required.");
  }

  const body: Record<string, unknown> = { sourceCurrency, targetCurrency };
  if (sourceAmount !== undefined) body.sourceAmount = sourceAmount;
  if (targetAmount !== undefined) body.targetAmount = targetAmount;

  const data = await wiseFetch("/quotes", {}, "POST", body) as Record<string, unknown>;

  return {
    id: data.id,
    source_currency: data.sourceCurrency ?? data.source,
    target_currency: data.targetCurrency ?? data.target,
    source_amount: data.sourceAmount,
    target_amount: data.targetAmount,
    rate: data.rate,
    created_time: data.createdTime,
    expiration_time: data.expirationTime,
    fee: data.fee,
    notices: data.notices ?? null,
  };
}
