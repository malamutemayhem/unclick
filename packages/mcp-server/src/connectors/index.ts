// ─── OAuth Credential Broker: Connector Registry ──────────────────────────────
// One config file per platform. Adding a new platform = copy a config, fill values.
// This registry is shared by vault-bridge.ts (MCP) and Connect.tsx (frontend).

export type AuthType = "oauth2" | "api_key" | "bot_token";

export interface CredentialField {
  /** Matches the arg name used by the tool (e.g., "access_token") */
  key: string;
  /** Human-readable label for the Connect UI form */
  label: string;
  description?: string;
  /** Mask in vault listings and UI (passwords, tokens) */
  secret: boolean;
  placeholder?: string;
  /** Link to "Where do I find this?" docs */
  findGuideUrl?: string;
}

export interface ConnectorConfig {
  name: string;
  slug: string;
  authType: AuthType;
  /** Shown on the Connect UI card */
  description: string;
  /** OAuth2 scopes to request */
  scopes?: string[];
  /** OAuth2 authorization endpoint */
  authUrl?: string;
  /** OAuth2 token exchange endpoint */
  tokenUrl?: string;
  credentialFields: CredentialField[];
  docsUrl?: string;
}

import { xeroConnector }     from "./xero.js";
import { shopifyConnector }  from "./shopify.js";
import { telegramConnector } from "./telegram.js";
import { discordConnector }  from "./discord.js";
import { redditConnector }   from "./reddit.js";
import { slackConnector }    from "./slack.js";
import { blueskyConnector }  from "./bluesky.js";
import { mastodonConnector } from "./mastodon.js";
import { lineConnector }     from "./line.js";
import { figmaConnector }    from "./figma.js";

export {
  xeroConnector,
  shopifyConnector,
  telegramConnector,
  discordConnector,
  redditConnector,
  slackConnector,
  blueskyConnector,
  mastodonConnector,
  lineConnector,
  figmaConnector,
};

export const CONNECTORS: Record<string, ConnectorConfig> = {
  xero:     xeroConnector,
  shopify:  shopifyConnector,
  telegram: telegramConnector,
  discord:  discordConnector,
  reddit:   redditConnector,
  slack:    slackConnector,
  bluesky:  blueskyConnector,
  mastodon: mastodonConnector,
  line:     lineConnector,
  figma:    figmaConnector,
};
