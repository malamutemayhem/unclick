// Frontend Connector Registry
// Mirrors packages/mcp-server/src/connectors/ for use in the React frontend.
// Pure data, no Node.js dependencies. Safe to import in browser code.

export type AuthType = "oauth2" | "api_key" | "bot_token";

export interface CredentialField {
  key:          string;
  label:        string;
  description?: string;
  secret:       boolean;
  placeholder?: string;
  findGuideUrl?: string;
}

export interface ConnectorConfig {
  name:        string;
  slug:        string;
  authType:    AuthType;
  description: string;
  scopes?:     string[];
  authUrl?:    string;
  tokenUrl?:   string;
  /** Extra query params some providers require on the authorize URL
   *  (e.g. Google's access_type=offline for a refresh token). */
  extraAuthParams?: Record<string, string>;
  credentialFields: CredentialField[];
  docsUrl?:    string;
}

// Platform definitions

export const CONNECTORS: Record<string, ConnectorConfig> = {

  github: {
    name:        "GitHub",
    slug:        "github",
    authType:    "oauth2",
    description: "GitHub repositories, pull requests, issues, and workflow checks.",
    scopes: [
      "repo",
      "workflow",
      "read:user",
      "user:email",
    ],
    authUrl:  "https://github.com/login/oauth/authorize",
    tokenUrl: "https://github.com/login/oauth/access_token",
    credentialFields: [
      {
        key:          "api_key",
        label:        "GitHub token fallback",
        description:  "Use only if GitHub login is unavailable. Token must include the repo and workflow access UnClick needs.",
        secret:       true,
        placeholder:  "ghp_... or github_pat_...",
        findGuideUrl: "https://github.com/settings/tokens",
      },
    ],
    docsUrl: "https://docs.github.com/rest",
  },

  vercel: {
    name:        "Vercel",
    slug:        "vercel",
    authType:    "api_key",
    description: "Vercel projects, deployments, domains, and environment variables.",
    credentialFields: [
      {
        key:          "api_key",
        label:        "Vercel token",
        description:  "Vercel account token used by UnClick for deployment and project checks.",
        secret:       true,
        placeholder:  "vcp_...",
        findGuideUrl: "https://vercel.com/account/settings/tokens",
      },
    ],
    docsUrl: "https://vercel.com/docs/rest-api",
  },

  supabase: {
    name:        "Supabase",
    slug:        "supabase",
    authType:    "api_key",
    description: "Supabase project access for database, auth, and service operations.",
    credentialFields: [
      {
        key:          "project_ref",
        label:        "Project ref",
        description:  "The short Supabase project reference from your project URL.",
        secret:       false,
        placeholder:  "abcdefghijklmnopqrst",
        findGuideUrl: "https://supabase.com/dashboard/projects",
      },
      {
        key:          "anon_key",
        label:        "Anon key",
        description:  "Public anon key for client-safe checks.",
        secret:       true,
        placeholder:  "eyJhbGciOi...",
        findGuideUrl: "https://supabase.com/dashboard/project/_/settings/api",
      },
      {
        key:          "service_role_key",
        label:        "Service role key",
        description:  "Server-only key. Store only inside Passport or trusted server environments.",
        secret:       true,
        placeholder:  "eyJhbGciOi...",
        findGuideUrl: "https://supabase.com/dashboard/project/_/settings/api",
      },
    ],
    docsUrl: "https://supabase.com/docs/reference",
  },

  xero: {
    name:        "Xero",
    slug:        "xero",
    authType:    "oauth2",
    description: "Xero accounting software. Access invoices, contacts, payments, bank transactions, and financial reports.",
    scopes: [
      "accounting.transactions.read",
      "accounting.transactions",
      "accounting.contacts.read",
      "accounting.contacts",
      "accounting.reports.read",
      "accounting.settings.read",
    ],
    authUrl:  "https://login.xero.com/identity/connect/authorize",
    tokenUrl: "https://identity.xero.com/connect/token",
    credentialFields: [
      {
        key:          "access_token",
        label:        "Access Token",
        description:  "OAuth2 bearer token from Xero. Expires after 30 minutes.",
        secret:       true,
        placeholder:  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
        findGuideUrl: "https://developer.xero.com/documentation/guides/oauth2/overview/",
      },
      {
        key:          "tenant_id",
        label:        "Tenant ID",
        description:  "Xero organisation UUID. Returned after OAuth2 authorization.",
        secret:       false,
        placeholder:  "00000000-0000-0000-0000-000000000000",
        findGuideUrl: "https://developer.xero.com/documentation/guides/oauth2/pkce-flow/#3-call-the-xero-tenants-api",
      },
    ],
    docsUrl: "https://developer.xero.com/documentation/",
  },

  shopify: {
    name:        "Shopify",
    slug:        "shopify",
    authType:    "oauth2",
    description: "Shopify ecommerce. Manage products, orders, customers, inventory, and collections.",
    scopes: [
      "read_products", "write_products",
      "read_orders",   "write_orders",
      "read_customers","write_customers",
      "read_inventory","write_inventory",
    ],
    authUrl:  "https://{store}.myshopify.com/admin/oauth/authorize",
    tokenUrl: "https://{store}.myshopify.com/admin/oauth/access_token",
    credentialFields: [
      {
        key:          "store",
        label:        "Store Name",
        description:  "Your Shopify store slug, e.g. 'mystore' (without .myshopify.com).",
        secret:       false,
        placeholder:  "mystore",
        findGuideUrl: "https://help.shopify.com/en/manual/domains",
      },
      {
        key:          "access_token",
        label:        "Admin API Access Token",
        description:  "Shopify Admin API access token from your custom app settings.",
        secret:       true,
        placeholder:  "shpat_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        findGuideUrl: "https://help.shopify.com/en/manual/apps/app-types/custom-apps#get-the-api-credentials-for-a-custom-app",
      },
    ],
    docsUrl: "https://shopify.dev/docs/api/admin-rest",
  },

  telegram: {
    name:        "Telegram",
    slug:        "telegram",
    authType:    "bot_token",
    description: "Telegram Bot API. Send messages, read chats, manage groups, and handle media.",
    credentialFields: [
      {
        key:          "bot_token",
        label:        "Bot Token",
        description:  "Token from @BotFather. Create a new bot with /newbot to get yours.",
        secret:       true,
        placeholder:  "1234567890:ABCdefGHIjklmNOPqrstUVwxyz",
        findGuideUrl: "https://core.telegram.org/bots/tutorial#obtain-your-bot-token",
      },
    ],
    docsUrl: "https://core.telegram.org/bots/api",
  },

  discord: {
    name:        "Discord",
    slug:        "discord",
    authType:    "bot_token",
    description: "Discord Bot API. Send messages, read channels, manage threads, add reactions, and search servers.",
    credentialFields: [
      {
        key:          "bot_token",
        label:        "Bot Token",
        description:  "Discord bot token from the Developer Portal under Bot > Token.",
        secret:       true,
        placeholder:  "MTExxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        findGuideUrl: "https://discord.com/developers/docs/getting-started#creating-an-app",
      },
    ],
    docsUrl: "https://discord.com/developers/docs/intro",
  },

  reddit: {
    name:        "Reddit",
    slug:        "reddit",
    authType:    "oauth2",
    description: "Reddit API. Read posts, submit content, vote, search subreddits, and manage subscriptions.",
    scopes: ["read", "submit", "vote", "subscribe", "identity", "history"],
    authUrl:  "https://www.reddit.com/api/v1/authorize",
    tokenUrl: "https://www.reddit.com/api/v1/access_token",
    credentialFields: [
      {
        key:          "access_token",
        label:        "Access Token",
        description:  "Reddit OAuth2 access token obtained via the Reddit OAuth2 flow.",
        secret:       true,
        placeholder:  "eyJhbGciOiJSUzI1NiIsImtpZCI6...",
        findGuideUrl: "https://github.com/reddit-archive/reddit/wiki/OAuth2",
      },
    ],
    docsUrl: "https://www.reddit.com/dev/api/",
  },

  slack: {
    name:        "Slack",
    slug:        "slack",
    authType:    "bot_token",
    description: "Slack API. Send messages, read channels, manage reactions, list users, and search your workspace.",
    credentialFields: [
      {
        key:          "bot_token",
        label:        "Bot Token",
        description:  "Slack bot token. Must start with xoxb-. Install your Slack app to a workspace to get one.",
        secret:       true,
        placeholder:  "xoxb-00000000000-00000000000-xxxxxxxxxxxxxxxxxxxxxxxx",
        findGuideUrl: "https://api.slack.com/authentication/token-types#bot",
      },
    ],
    docsUrl: "https://api.slack.com/",
  },

  bluesky: {
    name:        "Bluesky",
    slug:        "bluesky",
    authType:    "api_key",
    description: "Bluesky social network (AT Protocol). Post, read feeds, follow accounts, and manage your profile.",
    credentialFields: [
      {
        key:          "identifier",
        label:        "Handle or Email",
        description:  "Your Bluesky handle (e.g. you.bsky.social) or account email.",
        secret:       false,
        placeholder:  "you.bsky.social",
        findGuideUrl: "https://bsky.app/settings",
      },
      {
        key:          "password",
        label:        "App Password",
        description:  "Generate an app password in Bluesky settings. Don't use your main password.",
        secret:       true,
        placeholder:  "xxxx-xxxx-xxxx-xxxx",
        findGuideUrl: "https://bsky.app/settings/app-passwords",
      },
    ],
    docsUrl: "https://docs.bsky.app/",
  },

  mastodon: {
    name:        "Mastodon",
    slug:        "mastodon",
    authType:    "api_key",
    description: "Mastodon (and compatible instances). Post, read timelines, follow accounts, and manage your presence.",
    credentialFields: [
      {
        key:          "instance_url",
        label:        "Instance URL",
        description:  "The URL of your Mastodon instance (e.g. mastodon.social).",
        secret:       false,
        placeholder:  "https://mastodon.social",
        findGuideUrl: "https://joinmastodon.org/servers",
      },
      {
        key:          "access_token",
        label:        "Access Token",
        description:  "OAuth access token from your Mastodon instance app settings.",
        secret:       true,
        placeholder:  "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        findGuideUrl: "https://docs.joinmastodon.org/client/token/",
      },
    ],
    docsUrl: "https://docs.joinmastodon.org/",
  },

  spotify: {
    name:        "Spotify",
    slug:        "spotify",
    authType:    "oauth2",
    description: "Search, playlists, library, and listening data from your Spotify account.",
    scopes: [
      "user-read-private",
      "playlist-read-private",
      "user-library-read",
      "user-top-read",
    ],
    authUrl:  "https://accounts.spotify.com/authorize",
    tokenUrl: "https://accounts.spotify.com/api/token",
    credentialFields: [
      {
        key:          "access_token",
        label:        "Spotify access token fallback",
        description:  "Use only if Spotify login is unavailable. An OAuth access token from your own Spotify developer app.",
        secret:       true,
        placeholder:  "BQ...",
        findGuideUrl: "https://developer.spotify.com/dashboard",
      },
    ],
    docsUrl: "https://developer.spotify.com/documentation/web-api",
  },

  dropbox: {
    name:        "Dropbox",
    slug:        "dropbox",
    authType:    "oauth2",
    description: "Files, folders, and account access in your Dropbox.",
    scopes: [],
    authUrl:  "https://www.dropbox.com/oauth2/authorize",
    tokenUrl: "https://api.dropboxapi.com/oauth2/token",
    extraAuthParams: { token_access_type: "offline" },
    credentialFields: [
      {
        key:          "access_token",
        label:        "Dropbox access token fallback",
        description:  "Use only if Dropbox login is unavailable. Generate one from your Dropbox app console.",
        secret:       true,
        placeholder:  "sl.B...",
        findGuideUrl: "https://www.dropbox.com/developers/apps",
      },
    ],
    docsUrl: "https://www.dropbox.com/developers/documentation/http/documentation",
  },

  "google-workspace": {
    name:        "Google Workspace",
    slug:        "google-workspace",
    authType:    "oauth2",
    description: "Gmail, Drive, and Calendar through one Google sign-in.",
    scopes: [
      "https://www.googleapis.com/auth/gmail.readonly",
      "https://www.googleapis.com/auth/gmail.send",
      "https://www.googleapis.com/auth/drive",
      "https://www.googleapis.com/auth/calendar",
    ],
    authUrl:  "https://accounts.google.com/o/oauth2/v2/auth",
    tokenUrl: "https://oauth2.googleapis.com/token",
    extraAuthParams: { access_type: "offline", prompt: "consent" },
    credentialFields: [
      {
        key:          "access_token",
        label:        "Google access token fallback",
        description:  "Use only if Google login is unavailable.",
        secret:       true,
        placeholder:  "ya29...",
        findGuideUrl: "https://console.cloud.google.com/apis/credentials",
      },
    ],
    docsUrl: "https://developers.google.com/workspace",
  },

  "microsoft-graph": {
    name:        "Microsoft 365",
    slug:        "microsoft-graph",
    authType:    "oauth2",
    description: "Outlook mail, Calendar, OneDrive, and Teams through one Microsoft sign-in.",
    scopes: [
      "offline_access",
      "User.Read",
      "Mail.Read",
      "Mail.Send",
      "Calendars.ReadWrite",
      "Files.ReadWrite",
    ],
    authUrl:  "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
    tokenUrl: "https://login.microsoftonline.com/common/oauth2/v2.0/token",
    credentialFields: [
      {
        key:          "access_token",
        label:        "Microsoft access token fallback",
        description:  "Use only if Microsoft login is unavailable.",
        secret:       true,
        placeholder:  "EwB...",
        findGuideUrl: "https://portal.azure.com/#view/Microsoft_AAD_RegisteredApps/ApplicationsListBlade",
      },
    ],
    docsUrl: "https://learn.microsoft.com/graph/overview",
  },

};
