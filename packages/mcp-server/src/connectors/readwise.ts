import type { ConnectorConfig } from "./index.js";

export const readwiseConnector: ConnectorConfig = {
  name: "Readwise",
  slug: "readwise",
  authType: "api_key",
  description: "Readwise highlights. List highlights and books, fetch the daily review, search highlights, and create new highlights.",
  credentialFields: [
    {
      key:         "token",
      label:       "Access Token",
      description: "Personal access token from the Readwise access token page while signed in.",
      secret:      true,
      placeholder: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      findGuideUrl: "https://readwise.io/access_token",
    },
  ],
  docsUrl: "https://readwise.io/api_deets",
};
