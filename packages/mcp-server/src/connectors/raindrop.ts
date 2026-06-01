import type { ConnectorConfig } from "./index.js";

export const raindropConnector: ConnectorConfig = {
  name: "Raindrop.io",
  slug: "raindrop",
  authType: "api_key",
  description: "Raindrop.io bookmarks. Search raindrops, browse collections, and create, read, or delete bookmarks.",
  credentialFields: [
    {
      key:         "token",
      label:       "Test Token",
      description: "Test token from a Raindrop app under Settings, Integrations. Create an app and copy its test token for personal use.",
      secret:      true,
      placeholder: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
      findGuideUrl: "https://app.raindrop.io/settings/integrations",
    },
  ],
  docsUrl: "https://developer.raindrop.io/",
};
