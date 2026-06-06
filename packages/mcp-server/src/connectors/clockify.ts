import type { ConnectorConfig } from "./index.js";

export const clockifyConnector: ConnectorConfig = {
  name: "Clockify",
  slug: "clockify",
  authType: "api_key",
  description: "Clockify time tracking. List workspaces and projects, read and create time entries, and pull summary reports.",
  credentialFields: [
    {
      key:         "api_key",
      label:       "API Key",
      description: "Your Clockify API key from Profile Settings. Scroll to the API section and generate a key.",
      secret:      true,
      placeholder: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      findGuideUrl: "https://app.clockify.me/user/settings",
    },
  ],
  docsUrl: "https://docs.clockify.me/",
};
