import type { ConnectorConfig } from "./index.js";

export const splitwiseConnector: ConnectorConfig = {
  name: "Splitwise",
  slug: "splitwise",
  authType: "api_key",
  description: "Splitwise expense sharing. List groups and friends, fetch expenses and balances, and create new shared expenses with equal or custom splits.",
  credentialFields: [
    {
      key:         "api_key",
      label:       "API Key",
      description: "Personal API key from your Splitwise developer apps page. Register an app, then copy the generated API key.",
      secret:      true,
      placeholder: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      findGuideUrl: "https://secure.splitwise.com/apps",
    },
  ],
  docsUrl: "https://dev.splitwise.com/",
};
