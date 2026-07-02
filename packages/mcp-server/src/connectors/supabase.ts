import type { ConnectorConfig } from "./index.js";

export const supabaseConnector: ConnectorConfig = {
  name: "Supabase",
  slug: "supabase",
  authType: "oauth2",
  description: "Supabase Management API access for UnClick-side project, database, auth, and service workflows.",
  scopes: ["projects:read", "organizations:read"],
  authUrl: "https://api.supabase.com/v1/oauth/authorize",
  tokenUrl: "https://api.supabase.com/v1/oauth/token",
  credentialFields: [
    {
      key: "access_token",
      label: "Supabase access token fallback",
      description: "Use only if Supabase login is unavailable. Prefer the login flow so UnClick stores the connected account token.",
      secret: true,
      placeholder: "sbp_... or OAuth access token",
      findGuideUrl: "https://supabase.com/dashboard/account/tokens",
    },
  ],
  docsUrl: "https://supabase.com/docs/reference",
};
