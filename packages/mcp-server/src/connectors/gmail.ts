import type { ConnectorConfig } from "./index.js";

export const gmailConnector: ConnectorConfig = {
  name: "Gmail",
  slug: "gmail",
  authType: "oauth2",
  description: "Search, read, and send mail through a connected Gmail account.",
  scopes: [
    "https://www.googleapis.com/auth/gmail.readonly",
    "https://www.googleapis.com/auth/gmail.send",
  ],
  authUrl: "https://accounts.google.com/o/oauth2/v2/auth",
  tokenUrl: "https://oauth2.googleapis.com/token",
  credentialFields: [
    {
      key: "access_token",
      label: "Gmail access token fallback",
      description: "Use only if Gmail login is unavailable. Prefer the login flow so UnClick stores the connected account token.",
      secret: true,
      findGuideUrl: "https://console.cloud.google.com/apis/credentials",
    },
  ],
  docsUrl: "https://developers.google.com/gmail/api",
};
