// wiring/plaid.ts
// Per-app MCP wiring for the plaid connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: AI

import { plaidAccounts, plaidTransactions, plaidBalances, plaidIdentity, plaidLinkTokenCreate } from "../plaid-tool.js";

export const plaidTools = [
  // ── plaid-tool.ts ─────────────────────────────────────────────────────────────
  {
    name: "plaid_accounts",
    description: "Get accounts for a Plaid-linked item.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        client_id:    { type: "string", description: "Plaid client ID" },
        secret:       { type: "string", description: "Plaid secret key" },
        access_token: { type: "string", description: "Plaid item access token" },
        account_ids:  { type: "array", items: {}, description: "Filter to specific account IDs" },
        environment:  { type: "string", enum: ["sandbox", "development", "production"], description: "sandbox, development, or production (default: sandbox)" },
      },
      required: ["client_id", "secret", "access_token"],
    },
  },
  {
    name: "plaid_transactions",
    description: "Get transactions for a Plaid-linked item within a date range.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        client_id:    { type: "string" },
        secret:       { type: "string" },
        access_token: { type: "string" },
        start_date:   { type: "string", description: "Start date (YYYY-MM-DD)" },
        end_date:     { type: "string", description: "End date (YYYY-MM-DD)" },
        count:        { type: "number", description: "Number of transactions (max 500, default 100)" },
        offset:       { type: "number" },
        account_ids:  { type: "array", items: {} },
        environment:  { type: "string", enum: ["sandbox", "development", "production"] },
      },
      required: ["client_id", "secret", "access_token", "start_date", "end_date"],
    },
  },
  {
    name: "plaid_balances",
    description: "Get real-time account balances for a Plaid-linked item.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        client_id:    { type: "string" },
        secret:       { type: "string" },
        access_token: { type: "string" },
        account_ids:  { type: "array", items: {} },
        environment:  { type: "string", enum: ["sandbox", "development", "production"] },
      },
      required: ["client_id", "secret", "access_token"],
    },
  },
  {
    name: "plaid_identity",
    description: "Get identity information for accounts linked via Plaid.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        client_id:    { type: "string" },
        secret:       { type: "string" },
        access_token: { type: "string" },
        environment:  { type: "string", enum: ["sandbox", "development", "production"] },
      },
      required: ["client_id", "secret", "access_token"],
    },
  },
  {
    name: "plaid_link_token_create",
    description: "Create a Plaid Link token to initialise the Plaid Link flow.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        client_id:             { type: "string" },
        secret:                { type: "string" },
        user_client_user_id:   { type: "string", description: "Unique identifier for the end user" },
        client_name:           { type: "string", description: "App name shown in Plaid Link UI" },
        products:              { type: "array", items: {}, description: "Plaid products (default: ['transactions'])" },
        country_codes:         { type: "array", items: {}, description: "ISO country codes (default: ['US'])" },
        language:              { type: "string", description: "Language code (default: en)" },
        webhook:               { type: "string" },
        access_token:          { type: "string", description: "For update mode: existing access token" },
        environment:           { type: "string", enum: ["sandbox", "development", "production"] },
      },
      required: ["client_id", "secret", "user_client_user_id"],
    },
  },
] as const;

export const plaidHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // plaid-tool.ts
  plaid_accounts:            (args) => plaidAccounts(args),
  plaid_transactions:        (args) => plaidTransactions(args),
  plaid_balances:            (args) => plaidBalances(args),
  plaid_identity:            (args) => plaidIdentity(args),
  plaid_link_token_create:   (args) => plaidLinkTokenCreate(args),
};
