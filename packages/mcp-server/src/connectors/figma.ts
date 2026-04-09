import type { ConnectorConfig } from "./index.js";

export const figmaConnector: ConnectorConfig = {
  name: "Figma",
  slug: "figma",
  authType: "api_key",
  description: "Figma REST API. Read file structure, export node images, manage comments, and browse team projects and published components via a Personal Access Token.",
  credentialFields: [
    {
      key:         "personal_access_token",
      label:       "Personal Access Token",
      description: "Generate a token in Figma under Account Settings → Personal access tokens. Give it read access to files and comments.",
      secret:      true,
      placeholder: "figd_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      findGuideUrl: "https://help.figma.com/hc/en-us/articles/8085703771159-Manage-personal-access-tokens",
    },
  ],
  docsUrl: "https://www.figma.com/developers/api",
};
