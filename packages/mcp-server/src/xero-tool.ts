// ─── Xero Accounting API integration ──────────────────────────────────────────
// Uses Xero API v2 (https://api.xero.com/api.xro/2.0/) via fetch.
// Auth: OAuth 2.0 Bearer token provided by the caller (external OAuth flow).
// All requests require Xero-Tenant-Id header.
// Rate limit: 60 calls/min on Starter tier.
// No external dependencies.

const XERO_BASE = "https://api.xero.com/api.xro/2.0";

// ─── Shared fetch helper ──────────────────────────────────────────────────────

interface XeroFetchOptions {
  accessToken: string;
  tenantId: string;
  method: "GET" | "POST";
  path: string;
  body?: unknown;
  query?: Record<string, string | number | undefined>;
}

async function xeroFetch(opts: XeroFetchOptions): Promise<unknown> {
  const url = new URL(`${XERO_BASE}${opts.path}`);

  if (opts.query) {
    for (const [k, v] of Object.entries(opts.query)) {
      if (v !== undefined && v !== "") {
        url.searchParams.set(k, String(v));
      }
    }
  }

  const headers: Record<string, string> = {
    Authorization: `Bearer ${opts.accessToken}`,
    "Xero-Tenant-Id": opts.tenantId,
    Accept: "application/json",
  };

  if (opts.body !== undefined) {
    headers["Content-Type"] = "application/json";
  }

  let response: Response;
  try {
    response = await fetch(url.toString(), {
      method: opts.method,
      headers,
      body: opts.body !== undefined ? JSON.stringify(opts.body) : undefined,
    });
  } catch (err) {
    return {
      error: true,
      message: `Network error reaching Xero API: ${err instanceof Error ? err.message : String(err)}`,
    };
  }

  const text = await response.text();
  let data: unknown;
  try {
    data = JSON.parse(text);
  } catch {
    data = { raw: text };
  }

  const rateInfo: Record<string, string | null> = {};
  const remaining = response.headers.get("X-Rate-Limit-Remaining");
  const problem = response.headers.get("X-Rate-Limit-Problem");
  if (remaining !== null) rateInfo.rate_limit_remaining = remaining;
  if (problem !== null) rateInfo.rate_limit_problem = problem;

  if (!response.ok) {
    return {
      error: true,
      status: response.status,
      statusText: response.statusText,
      detail: data,
      ...(Object.keys(rateInfo).length > 0 && { rate_limit: rateInfo }),
    };
  }

  if (typeof data === "object" && data !== null) {
    return Object.keys(rateInfo).length > 0
      ? { ...data as object, rate_limit: rateInfo }
      : data;
  }

  return { data, ...(Object.keys(rateInfo).length > 0 && { rate_limit: rateInfo }) };
}

// ─── Validation helpers ───────────────────────────────────────────────────────

function requireAuth(args: Record<string, unknown>): { error: string } | null {
  if (!args.access_token || String(args.access_token).trim() === "") {
    return { error: "access_token is required." };
  }
  if (!args.tenant_id || String(args.tenant_id).trim() === "") {
    return { error: "tenant_id is required." };
  }
  return null;
}

function token(args: Record<string, unknown>): string {
  return String(args.access_token).trim();
}

function tenant(args: Record<string, unknown>): string {
  return String(args.tenant_id).trim();
}

function str(v: unknown): string | undefined {
  return v !== undefined && v !== null && v !== "" ? String(v) : undefined;
}

// ─── 1. Invoices ──────────────────────────────────────────────────────────────

export async function xeroInvoices(args: Record<string, unknown>): Promise<unknown> {
  const authErr = requireAuth(args);
  if (authErr) return authErr;

  const action = str(args.action) ?? "list";

  if (action === "get") {
    const invoiceId = str(args.invoice_id);
    if (!invoiceId) return { error: "invoice_id is required for action='get'." };
    return xeroFetch({
      accessToken: token(args),
      tenantId: tenant(args),
      method: "GET",
      path: `/Invoices/${encodeURIComponent(invoiceId)}`,
    });
  }

  if (action === "create") {
    if (!args.body || typeof args.body !== "object") {
      return { error: "body (invoice object) is required for action='create'." };
    }
    return xeroFetch({
      accessToken: token(args),
      tenantId: tenant(args),
      method: "POST",
      path: "/Invoices",
      body: args.body,
    });
  }

  // list (default)
  return xeroFetch({
    accessToken: token(args),
    tenantId: tenant(args),
    method: "GET",
    path: "/Invoices",
    query: {
      where: str(args.where),
      order: str(args.order),
      page: args.page !== undefined ? Number(args.page) : undefined,
      pageSize: args.page_size !== undefined ? Number(args.page_size) : undefined,
      Statuses: str(args.statuses),
      ContactIDs: str(args.contact_ids),
      IDs: str(args.ids),
    },
  });
}

// ─── 2. Contacts ─────────────────────────────────────────────────────────────

export async function xeroContacts(args: Record<string, unknown>): Promise<unknown> {
  const authErr = requireAuth(args);
  if (authErr) return authErr;

  const action = str(args.action) ?? "list";

  if (action === "get") {
    const contactId = str(args.contact_id);
    if (!contactId) return { error: "contact_id is required for action='get'." };
    return xeroFetch({
      accessToken: token(args),
      tenantId: tenant(args),
      method: "GET",
      path: `/Contacts/${encodeURIComponent(contactId)}`,
    });
  }

  if (action === "create") {
    if (!args.body || typeof args.body !== "object") {
      return { error: "body (contact object) is required for action='create'." };
    }
    return xeroFetch({
      accessToken: token(args),
      tenantId: tenant(args),
      method: "POST",
      path: "/Contacts",
      body: args.body,
    });
  }

  // list
  return xeroFetch({
    accessToken: token(args),
    tenantId: tenant(args),
    method: "GET",
    path: "/Contacts",
    query: {
      where: str(args.where),
      order: str(args.order),
      page: args.page !== undefined ? Number(args.page) : undefined,
      pageSize: args.page_size !== undefined ? Number(args.page_size) : undefined,
      searchTerm: str(args.search_term),
      IDs: str(args.ids),
      includeArchived: args.include_archived === true ? "true" : undefined,
    },
  });
}

// ─── 3. Accounts ─────────────────────────────────────────────────────────────

export async function xeroAccounts(args: Record<string, unknown>): Promise<unknown> {
  const authErr = requireAuth(args);
  if (authErr) return authErr;

  return xeroFetch({
    accessToken: token(args),
    tenantId: tenant(args),
    method: "GET",
    path: "/Accounts",
    query: {
      where: str(args.where),
      order: str(args.order),
    },
  });
}

// ─── 4. Payments ─────────────────────────────────────────────────────────────

export async function xeroPayments(args: Record<string, unknown>): Promise<unknown> {
  const authErr = requireAuth(args);
  if (authErr) return authErr;

  const action = str(args.action) ?? "list";

  if (action === "create") {
    if (!args.body || typeof args.body !== "object") {
      return { error: "body (payment object) is required for action='create'." };
    }
    return xeroFetch({
      accessToken: token(args),
      tenantId: tenant(args),
      method: "POST",
      path: "/Payments",
      body: args.body,
    });
  }

  // list
  return xeroFetch({
    accessToken: token(args),
    tenantId: tenant(args),
    method: "GET",
    path: "/Payments",
    query: {
      where: str(args.where),
      order: str(args.order),
      page: args.page !== undefined ? Number(args.page) : undefined,
    },
  });
}

// ─── 5. Bank Transactions ─────────────────────────────────────────────────────

export async function xeroBankTransactions(args: Record<string, unknown>): Promise<unknown> {
  const authErr = requireAuth(args);
  if (authErr) return authErr;

  return xeroFetch({
    accessToken: token(args),
    tenantId: tenant(args),
    method: "GET",
    path: "/BankTransactions",
    query: {
      where: str(args.where),
      order: str(args.order),
      page: args.page !== undefined ? Number(args.page) : undefined,
    },
  });
}

// ─── 6. Reports ──────────────────────────────────────────────────────────────

export async function xeroReports(args: Record<string, unknown>): Promise<unknown> {
  const authErr = requireAuth(args);
  if (authErr) return authErr;

  const reportId = str(args.report_id);
  if (!reportId) {
    return {
      error:
        "report_id is required. Common values: ProfitAndLoss, BalanceSheet, " +
        "CashSummary, AgedReceivablesByContact, AgedPayablesByContact, ExecutiveSummary, " +
        "TrialBalance, BankSummary.",
    };
  }

  return xeroFetch({
    accessToken: token(args),
    tenantId: tenant(args),
    method: "GET",
    path: `/Reports/${encodeURIComponent(reportId)}`,
    query: {
      fromDate: str(args.from_date),
      toDate: str(args.to_date),
      date: str(args.date),
      periods: args.periods !== undefined ? Number(args.periods) : undefined,
      timeframe: str(args.timeframe),
      contactID: str(args.contact_id),
      accountID: str(args.account_id),
    },
  });
}

// ─── 7. Quotes ───────────────────────────────────────────────────────────────

export async function xeroQuotes(args: Record<string, unknown>): Promise<unknown> {
  const authErr = requireAuth(args);
  if (authErr) return authErr;

  const action = str(args.action) ?? "list";

  if (action === "get") {
    const quoteId = str(args.quote_id);
    if (!quoteId) return { error: "quote_id is required for action='get'." };
    return xeroFetch({
      accessToken: token(args),
      tenantId: tenant(args),
      method: "GET",
      path: `/Quotes/${encodeURIComponent(quoteId)}`,
    });
  }

  if (action === "create") {
    if (!args.body || typeof args.body !== "object") {
      return { error: "body (quote object) is required for action='create'." };
    }
    return xeroFetch({
      accessToken: token(args),
      tenantId: tenant(args),
      method: "POST",
      path: "/Quotes",
      body: args.body,
    });
  }

  // list
  return xeroFetch({
    accessToken: token(args),
    tenantId: tenant(args),
    method: "GET",
    path: "/Quotes",
    query: {
      status: str(args.status),
      contactID: str(args.contact_id),
      dateFrom: str(args.date_from),
      dateTo: str(args.date_to),
      page: args.page !== undefined ? Number(args.page) : undefined,
    },
  });
}

// ─── 8. Organisation ─────────────────────────────────────────────────────────

export async function xeroOrganisation(args: Record<string, unknown>): Promise<unknown> {
  const authErr = requireAuth(args);
  if (authErr) return authErr;

  return xeroFetch({
    accessToken: token(args),
    tenantId: tenant(args),
    method: "GET",
    path: "/Organisation",
  });
}
