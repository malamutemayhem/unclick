import type { ConnectorConfig } from "./index.js";

export const notionConnector: ConnectorConfig = {
  name: "Notion",
  slug: "notion",
  authType: "api_key",
  description: "Notion workspace. Search pages and databases, read and query databases, and create or update pages via an internal integration.",
  credentialFields: [
    {
      key:         "api_key",
      label:       "Internal Integration Secret",
      description: "Internal integration secret from your Notion integrations page. Share the target pages or databases with the integration.",
      secret:      true,
      placeholder: "ntn_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      findGuideUrl: "https://www.notion.so/my-integrations",
    },
  ],
  docsUrl: "https://developers.notion.com/",
};
