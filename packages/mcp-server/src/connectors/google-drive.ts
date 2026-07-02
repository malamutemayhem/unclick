import type { ConnectorConfig } from "./index.js";

export const googleDriveConnector: ConnectorConfig = {
  name: "Google Drive",
  slug: "google-drive",
  authType: "oauth2",
  description: "Browse, search, and read files through a connected Google Drive account.",
  scopes: ["https://www.googleapis.com/auth/drive.readonly"],
  authUrl: "https://accounts.google.com/o/oauth2/v2/auth",
  tokenUrl: "https://oauth2.googleapis.com/token",
  credentialFields: [
    {
      key: "access_token",
      label: "Google Drive access token fallback",
      description: "Use only if Google Drive login is unavailable. Prefer the login flow so UnClick stores the connected account token.",
      secret: true,
      findGuideUrl: "https://console.cloud.google.com/apis/credentials",
    },
  ],
  docsUrl: "https://developers.google.com/drive/api",
};
