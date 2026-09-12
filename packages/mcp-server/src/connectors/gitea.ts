import type { ConnectorConfig } from "./index.js";

export const giteaConnector: ConnectorConfig = {
  name: "Gitea",
  slug: "gitea",
  authType: "api_key",
  description: "Self-hosted Gitea forge access for approved UnClick maintenance work.",
  credentialFields: [
    {
      key: "base_url",
      label: "Forge base URL",
      description: "The Gitea forge URL without a trailing slash.",
      secret: false,
      placeholder: "https://git.example.com",
    },
    {
      key: "access_token",
      label: "Access token",
      description: "A Gitea token with the repository scopes required for the assigned work.",
      secret: true,
      placeholder: "Gitea personal access token",
    },
  ],
  docsUrl: "https://docs.gitea.com/development/api-usage",
};
