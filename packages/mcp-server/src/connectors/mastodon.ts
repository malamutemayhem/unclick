import type { ConnectorConfig } from "./index.js";

export const mastodonConnector: ConnectorConfig = {
  name: "Mastodon",
  slug: "mastodon",
  authType: "api_key",
  description: "Mastodon (and compatible instances like Pleroma, Akkoma). Post, read timelines, follow accounts, and manage your presence.",
  credentialFields: [
    {
      key:         "instance_url",
      label:       "Instance URL",
      description: "The URL of your Mastodon instance (e.g. mastodon.social).",
      secret:      false,
      placeholder: "https://mastodon.social",
      findGuideUrl: "https://joinmastodon.org/servers",
    },
    {
      key:         "access_token",
      label:       "Access Token",
      description: "OAuth access token from your Mastodon instance app settings.",
      secret:      true,
      placeholder: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      findGuideUrl: "https://docs.joinmastodon.org/client/token/",
    },
  ],
  docsUrl: "https://docs.joinmastodon.org/",
};
