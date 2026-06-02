import type { ConnectorConfig } from "./index.js";

export const monicaConnector: ConnectorConfig = {
  name: "Monica",
  slug: "monica",
  authType: "api_key",
  description: "Monica personal CRM. List and search contacts, read contact details, reminders, and activities, and create contacts and notes.",
  credentialFields: [
    {
      key:         "api_key",
      label:       "API Token",
      description: "Personal access token from Monica Settings, API section. Works with the hosted app or your self-hosted instance.",
      secret:      true,
      placeholder: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      findGuideUrl: "https://app.monicahq.com/settings/api",
    },
  ],
  docsUrl: "https://www.monicahq.com/api",
};
