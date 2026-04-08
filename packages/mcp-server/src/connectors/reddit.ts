import type { ConnectorConfig } from "./index.js";

export const redditConnector: ConnectorConfig = {
  name: "Reddit",
  slug: "reddit",
  authType: "oauth2",
  description: "Reddit API. Read posts and comments, submit content, vote, search subreddits, and manage subscriptions.",
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
      description: "Reddit OAuth2 access token. Obtain via Reddit's OAuth2 flow with your app credentials.",
      secret:      true,
      placeholder: "eyJhbGciOiJSUzI1NiIsImtpZCI6IlNIQTI1NjpzS3dsMnlsV0VtMjVmcXhwTU40cVY4NE5YeVpmbGhFRXh1ZnBValZhNW8iLCJ0eXAiOiJKV1QifQ...",
      findGuideUrl: "https://github.com/reddit-archive/reddit/wiki/OAuth2",
    },
  ],
  docsUrl: "https://www.reddit.com/dev/api/",
};
