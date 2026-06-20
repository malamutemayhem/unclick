import type { ConnectorConfig } from "./index.js";

export const dropboxConnector: ConnectorConfig = {
  name: "Dropbox",
  slug: "dropbox",
  authType: "oauth2",
  description: "Files, folders, and account access in Dropbox.",
  scopes: ["files.metadata.read", "files.content.read", "account_info.read"],
  authUrl: "https://www.dropbox.com/oauth2/authorize",
  tokenUrl: "https://api.dropboxapi.com/oauth2/token",
  credentialFields: [
    {
      key: "access_token",
      label: "Dropbox access token fallback",
      description: "Use only if Dropbox login is unavailable. Prefer the login flow so UnClick stores the connected account token.",
      secret: true,
      findGuideUrl: "https://www.dropbox.com/developers/apps",
    },
  ],
  docsUrl: "https://www.dropbox.com/developers/documentation/http/documentation",
};
