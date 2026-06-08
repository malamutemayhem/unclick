// tool-wiring.ts
// Auto-generated wiring for all tool files.
// Exports ADDITIONAL_TOOLS and ADDITIONAL_HANDLERS to be merged into server.ts.

// ─── Gaming ───────────────────────────────────────────────────────────────────
import {
  rawgSearchGames, rawgGetGame, rawgGetGameScreenshots,
  rawgListGenres, rawgListPlatforms, rawgUpcomingGames,
} from "./rawg-tool.js";

import {
  riotSummoner, riotRanked, riotMatchHistory,
  riotGetMatch, riotValorantAccount,
} from "./riot-tool.js";

import {
  bungieSearchPlayer, bungieGetProfile,
  bungieGetManifest, bungieSearchEntities,
} from "./bungie-tool.js";

import {
  cocPlayer, cocClan, cocClanMembers,
  crPlayer, crTopPlayers,
  bsPlayer, bsClub,
} from "./supercell-tool.js";

import {
  legoSearchSets, legoGetSet, legoSetParts,
  legoSearchParts, legoThemes,
  bricksetSearch, bricksetGetSet,
} from "./lego-tool.js";

import {
  untappdSearchBeer, untappdGetBeer, untappdGetBrewery,
  untappdSearchBrewery, untappdBeerActivities,
} from "./untappd-tool.js";

import {
  esportsMatches, esportsTournaments, esportsTeams,
  esportsPlayers, esportsGetMatch,
} from "./pandascore-tool.js";

import {
  bggSearch, bggGameDetails, bggUserCollection,
  bggTopGames, bggGameReviews,
} from "./bgg-tool.js";

import {
  gdeltNewsSearch, gdeltToneAnalysis, gdeltGeoEvents, gdeltTrending,
} from "./gdelt-tool.js";

// ─── Australian / Local ───────────────────────────────────────────────────────
import {
  getAmberSites, getAmberCurrentPrice, getAmberForecast,
} from "./amber-tool.js";

import {
  getWillyweatherForecast, getWillyweatherSurf, getWillyweatherTide,
} from "./willyweather-tool.js";

import {
  searchDomainListings, getDomainProperty, getDomainSuburbStats,
} from "./domain-tool.js";

import {
  searchTrove, getTroveWork, getTroveNewspaperArticle,
} from "./trove-tool.js";

import {
  trackAuspostParcel, getAuspostPostcode, getAuspostDeliveryTimes,
} from "./australiapost-tool.js";

import {
  getSendleQuote, createSendleOrder, trackSendleParcel,
} from "./sendle-tool.js";

import {
  searchTrademarks, getTrademarkDetails, searchPatents,
} from "./ipaustralia-tool.js";

import {
  getTabMeetings, getTabRace, getTabSportsMarkets,
} from "./tab-tool.js";

import {
  getLottResults, getLottJackpots,
} from "./thelott-tool.js";

import { abnLookup, abnSearch } from "./abn-tool.js";

import {
  ptvSearch, ptvDepartures, ptvDisruptions,
  ptvStopsOnRoute, ptvRouteDirections,
} from "./ptv-tool.js";

// ─── Security ─────────────────────────────────────────────────────────────────
import {
  getCveDetail, searchCve, getRecentCves,
} from "./nvd-tool.js";

import { findEmail, verifyEmail, getDomainInfo } from "./hunter-tool.js";

import {
  checkAccountBreaches, getAllBreaches, checkPassword,
} from "./haveibeenpwned-tool.js";

import {
  scanUrlVirustotal, getUrlReport,
  scanIpVirustotal, scanDomainVirustotal,
} from "./virustotal-tool.js";

import {
  checkIpAbuse, reportIpAbuse, getBlacklistAbuseipdb,
} from "./abuseipdb-tool.js";

import {
  scanUrlUrlscan, getScanResult, searchUrlscan,
} from "./urlscan-tool.js";

import {
  searchShodan, getHostInfo, getShodanStats,
} from "./shodan-tool.js";

// ─── Dev / Infra ──────────────────────────────────────────────────────────────
import {
  sendEmailResend, getEmailResend, listDomainsResend,
} from "./resend-tool.js";

import {
  listVercelDeployments, getVercelDeployment,
  listVercelProjects, getVercelDomain, getVercelEnv,
  createVercelEnv, deleteVercelEnv, createVercelDeployment,
} from "./vercel-tool.js";

import {
  getTogglTimeEntries, createTimeEntryToggl,
  getTogglProjects, getTogglSummary,
} from "./toggl-tool.js";

// ─── Email ────────────────────────────────────────────────────────────────────
import {
  sendEmail, readInbox, searchEmail,
  getEmail, markRead, deleteEmail, emailAction,
} from "./email-tool.js";

// ─── Environment / Science ────────────────────────────────────────────────────
import {
  getRecentEarthquakes, getEarthquakeDetail,
  getEarthquakesByRegion, usgsAction,
} from "./usgs-tool.js";

import {
  getAirQuality, getAirMeasurements,
  getAqCountries, openaqAction,
} from "./openaq-tool.js";

import {
  searchFoodProducts, getFoodProduct,
  getFoodByCategory, openFoodFactsAction,
} from "./openfoodfacts-tool.js";

import {
  getRecentObservations, getNotableObservations,
  getSpeciesInfo, ebirdAction,
} from "./ebird-tool.js";

import {
  estimateFlightEmissions, estimateVehicleEmissions,
  estimateElectricityEmissions, carbonInterfaceAction,
} from "./carboninterface-tool.js";

import { findNearestToilets, getToiletDetails } from "./toilets-tool.js";

// ─── Utilities ────────────────────────────────────────────────────────────────
import {
  calculateTip, calculateMortgage, calculateBmi,
  calculateCompoundInterest, convertCurrencyEstimate,
} from "./calculator-tool.js";

import {
  convertLength, convertWeight, convertTemperature,
  convertVolume, convertSpeed, convertArea, convertDataStorage,
} from "./unit-converter-tool.js";

import {
  getCurrentTime, convertTimezone, calculateDateDiff,
  addToDate, getBusinessDays, formatDate, getWeekNumber,
} from "./datetime-tool.js";

import {
  analyseText, transformText, extractEmails, extractUrls,
  extractPhoneNumbers, countOccurrences, truncateText,
} from "./text-tool.js";

import {
  searchMeals, getRandomMeal, getMealById,
  listMealCategories, filterMealsByCategory,
  filterMealsByArea, filterMealsByIngredient,
} from "./meal-tool.js";

import {
  getNflScores, getNbaScores, getMlbScores,
  getNhlScores, getSoccerScores, getEspnNews, getTeamInfo,
} from "./espn-tool.js";

import {
  getNflState, getSleeperPlayers, getTrendingPlayers,
  getSleeperLeague, getLeagueRosters, getLeagueMatchups,
} from "./sleeper-tool.js";

import {
  searchDeezer, getDeezerArtist, getDeezerAlbum,
  getDeezerTrack, getDeezerChart, searchDeezerPlaylist,
} from "./deezer-tool.js";

import {
  convertColor, getColorInfo, generateColorPalette,
  mixColors, checkContrastRatio,
} from "./color-tool.js";

import {
  generateUuid, generateRandomNumber, generateRandomString,
  pickRandomFromList, flipCoin, rollDice,
  shuffleList, generateLoremIpsum,
} from "./random-tool.js";

// ─── Productivity ─────────────────────────────────────────────────────────────
import { notionAction } from "./notion-tool.js";
import { readwiseAction } from "./readwise-tool.js";
import { raindropAction } from "./raindrop-tool.js";
import { clockifyAction } from "./clockify-tool.js";
import { splitwiseAction } from "./splitwise-tool.js";
import { instapaperAction } from "./instapaper-tool.js";
import { monicaAction } from "./monica-tool.js";
import { feedlyAction } from "./feedly-tool.js";

// ─── Existing tools (previously unwired) ─────────────────────────────────────
import {
  hnTopStories, hnNewStories, hnBestStories,
  hnAskHn, hnShowHn, hnItem, hnUser,
} from "./hackernews-tool.js";

import {
  f1Sessions, f1Drivers, f1Positions, f1Laps,
  f1PitStops, f1CarData, f1TeamRadio, f1Weather,
} from "./openf1-tool.js";

import {
  tmdbSearchMovies, tmdbSearchTv, tmdbMovie, tmdbTv,
  tmdbTrending, tmdbNowPlaying, tmdbUpcoming, tmdbPopularTv,
} from "./tmdb-tool.js";

import { triviaQuestions, triviaCategories } from "./trivia-tool.js";

import {
  pokeGetPokemon, pokeSearchPokemon, pokeGetType,
  pokeGetAbility, pokeGetGeneration,
} from "./pokeapi-tool.js";

import {
  searchCocktails, getRandomCocktail, getCocktailById,
  listCocktailCategories, filterCocktailsByCategory, filterCocktailsByIngredient,
} from "./cocktail-tool.js";

import { dictionaryLookup, dictionaryLookupLanguage } from "./dictionary-tool.js";

import { jokeRandom, jokeCategories } from "./joke-tool.js";

import {
  holidaysByCountry, holidaysNextWorldwide,
  holidayCountries, holidayLongWeekends,
} from "./holidays-tool.js";

import {
  dogRandomImage, dogBreedImage, dogListBreeds, dogBreedList,
} from "./dogceo-tool.js";

import {
  ramGetCharacter, ramSearchCharacters, ramGetEpisode,
  ramSearchEpisodes, ramGetLocation,
} from "./rickandmorty-tool.js";

import { xkcdLatest, xkcdComic, xkcdRandom } from "./xkcd-tool.js";

import {
  brewerySearch, breweryGet, breweryList, breweryRandom,
} from "./brewery-tool.js";

import {
  jikanSearchAnime, jikanGetAnime, jikanTopAnime,
  jikanSearchManga, jikanGetCharacter,
} from "./jikan-tool.js";

import { chuckRandom, chuckSearch, chuckCategories } from "./chucknorris-tool.js";

import { catFact, catFacts, catBreeds } from "./catfacts-tool.js";

import {
  swapiGetPerson, swapiSearchPeople, swapiGetPlanet,
  swapiSearchPlanets, swapiGetStarship, swapiSearchStarships,
} from "./swapi-tool.js";

import {
  dndGetClass, dndListClasses, dndGetSpell,
  dndListSpells, dndGetMonster, dndListMonsters,
} from "./dnd5e-tool.js";

import { deckNew, deckDraw, deckShuffle } from "./deckofcards-tool.js";

import { adviceRandom, adviceSearch, adviceById } from "./adviceslip-tool.js";

import { agifyAge, genderizeName, nationalizeName } from "./agify-tool.js";

import {
  quoteRandom, quoteSearch, quoteByAuthor,
  quoteListTags, quoteListAuthors,
} from "./quotable-tool.js";

import { boredRandom, boredByType, boredByParticipants } from "./bored-tool.js";

import { heroGetById, heroAll, heroPowerstats } from "./superhero-tool.js";

import { issLocation, issAstronauts } from "./opennotify-tool.js";

import { tarotAllCards, tarotDraw, tarotSearch } from "./tarot-tool.js";

import {
  aoe2Civilizations, aoe2Civilization, aoe2Units,
  aoe2Unit, aoe2Technologies,
} from "./aoe2-tool.js";

import { affirmationRandom } from "./affirmation-tool.js";

import { jpListPosts, jpGetPost, jpListComments, jpListUsers } from "./jsonplaceholder-tool.js";

import { picsumList, picsumGet, picsumRandomUrl } from "./picsum-tool.js";

import { bibleVerse, bibleRandom } from "./bible-tool.js";

import {
  frankfurterLatest, frankfurterConvert, frankfurterHistorical, frankfurterCurrencies,
} from "./frankfurter-tool.js";

import { zenQuoteRandom, zenQuoteToday, zenQuotes } from "./zenquotes-tool.js";

import { kanyeQuote } from "./kanye-tool.js";

import { dadJokeRandom, dadJokeSearch, dadJokeById } from "./dadjoke-tool.js";

import { uselessFactRandom, uselessFactToday } from "./uselessfacts-tool.js";

import { randomFoxImage } from "./randomfox-tool.js";

import { httpbinGet, httpbinHeaders, httpbinIp, httpbinUserAgent, httpbinUuid } from "./httpbin-tool.js";

import { reqresListUsers, reqresGetUser, reqresListResources } from "./reqres-tool.js";

import { corporateBsPhrase } from "./corporatebs-tool.js";

import { worldTimeByTimezone, worldTimeByIp, worldTimeListTimezones } from "./worldtime-tool.js";

import { sunriseSunsetTimes } from "./sunrisesunset-tool.js";

import { zipLookup, zipByCity } from "./zippopotamus-tool.js";

import { yesNoRandom } from "./yesno-tool.js";

import { evilInsultRandom } from "./evilinsult-tool.js";

import { dogApiRandomImage, dogApiBreeds } from "./dogapi-tool.js";

import { sportsdbSearchTeam, sportsdbSearchPlayer, sportsdbTeamEvents, sportsdbLeagues } from "./apifootball-tool.js";

import { catApiRandomImage, catApiBreeds } from "./catapi-tool.js";

import { spaceflightArticles, spaceflightBlogs, spaceflightReports } from "./spaceflight-tool.js";

import { archiveSearch, archiveMetadata } from "./archiveorg-tool.js";

import { ipifyGetIp } from "./ipify-tool.js";

import { erLatestRates } from "./exchangerate2-tool.js";

import { makeupSearch } from "./makeup-tool.js";

import { githubEmojis } from "./github-emoji-tool.js";

import { metSearch, metObject, metDepartments } from "./metmuseum-tool.js";

import { baconIpsum } from "./lorem-tool.js";

import { placeholderImage, placekittenImage } from "./placekitten-tool.js";

import { shibeRandomImage } from "./shibe-tool.js";

import { cataasRandomCat, cataasListTags } from "./cataas-tool.js";

import { punkApiRandomBeer, punkApiSearchBeers, punkApiGetBeer } from "./punkapi-tool.js";

import { colormindGeneratePalette, colormindListModels } from "./colormind-tool.js";

import { dummyjsonProducts, dummyjsonSearchProducts, dummyjsonQuotes, dummyjsonRandomQuote } from "./dummyjson-tool.js";

import { excuserRandom } from "./excuser-tool.js";

import { dogFactRandom } from "./dogfacts-tool.js";

import { amiiboSearch, amiiboBySeries, amiiboTypes } from "./amiibo-tool.js";

import { dummyImageUrl } from "./dummyimage-tool.js";

import { ipInfoLookup } from "./ipinfo-tool.js";

import { ghibliFilms, ghibliPeople } from "./ghibli-tool.js";

import { finalSpaceCharacters, finalSpaceEpisodes } from "./finalspace-tool.js";

import { mcServerStatus } from "./mcsrvstat-tool.js";

import { disneyCharacterSearch, disneyAllCharacters } from "./disneyapi-tool.js";

import { hpAllCharacters, hpStudents, hpStaff, hpByHouse } from "./harrypotter-tool.js";

import { emojihubRandom, emojihubByCategory } from "./emojihub-tool.js";

import { avatarUrl } from "./avatarapi-tool.js";

import { robohashUrl } from "./robohash-tool.js";

import { gutenbergSearch, gutenbergBook } from "./openlib2-tool.js";

import { countryFlagUrl } from "./countryflag-tool.js";

import { wiktionaryLookup } from "./mediawiki-tool.js";

import { quranVerse, quranSurah } from "./bibleverse-tool.js";

import { urlhausLookupUrl, urlhausRecent } from "./urlhaus-tool.js";

import { tvmazeSearch, tvmazeShow, tvmazeSchedule } from "./tvmaze-tool.js";

import { freetogameList, freetogameDetail } from "./freetogame-tool.js";

import { cheapsharkDeals, cheapsharkStores } from "./cheapshark-tool.js";

import { isEven } from "./iseven-tool.js";

import { iceandfireCharacters, iceandfireBooks, iceandfireHouses } from "./iceandfire-tool.js";

import { randomUser } from "./randomuser-tool.js";

import { digimonAll, digimonByName, digimonByLevel } from "./digimon-tool.js";

import { stapiSearchCharacter, stapiSearchSpecies, stapiSearchStarship } from "./stapi-tool.js";

import { breakingBadQuote } from "./breakingbad-tool.js";

import { randomTaco } from "./tacofancy-tool.js";

import { publicapisSearch, publicapisCategories, publicapisRandom } from "./publicapis-tool.js";

import { wgerExercises, wgerCategories, wgerMuscles } from "./wger-tool.js";

import { animechanRandom, animechanSearch } from "./animechan-tool.js";

import { lotrBooks, lotrCharacters, lotrQuotes } from "./lotr-tool.js";

import { coinpaprikaGlobal, coinpaprikaCoin, coinpaprikaTicker } from "./coinpaprika-tool.js";

import { openfdaDrugSearch, openfdaRecallSearch, openfdaAdverseEvents } from "./openfda-tool.js";

import { funTranslate } from "./funtranslations-tool.js";

import { datamuseWords, datamuseSuggestions } from "./datamuse-tool.js";

import { nbaPlayers, nbaTeams, nbaGames } from "./balldontlie-tool.js";

import { worldbankCountry, worldbankIndicator } from "./worldbank-tool.js";

import { carbonIntensityCurrent, carbonIntensityForecast, carbonIntensityGeneration } from "./carbonintensity-tool.js";

import { lyricsGet } from "./lyrics-tool.js";

import { urbanDefine, urbanRandom } from "./urbandictionary-tool.js";

import {
  nasaApod, nasaAsteroids, nasaMarsPhotos,
  nasaEarthImagery, nasaEpic,
} from "./nasa-tool.js";

import {
  weatherCurrent, weatherForecast, weatherHourly,
} from "./openmeteo-tool.js";

import {
  radioSearch, radioByCountry, radioTopClicked,
  radioTopVoted, radioByTag, radioCountries,
} from "./radiobrowser-tool.js";

import { numberFact, numberRandom } from "./numbers-tool.js";

import { omdbSearch, omdbGetByTitle, omdbGetById } from "./omdb-tool.js";

import {
  openlibrarySearch, openlibraryGetBook, openlibraryGetEdition,
  openlibraryGetAuthor, openlibraryAuthorWorks, openlibraryTrending,
} from "./openlibrary-tool.js";

import {
  mbSearchArtists, mbSearchReleases, mbSearchRecordings,
  mbGetArtist, mbGetRelease,
} from "./musicbrainz-tool.js";

import {
  geniusSearch, geniusGetSong, geniusGetArtist, geniusArtistSongs,
} from "./genius-tool.js";

import {
  tmSearchEvents, tmGetEvent, tmSearchVenues,
  tmGetVenue, tmSearchAttractions,
} from "./ticketmaster-tool.js";

import {
  seatgeekSearchEvents, seatgeekGetEvent,
  seatgeekSearchPerformers, seatgeekGetPerformer,
  seatgeekSearchVenues, seatgeekGetVenue,
} from "./seatgeek-tool.js";

import {
  eventbriteSearchEvents, eventbriteGetEvent,
  eventbriteGetEventAttendees, eventbriteCreateEvent,
  eventbriteListCategories, eventbriteGetVenue,
} from "./eventbrite-tool.js";

import {
  foursquareSearchPlaces, foursquareGetPlace,
  foursquareGetPhotos, foursquareGetTips, foursquareAutocomplete,
} from "./foursquare-tool.js";

import {
  lastfmGetArtistInfo, lastfmSearchArtists, lastfmGetTopTracks,
  lastfmGetSimilarArtists, lastfmGetChartTopArtists,
  lastfmGetChartTopTracks, lastfmGetAlbumInfo,
} from "./lastfm-tool.js";

import {
  discogsSearchReleases, discogsGetRelease, discogsGetArtist,
  discogsSearchArtists, discogsGetMarketplaceStats, discogsGetLabel,
} from "./discogs-tool.js";

import {
  setlistfmSearchArtist, setlistfmArtistSetlists,
  setlistfmSearchSetlists, setlistfmGetSetlist,
} from "./setlistfm-tool.js";

import {
  bandsintownArtist, bandsintownEvents, bandsintownRecommended,
} from "./bandsintown-tool.js";

import {
  podcastSearch, podcastGetByFeedUrl, podcastGetEpisodes,
  podcastSearchEpisodes, podcastTrending, podcastRecentEpisodes,
} from "./podcastindex-tool.js";

import {
  lichessUser, lichessUserGames, lichessPuzzleDaily,
  lichessTopPlayers, lichessTournament,
} from "./lichess-tool.js";

import {
  chessPlayer, chessPlayerStats, chessPlayerGames,
  chessPuzzlesRandom, chessLeaderboards,
} from "./chessdotcom-tool.js";

import {
  fplBootstrap, fplPlayer, fplGameweek,
  fplFixtures, fplMyTeam, fplManager, fplLeaguesClassic,
} from "./fpl-tool.js";

import {
  guardianSearchArticles, guardianGetArticle,
  guardianGetSections, guardianGetTags, guardianGetEdition,
} from "./guardian-tool.js";

import {
  newsGetTopHeadlines, newsSearchNews, newsGetSources,
} from "./newsapi-tool.js";

import {
  stockQuote, stockSearch, stockDaily,
  stockIntraday, forexRate, cryptoDaily,
} from "./alphavantage-tool.js";

import {
  cryptoPrice, cryptoCoin, cryptoSearch,
  cryptoTrending, cryptoTopCoins, cryptoCoinHistory,
} from "./coingecko-tool.js";

import {
  cmcListings, cmcQuotes, cmcInfo,
  cmcTrending, cmcGlobalMetrics,
} from "./coinmarketcap-tool.js";

import {
  forexLatest, forexHistorical, forexCurrencies, forexConvert,
} from "./openexchangerates-tool.js";

import {
  wiseExchangeRates, wiseProfile, wiseAccounts, wiseCreateQuote,
} from "./wise-tool.js";

import { ipLookup, ipBatch } from "./ipapi-tool.js";

import {
  countryAll, countryByName, countryByCode,
  countryByRegion, countryByCurrency, countryByLanguage,
} from "./restcountries-tool.js";

import {
  tomorrowRealtime, tomorrowForecast, tomorrowHistory,
} from "./tomorrowio-tool.js";

import {
  twitchSearchStreams, twitchGetStream, twitchSearchGames,
  twitchGetTopGames, twitchGetClips,
  twitchGetChannelInfo, twitchGetSchedule,
} from "./twitch-tool.js";

import {
  redditRead, redditPost, redditComment,
  redditSearch, redditThread, redditUser, redditVote, redditSubscribe,
} from "./reddit-tool.js";

import { mastodonAction } from "./mastodon-tool.js";
import { blueskyAction } from "./bluesky-tool.js";

import {
  discordSend, discordRead, discordThread,
  discordReact, discordChannels, discordMembers, discordSearch,
} from "./discord-tool.js";

import { slackAction } from "./slack-tool.js";

import {
  telegramSend, telegramRead, telegramSearch,
  telegramSendMedia, telegramGetUpdates, telegramManageChat,
} from "./telegram-tool.js";

import {
  lineSendMessage, lineSendFlexMessage, lineGetProfile,
  lineGetGroupSummary, lineReplyMessage, lineBroadcast,
} from "./line-tool.js";

import {
  figmaGetFile, figmaGetNode, figmaGetImages,
  figmaGetComments, figmaPostComment, figmaGetComponents, figmaGetTeamProjects,
} from "./figma-tool.js";

// ─── Messaging ────────────────────────────────────────────────────────────────
import {
  twilioSendSms, twilioListMessages, twilioGetMessage,
  twilioMakeCall, twilioListCalls, twilioSendVerify, twilioCheckVerify,
} from "./twilio-tool.js";

import {
  pushoverSendNotification, pushoverGetReceipt, pushoverCancelEmergency,
  pushoverListSounds, pushoverValidateUser,
} from "./pushover-tool.js";

import {
  whatsappSendText, whatsappSendTemplate, whatsappSendMedia,
  whatsappGetMedia, whatsappUploadMedia,
} from "./whatsapp-tool.js";

// ─── Media / Data ─────────────────────────────────────────────────────────────
import {
  youtubeSearch, youtubeGetVideo, youtubeGetChannel,
  youtubeListPlaylists, youtubeListPlaylistItems, youtubeGetCaptions,
} from "./youtube-tool.js";

import {
  spotifySearch, spotifyGetTrack, spotifyGetAlbum,
  spotifyGetArtist, spotifyGetPlaylist,
  spotifyGetRecommendations, spotifyGetAudioFeatures,
} from "./spotify-tool.js";

// ─── AI Video ─────────────────────────────────────────────────────────────────
import {
  higgsfield_generate_video, higgsfield_generate_image,
  higgsfield_get_styles, higgsfield_get_status,
} from "./higgsfield-tool.js";

import {
  heygen_create_avatar_video, heygen_list_avatars,
  heygen_get_video_status, heygen_list_voices,
} from "./heygen-tool.js";

import {
  runway_generate_video, runway_get_task, runway_list_models,
} from "./runway-tool.js";

import {
  pika_generate_video, pika_get_generation, pika_list_styles,
} from "./pika-tool.js";

import {
  kling_generate_video, kling_get_task,
} from "./kling-tool.js";

// ─── Monitoring / CI / CDP / Email / Commerce / Inference ─────────────────────
import {
  pagerduty_list_incidents, pagerduty_get_incident, pagerduty_create_incident,
  pagerduty_acknowledge_incident, pagerduty_resolve_incident,
  pagerduty_list_services, pagerduty_list_oncalls,
} from "./pagerduty-tool.js";

import {
  circleci_list_pipelines, circleci_get_pipeline,
  circleci_list_workflows, circleci_get_workflow,
  circleci_list_jobs, circleci_trigger_pipeline,
} from "./circleci-tool.js";

import {
  segment_track_event, segment_identify_user,
  segment_list_sources, segment_list_destinations, segment_get_source,
} from "./segment-tool.js";

import {
  postmark_send_email, postmark_send_batch, postmark_get_delivery_stats,
  postmark_list_templates, postmark_get_template, postmark_search_messages,
} from "./postmark-tool.js";

import {
  gumroad_list_products, gumroad_get_product,
  gumroad_list_sales, gumroad_get_sale, gumroad_list_subscribers,
} from "./gumroad-tool.js";

import {
  togetherai_chat_completion, togetherai_completion,
  togetherai_create_embedding, togetherai_list_models,
} from "./togetherai-tool.js";

// ─── AI ───────────────────────────────────────────────────────────────────────
import {
  elevenlabsListVoices, elevenlabsGetVoice, elevenlabsTextToSpeech,
  elevenlabsGetModels, elevenlabsGetHistory,
} from "./elevenlabs-tool.js";

import {
  replicateListModels, replicateGetModel, replicateCreatePrediction,
  replicateGetPrediction, replicateListPredictions, replicateCancelPrediction,
} from "./replicate-tool.js";

import {
  stabilityTextToImage, stabilityImageToImage,
  stabilityUpscale, stabilityListEngines,
} from "./stability-tool.js";

import {
  openaiChatCompletion, openaiCreateEmbedding, openaiGenerateImage,
  openaiCreateTranscription, openaiListModels,
} from "./openai-tool.js";

import {
  anthropicCreateMessage, anthropicListModels,
} from "./anthropic-tool.js";

import {
  amazonSearch, amazonProduct, amazonBrowse, amazonVariations,
} from "./amazon-tool.js";

import {
  shopifyProducts, shopifyOrders, shopifyCustomers,
  shopifyInventory, shopifyCollections,
  shopifyShop, shopifyFulfillments,
} from "./shopify-tool.js";

import {
  yelpSearchBusinesses, yelpGetBusiness, yelpGetReviews,
  yelpSearchEvents, yelpGetAutocomplete,
} from "./yelp-tool.js";

import {
  xeroInvoices, xeroContacts, xeroAccounts, xeroPayments,
  xeroBankTransactions, xeroReports, xeroQuotes, xeroOrganisation,
} from "./xero-tool.js";

import {
  ebaySearch, ebayGetItem, ebayGetItemByLegacyId, ebayGetCategories,
} from "./ebay-tool.js";

import {
  etsySearchListings, etsyGetListing, etsyGetShop,
  etsyGetShopListings, etsySearchShops,
} from "./etsy-tool.js";

import {
  stripeCustomers, stripeCharges, stripeSubscriptions,
  stripeInvoices, stripeProducts, stripePrices,
} from "./stripe-tool.js";

import {
  paypalOrders, paypalInvoices,
} from "./paypal-tool.js";

import {
  squarePayments, squareCustomers, squareCatalogList, squareCatalogSearch,
} from "./square-tool.js";

import {
  quickbooksCustomers, quickbooksInvoices, quickbooksItems, quickbooksPayments,
} from "./quickbooks-tool.js";

import {
  plaidAccounts, plaidTransactions, plaidBalances,
  plaidIdentity, plaidLinkTokenCreate,
} from "./plaid-tool.js";

import {
  wooProducts, wooOrders, wooCustomers,
} from "./woocommerce-tool.js";

import { csuitAnalyze } from "./csuite-tool.js";
import { vaultAction } from "./vault-tool.js";
import { qcRunChecklist, qcCheckApi, qcCopyAudit } from "./qc-tool.js";
import { keychainAction } from "./keychain-tool.js";

// ─── Marketing / Communication / Data ─────────────────────────────────────────
import {
  mailchimpListAudiences, mailchimpListCampaigns, mailchimpGetCampaign,
  mailchimpCreateCampaign, mailchimpListMembers, mailchimpAddMember, mailchimpSearchMembers,
} from "./mailchimp-tool.js";

import {
  sendgridSendEmail, sendgridListTemplates, sendgridGetTemplate,
  sendgridListContacts, sendgridAddContact, sendgridGetStats,
} from "./sendgrid-tool.js";

import {
  mapboxGeocodeForward, mapboxGeocodeReverse, mapboxGetDirections,
  mapboxGetStaticMap, mapboxListTilesets,
} from "./mapbox-tool.js";

import {
  algoliaSearch, algoliaGetObject, algoliaListIndices, algoliaBrowseIndex,
} from "./algolia-tool.js";

import {
  pineconeListIndexes, pineconeDescribeIndex, pineconeQueryVectors,
  pineconeUpsertVectors, pineconeDeleteVectors,
} from "./pinecone-tool.js";

import {
  mixpanelTrackEvent, mixpanelGetEvents, mixpanelGetFunnels,
  mixpanelGetRetention, mixpanelExportData,
} from "./mixpanel-tool.js";

import {
  datadogListMonitors, datadogGetMonitor, datadogCreateMonitor,
  datadogListDashboards, datadogQueryMetrics, datadogListEvents,
} from "./datadog-tool.js";

import {
  hubspotListContacts, hubspotGetContact, hubspotSearchContacts,
  hubspotListCompanies, hubspotListDeals, hubspotCreateContact,
} from "./hubspot-tool.js";

import {
  jiraSearchIssues, jiraGetIssue, jiraListProjects,
  jiraCreateIssue, jiraAddComment,
} from "./jira-tool.js";

import {
  posthogListFeatureFlags, posthogListInsights, posthogListPersons, posthogQuery,
} from "./posthog-tool.js";

import {
  netlifyListSites, netlifyGetSite, netlifyListDeploys, netlifyGetDeploy,
} from "./netlify-tool.js";

import { jobsmithCheck, jobsmithRules } from "./jobsmith-tool.js";

import {
  zendeskSearch, zendeskListTickets, zendeskGetTicket, zendeskAddComment,
} from "./zendesk-tool.js";

import {
  intercomListConversations, intercomGetConversation, intercomListContacts, intercomSearchContacts,
} from "./intercom-tool.js";

import {
  typeformListForms, typeformGetForm, typeformGetResponses,
} from "./typeform-tool.js";

import {
  calcomMe, calcomListEventTypes, calcomListBookings,
} from "./calcom-tool.js";

import {
  contentfulListEntries, contentfulGetEntry, contentfulListContentTypes, contentfulListAssets,
} from "./contentful-tool.js";

import {
  webflowListSites, webflowGetSite, webflowListCollections, webflowListItems,
} from "./webflow-tool.js";

import {
  doListDroplets, doListApps, doListDatabases, doAccount,
} from "./digitalocean-tool.js";

import {
  klaviyoListLists, klaviyoListSegments, klaviyoListMetrics, klaviyoListProfiles,
} from "./klaviyo-tool.js";

import {
  todoistListProjects, todoistListTasks, todoistCreateTask, todoistCompleteTask,
} from "./todoist-tool.js";

import {
  pipedriveListDeals, pipedriveListPersons, pipedriveListOrganizations, pipedriveSearchDeals,
} from "./pipedrive-tool.js";

import {
  confluenceSearch, confluenceGetPage, confluenceListSpaces,
} from "./confluence-tool.js";

import {
  unsplashSearchPhotos, unsplashGetPhoto, unsplashRandomPhoto,
} from "./unsplash-tool.js";

import {
  giphySearch, giphyTrending, giphyRandom,
} from "./giphy-tool.js";

import {
  miroListBoards, miroGetBoard, miroListItems,
} from "./miro-tool.js";

import {
  shortcutSearchStories, shortcutGetStory, shortcutListProjects, shortcutListEpics,
} from "./shortcut-tool.js";

import { codaListDocs, codaListTables, codaListRows } from "./coda-tool.js";
import { brevoListContacts, brevoListCampaigns, brevoGetAccount } from "./brevo-tool.js";
import { uptimerobotGetMonitors, uptimerobotGetAccount } from "./uptimerobot-tool.js";
import { dropboxListFolder, dropboxSearch, dropboxGetAccount } from "./dropbox-tool.js";
import { bitbucketListRepos, bitbucketGetRepo, bitbucketListPullRequests } from "./bitbucket-tool.js";
import { cloudinaryListResources, cloudinaryGetUsage } from "./cloudinary-tool.js";
import { wordpressListPosts, wordpressGetPost, wordpressListPages } from "./wordpress-tool.js";
import { ghostListPosts, ghostListPages, ghostListTags } from "./ghost-tool.js";

import {
  wikipediaSearch, wikipediaSummary, wikipediaPage,
} from "./wikipedia-tool.js";

import {
  deeplTranslateText, deeplGetUsage, deeplListLanguages, deeplTranslateDocument,
} from "./deepl-tool.js";

import {
  assemblyaiTranscribe, assemblyaiGetTranscript, assemblyaiListTranscripts,
  assemblyaiGetSentences, assemblyaiGetParagraphs, assemblyaiSummarize,
} from "./assemblyai-tool.js";

import {
  groqChatCompletion, groqListModels,
} from "./groq-tool.js";

import {
  nudgeonlyApi, nudgeonlyPolicy, nudgeonlyReceiptBridge,
} from "./nudgeonly-tool.js";

import {
  igniteonlyApi, igniteonlyPolicy, igniteonlyReceiptConsumer,
} from "./igniteonly-tool.js";

import {
  pushonlyApi, pushonlyPolicy, pushonlyWakePusher,
} from "./pushonly-tool.js";

// ─── Developer / Productivity ─────────────────────────────────────────────────
import { githubAction } from "./github-tool.js";
import { gitlabAction } from "./gitlab-tool.js";
import { clickupAction } from "./clickup-tool.js";
import { linearAction } from "./linear-tool.js";
import { airtableAction } from "./airtable-tool.js";
import { trelloAction } from "./trello-tool.js";
import { sentryAction } from "./sentry-tool.js";
import { postmanAction } from "./postman-tool.js";

// ─── Productivity / Social / Misc ─────────────────────────────────────────────
import {
  listAsanaWorkspaces, listAsanaProjects, listAsanaTasks,
  createAsanaTask, updateAsanaTask, getAsanaTask, searchAsanaTasks,
} from "./asana-tool.js";

import {
  listMondayBoards, getMondayBoard, listMondayItems,
  createMondayItem, updateMondayItem, searchMondayItems,
} from "./monday-tool.js";

import {
  getCalendlyUser, listCalendlyEventTypes, listCalendlyEvents,
  getCalendlyEvent, listCalendlyInvitees,
} from "./calendly-tool.js";

import {
  listPinterestBoards, getPinterestBoard, listPinterestPins,
  createPinterestPin, searchPinterestPins, getPinterestUser,
} from "./pinterest-tool.js";

import {
  getTiktokUser, listTiktokVideos, getTiktokVideo,
} from "./tiktok-tool.js";

import {
  getSteamPlayerSummaries, getSteamOwnedGames, getSteamAchievements,
  getSteamAppDetails, searchSteamStore,
} from "./steam-tool.js";

import {
  igdbSearchGames, igdbGetGame, igdbListPlatforms,
  igdbListGenres, igdbGetCompany,
} from "./igdb-tool.js";

import {
  speedrunSearchGames, speedrunGetGame, speedrunGetLeaderboard,
  speedrunListRuns, speedrunGetUser,
} from "./speedrun-tool.js";

import {
  exchangerateLatest, exchangerateConvert,
  exchangerateHistorical, exchangerateCodes,
} from "./exchangerate-tool.js";

// ─── Dev / Cloud ──────────────────────────────────────────────────────────────
import {
  neonListProjects, neonGetProject, neonListBranches,
  neonCreateBranch, neonListDatabases, neonExecuteSql,
} from "./neon-tool.js";

import {
  upstashRedisGet, upstashRedisSet, upstashRedisDel,
  upstashRedisListKeys, upstashRedisIncr,
  upstashKafkaProduce, upstashKafkaListTopics,
} from "./upstash-tool.js";

import {
  tursoListDatabases, tursoCreateDatabase, tursoListGroups,
  tursoGetDatabase, tursoExecuteSql,
} from "./turso-tool.js";

import {
  renderListServices, renderGetService, renderListDeploys,
  renderTriggerDeploy, renderListEnvVars, renderSetEnvVar,
} from "./render-tool.js";

import {
  flyListApps, flyGetApp, flyListMachines,
  flyCreateMachine, flyListVolumes,
} from "./flyio-tool.js";

// ─── AI Models ────────────────────────────────────────────────────────────────
import {
  mistralChatCompletion, mistralListModels, mistralCreateEmbedding,
} from "./mistral-tool.js";

import {
  cohereChat, cohereGenerate, cohereEmbed,
  cohereRerank, cohereClassify, cohereListModels,
} from "./cohere-tool.js";

import { perplexityChatCompletion } from "./perplexity-tool.js";

// ─── Commerce / Creator ───────────────────────────────────────────────────────
import {
  lsListStores, lsListProducts, lsListOrders,
  lsListSubscriptions, lsGetOrder, lsListCustomers,
} from "./lemonsqueezy-tool.js";

import {
  ckListSubscribers, ckAddSubscriber, ckListForms,
  ckListSequences, ckListTags, ckTagSubscriber,
} from "./convertkit-tool.js";

// ─── TestPass ─────────────────────────────────────────────────────────────────
import {
  testpassListPacks,
  testpassRun,
  testpassStatus,
  testpassSavePack,
  testpassEditItem,
  testpassEvidence,
  testpassFixList,
  testpassReportHtml,
  testpassReportJson,
  testpassReportMd,
} from "./testpass-tool.js";

// ─── LegalPass (issue-spotting guardrails) ───────────────────────────────────
import {
  legalpassEditItem,
  legalpassRun,
  legalpassSavePack,
  legalpassStatus,
  legalpassVerdict,
} from "./legalpass-tool.js";

// ─── UXPass (sister to TestPass, journey/usability QC) ───────────────────────
import {
  uxpassRun,
  uxpassStatus,
  uxpassReportHtml,
  uxpassReportJson,
  uxpassReportMd,
  uxpassRegisterPack,
} from "./uxpass-tool.js";

// ─── SEOPass (search visibility QC, sister to UXPass) ───────────────────────
import {
  seopassRun,
  seopassStatus,
  seopassRegisterPack,
  seopassLighthousePlan,
} from "./seopass-tool.js";

// --- GEOPass (AI answer-engine readiness QC, sister to SEOPass) -------------
import {
  geopassRun,
  geopassStatus,
} from "./geopass-tool.js";

// ─── CompliancePass (public name for EnterprisePass readiness) ───────────────
import {
  compliancepassRun,
  compliancepassStatus,
  compliancepassReportJson,
  compliancepassReportMd,
} from "./compliancepass-tool.js";

// ─── FlowPass (journey completion QC, sister to UXPass) ─────────────────────
import {
  flowpassDisagreementQueue,
  flowpassQuarantine,
  flowpassRecord,
  flowpassRegisterPack,
  flowpassReport,
  flowpassRun,
  flowpassStatus,
} from "./flowpass-tool.js";

// ─── SecurityPass (scope-gated security receipts) ───────────────────────────
import {
  securitypassDisclosureStatus,
  securitypassFindingDetail,
  securitypassRegisterPack,
  securitypassReport,
  securitypassRun,
  securitypassStatus,
  securitypassVerifyScope,
} from "./securitypass-tool.js";

// ─── CopyPass (copy quality QC, sister to SecurityPass) ─────────────────────
import {
  copypassRun,
  copypassStatus,
} from "./copypass-tool.js";

// ─── SlopPass (AI-code quality and slop-signal QC) ─────────────────────────
import { sloppassRun } from "./sloppass-tool.js";

// --- FidelityCopy / FidelityPass (deterministic preserve-lane receipts) ------
import {
  fidelitycopyCopy,
  fidelitypassVerifyCopy,
} from "./fidelitycopy-tool.js";

// --- CommonSensePass (worker sanity-gate verdicts) ---------------------------
import {
  commonsensepassCheckTool,
  commonsensepassRulesTool,
  COMMONSENSEPASS_CLAIM_KINDS,
} from "./commonsensepass-tool.js";

// --- XPass (conductor receipt across product checks) -------------------------
import { xpassAggregatedVerdict } from "./xpass-aggregated-verdict-tool.js";

// ─── Crews (Orchestrator Wizard) ──────────────────────────────────────────────
import { crewsStartRun, crewsGetRun, crewsListRuns } from "./crews-tool.js";

// ─────────────────────────────────────────────────────────────────────────────
// ADDITIONAL_TOOLS
// ─────────────────────────────────────────────────────────────────────────────

export const ADDITIONAL_TOOLS = [

  // ── bgg-tool.ts ─────────────────────────────────────────────────────────────
  {
    name: "bgg_search",
    description: "Search BoardGameGeek for board games by name.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        query: { type: "string", description: "Game name to search for" },
        type: { type: "string", enum: ["boardgame", "boardgameexpansion"], description: "Type of item to search for (default: boardgame)" },
      },
      required: ["query"],
    },
  },
  {
    name: "bgg_game_details",
    description: "Get full details for a board game by its BGG ID - name, year, rating, players, playtime, description, categories, and mechanics.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        gameId: { type: "string", description: "BoardGameGeek game ID" },
      },
      required: ["gameId"],
    },
  },
  {
    name: "bgg_user_collection",
    description: "Get a BGG user's game collection filtered by status (owned, wishlist, or played).",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        username: { type: "string", description: "BGG username" },
        status: { type: "string", enum: ["owned", "wishlist", "played"], description: "Collection filter (default: owned)" },
      },
      required: ["username"],
    },
  },
  {
    name: "bgg_top_games",
    description: "Get the BGG Hotness list - the most discussed and active board games right now.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        limit: { type: "number", description: "Number of games to return (max 50, default 20)" },
      },
    },
  },
  {
    name: "bgg_game_reviews",
    description: "Get user comments and ratings for a board game on BGG.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        gameId: { type: "string", description: "BoardGameGeek game ID" },
        page: { type: "number", description: "Page number (default 1, 25 comments per page)" },
      },
      required: ["gameId"],
    },
  },

  // ── rawg-tool.ts ────────────────────────────────────────────────────────────
  {
    name: "rawg_search_games",
    description: "Search for video games on RAWG.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        search: { type: "string", description: "Search query" },
        genres: { type: "string" },
        platforms: { type: "string" },
        ordering: { type: "string" },
        page_size: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["search"],
    },
  },
  {
    name: "rawg_get_game",
    description: "Get details for a specific game by RAWG ID or slug.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        id: { type: "string", description: "RAWG game ID or slug" },
        api_key: { type: "string" },
      },
      required: ["id"],
    },
  },
  {
    name: "rawg_game_screenshots",
    description: "Get screenshots for a RAWG game.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        id: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["id"],
    },
  },
  {
    name: "rawg_list_genres",
    description: "List all game genres on RAWG.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: { api_key: { type: "string" } },
    },
  },
  {
    name: "rawg_list_platforms",
    description: "List all gaming platforms on RAWG.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: { api_key: { type: "string" } },
    },
  },
  {
    name: "rawg_upcoming_games",
    description: "Get upcoming game releases from RAWG.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        page_size: { type: "number" },
        api_key: { type: "string" },
      },
    },
  },

  // ── riot-tool.ts ────────────────────────────────────────────────────────────
  {
    name: "riot_summoner",
    description: "Get a League of Legends summoner by name.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        summonerName: { type: "string" },
        region: { type: "string", description: "e.g. euw1, na1, kr" },
        api_key: { type: "string" },
      },
      required: ["summonerName"],
    },
  },
  {
    name: "riot_ranked",
    description: "Get ranked stats for a League of Legends summoner.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        summonerId: { type: "string" },
        region: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["summonerId"],
    },
  },
  {
    name: "riot_match_history",
    description: "Get match history for a LoL/Riot account by PUUID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        puuid: { type: "string" },
        region: { type: "string" },
        count: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["puuid"],
    },
  },
  {
    name: "riot_get_match",
    description: "Get details for a specific Riot match by match ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        matchId: { type: "string" },
        region: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["matchId"],
    },
  },
  {
    name: "riot_valorant_account",
    description: "Get a Valorant account by game name and tag line.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        gameName: { type: "string" },
        tagLine: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["gameName", "tagLine"],
    },
  },

  // ── bungie-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "bungie_search_player",
    description: "Search for a Destiny 2 player by display name.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        displayName: { type: "string" },
        membershipType: { type: "number", description: "-1 for all" },
        api_key: { type: "string" },
      },
      required: ["displayName"],
    },
  },
  {
    name: "bungie_get_profile",
    description: "Get a Destiny 2 player profile.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        membershipType: { type: "number" },
        membershipId: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["membershipType", "membershipId"],
    },
  },
  {
    name: "bungie_get_manifest",
    description: "Get the Destiny 2 manifest definition.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: { api_key: { type: "string" } },
    },
  },
  {
    name: "bungie_search_entities",
    description: "Search Destiny 2 manifest entities.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        entityType: { type: "string" },
        searchTerm: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["entityType", "searchTerm"],
    },
  },

  // ── supercell-tool.ts ────────────────────────────────────────────────────────
  {
    name: "coc_player",
    description: "Get a Clash of Clans player by tag.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        playerTag: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["playerTag"],
    },
  },
  {
    name: "coc_clan",
    description: "Get a Clash of Clans clan by tag.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        clanTag: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["clanTag"],
    },
  },
  {
    name: "coc_clan_members",
    description: "Get members of a Clash of Clans clan.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        clanTag: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["clanTag"],
    },
  },
  {
    name: "cr_player",
    description: "Get a Clash Royale player by tag.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        playerTag: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["playerTag"],
    },
  },
  {
    name: "cr_top_players",
    description: "Get top Clash Royale players globally or by location.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        locationId: { type: "string" },
        api_key: { type: "string" },
      },
    },
  },
  {
    name: "bs_player",
    description: "Get a Brawl Stars player by tag.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        playerTag: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["playerTag"],
    },
  },
  {
    name: "bs_club",
    description: "Get a Brawl Stars club by tag.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        clubTag: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["clubTag"],
    },
  },

  // ── lego-tool.ts ─────────────────────────────────────────────────────────────
  {
    name: "lego_search_sets",
    description: "Search LEGO sets by name/theme (Rebrickable).",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        search: { type: "string" },
        theme_id: { type: "number" },
        min_year: { type: "number" },
        max_year: { type: "number" },
        page_size: { type: "number" },
        api_key: { type: "string" },
      },
    },
  },
  {
    name: "lego_get_set",
    description: "Get details for a specific LEGO set by set number.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        set_num: { type: "string", description: "e.g. 75192-1" },
        api_key: { type: "string" },
      },
      required: ["set_num"],
    },
  },
  {
    name: "lego_set_parts",
    description: "Get the parts list for a LEGO set.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        set_num: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["set_num"],
    },
  },
  {
    name: "lego_search_parts",
    description: "Search LEGO parts by name.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        search: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["search"],
    },
  },
  {
    name: "lego_themes",
    description: "List all LEGO themes from Rebrickable.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: { api_key: { type: "string" } },
    },
  },
  {
    name: "brickset_search",
    description: "Search LEGO sets via Brickset API.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        query: { type: "string" },
        year: { type: "string" },
        theme: { type: "string" },
        pageSize: { type: "number" },
        api_key: { type: "string" },
      },
    },
  },
  {
    name: "brickset_get_set",
    description: "Get a specific LEGO set from Brickset by set number.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        setNumber: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["setNumber"],
    },
  },

  // ── untappd-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "untappd_search_beer",
    description: "Search for beers on Untappd.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        query: { type: "string" },
        limit: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["query"],
    },
  },
  {
    name: "untappd_get_beer",
    description: "Get details for a specific beer on Untappd.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        bid: { type: "number", description: "Beer ID" },
        api_key: { type: "string" },
      },
      required: ["bid"],
    },
  },
  {
    name: "untappd_get_brewery",
    description: "Get details for a brewery on Untappd.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        brewery_id: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["brewery_id"],
    },
  },
  {
    name: "untappd_search_brewery",
    description: "Search for breweries on Untappd.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        query: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["query"],
    },
  },
  {
    name: "untappd_beer_activities",
    description: "Get recent activity/check-ins for a beer on Untappd.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        bid: { type: "number" },
        limit: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["bid"],
    },
  },

  // ── pandascore-tool.ts ───────────────────────────────────────────────────────
  {
    name: "esports_matches",
    description: "Get esports matches from PandaScore.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        game: { type: "string", description: "e.g. lol, csgo, dota2" },
        status: { type: "string", description: "running, upcoming, past" },
        page: { type: "number" },
        per_page: { type: "number" },
        api_key: { type: "string" },
      },
    },
  },
  {
    name: "esports_tournaments",
    description: "Get esports tournaments from PandaScore.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        game: { type: "string" },
        status: { type: "string" },
        api_key: { type: "string" },
      },
    },
  },
  {
    name: "esports_teams",
    description: "Search esports teams on PandaScore.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        game: { type: "string" },
        search: { type: "string" },
        api_key: { type: "string" },
      },
    },
  },
  {
    name: "esports_players",
    description: "Search esports players on PandaScore.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        search: { type: "string" },
        api_key: { type: "string" },
      },
    },
  },
  {
    name: "esports_get_match",
    description: "Get details for a specific esports match by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        match_id: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["match_id"],
    },
  },

  // ── amber-tool.ts ────────────────────────────────────────────────────────────
  {
    name: "amber_sites",
    description: "Get Amber Electric sites for the authenticated user.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: { api_key: { type: "string" } },
    },
  },
  {
    name: "amber_current_price",
    description: "Get the current electricity price for an Amber site.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        site_id: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["site_id"],
    },
  },
  {
    name: "amber_forecast",
    description: "Get electricity price forecast for an Amber site.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        site_id: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["site_id"],
    },
  },

  // ── willyweather-tool.ts ─────────────────────────────────────────────────────
  {
    name: "willyweather_forecast",
    description: "Get weather forecast from WillyWeather for an Australian location.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        location_id: { type: "number", description: "WillyWeather location ID" },
        days: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["location_id"],
    },
  },
  {
    name: "willyweather_surf",
    description: "Get surf report from WillyWeather.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        location_id: { type: "number" },
        days: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["location_id"],
    },
  },
  {
    name: "willyweather_tide",
    description: "Get tide times from WillyWeather.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        location_id: { type: "number" },
        days: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["location_id"],
    },
  },

  // ── domain-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "domain_search_listings",
    description: "Search Australian property listings on Domain.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        suburb: { type: "string" },
        state: { type: "string" },
        postcode: { type: "string" },
        listingType: { type: "string", description: "Sale or Rent" },
        minBedrooms: { type: "number" },
        maxBedrooms: { type: "number" },
        minPrice: { type: "number" },
        maxPrice: { type: "number" },
        pageSize: { type: "number" },
        api_key: { type: "string" },
      },
    },
  },
  {
    name: "domain_get_property",
    description: "Get details for a specific Domain property listing.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        listing_id: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["listing_id"],
    },
  },
  {
    name: "domain_suburb_stats",
    description: "Get property market statistics for an Australian suburb.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        suburb: { type: "string" },
        state: { type: "string" },
        postcode: { type: "string" },
        propertyCategory: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["suburb", "state"],
    },
  },

  // ── trove-tool.ts ────────────────────────────────────────────────────────────
  {
    name: "trove_search",
    description: "Search the National Library of Australia's Trove.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        query: { type: "string" },
        zone: { type: "string", description: "e.g. newspaper, book" },
        n: { type: "number", description: "Number of results" },
        api_key: { type: "string" },
      },
      required: ["query"],
    },
  },
  {
    name: "trove_get_work",
    description: "Get a specific Trove work by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        id: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["id"],
    },
  },
  {
    name: "trove_newspaper_article",
    description: "Get a specific Trove newspaper article by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        id: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["id"],
    },
  },

  // ── australiapost-tool.ts ────────────────────────────────────────────────────
  {
    name: "auspost_track_parcel",
    description: "Track an Australia Post parcel by tracking number.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        tracking_id: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["tracking_id"],
    },
  },
  {
    name: "auspost_get_postcode",
    description: "Look up an Australian postcode or suburb.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        q: { type: "string", description: "Suburb name or postcode" },
        api_key: { type: "string" },
      },
      required: ["q"],
    },
  },
  {
    name: "auspost_delivery_times",
    description: "Get Australia Post estimated delivery times.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        from_postcode: { type: "string" },
        to_postcode: { type: "string" },
        service_code: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["from_postcode", "to_postcode"],
    },
  },

  // ── sendle-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "sendle_get_quote",
    description: "Get a shipping quote from Sendle.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        pickup_suburb: { type: "string" },
        pickup_postcode: { type: "string" },
        pickup_country: { type: "string" },
        delivery_suburb: { type: "string" },
        delivery_postcode: { type: "string" },
        delivery_country: { type: "string" },
        weight_value: { type: "number" },
        weight_units: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["pickup_postcode", "delivery_postcode", "weight_value"],
    },
  },
  {
    name: "sendle_create_order",
    description: "Create a Sendle shipping order.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        sender: { type: "object", additionalProperties: true },
        receiver: { type: "object", additionalProperties: true },
        parcel_contents: { type: "array", items: {} },
        api_key: { type: "string" },
      },
      required: ["sender", "receiver"],
    },
  },
  {
    name: "sendle_track_parcel",
    description: "Track a Sendle parcel by tracking number.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        tracking_id: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["tracking_id"],
    },
  },

  // ── ipaustralia-tool.ts ──────────────────────────────────────────────────────
  {
    name: "search_trademarks",
    description: "Search Australian trademarks via IP Australia.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        query: { type: "string" },
        status: { type: "string" },
        type: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["query"],
    },
  },
  {
    name: "get_trademark_details",
    description: "Get details for a specific Australian trademark.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        applicationNumber: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["applicationNumber"],
    },
  },
  {
    name: "search_patents",
    description: "Search Australian patents via IP Australia.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        query: { type: "string" },
        status: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["query"],
    },
  },

  // ── tab-tool.ts ──────────────────────────────────────────────────────────────
  {
    name: "tab_meetings",
    description: "Get TAB race meetings for a date.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        date: { type: "string", description: "YYYY-MM-DD" },
        jurisdiction: { type: "string", description: "e.g. VIC, NSW" },
        api_key: { type: "string" },
      },
    },
  },
  {
    name: "tab_race",
    description: "Get TAB race details. A race is addressed by its meeting date, meeting name, and race number (TAB has no single race id).",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        meeting_date: { type: "string", description: "Meeting date, YYYY-MM-DD" },
        meeting_name: { type: "string", description: "Meeting name, e.g. Flemington" },
        race_number: { type: "string", description: "Race number within the meeting" },
        race_type: { type: "string", description: "R (thoroughbred), G (greyhound), or H (harness). Default R." },
        jurisdiction: { type: "string", description: "State jurisdiction, e.g. VIC (default), NSW." },
        api_key: { type: "string" },
      },
      required: ["meeting_date", "meeting_name", "race_number"],
    },
  },
  {
    name: "tab_sports_markets",
    description: "Get TAB sports betting markets.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        sport: { type: "string" },
        competition: { type: "string" },
        api_key: { type: "string" },
      },
    },
  },

  // ── thelott-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "lott_results",
    description: "Get Australian lottery results from The Lott.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        game: { type: "string", description: "e.g. TattsLotto, Powerball" },
        draw_number: { type: "number" },
      },
    },
  },
  {
    name: "lott_jackpots",
    description: "Get current Australian lottery jackpots from The Lott.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {},
    },
  },

  // ── abn-tool.ts ──────────────────────────────────────────────────────────────
  {
    name: "abn_lookup",
    description: "Look up an Australian Business Number (ABN).",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        abn: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["abn"],
    },
  },
  {
    name: "abn_search",
    description: "Search for Australian businesses by name.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        name: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["name"],
    },
  },

  // ── ptv-tool.ts ──────────────────────────────────────────────────────────────
  {
    name: "ptv_search",
    description: "Search PTV stops, routes, or outlets.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        search_term: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["search_term"],
    },
  },
  {
    name: "ptv_departures",
    description: "Get PTV departures for a stop. In full UnClick, stop_id can be filled from saved Memory defaults.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        route_type: { type: "number", description: "0=train, 1=tram, 2=bus, 3=vline, 4=night. Defaults to train." },
        stop_id: { type: "number", description: "PTV stop ID. Optional when a saved UnClick Memory default exists." },
        route_id: { type: "number" },
        direction_id: { type: "number" },
        max_results: { type: "number", description: "Defaults to 5, maximum 20." },
        look_backwards: { type: "boolean" },
        include_cancelled: { type: "boolean" },
        api_key: { type: "string" },
      },
    },
  },
  {
    name: "ptv_disruptions",
    description: "Get current PTV service disruptions.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        route_types: { type: "string" },
        api_key: { type: "string" },
      },
    },
  },
  {
    name: "ptv_stops_on_route",
    description: "Get stops on a PTV route.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        route_id: { type: "number" },
        route_type: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["route_id", "route_type"],
    },
  },
  {
    name: "ptv_route_directions",
    description: "Get directions for a PTV route.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        route_id: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["route_id"],
    },
  },

  // ── nvd-tool.ts ──────────────────────────────────────────────────────────────
  {
    name: "get_cve_detail",
    description: "Get details for a specific CVE by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        cve_id: { type: "string", description: "e.g. CVE-2023-12345" },
      },
      required: ["cve_id"],
    },
  },
  {
    name: "search_cve",
    description: "Search the NVD CVE database.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        keyword: { type: "string" },
        cvssV3Severity: { type: "string", description: "LOW, MEDIUM, HIGH, CRITICAL" },
        resultsPerPage: { type: "number" },
        startIndex: { type: "number" },
      },
      required: ["keyword"],
    },
  },
  {
    name: "get_recent_cves",
    description: "Get recently published CVEs from NVD.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        resultsPerPage: { type: "number" },
      },
    },
  },

  // ── hunter-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "hunter_find_email",
    description: "Find email addresses for a domain using Hunter.io.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        domain: { type: "string" },
        first_name: { type: "string" },
        last_name: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["domain"],
    },
  },
  {
    name: "hunter_verify_email",
    description: "Verify an email address with Hunter.io.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        email: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["email"],
    },
  },
  {
    name: "hunter_domain_info",
    description: "Get email information for a domain from Hunter.io.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        domain: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["domain"],
    },
  },

  // ── haveibeenpwned-tool.ts ───────────────────────────────────────────────────
  {
    name: "hibp_check_account",
    description: "Check if an email account has been in a data breach.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        email: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["email"],
    },
  },
  {
    name: "hibp_all_breaches",
    description: "Get all breaches tracked by Have I Been Pwned.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        domain: { type: "string" },
      },
    },
  },
  {
    name: "hibp_check_password",
    description: "Check if a password has appeared in a data breach.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        password: { type: "string" },
      },
      required: ["password"],
    },
  },

  // ── virustotal-tool.ts ───────────────────────────────────────────────────────
  {
    name: "virustotal_scan_url",
    description: "Submit a URL for scanning on VirusTotal.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        url: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["url"],
    },
  },
  {
    name: "virustotal_url_report",
    description: "Get a VirusTotal report for a URL.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        url: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["url"],
    },
  },
  {
    name: "virustotal_scan_ip",
    description: "Get a VirusTotal report for an IP address.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        ip: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["ip"],
    },
  },
  {
    name: "virustotal_scan_domain",
    description: "Get a VirusTotal report for a domain.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        domain: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["domain"],
    },
  },

  // ── abuseipdb-tool.ts ────────────────────────────────────────────────────────
  {
    name: "abuseipdb_check_ip",
    description: "Check if an IP address has been reported for abuse.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        ip: { type: "string" },
        maxAgeInDays: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["ip"],
    },
  },
  {
    name: "abuseipdb_report_ip",
    description: "Report an abusive IP address to AbuseIPDB.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        ip: { type: "string" },
        categories: { type: "string" },
        comment: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["ip", "categories"],
    },
  },
  {
    name: "abuseipdb_blacklist",
    description: "Get the AbuseIPDB blacklist.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        confidenceMinimum: { type: "number" },
        limit: { type: "number" },
        api_key: { type: "string" },
      },
    },
  },

  // ── urlscan-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "urlscan_scan",
    description: "Submit a URL for scanning on urlscan.io.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        url: { type: "string" },
        visibility: { type: "string", enum: ["public", "private", "unlisted"], description: "public, private, or unlisted" },
        api_key: { type: "string" },
      },
      required: ["url"],
    },
  },
  {
    name: "urlscan_get_result",
    description: "Get the result of a urlscan.io scan by UUID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        uuid: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["uuid"],
    },
  },
  {
    name: "urlscan_search",
    description: "Search urlscan.io scan results.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        q: { type: "string" },
        size: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["q"],
    },
  },

  // ── shodan-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "shodan_search",
    description: "Search Shodan for internet-connected devices.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        query: { type: "string" },
        page: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["query"],
    },
  },
  {
    name: "shodan_host_info",
    description: "Get Shodan information for a specific IP address.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        ip: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["ip"],
    },
  },
  {
    name: "shodan_stats",
    description: "Get aggregated statistics for a Shodan query.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        query: { type: "string" },
        facets: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["query"],
    },
  },

  // ── resend-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "resend_send_email",
    description: "Send an email using Resend.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        from: { type: "string" },
        to: { type: "string" },
        subject: { type: "string" },
        html: { type: "string" },
        text: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["from", "to", "subject"],
    },
  },
  {
    name: "resend_get_email",
    description: "Get a sent email by ID from Resend.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        email_id: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["email_id"],
    },
  },
  {
    name: "resend_list_domains",
    description: "List domains configured in Resend.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: { api_key: { type: "string" } },
    },
  },

  // ── vercel-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "vercel_list_deployments",
    description: "List Vercel deployments for a project.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        projectId: { type: "string" },
        limit: { type: "number" },
        api_key: { type: "string" },
      },
    },
  },
  {
    name: "vercel_get_deployment",
    description: "Get details for a specific Vercel deployment.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        deploymentId: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["deploymentId"],
    },
  },
  {
    name: "vercel_list_projects",
    description: "List all Vercel projects.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        limit: { type: "number" },
        api_key: { type: "string" },
      },
    },
  },
  {
    name: "vercel_get_domain",
    description: "Get information about a Vercel domain.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        domain: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["domain"],
    },
  },
  {
    name: "vercel_get_env",
    description: "Get environment variables for a Vercel project.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        project_id: { type: "string" },
        projectId: { type: "string", description: "Legacy alias for project_id." },
        team_id: { type: "string" },
        decrypt: { type: "boolean" },
        api_key: { type: "string" },
      },
      required: ["project_id"],
    },
  },
  {
    name: "vercel_create_env",
    description:
      "Create (or upsert) an environment variable on a Vercel project. Target defaults to production, preview, and development. Use type='plain' for non-secret values, 'encrypted' or 'sensitive' for secrets.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        project_id: { type: "string" },
        key: { type: "string" },
        value: { type: "string" },
        target: {
          type: "string",
          description: "CSV of environments: 'production,preview,development'. Defaults to all three.",
        },
        type: {
          type: "string",
          description: "plain | encrypted | sensitive | secret | system. Defaults to plain.",
        },
        git_branch: { type: "string" },
        comment: { type: "string" },
        upsert: { type: "boolean", description: "Overwrite existing value for same key/target. Default true." },
        team_id: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["project_id", "key", "value"],
    },
  },
  {
    name: "vercel_delete_env",
    description: "Delete a Vercel environment variable by its env id (get ids from vercel_get_env).",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        project_id: { type: "string" },
        env_id: { type: "string" },
        team_id: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["project_id", "env_id"],
    },
  },
  {
    name: "vercel_create_deployment",
    description:
      "Create a Vercel deployment. Pass deployment_id to redeploy an existing commit, or project_id + git_ref to deploy fresh from git. Set force_new=true to skip the build cache (needed after env var changes or when serverless function surfaces change).",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        deployment_id: { type: "string", description: "Redeploy the git source of this existing deployment." },
        project_id: { type: "string", description: "Deploy fresh from the project's linked git repo." },
        git_ref: { type: "string", description: "Branch or SHA to deploy. Defaults to 'main'." },
        target: { type: "string", description: "'production' (default) or 'preview'." },
        force_new: { type: "boolean", description: "Skip build cache. Default false." },
        name: { type: "string" },
        team_id: { type: "string" },
        api_key: { type: "string" },
      },
    },
  },

  // ── toggl-tool.ts ────────────────────────────────────────────────────────────
  {
    name: "toggl_time_entries",
    description: "Get Toggl time entries.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        start_date: { type: "string" },
        end_date: { type: "string" },
        api_key: { type: "string" },
      },
    },
  },
  {
    name: "toggl_create_time_entry",
    description: "Create a new Toggl time entry.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        workspace_id: { type: "number" },
        description: { type: "string" },
        start: { type: "string" },
        stop: { type: "string" },
        project_id: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["workspace_id", "start"],
    },
  },
  {
    name: "toggl_projects",
    description: "Get Toggl projects for a workspace.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        workspace_id: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["workspace_id"],
    },
  },
  {
    name: "toggl_summary",
    description: "Get a Toggl time summary report.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        workspace_id: { type: "number" },
        since: { type: "string" },
        until: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["workspace_id"],
    },
  },

  // ── email-tool.ts ────────────────────────────────────────────────────────────
  {
    name: "email_send",
    description: "Send an email via Gmail/IMAP.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        to: { type: "string" },
        subject: { type: "string" },
        body: { type: "string" },
        cc: { type: "string" },
        bcc: { type: "string" },
        email: { type: "string" },
        password: { type: "string" },
      },
      required: ["to", "subject", "body"],
    },
  },
  {
    name: "email_read_inbox",
    description: "Read emails from an inbox.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        folder: { type: "string" },
        limit: { type: "number" },
        email: { type: "string" },
        password: { type: "string" },
      },
    },
  },
  {
    name: "email_search",
    description: "Search emails in an inbox.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        query: { type: "string" },
        folder: { type: "string" },
        limit: { type: "number" },
        email: { type: "string" },
        password: { type: "string" },
      },
      required: ["query"],
    },
  },
  {
    name: "email_get",
    description: "Get a specific email by UID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        uid: { type: "string" },
        folder: { type: "string" },
        email: { type: "string" },
        password: { type: "string" },
      },
      required: ["uid"],
    },
  },
  {
    name: "email_mark_read",
    description: "Mark an email as read.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        uid: { type: "string" },
        folder: { type: "string" },
        email: { type: "string" },
        password: { type: "string" },
      },
      required: ["uid"],
    },
  },
  {
    name: "email_delete",
    description: "Delete an email by UID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        uid: { type: "string" },
        folder: { type: "string" },
        email: { type: "string" },
        password: { type: "string" },
      },
      required: ["uid"],
    },
  },

  // ── usgs-tool.ts ─────────────────────────────────────────────────────────────
  {
    name: "usgs_recent_earthquakes",
    description: "Get recent earthquakes from USGS.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        minmagnitude: { type: "number" },
        limit: { type: "number" },
        period: { type: "string", description: "hour, day, week, month" },
      },
    },
  },
  {
    name: "usgs_earthquake_detail",
    description: "Get details for a specific USGS earthquake event.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        event_id: { type: "string" },
      },
      required: ["event_id"],
    },
  },
  {
    name: "usgs_earthquakes_by_region",
    description: "Get recent USGS earthquakes within a radius of a point (latitude/longitude).",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        lat: { type: "number", description: "Centre latitude" },
        lon: { type: "number", description: "Centre longitude" },
        radius: { type: "number", description: "Search radius in km (default 500)" },
        min_magnitude: { type: "number", description: "Minimum magnitude" },
        limit: { type: "number", description: "Max results (default 20, max 500)" },
      },
      required: ["lat", "lon"],
    },
  },

  // ── openaq-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "openaq_air_quality",
    description: "Get air quality data for a location from OpenAQ.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        city: { type: "string" },
        country: { type: "string" },
        parameter: { type: "string" },
        limit: { type: "number" },
      },
    },
  },
  {
    name: "openaq_measurements",
    description: "Get air quality measurements from OpenAQ.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        location_id: { type: "number" },
        parameter: { type: "string" },
        date_from: { type: "string" },
        date_to: { type: "string" },
        limit: { type: "number" },
      },
      required: ["location_id"],
    },
  },
  {
    name: "openaq_countries",
    description: "List countries with air quality data on OpenAQ.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {},
    },
  },

  // ── openfoodfacts-tool.ts ────────────────────────────────────────────────────
  {
    name: "food_search",
    description: "Search for food products on Open Food Facts.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        query: { type: "string" },
        page: { type: "number" },
        page_size: { type: "number" },
      },
      required: ["query"],
    },
  },
  {
    name: "food_get_product",
    description: "Get a food product from Open Food Facts by barcode.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        barcode: { type: "string" },
      },
      required: ["barcode"],
    },
  },
  {
    name: "food_by_category",
    description: "Get food products by category from Open Food Facts.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        category: { type: "string" },
        page: { type: "number" },
      },
      required: ["category"],
    },
  },

  // ── ebird-tool.ts ────────────────────────────────────────────────────────────
  {
    name: "ebird_recent_observations",
    description: "Get recent bird observations from eBird.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        regionCode: { type: "string", description: "e.g. AU-VIC" },
        back: { type: "number", description: "Days back (max 30)" },
        maxResults: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["regionCode"],
    },
  },
  {
    name: "ebird_notable_observations",
    description: "Get notable/rare bird observations from eBird.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        regionCode: { type: "string" },
        back: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["regionCode"],
    },
  },
  {
    name: "ebird_species_info",
    description: "Get information about a bird species from eBird.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        speciesCode: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["speciesCode"],
    },
  },

  // ── carboninterface-tool.ts ──────────────────────────────────────────────────
  {
    name: "carbon_flight_emissions",
    description: "Estimate carbon emissions for a flight.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        legs: { type: "array", items: {}, description: "Array of flight legs with departure_airport and destination_airport" },
        passengers: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["legs"],
    },
  },
  {
    name: "carbon_vehicle_emissions",
    description: "Estimate carbon emissions for a vehicle journey.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        distance_value: { type: "number" },
        distance_unit: { type: "string" },
        vehicle_model_id: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["distance_value", "vehicle_model_id"],
    },
  },
  {
    name: "carbon_electricity_emissions",
    description: "Estimate carbon emissions for electricity consumption.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        electricity_value: { type: "number" },
        electricity_unit: { type: "string" },
        country: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["electricity_value", "country"],
    },
  },

  // ── toilets-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "find_nearest_toilets",
    description: "Find the nearest public toilets to a location (Australia).",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        latitude: { type: "number" },
        longitude: { type: "number" },
        radius: { type: "number", description: "Search radius in metres" },
        limit: { type: "number" },
      },
      required: ["latitude", "longitude"],
    },
  },
  {
    name: "get_toilet_details",
    description: "Get details for a specific public toilet by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        toilet_id: { type: "string" },
      },
      required: ["toilet_id"],
    },
  },

  // ── calculator-tool.ts ───────────────────────────────────────────────────────
  {
    name: "calc_tip",
    description: "Calculate tip amount and total for a bill.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        bill: { type: "number" },
        tip_percent: { type: "number" },
        split: { type: "number" },
      },
      required: ["bill"],
    },
  },
  {
    name: "calc_mortgage",
    description: "Calculate monthly mortgage repayment.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        principal: { type: "number" },
        annual_rate: { type: "number" },
        years: { type: "number" },
      },
      required: ["principal", "annual_rate", "years"],
    },
  },
  {
    name: "calc_bmi",
    description: "Calculate Body Mass Index (BMI).",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        weight_kg: { type: "number" },
        height_cm: { type: "number" },
      },
      required: ["weight_kg", "height_cm"],
    },
  },
  {
    name: "calc_compound_interest",
    description: "Calculate compound interest growth.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        principal: { type: "number" },
        annual_rate: { type: "number" },
        years: { type: "number" },
        compounds_per_year: { type: "number" },
        monthly_contribution: { type: "number" },
      },
      required: ["principal", "annual_rate", "years"],
    },
  },
  {
    name: "calc_currency_estimate",
    description: "Estimate currency conversion using a rough rate.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        amount: { type: "number" },
        from: { type: "string" },
        to: { type: "string" },
      },
      required: ["amount", "from", "to"],
    },
  },

  // ── unit-converter-tool.ts ───────────────────────────────────────────────────
  {
    name: "convert_length",
    description: "Convert between length units.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        value: { type: "number" },
        from: { type: "string" },
        to: { type: "string" },
      },
      required: ["value", "from", "to"],
    },
  },
  {
    name: "convert_weight",
    description: "Convert between weight/mass units.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        value: { type: "number" },
        from: { type: "string" },
        to: { type: "string" },
      },
      required: ["value", "from", "to"],
    },
  },
  {
    name: "convert_temperature",
    description: "Convert between temperature units (C, F, K).",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        value: { type: "number" },
        from: { type: "string" },
        to: { type: "string" },
      },
      required: ["value", "from", "to"],
    },
  },
  {
    name: "convert_volume",
    description: "Convert between volume units.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        value: { type: "number" },
        from: { type: "string" },
        to: { type: "string" },
      },
      required: ["value", "from", "to"],
    },
  },
  {
    name: "convert_speed",
    description: "Convert between speed units.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        value: { type: "number" },
        from: { type: "string" },
        to: { type: "string" },
      },
      required: ["value", "from", "to"],
    },
  },
  {
    name: "convert_area",
    description: "Convert between area units.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        value: { type: "number" },
        from: { type: "string" },
        to: { type: "string" },
      },
      required: ["value", "from", "to"],
    },
  },
  {
    name: "convert_data_storage",
    description: "Convert between data storage units.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        value: { type: "number" },
        from: { type: "string" },
        to: { type: "string" },
      },
      required: ["value", "from", "to"],
    },
  },

  // ── datetime-tool.ts ─────────────────────────────────────────────────────────
  {
    name: "datetime_current_time",
    description: "Get the current date and time, optionally in a specific timezone.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        timezone: { type: "string" },
        format: { type: "string" },
      },
    },
  },
  {
    name: "datetime_convert_timezone",
    description: "Convert a datetime from one timezone to another.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        datetime: { type: "string" },
        from_timezone: { type: "string" },
        to_timezone: { type: "string" },
      },
      required: ["datetime", "from_timezone", "to_timezone"],
    },
  },
  {
    name: "datetime_date_diff",
    description: "Calculate the difference between two dates.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        date1: { type: "string" },
        date2: { type: "string" },
      },
      required: ["date1", "date2"],
    },
  },
  {
    name: "datetime_add_to_date",
    description: "Add a duration to a date.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        date: { type: "string" },
        years: { type: "number" },
        months: { type: "number" },
        days: { type: "number" },
        hours: { type: "number" },
        minutes: { type: "number" },
      },
      required: ["date"],
    },
  },
  {
    name: "datetime_business_days",
    description: "Get business days between two dates.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        start: { type: "string" },
        end: { type: "string" },
      },
      required: ["start", "end"],
    },
  },
  {
    name: "datetime_format_date",
    description: "Format a date string.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        date: { type: "string" },
        format: { type: "string" },
        locale: { type: "string" },
      },
      required: ["date"],
    },
  },
  {
    name: "datetime_week_number",
    description: "Get the ISO week number for a date.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        date: { type: "string" },
      },
      required: ["date"],
    },
  },

  // ── text-tool.ts ─────────────────────────────────────────────────────────────
  {
    name: "text_analyse",
    description: "Analyse text (word count, sentences, readability).",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        text: { type: "string" },
      },
      required: ["text"],
    },
  },
  {
    name: "text_transform",
    description: "Transform text (uppercase, lowercase, title case, slug, etc.).",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        text: { type: "string" },
        transform: { type: "string", description: "uppercase, lowercase, titlecase, slug, reverse, etc." },
      },
      required: ["text", "transform"],
    },
  },
  {
    name: "text_extract_emails",
    description: "Extract all email addresses from a text.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        text: { type: "string" },
      },
      required: ["text"],
    },
  },
  {
    name: "text_extract_urls",
    description: "Extract all URLs from a text.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        text: { type: "string" },
      },
      required: ["text"],
    },
  },
  {
    name: "text_extract_phone_numbers",
    description: "Extract all phone numbers from a text.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        text: { type: "string" },
      },
      required: ["text"],
    },
  },
  {
    name: "text_count_occurrences",
    description: "Count occurrences of a substring in text.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        text: { type: "string" },
        search: { type: "string" },
        case_sensitive: { type: "boolean" },
      },
      required: ["text", "search"],
    },
  },
  {
    name: "text_truncate",
    description: "Truncate text to a maximum length.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        text: { type: "string" },
        max_length: { type: "number" },
        suffix: { type: "string" },
      },
      required: ["text", "max_length"],
    },
  },

  // ── meal-tool.ts ─────────────────────────────────────────────────────────────
  {
    name: "meal_search",
    description: "Search for meals/recipes by name.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        query: { type: "string" },
      },
      required: ["query"],
    },
  },
  {
    name: "meal_random",
    description: "Get a random meal/recipe.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {},
    },
  },
  {
    name: "meal_get_by_id",
    description: "Get a meal/recipe by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        id: { type: "string" },
      },
      required: ["id"],
    },
  },
  {
    name: "meal_categories",
    description: "List all meal categories.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {},
    },
  },
  {
    name: "meal_filter_by_category",
    description: "Filter meals by category.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        category: { type: "string" },
      },
      required: ["category"],
    },
  },
  {
    name: "meal_filter_by_area",
    description: "Filter meals by cuisine/area.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        area: { type: "string" },
      },
      required: ["area"],
    },
  },
  {
    name: "meal_filter_by_ingredient",
    description: "Filter meals by main ingredient.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        ingredient: { type: "string" },
      },
      required: ["ingredient"],
    },
  },

  // ── espn-tool.ts ─────────────────────────────────────────────────────────────
  {
    name: "espn_nfl_scores",
    description: "Get current NFL scores from ESPN.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {},
    },
  },
  {
    name: "espn_nba_scores",
    description: "Get current NBA scores from ESPN.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {},
    },
  },
  {
    name: "espn_mlb_scores",
    description: "Get current MLB scores from ESPN.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {},
    },
  },
  {
    name: "espn_nhl_scores",
    description: "Get current NHL scores from ESPN.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {},
    },
  },
  {
    name: "espn_soccer_scores",
    description: "Get soccer scores from ESPN.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        league: { type: "string", description: "e.g. eng.1, usa.1" },
      },
    },
  },
  {
    name: "espn_news",
    description: "Get ESPN sports news.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        sport: { type: "string" },
        limit: { type: "number" },
      },
    },
  },
  {
    name: "espn_team_info",
    description: "Get team information from ESPN.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        sport: { type: "string" },
        league: { type: "string" },
        team_id: { type: "string" },
      },
      required: ["sport", "league", "team_id"],
    },
  },

  // ── sleeper-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "sleeper_nfl_state",
    description: "Get the current NFL state from Sleeper.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {},
    },
  },
  {
    name: "sleeper_players",
    description: "Get all NFL players from Sleeper.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        sport: { type: "string" },
      },
    },
  },
  {
    name: "sleeper_trending_players",
    description: "Get trending players on Sleeper.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        sport: { type: "string" },
        type: { type: "string", enum: ["add", "drop"], description: "add or drop" },
        lookback_hours: { type: "number" },
        limit: { type: "number" },
      },
    },
  },
  {
    name: "sleeper_league",
    description: "Get a Sleeper fantasy league by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        league_id: { type: "string" },
      },
      required: ["league_id"],
    },
  },
  {
    name: "sleeper_league_rosters",
    description: "Get rosters for a Sleeper fantasy league.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        league_id: { type: "string" },
      },
      required: ["league_id"],
    },
  },
  {
    name: "sleeper_league_matchups",
    description: "Get matchups for a Sleeper fantasy league week.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        league_id: { type: "string" },
        week: { type: "number" },
      },
      required: ["league_id", "week"],
    },
  },

  // ── deezer-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "deezer_search",
    description: "Search Deezer for tracks, artists, or albums.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        q: { type: "string" },
        type: { type: "string", description: "track, artist, album, playlist" },
        limit: { type: "number" },
      },
      required: ["q"],
    },
  },
  {
    name: "deezer_get_artist",
    description: "Get a Deezer artist by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        id: { type: "number" },
      },
      required: ["id"],
    },
  },
  {
    name: "deezer_get_album",
    description: "Get a Deezer album by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        id: { type: "number" },
      },
      required: ["id"],
    },
  },
  {
    name: "deezer_get_track",
    description: "Get a Deezer track by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        id: { type: "number" },
      },
      required: ["id"],
    },
  },
  {
    name: "deezer_chart",
    description: "Get Deezer chart (top tracks/albums/artists).",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        type: { type: "string", description: "tracks, albums, artists, playlists" },
        limit: { type: "number" },
      },
    },
  },
  {
    name: "deezer_search_playlist",
    description: "Search for Deezer playlists.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        q: { type: "string" },
        limit: { type: "number" },
      },
      required: ["q"],
    },
  },

  // ── color-tool.ts ────────────────────────────────────────────────────────────
  {
    name: "color_convert",
    description: "Convert a color from one format into ALL other formats (HEX, RGB, HSL, HSV, CMYK) at once.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        color: { type: "string", description: "The color value, e.g. #ff0000 or rgb(255,0,0)" },
        from: { type: "string", description: "Source format: hex, rgb, hsl, hsv, or cmyk" },
      },
      required: ["color", "from"],
    },
  },
  {
    name: "color_info",
    description: "Get information about a color (name, complementary, etc.).",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        color: { type: "string" },
        format: { type: "string" },
      },
      required: ["color"],
    },
  },
  {
    name: "color_palette",
    description: "Generate a color palette from a base color.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        color: { type: "string" },
        type: { type: "string", description: "complementary, analogous, triadic, etc." },
        count: { type: "number" },
      },
      required: ["color"],
    },
  },
  {
    name: "color_mix",
    description: "Mix two colors together.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        color1: { type: "string" },
        color2: { type: "string" },
        ratio: { type: "number" },
      },
      required: ["color1", "color2"],
    },
  },
  {
    name: "color_contrast_ratio",
    description: "Check the contrast ratio between two colors.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        foreground: { type: "string" },
        background: { type: "string" },
      },
      required: ["foreground", "background"],
    },
  },

  // ── random-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "random_uuid",
    description: "Generate a random UUID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {},
    },
  },
  {
    name: "random_number",
    description: "Generate a random number within a range.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        min: { type: "number" },
        max: { type: "number" },
        count: { type: "number" },
        integer: { type: "boolean" },
      },
    },
  },
  {
    name: "random_string",
    description: "Generate a random string.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        length: { type: "number" },
        charset: { type: "string" },
      },
    },
  },
  {
    name: "random_pick_from_list",
    description: "Pick random item(s) from a list.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        items: { type: "array", items: {} },
        count: { type: "number" },
      },
      required: ["items"],
    },
  },
  {
    name: "random_flip_coin",
    description: "Flip a coin.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        times: { type: "number" },
      },
    },
  },
  {
    name: "random_roll_dice",
    description: "Roll dice.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        dice: { type: "string", description: "e.g. 2d6, 1d20" },
      },
    },
  },
  {
    name: "random_shuffle_list",
    description: "Shuffle a list randomly.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        items: { type: "array", items: {} },
      },
      required: ["items"],
    },
  },
  {
    name: "random_lorem_ipsum",
    description: "Generate lorem ipsum placeholder text.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        paragraphs: { type: "number" },
        words: { type: "number" },
        sentences: { type: "number" },
      },
    },
  },

  // ── notion-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "notion_action",
    description: "Perform a Notion action: search_notion, get_notion_page, get_notion_database, query_notion_database, create_notion_page, update_notion_page.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        action: { type: "string" },
        api_key: { type: "string" },
        query: { type: "string" },
        page_id: { type: "string" },
        database_id: { type: "string" },
        filter: { type: "object", additionalProperties: true },
        properties: { type: "object", additionalProperties: true },
        parent: { type: "object", additionalProperties: true },
      },
      required: ["action"],
    },
  },

  // ── readwise-tool.ts ─────────────────────────────────────────────────────────
  {
    name: "readwise_action",
    description: "Perform a Readwise action: get_readwise_highlights, get_readwise_books, get_daily_review, search_highlights, create_highlight.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        action: { type: "string" },
        api_key: { type: "string" },
        query: { type: "string" },
        page: { type: "number" },
        book_id: { type: "number" },
        highlights: { type: "array", items: {} },
      },
      required: ["action"],
    },
  },

  // ── raindrop-tool.ts ─────────────────────────────────────────────────────────
  {
    name: "raindrop_action",
    description: "Perform a Raindrop.io action: search_raindrops, get_collection_raindrops, get_raindrop_collections, create_raindrop, get_raindrop, delete_raindrop.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        action: { type: "string" },
        api_key: { type: "string" },
        search: { type: "string" },
        collection_id: { type: "number" },
        raindrop_id: { type: "number" },
        link: { type: "string" },
        title: { type: "string" },
        tags: { type: "array", items: {} },
      },
      required: ["action"],
    },
  },

  // ── clockify-tool.ts ─────────────────────────────────────────────────────────
  {
    name: "clockify_action",
    description: "Perform a Clockify action: get_clockify_workspaces, get_time_entries, create_time_entry, get_clockify_projects, get_clockify_summary.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        action: { type: "string" },
        api_key: { type: "string" },
        workspace_id: { type: "string" },
        start: { type: "string" },
        end: { type: "string" },
        project_id: { type: "string" },
        description: { type: "string" },
      },
      required: ["action"],
    },
  },

  // ── splitwise-tool.ts ────────────────────────────────────────────────────────
  {
    name: "splitwise_action",
    description: "Perform a Splitwise action: get_groups, get_expenses, get_balances, create_expense, get_friends.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        action: { type: "string" },
        api_key: { type: "string" },
        group_id: { type: "number" },
        description: { type: "string" },
        cost: { type: "string" },
        currency_code: { type: "string" },
        users: { type: "array", items: {} },
      },
      required: ["action"],
    },
  },

  // ── instapaper-tool.ts ───────────────────────────────────────────────────────
  {
    name: "instapaper_action",
    description: "Perform an Instapaper action: get_instapaper_bookmarks, add_instapaper_bookmark, archive_bookmark, delete_bookmark, get_instapaper_folders.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        action: { type: "string" },
        username: { type: "string" },
        password: { type: "string" },
        bookmark_id: { type: "number" },
        url: { type: "string" },
        title: { type: "string" },
        folder_id: { type: "string" },
        limit: { type: "number" },
      },
      required: ["action"],
    },
  },

  // ── monica-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "monica_action",
    description: "Perform a Monica CRM action: get_contacts, search_contacts, get_contact, create_contact, get_contact_reminders, get_activities, add_note.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        action: { type: "string" },
        api_key: { type: "string" },
        contact_id: { type: "number" },
        query: { type: "string" },
        first_name: { type: "string" },
        last_name: { type: "string" },
        body: { type: "string" },
      },
      required: ["action"],
    },
  },

  // ── feedly-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "feedly_action",
    description: "Perform a Feedly action: get_feedly_feeds, get_feedly_streams, search_feedly, get_feedly_categories, mark_as_read.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        action: { type: "string" },
        api_key: { type: "string" },
        stream_id: { type: "string" },
        query: { type: "string" },
        count: { type: "number" },
        entry_ids: { type: "array", items: {} },
      },
      required: ["action"],
    },
  },

  // ── hackernews-tool.ts ───────────────────────────────────────────────────────
  {
    name: "hn_top_stories",
    description: "Get the top stories from Hacker News.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        limit: { type: "number" },
      },
    },
  },
  {
    name: "hn_new_stories",
    description: "Get the newest stories from Hacker News.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        limit: { type: "number" },
      },
    },
  },
  {
    name: "hn_best_stories",
    description: "Get the best stories from Hacker News.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        limit: { type: "number" },
      },
    },
  },
  {
    name: "hn_ask_hn",
    description: "Get Ask HN posts from Hacker News.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        limit: { type: "number" },
      },
    },
  },
  {
    name: "hn_show_hn",
    description: "Get Show HN posts from Hacker News.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        limit: { type: "number" },
      },
    },
  },
  {
    name: "hn_item",
    description: "Get a specific Hacker News item by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        id: { type: "number" },
      },
      required: ["id"],
    },
  },
  {
    name: "hn_user",
    description: "Get a Hacker News user profile.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        username: { type: "string" },
      },
      required: ["username"],
    },
  },

  // ── openf1-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "f1_sessions",
    description: "Get Formula 1 sessions from OpenF1.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        year: { type: "number" },
        session_type: { type: "string" },
        country_name: { type: "string" },
      },
    },
  },
  {
    name: "f1_drivers",
    description: "Get Formula 1 driver info from OpenF1.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        session_key: { type: "number" },
        driver_number: { type: "number" },
      },
    },
  },
  {
    name: "f1_positions",
    description: "Get Formula 1 position data from OpenF1.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        session_key: { type: "number" },
        driver_number: { type: "number" },
      },
      required: ["session_key"],
    },
  },
  {
    name: "f1_laps",
    description: "Get Formula 1 lap data from OpenF1.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        session_key: { type: "number" },
        driver_number: { type: "number" },
        lap_number: { type: "number" },
      },
      required: ["session_key"],
    },
  },
  {
    name: "f1_pit_stops",
    description: "Get Formula 1 pit stop data from OpenF1.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        session_key: { type: "number" },
        driver_number: { type: "number" },
      },
      required: ["session_key"],
    },
  },
  {
    name: "f1_car_data",
    description: "Get Formula 1 car telemetry data from OpenF1.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        session_key: { type: "number" },
        driver_number: { type: "number" },
      },
      required: ["session_key", "driver_number"],
    },
  },
  {
    name: "f1_team_radio",
    description: "Get Formula 1 team radio messages from OpenF1.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        session_key: { type: "number" },
        driver_number: { type: "number" },
      },
      required: ["session_key"],
    },
  },
  {
    name: "f1_weather",
    description: "Get Formula 1 weather data from OpenF1.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        session_key: { type: "number" },
      },
      required: ["session_key"],
    },
  },

  // ── tmdb-tool.ts ─────────────────────────────────────────────────────────────
  {
    name: "tmdb_search_movies",
    description: "Search for movies on TMDB.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        query: { type: "string" },
        year: { type: "number" },
        page: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["query"],
    },
  },
  {
    name: "tmdb_search_tv",
    description: "Search for TV shows on TMDB.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        query: { type: "string" },
        page: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["query"],
    },
  },
  {
    name: "tmdb_movie",
    description: "Get details for a TMDB movie by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        id: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["id"],
    },
  },
  {
    name: "tmdb_tv",
    description: "Get details for a TMDB TV show by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        id: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["id"],
    },
  },
  {
    name: "tmdb_trending",
    description: "Get trending movies or TV shows on TMDB.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        media_type: { type: "string", enum: ["movie", "tv", "all"], description: "movie, tv, or all" },
        time_window: { type: "string", enum: ["day", "week"], description: "day or week" },
        api_key: { type: "string" },
      },
    },
  },
  {
    name: "tmdb_now_playing",
    description: "Get movies currently in theaters from TMDB.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        page: { type: "number" },
        api_key: { type: "string" },
      },
    },
  },
  {
    name: "tmdb_upcoming",
    description: "Get upcoming movies from TMDB.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        page: { type: "number" },
        api_key: { type: "string" },
      },
    },
  },
  {
    name: "tmdb_popular_tv",
    description: "Get popular TV shows from TMDB.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        page: { type: "number" },
        api_key: { type: "string" },
      },
    },
  },

  // ── trivia-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "trivia_questions",
    description: "Get trivia questions from Open Trivia DB.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        amount: { type: "number" },
        category: { type: "number" },
        difficulty: { type: "string", enum: ["easy", "medium", "hard"], description: "easy, medium, hard" },
        type: { type: "string", enum: ["multiple", "boolean"], description: "multiple, boolean" },
      },
    },
  },
  {
    name: "trivia_categories",
    description: "Get available trivia categories from Open Trivia DB.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {},
    },
  },

  // ── pokeapi-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "poke_get_pokemon",
    description: "Get Pokemon data by name or ID from PokeAPI.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        name: { type: "string", description: "Pokemon name or ID (e.g. pikachu, 25)" },
      },
      required: ["name"],
    },
  },
  {
    name: "poke_search_pokemon",
    description: "List Pokemon with pagination from PokeAPI.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        limit: { type: "number", description: "Results per page (max 100, default 20)" },
        offset: { type: "number", description: "Offset for pagination" },
      },
    },
  },
  {
    name: "poke_get_type",
    description: "Get Pokemon type info and which Pokemon have that type.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        type: { type: "string", description: "Type name or ID (e.g. electric, fire, 10)" },
      },
      required: ["type"],
    },
  },
  {
    name: "poke_get_ability",
    description: "Get Pokemon ability info and which Pokemon have it.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        ability: { type: "string", description: "Ability name or ID (e.g. static, levitate)" },
      },
      required: ["ability"],
    },
  },
  {
    name: "poke_get_generation",
    description: "Get Pokemon generation info, region, and species list.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        generation: { type: "string", description: "Generation ID (1-9) or name" },
      },
      required: ["generation"],
    },
  },

  // ── cocktail-tool.ts ────────────────────────────────────────────────────────
  {
    name: "cocktail_search",
    description: "Search for cocktails/drinks by name.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        query: { type: "string" },
      },
      required: ["query"],
    },
  },
  {
    name: "cocktail_random",
    description: "Get a random cocktail/drink recipe.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {},
    },
  },
  {
    name: "cocktail_get_by_id",
    description: "Get a cocktail/drink by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        id: { type: "string", description: "TheCocktailDB drink ID" },
      },
      required: ["id"],
    },
  },
  {
    name: "cocktail_categories",
    description: "List all cocktail categories from TheCocktailDB.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {},
    },
  },
  {
    name: "cocktail_filter_by_category",
    description: "Filter cocktails by category.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        category: { type: "string", description: "e.g. Cocktail, Shot, Punch, Shake" },
      },
      required: ["category"],
    },
  },
  {
    name: "cocktail_filter_by_ingredient",
    description: "Filter cocktails by ingredient.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        ingredient: { type: "string", description: "e.g. Vodka, Rum, Gin, Whiskey" },
      },
      required: ["ingredient"],
    },
  },

  // ── dictionary-tool.ts ──────────────────────────────────────────────────────
  {
    name: "dictionary_lookup",
    description: "Look up a word's definition, phonetics, and examples.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        word: { type: "string" },
      },
      required: ["word"],
    },
  },
  {
    name: "dictionary_lookup_language",
    description: "Look up a word in a specific language (es, fr, de, it, ja, etc).",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        word: { type: "string" },
        language: { type: "string", description: "Language code (e.g. es, fr, de, it, ja)" },
      },
      required: ["word", "language"],
    },
  },

  // ── joke-tool.ts ────────────────────────────────────────────────────────────
  {
    name: "joke_random",
    description: "Get a random joke from JokeAPI.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        category: { type: "string", description: "Programming, Misc, Dark, Pun, Spooky, Christmas" },
        type: { type: "string", enum: ["single", "twopart"], description: "single or twopart" },
        amount: { type: "number", description: "Number of jokes (1-10)" },
      },
    },
  },
  {
    name: "joke_categories",
    description: "List available joke categories from JokeAPI.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {},
    },
  },

  // ── holidays-tool.ts ────────────────────────────────────────────────────────
  {
    name: "holidays_by_country",
    description: "Get public holidays for a country and year.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        country_code: { type: "string", description: "2-letter ISO code (US, AU, GB, DE, etc)" },
        year: { type: "number", description: "Year (defaults to current year)" },
      },
      required: ["country_code"],
    },
  },
  {
    name: "holidays_next",
    description: "Get upcoming public holidays for a country.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        country_code: { type: "string", description: "2-letter ISO code" },
      },
      required: ["country_code"],
    },
  },
  {
    name: "holidays_countries",
    description: "List all countries supported by the public holidays API.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {},
    },
  },
  {
    name: "holidays_long_weekends",
    description: "Get long weekends for a country and year.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        country_code: { type: "string", description: "2-letter ISO code" },
        year: { type: "number", description: "Year (defaults to current year)" },
      },
      required: ["country_code"],
    },
  },

  // ── dogceo-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "dog_random_image",
    description: "Get random dog image(s) from Dog CEO API.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        count: { type: "number", description: "Number of images (1-50, default 1)" },
      },
    },
  },
  {
    name: "dog_breed_image",
    description: "Get random image(s) of a specific dog breed.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        breed: { type: "string", description: "Breed name (e.g. husky, bulldog/french)" },
        count: { type: "number", description: "Number of images (1-50, default 1)" },
      },
      required: ["breed"],
    },
  },
  {
    name: "dog_list_breeds",
    description: "List all dog breeds and sub-breeds.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {},
    },
  },
  {
    name: "dog_breed_list",
    description: "List sub-breeds of a specific dog breed.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        breed: { type: "string", description: "Breed name (e.g. bulldog, hound)" },
      },
      required: ["breed"],
    },
  },

  // ── rickandmorty-tool.ts ─────────────────────────────────────────────────────
  {
    name: "ram_get_character",
    description: "Get a Rick and Morty character by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        id: { type: "string", description: "Character ID" },
      },
      required: ["id"],
    },
  },
  {
    name: "ram_search_characters",
    description: "Search Rick and Morty characters by name, status, species, or gender.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        name: { type: "string" },
        status: { type: "string", enum: ["alive", "dead", "unknown"] },
        species: { type: "string" },
        gender: { type: "string", enum: ["female", "male", "genderless", "unknown"] },
        page: { type: "number" },
      },
    },
  },
  {
    name: "ram_get_episode",
    description: "Get a Rick and Morty episode by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        id: { type: "string", description: "Episode ID" },
      },
      required: ["id"],
    },
  },
  {
    name: "ram_search_episodes",
    description: "Search Rick and Morty episodes by name or episode code.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        name: { type: "string" },
        episode_code: { type: "string", description: "e.g. S01E01" },
        page: { type: "number" },
      },
    },
  },
  {
    name: "ram_get_location",
    description: "Get a Rick and Morty location by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        id: { type: "string", description: "Location ID" },
      },
      required: ["id"],
    },
  },

  // ── xkcd-tool.ts ────────────────────────────────────────────────────────────
  {
    name: "xkcd_latest",
    description: "Get the latest xkcd comic.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {},
    },
  },
  {
    name: "xkcd_comic",
    description: "Get a specific xkcd comic by number.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        number: { type: "number", description: "Comic number" },
      },
      required: ["number"],
    },
  },
  {
    name: "xkcd_random",
    description: "Get a random xkcd comic.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {},
    },
  },

  // ── brewery-tool.ts ─────────────────────────────────────────────────────────
  {
    name: "brewery_search",
    description: "Search breweries by name.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        query: { type: "string" },
        per_page: { type: "number", description: "Results per page (max 50)" },
      },
      required: ["query"],
    },
  },
  {
    name: "brewery_get",
    description: "Get a brewery by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        id: { type: "string" },
      },
      required: ["id"],
    },
  },
  {
    name: "brewery_list",
    description: "List breweries, optionally filtered by city, state, or type.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        city: { type: "string" },
        state: { type: "string" },
        type: { type: "string", description: "micro, nano, regional, brewpub, large, planning, bar, contract, proprietor, closed" },
        per_page: { type: "number" },
        page: { type: "number" },
      },
    },
  },
  {
    name: "brewery_random",
    description: "Get random breweries.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        size: { type: "number", description: "Number of breweries (1-50, default 1)" },
      },
    },
  },

  // ── jikan-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "jikan_search_anime",
    description: "Search anime on MyAnimeList via Jikan API.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        query: { type: "string" },
        limit: { type: "number", description: "Max results (up to 25)" },
        page: { type: "number" },
        type: { type: "string", description: "tv, movie, ova, special, ona, music" },
        status: { type: "string", description: "airing, complete, upcoming" },
        order_by: { type: "string", description: "score, popularity, rank" },
      },
      required: ["query"],
    },
  },
  {
    name: "jikan_get_anime",
    description: "Get anime details by MyAnimeList ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        id: { type: "string", description: "MyAnimeList anime ID" },
      },
      required: ["id"],
    },
  },
  {
    name: "jikan_top_anime",
    description: "Get top-ranked anime from MyAnimeList.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        limit: { type: "number" },
        page: { type: "number" },
        type: { type: "string", description: "tv, movie, ova, special, ona, music" },
        filter: { type: "string", description: "airing, upcoming, bypopularity, favorite" },
      },
    },
  },
  {
    name: "jikan_search_manga",
    description: "Search manga on MyAnimeList via Jikan API.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        query: { type: "string" },
        limit: { type: "number" },
        page: { type: "number" },
      },
      required: ["query"],
    },
  },
  {
    name: "jikan_get_character",
    description: "Get an anime/manga character by MyAnimeList ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        id: { type: "string", description: "MyAnimeList character ID" },
      },
      required: ["id"],
    },
  },

  // ── chucknorris-tool.ts ─────────────────────────────────────────────────────
  {
    name: "chuck_random",
    description: "Get a random Chuck Norris joke.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        category: { type: "string", description: "Joke category (use chuck_categories to list)" },
      },
    },
  },
  {
    name: "chuck_search",
    description: "Search Chuck Norris jokes by keyword.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        query: { type: "string", description: "Search query (min 3 chars)" },
      },
      required: ["query"],
    },
  },
  {
    name: "chuck_categories",
    description: "List available Chuck Norris joke categories.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {},
    },
  },

  // ── catfacts-tool.ts ────────────────────────────────────────────────────────
  {
    name: "cat_fact",
    description: "Get a random cat fact.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {},
    },
  },
  {
    name: "cat_facts",
    description: "Get multiple cat facts with pagination.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        limit: { type: "number", description: "Number of facts (max 50, default 5)" },
        page: { type: "number" },
      },
    },
  },
  {
    name: "cat_breeds",
    description: "List cat breeds with details.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        limit: { type: "number", description: "Number of breeds (max 50, default 10)" },
        page: { type: "number" },
      },
    },
  },

  // ── swapi-tool.ts ────────────────────────────────────────────────────────────
  {
    name: "swapi_get_person",
    description: "Get a Star Wars character by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        id: { type: "string", description: "Character ID (e.g. 1 for Luke Skywalker)" },
      },
      required: ["id"],
    },
  },
  {
    name: "swapi_search_people",
    description: "Search Star Wars characters by name.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        query: { type: "string", description: "Search query (e.g. 'luke')" },
      },
      required: ["query"],
    },
  },
  {
    name: "swapi_get_planet",
    description: "Get a Star Wars planet by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        id: { type: "string", description: "Planet ID (e.g. 1 for Tatooine)" },
      },
      required: ["id"],
    },
  },
  {
    name: "swapi_search_planets",
    description: "Search Star Wars planets by name.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        query: { type: "string", description: "Search query (e.g. 'tatooine')" },
      },
      required: ["query"],
    },
  },
  {
    name: "swapi_get_starship",
    description: "Get a Star Wars starship by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        id: { type: "string", description: "Starship ID (e.g. 10 for Millennium Falcon)" },
      },
      required: ["id"],
    },
  },
  {
    name: "swapi_search_starships",
    description: "Search Star Wars starships by name.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        query: { type: "string", description: "Search query (e.g. 'falcon')" },
      },
      required: ["query"],
    },
  },

  // ── dnd5e-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "dnd_get_class",
    description: "Get a D&D 5e class by index (e.g. wizard, fighter).",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        class: { type: "string", description: "Class index (e.g. 'wizard', 'fighter')" },
      },
      required: ["class"],
    },
  },
  {
    name: "dnd_list_classes",
    description: "List all D&D 5e character classes.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },
  {
    name: "dnd_get_spell",
    description: "Get a D&D 5e spell by name/index.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        spell: { type: "string", description: "Spell index (e.g. 'fireball', 'magic-missile')" },
      },
      required: ["spell"],
    },
  },
  {
    name: "dnd_list_spells",
    description: "List D&D 5e spells, optionally filtered.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        school: { type: "string", description: "Filter by school (e.g. 'evocation')" },
        level: { type: "number", description: "Filter by spell level (0-9)" },
      },
    },
  },
  {
    name: "dnd_get_monster",
    description: "Get a D&D 5e monster stat block by index.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        monster: { type: "string", description: "Monster index (e.g. 'goblin', 'adult-red-dragon')" },
      },
      required: ["monster"],
    },
  },
  {
    name: "dnd_list_monsters",
    description: "List D&D 5e monsters, optionally by challenge rating.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        challenge_rating: { type: "string", description: "Filter by CR (e.g. '1', '0.25')" },
      },
    },
  },

  // ── deckofcards-tool.ts ─────────────────────────────────────────────────────
  {
    name: "deck_new",
    description: "Create and shuffle a new deck of cards.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        deck_count: { type: "number", description: "Number of decks (default 1)" },
      },
    },
  },
  {
    name: "deck_draw",
    description: "Draw cards from a deck.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        deck_id: { type: "string", description: "Deck ID from deck_new" },
        count: { type: "number", description: "Number of cards to draw (default 1)" },
      },
      required: ["deck_id"],
    },
  },
  {
    name: "deck_shuffle",
    description: "Reshuffle an existing deck.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        deck_id: { type: "string", description: "Deck ID to reshuffle" },
      },
      required: ["deck_id"],
    },
  },

  // ── adviceslip-tool.ts ──────────────────────────────────────────────────────
  {
    name: "advice_random",
    description: "Get a random piece of advice.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },
  {
    name: "advice_search",
    description: "Search advice slips by keyword.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        query: { type: "string", description: "Search keyword" },
      },
      required: ["query"],
    },
  },
  {
    name: "advice_by_id",
    description: "Get a specific advice slip by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        id: { type: "number", description: "Advice slip ID" },
      },
      required: ["id"],
    },
  },

  // ── agify-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "agify_age",
    description: "Predict the age of a person based on their first name.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        name: { type: "string", description: "First name to analyze" },
        country_id: { type: "string", description: "ISO 3166-1 alpha-2 country code for localization" },
      },
      required: ["name"],
    },
  },
  {
    name: "genderize_name",
    description: "Predict the gender of a person based on their first name.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        name: { type: "string", description: "First name to analyze" },
        country_id: { type: "string", description: "ISO 3166-1 alpha-2 country code for localization" },
      },
      required: ["name"],
    },
  },
  {
    name: "nationalize_name",
    description: "Predict the nationality of a person based on their first name.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        name: { type: "string", description: "First name to analyze" },
      },
      required: ["name"],
    },
  },

  // ── quotable-tool.ts ────────────────────────────────────────────────────────
  {
    name: "quote_random",
    description: "Get a random inspirational quote.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        tags: { type: "string", description: "Comma-separated tags to filter by (e.g. 'wisdom,life')" },
      },
    },
  },
  {
    name: "quote_search",
    description: "Search quotes by keyword.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        query: { type: "string", description: "Search keyword" },
        limit: { type: "number", description: "Max results (default 10)" },
      },
      required: ["query"],
    },
  },
  {
    name: "quote_by_author",
    description: "Get quotes by a specific author.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        author: { type: "string", description: "Author name or slug" },
        limit: { type: "number", description: "Max results (default 10)" },
      },
      required: ["author"],
    },
  },
  {
    name: "quote_list_tags",
    description: "List all available quote tags/categories.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },
  {
    name: "quote_list_authors",
    description: "List quote authors sorted by number of quotes.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        limit: { type: "number", description: "Max results (default 20)" },
      },
    },
  },

  // ── bored-tool.ts ────────────────────────────────────────────────────────────
  {
    name: "bored_random",
    description: "Get a random activity suggestion.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },
  {
    name: "bored_by_type",
    description: "Get an activity by type (education, recreational, social, diy, charity, cooking, relaxation, music, busywork).",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        type: { type: "string", description: "Activity type" },
      },
      required: ["type"],
    },
  },
  {
    name: "bored_by_participants",
    description: "Get an activity for a specific number of participants.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        participants: { type: "number", description: "Number of participants" },
      },
      required: ["participants"],
    },
  },

  // ── superhero-tool.ts ───────────────────────────────────────────────────────
  {
    name: "hero_get_by_id",
    description: "Get a superhero/villain by ID from the comic book database.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        id: { type: "number", description: "Character ID" },
      },
      required: ["id"],
    },
  },
  {
    name: "hero_all",
    description: "List all superheroes and villains (returns first 50 with IDs).",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },
  {
    name: "hero_powerstats",
    description: "Get power statistics for a superhero/villain.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        id: { type: "number", description: "Character ID" },
      },
      required: ["id"],
    },
  },

  // ── opennotify-tool.ts ──────────────────────────────────────────────────────
  {
    name: "iss_location",
    description: "Get the current location of the International Space Station.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },
  {
    name: "iss_astronauts",
    description: "Get the list of astronauts currently in space.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },

  // ── tarot-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "tarot_all_cards",
    description: "List all tarot cards in the deck.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },
  {
    name: "tarot_draw",
    description: "Draw random tarot cards for a reading.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        count: { type: "number", description: "Number of cards to draw (default 3)" },
      },
    },
  },
  {
    name: "tarot_search",
    description: "Search for a specific tarot card by name.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        query: { type: "string", description: "Card name (e.g. 'The Fool', 'Death', 'Ace of Cups')" },
      },
      required: ["query"],
    },
  },

  // ── aoe2-tool.ts ────────────────────────────────────────────────────────────
  {
    name: "aoe2_civilizations",
    description: "List all Age of Empires II civilizations.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },
  {
    name: "aoe2_civilization",
    description: "Get an Age of Empires II civilization by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        id: { type: "number", description: "Civilization ID" },
      },
      required: ["id"],
    },
  },
  {
    name: "aoe2_units",
    description: "List all Age of Empires II units.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },
  {
    name: "aoe2_unit",
    description: "Get an Age of Empires II unit by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        id: { type: "number", description: "Unit ID" },
      },
      required: ["id"],
    },
  },
  {
    name: "aoe2_technologies",
    description: "List all Age of Empires II technologies.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },

  // ── affirmation-tool.ts ─────────────────────────────────────────────────────
  {
    name: "affirmation_random",
    description: "Get a random positive affirmation.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },

  // ── jsonplaceholder-tool.ts ─────────────────────────────────────────────────
  {
    name: "jp_list_posts",
    description: "List posts from JSONPlaceholder (fake REST API). Optionally filter by userId.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        userId: { type: "number", description: "Filter by user ID (1-10)" },
      },
    },
  },
  {
    name: "jp_get_post",
    description: "Get a single post by ID from JSONPlaceholder.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        id: { type: "number", description: "Post ID (1-100)" },
      },
      required: ["id"],
    },
  },
  {
    name: "jp_list_comments",
    description: "List comments on a post from JSONPlaceholder.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        postId: { type: "number", description: "Post ID to get comments for" },
      },
      required: ["postId"],
    },
  },
  {
    name: "jp_list_users",
    description: "List all users from JSONPlaceholder (fake test data).",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },

  // ── picsum-tool.ts ─────────────────────────────────────────────────────────
  {
    name: "picsum_list",
    description: "List photos available on Lorem Picsum.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        page: { type: "number", description: "Page number (default 1)" },
        limit: { type: "number", description: "Photos per page (default 20, max 100)" },
      },
    },
  },
  {
    name: "picsum_get",
    description: "Get info about a specific Lorem Picsum photo by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        id: { type: "string", description: "Photo ID" },
      },
      required: ["id"],
    },
  },
  {
    name: "picsum_random_url",
    description: "Generate a random placeholder image URL from Lorem Picsum (no fetch needed).",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        width: { type: "number", description: "Image width in pixels (default 800)" },
        height: { type: "number", description: "Image height in pixels (default 600)" },
        grayscale: { type: "boolean", description: "Convert to grayscale" },
        blur: { type: "number", description: "Blur amount (1-10)" },
      },
    },
  },

  // ── bible-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "bible_verse",
    description: "Look up a Bible verse or passage by reference (e.g. 'John 3:16', 'Psalm 23').",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        reference: { type: "string", description: "Bible reference, e.g. 'John 3:16', 'Romans 8:28-30'" },
      },
      required: ["reference"],
    },
  },
  {
    name: "bible_random",
    description: "Get a random Bible verse.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },

  // ── frankfurter-tool.ts ────────────────────────────────────────────────────
  {
    name: "frankfurter_latest",
    description: "Get latest exchange rates from ECB via Frankfurter.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        from: { type: "string", description: "Base currency code (default EUR)" },
        to: { type: "string", description: "Target currency code (optional, returns all if omitted)" },
      },
    },
  },
  {
    name: "frankfurter_convert",
    description: "Convert a specific amount between two currencies using ECB rates.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        amount: { type: "number", description: "Amount to convert" },
        from: { type: "string", description: "Source currency code" },
        to: { type: "string", description: "Target currency code" },
      },
      required: ["amount", "from", "to"],
    },
  },
  {
    name: "frankfurter_historical",
    description: "Get historical exchange rates for a specific date from ECB.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        date: { type: "string", description: "Date in YYYY-MM-DD format" },
        from: { type: "string", description: "Base currency code (default EUR)" },
        to: { type: "string", description: "Target currency code (optional)" },
      },
      required: ["date"],
    },
  },
  {
    name: "frankfurter_currencies",
    description: "List all currencies supported by the Frankfurter ECB exchange-rate API.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },

  // ── zenquotes-tool.ts ──────────────────────────────────────────────────────
  {
    name: "zen_quote_random",
    description: "Get a random inspirational quote from Zen Quotes.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },
  {
    name: "zen_quote_today",
    description: "Get today's quote of the day from Zen Quotes.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },
  {
    name: "zen_quotes",
    description: "Get a batch of inspirational quotes from Zen Quotes (returns up to 20).",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },

  // ── kanye-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "kanye_quote",
    description: "Get a random Kanye West quote.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },

  // ── dadjoke-tool.ts ────────────────────────────────────────────────────────
  {
    name: "dadjoke_random",
    description: "Get a random dad joke from icanhazdadjoke.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },
  {
    name: "dadjoke_search",
    description: "Search for dad jokes by keyword.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        term: { type: "string", description: "Search keyword" },
        page: { type: "number", description: "Page number (default 1)" },
        limit: { type: "number", description: "Results per page (max 30, default 20)" },
      },
      required: ["term"],
    },
  },
  {
    name: "dadjoke_by_id",
    description: "Get a specific dad joke by its ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        id: { type: "string", description: "Joke ID" },
      },
      required: ["id"],
    },
  },

  // ── uselessfacts-tool.ts ───────────────────────────────────────────────────
  {
    name: "useless_fact_random",
    description: "Get a random useless fact.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },
  {
    name: "useless_fact_today",
    description: "Get today's useless fact of the day.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },

  // ── randomfox-tool.ts ──────────────────────────────────────────────────────
  {
    name: "random_fox_image",
    description: "Get a random fox image URL.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },

  // ── httpbin-tool.ts ────────────────────────────────────────────────────────
  {
    name: "httpbin_get",
    description: "Test an HTTP GET request - see your headers, IP, and args echoed back.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },
  {
    name: "httpbin_headers",
    description: "Get your request headers as seen by httpbin.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },
  {
    name: "httpbin_ip",
    description: "Get your public IP address via httpbin.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },
  {
    name: "httpbin_user_agent",
    description: "Get your User-Agent string via httpbin.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },
  {
    name: "httpbin_uuid",
    description: "Generate a random UUID via httpbin.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },

  // ── reqres-tool.ts ─────────────────────────────────────────────────────────
  {
    name: "reqres_list_users",
    description: "List fake users from Reqres (test API).",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        page: { type: "number", description: "Page number (default 1)" },
      },
    },
  },
  {
    name: "reqres_get_user",
    description: "Get a specific fake user by ID from Reqres.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        id: { type: "number", description: "User ID (1-12)" },
      },
      required: ["id"],
    },
  },
  {
    name: "reqres_list_resources",
    description: "List fake color resources from Reqres (test API).",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        page: { type: "number", description: "Page number (default 1)" },
      },
    },
  },

  // ── corporatebs-tool.ts ────────────────────────────────────────────────────
  {
    name: "corporate_bs_phrase",
    description: "Generate a random corporate buzzword phrase.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },

  // ── worldtime-tool.ts ──────────────────────────────────────────────────────
  {
    name: "worldtime_by_timezone",
    description: "Get current time for a specific timezone.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        timezone: { type: "string", description: "IANA timezone, e.g. 'America/New_York', 'Europe/London'" },
      },
      required: ["timezone"],
    },
  },
  {
    name: "worldtime_by_ip",
    description: "Get current time based on IP address geolocation.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        ip: { type: "string", description: "IP address (omit for your own IP)" },
      },
    },
  },
  {
    name: "worldtime_list_timezones",
    description: "List all available IANA timezones.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },

  // ── sunrisesunset-tool.ts ──────────────────────────────────────────────────
  {
    name: "sunrise_sunset_times",
    description: "Get sunrise and sunset times for GPS coordinates.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        lat: { type: "number", description: "Latitude" },
        lng: { type: "number", description: "Longitude" },
        date: { type: "string", description: "Date (YYYY-MM-DD) or 'today' (default)" },
      },
      required: ["lat", "lng"],
    },
  },

  // ── zippopotamus-tool.ts ───────────────────────────────────────────────────
  {
    name: "zip_lookup",
    description: "Look up location info for a zip/postal code.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        code: { type: "string", description: "Zip or postal code" },
        country: { type: "string", description: "Country code (default: us). Supports us, gb, au, ca, de, fr, etc." },
      },
      required: ["code"],
    },
  },
  {
    name: "zip_by_city",
    description: "Look up zip/postal codes for a city and state.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        state: { type: "string", description: "State abbreviation (e.g. CA, NY)" },
        city: { type: "string", description: "City name" },
        country: { type: "string", description: "Country code (default: us)" },
      },
      required: ["state", "city"],
    },
  },

  // ── yesno-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "yesno_random",
    description: "Get a random yes/no answer with an animated GIF.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        force: { type: "string", enum: ["yes", "no", "maybe"], description: "Force a specific answer" },
      },
    },
  },

  // ── evilinsult-tool.ts ─────────────────────────────────────────────────────
  {
    name: "evil_insult_random",
    description: "Get a random insult (for entertainment only).",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        lang: { type: "string", description: "Language code (default: en). Supports en, es, de, etc." },
      },
    },
  },

  // ── dogapi-tool.ts ─────────────────────────────────────────────────────────
  {
    name: "dog_api_random_image",
    description: "Get a random dog image from The Dog API.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },
  {
    name: "dog_api_breeds",
    description: "List dog breeds with details from The Dog API.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        limit: { type: "number", description: "Number of breeds to return (max 50, default 20)" },
        page: { type: "number", description: "Page number (default 0)" },
      },
    },
  },

  // ── apifootball-tool.ts (TheSportsDB) ──────────────────────────────────────
  {
    name: "sportsdb_search_team",
    description: "Search for a sports team by name on TheSportsDB.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: { team: { type: "string", description: "Team name to search for" } },
      required: ["team"],
    },
  },
  {
    name: "sportsdb_search_player",
    description: "Search for a sports player by name on TheSportsDB.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: { player: { type: "string", description: "Player name to search for" } },
      required: ["player"],
    },
  },
  {
    name: "sportsdb_team_events",
    description: "Get upcoming events for a team by TheSportsDB team ID.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: { id: { type: "string", description: "TheSportsDB team ID" } },
      required: ["id"],
    },
  },
  {
    name: "sportsdb_leagues",
    description: "List all sports leagues on TheSportsDB.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },

  // ── catapi-tool.ts ─────────────────────────────────────────────────────────
  {
    name: "cat_api_random_image",
    description: "Get a random cat image from The Cat API.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },
  {
    name: "cat_api_breeds",
    description: "List cat breeds with details from The Cat API.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        limit: { type: "number", description: "Number of breeds (max 50, default 20)" },
        page: { type: "number", description: "Page number (default 0)" },
      },
    },
  },

  // ── spaceflight-tool.ts ────────────────────────────────────────────────────
  {
    name: "spaceflight_articles",
    description: "Get latest spaceflight news articles.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        limit: { type: "number", description: "Number of articles (max 20, default 10)" },
        search: { type: "string", description: "Search keyword" },
      },
    },
  },
  {
    name: "spaceflight_blogs",
    description: "Get latest spaceflight blog posts.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        limit: { type: "number", description: "Number of posts (max 20, default 10)" },
        search: { type: "string", description: "Search keyword" },
      },
    },
  },
  {
    name: "spaceflight_reports",
    description: "Get latest spaceflight technical reports.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: { limit: { type: "number", description: "Number of reports (max 20, default 10)" } },
    },
  },

  // ── archiveorg-tool.ts ─────────────────────────────────────────────────────
  {
    name: "archive_search",
    description: "Search the Internet Archive (archive.org) for items.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        query: { type: "string", description: "Search query" },
        mediatype: { type: "string", description: "Filter: texts, audio, movies, software, image, collection" },
        limit: { type: "number", description: "Results per page (max 20, default 10)" },
        page: { type: "number", description: "Page number (default 1)" },
      },
      required: ["query"],
    },
  },
  {
    name: "archive_metadata",
    description: "Get metadata for an Internet Archive item by identifier.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: { identifier: { type: "string", description: "Archive.org item identifier" } },
      required: ["identifier"],
    },
  },

  // ── ipify-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "ipify_get_ip",
    description: "Get your public IP address via ipify.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: { ipv6: { type: "boolean", description: "Use IPv6 endpoint" } },
    },
  },

  // ── exchangerate2-tool.ts ──────────────────────────────────────────────────
  {
    name: "er_latest_rates",
    description: "Get latest exchange rates from ExchangeRate-API (open endpoint).",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: { base: { type: "string", description: "Base currency code (default: USD)" } },
    },
  },

  // ── makeup-tool.ts ─────────────────────────────────────────────────────────
  {
    name: "makeup_search",
    description: "Search makeup products by brand, type, category, or tags.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        brand: { type: "string", description: "Brand name (e.g. maybelline, covergirl, nyx)" },
        product_type: { type: "string", description: "Product type (e.g. lipstick, foundation, mascara)" },
        product_category: { type: "string", description: "Category (e.g. powder, cream, liquid)" },
        product_tags: { type: "string", description: "Tags (e.g. vegan, organic, gluten_free)" },
      },
    },
  },

  // ── github-emoji-tool.ts ───────────────────────────────────────────────────
  {
    name: "github_emojis",
    description: "List all GitHub emojis with their image URLs.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },

  // ── metmuseum-tool.ts ──────────────────────────────────────────────────────
  {
    name: "met_search",
    description: "Search the Metropolitan Museum of Art collection for artworks.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        query: { type: "string", description: "Search query (e.g. sunflowers, Egyptian, armor)" },
        hasImages: { type: "boolean", description: "Only return objects with images (default true)" },
      },
      required: ["query"],
    },
  },
  {
    name: "met_object",
    description: "Get full details for a Met Museum artwork by object ID.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: { objectID: { type: "number", description: "Met Museum object ID" } },
      required: ["objectID"],
    },
  },
  {
    name: "met_departments",
    description: "List all departments in the Metropolitan Museum of Art.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },

  // ── lorem-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "bacon_ipsum",
    description: "Generate meat-themed placeholder text (Bacon Ipsum).",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        paragraphs: { type: "number", description: "Number of paragraphs (max 10, default 3)" },
        type: { type: "string", enum: ["meat-and-filler", "all-meat"], description: "Text type (default: meat-and-filler)" },
      },
    },
  },

  // ── placekitten-tool.ts ────────────────────────────────────────────────────
  {
    name: "placeholder_image",
    description: "Generate a placeholder image URL with custom size, colors, and text.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        width: { type: "number", description: "Width in pixels (default 600)" },
        height: { type: "number", description: "Height in pixels (default 400)" },
        text: { type: "string", description: "Text overlay on the image" },
        bg: { type: "string", description: "Background hex color (default EEEEEE)" },
        fg: { type: "string", description: "Text hex color (default 333333)" },
      },
    },
  },
  {
    name: "placekitten_image",
    description: "Generate a random kitten placeholder image URL.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        width: { type: "number", description: "Width in pixels (default 600)" },
        height: { type: "number", description: "Height in pixels (default 400)" },
        grayscale: { type: "boolean", description: "Grayscale kitten image" },
      },
    },
  },

  // ── shibe-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "shibe_random_image",
    description: "Get random Shiba Inu, cat, or bird images.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        count: { type: "number", description: "Number of images (1-10, default 1)" },
        type: { type: "string", description: "Image type: shibes, cats, or birds (default shibes)" },
      },
    },
  },

  // ── cataas-tool.ts ─────────────────────────────────────────────────────────
  {
    name: "cataas_random_cat",
    description: "Get a random cat image, optionally with a tag or text overlay.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        tag: { type: "string", description: "Filter by tag (e.g. cute, funny, sleeping)" },
        text: { type: "string", description: "Text to overlay on the image" },
      },
    },
  },
  {
    name: "cataas_list_tags",
    description: "List all available cat image tags.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },

  // ── punkapi-tool.ts ────────────────────────────────────────────────────────
  {
    name: "punkapi_random_beer",
    description: "Get a random craft beer recipe from BrewDog's Punk API.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },
  {
    name: "punkapi_search_beers",
    description: "Search craft beer recipes by name.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        query: { type: "string", description: "Beer name to search for" },
        per_page: { type: "number", description: "Results per page (max 25, default 10)" },
        page: { type: "number", description: "Page number (default 1)" },
      },
    },
  },
  {
    name: "punkapi_get_beer",
    description: "Get a specific craft beer recipe by ID.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        id: { type: "number", description: "Numeric beer ID" },
      },
      required: ["id"],
    },
  },

  // ── colormind-tool.ts ──────────────────────────────────────────────────────
  {
    name: "colormind_generate_palette",
    description: "Generate an AI-powered 5-color palette using Colormind.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        model: { type: "string", description: "Color model to use (default: default)" },
        input: {
          type: "array",
          description: "Optional 5-element array of [R,G,B] or 'N' for colors to lock/generate",
          items: {},
        },
      },
    },
  },
  {
    name: "colormind_list_models",
    description: "List available Colormind color models.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },

  // ── dummyjson-tool.ts ───────────────────────────────────────────────────────
  {
    name: "dummyjson_products",
    description: "Browse fake product data from DummyJSON.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        limit: { type: "number", description: "Max results (default 10, max 30)" },
        skip: { type: "number", description: "Offset for pagination" },
      },
    },
  },
  {
    name: "dummyjson_search_products",
    description: "Search fake products by keyword.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        query: { type: "string", description: "Search keyword" },
      },
      required: ["query"],
    },
  },
  {
    name: "dummyjson_quotes",
    description: "Browse a collection of quotes from DummyJSON.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        limit: { type: "number", description: "Max results (default 10, max 30)" },
      },
    },
  },
  {
    name: "dummyjson_random_quote",
    description: "Get a random quote from DummyJSON.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },

  // ── excuser-tool.ts ────────────────────────────────────────────────────────
  {
    name: "excuser_random",
    description: "Get a random excuse, optionally by category.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        category: { type: "string", description: "Category: family, office, college, party, or unspecified" },
      },
    },
  },

  // ── dogfacts-tool.ts ───────────────────────────────────────────────────────
  {
    name: "dog_fact_random",
    description: "Get a random dog fact.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },

  // ── amiibo-tool.ts ─────────────────────────────────────────────────────────
  {
    name: "amiibo_search",
    description: "Search Nintendo Amiibo figures by character name.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        name: { type: "string", description: "Character name to search" },
      },
      required: ["name"],
    },
  },
  {
    name: "amiibo_by_series",
    description: "List Amiibo figures in a game series.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        series: { type: "string", description: "Amiibo series name (e.g. Super Mario, Zelda)" },
      },
      required: ["series"],
    },
  },
  {
    name: "amiibo_types",
    description: "List all Amiibo product types (figure, card, yarn, etc.).",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },

  // ── dummyimage-tool.ts ─────────────────────────────────────────────────────
  {
    name: "dummy_image_url",
    description: "Generate a placeholder image URL with custom size, colors, and text.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        width: { type: "number", description: "Width in pixels (default 600)" },
        height: { type: "number", description: "Height in pixels (default 400)" },
        bg_color: { type: "string", description: "Background hex color without # (default cccccc)" },
        fg_color: { type: "string", description: "Text hex color without # (default 000000)" },
        text: { type: "string", description: "Text to show on the image" },
      },
    },
  },

  // ── ipinfo-tool.ts ─────────────────────────────────────────────────────────
  {
    name: "ipinfo_lookup",
    description: "Get geolocation and ISP info for an IP address (or your own).",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        ip: { type: "string", description: "IP address to look up (omit for your own)" },
      },
    },
  },

  // ── ghibli-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "ghibli_films",
    description: "List all Studio Ghibli films with directors and descriptions.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },
  {
    name: "ghibli_people",
    description: "List characters from Studio Ghibli films.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },

  // ── finalspace-tool.ts ─────────────────────────────────────────────────────
  {
    name: "final_space_characters",
    description: "List all Final Space characters.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },
  {
    name: "final_space_episodes",
    description: "List all Final Space episodes.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },

  // ── mcsrvstat-tool.ts ──────────────────────────────────────────────────────
  {
    name: "mc_server_status",
    description: "Check the status of a Minecraft server (Java or Bedrock).",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        address: { type: "string", description: "Server address (e.g. mc.hypixel.net)" },
        edition: { type: "string", description: "java or bedrock (default java)" },
      },
      required: ["address"],
    },
  },

  // ── disneyapi-tool.ts ──────────────────────────────────────────────────────
  {
    name: "disney_character_search",
    description: "Search Disney characters by name.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        name: { type: "string", description: "Character name to search" },
      },
      required: ["name"],
    },
  },
  {
    name: "disney_all_characters",
    description: "Browse all Disney characters (paginated).",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        page: { type: "number", description: "Page number (default 1)" },
      },
    },
  },

  // ── harrypotter-tool.ts ────────────────────────────────────────────────────
  {
    name: "hp_all_characters",
    description: "List all Harry Potter characters.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },
  {
    name: "hp_students",
    description: "List Hogwarts students.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },
  {
    name: "hp_staff",
    description: "List Hogwarts staff.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },
  {
    name: "hp_by_house",
    description: "List characters by Hogwarts house.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        house: { type: "string", description: "House name: gryffindor, slytherin, hufflepuff, or ravenclaw" },
      },
      required: ["house"],
    },
  },

  // ── emojihub-tool.ts ───────────────────────────────────────────────────────
  {
    name: "emojihub_random",
    description: "Get a random emoji with name, category, and HTML/Unicode codes.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {} },
  },
  {
    name: "emojihub_by_category",
    description: "Browse emojis by category (smileys, animals, food, etc.).",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        category: { type: "string", description: "Category slug (e.g. smileys-and-people, animals-and-nature)" },
      },
      required: ["category"],
    },
  },

  // ── avatarapi-tool.ts ───────────────────────────────────────────────────────
  {
    name: "avatar_url",
    description: "Generate a text-based avatar image URL with initials.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        name: { type: "string", description: "Name for the avatar initials (default User)" },
        size: { type: "number", description: "Size in pixels (default 200)" },
        background: { type: "string", description: "Background hex color or 'random'" },
        color: { type: "string", description: "Text hex color (default fff)" },
        format: { type: "string", description: "Format: svg or png (default svg)" },
      },
    },
  },

  // ── robohash-tool.ts ───────────────────────────────────────────────────────
  {
    name: "robohash_url",
    description: "Generate a unique robot/monster/cat avatar from any text.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        text: { type: "string", description: "Text seed for the avatar (default robot)" },
        size: { type: "number", description: "Size in pixels (default 300)" },
        set: { type: "string", description: "Style: set1 (robots), set2 (monsters), set3 (heads), set4 (cats), set5 (humans)" },
        bg: { type: "string", description: "Background: bg1 or bg2" },
      },
    },
  },

  // ── openlib2-tool.ts (gutendex/project gutenberg) ─────────────────────────
  {
    name: "gutenberg_search",
    description: "Search Project Gutenberg free ebooks by title or author.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        query: { type: "string", description: "Search term (title or author)" },
      },
      required: ["query"],
    },
  },
  {
    name: "gutenberg_book",
    description: "Get details for a specific Project Gutenberg book by ID.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        id: { type: "number", description: "Numeric book ID from Project Gutenberg" },
      },
      required: ["id"],
    },
  },

  // ── countryflag-tool.ts ────────────────────────────────────────────────────
  {
    name: "country_flag_url",
    description: "Get a country flag image URL by ISO 2-letter code.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        country_code: { type: "string", description: "2-letter ISO country code (e.g. US, GB, AU)" },
        style: { type: "string", description: "flat (PNG) or svg (default flat)" },
        size: { type: "number", description: "Size: 16, 32, 48, or 64 (default 64)" },
      },
      required: ["country_code"],
    },
  },

  // ── mediawiki-tool.ts ──────────────────────────────────────────────────────
  {
    name: "wiktionary_lookup",
    description: "Look up a word definition in Wiktionary (multi-language).",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        word: { type: "string", description: "Word to look up" },
        language: { type: "string", description: "Language code (default en)" },
      },
      required: ["word"],
    },
  },

  // ── bibleverse-tool.ts (quran) ─────────────────────────────────────────────
  {
    name: "quran_verse",
    description: "Get a specific verse (ayah) from the Quran with English translation.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        surah: { type: "number", description: "Surah number (1-114, default 1)" },
        ayah: { type: "number", description: "Ayah (verse) number within the surah" },
      },
    },
  },
  {
    name: "quran_surah",
    description: "Get a full surah (chapter) from the Quran.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        number: { type: "number", description: "Surah number (1-114, default 1)" },
      },
    },
  },

  // ── urlhaus-tool.ts ────────────────────────────────────────────────────────
  {
    name: "urlhaus_lookup_url",
    description: "Check if a URL is listed as a malware distribution site in the URLhaus database.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        url: { type: "string", description: "The URL to look up" },
      },
      required: ["url"],
    },
  },
  {
    name: "urlhaus_recent",
    description: "Get recent malware URLs added to the URLhaus database.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {},
    },
  },

  // ── tvmaze-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "tvmaze_search",
    description: "Search for TV shows by name.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        query: { type: "string", description: "Show name to search for" },
      },
      required: ["query"],
    },
  },
  {
    name: "tvmaze_show",
    description: "Get full details for a TV show by its TVmaze ID.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        id: { type: "number", description: "TVmaze show ID" },
      },
      required: ["id"],
    },
  },
  {
    name: "tvmaze_schedule",
    description: "Get the TV schedule for a country and date.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        country: { type: "string", description: "ISO 3166-1 country code (default US)" },
        date: { type: "string", description: "Date in YYYY-MM-DD format (default today)" },
      },
    },
  },

  // ── freetogame-tool.ts ──────────────────────────────────────────────────────
  {
    name: "freetogame_list",
    description: "Browse free-to-play games, optionally filtered by platform or category.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        platform: { type: "string", description: "Filter: pc, browser, or all (default all)" },
        category: { type: "string", description: "Filter: mmorpg, shooter, moba, strategy, etc." },
        sort_by: { type: "string", description: "Sort: relevance, popularity, release-date, alphabetical" },
      },
    },
  },
  {
    name: "freetogame_detail",
    description: "Get full details for a specific free-to-play game.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        id: { type: "number", description: "Game ID from freetogame" },
      },
      required: ["id"],
    },
  },

  // ── cheapshark-tool.ts ──────────────────────────────────────────────────────
  {
    name: "cheapshark_deals",
    description: "Search for game deals across multiple stores (Steam, GOG, etc.).",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        title: { type: "string", description: "Game title to search for" },
        upper_price: { type: "number", description: "Max price filter" },
        lower_price: { type: "number", description: "Min price filter" },
        store_id: { type: "string", description: "Store ID to filter (use cheapshark_stores to find IDs)" },
        sort_by: { type: "string", description: "Sort: Deal Rating, Title, Savings, Price, Store, recent" },
        limit: { type: "number", description: "Number of results (default 10)" },
      },
    },
  },
  {
    name: "cheapshark_stores",
    description: "List all game stores tracked by CheapShark.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {},
    },
  },

  // ── iseven-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "is_even",
    description: "Check whether a number is even, via the isEven API.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        number: { type: "number", description: "The number to check" },
      },
      required: ["number"],
    },
  },

  // ── iceandfire-tool.ts (Game of Thrones / ASOIAF) ──────────────────────────
  {
    name: "iceandfire_characters",
    description: "Search characters from A Song of Ice and Fire (Game of Thrones).",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        name: { type: "string", description: "Character name to search for" },
        limit: { type: "number", description: "Results per page (default 10)" },
      },
    },
  },
  {
    name: "iceandfire_books",
    description: "List or search books in the A Song of Ice and Fire series.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        name: { type: "string", description: "Book title to search for" },
      },
    },
  },
  {
    name: "iceandfire_houses",
    description: "Search noble houses from A Song of Ice and Fire (Game of Thrones).",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        name: { type: "string", description: "House name to search for" },
        limit: { type: "number", description: "Results per page (default 10)" },
      },
    },
  },

  // ── randomuser-tool.ts ───────────────────────────────────────────────────────
  {
    name: "random_user",
    description: "Generate random user profiles with names, emails, addresses, and photos.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        count: { type: "number", description: "Number of users to generate (default 1)" },
        gender: { type: "string", description: "Filter by gender: male or female" },
        nationality: { type: "string", description: "ISO 3166-1 alpha-2 codes, comma-separated (e.g. US,GB,AU)" },
      },
    },
  },

  // ── digimon-tool.ts ─────────────────────────────────────────────────────────
  {
    name: "digimon_all",
    description: "List all Digimon with names, images, and levels.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {},
    },
  },
  {
    name: "digimon_by_name",
    description: "Look up a specific Digimon by name.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        name: { type: "string", description: "Digimon name (e.g. Agumon, Greymon)" },
      },
      required: ["name"],
    },
  },
  {
    name: "digimon_by_level",
    description: "List Digimon filtered by evolution level.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        level: { type: "string", description: "Level: Fresh, In Training, Rookie, Champion, Ultimate, or Mega" },
      },
      required: ["level"],
    },
  },

  // ── stapi-tool.ts (Star Trek) ───────────────────────────────────────────────
  {
    name: "stapi_search_character",
    description: "Search Star Trek characters by name.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        name: { type: "string", description: "Character name to search for" },
      },
      required: ["name"],
    },
  },
  {
    name: "stapi_search_species",
    description: "Search Star Trek species by name.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        name: { type: "string", description: "Species name (e.g. Vulcan, Klingon)" },
      },
      required: ["name"],
    },
  },
  {
    name: "stapi_search_starship",
    description: "Search Star Trek starships/spacecraft by name.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        name: { type: "string", description: "Starship name (e.g. Enterprise)" },
      },
      required: ["name"],
    },
  },

  // ── breakingbad-tool.ts ─────────────────────────────────────────────────────
  {
    name: "breaking_bad_quote",
    description: "Get random Breaking Bad quotes.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        count: { type: "number", description: "Number of quotes (default 1)" },
      },
    },
  },

  // ── tacofancy-tool.ts ───────────────────────────────────────────────────────
  {
    name: "random_taco",
    description: "Generate a random taco recipe with base, seasoning, condiment, and shell.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {},
    },
  },

  // ── publicapis-tool.ts ──────────────────────────────────────────────────────
  {
    name: "publicapis_search",
    description: "Search the Public APIs directory for free APIs by name or category.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        title: { type: "string", description: "API name to search for" },
        category: { type: "string", description: "Category filter (use publicapis_categories for list)" },
        https: { type: "boolean", description: "Filter HTTPS-only APIs" },
        auth: { type: "string", description: "Auth type filter: apiKey, OAuth, or empty for none" },
      },
    },
  },
  {
    name: "publicapis_categories",
    description: "List all categories in the Public APIs directory.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {},
    },
  },
  {
    name: "publicapis_random",
    description: "Get a random API from the Public APIs directory.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {},
    },
  },

  // ── wger-tool.ts (workout database) ──────────────────────────────────────────
  {
    name: "wger_exercises",
    description: "Search and browse exercises from the wger workout database.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        search: { type: "string", description: "Exercise name to search for" },
        category: { type: "number", description: "Category ID (use wger_categories for list)" },
        limit: { type: "number", description: "Results per page (default 20)" },
      },
    },
  },
  {
    name: "wger_categories",
    description: "List exercise categories from the wger workout database.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {},
    },
  },
  {
    name: "wger_muscles",
    description: "List muscle groups from the wger workout database.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {},
    },
  },

  // ── animechan-tool.ts ───────────────────────────────────────────────────────
  {
    name: "animechan_random",
    description: "Get a random anime quote.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {},
    },
  },
  {
    name: "animechan_search",
    description: "Search for anime quotes from a specific anime.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        anime: { type: "string", description: "Anime title to search quotes from" },
      },
      required: ["anime"],
    },
  },

  // ── lotr-tool.ts (Lord of the Rings) ───────────────────────────────────────
  {
    name: "lotr_books",
    description: "List Lord of the Rings books.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {},
    },
  },
  {
    name: "lotr_characters",
    description: "Search Lord of the Rings characters by name.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        name: { type: "string", description: "Character name to search for" },
        limit: { type: "number", description: "Results per page (default 10)" },
      },
    },
  },
  {
    name: "lotr_quotes",
    description: "Get Lord of the Rings movie quotes.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        limit: { type: "number", description: "Number of quotes (default 10)" },
      },
    },
  },

  // ── coinpaprika-tool.ts ─────────────────────────────────────────────────────
  {
    name: "coinpaprika_global",
    description: "Get global cryptocurrency market stats from Coinpaprika.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {},
    },
  },
  {
    name: "coinpaprika_coin",
    description: "Get detailed info about a cryptocurrency from Coinpaprika.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        id: { type: "string", description: "Coin ID (e.g. btc-bitcoin, eth-ethereum)" },
      },
      required: ["id"],
    },
  },
  {
    name: "coinpaprika_ticker",
    description: "Get live price/ticker data from Coinpaprika. Without id, returns top 20.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        id: { type: "string", description: "Coin ID for specific ticker (optional)" },
      },
    },
  },

  // ── openfda-tool.ts ─────────────────────────────────────────────────────────
  {
    name: "openfda_drug_search",
    description: "Search FDA drug labels by brand name or ingredient.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        query: { type: "string", description: "Drug name or ingredient to search for" },
        limit: { type: "number", description: "Number of results (default 5)" },
      },
      required: ["query"],
    },
  },
  {
    name: "openfda_recall_search",
    description: "Search FDA food and drug recall enforcement actions.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        query: { type: "string", description: "Product or reason to search for" },
        limit: { type: "number", description: "Number of results (default 5)" },
      },
      required: ["query"],
    },
  },
  {
    name: "openfda_adverse_events",
    description: "Search FDA drug adverse event reports.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        drug: { type: "string", description: "Drug name to search adverse events for" },
        limit: { type: "number", description: "Number of results (default 5)" },
      },
      required: ["drug"],
    },
  },

  // ── funtranslations-tool.ts ─────────────────────────────────────────────────
  {
    name: "fun_translate",
    description: "Translate text into fun dialects like Yoda, Pirate, Shakespeare, Minion, Dothraki, etc.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        text: { type: "string", description: "Text to translate" },
        dialect: { type: "string", description: "Dialect: yoda, pirate, shakespeare, minion, dothraki, valyrian, pig-latin, morse (default yoda)" },
      },
      required: ["text"],
    },
  },

  // ── datamuse-tool.ts ─────────────────────────────────────────────────────────
  {
    name: "datamuse_words",
    description: "Find words by meaning, sound, spelling, rhyme, or adjective/noun relationship.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        means_like: { type: "string", description: "Words with similar meaning" },
        sounds_like: { type: "string", description: "Words that sound similar" },
        spelled_like: { type: "string", description: "Wildcard pattern (? = one char, * = any)" },
        rhymes_with: { type: "string", description: "Words that rhyme" },
        adjectives_for: { type: "string", description: "Adjectives commonly used with this noun" },
        nouns_for: { type: "string", description: "Nouns commonly described by this adjective" },
        limit: { type: "number", description: "Max results (default 20)" },
      },
    },
  },
  {
    name: "datamuse_suggestions",
    description: "Get autocomplete suggestions for a word prefix.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        prefix: { type: "string", description: "Word prefix to autocomplete" },
        limit: { type: "number", description: "Max results (default 10)" },
      },
      required: ["prefix"],
    },
  },

  // ── balldontlie-tool.ts (NBA) ───────────────────────────────────────────────
  {
    name: "nba_players",
    description: "Search NBA players by name.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        search: { type: "string", description: "Player name to search for" },
        limit: { type: "number", description: "Results per page (default 25)" },
      },
    },
  },
  {
    name: "nba_teams",
    description: "List all NBA teams.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {},
    },
  },
  {
    name: "nba_games",
    description: "Browse NBA game scores and results.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        season: { type: "number", description: "Season year (e.g. 2023)" },
        team_id: { type: "number", description: "Filter by team ID (use nba_teams for IDs)" },
        limit: { type: "number", description: "Results per page (default 10)" },
      },
    },
  },

  // ── worldbank-tool.ts ───────────────────────────────────────────────────────
  {
    name: "worldbank_country",
    description: "Get country info from the World Bank. Pass a code (US, GB) or omit for all.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        code: { type: "string", description: "ISO 3166-1 alpha-2 or alpha-3 code (default all)" },
      },
    },
  },
  {
    name: "worldbank_indicator",
    description: "Get economic/development indicator data from the World Bank.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        country: { type: "string", description: "Country code (default US)" },
        indicator: { type: "string", description: "Indicator ID (e.g. NY.GDP.MKTP.CD for GDP, SP.POP.TOTL for population)" },
        date: { type: "string", description: "Year range (e.g. 2015:2023, default last 8 years)" },
      },
      required: ["indicator"],
    },
  },

  // ── carbonintensity-tool.ts (UK grid) ───────────────────────────────────────
  {
    name: "carbon_intensity_current",
    description: "Get current UK electricity grid carbon intensity (gCO2/kWh).",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {},
    },
  },
  {
    name: "carbon_intensity_forecast",
    description: "Get 24-hour forecast of UK grid carbon intensity.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {},
    },
  },
  {
    name: "carbon_intensity_generation",
    description: "Get current UK electricity generation mix by fuel type.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {},
    },
  },

  // ── lyrics-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "lyrics_get",
    description: "Get song lyrics by artist and title.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        artist: { type: "string", description: "Artist/band name" },
        title: { type: "string", description: "Song title" },
      },
      required: ["artist", "title"],
    },
  },

  // ── urbandictionary-tool.ts ─────────────────────────────────────────────────
  {
    name: "urban_define",
    description: "Look up slang definitions on Urban Dictionary.",
    inputSchema: {
      type: "object" as const, additionalProperties: false,
      properties: {
        term: { type: "string", description: "Slang term to define" },
      },
      required: ["term"],
    },
  },
  {
    name: "urban_random",
    description: "Get random Urban Dictionary definitions.",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {},
    },
  },

  // ── nasa-tool.ts ─────────────────────────────────────────────────────────────
  {
    name: "nasa_apod",
    description: "Get NASA Astronomy Picture of the Day.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        date: { type: "string" },
        count: { type: "number" },
        api_key: { type: "string" },
      },
    },
  },
  {
    name: "nasa_asteroids",
    description: "Get NASA Near Earth Object (asteroid) data.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        start_date: { type: "string" },
        end_date: { type: "string" },
        api_key: { type: "string" },
      },
    },
  },
  {
    name: "nasa_mars_photos",
    description: "Get NASA Mars rover photos.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        rover: { type: "string", enum: ["curiosity", "opportunity", "spirit", "perseverance"], description: "curiosity, opportunity, spirit" },
        sol: { type: "number" },
        earth_date: { type: "string" },
        camera: { type: "string" },
        api_key: { type: "string" },
      },
    },
  },
  {
    name: "nasa_earth_imagery",
    description: "Get NASA Earth satellite imagery.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        lat: { type: "number" },
        lon: { type: "number" },
        date: { type: "string" },
        dim: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["lat", "lon"],
    },
  },
  {
    name: "nasa_epic",
    description: "Get NASA EPIC Earth imagery.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        date: { type: "string" },
        api_key: { type: "string" },
      },
    },
  },

  // ── openmeteo-tool.ts ────────────────────────────────────────────────────────
  {
    name: "weather_current",
    description: "Get current weather for a location from Open-Meteo (no API key required).",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        latitude: { type: "number" },
        longitude: { type: "number" },
        timezone: { type: "string" },
      },
      required: ["latitude", "longitude"],
    },
  },
  {
    name: "weather_forecast",
    description: "Get weather forecast for a location from Open-Meteo.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        latitude: { type: "number" },
        longitude: { type: "number" },
        days: { type: "number" },
        timezone: { type: "string" },
      },
      required: ["latitude", "longitude"],
    },
  },
  {
    name: "weather_hourly",
    description: "Get hourly weather forecast from Open-Meteo.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        latitude: { type: "number" },
        longitude: { type: "number" },
        days: { type: "number" },
        timezone: { type: "string" },
      },
      required: ["latitude", "longitude"],
    },
  },

  // ── radiobrowser-tool.ts ─────────────────────────────────────────────────────
  {
    name: "radio_search",
    description: "Search for radio stations via Radio Browser.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        name: { type: "string" },
        limit: { type: "number" },
      },
      required: ["name"],
    },
  },
  {
    name: "radio_by_country",
    description: "Get radio stations by country.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        country: { type: "string" },
        limit: { type: "number" },
      },
      required: ["country"],
    },
  },
  {
    name: "radio_top_clicked",
    description: "Get the most-clicked radio stations.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        limit: { type: "number" },
      },
    },
  },
  {
    name: "radio_top_voted",
    description: "Get the most-voted radio stations.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        limit: { type: "number" },
      },
    },
  },
  {
    name: "radio_by_tag",
    description: "Get radio stations by genre tag.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        tag: { type: "string" },
        limit: { type: "number" },
      },
      required: ["tag"],
    },
  },
  {
    name: "radio_countries",
    description: "List all countries with radio stations.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {},
    },
  },

  // ── gdelt-tool.ts ────────────────────────────────────────────────────────────
  {
    name: "gdelt_news_search",
    description: "Search global news via the GDELT Project. Returns article titles, URLs, sources, dates, countries, and languages. No API key required.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        query: { type: "string", description: "Search query (keywords, phrases, or operators)" },
        maxrecords: { type: "number", description: "Max articles to return (default 25, max 250)" },
        startdatetime: { type: "string", description: "Start datetime YYYYMMDDHHMMSS (UTC)" },
        enddatetime: { type: "string", description: "End datetime YYYYMMDDHHMMSS (UTC)" },
        sourcelang: { type: "string", description: "Filter by source language (e.g. 'english', 'spanish')" },
        sourcecountry: { type: "string", description: "Filter by source country code (e.g. 'US', 'GB', 'AU')" },
      },
      required: ["query"],
    },
  },
  {
    name: "gdelt_tone_analysis",
    description: "Analyse the sentiment and tone of global news coverage for a topic over time. Returns average tone scores (negative = negative coverage, positive = positive), trend summary, and timeline. Great for brand monitoring or tracking public sentiment.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        query: { type: "string", description: "Topic or keyword to analyse" },
        timespan: { type: "string", description: "Time window (e.g. '24h', '7d', '1month')" },
        sourcelang: { type: "string", description: "Filter by source language" },
        sourcecountry: { type: "string", description: "Filter by source country code" },
      },
      required: ["query"],
    },
  },
  {
    name: "gdelt_geo_events",
    description: "Get geographic distribution of news events for a topic from the GDELT GEO API. Returns event clusters with location, article count, and tone score.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        query: { type: "string", description: "Topic or keyword to map" },
        maxpoints: { type: "number", description: "Max location clusters to return (default 50, max 250)" },
        timespan: { type: "string", description: "Time window (e.g. '24h', '7d')" },
      },
      required: ["query"],
    },
  },
  {
    name: "gdelt_trending",
    description: "Check whether a topic is trending in global news using GDELT article volume timelines. Returns a trend classification (surging, rising, stable, declining, fading) and volume data over time.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        query: { type: "string", description: "Topic or keyword to check" },
        timespan: { type: "string", description: "Time window (e.g. '24h', '7d', '1month')" },
        sourcelang: { type: "string", description: "Filter by source language" },
      },
      required: ["query"],
    },
  },

  // ── numbers-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "number_fact",
    description: "Get an interesting fact about a number.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        number: { type: "number" },
        type: { type: "string", enum: ["trivia", "math", "date", "year"], description: "trivia, math, date, year" },
      },
      required: ["number"],
    },
  },
  {
    name: "number_random",
    description: "Get a random number fact.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        type: { type: "string" },
        min: { type: "number" },
        max: { type: "number" },
      },
    },
  },

  // ── omdb-tool.ts ─────────────────────────────────────────────────────────────
  {
    name: "omdb_search",
    description: "Search movies/TV shows on OMDB.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        s: { type: "string", description: "Search term" },
        type: { type: "string" },
        y: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["s"],
    },
  },
  {
    name: "omdb_by_title",
    description: "Get an OMDB movie/show by title.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        t: { type: "string" },
        type: { type: "string" },
        y: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["t"],
    },
  },
  {
    name: "omdb_by_id",
    description: "Get an OMDB movie/show by IMDb ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        i: { type: "string", description: "IMDb ID" },
        api_key: { type: "string" },
      },
      required: ["i"],
    },
  },

  // ── openlibrary-tool.ts ──────────────────────────────────────────────────────
  {
    name: "openlibrary_search",
    description: "Search books on Open Library.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        q: { type: "string" },
        limit: { type: "number" },
        page: { type: "number" },
      },
      required: ["q"],
    },
  },
  {
    name: "openlibrary_get_book",
    description: "Get a book from Open Library by work ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        work_id: { type: "string", description: "e.g. OL45804W" },
      },
      required: ["work_id"],
    },
  },
  {
    name: "openlibrary_get_edition",
    description: "Get a book edition from Open Library by ISBN.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        isbn: { type: "string" },
      },
      required: ["isbn"],
    },
  },
  {
    name: "openlibrary_get_author",
    description: "Get an author from Open Library by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        author_id: { type: "string", description: "e.g. OL23919A" },
      },
      required: ["author_id"],
    },
  },
  {
    name: "openlibrary_author_works",
    description: "Get works by an author from Open Library.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        author_id: { type: "string" },
        limit: { type: "number" },
      },
      required: ["author_id"],
    },
  },
  {
    name: "openlibrary_trending",
    description: "Get trending books from Open Library.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {},
    },
  },

  // ── musicbrainz-tool.ts ──────────────────────────────────────────────────────
  {
    name: "mb_search_artists",
    description: "Search for artists on MusicBrainz.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        query: { type: "string" },
        limit: { type: "number" },
      },
      required: ["query"],
    },
  },
  {
    name: "mb_search_releases",
    description: "Search for releases/albums on MusicBrainz.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        query: { type: "string" },
        artist: { type: "string" },
        limit: { type: "number" },
      },
      required: ["query"],
    },
  },
  {
    name: "mb_search_recordings",
    description: "Search for recordings/tracks on MusicBrainz.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        query: { type: "string" },
        artist: { type: "string" },
        limit: { type: "number" },
      },
      required: ["query"],
    },
  },
  {
    name: "mb_get_artist",
    description: "Get a MusicBrainz artist by MBID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        mbid: { type: "string" },
      },
      required: ["mbid"],
    },
  },
  {
    name: "mb_get_release",
    description: "Get a MusicBrainz release by MBID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        mbid: { type: "string" },
      },
      required: ["mbid"],
    },
  },

  // ── genius-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "genius_search",
    description: "Search Genius for songs and lyrics.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        q: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["q"],
    },
  },
  {
    name: "genius_get_song",
    description: "Get a Genius song by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        id: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["id"],
    },
  },
  {
    name: "genius_get_artist",
    description: "Get a Genius artist by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        id: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["id"],
    },
  },
  {
    name: "genius_artist_songs",
    description: "Get songs by an artist on Genius.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        id: { type: "number" },
        per_page: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["id"],
    },
  },

  // ── ticketmaster-tool.ts ─────────────────────────────────────────────────────
  {
    name: "tm_search_events",
    description: "Search for events on Ticketmaster.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        keyword: { type: "string" },
        city: { type: "string" },
        countryCode: { type: "string" },
        classificationName: { type: "string" },
        startDateTime: { type: "string" },
        size: { type: "number" },
        api_key: { type: "string" },
      },
    },
  },
  {
    name: "tm_get_event",
    description: "Get details for a specific Ticketmaster event.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        id: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["id"],
    },
  },
  {
    name: "tm_search_venues",
    description: "Search for venues on Ticketmaster.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        keyword: { type: "string" },
        countryCode: { type: "string" },
        stateCode: { type: "string" },
        api_key: { type: "string" },
      },
    },
  },
  {
    name: "tm_get_venue",
    description: "Get details for a specific Ticketmaster venue.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        id: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["id"],
    },
  },
  {
    name: "tm_search_attractions",
    description: "Search for attractions/artists on Ticketmaster.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        keyword: { type: "string" },
        classificationName: { type: "string" },
        api_key: { type: "string" },
      },
    },
  },

  // ── seatgeek-tool.ts ─────────────────────────────────────────────────────────
  {
    name: "seatgeek_search_events",
    description: "Search for events on SeatGeek.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        q: { type: "string" },
        type: { type: "string" },
        datetime_utc_gte: { type: "string" },
        per_page: { type: "number" },
        api_key: { type: "string" },
      },
    },
  },
  {
    name: "seatgeek_get_event",
    description: "Get a SeatGeek event by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        id: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["id"],
    },
  },
  {
    name: "seatgeek_search_performers",
    description: "Search for performers on SeatGeek.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        q: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["q"],
    },
  },
  {
    name: "seatgeek_get_performer",
    description: "Get a SeatGeek performer by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        id: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["id"],
    },
  },
  {
    name: "seatgeek_search_venues",
    description: "Search for venues on SeatGeek.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        q: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["q"],
    },
  },
  {
    name: "seatgeek_get_venue",
    description: "Get a SeatGeek venue by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        id: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["id"],
    },
  },

  // ── eventbrite-tool.ts ───────────────────────────────────────────────────────
  {
    name: "eventbrite_search_events",
    description: "Search for events on Eventbrite.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        q: { type: "string" },
        location_address: { type: "string" },
        start_date_range_start: { type: "string" },
        api_key: { type: "string" },
      },
    },
  },
  {
    name: "eventbrite_get_event",
    description: "Get details for an Eventbrite event by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        event_id: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["event_id"],
    },
  },
  {
    name: "eventbrite_get_attendees",
    description: "Get attendees for an Eventbrite event.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        event_id: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["event_id"],
    },
  },
  {
    name: "eventbrite_create_event",
    description: "Create an event on Eventbrite under an organization.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        name: { type: "string", description: "Event name/title" },
        organization_id: { type: "string", description: "Eventbrite organization id that will own the event" },
        start_utc: { type: "string", description: "Start time in UTC, e.g. 2026-07-01T19:00:00Z" },
        end_utc: { type: "string", description: "End time in UTC, e.g. 2026-07-01T21:00:00Z" },
        timezone: { type: "string", description: "IANA timezone, e.g. America/New_York" },
        currency: { type: "string", description: "ISO currency code, e.g. USD" },
        venue_id: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["name", "organization_id", "start_utc", "end_utc", "timezone", "currency"],
    },
  },
  {
    name: "eventbrite_list_categories",
    description: "List Eventbrite event categories.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
      },
    },
  },
  {
    name: "eventbrite_get_venue",
    description: "Get details for an Eventbrite venue.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        venue_id: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["venue_id"],
    },
  },

  // ── foursquare-tool.ts ───────────────────────────────────────────────────────
  {
    name: "foursquare_search_places",
    description: "Search for places on Foursquare.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        query: { type: "string" },
        ll: { type: "string", description: "lat,lng" },
        near: { type: "string" },
        limit: { type: "number" },
        api_key: { type: "string" },
      },
    },
  },
  {
    name: "foursquare_get_place",
    description: "Get details for a Foursquare place by FSQ ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        fsq_id: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["fsq_id"],
    },
  },
  {
    name: "foursquare_get_photos",
    description: "Get photos for a Foursquare place.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        fsq_id: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["fsq_id"],
    },
  },
  {
    name: "foursquare_get_tips",
    description: "Get tips/reviews for a Foursquare place.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        fsq_id: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["fsq_id"],
    },
  },
  {
    name: "foursquare_autocomplete",
    description: "Autocomplete a Foursquare place search.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        query: { type: "string" },
        ll: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["query"],
    },
  },

  // ── lastfm-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "lastfm_artist_info",
    description: "Get Last.fm artist info.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        artist: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["artist"],
    },
  },
  {
    name: "lastfm_search_artists",
    description: "Search for artists on Last.fm.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        artist: { type: "string" },
        limit: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["artist"],
    },
  },
  {
    name: "lastfm_top_tracks",
    description: "Get top tracks for an artist on Last.fm.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        artist: { type: "string" },
        limit: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["artist"],
    },
  },
  {
    name: "lastfm_similar_artists",
    description: "Get similar artists on Last.fm.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        artist: { type: "string" },
        limit: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["artist"],
    },
  },
  {
    name: "lastfm_chart_top_artists",
    description: "Get the Last.fm chart of top artists.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        limit: { type: "number" },
        api_key: { type: "string" },
      },
    },
  },
  {
    name: "lastfm_chart_top_tracks",
    description: "Get the Last.fm chart of top tracks.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        limit: { type: "number" },
        api_key: { type: "string" },
      },
    },
  },
  {
    name: "lastfm_album_info",
    description: "Get album info from Last.fm.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        artist: { type: "string" },
        album: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["artist", "album"],
    },
  },

  // ── discogs-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "discogs_search_releases",
    description: "Search for music releases on Discogs.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        q: { type: "string" },
        artist: { type: "string" },
        type: { type: "string" },
        format: { type: "string" },
        genre: { type: "string" },
        year: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["q"],
    },
  },
  {
    name: "discogs_get_release",
    description: "Get a Discogs release by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        release_id: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["release_id"],
    },
  },
  {
    name: "discogs_get_artist",
    description: "Get a Discogs artist by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        artist_id: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["artist_id"],
    },
  },
  {
    name: "discogs_search_artists",
    description: "Search for artists on Discogs.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        q: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["q"],
    },
  },
  {
    name: "discogs_marketplace_stats",
    description: "Get Discogs marketplace stats for a release.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        release_id: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["release_id"],
    },
  },
  {
    name: "discogs_get_label",
    description: "Get a Discogs record label by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        label_id: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["label_id"],
    },
  },

  // ── setlistfm-tool.ts ────────────────────────────────────────────────────────
  {
    name: "setlistfm_search_artist",
    description: "Search for an artist on Setlist.fm.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        artistName: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["artistName"],
    },
  },
  {
    name: "setlistfm_artist_setlists",
    description: "Get setlists for an artist on Setlist.fm.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        mbid: { type: "string" },
        page: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["mbid"],
    },
  },
  {
    name: "setlistfm_search_setlists",
    description: "Search setlists on Setlist.fm.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        artistName: { type: "string" },
        cityName: { type: "string" },
        year: { type: "number" },
        api_key: { type: "string" },
      },
    },
  },
  {
    name: "setlistfm_get_setlist",
    description: "Get a specific setlist from Setlist.fm by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        setlistId: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["setlistId"],
    },
  },

  // ── bandsintown-tool.ts ──────────────────────────────────────────────────────
  {
    name: "bandsintown_artist",
    description: "Get an artist profile from Bandsintown.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        artist: { type: "string" },
        app_id: { type: "string" },
      },
      required: ["artist"],
    },
  },
  {
    name: "bandsintown_events",
    description: "Get upcoming events for an artist on Bandsintown.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        artist: { type: "string" },
        date: { type: "string" },
        app_id: { type: "string" },
      },
      required: ["artist"],
    },
  },
  {
    name: "bandsintown_recommended",
    description: "Get recommended events for an artist on Bandsintown.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        artist: { type: "string" },
        location: { type: "string" },
        app_id: { type: "string" },
      },
      required: ["artist"],
    },
  },

  // ── podcastindex-tool.ts ─────────────────────────────────────────────────────
  {
    name: "podcast_search",
    description: "Search for podcasts on Podcast Index.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        q: { type: "string" },
        max: { type: "number" },
        api_key: { type: "string" },
        api_secret: { type: "string" },
      },
      required: ["q"],
    },
  },
  {
    name: "podcast_by_feed_url",
    description: "Get a podcast by feed URL from Podcast Index.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        url: { type: "string" },
        api_key: { type: "string" },
        api_secret: { type: "string" },
      },
      required: ["url"],
    },
  },
  {
    name: "podcast_get_episodes",
    description: "Get episodes for a podcast from Podcast Index.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        id: { type: "number" },
        max: { type: "number" },
        api_key: { type: "string" },
        api_secret: { type: "string" },
      },
      required: ["id"],
    },
  },
  {
    name: "podcast_search_episodes",
    description: "Search podcast episodes on Podcast Index.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        q: { type: "string" },
        max: { type: "number" },
        api_key: { type: "string" },
        api_secret: { type: "string" },
      },
      required: ["q"],
    },
  },
  {
    name: "podcast_trending",
    description: "Get trending podcasts from Podcast Index.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        max: { type: "number" },
        lang: { type: "string" },
        api_key: { type: "string" },
        api_secret: { type: "string" },
      },
    },
  },
  {
    name: "podcast_recent_episodes",
    description: "Get recent podcast episodes from Podcast Index.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        max: { type: "number" },
        api_key: { type: "string" },
        api_secret: { type: "string" },
      },
    },
  },

  // ── lichess-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "lichess_user",
    description: "Get a Lichess user profile.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        username: { type: "string" },
      },
      required: ["username"],
    },
  },
  {
    name: "lichess_user_games",
    description: "Get games for a Lichess user.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        username: { type: "string" },
        max: { type: "number" },
        perfType: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["username"],
    },
  },
  {
    name: "lichess_puzzle_daily",
    description: "Get the Lichess daily puzzle.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {},
    },
  },
  {
    name: "lichess_top_players",
    description: "Get top Lichess players for a game mode.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        perfType: { type: "string", enum: ["ultraBullet", "bullet", "blitz", "rapid", "classical", "chess960", "crazyhouse", "antichess", "atomic", "horde", "kingOfTheHill", "racingKings", "threeCheck"], description: "bullet, blitz, rapid, classical, etc." },
        nb: { type: "number" },
      },
    },
  },
  {
    name: "lichess_tournament",
    description: "Get details for a Lichess tournament.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        tournament_id: { type: "string" },
      },
      required: ["tournament_id"],
    },
  },

  // ── chessdotcom-tool.ts ──────────────────────────────────────────────────────
  {
    name: "chess_player",
    description: "Get a Chess.com player profile.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        username: { type: "string" },
      },
      required: ["username"],
    },
  },
  {
    name: "chess_player_stats",
    description: "Get Chess.com player statistics.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        username: { type: "string" },
      },
      required: ["username"],
    },
  },
  {
    name: "chess_player_games",
    description: "Get recent games for a Chess.com player.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        username: { type: "string" },
        year: { type: "number" },
        month: { type: "number" },
      },
      required: ["username"],
    },
  },
  {
    name: "chess_puzzles_random",
    description: "Get a random chess puzzle from Chess.com.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {},
    },
  },
  {
    name: "chess_leaderboards",
    description: "Get Chess.com leaderboards.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {},
    },
  },

  // ── fpl-tool.ts ──────────────────────────────────────────────────────────────
  {
    name: "fpl_bootstrap",
    description: "Get Fantasy Premier League bootstrap data (players, teams, etc.).",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {},
    },
  },
  {
    name: "fpl_player",
    description: "Get FPL player details and history.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        player_id: { type: "number" },
      },
      required: ["player_id"],
    },
  },
  {
    name: "fpl_gameweek",
    description: "Get FPL gameweek details.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        gameweek: { type: "number" },
      },
      required: ["gameweek"],
    },
  },
  {
    name: "fpl_fixtures",
    description: "Get FPL fixtures, optionally for a gameweek.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        gameweek: { type: "number" },
      },
    },
  },
  {
    name: "fpl_my_team",
    description: "Get an FPL manager's team for a gameweek.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        manager_id: { type: "number" },
        gameweek: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["manager_id", "gameweek"],
    },
  },
  {
    name: "fpl_manager",
    description: "Get an FPL manager profile.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        manager_id: { type: "number" },
      },
      required: ["manager_id"],
    },
  },
  {
    name: "fpl_leagues_classic",
    description: "Get FPL classic league standings.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        league_id: { type: "number" },
        page: { type: "number" },
      },
      required: ["league_id"],
    },
  },

  // ── guardian-tool.ts ─────────────────────────────────────────────────────────
  {
    name: "guardian_search_articles",
    description: "Search for articles on The Guardian.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        q: { type: "string" },
        section: { type: "string" },
        from_date: { type: "string" },
        to_date: { type: "string" },
        page_size: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["q"],
    },
  },
  {
    name: "guardian_get_article",
    description: "Get a specific Guardian article by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        article_id: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["article_id"],
    },
  },
  {
    name: "guardian_get_sections",
    description: "Get all Guardian sections.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
      },
    },
  },
  {
    name: "guardian_get_tags",
    description: "Get Guardian tags.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        q: { type: "string" },
        api_key: { type: "string" },
      },
    },
  },
  {
    name: "guardian_get_edition",
    description: "Get a Guardian edition by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        edition_id: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["edition_id"],
    },
  },

  // ── newsapi-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "news_top_headlines",
    description: "Get top headlines from NewsAPI.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        country: { type: "string" },
        category: { type: "string" },
        q: { type: "string" },
        pageSize: { type: "number" },
        api_key: { type: "string" },
      },
    },
  },
  {
    name: "news_search",
    description: "Search news articles via NewsAPI.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        q: { type: "string" },
        from: { type: "string" },
        to: { type: "string" },
        language: { type: "string" },
        sortBy: { type: "string" },
        pageSize: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["q"],
    },
  },
  {
    name: "news_get_sources",
    description: "Get available news sources from NewsAPI.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        country: { type: "string" },
        category: { type: "string" },
        language: { type: "string" },
        api_key: { type: "string" },
      },
    },
  },

  // ── alphavantage-tool.ts ─────────────────────────────────────────────────────
  {
    name: "stock_quote",
    description: "Get a real-time stock quote from Alpha Vantage.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        symbol: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["symbol"],
    },
  },
  {
    name: "stock_search",
    description: "Search for stock tickers on Alpha Vantage.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        keywords: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["keywords"],
    },
  },
  {
    name: "stock_daily",
    description: "Get daily stock price history from Alpha Vantage.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        symbol: { type: "string" },
        outputsize: { type: "string", enum: ["compact", "full"], description: "compact or full" },
        api_key: { type: "string" },
      },
      required: ["symbol"],
    },
  },
  {
    name: "stock_intraday",
    description: "Get intraday stock prices from Alpha Vantage.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        symbol: { type: "string" },
        interval: { type: "string", description: "1min, 5min, 15min, 30min, 60min" },
        api_key: { type: "string" },
      },
      required: ["symbol"],
    },
  },
  {
    name: "forex_rate",
    description: "Get a forex exchange rate from Alpha Vantage.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        from_currency: { type: "string" },
        to_currency: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["from_currency", "to_currency"],
    },
  },
  {
    name: "crypto_daily",
    description: "Get daily crypto price history from Alpha Vantage.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        symbol: { type: "string" },
        market: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["symbol"],
    },
  },

  // ── coingecko-tool.ts ────────────────────────────────────────────────────────
  {
    name: "crypto_price",
    description: "Get cryptocurrency prices from CoinGecko.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        ids: { type: "string", description: "Comma-separated coin IDs" },
        vs_currencies: { type: "string", description: "Comma-separated currency codes" },
      },
      required: ["ids"],
    },
  },
  {
    name: "crypto_coin",
    description: "Get detailed info for a cryptocurrency from CoinGecko.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        id: { type: "string" },
      },
      required: ["id"],
    },
  },
  {
    name: "crypto_search",
    description: "Search for cryptocurrencies on CoinGecko.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        query: { type: "string" },
      },
      required: ["query"],
    },
  },
  {
    name: "crypto_trending",
    description: "Get trending cryptocurrencies from CoinGecko.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {},
    },
  },
  {
    name: "crypto_top_coins",
    description: "Get top cryptocurrencies by market cap from CoinGecko.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        vs_currency: { type: "string" },
        per_page: { type: "number" },
        page: { type: "number" },
      },
    },
  },
  {
    name: "crypto_coin_history",
    description: "Get historical price data for a cryptocurrency from CoinGecko.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        id: { type: "string" },
        date: { type: "string", description: "DD-MM-YYYY" },
      },
      required: ["id", "date"],
    },
  },

  // ── coinmarketcap-tool.ts ────────────────────────────────────────────────────
  {
    name: "cmc_listings",
    description: "Get latest cryptocurrency listings from CoinMarketCap.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        limit: { type: "number" },
        convert: { type: "string" },
        api_key: { type: "string" },
      },
    },
  },
  {
    name: "cmc_quotes",
    description: "Get cryptocurrency quotes from CoinMarketCap.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        symbol: { type: "string" },
        id: { type: "string" },
        convert: { type: "string" },
        api_key: { type: "string" },
      },
    },
  },
  {
    name: "cmc_info",
    description: "Get cryptocurrency metadata from CoinMarketCap.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        symbol: { type: "string" },
        id: { type: "string" },
        api_key: { type: "string" },
      },
    },
  },
  {
    name: "cmc_trending",
    description: "Get trending cryptocurrencies from CoinMarketCap.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        limit: { type: "number" },
        api_key: { type: "string" },
      },
    },
  },
  {
    name: "cmc_global_metrics",
    description: "Get global cryptocurrency market metrics from CoinMarketCap.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
      },
    },
  },

  // ── openexchangerates-tool.ts ────────────────────────────────────────────────
  {
    name: "forex_latest",
    description: "Get latest forex exchange rates from Open Exchange Rates.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        base: { type: "string" },
        symbols: { type: "string" },
        api_key: { type: "string" },
      },
    },
  },
  {
    name: "forex_historical",
    description: "Get historical forex rates from Open Exchange Rates.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        date: { type: "string" },
        base: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["date"],
    },
  },
  {
    name: "forex_currencies",
    description: "List all currencies from Open Exchange Rates.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
      },
    },
  },
  {
    name: "forex_convert",
    description: "Convert a currency amount using Open Exchange Rates.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        from: { type: "string" },
        to: { type: "string" },
        amount: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["from", "to", "amount"],
    },
  },

  // ── wise-tool.ts ─────────────────────────────────────────────────────────────
  {
    name: "wise_exchange_rates",
    description: "Get exchange rates from Wise.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        source: { type: "string" },
        target: { type: "string" },
        api_key: { type: "string" },
      },
    },
  },
  {
    name: "wise_profile",
    description: "Get the authenticated Wise user profile.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
      },
    },
  },
  {
    name: "wise_accounts",
    description: "Get Wise accounts for a profile.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        profile_id: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["profile_id"],
    },
  },
  {
    name: "wise_create_quote",
    description: "Create a Wise money transfer quote.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        sourceCurrency: { type: "string" },
        targetCurrency: { type: "string" },
        sourceAmount: { type: "number" },
        targetAmount: { type: "number" },
        profile_id: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["sourceCurrency", "targetCurrency"],
    },
  },

  // ── ipapi-tool.ts ────────────────────────────────────────────────────────────
  {
    name: "ip_lookup",
    description: "Look up geolocation for an IP address.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        ip: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["ip"],
    },
  },
  {
    name: "ip_batch",
    description: "Batch IP address geolocation lookup.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        ips: { type: "array", items: {}, description: "Array of IP address strings" },
        api_key: { type: "string" },
      },
      required: ["ips"],
    },
  },

  // ── restcountries-tool.ts ────────────────────────────────────────────────────
  {
    name: "country_all",
    description: "Get all countries from REST Countries.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        fields: { type: "string" },
      },
    },
  },
  {
    name: "country_by_name",
    description: "Get a country by name from REST Countries.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        name: { type: "string" },
        fullText: { type: "boolean" },
      },
      required: ["name"],
    },
  },
  {
    name: "country_by_code",
    description: "Get a country by code from REST Countries.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        code: { type: "string" },
      },
      required: ["code"],
    },
  },
  {
    name: "country_by_region",
    description: "Get countries by region from REST Countries.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        region: { type: "string" },
      },
      required: ["region"],
    },
  },
  {
    name: "country_by_currency",
    description: "Get countries by currency from REST Countries.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        currency: { type: "string" },
      },
      required: ["currency"],
    },
  },
  {
    name: "country_by_language",
    description: "Get countries by language from REST Countries.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        language: { type: "string" },
      },
      required: ["language"],
    },
  },

  // ── tomorrowio-tool.ts ───────────────────────────────────────────────────────
  {
    name: "tomorrow_realtime",
    description: "Get realtime weather from Tomorrow.io.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        location: { type: "string", description: "lat,lon or place name" },
        units: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["location"],
    },
  },
  {
    name: "tomorrow_forecast",
    description: "Get a weather forecast from Tomorrow.io.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        location: { type: "string" },
        timesteps: { type: "string", enum: ["1h", "1d"], description: "1h or 1d" },
        units: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["location"],
    },
  },
  {
    name: "tomorrow_history",
    description: "Get historical weather data from Tomorrow.io.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        location: { type: "string" },
        startTime: { type: "string" },
        endTime: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["location", "startTime", "endTime"],
    },
  },

  // ── twitch-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "twitch_search_streams",
    description: "Search for live streams on Twitch.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        game_id: { type: "string" },
        user_login: { type: "string" },
        first: { type: "number" },
        client_id: { type: "string" },
        client_secret: { type: "string" },
      },
    },
  },
  {
    name: "twitch_get_stream",
    description: "Get a specific Twitch stream by user login.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        user_login: { type: "string" },
        client_id: { type: "string" },
        client_secret: { type: "string" },
      },
      required: ["user_login"],
    },
  },
  {
    name: "twitch_search_games",
    description: "Search for games on Twitch.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        name: { type: "string" },
        client_id: { type: "string" },
        client_secret: { type: "string" },
      },
      required: ["name"],
    },
  },
  {
    name: "twitch_top_games",
    description: "Get top games currently streaming on Twitch.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        first: { type: "number" },
        client_id: { type: "string" },
        client_secret: { type: "string" },
      },
    },
  },
  {
    name: "twitch_get_clips",
    description: "Get clips for a Twitch broadcaster.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        broadcaster_id: { type: "string" },
        game_id: { type: "string" },
        first: { type: "number" },
        client_id: { type: "string" },
        client_secret: { type: "string" },
      },
    },
  },
  {
    name: "twitch_channel_info",
    description: "Get information about a Twitch channel by its login name.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        channel: { type: "string", description: "Twitch channel login name, e.g. 'shroud'" },
        client_id: { type: "string" },
        client_secret: { type: "string" },
      },
      required: ["channel"],
    },
  },
  {
    name: "twitch_schedule",
    description: "Get a Twitch channel's streaming schedule by its login name.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        channel: { type: "string", description: "Twitch channel login name, e.g. 'shroud'" },
        client_id: { type: "string" },
        client_secret: { type: "string" },
      },
      required: ["channel"],
    },
  },

  // ── reddit-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "reddit_read",
    description: "Read public posts from a Reddit subreddit. OAuth is optional for public reads.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string", description: "Optional Reddit OAuth bearer token" },
        subreddit: { type: "string" },
        sort: { type: "string", enum: ["hot", "new", "top", "rising"], description: "hot, new, top, rising" },
        limit: { type: "number" },
        after: { type: "string" },
        t: { type: "string", enum: ["hour", "day", "week", "month", "year", "all"], description: "hour, day, week, month, year, all" },
      },
      required: ["subreddit"],
    },
  },
  {
    name: "reddit_post",
    description: "Create a Reddit post.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string" },
        subreddit: { type: "string" },
        title: { type: "string" },
        kind: { type: "string", enum: ["self", "link"], description: "self, link" },
        text: { type: "string" },
        url: { type: "string" },
        nsfw: { type: "boolean" },
        spoiler: { type: "boolean" },
      },
      required: ["access_token", "subreddit", "title", "kind"],
    },
  },
  {
    name: "reddit_comment",
    description: "Post a comment on Reddit.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string" },
        parent_id: { type: "string" },
        text: { type: "string" },
      },
      required: ["access_token", "parent_id", "text"],
    },
  },
  {
    name: "reddit_search",
    description: "Search public Reddit posts. OAuth is optional for public reads.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string", description: "Optional Reddit OAuth bearer token" },
        query: { type: "string", description: "Search query" },
        q: { type: "string", description: "Search query alias" },
        subreddit: { type: "string", description: "Limit to a subreddit" },
        sort: { type: "string", description: "relevance, hot, top, new, or comments" },
        t: { type: "string", description: "hour, day, week, month, year, all" },
        limit: { type: "number", description: "Results to return" },
        after: { type: "string" },
      },
      required: [],
    },
  },
  {
    name: "reddit_thread",
    description: "Read a public Reddit thread, including the post and comments.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string", description: "Optional Reddit OAuth bearer token" },
        url: { type: "string", description: "Full Reddit thread URL" },
        subreddit: { type: "string", description: "Subreddit name when url is not supplied" },
        id: { type: "string", description: "Thread id when url is not supplied" },
        limit: { type: "number" },
        sort: { type: "string" },
      },
      required: [],
    },
  },
  {
    name: "reddit_user",
    description: "Get a public Reddit user profile and recent activity. OAuth is optional for public reads.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string", description: "Optional Reddit OAuth bearer token" },
        username: { type: "string" },
        include_posts: { type: "boolean" },
        include_comments: { type: "boolean" },
        limit: { type: "number" },
      },
      required: ["username"],
    },
  },
  {
    name: "reddit_vote",
    description: "Vote on a Reddit post or comment.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string" },
        id: { type: "string" },
        dir: { type: "number", description: "1=upvote, 0=neutral, -1=downvote" },
      },
      required: ["access_token", "id", "dir"],
    },
  },
  {
    name: "reddit_subscribe",
    description: "Subscribe to or unsubscribe from a Reddit subreddit.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string" },
        sr: { type: "string", description: "Subreddit name alias" },
        subreddit: { type: "string" },
        action: { type: "string", enum: ["sub", "unsub"], description: "sub or unsub" },
      },
      required: ["access_token", "action"],
    },
  },


  // ── mastodon-tool.ts ─────────────────────────────────────────────────────────
  {
    name: "mastodon_action",
    description: "Perform a Mastodon action: mastodon_post, mastodon_read_timeline, mastodon_reply, mastodon_boost, mastodon_favorite, mastodon_search, mastodon_profile, mastodon_follow, mastodon_notifications.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        action: { type: "string" },
        instance_url: { type: "string" },
        access_token: { type: "string" },
        status: { type: "string" },
        in_reply_to_id: { type: "string" },
        id: { type: "string" },
        q: { type: "string" },
        acct: { type: "string" },
      },
      required: ["action"],
    },
  },

  // ── bluesky-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "bluesky_action",
    description: "Perform a Bluesky action: bluesky_post, bluesky_read_feed, bluesky_reply, bluesky_like, bluesky_repost, bluesky_search, bluesky_profile, bluesky_follow.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        action: { type: "string" },
        identifier: { type: "string", description: "Bluesky handle or DID" },
        password: { type: "string", description: "App password" },
        text: { type: "string" },
        uri: { type: "string" },
        cid: { type: "string" },
        query: { type: "string" },
        actor: { type: "string" },
        limit: { type: "number" },
      },
      required: ["action"],
    },
  },

  // ── discord-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "discord_send",
    description: "Send a message to a Discord channel.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        bot_token: { type: "string" },
        channel_id: { type: "string" },
        content: { type: "string" },
        embeds: { type: "array", items: {} },
      },
      required: ["bot_token", "channel_id", "content"],
    },
  },
  {
    name: "discord_read",
    description: "Read messages from a Discord channel.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        bot_token: { type: "string" },
        channel_id: { type: "string" },
        limit: { type: "number" },
        before: { type: "string" },
      },
      required: ["bot_token", "channel_id"],
    },
  },
  {
    name: "discord_thread",
    description: "Create a Discord thread.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        bot_token: { type: "string" },
        channel_id: { type: "string" },
        name: { type: "string" },
        message: { type: "string" },
        message_id: { type: "string" },
      },
      required: ["bot_token", "channel_id", "name"],
    },
  },
  {
    name: "discord_react",
    description: "Add a reaction to a Discord message.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        bot_token: { type: "string" },
        channel_id: { type: "string" },
        message_id: { type: "string" },
        emoji: { type: "string" },
      },
      required: ["bot_token", "channel_id", "message_id", "emoji"],
    },
  },
  {
    name: "discord_channels",
    description: "List channels in a Discord guild.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        bot_token: { type: "string" },
        guild_id: { type: "string" },
      },
      required: ["bot_token", "guild_id"],
    },
  },
  {
    name: "discord_members",
    description: "List members of a Discord guild.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        bot_token: { type: "string" },
        guild_id: { type: "string" },
        limit: { type: "number" },
      },
      required: ["bot_token", "guild_id"],
    },
  },
  {
    name: "discord_search",
    description: "Search messages in a Discord guild.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        bot_token: { type: "string" },
        guild_id: { type: "string" },
        content: { type: "string" },
        author_id: { type: "string" },
        channel_id: { type: "string" },
      },
      required: ["bot_token", "guild_id"],
    },
  },

  // ── slack-tool.ts ────────────────────────────────────────────────────────────
  {
    name: "slack_action",
    description: "Perform a Slack action: slack_send, slack_read, slack_search, slack_thread_reply, slack_channels, slack_react, slack_upload.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        action: { type: "string" },
        bot_token: { type: "string" },
        channel: { type: "string" },
        text: { type: "string" },
        thread_ts: { type: "string" },
        query: { type: "string" },
        emoji: { type: "string" },
        timestamp: { type: "string" },
        limit: { type: "number" },
      },
      required: ["action", "bot_token"],
    },
  },

  // ── telegram-tool.ts ─────────────────────────────────────────────────────────
  {
    name: "telegram_send",
    description: "Send a Telegram message.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        bot_token: { type: "string" },
        chat_id: { type: "string" },
        text: { type: "string" },
        parse_mode: { type: "string" },
        reply_to_message_id: { type: "number" },
      },
      required: ["bot_token", "chat_id", "text"],
    },
  },
  {
    name: "telegram_read",
    description: "Read Telegram messages/updates.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        bot_token: { type: "string" },
        offset: { type: "number" },
        limit: { type: "number" },
      },
      required: ["bot_token"],
    },
  },
  {
    name: "telegram_search",
    description: "Search Telegram messages in a chat.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        bot_token: { type: "string" },
        chat_id: { type: "string" },
        query: { type: "string" },
      },
      required: ["bot_token", "chat_id", "query"],
    },
  },
  {
    name: "telegram_send_media",
    description: "Send media (photo/document/video) via Telegram.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        bot_token: { type: "string" },
        chat_id: { type: "string" },
        media_type: { type: "string", enum: ["photo", "document", "audio", "video", "animation"], description: "photo, document, video, audio" },
        media_url: { type: "string" },
        caption: { type: "string" },
      },
      required: ["bot_token", "chat_id", "media_type", "media_url"],
    },
  },
  {
    name: "telegram_get_updates",
    description: "Get Telegram bot updates.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        bot_token: { type: "string" },
        offset: { type: "number" },
        limit: { type: "number" },
        timeout: { type: "number" },
      },
      required: ["bot_token"],
    },
  },
  {
    name: "telegram_manage_chat",
    description: "Manage a Telegram chat (get info, ban, kick, etc.).",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        bot_token: { type: "string" },
        chat_id: { type: "string" },
        action: { type: "string" },
        user_id: { type: "number" },
      },
      required: ["bot_token", "chat_id", "action"],
    },
  },

  // ── line-tool.ts ──────────────────────────────────────────────────────────────
  {
    name: "line_send_message",
    description: "Send a text message to a LINE user, group, or room.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        channel_access_token: { type: "string" },
        to: { type: "string", description: "User ID, group ID, or room ID" },
        message: { type: "string" },
      },
      required: ["channel_access_token", "to", "message"],
    },
  },
  {
    name: "line_send_flex_message",
    description: "Send a rich Flex Message to a LINE user or group.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        channel_access_token: { type: "string" },
        to: { type: "string" },
        alt_text: { type: "string", description: "Fallback text shown in push notifications" },
        contents: { description: "Flex Message container as JSON object or string" },
      },
      required: ["channel_access_token", "to", "alt_text", "contents"],
    },
  },
  {
    name: "line_get_profile",
    description: "Get a LINE user's display name, profile picture, and status message.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        channel_access_token: { type: "string" },
        user_id: { type: "string" },
      },
      required: ["channel_access_token", "user_id"],
    },
  },
  {
    name: "line_get_group_summary",
    description: "Get a LINE group's name and picture URL.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        channel_access_token: { type: "string" },
        group_id: { type: "string" },
      },
      required: ["channel_access_token", "group_id"],
    },
  },
  {
    name: "line_reply_message",
    description: "Reply to a LINE message using a reply token from a webhook event.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        channel_access_token: { type: "string" },
        reply_token: { type: "string" },
        messages: { description: "Array of LINE message objects (max 5), or use message for a single text reply" },
        message: { type: "string", description: "Convenience: single text message to reply with" },
      },
      required: ["channel_access_token", "reply_token"],
    },
  },
  {
    name: "line_broadcast",
    description: "Broadcast a text message to all followers of your LINE Official Account.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        channel_access_token: { type: "string" },
        message: { type: "string" },
      },
      required: ["channel_access_token", "message"],
    },
  },

  // ── figma-tool.ts ─────────────────────────────────────────────────────────────
  {
    name: "figma_get_file",
    description: "Get a Figma file's structure and metadata - pages, frames, and component count.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        personal_access_token: { type: "string" },
        file_key: { type: "string", description: "Alphanumeric file ID from the Figma URL" },
        depth: { type: "number", description: "How deep to traverse the node tree (default: full)" },
      },
      required: ["personal_access_token", "file_key"],
    },
  },
  {
    name: "figma_get_node",
    description: "Get a specific node by ID within a Figma file.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        personal_access_token: { type: "string" },
        file_key: { type: "string" },
        node_id: { type: "string", description: "Node ID (e.g. '1:2' or '1-2')" },
      },
      required: ["personal_access_token", "file_key", "node_id"],
    },
  },
  {
    name: "figma_get_images",
    description: "Export/render Figma nodes as images (PNG, JPG, SVG, or PDF).",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        personal_access_token: { type: "string" },
        file_key: { type: "string" },
        node_ids: { description: "Comma-separated node IDs or array of node ID strings" },
        format: { type: "string", enum: ["png", "jpg", "svg", "pdf"], description: "png, jpg, svg, or pdf (default: png)" },
        scale: { type: "number", description: "Image scale factor 0.01-4 (default: 1, PNG/JPG only)" },
      },
      required: ["personal_access_token", "file_key", "node_ids"],
    },
  },
  {
    name: "figma_get_comments",
    description: "Get all comments on a Figma file.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        personal_access_token: { type: "string" },
        file_key: { type: "string" },
      },
      required: ["personal_access_token", "file_key"],
    },
  },
  {
    name: "figma_post_comment",
    description: "Add a comment to a Figma file, optionally pinned to canvas coordinates.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        personal_access_token: { type: "string" },
        file_key: { type: "string" },
        message: { type: "string" },
        x: { type: "number", description: "Canvas X coordinate to pin the comment" },
        y: { type: "number", description: "Canvas Y coordinate to pin the comment" },
      },
      required: ["personal_access_token", "file_key", "message"],
    },
  },
  {
    name: "figma_get_components",
    description: "Get all published components in a Figma file.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        personal_access_token: { type: "string" },
        file_key: { type: "string" },
      },
      required: ["personal_access_token", "file_key"],
    },
  },
  {
    name: "figma_get_team_projects",
    description: "List all projects for a Figma team.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        personal_access_token: { type: "string" },
        team_id: { type: "string", description: "Team ID from your Figma team URL" },
      },
      required: ["personal_access_token", "team_id"],
    },
  },

  // ── amazon-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "amazon_search",
    description: "Search for products on Amazon.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        keywords: { type: "string" },
        searchIndex: { type: "string" },
        itemCount: { type: "number" },
        access_key: { type: "string" },
        secret_key: { type: "string" },
        partner_tag: { type: "string" },
        region: { type: "string" },
      },
      required: ["keywords"],
    },
  },
  {
    name: "amazon_product",
    description: "Get Amazon product details by ASIN.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        asin: { type: "string" },
        access_key: { type: "string" },
        secret_key: { type: "string" },
        partner_tag: { type: "string" },
        region: { type: "string" },
      },
      required: ["asin"],
    },
  },
  {
    name: "amazon_browse",
    description: "Browse Amazon product categories.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        browseNodeId: { type: "string" },
        access_key: { type: "string" },
        secret_key: { type: "string" },
        partner_tag: { type: "string" },
      },
      required: ["browseNodeId"],
    },
  },
  {
    name: "amazon_variations",
    description: "Get Amazon product variations for an ASIN.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        asin: { type: "string" },
        access_key: { type: "string" },
        secret_key: { type: "string" },
        partner_tag: { type: "string" },
      },
      required: ["asin"],
    },
  },

  // ── shopify-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "shopify_products",
    description: "Get products from a Shopify store.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        shop_domain: { type: "string" },
        limit: { type: "number" },
        collection_id: { type: "number" },
        product_type: { type: "string" },
        vendor: { type: "string" },
        api_key: { type: "string" },
        access_token: { type: "string" },
      },
      required: ["shop_domain"],
    },
  },
  {
    name: "shopify_orders",
    description: "Get orders from a Shopify store.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        shop_domain: { type: "string" },
        limit: { type: "number" },
        status: { type: "string" },
        financial_status: { type: "string" },
        api_key: { type: "string" },
        access_token: { type: "string" },
      },
      required: ["shop_domain"],
    },
  },
  {
    name: "shopify_customers",
    description: "Get customers from a Shopify store.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        shop_domain: { type: "string" },
        limit: { type: "number" },
        email: { type: "string" },
        api_key: { type: "string" },
        access_token: { type: "string" },
      },
      required: ["shop_domain"],
    },
  },
  {
    name: "shopify_inventory",
    description: "Get inventory for Shopify products.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        shop_domain: { type: "string" },
        product_id: { type: "number" },
        api_key: { type: "string" },
        access_token: { type: "string" },
      },
      required: ["shop_domain"],
    },
  },
  {
    name: "shopify_collections",
    description: "Get collections from a Shopify store.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        shop_domain: { type: "string" },
        limit: { type: "number" },
        api_key: { type: "string" },
        access_token: { type: "string" },
      },
      required: ["shop_domain"],
    },
  },
  {
    name: "shopify_shop",
    description: "Get Shopify store information.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        shop_domain: { type: "string" },
        api_key: { type: "string" },
        access_token: { type: "string" },
      },
      required: ["shop_domain"],
    },
  },
  {
    name: "shopify_fulfillments",
    description: "Get fulfillments for a Shopify order.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        shop_domain: { type: "string" },
        order_id: { type: "number" },
        api_key: { type: "string" },
        access_token: { type: "string" },
      },
      required: ["shop_domain", "order_id"],
    },
  },

  // ── yelp-tool.ts ─────────────────────────────────────────────────────────────
  {
    name: "yelp_search_businesses",
    description: "Search for businesses on Yelp.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        term: { type: "string" },
        location: { type: "string" },
        latitude: { type: "number" },
        longitude: { type: "number" },
        categories: { type: "string" },
        limit: { type: "number" },
        api_key: { type: "string" },
      },
    },
  },
  {
    name: "yelp_get_business",
    description: "Get details for a Yelp business by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        business_id: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["business_id"],
    },
  },
  {
    name: "yelp_get_reviews",
    description: "Get reviews for a Yelp business.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        business_id: { type: "string" },
        api_key: { type: "string" },
      },
      required: ["business_id"],
    },
  },
  {
    name: "yelp_search_events",
    description: "Search for events on Yelp.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        location: { type: "string" },
        categories: { type: "string" },
        start_date: { type: "number" },
        api_key: { type: "string" },
      },
    },
  },
  {
    name: "yelp_autocomplete",
    description: "Autocomplete a Yelp business search.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        text: { type: "string" },
        latitude: { type: "number" },
        longitude: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["text"],
    },
  },

  // ── xero-tool.ts ─────────────────────────────────────────────────────────────
  {
    name: "xero_invoices",
    description: "Get invoices from Xero.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        status: { type: "string", description: "DRAFT, SUBMITTED, AUTHORISED, etc." },
        contact_id: { type: "string" },
        date_from: { type: "string" },
        date_to: { type: "string" },
        access_token: { type: "string" },
        tenant_id: { type: "string" },
      },
    },
  },
  {
    name: "xero_contacts",
    description: "Get contacts from Xero.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        search: { type: "string" },
        is_supplier: { type: "boolean" },
        is_customer: { type: "boolean" },
        access_token: { type: "string" },
        tenant_id: { type: "string" },
      },
    },
  },
  {
    name: "xero_accounts",
    description: "Get chart of accounts from Xero.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        type: { type: "string" },
        access_token: { type: "string" },
        tenant_id: { type: "string" },
      },
    },
  },
  {
    name: "xero_payments",
    description: "Get payments from Xero.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        status: { type: "string" },
        date_from: { type: "string" },
        date_to: { type: "string" },
        access_token: { type: "string" },
        tenant_id: { type: "string" },
      },
    },
  },
  {
    name: "xero_bank_transactions",
    description: "Get bank transactions from Xero.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        bank_account_id: { type: "string" },
        date_from: { type: "string" },
        date_to: { type: "string" },
        access_token: { type: "string" },
        tenant_id: { type: "string" },
      },
    },
  },
  {
    name: "xero_reports",
    description: "Get financial reports from Xero.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        report_type: { type: "string", description: "BalanceSheet, ProfitAndLoss, TrialBalance" },
        from_date: { type: "string" },
        to_date: { type: "string" },
        access_token: { type: "string" },
        tenant_id: { type: "string" },
      },
      required: ["report_type"],
    },
  },
  {
    name: "xero_quotes",
    description: "Get quotes from Xero.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        status: { type: "string" },
        contact_id: { type: "string" },
        access_token: { type: "string" },
        tenant_id: { type: "string" },
      },
    },
  },
  {
    name: "xero_organisation",
    description: "Get organisation details from Xero.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string" },
        tenant_id: { type: "string" },
      },
    },
  },

  // ── ebay-tool.ts ─────────────────────────────────────────────────────────────
  {
    name: "ebay_search",
    description: "Search eBay listings via the Browse API.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        client_id:     { type: "string", description: "eBay application Client ID" },
        client_secret: { type: "string", description: "eBay application Client Secret" },
        q:             { type: "string", description: "Search query" },
        limit:         { type: "number", description: "Results per page (max 200, default 20)" },
        offset:        { type: "number" },
        filter:        { type: "string", description: "eBay filter string (e.g. price:[10..50])" },
        sort:          { type: "string", description: "Sort order (e.g. price, -price, newlyListed)" },
        category_ids:  { type: "string", description: "Comma-separated category IDs" },
        marketplace:   { type: "string", description: "Marketplace ID (default: EBAY_US)" },
      },
      required: ["client_id", "client_secret", "q"],
    },
  },
  {
    name: "ebay_get_item",
    description: "Get full details for an eBay item by item ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        client_id:     { type: "string" },
        client_secret: { type: "string" },
        item_id:       { type: "string", description: "eBay item ID (e.g. v1|123456789|0)" },
        fieldgroups:   { type: "string" },
        marketplace:   { type: "string" },
      },
      required: ["client_id", "client_secret", "item_id"],
    },
  },
  {
    name: "ebay_get_item_by_legacy_id",
    description: "Get an eBay item by its legacy item ID (classic numeric ID).",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        client_id:            { type: "string" },
        client_secret:        { type: "string" },
        legacy_item_id:       { type: "string", description: "Legacy eBay item ID (numeric)" },
        legacy_variation_id:  { type: "string" },
        legacy_variation_sku: { type: "string" },
        marketplace:          { type: "string" },
      },
      required: ["client_id", "client_secret", "legacy_item_id"],
    },
  },
  {
    name: "ebay_get_categories",
    description: "Get the eBay category tree for a marketplace.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        client_id:        { type: "string" },
        client_secret:    { type: "string" },
        category_tree_id: { type: "string", description: "Category tree ID (0 = US default)" },
        marketplace:      { type: "string" },
      },
      required: ["client_id", "client_secret"],
    },
  },

  // ── etsy-tool.ts ─────────────────────────────────────────────────────────────
  {
    name: "etsy_search_listings",
    description: "Search active Etsy listings by keyword.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key:     { type: "string", description: "Etsy API key" },
        keywords:    { type: "string", description: "Search keywords" },
        limit:       { type: "number", description: "Results per page (max 100, default 25)" },
        offset:      { type: "number" },
        sort_on:     { type: "string", enum: ["created", "price", "score", "updated"], description: "Sort field (created, price, score, updated)" },
        sort_order:  { type: "string", enum: ["asc", "desc"], description: "asc or desc" },
        min_price:   { type: "number" },
        max_price:   { type: "number" },
        taxonomy_id: { type: "number" },
        location:    { type: "string" },
      },
      required: ["api_key", "keywords"],
    },
  },
  {
    name: "etsy_get_listing",
    description: "Get details for a single Etsy listing by listing ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key:    { type: "string" },
        listing_id: { type: "string" },
        includes:   { type: "string", description: "Comma-separated includes (Images, Shop, etc.)" },
      },
      required: ["api_key", "listing_id"],
    },
  },
  {
    name: "etsy_get_shop",
    description: "Get details for an Etsy shop by shop ID or numeric ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
        shop_id: { type: "string", description: "Shop ID or shop name" },
      },
      required: ["api_key", "shop_id"],
    },
  },
  {
    name: "etsy_get_shop_listings",
    description: "Get active listings for an Etsy shop.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key:    { type: "string" },
        shop_id:    { type: "string" },
        limit:      { type: "number" },
        offset:     { type: "number" },
        sort_on:    { type: "string" },
        sort_order: { type: "string" },
      },
      required: ["api_key", "shop_id"],
    },
  },
  {
    name: "etsy_search_shops",
    description: "Search for Etsy shops by name.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key:   { type: "string" },
        shop_name: { type: "string", description: "Shop name to search for" },
        limit:     { type: "number" },
        offset:    { type: "number" },
      },
      required: ["api_key", "shop_name"],
    },
  },

  // ── stripe-tool.ts ────────────────────────────────────────────────────────────
  {
    name: "stripe_customers",
    description: "List or create Stripe customers.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        secret_key:     { type: "string", description: "Stripe secret key (sk_live_* or sk_test_*)" },
        action:         { type: "string", enum: ["list", "create"], description: "list or create (default: list)" },
        limit:          { type: "number" },
        starting_after: { type: "string", description: "Pagination cursor (customer ID)" },
        email:          { type: "string" },
        name:           { type: "string" },
        phone:          { type: "string" },
        description:    { type: "string" },
      },
      required: ["secret_key"],
    },
  },
  {
    name: "stripe_charges",
    description: "List or create Stripe charges.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        secret_key:     { type: "string" },
        action:         { type: "string", enum: ["list", "create"], description: "list or create (default: list)" },
        limit:          { type: "number" },
        starting_after: { type: "string" },
        customer:       { type: "string" },
        amount:         { type: "number", description: "Amount in smallest currency unit (e.g. cents)" },
        currency:       { type: "string", description: "ISO currency code (e.g. usd)" },
        source:         { type: "string", description: "Payment source or token" },
        description:    { type: "string" },
      },
      required: ["secret_key"],
    },
  },
  {
    name: "stripe_subscriptions",
    description: "List Stripe subscriptions.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        secret_key:     { type: "string" },
        limit:          { type: "number" },
        starting_after: { type: "string" },
        customer:       { type: "string" },
        status:         { type: "string", description: "active, past_due, canceled, etc." },
        price:          { type: "string" },
      },
      required: ["secret_key"],
    },
  },
  {
    name: "stripe_invoices",
    description: "List Stripe invoices.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        secret_key:     { type: "string" },
        limit:          { type: "number" },
        starting_after: { type: "string" },
        customer:       { type: "string" },
        status:         { type: "string", enum: ["draft", "open", "paid", "uncollectible", "void"], description: "draft, open, paid, uncollectible, void" },
        subscription:   { type: "string" },
      },
      required: ["secret_key"],
    },
  },
  {
    name: "stripe_products",
    description: "List Stripe products.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        secret_key:     { type: "string" },
        limit:          { type: "number" },
        starting_after: { type: "string" },
        active:         { type: "boolean" },
      },
      required: ["secret_key"],
    },
  },
  {
    name: "stripe_prices",
    description: "List Stripe prices.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        secret_key:     { type: "string" },
        limit:          { type: "number" },
        starting_after: { type: "string" },
        product:        { type: "string" },
        active:         { type: "boolean" },
        type:           { type: "string", enum: ["one_time", "recurring"], description: "one_time or recurring" },
      },
      required: ["secret_key"],
    },
  },

  // ── paypal-tool.ts ────────────────────────────────────────────────────────────
  {
    name: "paypal_orders",
    description: "Create or retrieve a PayPal order.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        client_id:      { type: "string", description: "PayPal application Client ID" },
        client_secret:  { type: "string", description: "PayPal application Client Secret" },
        action:         { type: "string", enum: ["create", "get"], description: "create or get (default: get)" },
        order_id:       { type: "string", description: "Required for action='get'" },
        intent:         { type: "string", enum: ["CAPTURE", "AUTHORIZE"], description: "CAPTURE or AUTHORIZE (default: CAPTURE)" },
        purchase_units: { type: "array", items: {}, description: "Required for action='create'" },
        sandbox:        { type: "boolean", description: "Use PayPal sandbox (default: false)" },
      },
      required: ["client_id", "client_secret"],
    },
  },
  {
    name: "paypal_invoices",
    description: "List, create, or send PayPal invoices.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        client_id:      { type: "string" },
        client_secret:  { type: "string" },
        action:         { type: "string", enum: ["list", "create", "send"], description: "list, create, or send (default: list)" },
        invoice_id:     { type: "string", description: "Required for action='send'" },
        invoice:        { type: "object", additionalProperties: true, description: "Invoice object for action='create'" },
        page:           { type: "number" },
        page_size:      { type: "number" },
        sandbox:        { type: "boolean" },
      },
      required: ["client_id", "client_secret"],
    },
  },

  // ── square-tool.ts ────────────────────────────────────────────────────────────
  {
    name: "square_payments",
    description: "List or create Square payments.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token:  { type: "string", description: "Square access token" },
        action:        { type: "string", enum: ["list", "create"], description: "list or create (default: list)" },
        begin_time:    { type: "string", description: "RFC 3339 timestamp" },
        end_time:      { type: "string" },
        cursor:        { type: "string" },
        limit:         { type: "number" },
        source_id:     { type: "string", description: "Required for action='create'" },
        amount_money:  { type: "object", additionalProperties: true, description: "{amount: number, currency: string}" },
        idempotency_key: { type: "string" },
        customer_id:   { type: "string" },
        note:          { type: "string" },
      },
      required: ["access_token"],
    },
  },
  {
    name: "square_customers",
    description: "List Square customers.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string" },
        cursor:       { type: "string" },
        limit:        { type: "number" },
        sort_field:   { type: "string" },
        sort_order:   { type: "string" },
      },
      required: ["access_token"],
    },
  },
  {
    name: "square_catalog_list",
    description: "List Square catalog objects (items, categories, taxes, etc.).",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string" },
        cursor:       { type: "string" },
        types:        { type: "string", description: "Comma-separated types (ITEM, CATEGORY, etc.)" },
        limit:        { type: "number" },
      },
      required: ["access_token"],
    },
  },
  {
    name: "square_catalog_search",
    description: "Search Square catalog objects by text.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string" },
        text_filter:  { type: "string", description: "Text to search for" },
        object_types: { type: "array", items: {}, description: "Types to search (default: ['ITEM'])" },
        limit:        { type: "number" },
        cursor:       { type: "string" },
      },
      required: ["access_token", "text_filter"],
    },
  },

  // ── quickbooks-tool.ts ────────────────────────────────────────────────────────
  {
    name: "quickbooks_customers",
    description: "Query QuickBooks Online customers.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string", description: "QuickBooks OAuth2 access token" },
        realm_id:     { type: "string", description: "QuickBooks company realm ID" },
        where:        { type: "string", description: "SQL-style WHERE clause (e.g. Active = true)" },
        limit:        { type: "number" },
        offset:       { type: "number" },
        sandbox:      { type: "boolean" },
      },
      required: ["access_token", "realm_id"],
    },
  },
  {
    name: "quickbooks_invoices",
    description: "List, get, or create QuickBooks Online invoices.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string" },
        realm_id:     { type: "string" },
        action:       { type: "string", enum: ["list", "get", "create"], description: "list, get, or create (default: list)" },
        invoice_id:   { type: "string", description: "Required for action='get'" },
        invoice:      { type: "object", additionalProperties: true, description: "Invoice object for action='create'" },
        where:        { type: "string" },
        limit:        { type: "number" },
        offset:       { type: "number" },
        sandbox:      { type: "boolean" },
      },
      required: ["access_token", "realm_id"],
    },
  },
  {
    name: "quickbooks_items",
    description: "Query QuickBooks Online items (products and services).",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string" },
        realm_id:     { type: "string" },
        where:        { type: "string" },
        limit:        { type: "number" },
        offset:       { type: "number" },
        sandbox:      { type: "boolean" },
      },
      required: ["access_token", "realm_id"],
    },
  },
  {
    name: "quickbooks_payments",
    description: "Query QuickBooks Online payments.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string" },
        realm_id:     { type: "string" },
        where:        { type: "string" },
        limit:        { type: "number" },
        offset:       { type: "number" },
        sandbox:      { type: "boolean" },
      },
      required: ["access_token", "realm_id"],
    },
  },

  // ── plaid-tool.ts ─────────────────────────────────────────────────────────────
  {
    name: "plaid_accounts",
    description: "Get accounts for a Plaid-linked item.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        client_id:    { type: "string", description: "Plaid client ID" },
        secret:       { type: "string", description: "Plaid secret key" },
        access_token: { type: "string", description: "Plaid item access token" },
        account_ids:  { type: "array", items: {}, description: "Filter to specific account IDs" },
        environment:  { type: "string", enum: ["sandbox", "development", "production"], description: "sandbox, development, or production (default: sandbox)" },
      },
      required: ["client_id", "secret", "access_token"],
    },
  },
  {
    name: "plaid_transactions",
    description: "Get transactions for a Plaid-linked item within a date range.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        client_id:    { type: "string" },
        secret:       { type: "string" },
        access_token: { type: "string" },
        start_date:   { type: "string", description: "Start date (YYYY-MM-DD)" },
        end_date:     { type: "string", description: "End date (YYYY-MM-DD)" },
        count:        { type: "number", description: "Number of transactions (max 500, default 100)" },
        offset:       { type: "number" },
        account_ids:  { type: "array", items: {} },
        environment:  { type: "string", enum: ["sandbox", "development", "production"] },
      },
      required: ["client_id", "secret", "access_token", "start_date", "end_date"],
    },
  },
  {
    name: "plaid_balances",
    description: "Get real-time account balances for a Plaid-linked item.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        client_id:    { type: "string" },
        secret:       { type: "string" },
        access_token: { type: "string" },
        account_ids:  { type: "array", items: {} },
        environment:  { type: "string", enum: ["sandbox", "development", "production"] },
      },
      required: ["client_id", "secret", "access_token"],
    },
  },
  {
    name: "plaid_identity",
    description: "Get identity information for accounts linked via Plaid.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        client_id:    { type: "string" },
        secret:       { type: "string" },
        access_token: { type: "string" },
        environment:  { type: "string", enum: ["sandbox", "development", "production"] },
      },
      required: ["client_id", "secret", "access_token"],
    },
  },
  {
    name: "plaid_link_token_create",
    description: "Create a Plaid Link token to initialise the Plaid Link flow.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        client_id:             { type: "string" },
        secret:                { type: "string" },
        user_client_user_id:   { type: "string", description: "Unique identifier for the end user" },
        client_name:           { type: "string", description: "App name shown in Plaid Link UI" },
        products:              { type: "array", items: {}, description: "Plaid products (default: ['transactions'])" },
        country_codes:         { type: "array", items: {}, description: "ISO country codes (default: ['US'])" },
        language:              { type: "string", description: "Language code (default: en)" },
        webhook:               { type: "string" },
        access_token:          { type: "string", description: "For update mode: existing access token" },
        environment:           { type: "string", enum: ["sandbox", "development", "production"] },
      },
      required: ["client_id", "secret", "user_client_user_id"],
    },
  },

  // ── woocommerce-tool.ts ───────────────────────────────────────────────────────
  {
    name: "woo_products",
    description: "List or get WooCommerce products.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        store_url:       { type: "string", description: "WooCommerce store URL (e.g. https://mystore.com)" },
        consumer_key:    { type: "string", description: "WooCommerce consumer key (ck_...)" },
        consumer_secret: { type: "string", description: "WooCommerce consumer secret (cs_...)" },
        action:          { type: "string", enum: ["list", "get"], description: "list or get (default: list)" },
        id:              { type: "string", description: "Product ID for action='get'" },
        per_page:        { type: "number" },
        page:            { type: "number" },
        status:          { type: "string", enum: ["publish", "draft", "pending", "private"], description: "publish, draft, pending, private" },
        category:        { type: "string" },
        search:          { type: "string" },
        orderby:         { type: "string" },
        order:           { type: "string" },
      },
      required: ["store_url", "consumer_key", "consumer_secret"],
    },
  },
  {
    name: "woo_orders",
    description: "List, get, or create WooCommerce orders.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        store_url:       { type: "string" },
        consumer_key:    { type: "string" },
        consumer_secret: { type: "string" },
        action:          { type: "string", enum: ["list", "get", "create"], description: "list, get, or create (default: list)" },
        id:              { type: "string", description: "Order ID for action='get'" },
        order:           { type: "object", additionalProperties: true, description: "Order object for action='create'" },
        per_page:        { type: "number" },
        page:            { type: "number" },
        status:          { type: "string", description: "pending, processing, completed, refunded, etc." },
        customer:        { type: "number", description: "Filter by customer ID" },
        after:           { type: "string", description: "ISO 8601 date for orders after this date" },
        before:          { type: "string" },
      },
      required: ["store_url", "consumer_key", "consumer_secret"],
    },
  },
  {
    name: "woo_customers",
    description: "List WooCommerce customers.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        store_url:       { type: "string" },
        consumer_key:    { type: "string" },
        consumer_secret: { type: "string" },
        per_page:        { type: "number" },
        page:            { type: "number" },
        search:          { type: "string" },
        email:           { type: "string" },
        role:            { type: "string" },
        orderby:         { type: "string" },
        order:           { type: "string" },
      },
      required: ["store_url", "consumer_key", "consumer_secret"],
    },
  },

  // ── csuite-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "csuite_analyze",
    description: "Run a C-Suite multi-perspective analysis on a business scenario.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        scenario: { type: "string" },
        context: { type: "string" },
        perspectives: { type: "array", items: {}, description: "e.g. [\"CEO\",\"CFO\",\"CTO\"]" },
        depth: { type: "string", enum: ["quick", "standard", "deep"], description: "quick, standard, or deep" },
        focus: { type: "string" },
      },
      required: ["scenario"],
    },
  },

  // ── qc-tool.ts ───────────────────────────────────────────────────────────────
  {
    name: "qc_run_checklist",
    description: "Run a sequential QC checklist against a website URL. Checks site load, SSL, meta tags, og:image, robots.txt, sitemap, console errors, broken links, response time, and copy quality (em dashes, banned words). Runs checks one at a time and returns a pass/fail/warn result for each.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        url: { type: "string", description: "The full URL to check (e.g. https://example.com)" },
        checks: {
          type: "array",
          items: { type: "string" },
          description: "Optional subset of checks to run. Available: site_loads, ssl_valid, meta_tags, og_image_valid, robots_txt, sitemap, no_console_errors, link_check, response_time, copy_check. Defaults to all.",
        },
      },
      required: ["url"],
    },
  },
  {
    name: "qc_check_api",
    description: "Test a list of API endpoints and report which ones return the expected HTTP status. Runs each endpoint sequentially.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        base_url: { type: "string", description: "Base URL for all endpoints (e.g. https://api.example.com)" },
        endpoints: {
          type: "array",
          description: "List of endpoints to test",
          items: {
            type: "object",
            properties: {
              path: { type: "string", description: "Endpoint path (e.g. /health)" },
              method: { type: "string", description: "HTTP method (default: GET)" },
              expected_status: { type: "number", description: "Expected HTTP status code (default: 200)" },
            },
            required: ["path"],
          },
        },
      },
      required: ["base_url", "endpoints"],
    },
  },
  {
    name: "qc_copy_audit",
    description: "Fetch a page and scan all visible text for em dashes (U+2014), en dashes (U+2013), and a configurable list of banned words. Returns every occurrence with surrounding context.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        url: { type: "string", description: "The full URL to audit (e.g. https://example.com)" },
        banned_words: {
          type: "array",
          items: { type: "string" },
          description: "Optional list of banned words. Defaults to: delve, tapestry, landscape, robust, leverage, harness, empower, revolutionize, seamlessly, utilize, facilitate, synergy.",
        },
      },
      required: ["url"],
    },
  },

  // ── vault-tool.ts ────────────────────────────────────────────────────────────
  {
    name: "vault_action",
    description: "Perform a vault action: vault_init, vault_store, vault_retrieve, vault_list, vault_delete, vault_rotate, vault_audit.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        action: { type: "string" },
        master_password: { type: "string" },
        key: { type: "string" },
        value: { type: "string" },
        encrypt: { type: "boolean" },
      },
      required: ["action", "master_password"],
    },
  },

  // ── keychain-tool.ts ─────────────────────────────────────────────────────────
  {
    name: "keychain_connect",
    description: "Store an encrypted platform credential in the UnClick Keychain. Tests the credential against the platform API before saving. Scoped to the caller's UNCLICK_API_KEY.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        platform:   { type: "string", description: "Platform ID: github, supabase, vercel, stripe, cloudflare." },
        credential: { type: "string", description: "API key or token for the platform." },
        label:      { type: "string", description: "Optional label to distinguish multiple credentials for the same platform (default: 'default')." },
      },
      required: ["platform", "credential"],
    },
  },
  {
    name: "keychain_status",
    description: "Check the connection status of one or all platform credentials stored in the UnClick Keychain for the current UNCLICK_API_KEY.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        platform: { type: "string", description: "Platform ID to check. Omit to return all connected platforms." },
      },
    },
  },
  {
    name: "keychain_disconnect",
    description: "Remove a platform credential from the UnClick Keychain. Scoped to the caller's UNCLICK_API_KEY.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        platform: { type: "string", description: "Platform ID to disconnect: github, supabase, vercel, stripe, cloudflare." },
        label:    { type: "string", description: "Label of the credential to remove. Omit to remove all labels for the platform." },
      },
      required: ["platform"],
    },
  },
  {
    name: "keychain_list_platforms",
    description: "List all available platform connectors in the UnClick Keychain catalog, with connection status for the current UNCLICK_API_KEY.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        category: { type: "string", description: "Filter by category (e.g. 'Developer Tools', 'Business')." },
      },
    },
  },
  {
    name: "keychain_secure_connect",
    description: "Securely connect a platform credential without exposing the key in chat. Checks environment variables first; if not found, opens a localhost secure input page for the user to paste their key. Call once to get the URL, then call again after the user submits to complete the connection.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        platform:  { type: "string", description: "Platform ID: github, stripe, openai, vercel, cloudflare, etc." },
        label:     { type: "string", description: "Optional label to distinguish multiple credentials for the same platform (default: 'default')." },
        setup_url: { type: "string", description: "Optional URL to the platform's API key settings page, shown on the input page." },
      },
      required: ["platform"],
    },
  },

  // ── github-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "github_action",
    description: "Interact with the GitHub REST API: search repos, get repo details, list and create issues, list PRs, get user profiles, list gists, and search code.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        action:       { type: "string", enum: ["search_repos", "get_repo", "list_issues", "create_issue", "list_prs", "get_user", "list_gists", "search_code"], description: "Action: search_repos, get_repo, list_issues, create_issue, list_prs, get_user, list_gists, search_code." },
        access_token: { type: "string", description: "GitHub personal access token (PAT). Public data works without a token." },
        query:        { type: "string", description: "Search query string (for search_repos and search_code)." },
        owner:        { type: "string", description: "Repository owner login." },
        repo:         { type: "string", description: "Repository name." },
        title:        { type: "string", description: "Issue title (for create_issue)." },
        body:         { type: "string", description: "Issue body text (for create_issue)." },
        state:        { type: "string", description: "Filter by state: open, closed, all." },
        labels:       { type: "string", description: "Comma-separated label names to filter by." },
        username:     { type: "string", description: "GitHub username (for get_user and list_gists)." },
        per_page:     { type: "number", description: "Results per page (max 100)." },
        page:         { type: "number", description: "Page number." },
      },
      required: ["action"],
    },
  },

  // ── gitlab-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "gitlab_action",
    description: "Interact with the GitLab REST API: search projects, get project details, list issues and merge requests, and look up users. Supports self-hosted GitLab instances.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        action:       { type: "string", enum: ["search_projects", "get_project", "list_issues", "list_mrs", "get_user"], description: "Action: search_projects, get_project, list_issues, list_mrs, get_user." },
        access_token: { type: "string", description: "GitLab personal access token (PAT)." },
        base_url:     { type: "string", description: "GitLab base URL (default: https://gitlab.com/api/v4). Set for self-hosted instances." },
        query:        { type: "string", description: "Search query string (for search_projects)." },
        project_id:   { type: "string", description: "Project ID or URL-encoded namespace/project path." },
        state:        { type: "string", description: "Filter by state: opened, closed, merged." },
        labels:       { type: "string", description: "Comma-separated label names to filter by." },
        username:     { type: "string", description: "GitLab username (for get_user)." },
        per_page:     { type: "number", description: "Results per page." },
        page:         { type: "number", description: "Page number." },
      },
      required: ["action"],
    },
  },

  // ── clickup-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "clickup_action",
    description: "Interact with the ClickUp API v2: list workspaces and spaces, get lists and tasks, create tasks, and update task properties.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        action:      { type: "string", enum: ["get_workspaces", "get_spaces", "get_lists", "get_tasks", "create_task", "update_task"], description: "Action: get_workspaces, get_spaces, get_lists, get_tasks, create_task, update_task." },
        api_key:     { type: "string", description: "ClickUp API key." },
        team_id:     { type: "string", description: "Workspace (team) ID (for get_spaces)." },
        space_id:    { type: "string", description: "Space ID (for get_lists without a folder)." },
        folder_id:   { type: "string", description: "Folder ID (for get_lists)." },
        list_id:     { type: "string", description: "List ID (for get_tasks and create_task)." },
        task_id:     { type: "string", description: "Task ID (for update_task)." },
        name:        { type: "string", description: "Task name (for create_task and update_task)." },
        description: { type: "string", description: "Task description." },
        status:      { type: "string", description: "Task status name." },
        priority:    { type: "number", description: "Priority: 1 (urgent), 2 (high), 3 (normal), 4 (low)." },
        due_date:    { type: "number", description: "Due date as Unix timestamp in milliseconds." },
        page:        { type: "number", description: "Page number for task pagination." },
      },
      required: ["action", "api_key"],
    },
  },

  // ── linear-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "linear_action",
    description: "Interact with the Linear GraphQL API: list and search issues, create issues, get project details, and list teams.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        action:      { type: "string", enum: ["list_issues", "create_issue", "get_project", "list_teams", "search_issues"], description: "Action: list_issues, create_issue, get_project, list_teams, search_issues." },
        api_key:     { type: "string", description: "Linear API key." },
        title:       { type: "string", description: "Issue title (for create_issue)." },
        team_id:     { type: "string", description: "Team ID (required for create_issue, optional filter for list_issues)." },
        project_id:  { type: "string", description: "Project ID (for get_project)." },
        description: { type: "string", description: "Issue description." },
        priority:    { type: "number", description: "Priority: 0 (none), 1 (urgent), 2 (high), 3 (medium), 4 (low)." },
        assignee_id: { type: "string", description: "Assignee user ID." },
        state_id:    { type: "string", description: "Workflow state ID." },
        query:       { type: "string", description: "Search term (for search_issues)." },
        first:       { type: "number", description: "Number of results to return (default 25)." },
      },
      required: ["action", "api_key"],
    },
  },

  // ── airtable-tool.ts ─────────────────────────────────────────────────────────
  {
    name: "airtable_action",
    description: "Interact with the Airtable REST API: list bases, list and search records, get a single record, and create or update records.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        action:       { type: "string", enum: ["list_bases", "list_records", "get_record", "create_record", "update_record", "search_records"], description: "Action: list_bases, list_records, get_record, create_record, update_record, search_records." },
        access_token: { type: "string", description: "Airtable personal access token (PAT)." },
        base_id:      { type: "string", description: "Airtable base ID (starts with 'app')." },
        table_name:   { type: "string", description: "Table name or ID." },
        record_id:    { type: "string", description: "Record ID (starts with 'rec')." },
        fields:       { type: "object", additionalProperties: true, description: "Record fields as key-value pairs (for create_record and update_record)." },
        formula:      { type: "string", description: "Airtable filter formula string (for search_records)." },
        view:         { type: "string", description: "View name or ID to use." },
        max_records:  { type: "number", description: "Maximum number of records to return." },
        page_size:    { type: "number", description: "Number of records per page (max 100)." },
        offset:       { type: "string", description: "Pagination offset token." },
      },
      required: ["action", "access_token"],
    },
  },

  // ── trello-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "trello_action",
    description: "Interact with the Trello REST API: list boards and lists, get and search cards, create cards, and update card properties.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        action:    { type: "string", enum: ["get_boards", "get_lists", "get_cards", "create_card", "update_card", "search_cards"], description: "Action: get_boards, get_lists, get_cards, create_card, update_card, search_cards." },
        api_key:   { type: "string", description: "Trello API key." },
        token:     { type: "string", description: "Trello user token." },
        board_id:  { type: "string", description: "Board ID." },
        list_id:   { type: "string", description: "List ID." },
        card_id:   { type: "string", description: "Card ID (for update_card)." },
        name:      { type: "string", description: "Card name (for create_card and update_card)." },
        desc:      { type: "string", description: "Card description." },
        due:       { type: "string", description: "Due date as ISO 8601 string." },
        due_complete: { type: "boolean", description: "Whether the due date is marked complete." },
        closed:    { type: "boolean", description: "Archive or unarchive the card." },
        id_list:   { type: "string", description: "Move card to this list ID." },
        pos:       { type: "string", description: "Card position: top, bottom, or a positive float." },
        query:     { type: "string", description: "Search query (for search_cards)." },
        member_id: { type: "string", description: "Member ID for get_boards (default: me)." },
        filter:    { type: "string", description: "Filter for boards or lists: open, closed, all." },
        limit:     { type: "number", description: "Max results for search_cards." },
      },
      required: ["action", "api_key", "token"],
    },
  },

  // ── sentry-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "sentry_action",
    description: "Interact with the Sentry REST API: list projects and issues, get issue details and events, and resolve issues.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        action:            { type: "string", enum: ["list_projects", "list_issues", "get_issue", "list_events", "resolve_issue"], description: "Action: list_projects, list_issues, get_issue, list_events, resolve_issue." },
        auth_token:        { type: "string", description: "Sentry auth token." },
        organization_slug: { type: "string", description: "Sentry organization slug." },
        project_slug:      { type: "string", description: "Sentry project slug." },
        issue_id:          { type: "string", description: "Issue ID (for get_issue, list_events, resolve_issue)." },
        query:             { type: "string", description: "Search query to filter issues." },
        stats_period:      { type: "string", description: "Time window for issue stats: 24h, 14d, etc." },
        limit:             { type: "number", description: "Max number of results." },
        cursor:            { type: "string", description: "Pagination cursor." },
      },
      required: ["action", "auth_token"],
    },
  },

  // ── postman-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "postman_action",
    description: "Interact with the Postman API: list and retrieve collections, list environments, and list monitors.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        action:        { type: "string", enum: ["list_collections", "get_collection", "list_environments", "list_monitors"], description: "Action: list_collections, get_collection, list_environments, list_monitors." },
        api_key:       { type: "string", description: "Postman API key." },
        collection_id: { type: "string", description: "Collection UID (for get_collection)." },
        workspace_id:  { type: "string", description: "Workspace ID to filter results." },
      },
      required: ["action", "api_key"],
    },
  },

  // ── twilio-tool.ts ────────────────────────────────────────────────────────────
  {
    name: "twilio_send_sms",
    description: "Send an SMS via Twilio.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        account_sid: { type: "string" },
        auth_token: { type: "string" },
        to: { type: "string", description: "Recipient phone number in E.164 format" },
        from: { type: "string", description: "Your Twilio phone number or messaging service SID" },
        body: { type: "string", description: "Message text" },
        status_callback: { type: "string", description: "URL to receive status updates" },
      },
      required: ["account_sid", "auth_token", "to", "from", "body"],
    },
  },
  {
    name: "twilio_list_messages",
    description: "List SMS messages sent or received on a Twilio account.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        account_sid: { type: "string" },
        auth_token: { type: "string" },
        to: { type: "string" },
        from: { type: "string" },
        date_sent: { type: "string", description: "Filter by date (YYYY-MM-DD)" },
        page_size: { type: "number" },
      },
      required: ["account_sid", "auth_token"],
    },
  },
  {
    name: "twilio_get_message",
    description: "Get a single Twilio message by SID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        account_sid: { type: "string" },
        auth_token: { type: "string" },
        message_sid: { type: "string" },
      },
      required: ["account_sid", "auth_token", "message_sid"],
    },
  },
  {
    name: "twilio_make_call",
    description: "Initiate an outbound phone call via Twilio.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        account_sid: { type: "string" },
        auth_token: { type: "string" },
        to: { type: "string", description: "E.164 phone number to call" },
        from: { type: "string", description: "Your Twilio phone number" },
        twiml: { type: "string", description: "TwiML instructions for the call" },
        url: { type: "string", description: "URL that returns TwiML for the call" },
      },
      required: ["account_sid", "auth_token", "to", "from"],
    },
  },
  {
    name: "twilio_list_calls",
    description: "List outbound and inbound calls on a Twilio account.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        account_sid: { type: "string" },
        auth_token: { type: "string" },
        to: { type: "string" },
        from: { type: "string" },
        status: { type: "string", description: "queued, ringing, in-progress, completed, failed, busy, no-answer" },
        page_size: { type: "number" },
      },
      required: ["account_sid", "auth_token"],
    },
  },
  {
    name: "twilio_send_verify",
    description: "Send a verification code via Twilio Verify (SMS, call, email, or WhatsApp).",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        account_sid: { type: "string" },
        auth_token: { type: "string" },
        service_sid: { type: "string", description: "Twilio Verify Service SID" },
        to: { type: "string", description: "E.164 phone number or email" },
        channel: { type: "string", enum: ["sms", "call", "email", "whatsapp"], description: "sms, call, email, or whatsapp (default: sms)" },
      },
      required: ["account_sid", "auth_token", "service_sid", "to"],
    },
  },
  {
    name: "twilio_check_verify",
    description: "Check a verification code submitted by a user via Twilio Verify.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        account_sid: { type: "string" },
        auth_token: { type: "string" },
        service_sid: { type: "string" },
        to: { type: "string" },
        code: { type: "string", description: "The OTP code entered by the user" },
      },
      required: ["account_sid", "auth_token", "service_sid", "to", "code"],
    },
  },

  // ── pushover-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "pushover_send_notification",
    description: "Send a push notification via Pushover.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        app_token: { type: "string" },
        user_key: { type: "string" },
        message: { type: "string" },
        title: { type: "string" },
        url: { type: "string" },
        url_title: { type: "string" },
        priority: { type: "number", description: "-2 (lowest) to 2 (emergency)" },
        sound: { type: "string" },
        device: { type: "string" },
        html: { type: "boolean" },
        retry: { type: "number", description: "Emergency only: retry interval in seconds (min 30)" },
        expire: { type: "number", description: "Emergency only: expiry in seconds (max 10800)" },
      },
      required: ["app_token", "user_key", "message"],
    },
  },
  {
    name: "pushover_get_receipt",
    description: "Get acknowledgment status for an emergency Pushover notification.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        app_token: { type: "string" },
        receipt: { type: "string", description: "Receipt token returned from an emergency notification" },
      },
      required: ["app_token", "receipt"],
    },
  },
  {
    name: "pushover_cancel_emergency",
    description: "Cancel an outstanding emergency Pushover notification before it expires.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        app_token: { type: "string" },
        user_key: { type: "string" },
        receipt: { type: "string" },
      },
      required: ["app_token", "user_key", "receipt"],
    },
  },
  {
    name: "pushover_list_sounds",
    description: "List all available notification sounds in Pushover.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        app_token: { type: "string" },
      },
      required: ["app_token"],
    },
  },
  {
    name: "pushover_validate_user",
    description: "Validate a Pushover user or group key and list their registered devices.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        app_token: { type: "string" },
        user_key: { type: "string" },
        device: { type: "string", description: "Optional: validate only for a specific device name" },
      },
      required: ["app_token", "user_key"],
    },
  },

  // ── whatsapp-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "whatsapp_send_text",
    description: "Send a text message via WhatsApp Business Cloud API.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        bearer_token: { type: "string" },
        phone_number_id: { type: "string", description: "Your WhatsApp phone number ID from Meta for Developers" },
        to: { type: "string", description: "Recipient phone number in E.164 format" },
        body: { type: "string", description: "Message text" },
        preview_url: { type: "boolean" },
      },
      required: ["bearer_token", "phone_number_id", "to", "body"],
    },
  },
  {
    name: "whatsapp_send_template",
    description: "Send a WhatsApp template message (required for first contact or >24h since last message).",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        bearer_token: { type: "string" },
        phone_number_id: { type: "string" },
        to: { type: "string" },
        template_name: { type: "string" },
        language: { type: "string", description: "Language code, e.g. en_US (default)" },
        components: { description: "Array of template component objects for variable substitution" },
      },
      required: ["bearer_token", "phone_number_id", "to", "template_name"],
    },
  },
  {
    name: "whatsapp_send_media",
    description: "Send a media message (image, video, audio, document, sticker) via WhatsApp.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        bearer_token: { type: "string" },
        phone_number_id: { type: "string" },
        to: { type: "string" },
        media_type: { type: "string", enum: ["image", "video", "audio", "document", "sticker"], description: "image, video, audio, document, or sticker" },
        media_id: { type: "string", description: "ID of a previously uploaded media object" },
        media_link: { type: "string", description: "URL of the media to send" },
        caption: { type: "string" },
        filename: { type: "string", description: "For documents: the display filename" },
      },
      required: ["bearer_token", "phone_number_id", "to", "media_type"],
    },
  },
  {
    name: "whatsapp_get_media",
    description: "Get the download URL and metadata for a WhatsApp media object by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        bearer_token: { type: "string" },
        media_id: { type: "string" },
      },
      required: ["bearer_token", "media_id"],
    },
  },
  {
    name: "whatsapp_upload_media",
    description: "Upload a media file to WhatsApp and get a media ID for use in messages.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        bearer_token: { type: "string" },
        phone_number_id: { type: "string" },
        media_url: { type: "string", description: "URL to fetch the media from" },
        mime_type: { type: "string", description: "MIME type, e.g. image/jpeg, video/mp4" },
        filename: { type: "string" },
      },
      required: ["bearer_token", "phone_number_id", "media_url", "mime_type"],
    },
  },

  // ── youtube-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "youtube_search",
    description: "Search YouTube for videos, channels, or playlists.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
        query: { type: "string" },
        type: { type: "string", enum: ["video", "channel", "playlist"], description: "video, channel, or playlist (default: video)" },
        max_results: { type: "number" },
        order: { type: "string", description: "relevance, date, rating, viewCount, title" },
        channel_id: { type: "string" },
        published_after: { type: "string", description: "RFC 3339 datetime, e.g. 2024-01-01T00:00:00Z" },
        region_code: { type: "string" },
        page_token: { type: "string" },
      },
      required: ["api_key", "query"],
    },
  },
  {
    name: "youtube_get_video",
    description: "Get metadata, statistics, and content details for a YouTube video.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
        video_id: { type: "string" },
      },
      required: ["api_key", "video_id"],
    },
  },
  {
    name: "youtube_get_channel",
    description: "Get metadata and statistics for a YouTube channel.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
        channel_id: { type: "string" },
        handle: { type: "string", description: "Channel handle without @ (alternative to channel_id)" },
      },
      required: ["api_key"],
    },
  },
  {
    name: "youtube_list_playlists",
    description: "List playlists belonging to a YouTube channel.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
        channel_id: { type: "string" },
        max_results: { type: "number" },
        page_token: { type: "string" },
      },
      required: ["api_key", "channel_id"],
    },
  },
  {
    name: "youtube_list_playlist_items",
    description: "List videos in a YouTube playlist.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
        playlist_id: { type: "string" },
        max_results: { type: "number" },
        page_token: { type: "string" },
      },
      required: ["api_key", "playlist_id"],
    },
  },
  {
    name: "youtube_get_captions",
    description: "List available caption tracks for a YouTube video.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
        video_id: { type: "string" },
      },
      required: ["api_key", "video_id"],
    },
  },

  // ── spotify-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "spotify_search",
    description: "Search Spotify for tracks, albums, artists, or playlists.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        bearer_token: { type: "string" },
        query: { type: "string" },
        type: { type: "string", description: "Comma-separated: track, album, artist, playlist (default: track)" },
        limit: { type: "number" },
        offset: { type: "number" },
        market: { type: "string" },
      },
      required: ["bearer_token", "query"],
    },
  },
  {
    name: "spotify_get_track",
    description: "Get metadata for a Spotify track by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        bearer_token: { type: "string" },
        track_id: { type: "string" },
        market: { type: "string" },
      },
      required: ["bearer_token", "track_id"],
    },
  },
  {
    name: "spotify_get_album",
    description: "Get metadata and track listing for a Spotify album.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        bearer_token: { type: "string" },
        album_id: { type: "string" },
      },
      required: ["bearer_token", "album_id"],
    },
  },
  {
    name: "spotify_get_artist",
    description: "Get metadata and follower count for a Spotify artist.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        bearer_token: { type: "string" },
        artist_id: { type: "string" },
      },
      required: ["bearer_token", "artist_id"],
    },
  },
  {
    name: "spotify_get_playlist",
    description: "Get metadata and tracks for a Spotify playlist.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        bearer_token: { type: "string" },
        playlist_id: { type: "string" },
        market: { type: "string" },
      },
      required: ["bearer_token", "playlist_id"],
    },
  },
  {
    name: "spotify_get_recommendations",
    description: "Get Spotify track recommendations based on seed tracks, artists, or genres.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        bearer_token: { type: "string" },
        seed_tracks: { type: "string", description: "Comma-separated Spotify track IDs (max 5 seeds total)" },
        seed_artists: { type: "string", description: "Comma-separated Spotify artist IDs" },
        seed_genres: { type: "string", description: "Comma-separated genre names" },
        limit: { type: "number" },
        market: { type: "string" },
        min_energy: { type: "number" },
        max_energy: { type: "number" },
        target_valence: { type: "number" },
        target_danceability: { type: "number" },
      },
      required: ["bearer_token"],
    },
  },
  {
    name: "spotify_get_audio_features",
    description: "Get audio analysis features (danceability, energy, tempo, etc.) for a Spotify track.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        bearer_token: { type: "string" },
        track_id: { type: "string" },
      },
      required: ["bearer_token", "track_id"],
    },
  },

  // ── higgsfield-tool.ts ────────────────────────────────────────────────────────
  {
    name: "higgsfield_generate_video",
    description: "Generate a video from a text prompt using Higgsfield AI. Supports Soul Styles for cinematic looks. Returns a generation_id to poll for completion.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Higgsfield API key" },
        prompt: { type: "string", description: "Text description of the video to generate" },
        style: { type: "string", description: "Soul Style name (use higgsfield_get_styles to list available styles)" },
        duration: { type: "number", description: "Video duration in seconds" },
        aspect_ratio: { type: "string", description: "e.g. 16:9, 9:16, 1:1" },
        negative_prompt: { type: "string", description: "What to avoid in the video" },
        seed: { type: "number", description: "Random seed for reproducibility" },
      },
      required: ["api_key", "prompt"],
    },
  },
  {
    name: "higgsfield_generate_image",
    description: "Generate an image from a text prompt using Higgsfield AI.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Higgsfield API key" },
        prompt: { type: "string", description: "Text description of the image to generate" },
        style: { type: "string", description: "Style name (use higgsfield_get_styles to list available styles)" },
        width: { type: "number", description: "Image width in pixels" },
        height: { type: "number", description: "Image height in pixels" },
        negative_prompt: { type: "string", description: "What to avoid in the image" },
        seed: { type: "number", description: "Random seed for reproducibility" },
      },
      required: ["api_key", "prompt"],
    },
  },
  {
    name: "higgsfield_get_styles",
    description: "List all available Soul Styles for Higgsfield AI video and image generation.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Higgsfield API key" },
      },
      required: ["api_key"],
    },
  },
  {
    name: "higgsfield_get_status",
    description: "Check the status of a Higgsfield AI generation by ID. Returns status, video URL when complete.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Higgsfield API key" },
        generation_id: { type: "string", description: "Generation ID returned by higgsfield_generate_video or higgsfield_generate_image" },
      },
      required: ["api_key", "generation_id"],
    },
  },

  // ── heygen-tool.ts ────────────────────────────────────────────────────────────
  {
    name: "heygen_create_avatar_video",
    description: "Create an AI avatar video with HeyGen. The avatar speaks a script using a selected voice. Returns a video_id to poll for completion.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "HeyGen API key" },
        avatar_id: { type: "string", description: "Avatar ID (use heygen_list_avatars to find available avatars)" },
        script: { type: "string", description: "The text the avatar will speak" },
        voice_id: { type: "string", description: "Voice ID (use heygen_list_voices to find available voices)" },
        background_url: { type: "string", description: "URL of background image" },
        avatar_style: { type: "string", description: "Avatar style: normal, circle, closeUp (default: normal)" },
        width: { type: "number", description: "Video width in pixels (default: 1280)" },
        height: { type: "number", description: "Video height in pixels (default: 720)" },
        title: { type: "string", description: "Video title for reference" },
        test: { type: "boolean", description: "Set true to generate a watermarked test video (does not use quota)" },
      },
      required: ["api_key", "avatar_id", "script"],
    },
  },
  {
    name: "heygen_list_avatars",
    description: "List all available AI avatars in your HeyGen account.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "HeyGen API key" },
      },
      required: ["api_key"],
    },
  },
  {
    name: "heygen_get_video_status",
    description: "Check the generation status of a HeyGen video by video ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "HeyGen API key" },
        video_id: { type: "string", description: "Video ID returned by heygen_create_avatar_video" },
      },
      required: ["api_key", "video_id"],
    },
  },
  {
    name: "heygen_list_voices",
    description: "List all available voices for HeyGen avatar videos.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "HeyGen API key" },
      },
      required: ["api_key"],
    },
  },

  // ── runway-tool.ts ────────────────────────────────────────────────────────────
  {
    name: "runway_generate_video",
    description: "Generate a video from text or an image using Runway ML. Supports text-to-video and image-to-video. Returns a task_id to poll for completion.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Runway API key" },
        prompt: { type: "string", description: "Text description of the video to generate" },
        image_url: { type: "string", description: "URL of an image to animate (image-to-video mode)" },
        model: { type: "string", description: "Model name: gen3a_turbo (fast) or gen3a (quality). Default: gen3a_turbo" },
        duration: { type: "number", description: "Video duration in seconds (default: 5)" },
        ratio: { type: "string", description: "Aspect ratio e.g. 1280:768 or 768:1280 (default: 1280:768)" },
        seed: { type: "number", description: "Random seed for reproducibility" },
      },
      required: ["api_key"],
    },
  },
  {
    name: "runway_get_task",
    description: "Check the status of a Runway ML generation task. Returns status, progress, and video URL when complete.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Runway API key" },
        task_id: { type: "string", description: "Task ID returned by runway_generate_video" },
      },
      required: ["api_key", "task_id"],
    },
  },
  {
    name: "runway_list_models",
    description: "List available Runway ML video generation models.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Runway API key" },
      },
      required: ["api_key"],
    },
  },

  // ── pika-tool.ts ──────────────────────────────────────────────────────────────
  {
    name: "pika_generate_video",
    description: "Generate a creative AI video from a text prompt using Pika. Optionally animate an input image. Returns a generation_id to poll for completion.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Pika API key" },
        prompt: { type: "string", description: "Text description of the video to generate" },
        image_url: { type: "string", description: "URL of an image to animate" },
        style: { type: "string", description: "Style name or ID (use pika_list_styles to browse options)" },
        duration: { type: "number", description: "Video duration in seconds" },
        aspect_ratio: { type: "string", description: "e.g. 16:9, 9:16, 1:1" },
        negative_prompt: { type: "string", description: "What to avoid in the video" },
        motion: { type: "number", description: "Motion intensity 1-4 (default: 2)" },
        seed: { type: "number", description: "Random seed for reproducibility" },
      },
      required: ["api_key", "prompt"],
    },
  },
  {
    name: "pika_get_generation",
    description: "Check the status of a Pika video generation by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Pika API key" },
        generation_id: { type: "string", description: "Generation ID returned by pika_generate_video" },
      },
      required: ["api_key", "generation_id"],
    },
  },
  {
    name: "pika_list_styles",
    description: "List available visual styles for Pika video generation.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Pika API key" },
      },
      required: ["api_key"],
    },
  },

  // ── mailchimp-tool.ts ─────────────────────────────────────────────────────────
  {
    name: "mailchimp_list_audiences",
    description: "List all Mailchimp audiences (lists) in the account.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Mailchimp API key (format: key-dc e.g. abc123-us21)" },
        count: { type: "number", description: "Number of audiences to return (default: 10, max: 1000)" },
      },
      required: ["api_key"],
    },
  },
  {
    name: "mailchimp_list_campaigns",
    description: "List Mailchimp email campaigns, optionally filtered by status or audience.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Mailchimp API key" },
        count: { type: "number", description: "Number of campaigns (default: 10)" },
        status: { type: "string", enum: ["save", "paused", "schedule", "sending", "sent"], description: "Filter by campaign status" },
        list_id: { type: "string", description: "Filter by audience ID" },
      },
      required: ["api_key"],
    },
  },
  {
    name: "mailchimp_get_campaign",
    description: "Get details for a specific Mailchimp campaign by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Mailchimp API key" },
        campaign_id: { type: "string", description: "Campaign ID" },
      },
      required: ["api_key", "campaign_id"],
    },
  },
  {
    name: "mailchimp_create_campaign",
    description: "Create a new Mailchimp email campaign.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Mailchimp API key" },
        list_id: { type: "string", description: "Audience (list) ID to send to" },
        subject_line: { type: "string", description: "Email subject line" },
        type: { type: "string", enum: ["regular", "plaintext", "absplit", "rss", "variate"], description: "Campaign type (default: regular)" },
        from_name: { type: "string", description: "Sender display name" },
        reply_to: { type: "string", description: "Reply-to email address" },
      },
      required: ["api_key", "list_id", "subject_line"],
    },
  },
  {
    name: "mailchimp_list_members",
    description: "List members (subscribers) in a Mailchimp audience.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Mailchimp API key" },
        list_id: { type: "string", description: "Audience ID" },
        count: { type: "number", description: "Number of members to return (default: 10)" },
        status: { type: "string", enum: ["subscribed", "unsubscribed", "cleaned", "pending", "transactional"], description: "Filter by subscription status" },
      },
      required: ["api_key", "list_id"],
    },
  },
  {
    name: "mailchimp_add_member",
    description: "Add or update a subscriber in a Mailchimp audience.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Mailchimp API key" },
        list_id: { type: "string", description: "Audience ID" },
        email: { type: "string", description: "Subscriber email address" },
        status: { type: "string", enum: ["subscribed", "unsubscribed", "cleaned", "pending"], description: "Subscription status (default: subscribed)" },
        first_name: { type: "string", description: "Subscriber first name" },
        last_name: { type: "string", description: "Subscriber last name" },
      },
      required: ["api_key", "list_id", "email"],
    },
  },
  {
    name: "mailchimp_search_members",
    description: "Search for subscribers across all or a specific Mailchimp audience.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Mailchimp API key" },
        query: { type: "string", description: "Search query (email address, name, etc.)" },
        list_id: { type: "string", description: "Limit search to a specific audience ID" },
      },
      required: ["api_key", "query"],
    },
  },

  // ── sendgrid-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "sendgrid_send_email",
    description: "Send a transactional email via SendGrid.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "SendGrid API key from app.sendgrid.com" },
        to: { type: "string", description: "Recipient email address" },
        from: { type: "string", description: "Sender email address (must be verified in SendGrid)" },
        subject: { type: "string", description: "Email subject line" },
        text: { type: "string", description: "Plain text content" },
        html: { type: "string", description: "HTML content" },
        to_name: { type: "string", description: "Recipient display name" },
        from_name: { type: "string", description: "Sender display name" },
        reply_to: { type: "string", description: "Reply-to email address" },
        template_id: { type: "string", description: "SendGrid dynamic template ID" },
      },
      required: ["api_key", "to", "from", "subject"],
    },
  },
  {
    name: "sendgrid_list_templates",
    description: "List dynamic email templates in SendGrid.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "SendGrid API key" },
        page_size: { type: "number", description: "Number of templates (default: 10, max: 200)" },
      },
      required: ["api_key"],
    },
  },
  {
    name: "sendgrid_get_template",
    description: "Get a specific SendGrid email template by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "SendGrid API key" },
        template_id: { type: "string", description: "Template ID" },
      },
      required: ["api_key", "template_id"],
    },
  },
  {
    name: "sendgrid_list_contacts",
    description: "List all marketing contacts in SendGrid.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "SendGrid API key" },
      },
      required: ["api_key"],
    },
  },
  {
    name: "sendgrid_add_contact",
    description: "Add or update a marketing contact in SendGrid.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "SendGrid API key" },
        email: { type: "string", description: "Contact email address" },
        first_name: { type: "string", description: "First name" },
        last_name: { type: "string", description: "Last name" },
        phone_number: { type: "string", description: "Phone number" },
        list_ids: { type: "array", items: { type: "string" }, description: "List IDs to add the contact to" },
      },
      required: ["api_key", "email"],
    },
  },
  {
    name: "sendgrid_get_stats",
    description: "Get SendGrid email sending statistics for a date range.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "SendGrid API key" },
        start_date: { type: "string", description: "Start date (YYYY-MM-DD). Defaults to 7 days ago." },
        end_date: { type: "string", description: "End date (YYYY-MM-DD)" },
        aggregated_by: { type: "string", enum: ["day", "week", "month"], description: "Aggregation period (default: day)" },
      },
      required: ["api_key"],
    },
  },

  // ── mapbox-tool.ts ────────────────────────────────────────────────────────────
  {
    name: "mapbox_geocode_forward",
    description: "Convert an address or place name to coordinates using Mapbox.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string", description: "Mapbox access token from account.mapbox.com" },
        query: { type: "string", description: "Address or place name to geocode" },
        country: { type: "string", description: "Limit results to a country (ISO 3166 alpha-2, e.g. US)" },
        language: { type: "string", description: "Language for results (e.g. en, fr)" },
        limit: { type: "number", description: "Max results (1-10, default: 5)" },
        proximity: { type: "string", description: "Bias results near coordinates (lng,lat)" },
        types: { type: "string", description: "Filter by feature types (e.g. address,place,poi)" },
      },
      required: ["access_token", "query"],
    },
  },
  {
    name: "mapbox_geocode_reverse",
    description: "Convert coordinates to a place name or address using Mapbox reverse geocoding.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string", description: "Mapbox access token" },
        longitude: { type: "number", description: "Longitude" },
        latitude: { type: "number", description: "Latitude" },
        language: { type: "string", description: "Language for results" },
        types: { type: "string", description: "Filter by feature types" },
      },
      required: ["access_token", "longitude", "latitude"],
    },
  },
  {
    name: "mapbox_get_directions",
    description: "Get turn-by-turn directions between two or more locations using Mapbox.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string", description: "Mapbox access token" },
        coordinates: { type: "string", description: "Semicolon-separated lng,lat pairs (e.g. -122.4194,37.7749;-118.2437,34.0522)" },
        profile: { type: "string", enum: ["mapbox/driving", "mapbox/walking", "mapbox/cycling", "mapbox/driving-traffic"], description: "Routing profile (default: mapbox/driving)" },
        alternatives: { type: "boolean", description: "Return alternative routes" },
        steps: { type: "boolean", description: "Include turn-by-turn steps" },
        overview: { type: "string", enum: ["full", "simplified", "false"], description: "Route overview geometry detail" },
        language: { type: "string", description: "Language for instructions" },
      },
      required: ["access_token", "coordinates"],
    },
  },
  {
    name: "mapbox_get_static_map",
    description: "Generate a static map image URL for a given location using Mapbox.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string", description: "Mapbox access token" },
        longitude: { type: "number", description: "Center longitude" },
        latitude: { type: "number", description: "Center latitude" },
        zoom: { type: "number", description: "Zoom level (0-22, default: 12)" },
        width: { type: "number", description: "Image width in px (max: 1280, default: 600)" },
        height: { type: "number", description: "Image height in px (max: 1280, default: 400)" },
        style: { type: "string", description: "Map style (default: mapbox/streets-v11)" },
        retina: { type: "boolean", description: "Return @2x high-DPI image" },
      },
      required: ["access_token", "longitude", "latitude"],
    },
  },
  {
    name: "mapbox_list_tilesets",
    description: "List Mapbox tilesets owned by a user.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string", description: "Mapbox access token" },
        username: { type: "string", description: "Mapbox username" },
        limit: { type: "number", description: "Max tilesets to return (max: 500)" },
        type: { type: "string", enum: ["raster", "vector"], description: "Filter by tileset type" },
      },
      required: ["access_token", "username"],
    },
  },

  // ── algolia-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "algolia_search",
    description: "Search an Algolia index for records matching a query.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        app_id: { type: "string", description: "Algolia Application ID" },
        api_key: { type: "string", description: "Algolia API Key (Search or Admin)" },
        index: { type: "string", description: "Index name to search" },
        query: { type: "string", description: "Search query text" },
        filters: { type: "string", description: "Algolia filter expression (e.g. category:electronics)" },
        hits_per_page: { type: "number", description: "Results per page (default: 20)" },
        page: { type: "number", description: "Page number (0-indexed)" },
        attributes_to_retrieve: { type: "array", items: { type: "string" }, description: "Attributes to include in results" },
      },
      required: ["app_id", "api_key", "index"],
    },
  },
  {
    name: "algolia_get_object",
    description: "Retrieve a single record from an Algolia index by its objectID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        app_id: { type: "string", description: "Algolia Application ID" },
        api_key: { type: "string", description: "Algolia API Key" },
        index: { type: "string", description: "Index name" },
        object_id: { type: "string", description: "Record objectID" },
      },
      required: ["app_id", "api_key", "index", "object_id"],
    },
  },
  {
    name: "algolia_list_indices",
    description: "List all Algolia indices in the application.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        app_id: { type: "string", description: "Algolia Application ID" },
        api_key: { type: "string", description: "Algolia Admin API Key" },
      },
      required: ["app_id", "api_key"],
    },
  },
  {
    name: "algolia_browse_index",
    description: "Browse all records in an Algolia index (paginated cursor-based).",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        app_id: { type: "string", description: "Algolia Application ID" },
        api_key: { type: "string", description: "Algolia Admin API Key" },
        index: { type: "string", description: "Index name" },
        filters: { type: "string", description: "Filter expression" },
        hits_per_page: { type: "number", description: "Records per page" },
        cursor: { type: "string", description: "Pagination cursor from previous response" },
        attributes_to_retrieve: { type: "array", items: { type: "string" }, description: "Attributes to include" },
      },
      required: ["app_id", "api_key", "index"],
    },
  },

  // ── pinecone-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "pinecone_list_indexes",
    description: "List all Pinecone vector indexes in the project.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Pinecone API key from app.pinecone.io" },
      },
      required: ["api_key"],
    },
  },
  {
    name: "pinecone_describe_index",
    description: "Get details (dimension, metric, status, host) for a Pinecone index.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Pinecone API key" },
        index_name: { type: "string", description: "Index name" },
      },
      required: ["api_key", "index_name"],
    },
  },
  {
    name: "pinecone_query_vectors",
    description: "Query a Pinecone index for nearest-neighbor vectors.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Pinecone API key" },
        index_host: { type: "string", description: "Index host URL from describe_index (e.g. https://my-index-xxx.svc.pinecone.io)" },
        vector: { type: "array", items: { type: "number" }, description: "Query vector (array of floats matching index dimension)" },
        top_k: { type: "number", description: "Number of nearest neighbors to return (default: 10)" },
        namespace: { type: "string", description: "Namespace to query" },
        include_metadata: { type: "boolean", description: "Include metadata in results (default: true)" },
        include_values: { type: "boolean", description: "Include vector values in results" },
        filter: { type: "object", additionalProperties: true, description: "Metadata filter object" },
      },
      required: ["api_key", "index_host", "vector"],
    },
  },
  {
    name: "pinecone_upsert_vectors",
    description: "Upsert (insert or update) vectors into a Pinecone index.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Pinecone API key" },
        index_host: { type: "string", description: "Index host URL from describe_index" },
        vectors: { type: "array", description: "Array of {id, values, metadata?} objects to upsert", items: { type: "object", additionalProperties: true } },
        namespace: { type: "string", description: "Namespace to write to" },
      },
      required: ["api_key", "index_host", "vectors"],
    },
  },
  {
    name: "pinecone_delete_vectors",
    description: "Delete vectors from a Pinecone index by ID or filter.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Pinecone API key" },
        index_host: { type: "string", description: "Index host URL from describe_index" },
        ids: { type: "array", items: { type: "string" }, description: "Array of vector IDs to delete" },
        delete_all: { type: "boolean", description: "Delete all vectors in the namespace" },
        namespace: { type: "string", description: "Namespace to delete from" },
        filter: { type: "object", additionalProperties: true, description: "Metadata filter - delete matching vectors" },
      },
      required: ["api_key", "index_host"],
    },
  },

  // ── mixpanel-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "mixpanel_track_event",
    description: "Track a custom event in Mixpanel.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        service_account_username: { type: "string", description: "Mixpanel Service Account username" },
        service_account_secret: { type: "string", description: "Mixpanel Service Account secret" },
        project_id: { type: "string", description: "Mixpanel project ID" },
        token: { type: "string", description: "Mixpanel project token (for ingestion)" },
        event: { type: "string", description: "Event name" },
        distinct_id: { type: "string", description: "User distinct ID (default: anonymous)" },
        properties: { type: "object", description: "Additional event properties" },
      },
      required: ["service_account_username", "service_account_secret", "project_id", "token", "event"],
    },
  },
  {
    name: "mixpanel_get_events",
    description: "Get Mixpanel event analytics data for a date range.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        service_account_username: { type: "string", description: "Mixpanel Service Account username" },
        service_account_secret: { type: "string", description: "Mixpanel Service Account secret" },
        project_id: { type: "string", description: "Mixpanel project ID" },
        from_date: { type: "string", description: "Start date (YYYY-MM-DD, default: 7 days ago)" },
        to_date: { type: "string", description: "End date (YYYY-MM-DD, default: today)" },
        event: { type: "array", items: { type: "string" }, description: "Event names to filter by" },
        unit: { type: "string", enum: ["minute", "hour", "day", "week", "month"], description: "Time unit (default: day)" },
        type: { type: "string", enum: ["general", "unique", "average"], description: "Aggregation type (default: general)" },
      },
      required: ["service_account_username", "service_account_secret", "project_id"],
    },
  },
  {
    name: "mixpanel_get_funnels",
    description: "Get funnel conversion data from Mixpanel.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        service_account_username: { type: "string", description: "Mixpanel Service Account username" },
        service_account_secret: { type: "string", description: "Mixpanel Service Account secret" },
        project_id: { type: "string", description: "Mixpanel project ID" },
        funnel_id: { type: "string", description: "Funnel ID (find in Mixpanel UI)" },
        from_date: { type: "string", description: "Start date (YYYY-MM-DD, default: 30 days ago)" },
        to_date: { type: "string", description: "End date (YYYY-MM-DD)" },
        unit: { type: "string", enum: ["day", "week", "month"], description: "Time unit" },
      },
      required: ["service_account_username", "service_account_secret", "project_id", "funnel_id"],
    },
  },
  {
    name: "mixpanel_get_retention",
    description: "Get user retention analytics from Mixpanel.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        service_account_username: { type: "string", description: "Mixpanel Service Account username" },
        service_account_secret: { type: "string", description: "Mixpanel Service Account secret" },
        project_id: { type: "string", description: "Mixpanel project ID" },
        from_date: { type: "string", description: "Start date (YYYY-MM-DD, default: 30 days ago)" },
        to_date: { type: "string", description: "End date (YYYY-MM-DD)" },
        born_event: { type: "string", description: "Event that defines user acquisition" },
        event: { type: "string", description: "Retention event to measure" },
        retention_type: { type: "string", enum: ["birth", "compactness"], description: "Retention type (default: birth)" },
        unit: { type: "string", enum: ["day", "week", "month"], description: "Time unit (default: day)" },
      },
      required: ["service_account_username", "service_account_secret", "project_id"],
    },
  },
  {
    name: "mixpanel_export_data",
    description: "Export raw Mixpanel event data for a date range.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        service_account_username: { type: "string", description: "Mixpanel Service Account username" },
        service_account_secret: { type: "string", description: "Mixpanel Service Account secret" },
        project_id: { type: "string", description: "Mixpanel project ID" },
        from_date: { type: "string", description: "Start date (YYYY-MM-DD, default: yesterday)" },
        to_date: { type: "string", description: "End date (YYYY-MM-DD, default: today)" },
        event: { type: "array", items: { type: "string" }, description: "Filter by event names" },
        where: { type: "string", description: "Filter expression" },
        limit: { type: "number", description: "Max events to return" },
      },
      required: ["service_account_username", "service_account_secret", "project_id"],
    },
  },

  // ── datadog-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "datadog_list_monitors",
    description: "List Datadog monitors (alerts) with optional name or tag filters.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Datadog API key (DD-API-KEY)" },
        app_key: { type: "string", description: "Datadog Application key (DD-APPLICATION-KEY)" },
        name: { type: "string", description: "Filter monitors by name" },
        tags: { type: "string", description: "Comma-separated monitor tags to filter by" },
        page: { type: "number", description: "Page number (0-indexed)" },
        page_size: { type: "number", description: "Monitors per page (max: 1000)" },
      },
      required: ["api_key", "app_key"],
    },
  },
  {
    name: "datadog_get_monitor",
    description: "Get details for a specific Datadog monitor.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Datadog API key" },
        app_key: { type: "string", description: "Datadog Application key" },
        monitor_id: { type: "string", description: "Monitor ID" },
      },
      required: ["api_key", "app_key", "monitor_id"],
    },
  },
  {
    name: "datadog_create_monitor",
    description: "Create a new Datadog monitor (alert).",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Datadog API key" },
        app_key: { type: "string", description: "Datadog Application key" },
        name: { type: "string", description: "Monitor name" },
        type: { type: "string", description: "Monitor type (e.g. metric alert, service check, event alert)" },
        query: { type: "string", description: "Monitor query expression" },
        message: { type: "string", description: "Notification message" },
        tags: { type: "array", items: { type: "string" }, description: "Tags to attach to the monitor" },
        priority: { type: "number", minimum: 1, maximum: 5, description: "Monitor priority (1-5)" },
      },
      required: ["api_key", "app_key", "name", "query"],
    },
  },
  {
    name: "datadog_list_dashboards",
    description: "List Datadog dashboards.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Datadog API key" },
        app_key: { type: "string", description: "Datadog Application key" },
        filter_shared: { type: "boolean", description: "Filter to shared dashboards only" },
      },
      required: ["api_key", "app_key"],
    },
  },
  {
    name: "datadog_query_metrics",
    description: "Query Datadog metrics time-series data.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Datadog API key" },
        app_key: { type: "string", description: "Datadog Application key" },
        query: { type: "string", description: "Datadog metric query (e.g. avg:system.cpu.user{*})" },
        from: { type: "number", description: "Start time as Unix timestamp (default: 1 hour ago)" },
        to: { type: "number", description: "End time as Unix timestamp (default: now)" },
      },
      required: ["api_key", "app_key", "query"],
    },
  },
  {
    name: "datadog_list_events",
    description: "List Datadog events stream for a time range.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Datadog API key" },
        app_key: { type: "string", description: "Datadog Application key" },
        start: { type: "number", description: "Start time as Unix timestamp (default: 1 hour ago)" },
        end: { type: "number", description: "End time as Unix timestamp (default: now)" },
        priority: { type: "string", enum: ["normal", "low"], description: "Filter by event priority" },
        sources: { type: "string", description: "Comma-separated event sources" },
        tags: { type: "string", description: "Comma-separated tags to filter events" },
      },
      required: ["api_key", "app_key"],
    },
  },

  // ── hubspot-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "hubspot_list_contacts",
    description: "List HubSpot CRM contacts (most recently created first).",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string", description: "HubSpot Private App access token" },
        limit: { type: "number", description: "Contacts to return (max 100, default 25)" },
        after: { type: "string", description: "Pagination cursor from a previous response" },
        properties: { type: "string", description: "Comma-separated properties to return" },
      },
      required: ["access_token"],
    },
  },
  {
    name: "hubspot_get_contact",
    description: "Get a single HubSpot contact by id.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string", description: "HubSpot Private App access token" },
        contact_id: { type: "string", description: "HubSpot contact id" },
        properties: { type: "string", description: "Comma-separated properties to return" },
      },
      required: ["access_token", "contact_id"],
    },
  },
  {
    name: "hubspot_search_contacts",
    description: "Search HubSpot contacts by name, email, or company.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string", description: "HubSpot Private App access token" },
        query: { type: "string", description: "Search term (name, email, or company)" },
        limit: { type: "number", description: "Results to return (max 100, default 25)" },
        properties: { type: "string", description: "Comma-separated properties to return" },
      },
      required: ["access_token", "query"],
    },
  },
  {
    name: "hubspot_list_companies",
    description: "List HubSpot CRM companies.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string", description: "HubSpot Private App access token" },
        limit: { type: "number", description: "Companies to return (max 100, default 25)" },
        after: { type: "string", description: "Pagination cursor from a previous response" },
        properties: { type: "string", description: "Comma-separated properties to return" },
      },
      required: ["access_token"],
    },
  },
  {
    name: "hubspot_list_deals",
    description: "List HubSpot CRM deals.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string", description: "HubSpot Private App access token" },
        limit: { type: "number", description: "Deals to return (max 100, default 25)" },
        after: { type: "string", description: "Pagination cursor from a previous response" },
        properties: { type: "string", description: "Comma-separated properties to return" },
      },
      required: ["access_token"],
    },
  },
  {
    name: "hubspot_create_contact",
    description: "Create a HubSpot contact.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string", description: "HubSpot Private App access token" },
        email: { type: "string", description: "Contact email address" },
        properties: { type: "object", description: "Additional contact properties (firstname, lastname, company, phone, ...)" },
      },
      required: ["access_token"],
    },
  },

  // ── jira-tool.ts ──────────────────────────────────────────────────────────────
  {
    name: "jira_search_issues",
    description: "Search Jira issues with JQL (defaults to most recently updated).",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        site: { type: "string", description: "Jira site (e.g. mycompany or mycompany.atlassian.net)" },
        email: { type: "string", description: "Atlassian account email" },
        api_token: { type: "string", description: "Atlassian API token" },
        jql: { type: "string", description: "JQL query (e.g. 'project = ENG AND status = \"In Progress\"')" },
        max_results: { type: "number", description: "Issues to return (max 100, default 25)" },
        fields: { type: "string", description: "Comma-separated fields to return" },
      },
      required: ["site", "email", "api_token"],
    },
  },
  {
    name: "jira_get_issue",
    description: "Get a single Jira issue by key, including description and comments.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        site: { type: "string", description: "Jira site (e.g. mycompany)" },
        email: { type: "string", description: "Atlassian account email" },
        api_token: { type: "string", description: "Atlassian API token" },
        issue_key: { type: "string", description: "Issue key (e.g. ENG-123)" },
      },
      required: ["site", "email", "api_token", "issue_key"],
    },
  },
  {
    name: "jira_list_projects",
    description: "List Jira projects, with an optional name query.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        site: { type: "string", description: "Jira site (e.g. mycompany)" },
        email: { type: "string", description: "Atlassian account email" },
        api_token: { type: "string", description: "Atlassian API token" },
        query: { type: "string", description: "Filter projects by name or key" },
        max_results: { type: "number", description: "Projects to return (max 100, default 50)" },
      },
      required: ["site", "email", "api_token"],
    },
  },
  {
    name: "jira_create_issue",
    description: "Create a Jira issue. project_key can be filled from a saved memory default.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        site: { type: "string", description: "Jira site (e.g. mycompany)" },
        email: { type: "string", description: "Atlassian account email" },
        api_token: { type: "string", description: "Atlassian API token" },
        project_key: { type: "string", description: "Project key (e.g. ENG). Can be a saved default." },
        summary: { type: "string", description: "Issue summary / title" },
        issue_type: { type: "string", description: "Issue type name (default Task)" },
        description: { type: "string", description: "Plain-text description" },
      },
      required: ["site", "email", "api_token", "summary"],
    },
  },
  {
    name: "jira_add_comment",
    description: "Add a comment to a Jira issue.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        site: { type: "string", description: "Jira site (e.g. mycompany)" },
        email: { type: "string", description: "Atlassian account email" },
        api_token: { type: "string", description: "Atlassian API token" },
        issue_key: { type: "string", description: "Issue key (e.g. ENG-123)" },
        body: { type: "string", description: "Comment text" },
      },
      required: ["site", "email", "api_token", "issue_key", "body"],
    },
  },

  // ── jobsmith-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "jobsmith_check",
    description: "Run JobSmith's CV / cover-letter quality rules over a piece of text. No key needed.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        text: { type: "string", description: "The CV or cover-letter text to check" },
      },
      required: ["text"],
    },
  },
  {
    name: "jobsmith_rules",
    description: "Browse JobSmith's rule pack (counts by category and severity), optionally filtered by category.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        category: { type: "string", description: "Filter to one category (e.g. ATS, TRUTH, VOICE, PRIVACY)" },
      },
      required: [],
    },
  },

  // ── contentful-tool.ts ────────────────────────────────────────────────────────
  {
    name: "contentful_list_entries",
    description: "List Contentful entries, optionally filtered by content_type or full-text query.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string", description: "Contentful Content Delivery API token" },
        space_id: { type: "string", description: "Contentful space id (can be a saved default)" },
        environment: { type: "string", description: "Environment (default master)" },
        content_type: { type: "string", description: "Filter to one content type id" },
        query: { type: "string", description: "Full-text search query" },
        limit: { type: "number", description: "Entries to return (max 100, default 25)" },
      },
      required: ["access_token"],
    },
  },
  {
    name: "contentful_get_entry",
    description: "Get a single Contentful entry by id.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string", description: "Contentful Content Delivery API token" },
        space_id: { type: "string", description: "Contentful space id (can be a saved default)" },
        environment: { type: "string", description: "Environment (default master)" },
        entry_id: { type: "string", description: "Entry id" },
      },
      required: ["access_token", "entry_id"],
    },
  },
  {
    name: "contentful_list_content_types",
    description: "List Contentful content types (the content model).",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string", description: "Contentful Content Delivery API token" },
        space_id: { type: "string", description: "Contentful space id (can be a saved default)" },
        environment: { type: "string", description: "Environment (default master)" },
      },
      required: ["access_token"],
    },
  },
  {
    name: "contentful_list_assets",
    description: "List Contentful media assets.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string", description: "Contentful Content Delivery API token" },
        space_id: { type: "string", description: "Contentful space id (can be a saved default)" },
        environment: { type: "string", description: "Environment (default master)" },
        limit: { type: "number", description: "Assets to return (max 100, default 25)" },
      },
      required: ["access_token"],
    },
  },

  // ── webflow-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "webflow_list_sites",
    description: "List Webflow sites for the account.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string", description: "Webflow API token" },
      },
      required: ["access_token"],
    },
  },
  {
    name: "webflow_get_site",
    description: "Get a single Webflow site by id.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string", description: "Webflow API token" },
        site_id: { type: "string", description: "Webflow site id (can be a saved default)" },
      },
      required: ["access_token"],
    },
  },
  {
    name: "webflow_list_collections",
    description: "List CMS collections for a Webflow site.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string", description: "Webflow API token" },
        site_id: { type: "string", description: "Webflow site id (can be a saved default)" },
      },
      required: ["access_token"],
    },
  },
  {
    name: "webflow_list_items",
    description: "List items in a Webflow CMS collection.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string", description: "Webflow API token" },
        collection_id: { type: "string", description: "Webflow collection id" },
        limit: { type: "number", description: "Items to return (max 100, default 25)" },
        offset: { type: "number", description: "Pagination offset" },
      },
      required: ["access_token", "collection_id"],
    },
  },

  // ── digitalocean-tool.ts ──────────────────────────────────────────────────────
  {
    name: "do_list_droplets",
    description: "List DigitalOcean droplets (signals when any are powered off).",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string", description: "DigitalOcean personal access token" },
        tag_name: { type: "string", description: "Filter droplets by tag" },
        limit: { type: "number", description: "Droplets to return (max 200, default 25)" },
      },
      required: ["access_token"],
    },
  },
  {
    name: "do_list_apps",
    description: "List DigitalOcean App Platform apps.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string", description: "DigitalOcean personal access token" },
        limit: { type: "number", description: "Apps to return (max 200, default 25)" },
      },
      required: ["access_token"],
    },
  },
  {
    name: "do_list_databases",
    description: "List DigitalOcean managed database clusters.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string", description: "DigitalOcean personal access token" },
      },
      required: ["access_token"],
    },
  },
  {
    name: "do_account",
    description: "Get the DigitalOcean account profile and limits.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string", description: "DigitalOcean personal access token" },
      },
      required: ["access_token"],
    },
  },

  // ── klaviyo-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "klaviyo_list_lists",
    description: "List Klaviyo lists.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Klaviyo private API key" },
      },
      required: ["api_key"],
    },
  },
  {
    name: "klaviyo_list_segments",
    description: "List Klaviyo segments (dynamic groups).",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Klaviyo private API key" },
      },
      required: ["api_key"],
    },
  },
  {
    name: "klaviyo_list_metrics",
    description: "List Klaviyo metrics (tracked events).",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Klaviyo private API key" },
      },
      required: ["api_key"],
    },
  },
  {
    name: "klaviyo_list_profiles",
    description: "List Klaviyo profiles (subscribers).",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Klaviyo private API key" },
        filter: { type: "string", description: "Klaviyo filter expression (e.g. equals(email,'a@b.com'))" },
        limit: { type: "number", description: "Profiles to return (max 100, default 20)" },
      },
      required: ["api_key"],
    },
  },

  // ── todoist-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "todoist_list_projects",
    description: "List your Todoist projects.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {
      api_token: { type: "string", description: "Todoist API token" },
    }, required: ["api_token"] },
  },
  {
    name: "todoist_list_tasks",
    description: "List active Todoist tasks, optionally by project or filter.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {
      api_token: { type: "string", description: "Todoist API token" },
      project_id: { type: "string", description: "Limit to one project id" },
      filter: { type: "string", description: "Todoist filter query (e.g. 'today', 'overdue')" },
    }, required: ["api_token"] },
  },
  {
    name: "todoist_create_task",
    description: "Create a Todoist task.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {
      api_token: { type: "string", description: "Todoist API token" },
      content: { type: "string", description: "The task text" },
      project_id: { type: "string", description: "Project id to add the task to" },
      due_string: { type: "string", description: "Natural-language due date (e.g. 'tomorrow 5pm')" },
      priority: { type: "number", minimum: 1, maximum: 4, description: "Priority 1 (normal) to 4 (urgent)" },
    }, required: ["api_token", "content"] },
  },
  {
    name: "todoist_complete_task",
    description: "Complete (close) a Todoist task by id.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {
      api_token: { type: "string", description: "Todoist API token" },
      task_id: { type: "string", description: "Task id to close" },
    }, required: ["api_token", "task_id"] },
  },

  // ── pipedrive-tool.ts ─────────────────────────────────────────────────────────
  {
    name: "pipedrive_list_deals",
    description: "List Pipedrive deals.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {
      api_token: { type: "string", description: "Pipedrive API token" },
      status: { type: "string", description: "Filter by status (open, won, lost, deleted, all_not_deleted)" },
      limit: { type: "number", description: "Deals to return (max 100, default 25)" },
    }, required: ["api_token"] },
  },
  {
    name: "pipedrive_list_persons",
    description: "List Pipedrive persons (contacts).",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {
      api_token: { type: "string", description: "Pipedrive API token" },
      limit: { type: "number", description: "Persons to return (max 100, default 25)" },
    }, required: ["api_token"] },
  },
  {
    name: "pipedrive_list_organizations",
    description: "List Pipedrive organizations (companies).",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {
      api_token: { type: "string", description: "Pipedrive API token" },
      limit: { type: "number", description: "Organizations to return (max 100, default 25)" },
    }, required: ["api_token"] },
  },
  {
    name: "pipedrive_search_deals",
    description: "Search Pipedrive deals by term.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {
      api_token: { type: "string", description: "Pipedrive API token" },
      term: { type: "string", description: "Search term (deal title or keyword)" },
      limit: { type: "number", description: "Results to return (max 100, default 25)" },
    }, required: ["api_token", "term"] },
  },

  // ── confluence-tool.ts ────────────────────────────────────────────────────────
  {
    name: "confluence_search",
    description: "Search Confluence pages by text.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {
      site: { type: "string", description: "Atlassian site (e.g. mycompany)" },
      email: { type: "string", description: "Atlassian account email" },
      api_token: { type: "string", description: "Atlassian API token" },
      query: { type: "string", description: "Text to search for" },
      limit: { type: "number", description: "Results to return (max 50, default 25)" },
    }, required: ["site", "email", "api_token", "query"] },
  },
  {
    name: "confluence_get_page",
    description: "Get a Confluence page by id, including its body.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {
      site: { type: "string", description: "Atlassian site (e.g. mycompany)" },
      email: { type: "string", description: "Atlassian account email" },
      api_token: { type: "string", description: "Atlassian API token" },
      page_id: { type: "string", description: "Confluence content/page id" },
    }, required: ["site", "email", "api_token", "page_id"] },
  },
  {
    name: "confluence_list_spaces",
    description: "List Confluence spaces.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {
      site: { type: "string", description: "Atlassian site (e.g. mycompany)" },
      email: { type: "string", description: "Atlassian account email" },
      api_token: { type: "string", description: "Atlassian API token" },
      limit: { type: "number", description: "Spaces to return (max 100, default 50)" },
    }, required: ["site", "email", "api_token"] },
  },

  // ── unsplash-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "unsplash_search_photos",
    description: "Search Unsplash photos.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {
      access_key: { type: "string", description: "Unsplash Access Key" },
      query: { type: "string", description: "What to search for" },
      per_page: { type: "number", description: "Photos to return (max 30, default 10)" },
      orientation: { type: "string", enum: ["landscape", "portrait", "squarish"], description: "Filter by orientation" },
    }, required: ["access_key", "query"] },
  },
  {
    name: "unsplash_get_photo",
    description: "Get a single Unsplash photo by id (URLs + attribution).",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {
      access_key: { type: "string", description: "Unsplash Access Key" },
      photo_id: { type: "string", description: "Unsplash photo id" },
    }, required: ["access_key", "photo_id"] },
  },
  {
    name: "unsplash_random_photo",
    description: "Get a random Unsplash photo, optionally matching a query.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {
      access_key: { type: "string", description: "Unsplash Access Key" },
      query: { type: "string", description: "Optional topic to match" },
      orientation: { type: "string", enum: ["landscape", "portrait", "squarish"], description: "Filter by orientation" },
    }, required: ["access_key"] },
  },

  // ── giphy-tool.ts ─────────────────────────────────────────────────────────────
  {
    name: "giphy_search",
    description: "Search Giphy for GIFs.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {
      api_key: { type: "string", description: "Giphy API key" },
      query: { type: "string", description: "What GIF to search for" },
      limit: { type: "number", description: "GIFs to return (max 50, default 10)" },
      rating: { type: "string", enum: ["g", "pg", "pg-13", "r"], description: "Content rating cap" },
    }, required: ["api_key", "query"] },
  },
  {
    name: "giphy_trending",
    description: "Get trending GIFs from Giphy.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {
      api_key: { type: "string", description: "Giphy API key" },
      limit: { type: "number", description: "GIFs to return (max 50, default 10)" },
      rating: { type: "string", enum: ["g", "pg", "pg-13", "r"], description: "Content rating cap" },
    }, required: ["api_key"] },
  },
  {
    name: "giphy_random",
    description: "Get a random GIF from Giphy, optionally by tag.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {
      api_key: { type: "string", description: "Giphy API key" },
      tag: { type: "string", description: "Optional tag to match" },
      rating: { type: "string", enum: ["g", "pg", "pg-13", "r"], description: "Content rating cap" },
    }, required: ["api_key"] },
  },

  // ── miro-tool.ts ──────────────────────────────────────────────────────────────
  {
    name: "miro_list_boards",
    description: "List Miro boards.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {
      access_token: { type: "string", description: "Miro access token" },
      query: { type: "string", description: "Filter boards by name" },
      limit: { type: "number", description: "Boards to return (max 50, default 25)" },
    }, required: ["access_token"] },
  },
  {
    name: "miro_get_board",
    description: "Get a single Miro board by id.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {
      access_token: { type: "string", description: "Miro access token" },
      board_id: { type: "string", description: "Miro board id" },
    }, required: ["access_token", "board_id"] },
  },
  {
    name: "miro_list_items",
    description: "List the items (notes, shapes, text) on a Miro board.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {
      access_token: { type: "string", description: "Miro access token" },
      board_id: { type: "string", description: "Miro board id" },
      type: { type: "string", description: "Filter by item type (e.g. sticky_note, shape, text)" },
      limit: { type: "number", description: "Items to return (max 50, default 25)" },
    }, required: ["access_token", "board_id"] },
  },

  // ── shortcut-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "shortcut_search_stories",
    description: "Search Shortcut stories with the search syntax.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {
      api_token: { type: "string", description: "Shortcut API token" },
      query: { type: "string", description: "Search query (e.g. 'state:\"In Progress\" owner:me')" },
      limit: { type: "number", description: "Results to return (max 25, default 25)" },
    }, required: ["api_token", "query"] },
  },
  {
    name: "shortcut_get_story",
    description: "Get a single Shortcut story by id.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {
      api_token: { type: "string", description: "Shortcut API token" },
      story_id: { type: "string", description: "Shortcut story id" },
    }, required: ["api_token", "story_id"] },
  },
  {
    name: "shortcut_list_projects",
    description: "List Shortcut projects.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {
      api_token: { type: "string", description: "Shortcut API token" },
    }, required: ["api_token"] },
  },
  {
    name: "shortcut_list_epics",
    description: "List Shortcut epics.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {
      api_token: { type: "string", description: "Shortcut API token" },
    }, required: ["api_token"] },
  },

  // ── wikipedia-tool.ts ─────────────────────────────────────────────────────────
  {
    name: "wikipedia_search",
    description: "Search Wikipedia article titles. No key needed.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {
      query: { type: "string", description: "What to search for" },
      lang: { type: "string", description: "Wikipedia language code (default en)" },
      limit: { type: "number", description: "Results to return (max 50, default 10)" },
    }, required: ["query"] },
  },
  {
    name: "wikipedia_summary",
    description: "Get a short Wikipedia summary for a page title. No key needed.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {
      title: { type: "string", description: "Exact page title" },
      lang: { type: "string", description: "Wikipedia language code (default en)" },
    }, required: ["title"] },
  },
  {
    name: "wikipedia_page",
    description: "Get the full plain-text Wikipedia article for a title. No key needed.",
    inputSchema: { type: "object" as const, additionalProperties: false, properties: {
      title: { type: "string", description: "Exact page title" },
      lang: { type: "string", description: "Wikipedia language code (default en)" },
    }, required: ["title"] },
  },

  // ── coda-tool.ts ──────────────────────────────────────────────────────────────
  { name: "coda_list_docs", description: "List your Coda docs.", inputSchema: { type: "object" as const, additionalProperties: false, properties: {
    api_token: { type: "string", description: "Coda API token" },
    query: { type: "string", description: "Filter docs by name" },
    limit: { type: "number", description: "Docs to return (max 100, default 25)" },
  }, required: ["api_token"] } },
  { name: "coda_list_tables", description: "List the tables in a Coda doc.", inputSchema: { type: "object" as const, additionalProperties: false, properties: {
    api_token: { type: "string", description: "Coda API token" },
    doc_id: { type: "string", description: "Coda doc id" },
  }, required: ["api_token", "doc_id"] } },
  { name: "coda_list_rows", description: "List rows in a Coda table.", inputSchema: { type: "object" as const, additionalProperties: false, properties: {
    api_token: { type: "string", description: "Coda API token" },
    doc_id: { type: "string", description: "Coda doc id" },
    table_id: { type: "string", description: "Coda table id or name" },
    limit: { type: "number", description: "Rows to return (max 200, default 25)" },
  }, required: ["api_token", "doc_id", "table_id"] } },

  // ── brevo-tool.ts ─────────────────────────────────────────────────────────────
  { name: "brevo_list_contacts", description: "List Brevo contacts.", inputSchema: { type: "object" as const, additionalProperties: false, properties: {
    api_key: { type: "string", description: "Brevo API key" },
    limit: { type: "number", description: "Contacts to return (max 1000, default 50)" },
    offset: { type: "number", description: "Pagination offset" },
  }, required: ["api_key"] } },
  { name: "brevo_list_campaigns", description: "List Brevo email campaigns.", inputSchema: { type: "object" as const, additionalProperties: false, properties: {
    api_key: { type: "string", description: "Brevo API key" },
    status: { type: "string", description: "Filter by status (sent, draft, queued, ...)" },
    limit: { type: "number", description: "Campaigns to return (max 100, default 25)" },
  }, required: ["api_key"] } },
  { name: "brevo_get_account", description: "Get the Brevo account profile and plan.", inputSchema: { type: "object" as const, additionalProperties: false, properties: {
    api_key: { type: "string", description: "Brevo API key" },
  }, required: ["api_key"] } },

  // ── uptimerobot-tool.ts ───────────────────────────────────────────────────────
  { name: "uptimerobot_get_monitors", description: "List UptimeRobot monitors (signals when any are DOWN).", inputSchema: { type: "object" as const, additionalProperties: false, properties: {
    api_key: { type: "string", description: "UptimeRobot API key" },
    search: { type: "string", description: "Filter monitors by name or URL" },
  }, required: ["api_key"] } },
  { name: "uptimerobot_get_account", description: "Get UptimeRobot account details and limits.", inputSchema: { type: "object" as const, additionalProperties: false, properties: {
    api_key: { type: "string", description: "UptimeRobot API key" },
  }, required: ["api_key"] } },

  // ── dropbox-tool.ts ───────────────────────────────────────────────────────────
  { name: "dropbox_list_folder", description: "List files and folders in a Dropbox path (empty path = root).", inputSchema: { type: "object" as const, additionalProperties: false, properties: {
    access_token: { type: "string", description: "Dropbox access token" },
    path: { type: "string", description: "Folder path (empty string for root)" },
    limit: { type: "number", description: "Entries to return (max 2000, default 100)" },
  }, required: ["access_token"] } },
  { name: "dropbox_search", description: "Search Dropbox for files and folders by name.", inputSchema: { type: "object" as const, additionalProperties: false, properties: {
    access_token: { type: "string", description: "Dropbox access token" },
    query: { type: "string", description: "File or folder name to search for" },
    limit: { type: "number", description: "Results to return (max 1000, default 25)" },
  }, required: ["access_token", "query"] } },
  { name: "dropbox_get_account", description: "Get the current Dropbox account profile.", inputSchema: { type: "object" as const, additionalProperties: false, properties: {
    access_token: { type: "string", description: "Dropbox access token" },
  }, required: ["access_token"] } },

  // ── bitbucket-tool.ts ─────────────────────────────────────────────────────────
  { name: "bitbucket_list_repos", description: "List Bitbucket repositories in a workspace.", inputSchema: { type: "object" as const, additionalProperties: false, properties: {
    username: { type: "string", description: "Bitbucket username" },
    app_password: { type: "string", description: "Bitbucket app password" },
    workspace: { type: "string", description: "Workspace id" },
    limit: { type: "number", description: "Repos to return (max 100, default 25)" },
  }, required: ["username", "app_password", "workspace"] } },
  { name: "bitbucket_get_repo", description: "Get a single Bitbucket repository.", inputSchema: { type: "object" as const, additionalProperties: false, properties: {
    username: { type: "string", description: "Bitbucket username" },
    app_password: { type: "string", description: "Bitbucket app password" },
    workspace: { type: "string", description: "Workspace id" },
    repo: { type: "string", description: "Repository slug" },
  }, required: ["username", "app_password", "workspace", "repo"] } },
  { name: "bitbucket_list_pull_requests", description: "List pull requests for a Bitbucket repository.", inputSchema: { type: "object" as const, additionalProperties: false, properties: {
    username: { type: "string", description: "Bitbucket username" },
    app_password: { type: "string", description: "Bitbucket app password" },
    workspace: { type: "string", description: "Workspace id" },
    repo: { type: "string", description: "Repository slug" },
    state: { type: "string", enum: ["OPEN", "MERGED", "DECLINED", "SUPERSEDED"], description: "Filter by PR state" },
    limit: { type: "number", description: "PRs to return (max 50, default 25)" },
  }, required: ["username", "app_password", "workspace", "repo"] } },

  // ── cloudinary-tool.ts ────────────────────────────────────────────────────────
  { name: "cloudinary_list_resources", description: "List Cloudinary media resources.", inputSchema: { type: "object" as const, additionalProperties: false, properties: {
    cloud_name: { type: "string", description: "Cloudinary cloud name" },
    api_key: { type: "string", description: "Cloudinary API key" },
    api_secret: { type: "string", description: "Cloudinary API secret" },
    resource_type: { type: "string", description: "image (default), video, or raw" },
    prefix: { type: "string", description: "Filter by public_id prefix / folder" },
    limit: { type: "number", description: "Resources to return (max 100, default 25)" },
  }, required: ["cloud_name", "api_key", "api_secret"] } },
  { name: "cloudinary_get_usage", description: "Get Cloudinary usage and quota.", inputSchema: { type: "object" as const, additionalProperties: false, properties: {
    cloud_name: { type: "string", description: "Cloudinary cloud name" },
    api_key: { type: "string", description: "Cloudinary API key" },
    api_secret: { type: "string", description: "Cloudinary API secret" },
  }, required: ["cloud_name", "api_key", "api_secret"] } },

  // ── wordpress-tool.ts ─────────────────────────────────────────────────────────
  { name: "wordpress_list_posts", description: "List WordPress posts, optionally by search term.", inputSchema: { type: "object" as const, additionalProperties: false, properties: {
    site_url: { type: "string", description: "WordPress site URL" },
    username: { type: "string", description: "WordPress username" },
    app_password: { type: "string", description: "WordPress application password" },
    search: { type: "string", description: "Search term" },
    status: { type: "string", description: "Filter by status (publish, draft, ...)" },
    limit: { type: "number", description: "Posts to return (max 100, default 10)" },
  }, required: ["site_url", "username", "app_password"] } },
  { name: "wordpress_get_post", description: "Get a single WordPress post by id.", inputSchema: { type: "object" as const, additionalProperties: false, properties: {
    site_url: { type: "string", description: "WordPress site URL" },
    username: { type: "string", description: "WordPress username" },
    app_password: { type: "string", description: "WordPress application password" },
    post_id: { type: "string", description: "Post id" },
  }, required: ["site_url", "username", "app_password", "post_id"] } },
  { name: "wordpress_list_pages", description: "List WordPress pages.", inputSchema: { type: "object" as const, additionalProperties: false, properties: {
    site_url: { type: "string", description: "WordPress site URL" },
    username: { type: "string", description: "WordPress username" },
    app_password: { type: "string", description: "WordPress application password" },
    search: { type: "string", description: "Search term" },
    limit: { type: "number", description: "Pages to return (max 100, default 10)" },
  }, required: ["site_url", "username", "app_password"] } },

  // ── ghost-tool.ts ─────────────────────────────────────────────────────────────
  { name: "ghost_list_posts", description: "List published Ghost posts.", inputSchema: { type: "object" as const, additionalProperties: false, properties: {
    site_url: { type: "string", description: "Ghost site URL" },
    content_key: { type: "string", description: "Ghost Content API key" },
    filter: { type: "string", description: "Ghost filter (e.g. tag:news)" },
    limit: { type: "number", description: "Posts to return (max 100, default 15)" },
  }, required: ["site_url", "content_key"] } },
  { name: "ghost_list_pages", description: "List Ghost pages.", inputSchema: { type: "object" as const, additionalProperties: false, properties: {
    site_url: { type: "string", description: "Ghost site URL" },
    content_key: { type: "string", description: "Ghost Content API key" },
    limit: { type: "number", description: "Pages to return (max 100, default 15)" },
  }, required: ["site_url", "content_key"] } },
  { name: "ghost_list_tags", description: "List Ghost tags.", inputSchema: { type: "object" as const, additionalProperties: false, properties: {
    site_url: { type: "string", description: "Ghost site URL" },
    content_key: { type: "string", description: "Ghost Content API key" },
    limit: { type: "number", description: "Tags to return (max 100, default 50)" },
  }, required: ["site_url", "content_key"] } },

  // ── zendesk-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "zendesk_search",
    description: "Search Zendesk with the query DSL (e.g. 'type:ticket status:open priority:urgent').",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        subdomain: { type: "string", description: "Zendesk subdomain (e.g. mycompany)" },
        email: { type: "string", description: "Agent email address" },
        api_token: { type: "string", description: "Zendesk API token" },
        query: { type: "string", description: "Zendesk search query" },
      },
      required: ["subdomain", "email", "api_token", "query"],
    },
  },
  {
    name: "zendesk_list_tickets",
    description: "List recent Zendesk tickets (signals when any are still new).",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        subdomain: { type: "string", description: "Zendesk subdomain" },
        email: { type: "string", description: "Agent email address" },
        api_token: { type: "string", description: "Zendesk API token" },
        sort_by: { type: "string", description: "Sort field (e.g. created_at, updated_at)" },
        limit: { type: "number", description: "Tickets to return (max 100, default 25)" },
      },
      required: ["subdomain", "email", "api_token"],
    },
  },
  {
    name: "zendesk_get_ticket",
    description: "Get a single Zendesk ticket by id.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        subdomain: { type: "string", description: "Zendesk subdomain" },
        email: { type: "string", description: "Agent email address" },
        api_token: { type: "string", description: "Zendesk API token" },
        ticket_id: { type: "string", description: "Ticket id" },
      },
      required: ["subdomain", "email", "api_token", "ticket_id"],
    },
  },
  {
    name: "zendesk_add_comment",
    description: "Add a public or internal comment to a Zendesk ticket.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        subdomain: { type: "string", description: "Zendesk subdomain" },
        email: { type: "string", description: "Agent email address" },
        api_token: { type: "string", description: "Zendesk API token" },
        ticket_id: { type: "string", description: "Ticket id" },
        body: { type: "string", description: "Comment text" },
        public: { type: "boolean", description: "Public reply (default true) or internal note (false)" },
      },
      required: ["subdomain", "email", "api_token", "ticket_id", "body"],
    },
  },

  // ── intercom-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "intercom_list_conversations",
    description: "List recent Intercom conversations.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string", description: "Intercom access token" },
        limit: { type: "number", description: "Conversations to return (max 150, default 20)" },
        starting_after: { type: "string", description: "Pagination cursor from a previous response" },
      },
      required: ["access_token"],
    },
  },
  {
    name: "intercom_get_conversation",
    description: "Get a single Intercom conversation by id.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string", description: "Intercom access token" },
        conversation_id: { type: "string", description: "Conversation id" },
      },
      required: ["access_token", "conversation_id"],
    },
  },
  {
    name: "intercom_list_contacts",
    description: "List Intercom contacts.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string", description: "Intercom access token" },
        limit: { type: "number", description: "Contacts to return (max 150, default 25)" },
        starting_after: { type: "string", description: "Pagination cursor from a previous response" },
      },
      required: ["access_token"],
    },
  },
  {
    name: "intercom_search_contacts",
    description: "Search Intercom contacts by email.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string", description: "Intercom access token" },
        query: { type: "string", description: "Email (or partial email) to match" },
      },
      required: ["access_token", "query"],
    },
  },

  // ── typeform-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "typeform_list_forms",
    description: "List your Typeform forms.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string", description: "Typeform personal access token" },
        search: { type: "string", description: "Filter forms by title" },
        limit: { type: "number", description: "Forms to return (max 200, default 25)" },
      },
      required: ["access_token"],
    },
  },
  {
    name: "typeform_get_form",
    description: "Get a Typeform form definition (fields and titles) by id.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string", description: "Typeform personal access token" },
        form_id: { type: "string", description: "Form id" },
      },
      required: ["access_token", "form_id"],
    },
  },
  {
    name: "typeform_get_responses",
    description: "Get submissions for a Typeform form.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string", description: "Typeform personal access token" },
        form_id: { type: "string", description: "Form id" },
        since: { type: "string", description: "ISO 8601 lower bound on submission time" },
        limit: { type: "number", description: "Responses to return (max 1000, default 25)" },
      },
      required: ["access_token", "form_id"],
    },
  },

  // ── calcom-tool.ts ────────────────────────────────────────────────────────────
  {
    name: "calcom_me",
    description: "Get the authenticated Cal.com user's profile.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Cal.com API key" },
      },
      required: ["api_key"],
    },
  },
  {
    name: "calcom_list_event_types",
    description: "List your Cal.com bookable event (meeting) types.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Cal.com API key" },
      },
      required: ["api_key"],
    },
  },
  {
    name: "calcom_list_bookings",
    description: "List Cal.com bookings, optionally filtered by status.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Cal.com API key" },
        status: { type: "string", description: "Filter by status (upcoming, past, cancelled, ...)" },
      },
      required: ["api_key"],
    },
  },

  // ── posthog-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "posthog_list_feature_flags",
    description: "List PostHog feature flags for a project.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "PostHog Personal API key" },
        project_id: { type: "string", description: "PostHog project id (can be a saved default)" },
        host: { type: "string", description: "PostHog host (default https://us.posthog.com)" },
      },
      required: ["api_key"],
    },
  },
  {
    name: "posthog_list_insights",
    description: "List saved PostHog insights (charts) for a project.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "PostHog Personal API key" },
        project_id: { type: "string", description: "PostHog project id (can be a saved default)" },
        host: { type: "string", description: "PostHog host (default https://us.posthog.com)" },
        search: { type: "string", description: "Filter insights by name" },
        limit: { type: "number", description: "Results to return (max 100, default 25)" },
      },
      required: ["api_key"],
    },
  },
  {
    name: "posthog_list_persons",
    description: "List PostHog persons (users) for a project.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "PostHog Personal API key" },
        project_id: { type: "string", description: "PostHog project id (can be a saved default)" },
        host: { type: "string", description: "PostHog host (default https://us.posthog.com)" },
        search: { type: "string", description: "Filter persons by email or properties" },
        limit: { type: "number", description: "Results to return (max 100, default 25)" },
      },
      required: ["api_key"],
    },
  },
  {
    name: "posthog_query",
    description: "Run an ad-hoc HogQL (SQL) query against a PostHog project's events.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "PostHog Personal API key" },
        project_id: { type: "string", description: "PostHog project id (can be a saved default)" },
        host: { type: "string", description: "PostHog host (default https://us.posthog.com)" },
        query: { type: "string", description: "HogQL/SQL query (e.g. select count() from events)" },
      },
      required: ["api_key", "query"],
    },
  },

  // ── netlify-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "netlify_list_sites",
    description: "List Netlify sites for the account.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string", description: "Netlify personal access token" },
        name: { type: "string", description: "Filter sites by name" },
        limit: { type: "number", description: "Sites to return (max 100, default 25)" },
      },
      required: ["access_token"],
    },
  },
  {
    name: "netlify_get_site",
    description: "Get a single Netlify site by id.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string", description: "Netlify personal access token" },
        site_id: { type: "string", description: "Netlify site id (can be a saved default)" },
      },
      required: ["access_token"],
    },
  },
  {
    name: "netlify_list_deploys",
    description: "List recent deploys for a Netlify site (signals when the latest deploy failed).",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string", description: "Netlify personal access token" },
        site_id: { type: "string", description: "Netlify site id (can be a saved default)" },
        limit: { type: "number", description: "Deploys to return (max 100, default 10)" },
      },
      required: ["access_token"],
    },
  },
  {
    name: "netlify_get_deploy",
    description: "Get a single Netlify deploy by id (including build logs metadata).",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string", description: "Netlify personal access token" },
        deploy_id: { type: "string", description: "Netlify deploy id" },
      },
      required: ["access_token", "deploy_id"],
    },
  },

  // ── deepl-tool.ts ─────────────────────────────────────────────────────────────
  {
    name: "deepl_translate_text",
    description: "Translate text into another language using DeepL's neural translation engine.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        auth_key: { type: "string", description: "DeepL Auth Key from deepl.com. Free tier keys end with :fx." },
        text: { description: "Text or array of texts to translate (max 50 texts per call)", oneOf: [{ type: "string" }, { type: "array", items: { type: "string" } }] },
        target_lang: { type: "string", description: "Target language code (e.g. EN-US, EN-GB, DE, FR, JA, ZH, ES)" },
        source_lang: { type: "string", description: "Source language code (auto-detected if omitted)" },
        formality: { type: "string", enum: ["default", "more", "less", "prefer_more", "prefer_less"], description: "Formality level (supported in some languages)" },
        preserve_formatting: { type: "boolean", description: "Preserve original formatting" },
        tag_handling: { type: "string", enum: ["xml", "html"], description: "Enable tag handling" },
      },
      required: ["auth_key", "text", "target_lang"],
    },
  },
  {
    name: "deepl_get_usage",
    description: "Get DeepL API usage and quota information for the current billing period.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        auth_key: { type: "string", description: "DeepL Auth Key" },
      },
      required: ["auth_key"],
    },
  },
  {
    name: "deepl_list_languages",
    description: "List all languages supported by DeepL for translation.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        auth_key: { type: "string", description: "DeepL Auth Key" },
        type: { type: "string", enum: ["source", "target"], description: "Language direction (default: target)" },
      },
      required: ["auth_key"],
    },
  },
  {
    name: "deepl_translate_document",
    description: "Submit a document (PDF, Word, PowerPoint) for translation via DeepL.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        auth_key: { type: "string", description: "DeepL Auth Key" },
        document_url: { type: "string", description: "Publicly accessible URL of the document to translate" },
        target_lang: { type: "string", description: "Target language code (e.g. DE, FR, JA)" },
        source_lang: { type: "string", description: "Source language code (auto-detected if omitted)" },
        filename: { type: "string", description: "Filename with extension (e.g. report.pdf)" },
        formality: { type: "string", enum: ["default", "more", "less"], description: "Formality level" },
      },
      required: ["auth_key", "document_url", "target_lang"],
    },
  },

  // ── assemblyai-tool.ts ────────────────────────────────────────────────────────
  {
    name: "assemblyai_transcribe",
    description: "Submit an audio or video file for transcription with AssemblyAI.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "AssemblyAI API key from assemblyai.com/dashboard" },
        audio_url: { type: "string", description: "Publicly accessible URL of the audio/video file" },
        language_code: { type: "string", description: "Language code (e.g. en, es, fr, de). Omit for auto-detection." },
        language_detection: { type: "boolean", description: "Enable automatic language detection" },
        speaker_labels: { type: "boolean", description: "Enable speaker diarization" },
        auto_chapters: { type: "boolean", description: "Generate auto chapters" },
        summarization: { type: "boolean", description: "Generate a summary (also set summary_type)" },
        summary_type: { type: "string", enum: ["bullets", "bullets_verbose", "gist", "headline", "paragraph"], description: "Summary format" },
        sentiment_analysis: { type: "boolean", description: "Enable sentiment analysis per sentence" },
        entity_detection: { type: "boolean", description: "Enable named entity detection" },
        punctuate: { type: "boolean", description: "Add punctuation (default: true)" },
        format_text: { type: "boolean", description: "Format text with capitalisation" },
        webhook_url: { type: "string", description: "URL to POST transcript results to when complete" },
      },
      required: ["api_key", "audio_url"],
    },
  },
  {
    name: "assemblyai_get_transcript",
    description: "Get the status and results of an AssemblyAI transcription job.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "AssemblyAI API key" },
        transcript_id: { type: "string", description: "Transcript ID returned by assemblyai_transcribe" },
      },
      required: ["api_key", "transcript_id"],
    },
  },
  {
    name: "assemblyai_list_transcripts",
    description: "List recent AssemblyAI transcripts for the account.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "AssemblyAI API key" },
        limit: { type: "number", description: "Number of transcripts to return (default: 10, max: 200)" },
        status: { type: "string", enum: ["queued", "processing", "completed", "error"], description: "Filter by status" },
        after_id: { type: "string", description: "Cursor: return transcripts after this ID" },
        before_id: { type: "string", description: "Cursor: return transcripts before this ID" },
      },
      required: ["api_key"],
    },
  },
  {
    name: "assemblyai_get_sentences",
    description: "Get a completed transcript split into individual sentences.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "AssemblyAI API key" },
        transcript_id: { type: "string", description: "Completed transcript ID" },
      },
      required: ["api_key", "transcript_id"],
    },
  },
  {
    name: "assemblyai_get_paragraphs",
    description: "Get a completed transcript split into paragraphs.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "AssemblyAI API key" },
        transcript_id: { type: "string", description: "Completed transcript ID" },
      },
      required: ["api_key", "transcript_id"],
    },
  },
  {
    name: "assemblyai_summarize",
    description: "Get the AI-generated summary for a completed AssemblyAI transcript (must have been submitted with summarization enabled).",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "AssemblyAI API key" },
        transcript_id: { type: "string", description: "Completed transcript ID" },
      },
      required: ["api_key", "transcript_id"],
    },
  },

  // ── groq-tool.ts ──────────────────────────────────────────────────────────────
  {
    name: "groq_chat_completion",
    description: "Run a fast LLM inference with Groq. Supports Llama 3, Mixtral, Gemma, and other open models at high speed.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Groq API key from console.groq.com/keys" },
        model: { type: "string", description: "Model ID (e.g. llama-3.3-70b-versatile, mixtral-8x7b-32768, gemma2-9b-it). Default: llama-3.3-70b-versatile" },
        messages: { type: "array", items: { type: "object", additionalProperties: true }, description: "Array of {role, content} messages" },
        prompt: { type: "string", description: "Single user message (alternative to messages)" },
        system_prompt: { type: "string", description: "System prompt (used with prompt shorthand)" },
        max_tokens: { type: "number", description: "Maximum tokens to generate" },
        temperature: { type: "number", minimum: 0, maximum: 2, description: "Sampling temperature (0-2)" },
        top_p: { type: "number", description: "Top-p sampling (0-1)" },
        stop: { description: "Stop sequence(s)", oneOf: [{ type: "string" }, { type: "array", items: { type: "string" } }] },
      },
      required: ["api_key"],
    },
  },
  {
    name: "groq_list_models",
    description: "List all models available on Groq.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Groq API key" },
      },
      required: ["api_key"],
    },
  },

  // ── nudgeonly-tool.ts ─────────────────────────────────────────────────────
  {
    name: "nudgeonly_policy",
    description: "Return the PinballWake NudgeOnlyAPI guardrails. This is a red-lane, read-only policy for 👉Nudge: painpoint hints only, no writes, no decisions, no truth-setting.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {},
    },
  },
  {
    name: "nudgeonly_api",
    description: "Run 👉Nudge, the PinballWake NudgeOnlyAPI worker, through OpenRouter free routing. Use only for painpoint hints and simple-English nudge summaries. It cannot merge, close, approve, assign ownership, mark done, or set source-of-truth state.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "OpenRouter API key. Optional when OPENROUTER_API_KEY is set in the environment." },
        event_text: { type: "string", description: "Noisy event, signal, handoff, or status text for 👉Nudge to classify." },
        context: { type: "string", description: "Optional local context. Keep it small and non-secret." },
        painpoint_hint: { type: "string", description: "Optional hint such as stale_ack, duplicate_wake, unclear_owner, noisy_thread, or missing_proof." },
        source_id: { type: "string", description: "Optional upstream event, dispatch, PR, issue, or wake identifier for trace evidence." },
        source_url: { type: "string", description: "Optional upstream URL for trace evidence." },
        model: { type: "string", description: "OpenRouter model ID. Default: liquid/lfm-2.5-1.2b-instruct:free. Use openrouter/free only when auto-rotation is desired." },
        allow_paid: { type: "boolean", description: "Explicit opt-in required for paid or unknown OpenRouter model IDs. Free :free models do not need this." },
        max_tokens: { type: "number", description: "Maximum output tokens. Hard capped at 500. Default: 260." },
      },
      required: ["event_text"],
    },
  },
  {
    name: "nudgeonly_receipt_bridge",
    description: "Turn a verified NudgeOnly painpoint into a tiny worker receipt request or WakePass escalation candidate. Deterministic bridge only: no writes, no ownership decision, no completion state.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        nudge_result: { type: "object", description: "Optional output from nudgeonly_api." },
        painpoint_detected: { type: "boolean", description: "Whether a painpoint was detected by trusted evidence or nudgeonly_api." },
        painpoint_type: { type: "string", description: "stale_ack, duplicate_wake, unclear_owner, noisy_thread, missing_proof, or none." },
        event_text: { type: "string", description: "Source event, blocker, handoff, or state-card text. Keep it small and non-secret." },
        context: { type: "string", description: "Optional local context. Keep it small and non-secret." },
        source_id: { type: "string", description: "Optional upstream event, dispatch, PR, issue, or wake identifier." },
        source_url: { type: "string", description: "Optional upstream source URL." },
        target: { type: "string", description: "Optional human target label such as PR #705 or a dispatch ID." },
        owner: { type: "string", description: "Optional existing owner evidence. The bridge does not invent or decide owners." },
        worker: { type: "string", description: "Optional worker override when a trusted lane already named one." },
        ack_status: { type: "string", description: "Optional ACK status such as missing, stale, received, or blocked." },
        proof_status: { type: "string", description: "Optional proof status such as missing, present, stale, or blocked." },
        created_at: { type: "string", description: "Optional ISO timestamp for the source handoff or request." },
        now: { type: "string", description: "Optional ISO timestamp used for deterministic TTL checks." },
        ttl_minutes: { type: "number", description: "Minutes before missing ACK/proof becomes an escalation request. Default: 60." },
        owner_last_seen_at: { type: "string", description: "Optional ISO timestamp for the current owner's last real check-in. Past TTL is treated as an expired ownership lease." },
        owner_silent_minutes: { type: "number", description: "Optional owner silence age in minutes. Past TTL is treated as an expired ownership lease." },
        nudge_trace_id: { type: "string", description: "Optional trace_id from nudgeonly_api." },
      },
    },
  },

  // ── igniteonly-tool.ts ─────────────────────────────────────────────────────
  {
    name: "igniteonly_policy",
    description: "Return the PinballWake IgniteOnlyAPI guardrails. This is the green ignite sibling to NudgeOnly: verified worker wake packets only, no build, merge, approval, closure, or truth-setting.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {},
    },
  },
  {
    name: "igniteonly_api",
    description: "Run IgniteOnly💥 on a verified NudgeOnly bridge result or deterministic evidence. Emits a compact public worker wake packet only when safety gates pass.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        nudge_bridge_result: { type: "object", description: "Optional output from nudgeonly_receipt_bridge." },
        bridge_result: { type: "object", description: "Optional bridge result alias." },
        bridge_id: { type: "string", description: "Optional trusted bridge ID, such as nudgebridge_<hash>." },
        bridge_status: { type: "string", description: "receipt_request, escalation_request, advisory_only, or quiet." },
        painpoint_detected: { type: "boolean", description: "Whether trusted evidence found a painpoint." },
        painpoint_type: { type: "string", description: "stale_ack, duplicate_wake, unclear_owner, noisy_thread, missing_proof, dormant_worker, or none." },
        source_id: { type: "string", description: "Optional upstream event, dispatch, PR, issue, or wake identifier." },
        source_url: { type: "string", description: "Optional upstream source URL." },
        target: { type: "string", description: "Human target label such as PR #706, issue #706, or a dispatch ID." },
        request: { type: "object", description: "Optional receipt request with worker, expected_receipt, verifier, and receipt_line." },
        verified: { type: "boolean", description: "True only when a trusted deterministic verifier has checked the evidence." },
        verifier_status: { type: "string", description: "Optional verifier status such as passed, verified, confirmed, wakepass_pass, proof_checked, or ack_checked." },
        nudge_trace_id: { type: "string", description: "Optional upstream NudgeOnly trace ID." },
      },
    },
  },
  {
    name: "igniteonly_receipt_consumer",
    description: "Consume a NudgeOnly receipt bridge result and emit a compact IgniteOnly worker wake packet when verified. It never edits code, merges, approves, closes, or marks done.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        nudge_bridge_result: { type: "object", description: "Optional output from nudgeonly_receipt_bridge." },
        bridge_result: { type: "object", description: "Optional bridge result alias." },
        bridge_id: { type: "string", description: "Optional trusted bridge ID, such as nudgebridge_<hash>." },
        bridge_status: { type: "string", description: "receipt_request, escalation_request, advisory_only, or quiet." },
        painpoint_detected: { type: "boolean", description: "Whether trusted evidence found a painpoint." },
        painpoint_type: { type: "string", description: "stale_ack, duplicate_wake, unclear_owner, noisy_thread, missing_proof, dormant_worker, or none." },
        source_id: { type: "string", description: "Optional upstream event, dispatch, PR, issue, or wake identifier." },
        source_url: { type: "string", description: "Optional upstream source URL." },
        target: { type: "string", description: "Human target label such as PR #706, issue #706, or a dispatch ID." },
        request: { type: "object", description: "Optional receipt request with worker, expected_receipt, verifier, and receipt_line." },
        verified: { type: "boolean", description: "True only when a trusted deterministic verifier has checked the evidence." },
        verifier_status: { type: "string", description: "Optional verifier status such as passed, verified, confirmed, wakepass_pass, proof_checked, or ack_checked." },
        nudge_trace_id: { type: "string", description: "Optional upstream NudgeOnly trace ID." },
      },
    },
  },

  // ── pushonly-tool.ts ───────────────────────────────────────────────────────
  {
    name: "pushonly_policy",
    description: "Return the PinballWake PushOnlyAPI guardrails. This blue push lane turns verified IgniteOnly wake packets into worker-facing push envelopes only; no execution or source-of-truth writes.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {},
    },
  },
  {
    name: "pushonly_api",
    description: "Run PushOnly📬 on a verified IgniteOnly wake packet. Emits a public worker push envelope for a known worker route only; never builds, merges, assigns, closes, or marks done.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        ignite_result: { type: "object", description: "Optional output from igniteonly_api or igniteonly_receipt_consumer." },
        igniteonly_result: { type: "object", description: "Optional IgniteOnly result alias." },
        wake_packet: { type: "object", description: "Optional IgniteOnly wake_packet." },
        ignite_id: { type: "string", description: "Optional IgniteOnly ID." },
        ignite_status: { type: "string", description: "wake_request or escalation_wake_request." },
        worker: { type: "string", description: "Known worker route such as pinballwake-jobs-worker, Builder, Reviewer, Job Manager, or Heartbeat Seat." },
        target: { type: "string", description: "Human target label such as Boardroom backlog, PR #706, issue #706, or a dispatch ID." },
        painpoint_type: { type: "string", description: "stale_ack, duplicate_wake, unclear_owner, queue_hydration_failure, noisy_thread, missing_proof, dormant_worker, or none." },
        source_id: { type: "string", description: "Optional upstream event, dispatch, PR, issue, or wake identifier." },
        source_url: { type: "string", description: "Optional upstream source URL." },
        bridge_id: { type: "string", description: "Optional trusted bridge ID." },
        nudge_trace_id: { type: "string", description: "Optional upstream NudgeOnly trace ID." },
        receipt_line: { type: "string", description: "Optional compact receipt line copied from IgniteOnly." },
        expected_receipt: { type: "string", description: "Optional expected worker ACK/proof text." },
        verifier: { type: "string", description: "Optional verifier text copied from IgniteOnly." },
        public_fields_only: { type: "boolean", description: "Must be true when supplying wake fields directly." },
      },
    },
  },
  {
    name: "pushonly_wake_pusher",
    description: "Consume a verified IgniteOnly wake packet and emit a compact public PushOnly worker envelope. It never writes source-of-truth state or executes the work.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        ignite_result: { type: "object", description: "Optional output from igniteonly_api or igniteonly_receipt_consumer." },
        igniteonly_result: { type: "object", description: "Optional IgniteOnly result alias." },
        wake_packet: { type: "object", description: "Optional IgniteOnly wake_packet." },
        ignite_id: { type: "string", description: "Optional IgniteOnly ID." },
        ignite_status: { type: "string", description: "wake_request or escalation_wake_request." },
        worker: { type: "string", description: "Known worker route such as pinballwake-jobs-worker, Builder, Reviewer, Job Manager, or Heartbeat Seat." },
        target: { type: "string", description: "Human target label such as Boardroom backlog, PR #706, issue #706, or a dispatch ID." },
        painpoint_type: { type: "string", description: "stale_ack, duplicate_wake, unclear_owner, queue_hydration_failure, noisy_thread, missing_proof, dormant_worker, or none." },
        source_id: { type: "string", description: "Optional upstream event, dispatch, PR, issue, or wake identifier." },
        source_url: { type: "string", description: "Optional upstream source URL." },
        bridge_id: { type: "string", description: "Optional trusted bridge ID." },
        nudge_trace_id: { type: "string", description: "Optional upstream NudgeOnly trace ID." },
        receipt_line: { type: "string", description: "Optional compact receipt line copied from IgniteOnly." },
        expected_receipt: { type: "string", description: "Optional expected worker ACK/proof text." },
        verifier: { type: "string", description: "Optional verifier text copied from IgniteOnly." },
        public_fields_only: { type: "boolean", description: "Must be true when supplying wake fields directly." },
      },
    },
  },

  // ── kling-tool.ts ─────────────────────────────────────────────────────────────
  {
    name: "kling_generate_video",
    description: "Generate a high-quality video from text using Kling AI (Kuaishou). Supports standard and professional modes. Returns a task_id to poll for completion.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Kling AI API key" },
        prompt: { type: "string", description: "Text description of the video to generate" },
        model: { type: "string", description: "Model name: kling-v1 or kling-v1-5 (default: kling-v1)" },
        mode: { type: "string", description: "Generation mode: std (standard) or pro (professional, slower). Default: std" },
        duration: { type: "string", description: "Video duration: 5 or 10 (seconds). Default: 5" },
        image_url: { type: "string", description: "Optional reference image URL for image-to-video" },
        negative_prompt: { type: "string", description: "What to avoid in the video" },
        aspect_ratio: { type: "string", description: "e.g. 16:9, 9:16, 1:1. Default: 16:9" },
        cfg_scale: { type: "number", description: "Guidance scale 0-1 (default: 0.5)" },
      },
      required: ["api_key", "prompt"],
    },
  },
  {
    name: "kling_get_task",
    description: "Check the status of a Kling AI video generation task.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Kling AI API key" },
        task_id: { type: "string", description: "Task ID returned by kling_generate_video" },
      },
      required: ["api_key", "task_id"],
    },
  },

  // ── pagerduty-tool.ts ─────────────────────────────────────────────────────────
  {
    name: "pagerduty_list_incidents",
    description: "List PagerDuty incidents. Filter by status (triggered, acknowledged, resolved), service, or date range.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "PagerDuty API key" },
        status: { type: "string", description: "Filter by status: triggered, acknowledged, or resolved" },
        limit: { type: "number", description: "Max results (default 25, max 100)" },
        offset: { type: "number", description: "Pagination offset" },
        service_ids: { type: "string", description: "Filter by service ID" },
      },
      required: ["api_key"],
    },
  },
  {
    name: "pagerduty_get_incident",
    description: "Get details for a single PagerDuty incident by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "PagerDuty API key" },
        incident_id: { type: "string", description: "Incident ID" },
      },
      required: ["api_key", "incident_id"],
    },
  },
  {
    name: "pagerduty_create_incident",
    description: "Create a new PagerDuty incident on a service.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "PagerDuty API key" },
        title: { type: "string", description: "Incident title/summary" },
        service_id: { type: "string", description: "ID of the service to create the incident on" },
        urgency: { type: "string", description: "Urgency: high or low" },
        body_details: { type: "string", description: "Detailed description of the incident" },
        from: { type: "string", description: "Email address of the user creating the incident (required by some accounts)" },
      },
      required: ["api_key", "title", "service_id"],
    },
  },
  {
    name: "pagerduty_acknowledge_incident",
    description: "Acknowledge a PagerDuty incident by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "PagerDuty API key" },
        incident_id: { type: "string", description: "Incident ID to acknowledge" },
      },
      required: ["api_key", "incident_id"],
    },
  },
  {
    name: "pagerduty_resolve_incident",
    description: "Resolve a PagerDuty incident by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "PagerDuty API key" },
        incident_id: { type: "string", description: "Incident ID to resolve" },
      },
      required: ["api_key", "incident_id"],
    },
  },
  {
    name: "pagerduty_list_services",
    description: "List all services in a PagerDuty account. Optionally filter by name.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "PagerDuty API key" },
        query: { type: "string", description: "Filter services by name" },
        limit: { type: "number", description: "Max results" },
      },
      required: ["api_key"],
    },
  },
  {
    name: "pagerduty_list_oncalls",
    description: "List who is currently on-call in PagerDuty, optionally filtered by schedule or user.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "PagerDuty API key" },
        schedule_ids: { type: "string", description: "Filter by schedule ID" },
        user_ids: { type: "string", description: "Filter by user ID" },
      },
      required: ["api_key"],
    },
  },

  // ── circleci-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "circleci_list_pipelines",
    description: "List CircleCI pipelines for a project or organization. Optionally filter by branch.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "CircleCI personal API token" },
        project_slug: { type: "string", description: "Project slug e.g. gh/MyOrg/my-repo. Omit to list all org pipelines." },
        branch: { type: "string", description: "Filter by branch name" },
        org_slug: { type: "string", description: "Org slug when listing all pipelines (e.g. gh/MyOrg)" },
        page_token: { type: "string", description: "Pagination token" },
      },
      required: ["api_key"],
    },
  },
  {
    name: "circleci_get_pipeline",
    description: "Get details for a single CircleCI pipeline by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "CircleCI personal API token" },
        pipeline_id: { type: "string", description: "Pipeline ID" },
      },
      required: ["api_key", "pipeline_id"],
    },
  },
  {
    name: "circleci_list_workflows",
    description: "List workflows for a CircleCI pipeline.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "CircleCI personal API token" },
        pipeline_id: { type: "string", description: "Pipeline ID" },
      },
      required: ["api_key", "pipeline_id"],
    },
  },
  {
    name: "circleci_get_workflow",
    description: "Get details for a single CircleCI workflow by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "CircleCI personal API token" },
        workflow_id: { type: "string", description: "Workflow ID" },
      },
      required: ["api_key", "workflow_id"],
    },
  },
  {
    name: "circleci_list_jobs",
    description: "List jobs in a CircleCI workflow.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "CircleCI personal API token" },
        workflow_id: { type: "string", description: "Workflow ID" },
      },
      required: ["api_key", "workflow_id"],
    },
  },
  {
    name: "circleci_trigger_pipeline",
    description: "Trigger a new CircleCI pipeline for a project. Optionally specify branch, tag, or parameters.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "CircleCI personal API token" },
        project_slug: { type: "string", description: "Project slug e.g. gh/MyOrg/my-repo" },
        branch: { type: "string", description: "Branch to build (default: main/master)" },
        tag: { type: "string", description: "Tag to build" },
        parameters: { type: "object", additionalProperties: true, description: "Pipeline parameters as key-value pairs" },
      },
      required: ["api_key", "project_slug"],
    },
  },

  // ── segment-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "segment_track_event",
    description: "Track a custom event in Segment. Use for recording user actions like 'Signed Up', 'Item Purchased', etc.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        write_key: { type: "string", description: "Segment source write key" },
        event: { type: "string", description: "Event name (e.g. 'Item Purchased')" },
        user_id: { type: "string", description: "Unique user identifier" },
        anonymous_id: { type: "string", description: "Anonymous ID if user is not logged in" },
        properties: { type: "object", description: "Event properties as key-value pairs" },
        timestamp: { type: "string", description: "ISO 8601 timestamp (defaults to now)" },
      },
      required: ["write_key", "event"],
    },
  },
  {
    name: "segment_identify_user",
    description: "Identify a user in Segment with traits. Links an anonymous ID to a known user ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        write_key: { type: "string", description: "Segment source write key" },
        user_id: { type: "string", description: "Unique user identifier" },
        anonymous_id: { type: "string", description: "Anonymous ID to link to the user" },
        traits: { type: "object", additionalProperties: true, description: "User traits as key-value pairs (e.g. name, email, plan)" },
        timestamp: { type: "string", description: "ISO 8601 timestamp (defaults to now)" },
      },
      required: ["write_key"],
    },
  },
  {
    name: "segment_list_sources",
    description: "List all Segment sources in a workspace using the Segment Public API.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Segment Public API token" },
        workspace_id: { type: "string", description: "Segment workspace ID" },
      },
      required: ["api_key", "workspace_id"],
    },
  },
  {
    name: "segment_list_destinations",
    description: "List all destinations connected to a Segment source.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Segment Public API token" },
        source_id: { type: "string", description: "Segment source ID" },
      },
      required: ["api_key", "source_id"],
    },
  },
  {
    name: "segment_get_source",
    description: "Get details for a single Segment source including settings and enabled state.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Segment Public API token" },
        source_id: { type: "string", description: "Segment source ID" },
      },
      required: ["api_key", "source_id"],
    },
  },

  // ── postmark-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "postmark_send_email",
    description: "Send a transactional email via Postmark. Supports HTML and plain text.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Postmark server token" },
        from: { type: "string", description: "Sender email address (must be verified in Postmark)" },
        to: { type: "string", description: "Recipient email address" },
        subject: { type: "string", description: "Email subject line" },
        html_body: { type: "string", description: "HTML email body" },
        text_body: { type: "string", description: "Plain text email body" },
        reply_to: { type: "string", description: "Reply-to email address" },
        cc: { type: "string", description: "CC email address(es)" },
        bcc: { type: "string", description: "BCC email address(es)" },
        tag: { type: "string", description: "Tag for categorizing messages" },
        message_stream: { type: "string", description: "Message stream ID (default: outbound)" },
      },
      required: ["api_key", "from", "to", "subject"],
    },
  },
  {
    name: "postmark_send_batch",
    description: "Send multiple emails in a single Postmark API call (up to 500 messages).",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Postmark server token" },
        messages: { type: "array", items: {}, description: "Array of email message objects (same fields as send_email)" },
      },
      required: ["api_key", "messages"],
    },
  },
  {
    name: "postmark_get_delivery_stats",
    description: "Get delivery statistics from Postmark including bounces, spam complaints, and open rates.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Postmark server token" },
      },
      required: ["api_key"],
    },
  },
  {
    name: "postmark_list_templates",
    description: "List email templates stored in Postmark.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Postmark server token" },
        count: { type: "number", description: "Number of templates to return (default 100)" },
        offset: { type: "number", description: "Pagination offset" },
      },
      required: ["api_key"],
    },
  },
  {
    name: "postmark_get_template",
    description: "Get a single Postmark email template by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Postmark server token" },
        template_id: { type: "string", description: "Template ID or alias" },
      },
      required: ["api_key", "template_id"],
    },
  },
  {
    name: "postmark_search_messages",
    description: "Search sent messages in Postmark by recipient, sender, tag, or status.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Postmark server token" },
        count: { type: "number", description: "Number of messages to return (default 25)" },
        offset: { type: "number", description: "Pagination offset" },
        recipient: { type: "string", description: "Filter by recipient email" },
        from_email: { type: "string", description: "Filter by sender email" },
        tag: { type: "string", description: "Filter by tag" },
        status: { type: "string", description: "Filter by status: queued, sent, bounced, etc." },
      },
      required: ["api_key"],
    },
  },

  // ── gumroad-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "gumroad_list_products",
    description: "List all products in a Gumroad account.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string", description: "Gumroad access token" },
      },
      required: ["access_token"],
    },
  },
  {
    name: "gumroad_get_product",
    description: "Get details for a single Gumroad product by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string", description: "Gumroad access token" },
        product_id: { type: "string", description: "Product ID (permalink)" },
      },
      required: ["access_token", "product_id"],
    },
  },
  {
    name: "gumroad_list_sales",
    description: "List sales from a Gumroad account. Filter by product, email, or date range.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string", description: "Gumroad access token" },
        product_id: { type: "string", description: "Filter by product ID" },
        email: { type: "string", description: "Filter by buyer email" },
        after: { type: "string", description: "Sales after this date (YYYY-MM-DD)" },
        before: { type: "string", description: "Sales before this date (YYYY-MM-DD)" },
        page: { type: "number", description: "Page number for pagination" },
      },
      required: ["access_token"],
    },
  },
  {
    name: "gumroad_get_sale",
    description: "Get details for a single Gumroad sale by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string", description: "Gumroad access token" },
        sale_id: { type: "string", description: "Sale ID" },
      },
      required: ["access_token", "sale_id"],
    },
  },
  {
    name: "gumroad_list_subscribers",
    description: "List subscribers for a Gumroad membership/subscription product.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string", description: "Gumroad access token" },
        product_id: { type: "string", description: "Product ID of the subscription product" },
        email: { type: "string", description: "Filter by subscriber email" },
      },
      required: ["access_token", "product_id"],
    },
  },

  // ── togetherai-tool.ts ────────────────────────────────────────────────────────
  {
    name: "togetherai_chat_completion",
    description: "Run a chat completion with any Together AI model. Supports Llama, Mistral, Qwen, and 100+ open-source models.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Together AI API key" },
        model: { type: "string", description: "Model ID (e.g. meta-llama/Llama-3-8b-chat-hf). Use togetherai_list_models to browse." },
        messages: { type: "array", items: {}, description: "Array of {role, content} message objects" },
        max_tokens: { type: "number", description: "Maximum tokens to generate" },
        temperature: { type: "number", description: "Sampling temperature 0-2 (default 0.7)" },
        top_p: { type: "number", description: "Top-p nucleus sampling" },
        top_k: { type: "number", description: "Top-k sampling" },
        stop: { type: "array", items: {}, description: "Stop sequences" },
      },
      required: ["api_key", "model", "messages"],
    },
  },
  {
    name: "togetherai_completion",
    description: "Run a text completion with any Together AI model.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Together AI API key" },
        model: { type: "string", description: "Model ID (e.g. mistralai/Mistral-7B-v0.1)" },
        prompt: { type: "string", description: "Text prompt to complete" },
        max_tokens: { type: "number", description: "Maximum tokens to generate" },
        temperature: { type: "number", description: "Sampling temperature 0-2" },
        top_p: { type: "number", description: "Top-p nucleus sampling" },
        top_k: { type: "number", description: "Top-k sampling" },
        stop: { type: "array", items: {}, description: "Stop sequences" },
      },
      required: ["api_key", "prompt"],
    },
  },
  {
    name: "togetherai_create_embedding",
    description: "Create text embeddings using a Together AI embedding model.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Together AI API key" },
        model: { type: "string", description: "Embedding model ID (e.g. togethercomputer/m2-bert-80M-8k-retrieval)" },
        input: { description: "Text string or array of strings to embed" },
      },
      required: ["api_key", "input"],
    },
  },
  {
    name: "togetherai_list_models",
    description: "List all available models on Together AI including chat, completion, embedding, and image models.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Together AI API key" },
      },
      required: ["api_key"],
    },
  },

  // ── elevenlabs-tool.ts ────────────────────────────────────────────────────────
  {
    name: "elevenlabs_list_voices",
    description: "List all available voices in ElevenLabs.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
      },
      required: ["api_key"],
    },
  },
  {
    name: "elevenlabs_get_voice",
    description: "Get metadata for a specific ElevenLabs voice by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
        voice_id: { type: "string" },
        with_settings: { type: "boolean", description: "Include voice settings (stability, similarity_boost)" },
      },
      required: ["api_key", "voice_id"],
    },
  },
  {
    name: "elevenlabs_text_to_speech",
    description: "Convert text to speech with a selected ElevenLabs voice. Returns base64-encoded audio.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
        voice_id: { type: "string" },
        text: { type: "string", description: "Text to synthesize (max 5000 characters)" },
        model_id: { type: "string", description: "ElevenLabs model ID (default: eleven_monolingual_v1)" },
        output_format: { type: "string", description: "mp3_44100_128, pcm_16000, etc. (default: mp3_44100_128)" },
        stability: { type: "number", description: "0.0-1.0 (default: 0.5)" },
        similarity_boost: { type: "number", description: "0.0-1.0 (default: 0.75)" },
        style: { type: "number", description: "0.0-1.0 style exaggeration" },
        use_speaker_boost: { type: "boolean" },
      },
      required: ["api_key", "voice_id", "text"],
    },
  },
  {
    name: "elevenlabs_get_models",
    description: "List available ElevenLabs TTS models and their supported languages.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
      },
      required: ["api_key"],
    },
  },
  {
    name: "elevenlabs_get_history",
    description: "Get the TTS generation history for an ElevenLabs account.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
        page_size: { type: "number" },
        voice_id: { type: "string", description: "Filter history by voice ID" },
        start_after_history_item_id: { type: "string" },
      },
      required: ["api_key"],
    },
  },

  // ── replicate-tool.ts ─────────────────────────────────────────────────────────
  {
    name: "replicate_list_models",
    description: "List public models available on Replicate.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_token: { type: "string" },
        cursor: { type: "string" },
      },
      required: ["api_token"],
    },
  },
  {
    name: "replicate_get_model",
    description: "Get details and latest version for a Replicate model.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_token: { type: "string" },
        owner: { type: "string", description: "Model owner username" },
        model_name: { type: "string" },
      },
      required: ["api_token", "owner", "model_name"],
    },
  },
  {
    name: "replicate_create_prediction",
    description: "Run a Replicate model by creating a prediction.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_token: { type: "string" },
        version: { type: "string", description: "Model version ID (use this OR model)" },
        model: { type: "string", description: "Model as owner/name or owner/name:version (use this OR version)" },
        input: { description: "Model input parameters as JSON object or string" },
        webhook: { type: "string" },
        stream: { type: "boolean" },
      },
      required: ["api_token", "input"],
    },
  },
  {
    name: "replicate_get_prediction",
    description: "Get the status and output of a Replicate prediction.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_token: { type: "string" },
        prediction_id: { type: "string" },
      },
      required: ["api_token", "prediction_id"],
    },
  },
  {
    name: "replicate_list_predictions",
    description: "List recent predictions for a Replicate account.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_token: { type: "string" },
        cursor: { type: "string" },
      },
      required: ["api_token"],
    },
  },
  {
    name: "replicate_cancel_prediction",
    description: "Cancel a running Replicate prediction.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_token: { type: "string" },
        prediction_id: { type: "string" },
      },
      required: ["api_token", "prediction_id"],
    },
  },

  // ── stability-tool.ts ─────────────────────────────────────────────────────────
  {
    name: "stability_text_to_image",
    description: "Generate images from a text prompt using Stability AI.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
        prompt: { type: "string" },
        engine_id: { type: "string", description: "Stability engine ID (default: stable-diffusion-xl-1024-v1-0)" },
        negative_prompt: { type: "string" },
        width: { type: "number" },
        height: { type: "number" },
        steps: { type: "number", description: "Diffusion steps 10-150 (default: 30)" },
        cfg_scale: { type: "number", description: "Guidance scale 0-35 (default: 7)" },
        samples: { type: "number", description: "Number of images (max 10, default: 1)" },
        style_preset: { type: "string" },
        seed: { type: "number" },
      },
      required: ["api_key", "prompt"],
    },
  },
  {
    name: "stability_image_to_image",
    description: "Transform an existing image using a text prompt with Stability AI.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
        prompt: { type: "string" },
        image_url: { type: "string", description: "URL of the source image" },
        engine_id: { type: "string" },
        negative_prompt: { type: "string" },
        strength: { type: "number", description: "0.0-1.0: how much to change the image (default: 0.35)" },
        steps: { type: "number" },
        cfg_scale: { type: "number" },
        samples: { type: "number" },
      },
      required: ["api_key", "prompt", "image_url"],
    },
  },
  {
    name: "stability_upscale",
    description: "Upscale an image using Stability AI ESRGAN.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
        image_url: { type: "string", description: "URL of the image to upscale" },
        width: { type: "number", description: "Target width in pixels (default: 2048)" },
        engine_id: { type: "string", description: "Upscale engine (default: esrgan-v1-x2plus)" },
      },
      required: ["api_key", "image_url"],
    },
  },
  {
    name: "stability_list_engines",
    description: "List all available Stability AI generation engines.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
      },
      required: ["api_key"],
    },
  },

  // ── openai-tool.ts ────────────────────────────────────────────────────────────
  {
    name: "openai_chat_completion",
    description: "Run a chat completion with an OpenAI model (GPT-4o, GPT-4, etc.).",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
        model: { type: "string", description: "Model ID, e.g. gpt-4o, gpt-4o-mini (default: gpt-4o-mini)" },
        prompt: { type: "string", description: "Convenience: single user message (alternative to messages array)" },
        system_prompt: { type: "string", description: "System instruction (used with prompt param)" },
        messages: { description: "Array of {role, content} message objects (alternative to prompt)" },
        max_tokens: { type: "number" },
        temperature: { type: "number" },
        top_p: { type: "number" },
        n: { type: "number" },
        response_format: { description: "e.g. {type: 'json_object'}" },
        seed: { type: "number" },
        org_id: { type: "string", description: "OpenAI organization ID (optional)" },
      },
      required: ["api_key"],
    },
  },
  {
    name: "openai_create_embedding",
    description: "Create vector embeddings for text using an OpenAI embedding model.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
        input: { description: "String or array of strings to embed" },
        model: { type: "string", description: "Embedding model (default: text-embedding-3-small)" },
        dimensions: { type: "number", description: "Number of output dimensions (for text-embedding-3-* models)" },
        org_id: { type: "string" },
      },
      required: ["api_key", "input"],
    },
  },
  {
    name: "openai_generate_image",
    description: "Generate images from a text prompt using DALL-E.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
        prompt: { type: "string" },
        model: { type: "string", description: "dall-e-3 or dall-e-2 (default: dall-e-3)" },
        n: { type: "number", description: "Number of images to generate" },
        size: { type: "string", description: "1024x1024, 1792x1024, or 1024x1792 for DALL-E 3" },
        quality: { type: "string", enum: ["standard", "hd"], description: "standard or hd (DALL-E 3 only)" },
        style: { type: "string", enum: ["natural", "vivid"], description: "natural or vivid (DALL-E 3 only)" },
        response_format: { type: "string", enum: ["url", "b64_json"], description: "url or b64_json (default: url)" },
      },
      required: ["api_key", "prompt"],
    },
  },
  {
    name: "openai_create_transcription",
    description: "Transcribe audio to text using OpenAI Whisper.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
        audio_url: { type: "string", description: "URL of the audio file to transcribe" },
        model: { type: "string", description: "Transcription model (default: whisper-1)" },
        language: { type: "string", description: "ISO-639-1 language code (optional)" },
        response_format: { type: "string", enum: ["json", "text", "srt", "verbose_json", "vtt"], description: "json, text, srt, verbose_json, vtt (default: json)" },
        prompt: { type: "string" },
        temperature: { type: "number" },
        filename: { type: "string" },
      },
      required: ["api_key", "audio_url"],
    },
  },
  {
    name: "openai_list_models",
    description: "List all OpenAI models available to the account.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
      },
      required: ["api_key"],
    },
  },

  // ── anthropic-tool.ts ─────────────────────────────────────────────────────────
  {
    name: "anthropic_create_message",
    description: "Send a message to the Anthropic Messages API (Claude models). Useful for agents that need to call Claude programmatically or compare model outputs.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
        model: { type: "string", description: "Claude model ID (default: claude-sonnet-4-6)" },
        prompt: { type: "string", description: "Convenience: single user message (alternative to messages array)" },
        messages: { description: "Array of {role, content} message objects" },
        system: { type: "string", description: "System prompt" },
        max_tokens: { type: "number", description: "Max tokens to generate (default: 1024)" },
        temperature: { type: "number" },
        top_p: { type: "number" },
        top_k: { type: "number" },
        stop_sequences: { description: "Array of stop sequences" },
      },
      required: ["api_key"],
    },
  },
  {
    name: "anthropic_list_models",
    description: "List all Claude models available via the Anthropic API.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
      },
      required: ["api_key"],
    },
  },

  // ── asana-tool.ts ────────────────────────────────────────────────────────────
  {
    name: "list_asana_workspaces",
    description: "List all Asana workspaces accessible by the authenticated user.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Asana Personal Access Token (or set ASANA_API_KEY)" },
      },
    },
  },
  {
    name: "list_asana_projects",
    description: "List projects in an Asana workspace.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        workspace_gid: { type: "string", description: "Workspace GID" },
        archived: { type: "boolean", description: "Include archived projects (default false)" },
        limit: { type: "number", description: "Max results (default 100)" },
        api_key: { type: "string" },
      },
      required: ["workspace_gid"],
    },
  },
  {
    name: "list_asana_tasks",
    description: "List tasks in an Asana project.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        project_gid: { type: "string", description: "Project GID" },
        completed: { type: "boolean", description: "Filter to completed tasks only" },
        limit: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["project_gid"],
    },
  },
  {
    name: "create_asana_task",
    description: "Create a new task in Asana.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        name: { type: "string", description: "Task name" },
        workspace_gid: { type: "string", description: "Workspace GID" },
        notes: { type: "string", description: "Task description" },
        due_on: { type: "string", description: "Due date (YYYY-MM-DD)" },
        assignee: { type: "string", description: "Assignee GID or 'me'" },
        projects: { type: "array", items: { type: "string" }, description: "Project GIDs to add the task to" },
        api_key: { type: "string" },
      },
      required: ["name", "workspace_gid"],
    },
  },
  {
    name: "update_asana_task",
    description: "Update an existing Asana task.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        task_gid: { type: "string", description: "Task GID" },
        name: { type: "string" },
        notes: { type: "string" },
        completed: { type: "boolean" },
        due_on: { type: "string", description: "YYYY-MM-DD or null to clear" },
        assignee: { type: "string", description: "Assignee GID or null to unassign" },
        api_key: { type: "string" },
      },
      required: ["task_gid"],
    },
  },
  {
    name: "get_asana_task",
    description: "Get full details of a single Asana task.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        task_gid: { type: "string", description: "Task GID" },
        api_key: { type: "string" },
      },
      required: ["task_gid"],
    },
  },
  {
    name: "search_asana_tasks",
    description: "Search tasks by text within an Asana workspace.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        workspace_gid: { type: "string", description: "Workspace GID" },
        text: { type: "string", description: "Search query" },
        completed: { type: "boolean" },
        limit: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["workspace_gid", "text"],
    },
  },

  // ── monday-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "list_monday_boards",
    description: "List boards in a Monday.com account.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        limit: { type: "number", description: "Max boards to return (default 25)" },
        api_key: { type: "string", description: "Monday.com API token (or set MONDAY_API_KEY)" },
      },
    },
  },
  {
    name: "get_monday_board",
    description: "Get details of a specific Monday.com board including columns and groups.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        board_id: { type: "string", description: "Board ID" },
        api_key: { type: "string" },
      },
      required: ["board_id"],
    },
  },
  {
    name: "list_monday_items",
    description: "List items (rows) in a Monday.com board.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        board_id: { type: "string", description: "Board ID" },
        limit: { type: "number", description: "Max items (default 50)" },
        api_key: { type: "string" },
      },
      required: ["board_id"],
    },
  },
  {
    name: "create_monday_item",
    description: "Create a new item in a Monday.com board.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        board_id: { type: "string", description: "Board ID" },
        item_name: { type: "string", description: "Item name" },
        group_id: { type: "string", description: "Group ID to add the item to" },
        column_values: { type: "object", additionalProperties: true, description: "Column values as JSON object" },
        api_key: { type: "string" },
      },
      required: ["board_id", "item_name"],
    },
  },
  {
    name: "update_monday_item",
    description: "Update a column value on a Monday.com item.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        board_id: { type: "string" },
        item_id: { type: "string" },
        column_id: { type: "string", description: "Column ID to update" },
        value: { description: "New value (string or JSON)" },
        api_key: { type: "string" },
      },
      required: ["board_id", "item_id", "column_id", "value"],
    },
  },
  {
    name: "search_monday_items",
    description: "Search items by name in a Monday.com board.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        board_id: { type: "string" },
        query: { type: "string", description: "Search text" },
        limit: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["board_id", "query"],
    },
  },

  // ── calendly-tool.ts ─────────────────────────────────────────────────────────
  {
    name: "get_calendly_user",
    description: "Get the authenticated Calendly user profile.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Calendly Personal Access Token (or set CALENDLY_API_KEY)" },
      },
    },
  },
  {
    name: "list_calendly_event_types",
    description: "List event types for the authenticated Calendly user.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        user_uri: { type: "string", description: "User URI (auto-resolved if omitted)" },
        active: { type: "boolean", description: "Filter to active event types only" },
        count: { type: "number" },
        api_key: { type: "string" },
      },
    },
  },
  {
    name: "list_calendly_events",
    description: "List scheduled events for the authenticated Calendly user.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        user_uri: { type: "string", description: "User URI (auto-resolved if omitted)" },
        status: { type: "string", description: "active or canceled" },
        min_start_time: { type: "string", description: "ISO 8601 datetime" },
        max_start_time: { type: "string", description: "ISO 8601 datetime" },
        count: { type: "number" },
        sort: { type: "string", description: "e.g. start_time:asc" },
        api_key: { type: "string" },
      },
    },
  },
  {
    name: "get_calendly_event",
    description: "Get details of a single Calendly scheduled event.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        event_uuid: { type: "string", description: "Event UUID" },
        api_key: { type: "string" },
      },
      required: ["event_uuid"],
    },
  },
  {
    name: "list_calendly_invitees",
    description: "List invitees for a Calendly scheduled event.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        event_uuid: { type: "string", description: "Event UUID" },
        status: { type: "string", description: "active or canceled" },
        count: { type: "number" },
        api_key: { type: "string" },
      },
      required: ["event_uuid"],
    },
  },

  // ── pinterest-tool.ts ────────────────────────────────────────────────────────
  {
    name: "list_pinterest_boards",
    description: "List Pinterest boards for the authenticated user.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        page_size: { type: "number" },
        bookmark: { type: "string", description: "Pagination cursor" },
        privacy: { type: "string", description: "PUBLIC, PROTECTED, or SECRET" },
        access_token: { type: "string", description: "Pinterest access token (or set PINTEREST_ACCESS_TOKEN)" },
      },
    },
  },
  {
    name: "get_pinterest_board",
    description: "Get details of a specific Pinterest board.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        board_id: { type: "string", description: "Board ID" },
        access_token: { type: "string" },
      },
      required: ["board_id"],
    },
  },
  {
    name: "list_pinterest_pins",
    description: "List pins on a Pinterest board.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        board_id: { type: "string", description: "Board ID" },
        page_size: { type: "number" },
        bookmark: { type: "string" },
        access_token: { type: "string" },
      },
      required: ["board_id"],
    },
  },
  {
    name: "create_pinterest_pin",
    description: "Create a new Pinterest pin from an image URL.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        board_id: { type: "string", description: "Board ID to pin to" },
        media_source_url: { type: "string", description: "Public image URL" },
        title: { type: "string" },
        description: { type: "string" },
        link: { type: "string", description: "Destination URL when pin is clicked" },
        board_section_id: { type: "string" },
        access_token: { type: "string" },
      },
      required: ["board_id", "media_source_url"],
    },
  },
  {
    name: "search_pinterest_pins",
    description: "Search Pinterest pins by keyword.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        query: { type: "string", description: "Search query" },
        page_size: { type: "number" },
        bookmark: { type: "string" },
        access_token: { type: "string" },
      },
      required: ["query"],
    },
  },
  {
    name: "get_pinterest_user",
    description: "Get the authenticated Pinterest user account info.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string" },
      },
    },
  },

  // ── tiktok-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "get_tiktok_user",
    description: "Get the authenticated TikTok user profile (follower count, video count, etc.).",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        access_token: { type: "string", description: "TikTok OAuth access token (or set TIKTOK_ACCESS_TOKEN)" },
      },
    },
  },
  {
    name: "list_tiktok_videos",
    description: "List videos for the authenticated TikTok user.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        max_count: { type: "number", description: "Max videos to return (default 20, max 20)" },
        cursor: { type: "number", description: "Pagination cursor" },
        access_token: { type: "string" },
      },
    },
  },
  {
    name: "get_tiktok_video",
    description: "Get details of a specific TikTok video by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        video_id: { type: "string", description: "TikTok video ID" },
        access_token: { type: "string" },
      },
      required: ["video_id"],
    },
  },

  // ── steam-tool.ts ────────────────────────────────────────────────────────────
  {
    name: "get_steam_player_summaries",
    description: "Get Steam player profile summaries for one or more Steam IDs.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        steamids: { type: "string", description: "Comma-separated Steam64 IDs (up to 100)" },
        api_key: { type: "string", description: "Steam Web API key (or set STEAM_API_KEY)" },
      },
      required: ["steamids"],
    },
  },
  {
    name: "get_steam_owned_games",
    description: "Get games owned by a Steam user.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        steamid: { type: "string", description: "Steam64 ID" },
        include_appinfo: { type: "boolean", description: "Include game names (default true)" },
        include_played_free_games: { type: "boolean" },
        api_key: { type: "string" },
      },
      required: ["steamid"],
    },
  },
  {
    name: "get_steam_achievements",
    description: "Get achievements for a Steam user in a specific game.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        steamid: { type: "string", description: "Steam64 ID" },
        appid: { type: "string", description: "Steam App ID of the game" },
        api_key: { type: "string" },
      },
      required: ["steamid", "appid"],
    },
  },
  {
    name: "get_steam_app_details",
    description: "Get store details for a Steam app (game info, price, platforms, Metacritic score).",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        appid: { type: "string", description: "Steam App ID" },
        cc: { type: "string", description: "Country code for pricing (e.g. us, au)" },
        l: { type: "string", description: "Language code (e.g. english)" },
      },
      required: ["appid"],
    },
  },
  {
    name: "search_steam_store",
    description: "Search the Steam store for games by name.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        term: { type: "string", description: "Search term" },
        cc: { type: "string", description: "Country code for pricing" },
        l: { type: "string", description: "Language code" },
      },
      required: ["term"],
    },
  },

  // ── igdb-tool.ts ─────────────────────────────────────────────────────────────
  {
    name: "igdb_search_games",
    description: "Search the IGDB games database by name.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        query: { type: "string", description: "Game name to search for" },
        limit: { type: "number", description: "Max results (default 10, max 50)" },
        client_id: { type: "string", description: "Twitch/IGDB Client ID (or set IGDB_CLIENT_ID)" },
        client_secret: { type: "string", description: "Twitch/IGDB Client Secret (or set IGDB_CLIENT_SECRET)" },
      },
      required: ["query"],
    },
  },
  {
    name: "igdb_get_game",
    description: "Get full details of a game from IGDB by game ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        game_id: { type: "string", description: "IGDB game ID" },
        client_id: { type: "string" },
        client_secret: { type: "string" },
      },
      required: ["game_id"],
    },
  },
  {
    name: "igdb_list_platforms",
    description: "List gaming platforms from IGDB.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        limit: { type: "number", description: "Max results (default 30)" },
        offset: { type: "number" },
        client_id: { type: "string" },
        client_secret: { type: "string" },
      },
    },
  },
  {
    name: "igdb_list_genres",
    description: "List all game genres from IGDB.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        client_id: { type: "string" },
        client_secret: { type: "string" },
      },
    },
  },
  {
    name: "igdb_get_company",
    description: "Get a game company from IGDB by name or ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        name: { type: "string", description: "Company name to search for" },
        company_id: { type: "string", description: "IGDB company ID (takes precedence over name)" },
        client_id: { type: "string" },
        client_secret: { type: "string" },
      },
    },
  },

  // ── speedrun-tool.ts ─────────────────────────────────────────────────────────
  {
    name: "speedrun_search_games",
    description: "Search for games on Speedrun.com by name. No API key required.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        name: { type: "string", description: "Game name to search" },
        max: { type: "number", description: "Max results" },
      },
      required: ["name"],
    },
  },
  {
    name: "speedrun_get_game",
    description: "Get details of a game on Speedrun.com including categories and levels.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        game_id: { type: "string", description: "Speedrun.com game ID or abbreviation" },
      },
      required: ["game_id"],
    },
  },
  {
    name: "speedrun_get_leaderboard",
    description: "Get the leaderboard for a Speedrun.com game category.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        game_id: { type: "string", description: "Game ID" },
        category_id: { type: "string", description: "Category ID" },
        top: { type: "number", description: "Only return top N places" },
        platform: { type: "string" },
        emulators: { type: "boolean" },
        video_only: { type: "boolean" },
      },
      required: ["game_id", "category_id"],
    },
  },
  {
    name: "speedrun_list_runs",
    description: "List speedruns with optional filters for game, category, user, or status.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        game: { type: "string", description: "Game ID" },
        category: { type: "string" },
        user: { type: "string", description: "User ID" },
        status: { type: "string", enum: ["new", "verified", "rejected"], description: "new, verified, or rejected" },
        orderby: { type: "string", enum: ["date", "submitted", "status", "game", "category", "level", "platform", "region", "emulated", "weblink"], description: "date, submitted, status, game, category, level, platform, region, emulated, or weblink" },
        direction: { type: "string", enum: ["asc", "desc"], description: "asc or desc" },
        max: { type: "number" },
      },
    },
  },
  {
    name: "speedrun_get_user",
    description: "Get a Speedrun.com user profile by ID or username.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        user_id: { type: "string", description: "User ID or username" },
      },
      required: ["user_id"],
    },
  },

  // ── exchangerate-tool.ts ─────────────────────────────────────────────────────
  {
    name: "exchangerate_latest",
    description: "Get latest currency exchange rates for a base currency. Works without API key using the free tier.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        base: { type: "string", description: "Base currency code (default USD)" },
        api_key: { type: "string", description: "ExchangeRate-API key (or set EXCHANGERATE_API_KEY). Optional for latest rates." },
      },
    },
  },
  {
    name: "exchangerate_convert",
    description: "Convert an amount from one currency to another.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        from: { type: "string", description: "Source currency code (e.g. USD)" },
        to: { type: "string", description: "Target currency code (e.g. EUR)" },
        amount: { type: "number", description: "Amount to convert (default 1)" },
        api_key: { type: "string", description: "Optional for conversion (uses latest rates if omitted)" },
      },
      required: ["from", "to"],
    },
  },
  {
    name: "exchangerate_historical",
    description: "Get historical exchange rates for a specific date. Requires an API key.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        base: { type: "string", description: "Base currency code (default USD)" },
        year: { type: "string", description: "4-digit year" },
        month: { type: "string", description: "Month number (1-12)" },
        day: { type: "string", description: "Day number (1-31)" },
        api_key: { type: "string", description: "ExchangeRate-API key (required)" },
      },
      required: ["year", "month", "day"],
    },
  },
  {
    name: "exchangerate_codes",
    description: "List all supported currency codes and their names. Requires an API key.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "ExchangeRate-API key (required)" },
      },
    },
  },

  // ── neon-tool.ts ─────────────────────────────────────────────────────────────
  {
    name: "neon_list_projects",
    description: "List all Neon Serverless Postgres projects in your account.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Neon API key" },
        limit: { type: "number", description: "Max projects to return (default 10)" },
        cursor: { type: "string", description: "Pagination cursor" },
      },
    },
  },
  {
    name: "neon_get_project",
    description: "Get details for a specific Neon project.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
        project_id: { type: "string", description: "Neon project ID" },
      },
      required: ["project_id"],
    },
  },
  {
    name: "neon_list_branches",
    description: "List all branches in a Neon project.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
        project_id: { type: "string" },
      },
      required: ["project_id"],
    },
  },
  {
    name: "neon_create_branch",
    description: "Create a new branch in a Neon project.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
        project_id: { type: "string" },
        branch_name: { type: "string", description: "Name for the new branch" },
      },
      required: ["project_id"],
    },
  },
  {
    name: "neon_list_databases",
    description: "List all databases on a Neon branch.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
        project_id: { type: "string" },
        branch_id: { type: "string" },
      },
      required: ["project_id", "branch_id"],
    },
  },
  {
    name: "neon_execute_sql",
    description: "Execute a SQL query against a Neon database endpoint.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
        project_id: { type: "string" },
        branch_id: { type: "string" },
        endpoint_id: { type: "string" },
        query: { type: "string", description: "SQL query to execute" },
        database_name: { type: "string", description: "Target database name" },
      },
      required: ["project_id", "branch_id", "endpoint_id", "query", "database_name"],
    },
  },

  // ── upstash-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "upstash_redis_get",
    description: "Get the value of a key from an Upstash Redis database.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Upstash API key" },
        email: { type: "string", description: "Upstash account email" },
        db_id: { type: "string", description: "Redis database ID" },
        key: { type: "string", description: "Key to retrieve" },
      },
      required: ["api_key", "email", "db_id", "key"],
    },
  },
  {
    name: "upstash_redis_set",
    description: "Set a key-value pair in an Upstash Redis database.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
        email: { type: "string" },
        db_id: { type: "string" },
        key: { type: "string" },
        value: { type: "string", description: "Value to store" },
        ex: { type: "number", description: "Expiry in seconds (optional)" },
      },
      required: ["api_key", "email", "db_id", "key", "value"],
    },
  },
  {
    name: "upstash_redis_del",
    description: "Delete a key from an Upstash Redis database.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
        email: { type: "string" },
        db_id: { type: "string" },
        key: { type: "string" },
      },
      required: ["api_key", "email", "db_id", "key"],
    },
  },
  {
    name: "upstash_redis_list_keys",
    description: "List keys in an Upstash Redis database matching a pattern.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
        email: { type: "string" },
        db_id: { type: "string" },
        pattern: { type: "string", description: "Key pattern (default *)" },
      },
      required: ["api_key", "email", "db_id"],
    },
  },
  {
    name: "upstash_redis_incr",
    description: "Increment a numeric key in an Upstash Redis database.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
        email: { type: "string" },
        db_id: { type: "string" },
        key: { type: "string" },
      },
      required: ["api_key", "email", "db_id", "key"],
    },
  },
  {
    name: "upstash_kafka_produce",
    description: "Produce messages to an Upstash Kafka topic.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
        email: { type: "string" },
        cluster_id: { type: "string" },
        topic: { type: "string" },
        messages: { type: "string", description: "JSON array of message objects [{value: '...'}]" },
      },
      required: ["api_key", "email", "cluster_id", "topic", "messages"],
    },
  },
  {
    name: "upstash_kafka_list_topics",
    description: "List all topics in an Upstash Kafka cluster.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
        email: { type: "string" },
        cluster_id: { type: "string" },
      },
      required: ["api_key", "email", "cluster_id"],
    },
  },

  // ── turso-tool.ts ─────────────────────────────────────────────────────────────
  {
    name: "turso_list_databases",
    description: "List all databases in a Turso organization.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Turso API token" },
        org: { type: "string", description: "Organization name or slug" },
      },
      required: ["api_key", "org"],
    },
  },
  {
    name: "turso_create_database",
    description: "Create a new Turso SQLite edge database.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
        org: { type: "string" },
        name: { type: "string", description: "Database name" },
        group: { type: "string", description: "Group to attach to (e.g. default)" },
      },
      required: ["api_key", "org", "name", "group"],
    },
  },
  {
    name: "turso_list_groups",
    description: "List all groups in a Turso organization.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
        org: { type: "string" },
      },
      required: ["api_key", "org"],
    },
  },
  {
    name: "turso_get_database",
    description: "Get details for a specific Turso database.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
        org: { type: "string" },
        name: { type: "string", description: "Database name" },
      },
      required: ["api_key", "org", "name"],
    },
  },
  {
    name: "turso_execute_sql",
    description: "Execute a SQL query against a Turso edge database.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
        org: { type: "string" },
        db_name: { type: "string", description: "Database name" },
        sql: { type: "string", description: "SQL statement to execute" },
      },
      required: ["api_key", "org", "db_name", "sql"],
    },
  },

  // ── render-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "render_list_services",
    description: "List all Render services (web services, static sites, cron jobs, etc.).",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Render API key" },
        limit: { type: "number", description: "Max results (default 20)" },
        cursor: { type: "string" },
        type: { type: "string", description: "Filter by type: web_service, static_site, background_worker, cron_job, private_service" },
      },
    },
  },
  {
    name: "render_get_service",
    description: "Get details for a specific Render service.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
        service_id: { type: "string", description: "Render service ID (srv-...)" },
      },
      required: ["service_id"],
    },
  },
  {
    name: "render_list_deploys",
    description: "List deploys for a Render service.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
        service_id: { type: "string" },
        limit: { type: "number" },
      },
      required: ["service_id"],
    },
  },
  {
    name: "render_trigger_deploy",
    description: "Trigger a new deploy for a Render service.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
        service_id: { type: "string" },
        clear_cache: { type: "boolean", description: "Clear build cache before deploying" },
      },
      required: ["service_id"],
    },
  },
  {
    name: "render_list_env_vars",
    description: "List environment variables for a Render service.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
        service_id: { type: "string" },
      },
      required: ["service_id"],
    },
  },
  {
    name: "render_set_env_var",
    description: "Set an environment variable on a Render service.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
        service_id: { type: "string" },
        key: { type: "string", description: "Environment variable name" },
        value: { type: "string", description: "Environment variable value" },
      },
      required: ["service_id", "key", "value"],
    },
  },

  // ── flyio-tool.ts ────────────────────────────────────────────────────────────
  {
    name: "fly_list_apps",
    description: "List all Fly.io apps in your organization.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Fly.io API token" },
        org_slug: { type: "string", description: "Organization slug (optional)" },
      },
    },
  },
  {
    name: "fly_get_app",
    description: "Get details for a specific Fly.io app.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
        app_name: { type: "string", description: "Fly.io app name" },
      },
      required: ["app_name"],
    },
  },
  {
    name: "fly_list_machines",
    description: "List all machines in a Fly.io app.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
        app_name: { type: "string" },
        include_deleted: { type: "boolean" },
      },
      required: ["app_name"],
    },
  },
  {
    name: "fly_create_machine",
    description: "Create a new machine in a Fly.io app.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
        app_name: { type: "string" },
        image: { type: "string", description: "Docker image to run (e.g. nginx:latest)" },
        machine_name: { type: "string", description: "Optional machine name" },
        env: { type: "string", description: "JSON object of environment variables" },
      },
      required: ["app_name", "image"],
    },
  },
  {
    name: "fly_list_volumes",
    description: "List all volumes attached to a Fly.io app.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
        app_name: { type: "string" },
      },
      required: ["app_name"],
    },
  },

  // ── mistral-tool.ts ──────────────────────────────────────────────────────────
  {
    name: "mistral_chat_completion",
    description: "Run a chat completion with a Mistral AI model (mistral-small, mistral-medium, mistral-large, etc.).",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Mistral API key" },
        model: { type: "string", description: "Model ID (default: mistral-small-latest)" },
        prompt: { type: "string", description: "Single user message (alternative to messages)" },
        system_prompt: { type: "string" },
        messages: { type: "string", description: "JSON array of {role, content} messages" },
        max_tokens: { type: "number" },
        temperature: { type: "number" },
        top_p: { type: "number" },
      },
    },
  },
  {
    name: "mistral_list_models",
    description: "List all available Mistral AI models.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
      },
    },
  },
  {
    name: "mistral_create_embedding",
    description: "Create vector embeddings for text using Mistral's embedding model.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
        input: { type: "string", description: "Text or JSON array of strings to embed" },
        model: { type: "string", description: "Embedding model (default: mistral-embed)" },
      },
      required: ["input"],
    },
  },

  // ── cohere-tool.ts ───────────────────────────────────────────────────────────
  {
    name: "cohere_chat",
    description: "Chat with a Cohere Command model. Supports system preamble and conversation history.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Cohere API key" },
        message: { type: "string", description: "User message" },
        model: { type: "string", description: "Model ID (default: command-r-plus)" },
        preamble: { type: "string", description: "System prompt / preamble" },
        chat_history: { type: "string", description: "JSON array of prior messages [{role, message}]" },
        max_tokens: { type: "number" },
        temperature: { type: "number" },
      },
      required: ["message"],
    },
  },
  {
    name: "cohere_generate",
    description: "Generate text completions using Cohere Command models.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
        prompt: { type: "string" },
        model: { type: "string", description: "Model ID (default: command)" },
        max_tokens: { type: "number" },
        temperature: { type: "number" },
        stop_sequences: { type: "string", description: "JSON array of stop strings" },
      },
      required: ["prompt"],
    },
  },
  {
    name: "cohere_embed",
    description: "Create vector embeddings for text using Cohere's embed models.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
        texts: { type: "string", description: "JSON array of strings to embed" },
        model: { type: "string", description: "Embed model (default: embed-english-v3.0)" },
        input_type: { type: "string", enum: ["search_document", "search_query", "classification", "clustering"], description: "search_document, search_query, classification, clustering" },
      },
      required: ["texts"],
    },
  },
  {
    name: "cohere_rerank",
    description: "Rerank a list of documents by relevance to a query using Cohere Rerank.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
        query: { type: "string" },
        documents: { type: "string", description: "JSON array of strings or {text} objects" },
        model: { type: "string", description: "Rerank model (default: rerank-english-v3.0)" },
        top_n: { type: "number", description: "Return top N results" },
      },
      required: ["query", "documents"],
    },
  },
  {
    name: "cohere_classify",
    description: "Classify texts into categories using Cohere Classify with few-shot examples.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
        inputs: { type: "string", description: "JSON array of strings to classify" },
        examples: { type: "string", description: "JSON array of {text, label} few-shot examples" },
        model: { type: "string" },
      },
      required: ["inputs", "examples"],
    },
  },
  {
    name: "cohere_list_models",
    description: "List all available Cohere models.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
      },
    },
  },

  // ── perplexity-tool.ts ───────────────────────────────────────────────────────
  {
    name: "perplexity_chat_completion",
    description: "Run a search-augmented chat completion with Perplexity AI. Returns grounded answers with citations from the web.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Perplexity API key" },
        model: { type: "string", description: "Model (default: sonar). Options: sonar, sonar-pro, sonar-reasoning" },
        prompt: { type: "string", description: "User message (alternative to messages)" },
        system_prompt: { type: "string" },
        messages: { type: "string", description: "JSON array of {role, content} messages" },
        max_tokens: { type: "number" },
        temperature: { type: "number" },
        search_recency_filter: { type: "string", description: "Limit sources by time: month, week, day, hour" },
        search_domain_filter: { type: "string", description: "JSON array of domains to restrict search to" },
        return_citations: { type: "boolean", description: "Include citation URLs in response (default true)" },
        return_related_questions: { type: "boolean" },
      },
    },
  },

  // ── lemonsqueezy-tool.ts ─────────────────────────────────────────────────────
  {
    name: "ls_list_stores",
    description: "List all Lemon Squeezy stores on your account.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "Lemon Squeezy API key" },
        page: { type: "number" },
        per_page: { type: "number" },
      },
    },
  },
  {
    name: "ls_list_products",
    description: "List products in a Lemon Squeezy store.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
        store_id: { type: "string" },
        page: { type: "number" },
        per_page: { type: "number" },
      },
    },
  },
  {
    name: "ls_list_orders",
    description: "List orders in a Lemon Squeezy store.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
        store_id: { type: "string" },
        user_email: { type: "string" },
        page: { type: "number" },
        per_page: { type: "number" },
      },
    },
  },
  {
    name: "ls_list_subscriptions",
    description: "List subscriptions for a Lemon Squeezy store.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
        store_id: { type: "string" },
        order_id: { type: "string" },
        status: { type: "string", description: "Filter by status: active, cancelled, expired, past_due, unpaid, trial, paused" },
        page: { type: "number" },
        per_page: { type: "number" },
      },
    },
  },
  {
    name: "ls_get_order",
    description: "Get a specific Lemon Squeezy order by ID.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
        order_id: { type: "string" },
      },
      required: ["order_id"],
    },
  },
  {
    name: "ls_list_customers",
    description: "List customers for a Lemon Squeezy store.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
        store_id: { type: "string" },
        email: { type: "string" },
        page: { type: "number" },
        per_page: { type: "number" },
      },
    },
  },

  // ── convertkit-tool.ts ───────────────────────────────────────────────────────
  {
    name: "ck_list_subscribers",
    description: "List all subscribers in a ConvertKit account.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_secret: { type: "string", description: "ConvertKit API secret" },
        page: { type: "number" },
        from: { type: "string", description: "Filter by created date (ISO 8601)" },
        to: { type: "string" },
        sort_field: { type: "string" },
        sort_order: { type: "string", description: "asc or desc" },
      },
      required: ["api_secret"],
    },
  },
  {
    name: "ck_add_subscriber",
    description: "Subscribe an email address to a ConvertKit form.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string", description: "ConvertKit API key" },
        form_id: { type: "string" },
        email: { type: "string" },
        first_name: { type: "string" },
      },
      required: ["api_key", "form_id", "email"],
    },
  },
  {
    name: "ck_list_forms",
    description: "List all forms in a ConvertKit account.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
      },
      required: ["api_key"],
    },
  },
  {
    name: "ck_list_sequences",
    description: "List all email sequences in a ConvertKit account.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
      },
      required: ["api_key"],
    },
  },
  {
    name: "ck_list_tags",
    description: "List all tags in a ConvertKit account.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
      },
      required: ["api_key"],
    },
  },
  {
    name: "ck_tag_subscriber",
    description: "Apply a tag to a subscriber in ConvertKit.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        api_key: { type: "string" },
        tag_id: { type: "string" },
        email: { type: "string" },
        first_name: { type: "string" },
      },
      required: ["api_key", "tag_id", "email"],
    },
  },

  // -- commonsensepass-tool.ts (worker sanity-gate verdicts) ------------------
  {
    name: "commonsensepass_check",
    description: "Run the verdict-only CommonSensePass sanity gate before a worker claims healthy, quiet, no_work, pass, done, merge_ready, duplicate_wake, or route.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        claim: { type: "string", enum: [...COMMONSENSEPASS_CLAIM_KINDS], description: "Worker claim to sanity-check." },
        context: {
          type: "object",
          additionalProperties: true,
          description: "Evidence packet for the claim, such as todos, active_jobs, PR state, wake state, SHAs, or lane evidence.",
        },
        evidence: {
          type: "array",
          items: { type: "object", additionalProperties: true },
          description: "Optional evidence entries to echo when no rule-specific evidence is available.",
        },
      },
      required: ["claim", "context"],
    },
  },
  {
    name: "commonsensepass_rules",
    description: "Return the worker-readable CommonSensePass rules, verdict vocabulary, and fixture ids. Set include_fixtures=true for full example packets.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        include_fixtures: { type: "boolean", default: false, description: "Include full deterministic worker fixture packets." },
      },
    },
  },

  // -- xpass-aggregated-verdict-tool.ts (conductor receipt with SHA binding) --
  {
    name: "xpass_aggregated_verdict",
    description: "Return one XPass conductor verdict for a target PR/change at a specific commit SHA. Selected PASS receipts must name the same head SHA; stale, unscoped, missing, or blocker receipts cannot produce a green verdict.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        target: {
          type: "object",
          additionalProperties: false,
          description: "Target change to inspect. target.sha or target.head_sha is required for anti-stale proof binding.",
          properties: {
            type: { type: "string", description: "Target type, such as pr, branch, commit, url, artifact, or change." },
            kind: { type: "string", description: "Alias for target.type." },
            id: { type: "string", description: "PR number, issue id, branch label, or artifact id." },
            pr_number: { type: "number", description: "PR number when the target is a pull request." },
            prNumber: { type: "number", description: "Alias for pr_number." },
            sha: { type: "string", description: "Current target commit SHA." },
            head_sha: { type: "string", description: "Alias for sha." },
            headSha: { type: "string", description: "Alias for sha." },
            url: { type: "string", description: "Optional target URL." },
            ref: { type: "string", description: "Optional branch, PR, or artifact ref." },
            title: { type: "string", description: "Optional target title used for check selection." },
            description: { type: "string", description: "Optional target summary used for check selection." },
            files: { type: "array", items: { type: "string" }, description: "Changed file paths for check selection." },
            changed_files: { type: "array", items: { type: "string" }, description: "Alias for files." },
          },
        },
        title: { type: "string", description: "Optional PR/change title used for check selection." },
        description: { type: "string", description: "Optional PR/change description used for check selection." },
        context: { type: "string", description: "Optional extra context used for check selection." },
        body: { type: "string", description: "Optional body text used for check selection." },
        summary: { type: "string", description: "Optional summary text used for check selection." },
        tags: { type: "array", items: { type: "string" }, description: "Optional tags used for check selection." },
        changed_files: { type: "array", items: { type: "string" }, description: "Changed file paths for check selection." },
        changedFiles: { type: "array", items: { type: "string" }, description: "Alias for changed_files." },
        files: { type: "array", items: { type: "string" }, description: "Alias for changed_files." },
        owned_files: { type: "array", items: { type: "string" }, description: "Owned file paths for check selection." },
        ownedFiles: { type: "array", items: { type: "string" }, description: "Alias for owned_files." },
        enabled_checks: {
          type: "array",
          items: { type: "string", enum: ["testpass", "uxpass", "flowpass", "securitypass", "rotatepass", "copypass", "fidelitypass", "seopass", "geopass", "legalpass", "compliancepass", "commonsensepass", "wakepass", "sloppass"] },
          description: "Optional suite restriction. When supplied, XPass only gates the selected checks that are enabled here.",
        },
        selected_checks: {
          type: "array",
          items: { type: "string", enum: ["testpass", "uxpass", "flowpass", "securitypass", "rotatepass", "copypass", "fidelitypass", "seopass", "geopass", "legalpass", "compliancepass", "commonsensepass", "wakepass", "sloppass"] },
          description: "Optional explicit XPass product checks to require for this verdict.",
        },
        available_checks: {
          type: "array",
          items: { type: "string", enum: ["testpass", "uxpass", "flowpass", "securitypass", "rotatepass", "copypass", "fidelitypass", "seopass", "geopass", "legalpass", "compliancepass", "commonsensepass", "wakepass", "sloppass"] },
          description: "Optional worker availability list. Selected checks outside this list are NOT RUN and cannot make the verdict green.",
        },
        pass_results: {
          type: "array",
          description: "Underlying Pass receipts or summarized results. Green results must include target_sha/head_sha matching target.sha.",
          items: {
            type: "object",
            additionalProperties: true,
            properties: {
              check: { type: "string" },
              name: { type: "string" },
              status: { type: "string" },
              result: { type: "string" },
              verdict: { type: "string" },
              run_id: { type: "string" },
              receipt_id: { type: "string" },
              url: { type: "string" },
              summary: { type: "string" },
              message: { type: "string" },
              generated_at: { type: "string" },
              target_sha: { type: "string" },
              head_sha: { type: "string" },
            },
          },
        },
        results: {
          type: "object",
          additionalProperties: true,
          description: "Map form of pass_results keyed by check name.",
        },
        require_council: { type: "boolean", description: "Force the Crews Council recommendation on this XPass receipt." },
        force_council: { type: "boolean", description: "Alias for require_council." },
        generated_at: { type: "string", description: "Optional deterministic timestamp for tests or replay." },
        now: { type: "string", description: "Alias for generated_at." },
      },
      required: ["target"],
    },
  },

  // ── testpass-tool.ts ────────────────────────────────────────────────────────
  {
    name: "testpass_list_packs",
    description: "List TestPass packs available to the caller, including system packs and the caller's custom packs.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {},
    },
  },
  {
    name: "testpass_run",
    description: "Start a TestPass run against an MCP server. Seeds deterministic and agent checks from the given pack and returns the run id plus an initial verdict summary. Response includes was_duplicate: boolean indicating whether the row was already present (idempotent retry).",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        target_url: { type: "string", description: "HTTP URL of the MCP server to test" },
        pack_id: { type: "string", description: "Pack slug (default: testpass-core)" },
        profile: { type: "string", enum: ["smoke", "standard", "deep"], description: "Run profile (default: smoke)" },
        task_id: {
          type: "string",
          description: "Client-generated idempotency key (UUIDv5 from thread_id + prompt_hash + time_bucket recommended). Required for safe retry. If omitted, the server creates a fresh row and you lose retry safety; sending the same task_id twice returns the original run_id with was_duplicate=true instead of creating a duplicate.",
        },
      },
      required: ["target_url"],
    },
  },
  {
    name: "testpass_status",
    description: "Fetch the current status, verdict summary, and fail count for a TestPass run.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        run_id: { type: "string", description: "The TestPass run id returned by testpass_run" },
      },
      required: ["run_id"],
    },
  },
  {
    name: "testpass_save_pack",
    description: "Save a TestPass pack YAML definition for the caller. Creates or updates the pack identified by pack_id.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        pack_id: { type: "string", description: "Unique slug for the pack (e.g. 'my-mcp-pack')" },
        yaml: { type: "string", description: "Full pack definition as a YAML string" },
      },
      required: ["pack_id", "yaml"],
    },
  },
  {
    name: "testpass_edit_item",
    description: "Override the verdict and notes for a single check item in a TestPass run. Fail-to-pass edits are flagged in mc_signals.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        run_id: { type: "string", description: "The run the item belongs to" },
        item_id: { type: "string", description: "The testpass_items row id (uuid)" },
        verdict: { type: "string", enum: ["pass", "fail", "na", "other"], description: "New verdict" },
        notes: { type: "string", description: "Required reviewer note explaining the manual verdict edit" },
      },
      required: ["run_id", "item_id", "verdict", "notes"],
    },
  },
  {
    name: "testpass_evidence",
    description: "Fetch one TestPass item and its attached evidence by item_id or check_id. Use this when a chat agent needs proof for a specific checklist item.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        run_id: { type: "string", description: "The run id returned by testpass_run" },
        item_id: { type: "string", description: "Optional testpass_items row id" },
        check_id: { type: "string", description: "Optional checklist id such as RPC-001 or MCP-007" },
      },
      required: ["run_id"],
    },
  },
  {
    name: "testpass_report_html",
    description: "Get the HTML report for a TestPass run.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        run_id: { type: "string", description: "The run id returned by testpass_run" },
      },
      required: ["run_id"],
    },
  },
  {
    name: "testpass_report_json",
    description: "Get the JSON report for a TestPass run.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        run_id: { type: "string", description: "The run id returned by testpass_run" },
      },
      required: ["run_id"],
    },
  },
  {
    name: "testpass_report_md",
    description: "Get the Markdown report for a TestPass run.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        run_id: { type: "string", description: "The run id returned by testpass_run" },
      },
      required: ["run_id"],
    },
  },
  {
    name: "testpass_fix_list",
    description: "Get the Markdown fix-list for a TestPass run. This is an explicit alias for the markdown report so agents can discover the copy-paste repair artifact directly.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        run_id: { type: "string", description: "The run id returned by testpass_run" },
      },
      required: ["run_id"],
    },
  },

  // ── legalpass-tool.ts ──────────────────────────────────────────────────────
  {
    name: "legalpass_run",
    description: "Run a LegalPass issue-spotting pass against a URL, contract upload, or repo. With fixture_text, returns deterministic public evidence; without it, returns the guarded run plan.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      anyOf: [
        { required: ["target"] },
        { required: ["target_url"] },
      ],
      properties: {
        pack_id: { type: "string", description: "LegalPass pack slug (default: legalpass-mvp-v0)" },
        target_url: { type: "string", description: "URL target shortcut for TestPass-style callers" },
        target: {
          type: "object",
          additionalProperties: false,
          properties: {
            kind: { type: "string", enum: ["url", "contract_upload", "repo"] },
            url: { type: "string", description: "Target URL for url runs" },
            upload_ref: { type: "string", description: "Upload reference for contract_upload runs" },
            repo: { type: "string", description: "Repository identifier for repo runs" },
            branch: { type: "string", description: "Optional branch name for repo runs" },
            commit: { type: "string", description: "Optional commit SHA for repo runs" },
          },
          required: ["kind"],
        },
        profile: { type: "string", enum: ["smoke", "standard", "deep"], description: "Run profile (default: smoke)" },
        jurisdictions: { type: "array", items: { type: "string" }, description: "Optional jurisdiction routing hints" },
        fixture_text: { type: "string", description: "Public text to check deterministically for dogfood or local proof" },
        target_sha: { type: "string", description: "Optional commit or target evidence SHA to bind the LegalPass receipt to a specific target version" },
      },
    },
  },
  {
    name: "legalpass_status",
    description: "Fetch the stored LegalPass run result and audit log for a run started through legalpass_run.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        run_id: { type: "string", description: "The LegalPass run id returned by legalpass_run" },
      },
      required: ["run_id"],
    },
  },
  {
    name: "legalpass_save_pack",
    description: "Save or update a LegalPass custom playbook pack. Requires an enabled citation_verifier hat.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      anyOf: [
        { required: ["pack"] },
        { required: ["yaml"] },
      ],
      properties: {
        pack_id: { type: "string", description: "Optional pack id override for YAML payloads" },
        pack: { type: "object", description: "LegalPass pack object" },
        yaml: { type: "string", description: "LegalPass pack YAML" },
        overwrite: { type: "boolean", description: "Allow replacing an existing pack id" },
      },
    },
  },
  {
    name: "legalpass_edit_item",
    description: "Apply a human reviewer override to a LegalPass item and return an audit entry with before/after state.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        run_id: { type: "string", description: "The LegalPass run id returned by legalpass_run" },
        item_id: { type: "string", description: "The LegalPass item id to edit" },
        verdict: { type: "string", enum: ["check", "fail", "na", "other", "pending"], description: "Reviewer override verdict" },
        finding: { type: "string", description: "Replacement finding text, linted by PassGuard" },
        on_fail_comment: { type: "string", description: "Replacement fail comment, linted by PassGuard" },
        reviewer_note: { type: "string", description: "Human reviewer note for the audit trail, linted by PassGuard" },
        notes: { type: "string", description: "Alias for reviewer_note, for TestPass-style callers" },
        actor_user_id: { type: "string", description: "Optional actor id for the override audit entry" },
      },
      required: ["run_id", "item_id"],
    },
  },
  {
    name: "legalpass_verdict",
    description: "Lint LegalPass-style verdict text against the issue-spotter guardrail and return the legally reviewed disclaimer banner for Pass-family outputs.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        verdict_text: { type: "string", description: "Verdict or finding text to check before display" },
        disclaimer_length: { type: "string", enum: ["chat", "results", "tos"], description: "Disclaimer length to return (default: results)" },
      },
    },
  },

  // ── uxpass-tool.ts (journey/usability QC, sister to TestPass) ──────────────
  {
    name: "uxpass_run",
    description: "Run a UX journey/usability check synchronously against a URL. Executes the deterministic uxpass-core check set and returns the run id, status, UX Score, summary, and uxpass_receipt_v1. UIPass now owns visual/interface polish; this legacy UXPass runner still calls out when screenshots or mobile/desktop proof are missing for visible surfaces. Pass either url (a one-off check) or pack_name (resolves the registered pack's url). The hats parameter is accepted for forward compatibility but is currently ignored; LLM hats land in a later chunk. Response includes was_duplicate: boolean indicating whether the row was already present (idempotent retry).",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        pack_name: { type: "string", description: "Name of a registered UXPass pack; the pack's url is used as the target" },
        url: { type: "string", description: "Target URL for a one-off run (takes precedence over pack_name)" },
        hats: {
          type: "array",
          items: { type: "string" },
          description: "Reserved for future use. Currently ignored; the deterministic runner evaluates the full uxpass-core check set on every run.",
        },
        task_id: {
          type: "string",
          description: "Client-generated idempotency key (UUIDv5 from thread_id + prompt_hash + time_bucket recommended). Required for safe retry. If omitted, the server creates a fresh row and you lose retry safety; sending the same task_id twice returns the original run_id with was_duplicate=true instead of creating a duplicate.",
        },
        target_sha: { type: "string", description: "Optional PR or commit SHA for receipt staleness checks." },
      },
    },
  },
  {
    name: "uxpass_status",
    description: "Fetch the status, UX Score, summary, and uxpass_receipt_v1 for a UXPass run.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        run_id: { type: "string", description: "The run id returned by uxpass_run" },
      },
      required: ["run_id"],
    },
  },
  {
    name: "uxpass_report_html",
    description: "Get the HTML report for a UXPass run.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        run_id: { type: "string", description: "The run id returned by uxpass_run" },
      },
      required: ["run_id"],
    },
  },
  {
    name: "uxpass_report_json",
    description: "Get the JSON report for a UXPass run.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        run_id: { type: "string", description: "The run id returned by uxpass_run" },
      },
      required: ["run_id"],
    },
  },
  {
    name: "uxpass_report_md",
    description: "Get the Markdown report for a UXPass run.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        run_id: { type: "string", description: "The run id returned by uxpass_run" },
      },
      required: ["run_id"],
    },
  },
  {
    name: "uxpass_register_pack",
    description: "Register a UXPass pack from a YAML string. Validates the basic shape (required keys: name, url, viewports, themes, hats, synthesiser, budgets, remediation) and persists the pack so uxpass_run can reference it by name. Returns the assigned pack_id.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        pack_yaml: { type: "string", description: "Full pack definition as a YAML string" },
      },
      required: ["pack_yaml"],
    },
  },

  // ── seopass-tool.ts (search visibility QC, sister to UXPass) ────────────────
  {
    name: "seopass_run",
    description: "Run SEOPass against a public URL or registered pack. Returns a live-readonly SEO verdict, score, findings, fix prompts, and an in-session run id.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        url: { type: "string", description: "Target URL for a one-off SEOPass read-only run" },
        pack_name: { type: "string", description: "Name of a registered SEOPass pack; the pack URL is used as the target" },
        target_sha: { type: "string", description: "Optional PR or commit SHA for receipt staleness checks" },
      },
    },
  },
  {
    name: "seopass_status",
    description: "Fetch the stored in-session status and report for a SEOPass run.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        run_id: { type: "string", description: "The SEOPass run id returned by seopass_run" },
      },
      required: ["run_id"],
    },
  },
  {
    name: "seopass_register_pack",
    description: "Register a SEOPass pack from a YAML string. Validates required keys and stores the pack locally for seopass_run.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        pack_yaml: { type: "string", description: "Full SEOPass pack definition as a YAML string" },
      },
      required: ["pack_yaml"],
    },
  },
  {
    name: "seopass_lighthouse_plan",
    description: "Build the heavier Lighthouse execution plan for a SEOPass target URL. seopass_run already emits a lightweight live-readonly verdict.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        url: { type: "string", description: "Target URL to audit with Lighthouse" },
        strategy: { type: "string", enum: ["mobile", "desktop"], description: "Lighthouse strategy (default: mobile)" },
        categories: { type: "array", items: { type: "string" }, description: "Lighthouse categories to request" },
      },
      required: ["url"],
    },
  },

  // -- geopass-tool.ts (AI answer-engine readiness QC, sister to SEOPass) ----
  {
    name: "geopass_run",
    description: "Run GEOPass against a public URL. Returns a live-readonly AI answer-engine readiness receipt covering answer extractability, entity clarity, citation/sourceability, freshness cues, content structure, llms.txt, and AI bot visibility. GEOPass reports readiness only and does not guarantee rankings or citations.",
    annotations: {
      readOnlyHint: true,
      destructiveHint: false,
      idempotentHint: false,
      openWorldHint: true,
    },
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        url: { type: "string", description: "Target public http(s) URL for a one-off GEOPass read-only run" },
        target_url: { type: "string", description: "Alias for url" },
        checks: {
          type: "array",
          minItems: 1,
          description: "Optional GEOPass check ids. Defaults to the public-safe live checklist.",
          items: {
            type: "string",
            enum: [
              "ai-bot-crawlability",
              "llms-txt",
              "answer-extractability",
              "entity-clarity",
              "citation-readiness",
              "freshness-cues",
              "content-structure",
              "schema-org-citation-grade",
              "brand-mention-readiness",
              "wikidata-presence",
              "common-crawl-presence",
              "aggregate-ai-engine-readiness",
            ],
          },
        },
        target_sha: { type: "string", description: "Optional PR or commit SHA for receipt staleness checks." },
      },
    },
  },
  {
    name: "geopass_status",
    description: "Fetch the stored in-session GEOPass report and geopass_receipt_v1 envelope for a run started through geopass_run.",
    annotations: {
      readOnlyHint: true,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: false,
    },
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        run_id: { type: "string", description: "The GEOPass run id returned by geopass_run" },
      },
      required: ["run_id"],
    },
  },

  // ── flowpass-tool.ts (end-to-end journey QC with fixture proof) ────────────
  {
    name: "flowpass_run",
    description: "Run FlowPass against a public fixture or registered pack. Returns journey readiness, step verdicts, hat outputs, exclusions, and a stored report. Without fixture proof, returns a plan-only receipt instead of pretending a live journey ran.",
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: false,
      openWorldHint: false,
    },
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        target_url: { type: "string", description: "Target URL for a one-off FlowPass run" },
        url: { type: "string", description: "Alias for target_url" },
        pack_id: { type: "string", description: "Registered FlowPass pack id" },
        pack_name: { type: "string", description: "Registered FlowPass pack name" },
        pack_yaml: { type: "string", description: "FlowPass YAML pack using plain-English steps" },
        pack: { type: "object", description: "FlowPass pack object" },
        fixture: {
          type: "object",
          description: "Public fixture evidence for route, CTA, form, success, failure, navigation, handoff, side channels, timing, and accessibility.",
        },
        profile: { type: "string", enum: ["smoke", "standard", "deep"], description: "Run profile label. Defaults to smoke." },
        journey_id: { type: "string", description: "Optional journey id override" },
        journey_name: { type: "string", description: "Optional journey name override" },
        journey_kind: { type: "string", enum: ["signup", "auth", "checkout", "onboarding", "support", "custom"] },
        generated_at: { type: "string", description: "Optional ISO timestamp for reproducible fixture tests" },
        target_sha: { type: "string", description: "Optional PR or commit SHA for receipt staleness checks" },
      },
    },
  },
  {
    name: "flowpass_status",
    description: "Fetch the stored FlowPass run status, score, summary, and open disagreement queue entries for a run started in this MCP session.",
    annotations: {
      readOnlyHint: true,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: false,
    },
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        run_id: { type: "string", description: "The FlowPass run id returned by flowpass_run" },
      },
      required: ["run_id"],
    },
  },
  {
    name: "flowpass_report",
    description: "Fetch a FlowPass report in json, markdown, html, or fix_prompt format for a run started in this MCP session.",
    annotations: {
      readOnlyHint: true,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: false,
    },
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        run_id: { type: "string", description: "The FlowPass run id returned by flowpass_run" },
        format: { type: "string", enum: ["json", "markdown", "html", "fix_prompt"], description: "Report format. Defaults to json." },
      },
      required: ["run_id"],
    },
  },
  {
    name: "flowpass_register_pack",
    description: "Register a FlowPass pack from YAML or an object. Validates plain-English steps, hats, assertions, and optional fixture evidence.",
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: false,
      openWorldHint: false,
    },
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      anyOf: [
        { required: ["pack_yaml"] },
        { required: ["pack"] },
      ],
      properties: {
        pack_yaml: { type: "string", description: "FlowPass YAML pack" },
        pack: { type: "object", description: "FlowPass pack object" },
        overwrite: { type: "boolean", description: "Allow replacing an existing pack id" },
      },
    },
  },
  {
    name: "flowpass_record",
    description: "Convert supplied rrweb or structured session events into a draft FlowPass pack. This safe MCP surface does not start a live browser recording by itself.",
    annotations: {
      readOnlyHint: true,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: false,
    },
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        target_url: { type: "string", description: "Target URL the recording or session events came from" },
        session_events: { type: "array", items: { type: "string" }, description: "Structured event summaries or pre-captured rrweb-derived step labels" },
      },
      required: ["target_url"],
    },
  },
  {
    name: "flowpass_quarantine",
    description: "List, add, or resolve FlowPass quarantines for flows that should not be trusted as gates.",
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: false,
      openWorldHint: false,
    },
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        action: { type: "string", enum: ["list", "add", "resolve"], description: "Defaults to list" },
        flow_id: { type: "string", description: "Flow id for add or resolve" },
        reason: { type: "string", description: "Reason when adding a quarantine" },
      },
    },
  },
  {
    name: "flowpass_disagreement_queue",
    description: "List or resolve FlowPass Driver versus Verifier disagreements.",
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: false,
      openWorldHint: false,
    },
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        action: { type: "string", enum: ["list", "resolve"], description: "Defaults to list" },
        run_id: { type: "string", description: "Optional FlowPass run id to filter" },
        disagreement_id: { type: "string", description: "Disagreement id for resolve" },
        reviewer_note: { type: "string", description: "Human note for disagreement resolution" },
      },
    },
  },

  // ── securitypass-tool.ts (scope-gated security receipts) ─────────────────
  {
    name: "securitypass_run",
    description: "Start a scope-gated SecurityPass scan against a registered pack or target URL. Returns a safe securitypass_receipt_v1 proof envelope without raw secrets or PoC payloads.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        pack_id: { type: "string", description: "Pack id, e.g. 'securitypass-web-baseline'" },
        pack_yaml: { type: "string", description: "Optional pack YAML to validate and run without prior registration" },
        target_id: { type: "string", description: "Target id inside the SecurityPass pack" },
        target_url: { type: "string", description: "Target URL (must be in pack scope)" },
        contract_id: { type: "string", description: "Scope contract id for skeleton URL scans" },
        proof_method: { type: "string", enum: ["dns_txt", "well_known", "bug_bounty_program", "signed_email"] },
        expected_token: { type: "string", description: "Expected scope proof token" },
        proof_timeout_ms: { type: "number", description: "Optional timeout for well-known proof fetches" },
        profile: { type: "string", enum: ["smoke", "standard", "deep"], default: "smoke" },
      },
    },
  },
  {
    name: "securitypass_status",
    description: "Poll the state of a SecurityPass run. Returns status, verdict summary, counts, and a safe securitypass_receipt_v1 proof envelope.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        run_id: { type: "string", description: "The run id returned by securitypass_run" },
      },
      required: ["run_id"],
    },
  },
  {
    name: "securitypass_report",
    description: "Fetch the synthesised report for a completed run (executive narrative + findings). format=json|markdown|html.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        run_id: { type: "string" },
        format: { type: "string", enum: ["json", "markdown", "html"], default: "json" },
      },
      required: ["run_id"],
    },
  },
  {
    name: "securitypass_register_pack",
    description: "Save a SecurityPack YAML for the calling tenant. Validates against the schema.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        pack_id: { type: "string" },
        yaml: { type: "string", description: "Pack contents as YAML" },
      },
      required: ["pack_id", "yaml"],
    },
  },
  {
    name: "securitypass_verify_scope",
    description: "Verify scope authorisation for a target via DNS TXT or /.well-known proof. Required before any active probe runs.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        target_type: { type: "string", enum: ["url", "git", "mcp", "api"] },
        target_url: { type: "string" },
        target_repo: { type: "string" },
        proof_method: { type: "string", enum: ["dns_txt", "well_known", "bug_bounty_program", "signed_email"] },
        contract_id: { type: "string", description: "Signed scope contract id" },
        expected_token: { type: "string", description: "Token to look for in DNS TXT or /.well-known" },
        proof_timeout_ms: { type: "number", description: "Optional timeout for well-known proof fetches" },
      },
      required: ["proof_method"],
    },
  },
  {
    name: "securitypass_disclosure_status",
    description: "Check the 90+30 responsible-disclosure timer state for a finding (notified, acked, extended, public, withdrawn).",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        finding_id: { type: "string" },
      },
      required: ["finding_id"],
    },
  },
  {
    name: "securitypass_finding_detail",
    description: "Fetch a single finding including PoC payload (curl / prompt / payload) and remediation. PoC is generated, never auto-fired.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        finding_id: { type: "string" },
      },
      required: ["finding_id"],
    },
  },

  // ── sloppass-tool.ts (AI-code quality QC and diff review) ────────────────
  {
    name: "sloppass_run",
    description: "Run SlopPass against caller-provided source files, a unified diff, or a GitHub PR target whose public .diff should be fetched. Returns an evidence-backed slop-signal receipt plus JSON, markdown, and HTML reports. SlopPass does not execute code, clone repositories, persist source content, or make paid model calls by default.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      anyOf: [
        { required: ["files"] },
        { required: ["diff"] },
        {
          required: ["target"],
          properties: {
            target: {
              type: "object",
              required: ["kind"],
              properties: { kind: { type: "string", enum: ["pr"] } },
            },
          },
        },
      ],
      properties: {
        target: {
          type: "object",
          additionalProperties: false,
          description: "Target being inspected. For live GitHub PR review, use kind=pr with repo plus number, or url/pr_url.",
          properties: {
            kind: { type: "string", enum: ["repo", "branch", "diff", "files", "pr", "artifact"] },
            label: { type: "string", minLength: 1 },
            files: { type: "array", items: { type: "string", minLength: 1 } },
            ref: { type: "string" },
            repo: { type: "string", pattern: "^[A-Za-z0-9][A-Za-z0-9-]{0,38}/[A-Za-z0-9._-]{1,100}$", description: "GitHub repo in owner/name form for kind=pr." },
            number: {
              oneOf: [
                { type: "integer", minimum: 1 },
                { type: "string", pattern: "^[1-9][0-9]*$" },
              ],
              description: "GitHub pull request number for kind=pr.",
            },
            url: { type: "string", description: "GitHub pull request URL for kind=pr." },
            pr_url: { type: "string", description: "GitHub pull request URL for kind=pr." },
          },
          required: ["kind", "label"],
        },
        files: {
          type: "array",
          minItems: 1,
          description: "Source files to inspect. Use this for scoped local artifacts or paste-backed code review.",
          items: {
            type: "object",
            additionalProperties: false,
            properties: {
              path: { type: "string", minLength: 1 },
              content: { type: "string" },
              start_line: { type: "number", description: "Optional starting line for a diff hunk or sliced file." },
            },
            required: ["path", "content"],
          },
        },
        diff: { type: "string", description: "Unified diff text to inspect. Added lines are converted into scoped file evidence." },
        checks: {
          type: "array",
          minItems: 1,
          description: "Optional SlopPass check categories to run. Defaults to all built-in categories.",
          items: {
            type: "string",
            enum: [
              "grounding_api_reality",
              "logic_plausibility",
              "scaffold_without_substance",
              "test_proof_theatre",
              "slopocalypse_failure_mode",
              "maintenance_change_risk",
              "vcs_integration_risk",
            ],
          },
        },
        target_sha: { type: "string", description: "Optional PR or commit SHA for receipt staleness checks." },
        provider: {
          type: "string",
          enum: ["http", "openai", "anthropic", "google", "ollama"],
          description: "Provider mode to record in the receipt. Defaults to http and does not call a model.",
        },
      },
      required: ["target"],
    },
  },

  // ── compliancepass-tool.ts (evidence-backed readiness guidance) ───────────
  {
    name: "compliancepass_run",
    description: "Run CompliancePass against a local repo path. Returns evidence-backed readiness guidance, gaps, next actions, and an in-session run id. Historical EnterprisePass references are treated as this same product.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        repo_path: { type: "string", description: "Local repository path to scan. Defaults to the MCP server working directory." },
        target_name: { type: "string", description: "Human-readable target name for the report. Defaults to UnClick." },
        target_sha: { type: "string", description: "Optional PR or commit SHA for receipt staleness checks" },
      },
    },
  },
  {
    name: "compliancepass_status",
    description: "Fetch the stored in-session status and summary for a CompliancePass run.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        run_id: { type: "string", description: "The CompliancePass run id returned by compliancepass_run" },
      },
      required: ["run_id"],
    },
  },
  {
    name: "compliancepass_report_json",
    description: "Fetch the full JSON CompliancePass readiness report for a completed in-session run.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        run_id: { type: "string", description: "The CompliancePass run id returned by compliancepass_run" },
      },
      required: ["run_id"],
    },
  },
  {
    name: "compliancepass_report_md",
    description: "Fetch a Markdown CompliancePass readiness report for a completed in-session run.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        run_id: { type: "string", description: "The CompliancePass run id returned by compliancepass_run" },
      },
      required: ["run_id"],
    },
  },

  // ── copypass-tool.ts (copy quality QC with CopyRoom receipt support) ─────
  {
    name: "copypass_run",
    description: "Start a deterministic CopyPass review for caller-provided AI-generated copy. Returns evidence-backed copy findings, scope boundaries, disclaimer text, a structured copypass_receipt_v1 proof envelope, and optional CopyRoom exact-copy receipt.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        copy_text: { type: "string", description: "The AI-generated copy to review. Optional when copyroom_source_packet is provided; exact-copy verification compares this text byte-for-byte against the packet." },
        copyroom_required: {
          type: "boolean",
          description: "Set true when exact fidelity matters. Missing copyroom_source_packet returns COPYROOM_MISSING instead of a run with a null receipt.",
        },
        copyroom_source_packet: {
          type: "object",
          additionalProperties: false,
          description: "Exact source packet for CopyRoom fidelity work. Use this instead of retyping source text when code, prompts, labels, tables, documents, or user-provided text must stay exact.",
          properties: {
            source_id: { type: "string", description: "Stable source identifier." },
            source_pointer: { type: "string", description: "Pointer to the CopyRoom/source location." },
            text: { type: "string", description: "Exact source text to copy or verify." },
            encoding: { type: "string", enum: ["utf8"], description: "CopyRoom v1 encoding. Defaults to utf8." },
            newline_policy: { type: "string", enum: ["preserve"], description: "CopyRoom v1 newline policy. Defaults to preserve." },
          },
          required: ["source_id", "source_pointer", "text"],
        },
        copyroom_output_pointer: { type: "string", description: "Pointer to the intended output artifact for the CopyRoom receipt." },
        channel: { type: "string", description: "Optional surface label such as homepage_hero, pricing_section, or onboarding_email." },
        audience: { type: "string", description: "Optional intended audience for the copy." },
        goal: { type: "string", description: "Optional goal for the copy, such as clarity, conversion, or trust." },
        profile: { type: "string", enum: ["smoke", "standard", "deep"], description: "Review depth label for this scoped run. Defaults to smoke." },
      },
      required: [],
    },
  },
  {
    name: "copypass_status",
    description: "Fetch the current status, notes, deterministic findings, disclaimer, copypass_receipt_v1 proof envelope, and CopyRoom receipt for a CopyPass run started in this MCP session.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        run_id: { type: "string", description: "The run id returned by copypass_run" },
      },
      required: ["run_id"],
    },
  },

  // -- fidelitycopy-tool.ts (deterministic exact-copy receipts) ---------------
  {
    name: "fidelitycopy_copy",
    description:
      "Create a deterministic FidelityCopy receipt for exact copy work. AI may request the copy, but this tool computes source/output hashes and returns PASS only when the selected mode proves exact or approved fidelity.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        source_text: { type: "string", description: "Exact source text to copy. Mutually exclusive with source_base64." },
        source_base64: { type: "string", description: "Exact source bytes as base64. Mutually exclusive with source_text." },
        source_ref: { type: "string", description: "Source pointer used in the receipt." },
        copyroom_source_packet: {
          type: "object",
          additionalProperties: false,
          description: "CopyRoom source packet used as the source of truth. Mutually exclusive with source_text/source_base64.",
          properties: {
            source_id: { type: "string", description: "Stable CopyRoom source id." },
            source_pointer: { type: "string", description: "Pointer to the CopyRoom/source location." },
            text: { type: "string", description: "Exact source text to copy." },
            encoding: { type: "string", enum: ["utf8"], description: "CopyRoom v1 encoding. Defaults to utf8." },
            newline_policy: { type: "string", enum: ["preserve"], description: "CopyRoom v1 newline policy. Defaults to preserve." },
          },
          required: ["source_id", "source_pointer", "text"],
        },
        destination_label: { type: "string", description: "Human label for the output destination when output_ref is not supplied." },
        output_ref: { type: "string", description: "Output pointer used in the receipt." },
        output_text: { type: "string", description: "Output text for approved_transform mode." },
        output_base64: { type: "string", description: "Output bytes for approved_transform mode as base64." },
        mode: {
          type: "string",
          enum: ["raw_bytes", "text_exact", "json_canonical", "approved_transform"],
          description: "Verification mode. Defaults to raw_bytes.",
        },
        allowed_changes: {
          oneOf: [{ type: "string" }, { type: "array", items: { type: "string" } }],
          description: "Required for approved_transform PASS.",
        },
        provenance_ref: { type: "string", description: "Optional Boardroom, issue, PR, or CopyRoom pointer for audit trail." },
      },
      required: [],
    },
  },
  {
    name: "fidelitypass_verify_copy",
    description:
      "Recompute a FidelityCopy/FidelityPass verdict from source and output bytes, or return N/A when no exact 1:1 copy is in scope. Missing bytes, stale metadata, or prose-only AI proof cannot PASS.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        exact_copy_required: {
          type: "boolean",
          description: "Set false only when the target has no exact 1:1 copy, transcription, mirroring, or preservation scope. Returns N/A.",
        },
        copy_scope: {
          type: "string",
          enum: ["exact_copy", "not_applicable"],
          description: "Explicit FidelityPass scope. Use not_applicable to record the XPass N/A row when no exact copy is in scope.",
        },
        scope_reason: {
          type: "string",
          description: "Reason why FidelityPass is N/A for this target. Used only when exact_copy_required=false or copy_scope=not_applicable.",
        },
        source_text: { type: "string", description: "Exact source text to verify. Mutually exclusive with source_base64." },
        source_base64: { type: "string", description: "Exact source bytes as base64. Mutually exclusive with source_text." },
        copyroom_source_packet: {
          type: "object",
          additionalProperties: false,
          description: "CopyRoom source packet used as the source of truth. Mutually exclusive with source_text/source_base64.",
          properties: {
            source_id: { type: "string", description: "Stable CopyRoom source id." },
            source_pointer: { type: "string", description: "Pointer to the CopyRoom/source location." },
            text: { type: "string", description: "Exact source text to verify." },
            encoding: { type: "string", enum: ["utf8"], description: "CopyRoom v1 encoding. Defaults to utf8." },
            newline_policy: { type: "string", enum: ["preserve"], description: "CopyRoom v1 newline policy. Defaults to preserve." },
          },
          required: ["source_id", "source_pointer", "text"],
        },
        output_text: { type: "string", description: "Exact output text to verify. Mutually exclusive with output_base64." },
        output_base64: { type: "string", description: "Exact output bytes as base64. Mutually exclusive with output_text." },
        source_ref: { type: "string", description: "Source pointer used in the recomputed receipt." },
        output_ref: { type: "string", description: "Output pointer used in the recomputed receipt." },
        mode: {
          type: "string",
          enum: ["raw_bytes", "text_exact", "json_canonical", "approved_transform"],
          description: "Verification mode. Defaults to raw_bytes or the provided receipt mode.",
        },
        receipt: { type: "object", description: "Optional previous FidelityCopy receipt to compare against recomputed hashes." },
        receipt_payload: { type: "object", description: "Alias for receipt." },
        proof_text: { type: "string", description: "Optional prose proof. Prose alone is suppressed, not accepted as PASS." },
        allowed_changes: {
          oneOf: [{ type: "string" }, { type: "array", items: { type: "string" } }],
          description: "Required for approved_transform PASS.",
        },
        provenance_ref: { type: "string", description: "Optional Boardroom, issue, PR, or CopyRoom pointer for audit trail." },
      },
      required: [],
    },
  },

  // ── crews-tool.ts (Orchestrator Wizard) ──────────────────────────────────────
  {
    name: "start_crew_run",
    description: "Call this tool when the user wants to start a Crews Council run. In a sampling-capable MCP client, it prepares the run, asks advisors for opinions, runs peer review, persists the Chairman synthesis, and returns a ConversationalCard. If sampling is unavailable, the card reports SAMPLING_NOT_SUPPORTED. Response card surfaces was_duplicate when an existing run is returned for an already-seen task_id.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        crew_id: { type: "string", description: "The UUID of the Crew to run" },
        task_prompt: { type: "string", description: "The task the Council should deliberate on" },
        token_budget: { type: "number", description: "Optional token budget (default 150000)" },
        task_id: {
          type: "string",
          description: "Client-generated idempotency key (UUIDv5 from thread_id + prompt_hash + time_bucket recommended). Required for safe retry. If omitted, the server creates a fresh row and you lose retry safety; sending the same task_id twice returns the original run_id with was_duplicate=true instead of creating a duplicate.",
        },
      },
      required: ["crew_id", "task_prompt"],
    },
  },
  {
    name: "get_run",
    description: "Call this tool when the user wants the status of a specific Crews run. Returns a ConversationalCard summarising stage progress, token usage, and any failure artifact.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        run_id: { type: "string", description: "The run_id returned by start_crew_run" },
      },
      required: ["run_id"],
    },
  },
  {
    name: "list_runs",
    description: "Call this tool when the user wants a recent history of Crews runs. Returns a ConversationalCard with a run count and the newest few run ids.",
    inputSchema: {
      type: "object" as const,
      additionalProperties: false,
      properties: {
        crew_id: { type: "string", description: "Optional: filter to one crew" },
        limit: { type: "number", description: "Optional: max rows to return (default 50, capped at 100)" },
      },
    },
  },

] as const;

// ─────────────────────────────────────────────────────────────────────────────
// ADDITIONAL_HANDLERS
// ─────────────────────────────────────────────────────────────────────────────

export const ADDITIONAL_HANDLERS: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {

  // bgg-tool.ts
  bgg_search:           (args) => bggSearch(args),
  bgg_game_details:     (args) => bggGameDetails(args),
  bgg_user_collection:  (args) => bggUserCollection(args),
  bgg_top_games:        (args) => bggTopGames(args),
  bgg_game_reviews:     (args) => bggGameReviews(args),

  // rawg-tool.ts
  rawg_search_games:    (args) => rawgSearchGames(args),
  rawg_get_game:        (args) => rawgGetGame(args),
  rawg_game_screenshots:(args) => rawgGetGameScreenshots(args),
  rawg_list_genres:     (args) => rawgListGenres(args),
  rawg_list_platforms:  (args) => rawgListPlatforms(args),
  rawg_upcoming_games:  (args) => rawgUpcomingGames(args),

  // riot-tool.ts
  riot_summoner:        (args) => riotSummoner(args),
  riot_ranked:          (args) => riotRanked(args),
  riot_match_history:   (args) => riotMatchHistory(args),
  riot_get_match:       (args) => riotGetMatch(args),
  riot_valorant_account:(args) => riotValorantAccount(args),

  // bungie-tool.ts
  bungie_search_player: (args) => bungieSearchPlayer(args),
  bungie_get_profile:   (args) => bungieGetProfile(args),
  bungie_get_manifest:  (args) => bungieGetManifest(args),
  bungie_search_entities:(args) => bungieSearchEntities(args),

  // supercell-tool.ts
  coc_player:           (args) => cocPlayer(args),
  coc_clan:             (args) => cocClan(args),
  coc_clan_members:     (args) => cocClanMembers(args),
  cr_player:            (args) => crPlayer(args),
  cr_top_players:       (args) => crTopPlayers(args),
  bs_player:            (args) => bsPlayer(args),
  bs_club:              (args) => bsClub(args),

  // lego-tool.ts
  lego_search_sets:     (args) => legoSearchSets(args),
  lego_get_set:         (args) => legoGetSet(args),
  lego_set_parts:       (args) => legoSetParts(args),
  lego_search_parts:    (args) => legoSearchParts(args),
  lego_themes:          (args) => legoThemes(args),
  brickset_search:      (args) => bricksetSearch(args),
  brickset_get_set:     (args) => bricksetGetSet(args),

  // untappd-tool.ts
  untappd_search_beer:  (args) => untappdSearchBeer(args),
  untappd_get_beer:     (args) => untappdGetBeer(args),
  untappd_get_brewery:  (args) => untappdGetBrewery(args),
  untappd_search_brewery:(args) => untappdSearchBrewery(args),
  untappd_beer_activities:(args) => untappdBeerActivities(args),

  // pandascore-tool.ts
  esports_matches:      (args) => esportsMatches(args),
  esports_tournaments:  (args) => esportsTournaments(args),
  esports_teams:        (args) => esportsTeams(args),
  esports_players:      (args) => esportsPlayers(args),
  esports_get_match:    (args) => esportsGetMatch(args),

  // amber-tool.ts
  amber_sites:          (args) => getAmberSites(args),
  amber_current_price:  (args) => getAmberCurrentPrice(args),
  amber_forecast:       (args) => getAmberForecast(args),

  // willyweather-tool.ts
  willyweather_forecast:(args) => getWillyweatherForecast(args),
  willyweather_surf:    (args) => getWillyweatherSurf(args),
  willyweather_tide:    (args) => getWillyweatherTide(args),

  // domain-tool.ts
  domain_search_listings:(args) => searchDomainListings(args),
  domain_get_property:  (args) => getDomainProperty(args),
  domain_suburb_stats:  (args) => getDomainSuburbStats(args),

  // trove-tool.ts
  trove_search:         (args) => searchTrove(args),
  trove_get_work:       (args) => getTroveWork(args),
  trove_newspaper_article:(args) => getTroveNewspaperArticle(args),

  // australiapost-tool.ts
  auspost_track_parcel: (args) => trackAuspostParcel(args),
  auspost_get_postcode: (args) => getAuspostPostcode(args),
  auspost_delivery_times:(args) => getAuspostDeliveryTimes(args),

  // sendle-tool.ts
  sendle_get_quote:     (args) => getSendleQuote(args),
  sendle_create_order:  (args) => createSendleOrder(args),
  sendle_track_parcel:  (args) => trackSendleParcel(args),

  // ipaustralia-tool.ts
  search_trademarks:    (args) => searchTrademarks(args),
  get_trademark_details:(args) => getTrademarkDetails(args),
  search_patents:       (args) => searchPatents(args),

  // tab-tool.ts
  tab_meetings:         (args) => getTabMeetings(args),
  tab_race:             (args) => getTabRace(args),
  tab_sports_markets:   (args) => getTabSportsMarkets(args),

  // thelott-tool.ts
  lott_results:         (args) => getLottResults(args),
  lott_jackpots:        (args) => getLottJackpots(args),

  // abn-tool.ts
  abn_lookup:           (args) => abnLookup(args),
  abn_search:           (args) => abnSearch(args),

  // ptv-tool.ts
  ptv_search:           (args) => ptvSearch(args),
  ptv_departures:       (args) => ptvDepartures(args),
  ptv_disruptions:      (args) => ptvDisruptions(args),
  ptv_stops_on_route:   (args) => ptvStopsOnRoute(args),
  ptv_route_directions: (args) => ptvRouteDirections(args),

  // nvd-tool.ts
  get_cve_detail:       (args) => getCveDetail(args),
  search_cve:           (args) => searchCve(args),
  get_recent_cves:      (args) => getRecentCves(args),

  // hunter-tool.ts
  hunter_find_email:    (args) => findEmail(args),
  hunter_verify_email:  (args) => verifyEmail(args),
  hunter_domain_info:   (args) => getDomainInfo(args),

  // haveibeenpwned-tool.ts
  hibp_check_account:   (args) => checkAccountBreaches(args),
  hibp_all_breaches:    (args) => getAllBreaches(args),
  hibp_check_password:  (args) => checkPassword(args),

  // virustotal-tool.ts
  virustotal_scan_url:  (args) => scanUrlVirustotal(args),
  virustotal_url_report:(args) => getUrlReport(args),
  virustotal_scan_ip:   (args) => scanIpVirustotal(args),
  virustotal_scan_domain:(args) => scanDomainVirustotal(args),

  // abuseipdb-tool.ts
  abuseipdb_check_ip:   (args) => checkIpAbuse(args),
  abuseipdb_report_ip:  (args) => reportIpAbuse(args),
  abuseipdb_blacklist:  (args) => getBlacklistAbuseipdb(args),

  // urlscan-tool.ts
  urlscan_scan:         (args) => scanUrlUrlscan(args),
  urlscan_get_result:   (args) => getScanResult(args),
  urlscan_search:       (args) => searchUrlscan(args),

  // shodan-tool.ts
  shodan_search:        (args) => searchShodan(args),
  shodan_host_info:     (args) => getHostInfo(args),
  shodan_stats:         (args) => getShodanStats(args),

  // resend-tool.ts
  resend_send_email:    (args) => sendEmailResend(args),
  resend_get_email:     (args) => getEmailResend(args),
  resend_list_domains:  (args) => listDomainsResend(args),

  // vercel-tool.ts
  vercel_list_deployments:(args) => listVercelDeployments(args),
  vercel_get_deployment:(args) => getVercelDeployment(args),
  vercel_list_projects: (args) => listVercelProjects(args),
  vercel_get_domain:    (args) => getVercelDomain(args),
  vercel_get_env:       (args) => getVercelEnv(args),
  vercel_create_env:    (args) => createVercelEnv(args),
  vercel_delete_env:    (args) => deleteVercelEnv(args),
  vercel_create_deployment:(args) => createVercelDeployment(args),

  // toggl-tool.ts
  toggl_time_entries:   (args) => getTogglTimeEntries(args),
  toggl_create_time_entry:(args) => createTimeEntryToggl(args),
  toggl_projects:       (args) => getTogglProjects(args),
  toggl_summary:        (args) => getTogglSummary(args),

  // email-tool.ts
  email_send:           (args) => sendEmail(args),
  email_read_inbox:     (args) => readInbox(args),
  email_search:         (args) => searchEmail(args),
  email_get:            (args) => getEmail(args),
  email_mark_read:      (args) => markRead(args),
  email_delete:         (args) => deleteEmail(args),

  // usgs-tool.ts
  usgs_recent_earthquakes:   (args) => getRecentEarthquakes(args),
  usgs_earthquake_detail:    (args) => getEarthquakeDetail(args),
  usgs_earthquakes_by_region:(args) => getEarthquakesByRegion(args),

  // openaq-tool.ts
  openaq_air_quality:   (args) => getAirQuality(args),
  openaq_measurements:  (args) => getAirMeasurements(args),
  openaq_countries:     (args) => getAqCountries(args),

  // openfoodfacts-tool.ts
  food_search:          (args) => searchFoodProducts(args),
  food_get_product:     (args) => getFoodProduct(args),
  food_by_category:     (args) => getFoodByCategory(args),

  // ebird-tool.ts
  ebird_recent_observations:  (args) => getRecentObservations(args),
  ebird_notable_observations: (args) => getNotableObservations(args),
  ebird_species_info:         (args) => getSpeciesInfo(args),

  // carboninterface-tool.ts
  carbon_flight_emissions:     (args) => estimateFlightEmissions(args),
  carbon_vehicle_emissions:    (args) => estimateVehicleEmissions(args),
  carbon_electricity_emissions:(args) => estimateElectricityEmissions(args),

  // toilets-tool.ts
  find_nearest_toilets: (args) => findNearestToilets(args),
  get_toilet_details:   (args) => getToiletDetails(args),

  // calculator-tool.ts
  calc_tip:             (args) => Promise.resolve(calculateTip(args)),
  calc_mortgage:        (args) => Promise.resolve(calculateMortgage(args)),
  calc_bmi:             (args) => Promise.resolve(calculateBmi(args)),
  calc_compound_interest:(args) => Promise.resolve(calculateCompoundInterest(args)),
  calc_currency_estimate:(args) => Promise.resolve(convertCurrencyEstimate(args)),

  // unit-converter-tool.ts
  convert_length:       (args) => Promise.resolve(convertLength(args)),
  convert_weight:       (args) => Promise.resolve(convertWeight(args)),
  convert_temperature:  (args) => Promise.resolve(convertTemperature(args)),
  convert_volume:       (args) => Promise.resolve(convertVolume(args)),
  convert_speed:        (args) => Promise.resolve(convertSpeed(args)),
  convert_area:         (args) => Promise.resolve(convertArea(args)),
  convert_data_storage: (args) => Promise.resolve(convertDataStorage(args)),

  // datetime-tool.ts
  datetime_current_time:   (args) => Promise.resolve(getCurrentTime(args)),
  datetime_convert_timezone:(args) => Promise.resolve(convertTimezone(args)),
  datetime_date_diff:      (args) => Promise.resolve(calculateDateDiff(args)),
  datetime_add_to_date:    (args) => Promise.resolve(addToDate(args)),
  datetime_business_days:  (args) => Promise.resolve(getBusinessDays(args)),
  datetime_format_date:    (args) => Promise.resolve(formatDate(args)),
  datetime_week_number:    (args) => Promise.resolve(getWeekNumber(args)),

  // text-tool.ts
  text_analyse:            (args) => Promise.resolve(analyseText(args)),
  text_transform:          (args) => Promise.resolve(transformText(args)),
  text_extract_emails:     (args) => Promise.resolve(extractEmails(args)),
  text_extract_urls:       (args) => Promise.resolve(extractUrls(args)),
  text_extract_phone_numbers:(args) => Promise.resolve(extractPhoneNumbers(args)),
  text_count_occurrences:  (args) => Promise.resolve(countOccurrences(args)),
  text_truncate:           (args) => Promise.resolve(truncateText(args)),

  // meal-tool.ts
  meal_search:             (args) => searchMeals(args),
  meal_random:             (args) => getRandomMeal(args),
  meal_get_by_id:          (args) => getMealById(args),
  meal_categories:         (args) => listMealCategories(args),
  meal_filter_by_category: (args) => filterMealsByCategory(args),
  meal_filter_by_area:     (args) => filterMealsByArea(args),
  meal_filter_by_ingredient:(args) => filterMealsByIngredient(args),

  // espn-tool.ts
  espn_nfl_scores:         (args) => getNflScores(args),
  espn_nba_scores:         (args) => getNbaScores(args),
  espn_mlb_scores:         (args) => getMlbScores(args),
  espn_nhl_scores:         (args) => getNhlScores(args),
  espn_soccer_scores:      (args) => getSoccerScores(args),
  espn_news:               (args) => getEspnNews(args),
  espn_team_info:          (args) => getTeamInfo(args),

  // sleeper-tool.ts
  sleeper_nfl_state:       (args) => getNflState(args),
  sleeper_players:         (args) => getSleeperPlayers(args),
  sleeper_trending_players:(args) => getTrendingPlayers(args),
  sleeper_league:          (args) => getSleeperLeague(args),
  sleeper_league_rosters:  (args) => getLeagueRosters(args),
  sleeper_league_matchups: (args) => getLeagueMatchups(args),

  // deezer-tool.ts
  deezer_search:           (args) => searchDeezer(args),
  deezer_get_artist:       (args) => getDeezerArtist(args),
  deezer_get_album:        (args) => getDeezerAlbum(args),
  deezer_get_track:        (args) => getDeezerTrack(args),
  deezer_chart:            (args) => getDeezerChart(args),
  deezer_search_playlist:  (args) => searchDeezerPlaylist(args),

  // color-tool.ts
  color_convert:           (args) => Promise.resolve(convertColor(args)),
  color_info:              (args) => Promise.resolve(getColorInfo(args)),
  color_palette:           (args) => Promise.resolve(generateColorPalette(args)),
  color_mix:               (args) => Promise.resolve(mixColors(args)),
  color_contrast_ratio:    (args) => Promise.resolve(checkContrastRatio(args)),

  // random-tool.ts
  random_uuid:             (args) => Promise.resolve(generateUuid(args)),
  random_number:           (args) => Promise.resolve(generateRandomNumber(args)),
  random_string:           (args) => Promise.resolve(generateRandomString(args)),
  random_pick_from_list:   (args) => Promise.resolve(pickRandomFromList(args)),
  random_flip_coin:        (args) => Promise.resolve(flipCoin(args)),
  random_roll_dice:        (args) => Promise.resolve(rollDice(args)),
  random_shuffle_list:     (args) => Promise.resolve(shuffleList(args)),
  random_lorem_ipsum:      (args) => Promise.resolve(generateLoremIpsum(args)),

  // notion-tool.ts
  notion_action:           (args) => notionAction(String(args.action ?? ""), args),

  // readwise-tool.ts
  readwise_action:         (args) => readwiseAction(String(args.action ?? ""), args),

  // raindrop-tool.ts
  raindrop_action:         (args) => raindropAction(String(args.action ?? ""), args),

  // clockify-tool.ts
  clockify_action:         (args) => clockifyAction(String(args.action ?? ""), args),

  // splitwise-tool.ts
  splitwise_action:        (args) => splitwiseAction(String(args.action ?? ""), args),

  // instapaper-tool.ts
  instapaper_action:       (args) => instapaperAction(String(args.action ?? ""), args),

  // monica-tool.ts
  monica_action:           (args) => monicaAction(String(args.action ?? ""), args),

  // feedly-tool.ts
  feedly_action:           (args) => feedlyAction(String(args.action ?? ""), args),

  // hackernews-tool.ts
  hn_top_stories:          (args) => hnTopStories(args),
  hn_new_stories:          (args) => hnNewStories(args),
  hn_best_stories:         (args) => hnBestStories(args),
  hn_ask_hn:               (args) => hnAskHn(args),
  hn_show_hn:              (args) => hnShowHn(args),
  hn_item:                 (args) => hnItem(args),
  hn_user:                 (args) => hnUser(args),

  // openf1-tool.ts
  f1_sessions:             (args) => f1Sessions(args),
  f1_drivers:              (args) => f1Drivers(args),
  f1_positions:            (args) => f1Positions(args),
  f1_laps:                 (args) => f1Laps(args),
  f1_pit_stops:            (args) => f1PitStops(args),
  f1_car_data:             (args) => f1CarData(args),
  f1_team_radio:           (args) => f1TeamRadio(args),
  f1_weather:              (args) => f1Weather(args),

  // tmdb-tool.ts
  tmdb_search_movies:      (args) => tmdbSearchMovies(args),
  tmdb_search_tv:          (args) => tmdbSearchTv(args),
  tmdb_movie:              (args) => tmdbMovie(args),
  tmdb_tv:                 (args) => tmdbTv(args),
  tmdb_trending:           (args) => tmdbTrending(args),
  tmdb_now_playing:        (args) => tmdbNowPlaying(args),
  tmdb_upcoming:           (args) => tmdbUpcoming(args),
  tmdb_popular_tv:         (args) => tmdbPopularTv(args),

  // trivia-tool.ts
  trivia_questions:        (args) => triviaQuestions(args),
  trivia_categories:       (args) => triviaCategories(args),

  // pokeapi-tool.ts
  poke_get_pokemon:        (args) => pokeGetPokemon(args),
  poke_search_pokemon:     (args) => pokeSearchPokemon(args),
  poke_get_type:           (args) => pokeGetType(args),
  poke_get_ability:        (args) => pokeGetAbility(args),
  poke_get_generation:     (args) => pokeGetGeneration(args),

  // cocktail-tool.ts
  cocktail_search:              (args) => searchCocktails(args),
  cocktail_random:              (args) => getRandomCocktail(args),
  cocktail_get_by_id:           (args) => getCocktailById(args),
  cocktail_categories:          (args) => listCocktailCategories(args),
  cocktail_filter_by_category:  (args) => filterCocktailsByCategory(args),
  cocktail_filter_by_ingredient:(args) => filterCocktailsByIngredient(args),

  // dictionary-tool.ts
  dictionary_lookup:          (args) => dictionaryLookup(args),
  dictionary_lookup_language: (args) => dictionaryLookupLanguage(args),

  // joke-tool.ts
  joke_random:             (args) => jokeRandom(args),
  joke_categories:         (args) => jokeCategories(args),

  // holidays-tool.ts
  holidays_by_country:     (args) => holidaysByCountry(args),
  holidays_next:           (args) => holidaysNextWorldwide(args),
  holidays_countries:      (args) => holidayCountries(args),
  holidays_long_weekends:  (args) => holidayLongWeekends(args),

  // dogceo-tool.ts
  dog_random_image:        (args) => dogRandomImage(args),
  dog_breed_image:         (args) => dogBreedImage(args),
  dog_list_breeds:         (args) => dogListBreeds(args),
  dog_breed_list:          (args) => dogBreedList(args),

  // rickandmorty-tool.ts
  ram_get_character:       (args) => ramGetCharacter(args),
  ram_search_characters:   (args) => ramSearchCharacters(args),
  ram_get_episode:         (args) => ramGetEpisode(args),
  ram_search_episodes:     (args) => ramSearchEpisodes(args),
  ram_get_location:        (args) => ramGetLocation(args),

  // xkcd-tool.ts
  xkcd_latest:             (args) => xkcdLatest(args),
  xkcd_comic:              (args) => xkcdComic(args),
  xkcd_random:             (args) => xkcdRandom(args),

  // brewery-tool.ts
  brewery_search:          (args) => brewerySearch(args),
  brewery_get:             (args) => breweryGet(args),
  brewery_list:            (args) => breweryList(args),
  brewery_random:          (args) => breweryRandom(args),

  // jikan-tool.ts
  jikan_search_anime:      (args) => jikanSearchAnime(args),
  jikan_get_anime:         (args) => jikanGetAnime(args),
  jikan_top_anime:         (args) => jikanTopAnime(args),
  jikan_search_manga:      (args) => jikanSearchManga(args),
  jikan_get_character:     (args) => jikanGetCharacter(args),

  // chucknorris-tool.ts
  chuck_random:            (args) => chuckRandom(args),
  chuck_search:            (args) => chuckSearch(args),
  chuck_categories:        (args) => chuckCategories(args),

  // catfacts-tool.ts
  cat_fact:                (args) => catFact(args),
  cat_facts:               (args) => catFacts(args),
  cat_breeds:              (args) => catBreeds(args),

  // swapi-tool.ts
  swapi_get_person:        (args) => swapiGetPerson(args),
  swapi_search_people:     (args) => swapiSearchPeople(args),
  swapi_get_planet:        (args) => swapiGetPlanet(args),
  swapi_search_planets:    (args) => swapiSearchPlanets(args),
  swapi_get_starship:      (args) => swapiGetStarship(args),
  swapi_search_starships:  (args) => swapiSearchStarships(args),

  // dnd5e-tool.ts
  dnd_get_class:           (args) => dndGetClass(args),
  dnd_list_classes:        (args) => dndListClasses(args),
  dnd_get_spell:           (args) => dndGetSpell(args),
  dnd_list_spells:         (args) => dndListSpells(args),
  dnd_get_monster:         (args) => dndGetMonster(args),
  dnd_list_monsters:       (args) => dndListMonsters(args),

  // deckofcards-tool.ts
  deck_new:                (args) => deckNew(args),
  deck_draw:               (args) => deckDraw(args),
  deck_shuffle:            (args) => deckShuffle(args),

  // adviceslip-tool.ts
  advice_random:           (args) => adviceRandom(args),
  advice_search:           (args) => adviceSearch(args),
  advice_by_id:            (args) => adviceById(args),

  // agify-tool.ts
  agify_age:               (args) => agifyAge(args),
  genderize_name:          (args) => genderizeName(args),
  nationalize_name:        (args) => nationalizeName(args),

  // quotable-tool.ts
  quote_random:            (args) => quoteRandom(args),
  quote_search:            (args) => quoteSearch(args),
  quote_by_author:         (args) => quoteByAuthor(args),
  quote_list_tags:         (args) => quoteListTags(args),
  quote_list_authors:      (args) => quoteListAuthors(args),

  // bored-tool.ts
  bored_random:            (args) => boredRandom(args),
  bored_by_type:           (args) => boredByType(args),
  bored_by_participants:   (args) => boredByParticipants(args),

  // superhero-tool.ts
  hero_get_by_id:          (args) => heroGetById(args),
  hero_all:                (args) => heroAll(args),
  hero_powerstats:         (args) => heroPowerstats(args),

  // opennotify-tool.ts
  iss_location:            (args) => issLocation(args),
  iss_astronauts:          (args) => issAstronauts(args),

  // tarot-tool.ts
  tarot_all_cards:         (args) => tarotAllCards(args),
  tarot_draw:              (args) => tarotDraw(args),
  tarot_search:            (args) => tarotSearch(args),

  // aoe2-tool.ts
  aoe2_civilizations:      (args) => aoe2Civilizations(args),
  aoe2_civilization:       (args) => aoe2Civilization(args),
  aoe2_units:              (args) => aoe2Units(args),
  aoe2_unit:               (args) => aoe2Unit(args),
  aoe2_technologies:       (args) => aoe2Technologies(args),

  // affirmation-tool.ts
  affirmation_random:      (args) => affirmationRandom(args),

  // jsonplaceholder-tool.ts
  jp_list_posts:           (args) => jpListPosts(args),
  jp_get_post:             (args) => jpGetPost(args),
  jp_list_comments:        (args) => jpListComments(args),
  jp_list_users:           (args) => jpListUsers(args),

  // picsum-tool.ts
  picsum_list:             (args) => picsumList(args),
  picsum_get:              (args) => picsumGet(args),
  picsum_random_url:       (args) => picsumRandomUrl(args),

  // bible-tool.ts
  bible_verse:             (args) => bibleVerse(args),
  bible_random:            (args) => bibleRandom(args),

  // frankfurter-tool.ts
  frankfurter_latest:      (args) => frankfurterLatest(args),
  frankfurter_convert:     (args) => frankfurterConvert(args),
  frankfurter_historical:  (args) => frankfurterHistorical(args),
  frankfurter_currencies:  (args) => frankfurterCurrencies(args),

  // zenquotes-tool.ts
  zen_quote_random:        (args) => zenQuoteRandom(args),
  zen_quote_today:         (args) => zenQuoteToday(args),
  zen_quotes:              (args) => zenQuotes(args),

  // kanye-tool.ts
  kanye_quote:             (args) => kanyeQuote(args),

  // dadjoke-tool.ts
  dadjoke_random:          (args) => dadJokeRandom(args),
  dadjoke_search:          (args) => dadJokeSearch(args),
  dadjoke_by_id:           (args) => dadJokeById(args),

  // uselessfacts-tool.ts
  useless_fact_random:     (args) => uselessFactRandom(args),
  useless_fact_today:      (args) => uselessFactToday(args),

  // randomfox-tool.ts
  random_fox_image:        (args) => randomFoxImage(args),

  // httpbin-tool.ts
  httpbin_get:             (args) => httpbinGet(args),
  httpbin_headers:         (args) => httpbinHeaders(args),
  httpbin_ip:              (args) => httpbinIp(args),
  httpbin_user_agent:      (args) => httpbinUserAgent(args),
  httpbin_uuid:            (args) => httpbinUuid(args),

  // reqres-tool.ts
  reqres_list_users:       (args) => reqresListUsers(args),
  reqres_get_user:         (args) => reqresGetUser(args),
  reqres_list_resources:   (args) => reqresListResources(args),

  // corporatebs-tool.ts
  corporate_bs_phrase:     (args) => corporateBsPhrase(args),

  // worldtime-tool.ts
  worldtime_by_timezone:   (args) => worldTimeByTimezone(args),
  worldtime_by_ip:         (args) => worldTimeByIp(args),
  worldtime_list_timezones: (args) => worldTimeListTimezones(args),

  // sunrisesunset-tool.ts
  sunrise_sunset_times:    (args) => sunriseSunsetTimes(args),

  // zippopotamus-tool.ts
  zip_lookup:              (args) => zipLookup(args),
  zip_by_city:             (args) => zipByCity(args),

  // yesno-tool.ts
  yesno_random:            (args) => yesNoRandom(args),

  // evilinsult-tool.ts
  evil_insult_random:      (args) => evilInsultRandom(args),

  // dogapi-tool.ts
  dog_api_random_image:    (args) => dogApiRandomImage(args),
  dog_api_breeds:          (args) => dogApiBreeds(args),

  // apifootball-tool.ts (TheSportsDB)
  sportsdb_search_team:    (args) => sportsdbSearchTeam(args),
  sportsdb_search_player:  (args) => sportsdbSearchPlayer(args),
  sportsdb_team_events:    (args) => sportsdbTeamEvents(args),
  sportsdb_leagues:        (args) => sportsdbLeagues(args),

  // catapi-tool.ts
  cat_api_random_image:    (args) => catApiRandomImage(args),
  cat_api_breeds:          (args) => catApiBreeds(args),

  // spaceflight-tool.ts
  spaceflight_articles:    (args) => spaceflightArticles(args),
  spaceflight_blogs:       (args) => spaceflightBlogs(args),
  spaceflight_reports:     (args) => spaceflightReports(args),

  // archiveorg-tool.ts
  archive_search:          (args) => archiveSearch(args),
  archive_metadata:        (args) => archiveMetadata(args),

  // ipify-tool.ts
  ipify_get_ip:            (args) => ipifyGetIp(args),

  // exchangerate2-tool.ts
  er_latest_rates:         (args) => erLatestRates(args),

  // makeup-tool.ts
  makeup_search:           (args) => makeupSearch(args),

  // github-emoji-tool.ts
  github_emojis:           (args) => githubEmojis(args),

  // metmuseum-tool.ts
  met_search:              (args) => metSearch(args),
  met_object:              (args) => metObject(args),
  met_departments:         (args) => metDepartments(args),

  // lorem-tool.ts
  bacon_ipsum:             (args) => baconIpsum(args),

  // placekitten-tool.ts
  placeholder_image:       (args) => placeholderImage(args),
  placekitten_image:       (args) => placekittenImage(args),

  // shibe-tool.ts
  shibe_random_image:      (args) => shibeRandomImage(args),

  // cataas-tool.ts
  cataas_random_cat:       (args) => cataasRandomCat(args),
  cataas_list_tags:        (args) => cataasListTags(args),

  // punkapi-tool.ts
  punkapi_random_beer:     (args) => punkApiRandomBeer(args),
  punkapi_search_beers:    (args) => punkApiSearchBeers(args),
  punkapi_get_beer:        (args) => punkApiGetBeer(args),

  // colormind-tool.ts
  colormind_generate_palette: (args) => colormindGeneratePalette(args),
  colormind_list_models:   (args) => colormindListModels(args),

  // dummyjson-tool.ts
  dummyjson_products:      (args) => dummyjsonProducts(args),
  dummyjson_search_products: (args) => dummyjsonSearchProducts(args),
  dummyjson_quotes:        (args) => dummyjsonQuotes(args),
  dummyjson_random_quote:  (args) => dummyjsonRandomQuote(args),

  // excuser-tool.ts
  excuser_random:          (args) => excuserRandom(args),

  // dogfacts-tool.ts
  dog_fact_random:         (args) => dogFactRandom(args),

  // amiibo-tool.ts
  amiibo_search:           (args) => amiiboSearch(args),
  amiibo_by_series:        (args) => amiiboBySeries(args),
  amiibo_types:            (args) => amiiboTypes(args),

  // dummyimage-tool.ts
  dummy_image_url:         (args) => dummyImageUrl(args),

  // ipinfo-tool.ts
  ipinfo_lookup:           (args) => ipInfoLookup(args),

  // ghibli-tool.ts
  ghibli_films:            (args) => ghibliFilms(args),
  ghibli_people:           (args) => ghibliPeople(args),

  // finalspace-tool.ts
  final_space_characters:  (args) => finalSpaceCharacters(args),
  final_space_episodes:    (args) => finalSpaceEpisodes(args),

  // mcsrvstat-tool.ts
  mc_server_status:        (args) => mcServerStatus(args),

  // disneyapi-tool.ts
  disney_character_search: (args) => disneyCharacterSearch(args),
  disney_all_characters:   (args) => disneyAllCharacters(args),

  // harrypotter-tool.ts
  hp_all_characters:       (args) => hpAllCharacters(args),
  hp_students:             (args) => hpStudents(args),
  hp_staff:                (args) => hpStaff(args),
  hp_by_house:             (args) => hpByHouse(args),

  // emojihub-tool.ts
  emojihub_random:         (args) => emojihubRandom(args),
  emojihub_by_category:    (args) => emojihubByCategory(args),

  // avatarapi-tool.ts
  avatar_url:              (args) => avatarUrl(args),

  // robohash-tool.ts
  robohash_url:            (args) => robohashUrl(args),

  // openlib2-tool.ts
  gutenberg_search:        (args) => gutenbergSearch(args),
  gutenberg_book:          (args) => gutenbergBook(args),

  // countryflag-tool.ts
  country_flag_url:        (args) => countryFlagUrl(args),

  // mediawiki-tool.ts
  wiktionary_lookup:       (args) => wiktionaryLookup(args),

  // bibleverse-tool.ts
  quran_verse:             (args) => quranVerse(args),
  quran_surah:             (args) => quranSurah(args),

  // urlhaus-tool.ts
  urlhaus_lookup_url:      (args) => urlhausLookupUrl(args),
  urlhaus_recent:          (args) => urlhausRecent(args),

  // tvmaze-tool.ts
  tvmaze_search:           (args) => tvmazeSearch(args),
  tvmaze_show:             (args) => tvmazeShow(args),
  tvmaze_schedule:         (args) => tvmazeSchedule(args),

  // freetogame-tool.ts
  freetogame_list:         (args) => freetogameList(args),
  freetogame_detail:       (args) => freetogameDetail(args),

  // cheapshark-tool.ts
  cheapshark_deals:        (args) => cheapsharkDeals(args),
  cheapshark_stores:       (args) => cheapsharkStores(args),

  // iseven-tool.ts
  is_even:                 (args) => isEven(args),

  // iceandfire-tool.ts
  iceandfire_characters:   (args) => iceandfireCharacters(args),
  iceandfire_books:        (args) => iceandfireBooks(args),
  iceandfire_houses:       (args) => iceandfireHouses(args),

  // randomuser-tool.ts
  random_user:             (args) => randomUser(args),

  // digimon-tool.ts
  digimon_all:             (args) => digimonAll(args),
  digimon_by_name:         (args) => digimonByName(args),
  digimon_by_level:        (args) => digimonByLevel(args),

  // stapi-tool.ts
  stapi_search_character:  (args) => stapiSearchCharacter(args),
  stapi_search_species:    (args) => stapiSearchSpecies(args),
  stapi_search_starship:   (args) => stapiSearchStarship(args),

  // breakingbad-tool.ts
  breaking_bad_quote:      (args) => breakingBadQuote(args),

  // tacofancy-tool.ts
  random_taco:             (args) => randomTaco(args),

  // publicapis-tool.ts
  publicapis_search:       (args) => publicapisSearch(args),
  publicapis_categories:   (args) => publicapisCategories(args),
  publicapis_random:       (args) => publicapisRandom(args),

  // wger-tool.ts
  wger_exercises:          (args) => wgerExercises(args),
  wger_categories:         (args) => wgerCategories(args),
  wger_muscles:            (args) => wgerMuscles(args),

  // animechan-tool.ts
  animechan_random:        (args) => animechanRandom(args),
  animechan_search:        (args) => animechanSearch(args),

  // lotr-tool.ts
  lotr_books:              (args) => lotrBooks(args),
  lotr_characters:         (args) => lotrCharacters(args),
  lotr_quotes:             (args) => lotrQuotes(args),

  // coinpaprika-tool.ts
  coinpaprika_global:      (args) => coinpaprikaGlobal(args),
  coinpaprika_coin:        (args) => coinpaprikaCoin(args),
  coinpaprika_ticker:      (args) => coinpaprikaTicker(args),

  // openfda-tool.ts
  openfda_drug_search:     (args) => openfdaDrugSearch(args),
  openfda_recall_search:   (args) => openfdaRecallSearch(args),
  openfda_adverse_events:  (args) => openfdaAdverseEvents(args),

  // funtranslations-tool.ts
  fun_translate:           (args) => funTranslate(args),

  // datamuse-tool.ts
  datamuse_words:            (args) => datamuseWords(args),
  datamuse_suggestions:      (args) => datamuseSuggestions(args),
  // balldontlie-tool.ts
  nba_players:               (args) => nbaPlayers(args),
  nba_teams:                 (args) => nbaTeams(args),
  nba_games:                 (args) => nbaGames(args),
  // worldbank-tool.ts
  worldbank_country:         (args) => worldbankCountry(args),
  worldbank_indicator:       (args) => worldbankIndicator(args),
  // carbonintensity-tool.ts
  carbon_intensity_current:  (args) => carbonIntensityCurrent(args),
  carbon_intensity_forecast: (args) => carbonIntensityForecast(args),
  carbon_intensity_generation: (args) => carbonIntensityGeneration(args),
  // lyrics-tool.ts
  lyrics_get:                (args) => lyricsGet(args),
  // urbandictionary-tool.ts
  urban_define:              (args) => urbanDefine(args),
  urban_random:              (args) => urbanRandom(args),

  // nasa-tool.ts
  nasa_apod:               (args) => nasaApod(args),
  nasa_asteroids:          (args) => nasaAsteroids(args),
  nasa_mars_photos:        (args) => nasaMarsPhotos(args),
  nasa_earth_imagery:      (args) => nasaEarthImagery(args),
  nasa_epic:               (args) => nasaEpic(args),

  // openmeteo-tool.ts
  weather_current:         (args) => weatherCurrent(args),
  weather_forecast:        (args) => weatherForecast(args),
  weather_hourly:          (args) => weatherHourly(args),

  // radiobrowser-tool.ts
  radio_search:            (args) => radioSearch(args),
  radio_by_country:        (args) => radioByCountry(args),
  radio_top_clicked:       (args) => radioTopClicked(args),
  radio_top_voted:         (args) => radioTopVoted(args),
  radio_by_tag:            (args) => radioByTag(args),
  radio_countries:         (args) => radioCountries(args),

  // gdelt-tool.ts
  gdelt_news_search:       (args) => gdeltNewsSearch(args),
  gdelt_tone_analysis:     (args) => gdeltToneAnalysis(args),
  gdelt_geo_events:        (args) => gdeltGeoEvents(args),
  gdelt_trending:          (args) => gdeltTrending(args),

  // numbers-tool.ts
  number_fact:             (args) => numberFact(args),
  number_random:           (args) => numberRandom(args),

  // omdb-tool.ts
  omdb_search:             (args) => omdbSearch(args),
  omdb_by_title:           (args) => omdbGetByTitle(args),
  omdb_by_id:              (args) => omdbGetById(args),

  // openlibrary-tool.ts
  openlibrary_search:      (args) => openlibrarySearch(args),
  openlibrary_get_book:    (args) => openlibraryGetBook(args),
  openlibrary_get_edition: (args) => openlibraryGetEdition(args),
  openlibrary_get_author:  (args) => openlibraryGetAuthor(args),
  openlibrary_author_works:(args) => openlibraryAuthorWorks(args),
  openlibrary_trending:    (args) => openlibraryTrending(args),

  // musicbrainz-tool.ts
  mb_search_artists:       (args) => mbSearchArtists(args),
  mb_search_releases:      (args) => mbSearchReleases(args),
  mb_search_recordings:    (args) => mbSearchRecordings(args),
  mb_get_artist:           (args) => mbGetArtist(args),
  mb_get_release:          (args) => mbGetRelease(args),

  // genius-tool.ts
  genius_search:           (args) => geniusSearch(args),
  genius_get_song:         (args) => geniusGetSong(args),
  genius_get_artist:       (args) => geniusGetArtist(args),
  genius_artist_songs:     (args) => geniusArtistSongs(args),

  // ticketmaster-tool.ts
  tm_search_events:        (args) => tmSearchEvents(args),
  tm_get_event:            (args) => tmGetEvent(args),
  tm_search_venues:        (args) => tmSearchVenues(args),
  tm_get_venue:            (args) => tmGetVenue(args),
  tm_search_attractions:   (args) => tmSearchAttractions(args),

  // seatgeek-tool.ts
  seatgeek_search_events:  (args) => seatgeekSearchEvents(args),
  seatgeek_get_event:      (args) => seatgeekGetEvent(args),
  seatgeek_search_performers:(args) => seatgeekSearchPerformers(args),
  seatgeek_get_performer:  (args) => seatgeekGetPerformer(args),
  seatgeek_search_venues:  (args) => seatgeekSearchVenues(args),
  seatgeek_get_venue:      (args) => seatgeekGetVenue(args),

  // eventbrite-tool.ts
  eventbrite_search_events:(args) => eventbriteSearchEvents(args),
  eventbrite_get_event:    (args) => eventbriteGetEvent(args),
  eventbrite_get_attendees:(args) => eventbriteGetEventAttendees(args),
  eventbrite_create_event: (args) => eventbriteCreateEvent(args),
  eventbrite_list_categories:(args) => eventbriteListCategories(args),
  eventbrite_get_venue:    (args) => eventbriteGetVenue(args),

  // foursquare-tool.ts
  foursquare_search_places:(args) => foursquareSearchPlaces(args),
  foursquare_get_place:    (args) => foursquareGetPlace(args),
  foursquare_get_photos:   (args) => foursquareGetPhotos(args),
  foursquare_get_tips:     (args) => foursquareGetTips(args),
  foursquare_autocomplete: (args) => foursquareAutocomplete(args),

  // lastfm-tool.ts
  lastfm_artist_info:      (args) => lastfmGetArtistInfo(args),
  lastfm_search_artists:   (args) => lastfmSearchArtists(args),
  lastfm_top_tracks:       (args) => lastfmGetTopTracks(args),
  lastfm_similar_artists:  (args) => lastfmGetSimilarArtists(args),
  lastfm_chart_top_artists:(args) => lastfmGetChartTopArtists(args),
  lastfm_chart_top_tracks: (args) => lastfmGetChartTopTracks(args),
  lastfm_album_info:       (args) => lastfmGetAlbumInfo(args),

  // discogs-tool.ts
  discogs_search_releases: (args) => discogsSearchReleases(args),
  discogs_get_release:     (args) => discogsGetRelease(args),
  discogs_get_artist:      (args) => discogsGetArtist(args),
  discogs_search_artists:  (args) => discogsSearchArtists(args),
  discogs_marketplace_stats:(args) => discogsGetMarketplaceStats(args),
  discogs_get_label:       (args) => discogsGetLabel(args),

  // setlistfm-tool.ts
  setlistfm_search_artist: (args) => setlistfmSearchArtist(args),
  setlistfm_artist_setlists:(args) => setlistfmArtistSetlists(args),
  setlistfm_search_setlists:(args) => setlistfmSearchSetlists(args),
  setlistfm_get_setlist:   (args) => setlistfmGetSetlist(args),

  // bandsintown-tool.ts
  bandsintown_artist:      (args) => bandsintownArtist(args),
  bandsintown_events:      (args) => bandsintownEvents(args),
  bandsintown_recommended: (args) => bandsintownRecommended(args),

  // podcastindex-tool.ts
  podcast_search:          (args) => podcastSearch(args),
  podcast_by_feed_url:     (args) => podcastGetByFeedUrl(args),
  podcast_get_episodes:    (args) => podcastGetEpisodes(args),
  podcast_search_episodes: (args) => podcastSearchEpisodes(args),
  podcast_trending:        (args) => podcastTrending(args),
  podcast_recent_episodes: (args) => podcastRecentEpisodes(args),

  // lichess-tool.ts
  lichess_user:            (args) => lichessUser(args),
  lichess_user_games:      (args) => lichessUserGames(args),
  lichess_puzzle_daily:    (args) => lichessPuzzleDaily(args),
  lichess_top_players:     (args) => lichessTopPlayers(args),
  lichess_tournament:      (args) => lichessTournament(args),

  // chessdotcom-tool.ts
  chess_player:            (args) => chessPlayer(args),
  chess_player_stats:      (args) => chessPlayerStats(args),
  chess_player_games:      (args) => chessPlayerGames(args),
  chess_puzzles_random:    (args) => chessPuzzlesRandom(args),
  chess_leaderboards:      (args) => chessLeaderboards(args),

  // fpl-tool.ts
  fpl_bootstrap:           (args) => fplBootstrap(args),
  fpl_player:              (args) => fplPlayer(args),
  fpl_gameweek:            (args) => fplGameweek(args),
  fpl_fixtures:            (args) => fplFixtures(args),
  fpl_my_team:             (args) => fplMyTeam(args),
  fpl_manager:             (args) => fplManager(args),
  fpl_leagues_classic:     (args) => fplLeaguesClassic(args),

  // guardian-tool.ts
  guardian_search_articles:(args) => guardianSearchArticles(args),
  guardian_get_article:    (args) => guardianGetArticle(args),
  guardian_get_sections:   (args) => guardianGetSections(args),
  guardian_get_tags:       (args) => guardianGetTags(args),
  guardian_get_edition:    (args) => guardianGetEdition(args),

  // newsapi-tool.ts
  news_top_headlines:      (args) => newsGetTopHeadlines(args),
  news_search:             (args) => newsSearchNews(args),
  news_get_sources:        (args) => newsGetSources(args),

  // alphavantage-tool.ts
  stock_quote:             (args) => stockQuote(args),
  stock_search:            (args) => stockSearch(args),
  stock_daily:             (args) => stockDaily(args),
  stock_intraday:          (args) => stockIntraday(args),
  forex_rate:              (args) => forexRate(args),
  crypto_daily:            (args) => cryptoDaily(args),

  // coingecko-tool.ts
  crypto_price:            (args) => cryptoPrice(args),
  crypto_coin:             (args) => cryptoCoin(args),
  crypto_search:           (args) => cryptoSearch(args),
  crypto_trending:         (args) => cryptoTrending(args),
  crypto_top_coins:        (args) => cryptoTopCoins(args),
  crypto_coin_history:     (args) => cryptoCoinHistory(args),

  // coinmarketcap-tool.ts
  cmc_listings:            (args) => cmcListings(args),
  cmc_quotes:              (args) => cmcQuotes(args),
  cmc_info:                (args) => cmcInfo(args),
  cmc_trending:            (args) => cmcTrending(args),
  cmc_global_metrics:      (args) => cmcGlobalMetrics(args),

  // openexchangerates-tool.ts
  forex_latest:            (args) => forexLatest(args),
  forex_historical:        (args) => forexHistorical(args),
  forex_currencies:        (args) => forexCurrencies(args),
  forex_convert:           (args) => forexConvert(args),

  // wise-tool.ts
  wise_exchange_rates:     (args) => wiseExchangeRates(args),
  wise_profile:            (args) => wiseProfile(args),
  wise_accounts:           (args) => wiseAccounts(args),
  wise_create_quote:       (args) => wiseCreateQuote(args),

  // ipapi-tool.ts
  ip_lookup:               (args) => ipLookup(args),
  ip_batch:                (args) => ipBatch(args),

  // restcountries-tool.ts
  country_all:             (args) => countryAll(args),
  country_by_name:         (args) => countryByName(args),
  country_by_code:         (args) => countryByCode(args),
  country_by_region:       (args) => countryByRegion(args),
  country_by_currency:     (args) => countryByCurrency(args),
  country_by_language:     (args) => countryByLanguage(args),

  // tomorrowio-tool.ts
  tomorrow_realtime:       (args) => tomorrowRealtime(args),
  tomorrow_forecast:       (args) => tomorrowForecast(args),
  tomorrow_history:        (args) => tomorrowHistory(args),

  // twitch-tool.ts
  twitch_search_streams:   (args) => twitchSearchStreams(args),
  twitch_get_stream:       (args) => twitchGetStream(args),
  twitch_search_games:     (args) => twitchSearchGames(args),
  twitch_top_games:        (args) => twitchGetTopGames(args),
  twitch_get_clips:        (args) => twitchGetClips(args),
  twitch_channel_info:     (args) => twitchGetChannelInfo(args),
  twitch_schedule:         (args) => twitchGetSchedule(args),

  // reddit-tool.ts
  reddit_read:             (args) => redditRead(args as unknown as Parameters<typeof redditRead>[0]),
  reddit_post:             (args) => redditPost(args as unknown as Parameters<typeof redditPost>[0]),
  reddit_comment:          (args) => redditComment(args as unknown as Parameters<typeof redditComment>[0]),
  reddit_search:           (args) => redditSearch(args as unknown as Parameters<typeof redditSearch>[0]),
  reddit_thread:           (args) => redditThread(args as unknown as Parameters<typeof redditThread>[0]),
  reddit_user:             (args) => redditUser(args as unknown as Parameters<typeof redditUser>[0]),
  reddit_vote:             (args) => redditVote(args as unknown as Parameters<typeof redditVote>[0]),
  reddit_subscribe:        (args) => redditSubscribe({ ...args, subreddit: String(args.subreddit ?? args.sr ?? "") } as unknown as Parameters<typeof redditSubscribe>[0]),

  // mastodon-tool.ts
  mastodon_action:         (args) => mastodonAction(String(args.action ?? ""), args),

  // bluesky-tool.ts
  bluesky_action:          (args) => blueskyAction(String(args.action ?? ""), args),

  // discord-tool.ts
  discord_send:            (args) => discordSend(args),
  discord_read:            (args) => discordRead(args),
  discord_thread:          (args) => discordThread(args),
  discord_react:           (args) => discordReact(args),
  discord_channels:        (args) => discordChannels(args),
  discord_members:         (args) => discordMembers(args),
  discord_search:          (args) => discordSearch(args),

  // slack-tool.ts
  slack_action:            (args) => slackAction(String(args.action ?? ""), args),

  // telegram-tool.ts
  telegram_send:           (args) => telegramSend(args),
  telegram_read:           (args) => telegramRead(args),
  telegram_search:         (args) => telegramSearch(args),
  telegram_send_media:     (args) => telegramSendMedia(args),
  telegram_get_updates:    (args) => telegramGetUpdates(args),
  telegram_manage_chat:    (args) => telegramManageChat(args),

  // line-tool.ts
  line_send_message:       (args) => lineSendMessage(args),
  line_send_flex_message:  (args) => lineSendFlexMessage(args),
  line_get_profile:        (args) => lineGetProfile(args),
  line_get_group_summary:  (args) => lineGetGroupSummary(args),
  line_reply_message:      (args) => lineReplyMessage(args),
  line_broadcast:          (args) => lineBroadcast(args),

  // figma-tool.ts
  figma_get_file:          (args) => figmaGetFile(args),
  figma_get_node:          (args) => figmaGetNode(args),
  figma_get_images:        (args) => figmaGetImages(args),
  figma_get_comments:      (args) => figmaGetComments(args),
  figma_post_comment:      (args) => figmaPostComment(args),
  figma_get_components:    (args) => figmaGetComponents(args),
  figma_get_team_projects: (args) => figmaGetTeamProjects(args),

  // amazon-tool.ts
  amazon_search:           (args) => amazonSearch(args),
  amazon_product:          (args) => amazonProduct(args),
  amazon_browse:           (args) => amazonBrowse(args),
  amazon_variations:       (args) => amazonVariations(args),

  // shopify-tool.ts
  shopify_products:        (args) => shopifyProducts(args),
  shopify_orders:          (args) => shopifyOrders(args),
  shopify_customers:       (args) => shopifyCustomers(args),
  shopify_inventory:       (args) => shopifyInventory(args),
  shopify_collections:     (args) => shopifyCollections(args),
  shopify_shop:            (args) => shopifyShop(args),
  shopify_fulfillments:    (args) => shopifyFulfillments(args),

  // yelp-tool.ts
  yelp_search_businesses:  (args) => yelpSearchBusinesses(args),
  yelp_get_business:       (args) => yelpGetBusiness(args),
  yelp_get_reviews:        (args) => yelpGetReviews(args),
  yelp_search_events:      (args) => yelpSearchEvents(args),
  yelp_autocomplete:       (args) => yelpGetAutocomplete(args),

  // xero-tool.ts
  xero_invoices:           (args) => xeroInvoices(args),
  xero_contacts:           (args) => xeroContacts(args),
  xero_accounts:           (args) => xeroAccounts(args),
  xero_payments:           (args) => xeroPayments(args),
  xero_bank_transactions:  (args) => xeroBankTransactions(args),
  xero_reports:            (args) => xeroReports(args),
  xero_quotes:             (args) => xeroQuotes(args),
  xero_organisation:       (args) => xeroOrganisation(args),

  // ebay-tool.ts
  ebay_search:               (args) => ebaySearch(args),
  ebay_get_item:             (args) => ebayGetItem(args),
  ebay_get_item_by_legacy_id: (args) => ebayGetItemByLegacyId(args),
  ebay_get_categories:       (args) => ebayGetCategories(args),

  // etsy-tool.ts
  etsy_search_listings:      (args) => etsySearchListings(args),
  etsy_get_listing:          (args) => etsyGetListing(args),
  etsy_get_shop:             (args) => etsyGetShop(args),
  etsy_get_shop_listings:    (args) => etsyGetShopListings(args),
  etsy_search_shops:         (args) => etsySearchShops(args),

  // stripe-tool.ts
  stripe_customers:          (args) => stripeCustomers(args),
  stripe_charges:            (args) => stripeCharges(args),
  stripe_subscriptions:      (args) => stripeSubscriptions(args),
  stripe_invoices:           (args) => stripeInvoices(args),
  stripe_products:           (args) => stripeProducts(args),
  stripe_prices:             (args) => stripePrices(args),

  // paypal-tool.ts
  paypal_orders:             (args) => paypalOrders(args),
  paypal_invoices:           (args) => paypalInvoices(args),

  // square-tool.ts
  square_payments:           (args) => squarePayments(args),
  square_customers:          (args) => squareCustomers(args),
  square_catalog_list:       (args) => squareCatalogList(args),
  square_catalog_search:     (args) => squareCatalogSearch(args),

  // quickbooks-tool.ts
  quickbooks_customers:      (args) => quickbooksCustomers(args),
  quickbooks_invoices:       (args) => quickbooksInvoices(args),
  quickbooks_items:          (args) => quickbooksItems(args),
  quickbooks_payments:       (args) => quickbooksPayments(args),

  // plaid-tool.ts
  plaid_accounts:            (args) => plaidAccounts(args),
  plaid_transactions:        (args) => plaidTransactions(args),
  plaid_balances:            (args) => plaidBalances(args),
  plaid_identity:            (args) => plaidIdentity(args),
  plaid_link_token_create:   (args) => plaidLinkTokenCreate(args),

  // woocommerce-tool.ts
  woo_products:              (args) => wooProducts(args),
  woo_orders:                (args) => wooOrders(args),
  woo_customers:             (args) => wooCustomers(args),

  // csuite-tool.ts
  csuite_analyze: (args) => Promise.resolve(csuitAnalyze(
    String(args.scenario ?? ""),
    {
      context:      args.context      ? String(args.context)      : undefined,
      perspectives: Array.isArray(args.perspectives) ? args.perspectives as string[] : undefined,
      depth:        args.depth        ? (args.depth as "quick" | "standard" | "deep") : undefined,
      focus:        args.focus        ? String(args.focus)        : undefined,
    }
  )),

  // qc-tool.ts
  qc_run_checklist:        (args) => qcRunChecklist(args),
  qc_check_api:            (args) => qcCheckApi(args),
  qc_copy_audit:           (args) => qcCopyAudit(args),

  // vault-tool.ts
  vault_action:            (args) => vaultAction(String(args.action ?? ""), args),

  // keychain-tool.ts
  keychain_connect:        (args) => keychainAction("keychain_connect",        args),
  keychain_status:         (args) => keychainAction("keychain_status",         args),
  keychain_disconnect:     (args) => keychainAction("keychain_disconnect",     args),
  keychain_list_platforms: (args) => keychainAction("keychain_list_platforms", args),
  keychain_secure_connect: (args) => keychainAction("keychain_secure_connect", args),

  // github-tool.ts
  github_action:           (args) => githubAction(String(args.action ?? ""), args),

  // gitlab-tool.ts
  gitlab_action:           (args) => gitlabAction(String(args.action ?? ""), args),

  // clickup-tool.ts
  clickup_action:          (args) => clickupAction(String(args.action ?? ""), args),

  // linear-tool.ts
  linear_action:           (args) => linearAction(String(args.action ?? ""), args),

  // airtable-tool.ts
  airtable_action:         (args) => airtableAction(String(args.action ?? ""), args),

  // trello-tool.ts
  trello_action:           (args) => trelloAction(String(args.action ?? ""), args),

  // sentry-tool.ts
  sentry_action:           (args) => sentryAction(String(args.action ?? ""), args),

  // postman-tool.ts
  postman_action:          (args) => postmanAction(String(args.action ?? ""), args),

  // twilio-tool.ts
  twilio_send_sms:         (args) => twilioSendSms(args),
  twilio_list_messages:    (args) => twilioListMessages(args),
  twilio_get_message:      (args) => twilioGetMessage(args),
  twilio_make_call:        (args) => twilioMakeCall(args),
  twilio_list_calls:       (args) => twilioListCalls(args),
  twilio_send_verify:      (args) => twilioSendVerify(args),
  twilio_check_verify:     (args) => twilioCheckVerify(args),

  // pushover-tool.ts
  pushover_send_notification: (args) => pushoverSendNotification(args),
  pushover_get_receipt:       (args) => pushoverGetReceipt(args),
  pushover_cancel_emergency:  (args) => pushoverCancelEmergency(args),
  pushover_list_sounds:       (args) => pushoverListSounds(args),
  pushover_validate_user:     (args) => pushoverValidateUser(args),

  // whatsapp-tool.ts
  whatsapp_send_text:      (args) => whatsappSendText(args),
  whatsapp_send_template:  (args) => whatsappSendTemplate(args),
  whatsapp_send_media:     (args) => whatsappSendMedia(args),
  whatsapp_get_media:      (args) => whatsappGetMedia(args),
  whatsapp_upload_media:   (args) => whatsappUploadMedia(args),

  // youtube-tool.ts
  youtube_search:              (args) => youtubeSearch(args),
  youtube_get_video:           (args) => youtubeGetVideo(args),
  youtube_get_channel:         (args) => youtubeGetChannel(args),
  youtube_list_playlists:      (args) => youtubeListPlaylists(args),
  youtube_list_playlist_items: (args) => youtubeListPlaylistItems(args),
  youtube_get_captions:        (args) => youtubeGetCaptions(args),

  // spotify-tool.ts
  spotify_search:              (args) => spotifySearch(args),
  spotify_get_track:           (args) => spotifyGetTrack(args),
  spotify_get_album:           (args) => spotifyGetAlbum(args),
  spotify_get_artist:          (args) => spotifyGetArtist(args),
  spotify_get_playlist:        (args) => spotifyGetPlaylist(args),
  spotify_get_recommendations: (args) => spotifyGetRecommendations(args),
  spotify_get_audio_features:  (args) => spotifyGetAudioFeatures(args),

  // higgsfield-tool.ts
  higgsfield_generate_video:   (args) => higgsfield_generate_video(args),
  higgsfield_generate_image:   (args) => higgsfield_generate_image(args),
  higgsfield_get_styles:       (args) => higgsfield_get_styles(args),
  higgsfield_get_status:       (args) => higgsfield_get_status(args),

  // heygen-tool.ts
  heygen_create_avatar_video:  (args) => heygen_create_avatar_video(args),
  heygen_list_avatars:         (args) => heygen_list_avatars(args),
  heygen_get_video_status:     (args) => heygen_get_video_status(args),
  heygen_list_voices:          (args) => heygen_list_voices(args),

  // runway-tool.ts
  runway_generate_video:       (args) => runway_generate_video(args),
  runway_get_task:             (args) => runway_get_task(args),
  runway_list_models:          (args) => runway_list_models(args),

  // pika-tool.ts
  pika_generate_video:         (args) => pika_generate_video(args),
  pika_get_generation:         (args) => pika_get_generation(args),
  pika_list_styles:            (args) => pika_list_styles(args),

  // kling-tool.ts
  kling_generate_video:        (args) => kling_generate_video(args),
  kling_get_task:              (args) => kling_get_task(args),

  // elevenlabs-tool.ts
  elevenlabs_list_voices:      (args) => elevenlabsListVoices(args),
  elevenlabs_get_voice:        (args) => elevenlabsGetVoice(args),
  elevenlabs_text_to_speech:   (args) => elevenlabsTextToSpeech(args),
  elevenlabs_get_models:       (args) => elevenlabsGetModels(args),
  elevenlabs_get_history:      (args) => elevenlabsGetHistory(args),

  // replicate-tool.ts
  replicate_list_models:       (args) => replicateListModels(args),
  replicate_get_model:         (args) => replicateGetModel(args),
  replicate_create_prediction: (args) => replicateCreatePrediction(args),
  replicate_get_prediction:    (args) => replicateGetPrediction(args),
  replicate_list_predictions:  (args) => replicateListPredictions(args),
  replicate_cancel_prediction: (args) => replicateCancelPrediction(args),

  // stability-tool.ts
  stability_text_to_image:     (args) => stabilityTextToImage(args),
  stability_image_to_image:    (args) => stabilityImageToImage(args),
  stability_upscale:           (args) => stabilityUpscale(args),
  stability_list_engines:      (args) => stabilityListEngines(args),

  // openai-tool.ts
  openai_chat_completion:      (args) => openaiChatCompletion(args),
  openai_create_embedding:     (args) => openaiCreateEmbedding(args),
  openai_generate_image:       (args) => openaiGenerateImage(args),
  openai_create_transcription: (args) => openaiCreateTranscription(args),
  openai_list_models:          (args) => openaiListModels(args),

  // anthropic-tool.ts
  anthropic_create_message:    (args) => anthropicCreateMessage(args),
  anthropic_list_models:       (args) => anthropicListModels(args),

  // asana-tool.ts
  list_asana_workspaces:   (args) => listAsanaWorkspaces(args),
  list_asana_projects:     (args) => listAsanaProjects(args),
  list_asana_tasks:        (args) => listAsanaTasks(args),
  create_asana_task:       (args) => createAsanaTask(args),
  update_asana_task:       (args) => updateAsanaTask(args),
  get_asana_task:          (args) => getAsanaTask(args),
  search_asana_tasks:      (args) => searchAsanaTasks(args),

  // monday-tool.ts
  list_monday_boards:      (args) => listMondayBoards(args),
  get_monday_board:        (args) => getMondayBoard(args),
  list_monday_items:       (args) => listMondayItems(args),
  create_monday_item:      (args) => createMondayItem(args),
  update_monday_item:      (args) => updateMondayItem(args),
  search_monday_items:     (args) => searchMondayItems(args),

  // calendly-tool.ts
  get_calendly_user:       (args) => getCalendlyUser(args),
  list_calendly_event_types:(args) => listCalendlyEventTypes(args),
  list_calendly_events:    (args) => listCalendlyEvents(args),
  get_calendly_event:      (args) => getCalendlyEvent(args),
  list_calendly_invitees:  (args) => listCalendlyInvitees(args),

  // pinterest-tool.ts
  list_pinterest_boards:   (args) => listPinterestBoards(args),
  get_pinterest_board:     (args) => getPinterestBoard(args),
  list_pinterest_pins:     (args) => listPinterestPins(args),
  create_pinterest_pin:    (args) => createPinterestPin(args),
  search_pinterest_pins:   (args) => searchPinterestPins(args),
  get_pinterest_user:      (args) => getPinterestUser(args),

  // tiktok-tool.ts
  get_tiktok_user:         (args) => getTiktokUser(args),
  list_tiktok_videos:      (args) => listTiktokVideos(args),
  get_tiktok_video:        (args) => getTiktokVideo(args),

  // steam-tool.ts
  get_steam_player_summaries:(args) => getSteamPlayerSummaries(args),
  get_steam_owned_games:   (args) => getSteamOwnedGames(args),
  get_steam_achievements:  (args) => getSteamAchievements(args),
  get_steam_app_details:   (args) => getSteamAppDetails(args),
  search_steam_store:      (args) => searchSteamStore(args),

  // igdb-tool.ts
  igdb_search_games:       (args) => igdbSearchGames(args),
  igdb_get_game:           (args) => igdbGetGame(args),
  igdb_list_platforms:     (args) => igdbListPlatforms(args),
  igdb_list_genres:        (args) => igdbListGenres(args),
  igdb_get_company:        (args) => igdbGetCompany(args),

  // speedrun-tool.ts
  speedrun_search_games:   (args) => speedrunSearchGames(args),
  speedrun_get_game:       (args) => speedrunGetGame(args),
  speedrun_get_leaderboard:(args) => speedrunGetLeaderboard(args),
  speedrun_list_runs:      (args) => speedrunListRuns(args),
  speedrun_get_user:       (args) => speedrunGetUser(args),

  // exchangerate-tool.ts
  exchangerate_latest:     (args) => exchangerateLatest(args),
  exchangerate_convert:    (args) => exchangerateConvert(args),
  exchangerate_historical: (args) => exchangerateHistorical(args),
  exchangerate_codes:      (args) => exchangerateCodes(args),

  // mailchimp-tool.ts
  mailchimp_list_audiences:  (args) => mailchimpListAudiences(args),
  mailchimp_list_campaigns:  (args) => mailchimpListCampaigns(args),
  mailchimp_get_campaign:    (args) => mailchimpGetCampaign(args),
  mailchimp_create_campaign: (args) => mailchimpCreateCampaign(args),
  mailchimp_list_members:    (args) => mailchimpListMembers(args),
  mailchimp_add_member:      (args) => mailchimpAddMember(args),
  mailchimp_search_members:  (args) => mailchimpSearchMembers(args),

  // sendgrid-tool.ts
  sendgrid_send_email:     (args) => sendgridSendEmail(args),
  sendgrid_list_templates: (args) => sendgridListTemplates(args),
  sendgrid_get_template:   (args) => sendgridGetTemplate(args),
  sendgrid_list_contacts:  (args) => sendgridListContacts(args),
  sendgrid_add_contact:    (args) => sendgridAddContact(args),
  sendgrid_get_stats:      (args) => sendgridGetStats(args),

  // mapbox-tool.ts
  mapbox_geocode_forward:  (args) => mapboxGeocodeForward(args),
  mapbox_geocode_reverse:  (args) => mapboxGeocodeReverse(args),
  mapbox_get_directions:   (args) => mapboxGetDirections(args),
  mapbox_get_static_map:   (args) => mapboxGetStaticMap(args),
  mapbox_list_tilesets:    (args) => mapboxListTilesets(args),

  // algolia-tool.ts
  algolia_search:          (args) => algoliaSearch(args),
  algolia_get_object:      (args) => algoliaGetObject(args),
  algolia_list_indices:    (args) => algoliaListIndices(args),
  algolia_browse_index:    (args) => algoliaBrowseIndex(args),

  // pinecone-tool.ts
  pinecone_list_indexes:   (args) => pineconeListIndexes(args),
  pinecone_describe_index: (args) => pineconeDescribeIndex(args),
  pinecone_query_vectors:  (args) => pineconeQueryVectors(args),
  pinecone_upsert_vectors: (args) => pineconeUpsertVectors(args),
  pinecone_delete_vectors: (args) => pineconeDeleteVectors(args),

  // mixpanel-tool.ts
  mixpanel_track_event:    (args) => mixpanelTrackEvent(args),
  mixpanel_get_events:     (args) => mixpanelGetEvents(args),
  mixpanel_get_funnels:    (args) => mixpanelGetFunnels(args),
  mixpanel_get_retention:  (args) => mixpanelGetRetention(args),
  mixpanel_export_data:    (args) => mixpanelExportData(args),

  // hubspot-tool.ts
  hubspot_list_contacts:   (args) => hubspotListContacts(args),
  hubspot_get_contact:     (args) => hubspotGetContact(args),
  hubspot_search_contacts: (args) => hubspotSearchContacts(args),
  hubspot_list_companies:  (args) => hubspotListCompanies(args),
  hubspot_list_deals:      (args) => hubspotListDeals(args),
  hubspot_create_contact:  (args) => hubspotCreateContact(args),

  // jira-tool.ts
  jira_search_issues:      (args) => jiraSearchIssues(args),
  jira_get_issue:          (args) => jiraGetIssue(args),
  jira_list_projects:      (args) => jiraListProjects(args),
  jira_create_issue:       (args) => jiraCreateIssue(args),
  jira_add_comment:        (args) => jiraAddComment(args),

  // jobsmith-tool.ts
  jobsmith_check:          (args) => jobsmithCheck(args),
  jobsmith_rules:          (args) => jobsmithRules(args),

  // contentful-tool.ts
  contentful_list_entries:       (args) => contentfulListEntries(args),
  contentful_get_entry:          (args) => contentfulGetEntry(args),
  contentful_list_content_types: (args) => contentfulListContentTypes(args),
  contentful_list_assets:        (args) => contentfulListAssets(args),

  // webflow-tool.ts
  webflow_list_sites:       (args) => webflowListSites(args),
  webflow_get_site:         (args) => webflowGetSite(args),
  webflow_list_collections: (args) => webflowListCollections(args),
  webflow_list_items:       (args) => webflowListItems(args),

  // digitalocean-tool.ts
  do_list_droplets:        (args) => doListDroplets(args),
  do_list_apps:            (args) => doListApps(args),
  do_list_databases:       (args) => doListDatabases(args),
  do_account:              (args) => doAccount(args),

  // klaviyo-tool.ts
  // todoist-tool.ts
  todoist_list_projects:   (args) => todoistListProjects(args),
  todoist_list_tasks:      (args) => todoistListTasks(args),
  todoist_create_task:     (args) => todoistCreateTask(args),
  todoist_complete_task:   (args) => todoistCompleteTask(args),

  // pipedrive-tool.ts
  pipedrive_list_deals:         (args) => pipedriveListDeals(args),
  pipedrive_list_persons:       (args) => pipedriveListPersons(args),
  pipedrive_list_organizations: (args) => pipedriveListOrganizations(args),
  pipedrive_search_deals:       (args) => pipedriveSearchDeals(args),

  // confluence-tool.ts
  confluence_search:       (args) => confluenceSearch(args),
  confluence_get_page:     (args) => confluenceGetPage(args),
  confluence_list_spaces:  (args) => confluenceListSpaces(args),

  // unsplash-tool.ts
  unsplash_search_photos:  (args) => unsplashSearchPhotos(args),
  unsplash_get_photo:      (args) => unsplashGetPhoto(args),
  unsplash_random_photo:   (args) => unsplashRandomPhoto(args),

  // giphy-tool.ts
  giphy_search:            (args) => giphySearch(args),
  giphy_trending:          (args) => giphyTrending(args),
  giphy_random:            (args) => giphyRandom(args),

  // miro-tool.ts
  miro_list_boards:        (args) => miroListBoards(args),
  miro_get_board:          (args) => miroGetBoard(args),
  miro_list_items:         (args) => miroListItems(args),

  // shortcut-tool.ts
  shortcut_search_stories: (args) => shortcutSearchStories(args),
  shortcut_get_story:      (args) => shortcutGetStory(args),
  shortcut_list_projects:  (args) => shortcutListProjects(args),
  shortcut_list_epics:     (args) => shortcutListEpics(args),

  // wikipedia-tool.ts
  wikipedia_search:        (args) => wikipediaSearch(args),
  wikipedia_summary:       (args) => wikipediaSummary(args),
  wikipedia_page:          (args) => wikipediaPage(args),

  // coda-tool.ts
  coda_list_docs:          (args) => codaListDocs(args),
  coda_list_tables:        (args) => codaListTables(args),
  coda_list_rows:          (args) => codaListRows(args),

  // brevo-tool.ts
  brevo_list_contacts:     (args) => brevoListContacts(args),
  brevo_list_campaigns:    (args) => brevoListCampaigns(args),
  brevo_get_account:       (args) => brevoGetAccount(args),

  // uptimerobot-tool.ts
  uptimerobot_get_monitors: (args) => uptimerobotGetMonitors(args),
  uptimerobot_get_account:  (args) => uptimerobotGetAccount(args),

  // dropbox-tool.ts
  dropbox_list_folder:     (args) => dropboxListFolder(args),
  dropbox_search:          (args) => dropboxSearch(args),
  dropbox_get_account:     (args) => dropboxGetAccount(args),

  // bitbucket-tool.ts
  bitbucket_list_repos:         (args) => bitbucketListRepos(args),
  bitbucket_get_repo:           (args) => bitbucketGetRepo(args),
  bitbucket_list_pull_requests: (args) => bitbucketListPullRequests(args),

  // cloudinary-tool.ts
  cloudinary_list_resources: (args) => cloudinaryListResources(args),
  cloudinary_get_usage:      (args) => cloudinaryGetUsage(args),

  // wordpress-tool.ts
  wordpress_list_posts:    (args) => wordpressListPosts(args),
  wordpress_get_post:      (args) => wordpressGetPost(args),
  wordpress_list_pages:    (args) => wordpressListPages(args),

  // ghost-tool.ts
  ghost_list_posts:        (args) => ghostListPosts(args),
  ghost_list_pages:        (args) => ghostListPages(args),
  ghost_list_tags:         (args) => ghostListTags(args),

  // klaviyo-tool.ts
  klaviyo_list_lists:      (args) => klaviyoListLists(args),
  klaviyo_list_segments:   (args) => klaviyoListSegments(args),
  klaviyo_list_metrics:    (args) => klaviyoListMetrics(args),
  klaviyo_list_profiles:   (args) => klaviyoListProfiles(args),

  // zendesk-tool.ts
  zendesk_search:          (args) => zendeskSearch(args),
  zendesk_list_tickets:    (args) => zendeskListTickets(args),
  zendesk_get_ticket:      (args) => zendeskGetTicket(args),
  zendesk_add_comment:     (args) => zendeskAddComment(args),

  // intercom-tool.ts
  intercom_list_conversations: (args) => intercomListConversations(args),
  intercom_get_conversation:   (args) => intercomGetConversation(args),
  intercom_list_contacts:      (args) => intercomListContacts(args),
  intercom_search_contacts:    (args) => intercomSearchContacts(args),

  // typeform-tool.ts
  typeform_list_forms:     (args) => typeformListForms(args),
  typeform_get_form:       (args) => typeformGetForm(args),
  typeform_get_responses:  (args) => typeformGetResponses(args),

  // calcom-tool.ts
  calcom_me:               (args) => calcomMe(args),
  calcom_list_event_types: (args) => calcomListEventTypes(args),
  calcom_list_bookings:    (args) => calcomListBookings(args),

  // posthog-tool.ts
  posthog_list_feature_flags: (args) => posthogListFeatureFlags(args),
  posthog_list_insights:      (args) => posthogListInsights(args),
  posthog_list_persons:       (args) => posthogListPersons(args),
  posthog_query:              (args) => posthogQuery(args),

  // netlify-tool.ts
  netlify_list_sites:      (args) => netlifyListSites(args),
  netlify_get_site:        (args) => netlifyGetSite(args),
  netlify_list_deploys:    (args) => netlifyListDeploys(args),
  netlify_get_deploy:      (args) => netlifyGetDeploy(args),

  // datadog-tool.ts
  datadog_list_monitors:   (args) => datadogListMonitors(args),
  datadog_get_monitor:     (args) => datadogGetMonitor(args),
  datadog_create_monitor:  (args) => datadogCreateMonitor(args),
  datadog_list_dashboards: (args) => datadogListDashboards(args),
  datadog_query_metrics:   (args) => datadogQueryMetrics(args),
  datadog_list_events:     (args) => datadogListEvents(args),

  // deepl-tool.ts
  deepl_translate_text:      (args) => deeplTranslateText(args),
  deepl_get_usage:           (args) => deeplGetUsage(args),
  deepl_list_languages:      (args) => deeplListLanguages(args),
  deepl_translate_document:  (args) => deeplTranslateDocument(args),

  // assemblyai-tool.ts
  assemblyai_transcribe:       (args) => assemblyaiTranscribe(args),
  assemblyai_get_transcript:   (args) => assemblyaiGetTranscript(args),
  assemblyai_list_transcripts: (args) => assemblyaiListTranscripts(args),
  assemblyai_get_sentences:    (args) => assemblyaiGetSentences(args),
  assemblyai_get_paragraphs:   (args) => assemblyaiGetParagraphs(args),
  assemblyai_summarize:        (args) => assemblyaiSummarize(args),

  // groq-tool.ts
  groq_chat_completion:    (args) => groqChatCompletion(args),
  groq_list_models:        (args) => groqListModels(args),

  // nudgeonly-tool.ts
  nudgeonly_policy:        (args) => nudgeonlyPolicy(args),
  nudgeonly_api:           (args) => nudgeonlyApi(args),
  nudgeonly_receipt_bridge:(args) => nudgeonlyReceiptBridge(args),

  // igniteonly-tool.ts
  igniteonly_policy:       (args) => igniteonlyPolicy(args),
  igniteonly_api:          (args) => igniteonlyApi(args),
  igniteonly_receipt_consumer:(args) => igniteonlyReceiptConsumer(args),

  // pushonly-tool.ts
  pushonly_policy:         (args) => pushonlyPolicy(args),
  pushonly_api:            (args) => pushonlyApi(args),
  pushonly_wake_pusher:    (args) => pushonlyWakePusher(args),

  // neon-tool.ts
  neon_list_projects:      (args) => neonListProjects(args),
  neon_get_project:        (args) => neonGetProject(args),
  neon_list_branches:      (args) => neonListBranches(args),
  neon_create_branch:      (args) => neonCreateBranch(args),
  neon_list_databases:     (args) => neonListDatabases(args),
  neon_execute_sql:        (args) => neonExecuteSql(args),

  // upstash-tool.ts
  upstash_redis_get:       (args) => upstashRedisGet(args),
  upstash_redis_set:       (args) => upstashRedisSet(args),
  upstash_redis_del:       (args) => upstashRedisDel(args),
  upstash_redis_list_keys: (args) => upstashRedisListKeys(args),
  upstash_redis_incr:      (args) => upstashRedisIncr(args),
  upstash_kafka_produce:   (args) => upstashKafkaProduce(args),
  upstash_kafka_list_topics:(args) => upstashKafkaListTopics(args),

  // turso-tool.ts
  turso_list_databases:    (args) => tursoListDatabases(args),
  turso_create_database:   (args) => tursoCreateDatabase(args),
  turso_list_groups:       (args) => tursoListGroups(args),
  turso_get_database:      (args) => tursoGetDatabase(args),
  turso_execute_sql:       (args) => tursoExecuteSql(args),

  // render-tool.ts
  render_list_services:    (args) => renderListServices(args),
  render_get_service:      (args) => renderGetService(args),
  render_list_deploys:     (args) => renderListDeploys(args),
  render_trigger_deploy:   (args) => renderTriggerDeploy(args),
  render_list_env_vars:    (args) => renderListEnvVars(args),
  render_set_env_var:      (args) => renderSetEnvVar(args),

  // flyio-tool.ts
  fly_list_apps:           (args) => flyListApps(args),
  fly_get_app:             (args) => flyGetApp(args),
  fly_list_machines:       (args) => flyListMachines(args),
  fly_create_machine:      (args) => flyCreateMachine(args),
  fly_list_volumes:        (args) => flyListVolumes(args),

  // mistral-tool.ts
  mistral_chat_completion: (args) => mistralChatCompletion(args),
  mistral_list_models:     (args) => mistralListModels(args),
  mistral_create_embedding:(args) => mistralCreateEmbedding(args),

  // cohere-tool.ts
  cohere_chat:             (args) => cohereChat(args),
  cohere_generate:         (args) => cohereGenerate(args),
  cohere_embed:            (args) => cohereEmbed(args),
  cohere_rerank:           (args) => cohereRerank(args),
  cohere_classify:         (args) => cohereClassify(args),
  cohere_list_models:      (args) => cohereListModels(args),

  // perplexity-tool.ts
  perplexity_chat_completion:(args) => perplexityChatCompletion(args),

  // lemonsqueezy-tool.ts
  ls_list_stores:          (args) => lsListStores(args),
  ls_list_products:        (args) => lsListProducts(args),
  ls_list_orders:          (args) => lsListOrders(args),
  ls_list_subscriptions:   (args) => lsListSubscriptions(args),
  ls_get_order:            (args) => lsGetOrder(args),
  ls_list_customers:       (args) => lsListCustomers(args),

  // convertkit-tool.ts
  ck_list_subscribers:     (args) => ckListSubscribers(args),
  ck_add_subscriber:       (args) => ckAddSubscriber(args),
  ck_list_forms:           (args) => ckListForms(args),
  ck_list_sequences:       (args) => ckListSequences(args),
  ck_list_tags:            (args) => ckListTags(args),
  ck_tag_subscriber:       (args) => ckTagSubscriber(args),

  // pagerduty-tool.ts
  pagerduty_list_incidents:       (args) => pagerduty_list_incidents(args),
  pagerduty_get_incident:         (args) => pagerduty_get_incident(args),
  pagerduty_create_incident:      (args) => pagerduty_create_incident(args),
  pagerduty_acknowledge_incident: (args) => pagerduty_acknowledge_incident(args),
  pagerduty_resolve_incident:     (args) => pagerduty_resolve_incident(args),
  pagerduty_list_services:        (args) => pagerduty_list_services(args),
  pagerduty_list_oncalls:         (args) => pagerduty_list_oncalls(args),

  // circleci-tool.ts
  circleci_list_pipelines:  (args) => circleci_list_pipelines(args),
  circleci_get_pipeline:    (args) => circleci_get_pipeline(args),
  circleci_list_workflows:  (args) => circleci_list_workflows(args),
  circleci_get_workflow:    (args) => circleci_get_workflow(args),
  circleci_list_jobs:       (args) => circleci_list_jobs(args),
  circleci_trigger_pipeline:(args) => circleci_trigger_pipeline(args),

  // segment-tool.ts
  segment_track_event:      (args) => segment_track_event(args),
  segment_identify_user:    (args) => segment_identify_user(args),
  segment_list_sources:     (args) => segment_list_sources(args),
  segment_list_destinations:(args) => segment_list_destinations(args),
  segment_get_source:       (args) => segment_get_source(args),

  // postmark-tool.ts
  postmark_send_email:       (args) => postmark_send_email(args),
  postmark_send_batch:       (args) => postmark_send_batch(args),
  postmark_get_delivery_stats:(args) => postmark_get_delivery_stats(args),
  postmark_list_templates:   (args) => postmark_list_templates(args),
  postmark_get_template:     (args) => postmark_get_template(args),
  postmark_search_messages:  (args) => postmark_search_messages(args),

  // gumroad-tool.ts
  gumroad_list_products:    (args) => gumroad_list_products(args),
  gumroad_get_product:      (args) => gumroad_get_product(args),
  gumroad_list_sales:       (args) => gumroad_list_sales(args),
  gumroad_get_sale:         (args) => gumroad_get_sale(args),
  gumroad_list_subscribers: (args) => gumroad_list_subscribers(args),

  // togetherai-tool.ts
  togetherai_chat_completion: (args) => togetherai_chat_completion(args),
  togetherai_completion:      (args) => togetherai_completion(args),
  togetherai_create_embedding:(args) => togetherai_create_embedding(args),
  togetherai_list_models:     (args) => togetherai_list_models(args),

  // testpass-tool.ts
  testpass_list_packs:  () => testpassListPacks(),
  testpass_run:         (args) => testpassRun(args),
  testpass_status:      (args) => testpassStatus(args),
  testpass_save_pack:   (args) => testpassSavePack(args),
  testpass_edit_item:   (args) => testpassEditItem(args),
  testpass_evidence:    (args) => testpassEvidence(args),
  testpass_report_html: (args) => testpassReportHtml(args),
  testpass_report_json: (args) => testpassReportJson(args),
  testpass_report_md:   (args) => testpassReportMd(args),
  testpass_fix_list:    (args) => testpassFixList(args),

  // commonsensepass-tool.ts
  commonsensepass_check: (args) => commonsensepassCheckTool(args),
  commonsensepass_rules: (args) => commonsensepassRulesTool(args),

  // xpass-aggregated-verdict-tool.ts
  xpass_aggregated_verdict: (args) => xpassAggregatedVerdict(args),

  // legalpass-tool.ts
  legalpass_run:       (args) => legalpassRun(args),
  legalpass_status:    (args) => legalpassStatus(args),
  legalpass_save_pack: (args) => legalpassSavePack(args),
  legalpass_edit_item: (args) => legalpassEditItem(args),
  legalpass_verdict:   (args) => legalpassVerdict(args),

  // uxpass-tool.ts
  uxpass_run:           (args) => uxpassRun(args),
  uxpass_status:        (args) => uxpassStatus(args),
  uxpass_report_html:   (args) => uxpassReportHtml(args),
  uxpass_report_json:   (args) => uxpassReportJson(args),
  uxpass_report_md:     (args) => uxpassReportMd(args),
  uxpass_register_pack: (args) => uxpassRegisterPack(args),

  // seopass-tool.ts
  seopass_run:             (args) => seopassRun(args),
  seopass_status:          (args) => seopassStatus(args),
  seopass_register_pack:   (args) => seopassRegisterPack(args),
  seopass_lighthouse_plan: (args) => seopassLighthousePlan(args),

  // geopass-tool.ts
  geopass_run:             (args) => geopassRun(args),
  geopass_status:          (args) => geopassStatus(args),

  // compliancepass-tool.ts
  compliancepass_run:         (args) => compliancepassRun(args),
  compliancepass_status:      (args) => compliancepassStatus(args),
  compliancepass_report_json: (args) => compliancepassReportJson(args),
  compliancepass_report_md:   (args) => compliancepassReportMd(args),

  // flowpass-tool.ts
  flowpass_run:                (args) => flowpassRun(args),
  flowpass_status:             (args) => flowpassStatus(args),
  flowpass_report:             (args) => flowpassReport(args),
  flowpass_register_pack:      (args) => flowpassRegisterPack(args),
  flowpass_record:             (args) => flowpassRecord(args),
  flowpass_quarantine:         (args) => flowpassQuarantine(args),
  flowpass_disagreement_queue: (args) => flowpassDisagreementQueue(args),

  // securitypass-tool.ts
  securitypass_run:               (args) => securitypassRun(args),
  securitypass_status:            (args) => securitypassStatus(args),
  securitypass_report:            (args) => securitypassReport(args),
  securitypass_register_pack:     (args) => securitypassRegisterPack(args),
  securitypass_verify_scope:      (args) => securitypassVerifyScope(args),
  securitypass_disclosure_status: (args) => securitypassDisclosureStatus(args),
  securitypass_finding_detail:    (args) => securitypassFindingDetail(args),

  // copypass-tool.ts
  copypass_run:            (args) => copypassRun(args),
  copypass_status:         (args) => copypassStatus(args),

  // sloppass-tool.ts
  sloppass_run:            (args) => sloppassRun(args),

  // fidelitycopy-tool.ts
  fidelitycopy_copy:       (args) => fidelitycopyCopy(args),
  fidelitypass_verify_copy:(args) => fidelitypassVerifyCopy(args),

  // crews-tool.ts
  start_crew_run: (args) => crewsStartRun(args),
  get_run:        (args) => crewsGetRun(args),
  list_runs:      (args) => crewsListRuns(args),
};
