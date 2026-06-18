import type { ConnectorConfig } from "./index.js";

export const higgsFieldConnector: ConnectorConfig = {
  name: "Higgsfield",
  slug: "higgsfield",
  authType: "oauth2",
  description: "Create images, video, characters, and campaign assets with Higgsfield AI.",
  scopes: ["openid", "email", "offline_access"],
  authUrl: "https://mcp.higgsfield.ai/oauth2/authorize",
  tokenUrl: "https://mcp.higgsfield.ai/oauth2/token",
  credentialFields: [
    {
      key: "access_token",
      label: "Access Token",
      description: "OAuth2 bearer token from Higgsfield sign-in, or a Higgsfield Cloud API key.",
      secret: true,
      placeholder: "eyJhbG...",
      findGuideUrl: "https://cloud.higgsfield.ai/api-keys",
    },
  ],
  docsUrl: "https://higgsfield.ai/mcp",
};
