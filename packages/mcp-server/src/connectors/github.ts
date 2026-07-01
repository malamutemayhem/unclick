import type { ConnectorConfig } from "./index.js";

export const githubConnector: ConnectorConfig = {
  name: "GitHub",
  slug: "github",
  authType: "oauth2",
  description: "GitHub repositories, pull requests, issues, and workflow checks.",
  scopes: ["repo", "workflow", "read:user", "user:email"],
  authUrl: "https://github.com/login/oauth/authorize",
  tokenUrl: "https://github.com/login/oauth/access_token",
  credentialFields: [
    {
      key: "api_key",
      label: "GitHub token fallback",
      description: "Use only if GitHub login is unavailable. Token must include the repo and workflow access UnClick needs.",
      secret: true,
      placeholder: "ghp_... or github_pat_...",
      findGuideUrl: "https://github.com/settings/tokens",
    },
  ],
  docsUrl: "https://docs.github.com/rest",
};
