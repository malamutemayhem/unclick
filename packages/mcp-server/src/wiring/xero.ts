// wiring/xero.ts
// Per-app MCP wiring for the xero connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: AI

import { xeroInvoices, xeroContacts, xeroAccounts, xeroPayments, xeroBankTransactions, xeroReports, xeroQuotes, xeroOrganisation } from "../xero-tool.js";

export const xeroTools = [
  // ── xero-tool.ts ─────────────────────────────────────────────────────────────
  {
    name: "xero_invoices",
    description: "Get invoices from Xero.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        status: { type: "string", description: "DRAFT, SUBMITTED, AUTHORISED, etc." },
        contact_id: { type: "string" },
        date_from: { type: "string" },
        date_to: { type: "string" },
        access_token: { type: "string" },
        tenant_id: { type: "string" },
      },
    },
  },
  {
    name: "xero_contacts",
    description: "Get contacts from Xero.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        search: { type: "string" },
        is_supplier: { type: "boolean" },
        is_customer: { type: "boolean" },
        access_token: { type: "string" },
        tenant_id: { type: "string" },
      },
    },
  },
  {
    name: "xero_accounts",
    description: "Get chart of accounts from Xero.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        type: { type: "string" },
        access_token: { type: "string" },
        tenant_id: { type: "string" },
      },
    },
  },
  {
    name: "xero_payments",
    description: "Get payments from Xero.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        status: { type: "string" },
        date_from: { type: "string" },
        date_to: { type: "string" },
        access_token: { type: "string" },
        tenant_id: { type: "string" },
      },
    },
  },
  {
    name: "xero_bank_transactions",
    description: "Get bank transactions from Xero.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        bank_account_id: { type: "string" },
        date_from: { type: "string" },
        date_to: { type: "string" },
        access_token: { type: "string" },
        tenant_id: { type: "string" },
      },
    },
  },
  {
    name: "xero_reports",
    description: "Get financial reports from Xero.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        report_type: { type: "string", description: "BalanceSheet, ProfitAndLoss, TrialBalance" },
        from_date: { type: "string" },
        to_date: { type: "string" },
        access_token: { type: "string" },
        tenant_id: { type: "string" },
      },
      required: ["report_type"],
    },
  },
  {
    name: "xero_quotes",
    description: "Get quotes from Xero.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        status: { type: "string" },
        contact_id: { type: "string" },
        access_token: { type: "string" },
        tenant_id: { type: "string" },
      },
    },
  },
  {
    name: "xero_organisation",
    description: "Get organisation details from Xero.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string" },
        tenant_id: { type: "string" },
      },
    },
  },
] as const;

export const xeroHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // xero-tool.ts
  xero_invoices:           (args) => xeroInvoices(args),
  xero_contacts:           (args) => xeroContacts(args),
  xero_accounts:           (args) => xeroAccounts(args),
  xero_payments:           (args) => xeroPayments(args),
  xero_bank_transactions:  (args) => xeroBankTransactions(args),
  xero_reports:            (args) => xeroReports(args),
  xero_quotes:             (args) => xeroQuotes(args),
  xero_organisation:       (args) => xeroOrganisation(args),
};
