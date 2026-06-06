import type { ConnectorConfig } from "./index.js";

// Instapaper uses xAuth (OAuth 1.0a). consumer_key, consumer_secret, and
// username are required; password is passed as a runtime arg and may be empty
// for passwordless accounts, so it is not a required credential field here.
export const instapaperConnector: ConnectorConfig = {
  name: "Instapaper",
  slug: "instapaper",
  authType: "api_key",
  description: "Instapaper read-later. List, add, archive, and delete bookmarks and list folders. Uses xAuth with a consumer key/secret plus your account username (and password, if set).",
  credentialFields: [
    {
      key:         "consumer_key",
      label:       "Consumer Key",
      description: "OAuth consumer key issued for your Instapaper API application.",
      secret:      true,
      placeholder: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      findGuideUrl: "https://www.instapaper.com/main/request_oauth_consumer_token",
    },
    {
      key:         "consumer_secret",
      label:       "Consumer Secret",
      description: "OAuth consumer secret paired with your Instapaper consumer key.",
      secret:      true,
      placeholder: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    },
    {
      key:         "username",
      label:       "Username",
      description: "Your Instapaper account email or username. Pass your password as a runtime argument when the account has one.",
      secret:      false,
      placeholder: "you@example.com",
    },
  ],
  docsUrl: "https://www.instapaper.com/api",
};
