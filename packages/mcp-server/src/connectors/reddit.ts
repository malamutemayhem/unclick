import type { ConnectorConfig } from "./index.js";

export const redditConnector: ConnectorConfig = {
  name: "Reddit",
  slug: "reddit",
  authType: "oauth2",
  description: "Reddit API. Read public posts, threads, comments, users, and search without OAuth; submit content, vote, and manage subscriptions with OAuth.",
  scopes: [
    "read",
    "submit",
    "vote",
    "subscribe",
    "identity",
    "history",
  ],
  authUrl:  "https://www.reddit.com/api/v1/authorize",
  tokenUrl: "https://www.reddit.com/api/v1/access_token",
  credentialFields: [
    {
      key:         "access_token",
      label:       "Access Token",
      description: "Optional for public read-only tools. Required for posting, commenting, voting, subscribing, or private Reddit OAuth access.",
      secret:      true,
      placeholder: "eyJhbGciOiJSUzI1NiIsImtpZCI6IlNIQTI1NjpzS3dsMnlsV0VtMjVmcXhwTU40cVY4NE5YeVpmbGhFRXh1ZnBValZhNW8iLCJ0eXAiOiJKV1QifQ...",
      findGuideUrl: "https://github.com/reddit-archive/reddit/wiki/OAuth2",
    },
  ],
  docsUrl: "https://www.reddit.com/dev/api/",
};
