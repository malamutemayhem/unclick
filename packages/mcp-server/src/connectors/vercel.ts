import type { ConnectorConfig } from "./index.js";

export const vercelConnector: ConnectorConfig = {
  name: "Vercel",
  slug: "vercel",
  authType: "oauth2",
  description: "Vercel account access for UnClick deployment, project, domain, and environment actions.",
  scopes: [
    "openid",
    "email",
    "profile",
    "offline_access",
  ],
  authUrl: "https://vercel.com/oauth/authorize",
  tokenUrl: "https://api.vercel.com/login/oauth/token",
  credentialFields: [
    {
      key: "api_key",
      label: "Vercel token fallback",
      description: "Use only if Vercel login is unavailable. Token is used by UnClick's Vercel actions.",
      secret: true,
      placeholder: "vcp_...",
      findGuideUrl: "https://vercel.com/account/tokens",
    },
  ],
  docsUrl: "https://vercel.com/docs/rest-api",
};
