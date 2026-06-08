// Generates src/data/app-catalog.generated.json - the single source of truth for
// the UnClick Apps library (public app-store page + admin Apps page). It merges:
//   - docs/tool-index.generated.json  (every app + its tools, the spine)
//   - docs/connector-depth-ladder.json (per-connector quality grade L1-L5)
// into one clean, frontend-importable catalog with simple-English names, a clean
// user-facing category, a one-line description, tool count, and quality.
//
// Run:        node scripts/generate-app-catalog.mjs
// Verify CI:  node scripts/generate-app-catalog.mjs --check
//
// No em dashes in generated copy (house rule).

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const TOOL_INDEX = path.join(ROOT, "docs/tool-index.generated.json");
const LADDER = path.join(ROOT, "docs/connector-depth-ladder.json");
const OUT = path.join(ROOT, "src/data/app-catalog.generated.json");

// ─── Clean, user-facing categories (the filter chips) ──────────────────────────
// One bucket per app. Simple English, no internal jargon. Apps not listed fall
// back to "Other" and are reported so the map can be extended.
const CATEGORY_OF = {};
const bucket = (name, slugs) => slugs.forEach((s) => { CATEGORY_OF[s] = name; });

bucket("AI", ["anthropic", "openai", "cohere", "mistral", "groq", "perplexity", "togetherai", "replicate", "stability", "elevenlabs", "heygen", "higgsfield", "kling", "pika", "runway", "assemblyai", "deepl", "csuite", "colormind"]);
bucket("Developer & infra", ["github", "gitlab", "vercel", "netlify", "render", "flyio", "digitalocean", "circleci", "datadog", "sentry", "pagerduty", "neon", "turso", "upstash", "pinecone", "postman", "segment", "mixpanel", "posthog", "algolia", "keychain", "vault", "uptimerobot", "bitbucket", "cloudinary", "jsonplaceholder", "httpbin", "reqres", "zippopotamus", "ipify", "dummyjson", "ipinfo", "randomuser", "publicapis", "fakestoreapi", "domainsdb", "qrserver", "ipaddrinfo"]);
bucket("Money & payments", ["stripe", "paypal", "square", "plaid", "wise", "xero", "quickbooks", "lemonsqueezy", "splitwise", "gumroad"]);
bucket("Markets & crypto", ["alphavantage", "coingecko", "coinmarketcap", "exchangerate", "openexchangerates", "frankfurter", "exchangerate2", "coinpaprika", "exchangerate3", "coinlore"]);
bucket("Messaging & email", ["slack", "discord", "telegram", "whatsapp", "line", "twilio", "email", "resend", "sendgrid", "postmark", "mailchimp", "convertkit", "klaviyo", "pushover", "intercom", "zendesk", "brevo"]);
bucket("Social", ["reddit", "bluesky", "mastodon", "pinterest", "tiktok", "youtube", "twitch", "hackernews", "rickandmorty", "xkcd", "ghibli", "finalspace", "disneyapi", "harrypotter", "iceandfire", "digimon", "stapi", "breakingbad", "animechan", "lotr"]);
bucket("News & reading", ["newsapi", "guardian", "gdelt", "feedly", "instapaper", "readwise", "raindrop", "trove", "wikipedia", "spaceflight", "archiveorg", "metmuseum", "nobelprize", "universities", "artic"]);
bucket("Productivity", ["notion", "asana", "trello", "clickup", "monday", "linear", "jira", "hubspot", "clockify", "toggl", "calendly", "calcom", "airtable", "monica", "figma", "crews", "typeform", "jobsmith", "todoist", "pipedrive", "confluence", "miro", "shortcut", "coda", "dropbox"]);
bucket("Shopping", ["amazon", "ebay", "etsy", "shopify", "woocommerce", "makeup"]);
bucket("Music & video", ["spotify", "deezer", "lastfm", "genius", "musicbrainz", "discogs", "setlistfm", "podcastindex", "radiobrowser", "tmdb", "omdb", "jikan", "tvmaze", "lyrics"]);
bucket("Games & esports", ["steam", "rawg", "igdb", "bgg", "riot", "bungie", "chessdotcom", "lichess", "speedrun", "pandascore", "supercell", "lego", "sleeper", "fpl", "espn", "openf1", "pokeapi", "swapi", "dnd5e", "aoe2", "apifootball", "amiibo", "mcsrvstat", "freetogame", "cheapshark", "balldontlie", "mtg", "pokemontcg", "mhwdb", "opendota", "gameoflife", "acnhapi"]);
bucket("Travel, maps & local", ["mapbox", "foursquare", "yelp", "ptv", "australiapost", "sendle", "domain", "toilets", "ipapi", "restcountries", "abn", "ipaustralia", "amber", "thelott", "tab", "holidays", "brewery", "citybikes", "countryis"]);
bucket("Weather & science", ["openmeteo", "tomorrowio", "willyweather", "openaq", "nasa", "usgs", "ebird", "carboninterface", "openfoodfacts", "meal", "untappd", "cocktail", "opennotify", "sunrisesunset", "worldtime", "punkapi", "wger", "openfda", "carbonintensity", "worldbank", "solarsystem", "pubchem", "spacex", "openmeteo-marine", "fruityvice", "foodish", "wheretheiss", "openmeteo-airquality", "openmeteo-flood", "diseasesh", "fishwatch"]);
bucket("Security", ["abuseipdb", "haveibeenpwned", "shodan", "urlscan", "virustotal", "nvd", "hunter", "urlhaus"]);
bucket("Events & tickets", ["ticketmaster", "seatgeek", "eventbrite", "bandsintown"]);
bucket("Content & CMS", ["contentful", "webflow", "wordpress", "ghost"]);
bucket("Books", ["openlibrary", "bible", "openlib2", "bibleverse", "mediawiki", "jisho", "poetrydb"]);
bucket("Images", ["unsplash", "giphy", "dogceo", "picsum", "randomfox", "dogapi", "catapi", "placekitten", "shibe", "cataas", "dummyimage", "avatarapi", "robohash", "countryflag", "colr", "imgflip", "httpcat", "multiavatar", "placebear"]);
bucket("Utilities", ["calculator", "color", "datetime", "numbers", "random", "text", "trivia", "unit-converter", "dictionary", "joke", "chucknorris", "catfacts", "deckofcards", "adviceslip", "agify", "quotable", "bored", "affirmation", "tarot", "superhero", "zenquotes", "kanye", "dadjoke", "uselessfacts", "corporatebs", "yesno", "evilinsult", "lorem", "github-emoji", "excuser", "dogfacts", "emojihub", "iseven", "tacofancy", "funtranslations", "datamuse", "urbandictionary", "genderize", "nationalize", "opentriviadb", "diceware", "colornames", "officialjoke", "newton"]);
bucket("Quality (XPass)", ["testpass", "copypass", "uxpass", "seopass", "sloppass", "legalpass", "compliancepass", "flowpass", "commonsensepass", "fidelitycopy", "igniteonly", "nudgeonly", "pushonly", "qc", "geopass", "securitypass", "xpass-aggregated-verdict"]);

// ─── Display-name casing fixes (fallback is Title Case of the slug) ────────────
const NAME_OF = {
  jobsmith: "JobSmith", geopass: "GeoPass", securitypass: "SecurityPass",
  "xpass-aggregated-verdict": "XPass Verdict",
  github: "GitHub", gitlab: "GitLab", youtube: "YouTube", tiktok: "TikTok", paypal: "PayPal",
  lastfm: "Last.fm", espn: "ESPN", ebay: "eBay", ebird: "eBird", bluesky: "Bluesky",
  willyweather: "WillyWeather", riot: "Riot Games", wordpress: "WordPress", uptimerobot: "UptimeRobot",
  abn: "ABN", abuseipdb: "AbuseIPDB", alphavantage: "Alpha Vantage", australiapost: "Australia Post",
  bgg: "BoardGameGeek", calcom: "Cal.com", carboninterface: "Carbon Interface", chessdotcom: "Chess.com",
  coingecko: "CoinGecko", coinmarketcap: "CoinMarketCap", commonsensepass: "CommonSensePass",
  compliancepass: "CompliancePass", copypass: "CopyPass", csuite: "C-Suite", digitalocean: "DigitalOcean",
  fidelitycopy: "FidelityCopy", flowpass: "FlowPass", flyio: "Fly.io", fpl: "Fantasy Premier League",
  gdelt: "GDELT", hackernews: "Hacker News", haveibeenpwned: "Have I Been Pwned", hubspot: "HubSpot",
  igdb: "IGDB", igniteonly: "IgniteOnly", ipapi: "IP API", ipaustralia: "IP Australia",
  lemonsqueezy: "Lemon Squeezy", legalpass: "LegalPass", musicbrainz: "MusicBrainz", nasa: "NASA",
  newsapi: "NewsAPI", nudgeonly: "NudgeOnly", nvd: "NVD (CVEs)", omdb: "OMDb", openai: "OpenAI",
  openaq: "OpenAQ", openexchangerates: "Open Exchange Rates", openf1: "OpenF1",
  openfoodfacts: "Open Food Facts", openlibrary: "Open Library", openmeteo: "Open-Meteo",
  pandascore: "PandaScore", podcastindex: "Podcast Index", posthog: "PostHog", ptv: "PTV",
  pushonly: "PushOnly", qc: "QC", radiobrowser: "Radio Browser", restcountries: "REST Countries",
  seopass: "SEOPass", setlistfm: "Setlist.fm", sloppass: "SlopPass", testpass: "TestPass",
  thelott: "The Lott", tmdb: "TMDB", togetherai: "Together AI", tomorrowio: "Tomorrow.io",
  "unit-converter": "Unit Converter", urlscan: "urlscan.io", usgs: "USGS", uxpass: "UXPass",
  virustotal: "VirusTotal", woocommerce: "WooCommerce",
  pokeapi: "PokeAPI", cocktail: "TheCocktailDB", dictionary: "Dictionary",
  joke: "JokeAPI", holidays: "Public Holidays", dogceo: "Dog CEO",
  rickandmorty: "Rick and Morty", xkcd: "xkcd", brewery: "Open Brewery DB",
  jikan: "Jikan (MyAnimeList)", chucknorris: "Chuck Norris", catfacts: "Cat Facts",
  swapi: "Star Wars API", dnd5e: "D&D 5e SRD", deckofcards: "Deck of Cards",
  adviceslip: "Advice Slip", agify: "Name Analysis", quotable: "Quotable",
  bored: "Bored API", superhero: "Superhero DB", opennotify: "ISS Tracker",
  tarot: "Tarot Cards", aoe2: "Age of Empires II", affirmation: "Affirmations",
  jsonplaceholder: "JSONPlaceholder", picsum: "Lorem Picsum", bible: "Bible API",
  frankfurter: "Frankfurter", zenquotes: "Zen Quotes", kanye: "Kanye Quotes",
  dadjoke: "Dad Jokes", uselessfacts: "Useless Facts", randomfox: "Random Fox",
  httpbin: "httpbin", reqres: "Reqres", corporatebs: "Corporate BS Generator",
  worldtime: "World Time API", sunrisesunset: "Sunrise Sunset", zippopotamus: "Zippopotamus",
  yesno: "YesNo", evilinsult: "Evil Insult", dogapi: "The Dog API",
  apifootball: "TheSportsDB", catapi: "The Cat API", spaceflight: "Spaceflight News",
  archiveorg: "Internet Archive", ipify: "ipify", exchangerate2: "ExchangeRate-API Open",
  makeup: "Makeup API", "github-emoji": "GitHub Emojis", metmuseum: "Met Museum",
  lorem: "Bacon Ipsum", placekitten: "Placekitten",
  shibe: "Shibe Online",
  cataas: "Cat as a Service", punkapi: "Punk API", colormind: "Colormind",
  dummyjson: "DummyJSON", excuser: "Excuser", dogfacts: "Dog Facts",
  amiibo: "AmiiboAPI", dummyimage: "Dummy Image", ipinfo: "IPinfo",
  ghibli: "Studio Ghibli", finalspace: "Final Space", mcsrvstat: "MC Server Status",
  disneyapi: "Disney API", harrypotter: "Harry Potter", emojihub: "EmojiHub",
  avatarapi: "UI Avatars", robohash: "RoboHash", openlib2: "Project Gutenberg",
  countryflag: "Country Flags", mediawiki: "Wiktionary", bibleverse: "Al Quran Cloud",
  urlhaus: "URLhaus", tvmaze: "TVmaze", freetogame: "FreeToGame",
  cheapshark: "CheapShark", iseven: "isEven API", iceandfire: "Ice and Fire (GoT)",
  randomuser: "Random User", digimon: "Digimon API", stapi: "Star Trek API (STAPI)",
  breakingbad: "Breaking Bad Quotes", tacofancy: "Taco Fancy", publicapis: "Public APIs Directory",
  wger: "wger Workout DB", animechan: "AnimeChan", lotr: "Lord of the Rings API",
  coinpaprika: "Coinpaprika", openfda: "OpenFDA", funtranslations: "Fun Translations",
  datamuse: "Datamuse", balldontlie: "balldontlie (NBA)", worldbank: "World Bank",
  carbonintensity: "Carbon Intensity UK", lyrics: "Lyrics.ovh", urbandictionary: "Urban Dictionary",
  nobelprize: "Nobel Prize API", universities: "World Universities", fakestoreapi: "Fake Store API",
  mtg: "Magic: The Gathering", domainsdb: "DomainsDB", pokemontcg: "Pokemon TCG",
  spacex: "SpaceX", genderize: "Genderize", nationalize: "Nationalize",
  qrserver: "QR Server", solarsystem: "Solar System", pubchem: "PubChem",
  "openmeteo-marine": "Open-Meteo Marine", opentriviadb: "Open Trivia DB", ipaddrinfo: "IP Address Info",
  diceware: "Diceware", colornames: "Color Names", mhwdb: "Monster Hunter World DB",
  exchangerate3: "Currency API (fawazahmed0)", jisho: "Jisho", colr: "Colr",
  gameoflife: "Game of Life", fruityvice: "Fruityvice", opendota: "OpenDota",
  imgflip: "Imgflip", foodish: "Foodish", artic: "Art Institute of Chicago",
  acnhapi: "Animal Crossing NH", httpcat: "HTTP Cat", poetrydb: "PoetryDB",
  citybikes: "CityBikes", wheretheiss: "Where the ISS At", coinlore: "Coinlore",
  "openmeteo-airquality": "Open-Meteo Air Quality", officialjoke: "Official Joke API", multiavatar: "Multiavatar",
  "openmeteo-flood": "Open-Meteo Flood", diseasesh: "Disease.sh", fishwatch: "FishWatch (NOAA)",
  newton: "Newton Math", placebear: "Placebear", countryis: "Country.is",
};

// ─── Better one-line blurbs for popular apps (fallback is the app's first tool) ─
const BLURB_OF = {
  github: "Manage repos, issues, pull requests, and Actions.",
  hubspot: "Read and update CRM contacts, companies, and deals.",
  jira: "Search, read, and create issues across your projects.",
  stripe: "Look up customers, charges, invoices, and subscriptions.",
  notion: "Read and write pages and databases in your workspace.",
  slack: "Send and read messages across your channels.",
  ptv: "Live Melbourne train, tram, and bus departures and disruptions.",
  posthog: "Read product analytics, insights, and feature flags.",
  netlify: "List sites and deploys, and catch failed builds.",
  zendesk: "Search, read, and reply to support tickets.",
  openai: "Chat, embeddings, images, and transcription from OpenAI.",
  anthropic: "Chat completions from Claude models.",
  jobsmith: "Check a CV or cover letter against JobSmith's quality rules.",
  todoist: "List, create, and complete your Todoist tasks.",
  pipedrive: "Read deals, contacts, and companies in your Pipedrive CRM.",
  confluence: "Search and read Confluence pages and spaces.",
  unsplash: "Search and fetch free Unsplash photos.",
  giphy: "Search trending and random GIFs on Giphy.",
  miro: "List Miro boards and read what is on them.",
  shortcut: "Search stories, projects, and epics in Shortcut.",
  wikipedia: "Search Wikipedia and read article summaries.",
  coda: "Read your Coda docs, tables, and rows.",
  brevo: "Read Brevo contacts, email campaigns, and account.",
  uptimerobot: "Check your monitors and get alerted when one is down.",
  dropbox: "Browse, search, and read your Dropbox files.",
  bitbucket: "Browse Bitbucket repositories and pull requests.",
  cloudinary: "List your Cloudinary media and check usage.",
  wordpress: "Read posts and pages from your WordPress site.",
  ghost: "Read posts, pages, and tags from your Ghost site.",
  airtable: "Read and update records across your Airtable bases.",
  bluesky: "Post, read, search, and follow on Bluesky.",
  clickup: "Read and update ClickUp tasks, lists, and spaces.",
  clockify: "Track time and read Clockify projects and reports.",
  commonsensepass: "Sanity-gate a worker before it claims it is done.",
  compliancepass: "Check a repo for compliance readiness and gaps.",
  copypass: "Review AI-written copy for quality and clarity.",
  crews: "Run a multi-advisor Crews council on a task.",
  fidelitycopy: "Prove exact-copy work with a verified receipt.",
  flowpass: "Check a user journey end to end for gaps.",
  gdelt: "Search world news and event trends.",
  gitlab: "Manage GitLab repos, issues, and merge requests.",
  heygen: "Generate avatar videos and list voices.",
  higgsfield: "Generate images and video from prompts.",
  igniteonly: "Run IgniteOnly policy checks and receipts.",
  instapaper: "Save and read articles in Instapaper.",
  keychain: "Connect and manage your app logins and keys.",
  kling: "Generate video clips from text or images.",
  legalpass: "Spot legal issues in text with guardrails.",
  mastodon: "Post, read, and search on Mastodon.",
  monica: "Manage contacts and reminders in Monica CRM.",
  nudgeonly: "Run NudgeOnly nudge policy and receipts.",
  pika: "Generate short video clips with Pika.",
  pushonly: "Run PushOnly wake-and-push policy.",
  qc: "Run quality-control checklists and copy audits.",
  raindrop: "Save and organise bookmarks in Raindrop.",
  readwise: "Read your Readwise highlights and documents.",
  runway: "Generate video with Runway models.",
  seopass: "Check a page for search-visibility issues.",
  sloppass: "Catch AI-code slop and quality issues.",
  trello: "Manage Trello boards, lists, and cards.",
  uxpass: "Check a page's UI and UX for usability issues.",
  pokeapi: "Look up Pokemon stats, types, abilities, and generations.",
  cocktail: "Search cocktail recipes, ingredients, and categories.",
  dictionary: "Look up word definitions, phonetics, and examples.",
  joke: "Get random jokes by category from JokeAPI.",
  holidays: "Get public holidays, long weekends, and country calendars.",
  dogceo: "Get random dog images and browse breeds.",
  rickandmorty: "Search Rick and Morty characters, episodes, and locations.",
  xkcd: "Read xkcd comics - latest, by number, or random.",
  brewery: "Search and browse breweries worldwide.",
  jikan: "Search anime, manga, and characters from MyAnimeList.",
  chucknorris: "Get random Chuck Norris jokes by category.",
  catfacts: "Get random cat facts and browse cat breeds.",
  swapi: "Look up Star Wars characters, planets, and starships.",
  dnd5e: "Browse D&D 5e classes, spells, and monster stat blocks.",
  deckofcards: "Create, shuffle, and draw from virtual card decks.",
  adviceslip: "Get random advice or search advice by topic.",
  agify: "Predict age, gender, and nationality from a first name.",
  quotable: "Browse and search inspirational quotes by author or tag.",
  bored: "Get random activity suggestions when you need inspiration.",
  superhero: "Look up comic book superhero and villain stats and bios.",
  opennotify: "Track the ISS location and see who is in space right now.",
  tarot: "Draw tarot cards and look up card meanings.",
  aoe2: "Browse Age of Empires II civilizations, units, and technologies.",
  affirmation: "Get random positive affirmations for daily motivation.",
  jsonplaceholder: "Fake REST API for testing - posts, comments, and users.",
  picsum: "Random placeholder photos with custom dimensions and effects.",
  bible: "Look up Bible verses and passages, or get a random verse.",
  frankfurter: "Currency exchange rates from ECB data - convert and historical.",
  zenquotes: "Inspirational and motivational quotes of the day.",
  kanye: "Random Kanye West quotes.",
  dadjoke: "Random dad jokes - search, browse, or get a random groaner.",
  uselessfacts: "Random interesting but useless facts.",
  randomfox: "Random fox images for fun or as placeholders.",
  httpbin: "HTTP request and response testing service for developers.",
  reqres: "Realistic fake REST API for frontend testing with users and resources.",
  corporatebs: "Generate random corporate buzzword phrases.",
  worldtime: "Current time by timezone or IP address with UTC offset.",
  sunrisesunset: "Sunrise and sunset times for any GPS coordinates.",
  zippopotamus: "Look up zip and postal codes for city, state, and country.",
  yesno: "Random yes/no answers with animated GIFs for fun decisions.",
  evilinsult: "Random insults for entertainment (multi-language).",
  dogapi: "Random dog images and breed information from The Dog API.",
  apifootball: "Search teams, players, leagues, and upcoming events across all sports.",
  catapi: "Random cat images and breed information from The Cat API.",
  spaceflight: "Latest spaceflight news articles, blog posts, and reports.",
  archiveorg: "Search the Internet Archive for books, movies, audio, and software.",
  ipify: "Get your public IP address (IPv4 or IPv6).",
  exchangerate2: "Open exchange rates from ExchangeRate-API (no key needed).",
  makeup: "Search makeup products by brand, type, category, or tags.",
  "github-emoji": "Browse all GitHub emoji names and image URLs.",
  metmuseum: "Search the Met Museum collection and get artwork details.",
  lorem: "Generate meat-themed lorem ipsum placeholder text.",
  placekitten: "Generate placeholder image URLs with custom dimensions.",
  shibe: "Random Shiba Inu, cat, or bird images.",
  cataas: "Random cat images with optional text overlay and tags.",
  punkapi: "Browse and search BrewDog craft beer recipes.",
  colormind: "Generate AI-powered 5-color palettes for design.",
  dummyjson: "Fake products, quotes, and users for testing and prototyping.",
  excuser: "Get random excuses by category for fun or testing.",
  dogfacts: "Random dog facts and trivia.",
  amiibo: "Search Nintendo Amiibo figures by name, series, or type.",
  dummyimage: "Generate placeholder image URLs with custom size, colors, and text.",
  ipinfo: "IP geolocation, ISP, and organization info for any IP address.",
  ghibli: "Browse Studio Ghibli films and characters.",
  finalspace: "Browse Final Space characters and episodes.",
  mcsrvstat: "Check Minecraft server status, player count, and MOTD.",
  disneyapi: "Search and browse Disney characters.",
  harrypotter: "Harry Potter characters, students, staff, and houses.",
  emojihub: "Browse emojis by category with HTML and Unicode codes.",
  avatarapi: "Generate text-based avatar images from initials.",
  robohash: "Generate unique robot, monster, or cat avatars from any text.",
  openlib2: "Search and read free ebooks from Project Gutenberg.",
  countryflag: "Get country flag images by ISO code.",
  mediawiki: "Look up word definitions in Wiktionary (multi-language).",
  bibleverse: "Read Quran verses and surahs with English translation.",
  urlhaus: "Check URLs against the URLhaus malware database.",
  tvmaze: "Search TV shows, get details, and browse schedules.",
  freetogame: "Browse and search free-to-play games across platforms.",
  cheapshark: "Compare game deals across Steam, GOG, and other stores.",
  iseven: "Check whether a number is even (the novelty API).",
  iceandfire: "Browse characters, houses, and books from Game of Thrones.",
  randomuser: "Generate realistic random user profiles with photos and addresses.",
  digimon: "Browse Digimon by name or evolution level.",
  stapi: "Search Star Trek characters, species, and starships.",
  breakingbad: "Get random Breaking Bad quotes.",
  tacofancy: "Generate random taco recipes with layers and seasonings.",
  publicapis: "Search and browse the directory of free public APIs.",
  wger: "Browse exercises, muscle groups, and workout categories.",
  animechan: "Get random anime quotes or search by anime title.",
  lotr: "Browse Lord of the Rings books, characters, and movie quotes.",
  coinpaprika: "Cryptocurrency market data, coin info, and live tickers.",
  openfda: "Search FDA drug labels, recalls, and adverse event reports.",
  funtranslations: "Translate text into Yoda, Pirate, Shakespeare, and more.",
  datamuse: "Find words by meaning, rhyme, sound, or spelling pattern.",
  balldontlie: "NBA player stats, team info, and game scores.",
  worldbank: "Country profiles and economic indicators from the World Bank.",
  carbonintensity: "UK national grid carbon intensity - current, forecast, and generation mix.",
  lyrics: "Look up song lyrics by artist and title.",
  urbandictionary: "Look up slang definitions or browse trending words.",
  nobelprize: "Search Nobel Prize winners, categories, and award history.",
  universities: "Search universities worldwide by name or country.",
  fakestoreapi: "Fake e-commerce products and categories for testing and prototyping.",
  mtg: "Search Magic: The Gathering cards, sets, and types.",
  domainsdb: "Search registered domain names and browse TLDs.",
  pokemontcg: "Search Pokemon Trading Card Game cards and sets.",
  spacex: "SpaceX launches, rockets, and mission data.",
  genderize: "Predict gender from a first name with probability score.",
  nationalize: "Predict likely nationalities from a first name.",
  qrserver: "Generate QR code image URLs for any text or URL.",
  solarsystem: "Browse planets, moons, asteroids, and comets in the solar system.",
  pubchem: "Search chemical compounds and molecular properties from PubChem.",
  "openmeteo-marine": "Ocean wave height, swell, and marine weather forecast.",
  opentriviadb: "Trivia questions by category, difficulty, and type from Open Trivia DB.",
  ipaddrinfo: "IP address geolocation, ISP, and timezone lookup via ipwho.is.",
  diceware: "Generate secure random passphrases from a word list.",
  colornames: "Find the closest named color for any hex code.",
  mhwdb: "Browse Monster Hunter World monsters, weapons, and armor.",
  exchangerate3: "Free currency exchange rates from fawazahmed0 currency API via jsDelivr CDN.",
  jisho: "Search the Jisho.org Japanese-English dictionary for words and kanji.",
  colr: "Get random color palettes from colr.org.",
  gameoflife: "Run Conway's Game of Life simulation locally with customizable grids.",
  fruityvice: "Look up fruit nutrition facts including calories, sugar, and protein.",
  opendota: "Dota 2 hero stats, win rates, and pro match results from OpenDota.",
  artic: "Search and explore artworks from the Art Institute of Chicago collection.",
  imgflip: "Browse the top 100 popular meme templates from Imgflip.",
  foodish: "Random food images by category (pizza, burger, pasta, and more).",
  acnhapi: "Animal Crossing: New Horizons villagers, fish, and bugs data.",
  httpcat: "Get a cat image for any HTTP status code from http.cat.",
  poetrydb: "Search poems by author or title, or get random poems from PoetryDB.",
  citybikes: "Browse bike-sharing networks and station availability worldwide.",
  wheretheiss: "Track the International Space Station position in real time.",
  coinlore: "Cryptocurrency market overview, tickers, and coin details from Coinlore.",
  "openmeteo-airquality": "Current and forecast air quality index and pollutant levels.",
  officialjoke: "Random jokes by type (general, programming, knock-knock).",
  multiavatar: "Generate unique deterministic avatar images from any string.",
  "openmeteo-flood": "River discharge flood forecast from Open-Meteo.",
  diseasesh: "Global and per-country COVID-19 statistics and vaccine data.",
  fishwatch: "NOAA FishWatch species data with sustainability and nutrition info.",
  newton: "Simplify, derive, integrate, and factor math expressions via Newton API.",
  placebear: "Bear placeholder image URLs at custom dimensions.",
  countryis: "Detect country from an IP address using country.is.",
};

// Keep every blurb a short, single-line sentence (the safety net for any new
// connector whose first tool description is a long enumeration).
function capBlurb(text) {
  const t = String(text).replace(/\s+/g, " ").trim();
  if (t.length <= 120) return t;
  const firstSentence = t.split(/(?<=[.!?])\s/)[0];
  if (firstSentence.length <= 120) return firstSentence;
  const cut = t.slice(0, 117);
  return cut.slice(0, cut.lastIndexOf(" ")).replace(/[,:;]+$/, "").trim() + ".";
}

// Brand domains for the favicon icon. Known brands show a real favicon (framed
// consistently); unknown apps fall back to the tinted letter chip at render time.
const DOMAIN_OF = {
  github: "github.com", gitlab: "gitlab.com", vercel: "vercel.com", netlify: "netlify.com",
  render: "render.com", flyio: "fly.io", digitalocean: "digitalocean.com", circleci: "circleci.com",
  datadog: "datadoghq.com", sentry: "sentry.io", pagerduty: "pagerduty.com", neon: "neon.tech",
  turso: "turso.tech", upstash: "upstash.com", pinecone: "pinecone.io", postman: "postman.com",
  segment: "segment.com", mixpanel: "mixpanel.com", posthog: "posthog.com", algolia: "algolia.com",
  stripe: "stripe.com", paypal: "paypal.com", square: "squareup.com", plaid: "plaid.com",
  wise: "wise.com", xero: "xero.com", quickbooks: "quickbooks.intuit.com", lemonsqueezy: "lemonsqueezy.com",
  splitwise: "splitwise.com", gumroad: "gumroad.com", coingecko: "coingecko.com", coinmarketcap: "coinmarketcap.com",
  slack: "slack.com", discord: "discord.com", telegram: "telegram.org", whatsapp: "whatsapp.com",
  line: "line.me", twilio: "twilio.com", resend: "resend.com", sendgrid: "sendgrid.com",
  postmark: "postmarkapp.com", mailchimp: "mailchimp.com", convertkit: "convertkit.com", klaviyo: "klaviyo.com",
  pushover: "pushover.net", intercom: "intercom.com", zendesk: "zendesk.com", reddit: "reddit.com",
  bluesky: "bsky.app", mastodon: "joinmastodon.org", pinterest: "pinterest.com", tiktok: "tiktok.com",
  youtube: "youtube.com", twitch: "twitch.tv", hackernews: "ycombinator.com", notion: "notion.so",
  asana: "asana.com", trello: "trello.com", clickup: "clickup.com", monday: "monday.com",
  linear: "linear.app", jira: "atlassian.com", hubspot: "hubspot.com", clockify: "clockify.me",
  toggl: "toggl.com", calendly: "calendly.com", calcom: "cal.com", airtable: "airtable.com",
  figma: "figma.com", typeform: "typeform.com", amazon: "amazon.com", ebay: "ebay.com",
  etsy: "etsy.com", shopify: "shopify.com", woocommerce: "woocommerce.com", spotify: "spotify.com",
  deezer: "deezer.com", lastfm: "last.fm", genius: "genius.com", discogs: "discogs.com",
  tmdb: "themoviedb.org", steam: "steampowered.com", igdb: "igdb.com", riot: "riotgames.com",
  lichess: "lichess.org", lego: "lego.com", mapbox: "mapbox.com", foursquare: "foursquare.com",
  yelp: "yelp.com", ptv: "ptv.vic.gov.au", openai: "openai.com", anthropic: "anthropic.com",
  cohere: "cohere.com", mistral: "mistral.ai", groq: "groq.com", perplexity: "perplexity.ai",
  replicate: "replicate.com", elevenlabs: "elevenlabs.io", heygen: "heygen.com", runway: "runwayml.com",
  deepl: "deepl.com", nasa: "nasa.gov", contentful: "contentful.com", webflow: "webflow.com",
  ticketmaster: "ticketmaster.com", eventbrite: "eventbrite.com", supabase: "supabase.com",
  shodan: "shodan.io", virustotal: "virustotal.com", openmeteo: "open-meteo.com", tomorrowio: "tomorrow.io",
  guardian: "theguardian.com", monica: "monicahq.com", readwise: "readwise.io", raindrop: "raindrop.io",
  instapaper: "instapaper.com", feedly: "feedly.com",
  todoist: "todoist.com", pipedrive: "pipedrive.com", confluence: "atlassian.com",
  unsplash: "unsplash.com", giphy: "giphy.com", miro: "miro.com", shortcut: "shortcut.com",
  wikipedia: "wikipedia.org",
  coda: "coda.io", brevo: "brevo.com", uptimerobot: "uptimerobot.com", dropbox: "dropbox.com",
  bitbucket: "bitbucket.org", cloudinary: "cloudinary.com", wordpress: "wordpress.org", ghost: "ghost.org",
  pokeapi: "pokeapi.co", cocktail: "thecocktaildb.com", dictionary: "dictionaryapi.dev",
  joke: "jokeapi.dev", holidays: "date.nager.at", dogceo: "dog.ceo",
  rickandmorty: "rickandmortyapi.com", xkcd: "xkcd.com", brewery: "openbrewerydb.org",
  jikan: "jikan.moe", chucknorris: "api.chucknorris.io", catfacts: "catfact.ninja",
  swapi: "swapi.dev", dnd5e: "dnd5eapi.co", deckofcards: "deckofcardsapi.com",
  adviceslip: "api.adviceslip.com", agify: "agify.io", quotable: "quotable.io",
  bored: "bored-api.appbrewery.com", superhero: "akabab.github.io",
  opennotify: "open-notify.org", tarot: "tarotapi.dev",
  aoe2: "age-of-empires-2-api.herokuapp.com", affirmation: "affirmations.dev",
  jsonplaceholder: "jsonplaceholder.typicode.com", picsum: "picsum.photos",
  bible: "bible-api.com", frankfurter: "frankfurter.app",
  zenquotes: "zenquotes.io", kanye: "api.kanye.rest",
  dadjoke: "icanhazdadjoke.com", uselessfacts: "uselessfacts.jsph.pl",
  randomfox: "randomfox.ca", httpbin: "httpbin.org",
  reqres: "reqres.in", corporatebs: "corporatebs-generator.sameerkumar.website",
  worldtime: "worldtimeapi.org", sunrisesunset: "sunrise-sunset.org",
  zippopotamus: "zippopotam.us", yesno: "yesno.wtf",
  evilinsult: "evilinsult.com", dogapi: "thedogapi.com",
  apifootball: "thesportsdb.com", catapi: "thecatapi.com",
  spaceflight: "spaceflightnewsapi.net", archiveorg: "archive.org",
  ipify: "ipify.org", exchangerate2: "open.er-api.com",
  makeup: "makeup-api.herokuapp.com", "github-emoji": "github.com",
  metmuseum: "metmuseum.github.io", lorem: "baconipsum.com",
  placekitten: "placekitten.com",
  shibe: "shibe.online", cataas: "cataas.com",
  punkapi: "punkapi.com", colormind: "colormind.io",
  dummyjson: "dummyjson.com", excuser: "excuser-three.vercel.app",
  dogfacts: "dogapi.dog", amiibo: "amiiboapi.com",
  dummyimage: "dummyimage.com", ipinfo: "ipinfo.io",
  ghibli: "ghibliapi.vercel.app", finalspace: "finalspaceapi.com",
  mcsrvstat: "mcsrvstat.us", disneyapi: "disneyapi.dev",
  harrypotter: "hp-api.onrender.com", emojihub: "emojihub.yurace.pro",
  avatarapi: "ui-avatars.com", robohash: "robohash.org",
  openlib2: "gutendex.com", countryflag: "flagcdn.com",
  mediawiki: "wiktionary.org", bibleverse: "alquran.cloud",
  urlhaus: "urlhaus.abuse.ch", tvmaze: "tvmaze.com",
  freetogame: "freetogame.com", cheapshark: "cheapshark.com",
  iseven: "isevenapi.xyz", iceandfire: "anapioficeandfire.com",
  randomuser: "randomuser.me", digimon: "digimon-api.vercel.app",
  stapi: "stapi.co", breakingbad: "breakingbadquotes.xyz",
  tacofancy: "taco-randomizer.herokuapp.com", publicapis: "api.publicapis.org",
  wger: "wger.de", animechan: "animechan.io", lotr: "the-one-api.dev",
  coinpaprika: "coinpaprika.com", openfda: "api.fda.gov", funtranslations: "funtranslations.com",
  datamuse: "datamuse.com", balldontlie: "balldontlie.io", worldbank: "worldbank.org",
  carbonintensity: "carbonintensity.org.uk", lyrics: "lyrics.ovh", urbandictionary: "urbandictionary.com",
  nobelprize: "nobelprize.org", universities: "universities.hipolabs.com", fakestoreapi: "fakestoreapi.com",
  mtg: "magicthegathering.io", domainsdb: "domainsdb.info", pokemontcg: "pokemontcg.io",
  spacex: "spacex.com", genderize: "genderize.io", nationalize: "nationalize.io",
  qrserver: "goqr.me", solarsystem: "le-systeme-solaire.net", pubchem: "pubchem.ncbi.nlm.nih.gov",
  "openmeteo-marine": "open-meteo.com", opentriviadb: "opentdb.com", ipaddrinfo: "ipwho.is",
  colornames: "color.pizza", mhwdb: "mhw-db.com",
  exchangerate3: "cdn.jsdelivr.net", jisho: "jisho.org", colr: "colr.org",
  gameoflife: "local", fruityvice: "fruityvice.com", opendota: "opendota.com",
  artic: "artic.edu", imgflip: "imgflip.com", foodish: "foodish-api.com",
  acnhapi: "acnhapi.com", httpcat: "http.cat", poetrydb: "poetrydb.org",
  citybikes: "citybik.es", wheretheiss: "wheretheiss.at", coinlore: "coinlore.net",
  "openmeteo-airquality": "open-meteo.com", officialjoke: "official-joke-api.appspot.com", multiavatar: "multiavatar.com",
  "openmeteo-flood": "open-meteo.com", diseasesh: "disease.sh", fishwatch: "fishwatch.gov",
  newton: "newton.now.sh", placebear: "placebear.com", countryis: "country.is",
};

function titleCase(slug) {
  return slug.split(/[-_]/).map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

function build() {
  const toolIndex = Object.values(JSON.parse(fs.readFileSync(TOOL_INDEX, "utf8")));
  const ladder = JSON.parse(fs.readFileSync(LADDER, "utf8"));
  const levelOf = new Map(ladder.map((r) => [r.connector, { level: r.level, hardened: r.hardened }]));

  const uncategorized = [];
  const apps = toolIndex
    .map((entry) => {
      const slug = entry.app;
      const tools = Array.isArray(entry.tools) ? entry.tools : [];
      const category = CATEGORY_OF[slug] ?? "Other";
      if (category === "Other") uncategorized.push(slug);
      const grade = levelOf.get(slug) ?? null;
      return {
        slug,
        name: NAME_OF[slug] ?? titleCase(slug),
        category,
        blurb: BLURB_OF[slug] ?? capBlurb(tools[0]?.description ?? `${NAME_OF[slug] ?? titleCase(slug)} tools.`),
        domain: DOMAIN_OF[slug] ?? null,
        toolCount: tools.length,
        tools: tools.map((t) => ({ name: t.name, description: t.description })),
        level: grade?.level ?? null,
        hardened: grade?.hardened ?? false,
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  const categories = [...new Set(apps.map((a) => a.category))].sort();
  return {
    generatedAt: "static", // kept stable so --check is deterministic
    appCount: apps.length,
    toolCount: apps.reduce((n, a) => n + a.toolCount, 0),
    categories,
    apps,
    _uncategorized: uncategorized,
  };
}

const catalog = build();
const json = JSON.stringify({ ...catalog, _uncategorized: undefined }, null, 2) + "\n";

if (process.argv.includes("--check")) {
  const current = fs.existsSync(OUT) ? fs.readFileSync(OUT, "utf8") : "";
  if (current !== json) {
    console.error("app catalog is stale. Run: node scripts/generate-app-catalog.mjs");
    process.exit(1);
  }
  console.log(`app catalog up to date (${catalog.appCount} apps, ${catalog.toolCount} tools, ${catalog.categories.length} categories).`);
} else {
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, json);
  console.log(`Wrote ${path.relative(ROOT, OUT)} (${catalog.appCount} apps, ${catalog.toolCount} tools, ${catalog.categories.length} categories).`);
  if (catalog._uncategorized.length) {
    console.log(`Uncategorized (fall back to "Other"): ${catalog._uncategorized.join(", ")}`);
  }
}
