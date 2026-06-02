import type { ConnectorConfig } from "./index.js";

export const feedlyConnector: ConnectorConfig = {
  name: "Feedly",
  slug: "feedly",
  authType: "api_key",
  description: "Feedly news reader. List subscriptions and categories, read stream contents, search feeds, and mark entries as read.",
  credentialFields: [
    {
      key:         "access_token",
      label:       "Access Token",
      description: "Feedly developer access token. Generate one from the Feedly developer access page while signed in.",
      secret:      true,
      placeholder: "A0xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      findGuideUrl: "https://feedly.com/v3/auth/dev",
    },
  ],
  docsUrl: "https://developer.feedly.com/",
};
