import type { ConnectorConfig } from "./index.js";

export const onedriveConnector: ConnectorConfig = {
  name: "OneDrive",
  slug: "onedrive",
  authType: "oauth2",
  description: "Browse, search, and read files through a connected OneDrive account.",
  scopes: [
    "offline_access",
    "User.Read",
    "Files.Read",
  ],
  authUrl: "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
  tokenUrl: "https://login.microsoftonline.com/common/oauth2/v2.0/token",
  credentialFields: [
    {
      key: "access_token",
      label: "OneDrive access token fallback",
      description: "Use only if OneDrive login is unavailable. Prefer the login flow so UnClick stores the connected account token.",
      secret: true,
      findGuideUrl: "https://portal.azure.com/#view/Microsoft_AAD_RegisteredApps/ApplicationsListBlade",
    },
  ],
  docsUrl: "https://learn.microsoft.com/graph/onedrive-concept-overview",
};
