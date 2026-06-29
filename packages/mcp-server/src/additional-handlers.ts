// additional-handlers.ts
// Connector imports and the ADDITIONAL_HANDLERS dispatch map, split out of
// tool-wiring.ts (Stage 2) so the registry file is not dominated by them.
// tool-wiring.ts re-exports ADDITIONAL_HANDLERS; the build-time generators
// parse this file for the connector imports and handler entries.

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
  listSupabaseProjects, getSupabaseProject, listSupabaseOrganizations,
  executeSupabaseSql, applySupabaseMigration,
} from "./supabase-tool.js";

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
import { nobelPrizes, nobelLaureates } from "./nobelprize-tool.js";
import { universitiesSearch } from "./universities-tool.js";
import { fakestoreProducts, fakestoreProduct, fakestoreCategories } from "./fakestoreapi-tool.js";
import { mtgSearchCards, mtgGetCard, mtgSets } from "./mtg-tool.js";
import { domainsdbSearch, domainsdbTlds } from "./domainsdb-tool.js";
import { pokemonTcgSearchCards, pokemonTcgSets } from "./pokemontcg-tool.js";
import { spacexLatestLaunch, spacexLaunches, spacexRockets } from "./spacex-tool.js";
import { genderizePredict } from "./genderize-tool.js";
import { nationalizePredict } from "./nationalize-tool.js";
import { qrserverGenerate } from "./qrserver-tool.js";
import { solarsystemBodies, solarsystemBody } from "./solarsystem-tool.js";
import { pubchemSearch, pubchemProperties } from "./pubchem-tool.js";
import { marineForecast } from "./openmeteo-marine-tool.js";
import { triviaDbQuestions, triviaDbCategories } from "./opentriviadb-tool.js";
import { ipAddressLookup } from "./ipaddrinfo-tool.js";
import { dicewarePassphrase } from "./diceware-tool.js";
import { colorNameLookup, colorNameRandom } from "./colornames-tool.js";
import { mhwMonsters, mhwWeapons } from "./mhwdb-tool.js";
import { currencyApiRates, currencyApiList } from "./exchangerate3-tool.js";
import { jishoSearch } from "./jisho-tool.js";
import { colrRandomPalette } from "./colr-tool.js";
import { gameOfLifeStep } from "./gameoflife-tool.js";
import { fruityviceAll, fruityviceByName } from "./fruityvice-tool.js";
import { opendotaHeroes, opendotaHeroStats, opendotaProMatches } from "./opendota-tool.js";
import { imgflipGetMemes } from "./imgflip-tool.js";
import { articSearchArtworks, articGetArtwork } from "./artic-tool.js";
import { citybikesNetworks, citybikesNetwork } from "./citybikes-tool.js";
import { issPosition, issPassTimes } from "./wheretheiss-tool.js";
import { coinloreGlobal, coinloreTickers, coinloreCoin } from "./coinlore-tool.js";
import { airQualityCurrent, airQualityForecast } from "./openmeteo-airquality-tool.js";
import { officialJokeRandom, officialJokeByType, officialJokeTen } from "./officialjoke-tool.js";
import { multiavatarGenerate } from "./multiavatar-tool.js";
import { foodishRandom, foodishByCategory } from "./foodish-tool.js";
import { acnhVillagers, acnhFish, acnhBugs } from "./acnhapi-tool.js";
import { httpCatImage } from "./httpcat-tool.js";
import { poetrySearchByAuthor, poetrySearchByTitle, poetryRandom } from "./poetrydb-tool.js";
import { floodForecast } from "./openmeteo-flood-tool.js";
import { covidGlobal, covidCountry, covidVaccine } from "./diseasesh-tool.js";
import { fishwatchSpecies, fishwatchSpeciesDetail } from "./fishwatch-tool.js";
import { newtonMath } from "./newton-tool.js";
import { placebearImage } from "./placebear-tool.js";
import { countryByIp } from "./countryis-tool.js";
import { historicalWeather } from "./openmeteo-historical-tool.js";
import { ukPoliceForces, ukPoliceCrimes } from "./ukpolice-tool.js";
import { memegenTemplates, memegenCreate } from "./memegen-tool.js";
import { timeApiCurrentByZone, timeApiTimezones } from "./timeapi-tool.js";
import { postcodeLookup, postcodeRandom } from "./postcodes-tool.js";
import { climateNormals } from "./openmeteo-climate-tool.js";
import { gbifSearchSpecies, gbifSpeciesDetail, gbifOccurrences } from "./gbif-tool.js";
import { crossrefSearchWorks, crossrefGetWork } from "./crossref-tool.js";
import { nominatimSearch, nominatimReverse } from "./nominatim-tool.js";
import { coincapAssets, coincapAssetDetail, coincapRates } from "./coincap-tool.js";
import { openElevationLookup } from "./open-elevation-tool.js";
import { itisSearchByName, itisGetFullRecord } from "./itis-tool.js";
import { arxivSearch } from "./arxiv-tool.js";
import { openalexSearchWorks, openalexGetWork, openalexSearchAuthors } from "./openalex-tool.js";
import { dblpSearchPublications, dblpSearchAuthors } from "./dblp-tool.js";
import { wikidataSearch, wikidataGetEntity } from "./wikidata-tool.js";
import { randomDuckImage, randomDuckList } from "./randomduck-tool.js";
import { httpDogImage } from "./httpdog-tool.js";
import { openskyStates, openskyFlights } from "./opensky-tool.js";
import { circlCveLookup, circlCveRecent } from "./cvecircl-tool.js";
import { vatcomplyRates, vatcomplyCountries } from "./vatcomply-tool.js";
import { theColorApiId, theColorApiScheme } from "./thecolorapi-tool.js";
import { placeholdImage } from "./placehold-tool.js";
import { languagetoolCheck, languagetoolLanguages } from "./languagetool-tool.js";
import { bgpviewAsn, bgpviewAsnPrefixes, bgpviewIp } from "./bgpview-tool.js";
import { mymemoryTranslate } from "./mymemory-tool.js";
import { openchargemapSearch } from "./openchargemap-tool.js";
import { cratesSearch, cratesGet } from "./crates-tool.js";
import { npmSearch, npmGetPackage } from "./npm-registry-tool.js";
import { pypiGetPackage, pypiGetVersion } from "./pypi-tool.js";
import { rdapDomain, rdapIp } from "./rdap-tool.js";
import { ibanValidate } from "./iban-tool.js";
import { stackexchangeSearch, stackexchangeQuestion } from "./stackexchange-tool.js";
import { ripeNetworkInfo, ripeAsnNeighbours } from "./ripe-tool.js";
import { gutendexSearch, gutendexBook } from "./gutendex-tool.js";
import { dohdnsResolve } from "./dohdns-tool.js";
import { nhtsaDecodeVin, nhtsaRecalls } from "./nhtsa-tool.js";
import { geojsLookup } from "./geojs-tool.js";
import { isupCheck } from "./isup-tool.js";
import { waybackCheck } from "./wayback-tool.js";
import { oeisSearch } from "./oeis-tool.js";
import { upcLookup, upcSearch } from "./upcitemdb-tool.js";
import { fakerPersons, fakerCompanies, fakerTexts } from "./fakerapi-tool.js";
import { openfigiMapping, openfigiSearch } from "./openfigi-tool.js";
import { libretranslateTranslate, libretranslateLanguages, libretranslateDetect } from "./libretranslate-tool.js";
import { europeanaSearch, europeanaRecord } from "./europeana-tool.js";
import { issFlyover } from "./flyover-tool.js";
import { jsoncrackFormat } from "./jsoncrack-tool.js";
import { abstractCountryInfo, abstractLongWeekends } from "./abstract-holidays-tool.js";
import { cocktailByIngredient, cocktailIngredientInfo } from "./cocktaildb2-tool.js";
import { regexTest } from "./regexr-tool.js";
import { hashGenerate, hashCompare } from "./hashgen-tool.js";
import { base64Encode, base64Decode } from "./base64-tool.js";
import { urlEncode, urlDecode } from "./urlencode-tool.js";
import { crontabExplain } from "./crontab-tool.js";
import { jwtDecode } from "./jwt-tool.js";
import { markdownToHtml, markdownStats } from "./markdown-tool.js";
import { cidrCalculate } from "./cidr-tool.js";
import { semverParse, semverCompare } from "./semver-tool.js";
import { colorHexConvert } from "./colorconvert-tool.js";
import { epochConvert, epochNow } from "./epoch-tool.js";
import { diffText } from "./difftext-tool.js";
import { passwordGenerate } from "./passwordgen-tool.js";
import { slugify } from "./slug-tool.js";
import { loremGenerate } from "./lorem2-tool.js";
import { csvParse } from "./csvparse-tool.js";
import { wordCount } from "./wordcount-tool.js";
import { jsonFormat } from "./jsonformat-tool.js";
import { htmlStrip } from "./htmlstrip-tool.js";
import { uuidGenerate } from "./uuidgen-tool.js";
import { charFrequency } from "./charcount-tool.js";
import { ipValidate } from "./ipvalidate-tool.js";
import { stringCase } from "./stringcase-tool.js";
import { aspectRatio } from "./aspectratio-tool.js";
import { percentageCalc } from "./percentage-tool.js";
import { romanConvert } from "./roman-tool.js";
import { morseConvert } from "./morse-tool.js";
import { numberBaseConvert } from "./binaryconv-tool.js";
import { stringDistance } from "./levenshtein-tool.js";
import { loremNameGenerate } from "./loremname-tool.js";
import { textReadability } from "./textstats-tool.js";
import { timezoneInfo } from "./timezone-tool.js";
import { colorBlend } from "./colorblend-tool.js";
import { fibonacciSequence } from "./fibonacci-tool.js";
import { primeCheck } from "./primecheck-tool.js";
import { sortLines } from "./sortlines-tool.js";
import { countdownCalc } from "./countdowncalc-tool.js";
import { pressureConvert } from "./unitpressure-tool.js";
import { emojiLookup } from "./emojilookup-tool.js";
import { natoConvert } from "./natoalphabet-tool.js";
import { bitwiseCalc } from "./bitwise-tool.js";
import { gcdLcmCalc } from "./gcdlcm-tool.js";
import { temperatureConvert } from "./tempconvert-tool.js";
import { statisticsCalc } from "./statistics-tool.js";
import { textWrap } from "./textwrap-tool.js";
import { brailleConvert } from "./braille-tool.js";
import { pigLatinConvert } from "./piglatin-tool.js";
import { rot13Convert } from "./rot13-tool.js";
import { reverseText } from "./reversetext-tool.js";
import { palindromeCheck } from "./palindrome-tool.js";
import { acronymGenerate } from "./acronymgen-tool.js";
import { wordfreqAnalyse } from "./wordfreq-tool.js";
import { markdowntableConvert } from "./markdowntable-tool.js";
import { runlengthProcess } from "./runlength-tool.js";
import { luhnValidate } from "./luhn-tool.js";
import { charcodesConvert } from "./charcodes-tool.js";
import { soundexEncode } from "./soundex-tool.js";
import { frequencyAnalyse } from "./frequency-tool.js";
import { entropyCalculate } from "./entropy-tool.js";
import { ngramExtract } from "./ngram-tool.js";
import { camelsnakeConvert } from "./camelsnake-tool.js";
import { metaphoneEncode } from "./metaphone-tool.js";
import { tfidfCalculate } from "./tfidf-tool.js";
import { readabilityScore } from "./readability-tool.js";
import { tokencountEstimate } from "./tokencount-tool.js";
import { crc32Calculate } from "./crc32-tool.js";
import { jaccardSimilarity } from "./jaccard-tool.js";
import { hammingDistance } from "./hamming-tool.js";
import { cosinesimCompare } from "./cosinesim-tool.js";
import { damerauDistance } from "./damerau-tool.js";
import { markovGenerate } from "./markov-tool.js";
import { vigenereProcess } from "./vigenere-tool.js";
import { atbashProcess } from "./atbash-tool.js";
import { railfenceProcess } from "./railfence-tool.js";
import { phoneticSpell } from "./phonetic-tool.js";
import { matrixOperate } from "./matrix-tool.js";
import { setopsCalculate } from "./setops-tool.js";
import { collatzSequence } from "./collatz-tool.js";
import { pascaltriGenerate } from "./pascaltri-tool.js";
import { histogramCreate } from "./histogram-tool.js";
import { regressionFit } from "./regression-tool.js";
import { baseConvert } from "./baseconvert-tool.js";
import { gcdCalculate } from "./gcd-tool.js";
import { permutationCalc } from "./permutation-tool.js";
import { combinationCalc } from "./combination-tool.js";
import { proportionSolve } from "./proportion-tool.js";
import { quadraticSolve } from "./quadratic-tool.js";
import { primeFactor } from "./primefactor-tool.js";
import { zscoreCalculate } from "./zscore-tool.js";
import { angleConvert } from "./angleconv-tool.js";
import { polygonCalculate } from "./polygon-tool.js";
import { sigmoidCalculate } from "./sigmoid-tool.js";
import { interpolateCalc } from "./interpolate-tool.js";
import { modularArithmetic } from "./modpow-tool.js";
import { ratioSimplify } from "./ratiosimplify-tool.js";
import { binomialProbability } from "./binomprob-tool.js";
import { normalDistribution } from "./normaldistr-tool.js";
import { triangleSolve } from "./trianglesolve-tool.js";
import { standardForm } from "./standardform-tool.js";
import { complexCalc } from "./complexnum-tool.js";
import { wavelengthConvert } from "./wavelength-tool.js";
import { midpointCalc } from "./midpoint-tool.js";
import { slopeIntercept } from "./slopeintercept-tool.js";
import { logBase } from "./logbase-tool.js";
import { nthRoot } from "./nthroot-tool.js";
import { areaCalculate } from "./areacalc-tool.js";
import { dotProduct } from "./dotproduct-tool.js";
import { crossProduct } from "./crossproduct-tool.js";
import { weightedMean } from "./weightedmean-tool.js";
import { varianceCalc } from "./variancecalc-tool.js";
import { poissonProbability } from "./poisson-tool.js";
import { exponentialGrowth } from "./expgrowth-tool.js";
import { geometricSeries } from "./geomseries-tool.js";
import { harmonicSeries } from "./harmonicseries-tool.js";
import { piApprox } from "./piapprox-tool.js";
import { taylorExpand } from "./taylor-tool.js";

// ── batch 58: algorithms & data structures ──
import { stringLcs } from "./lcs-tool.js";
import { topoSort } from "./toposort-tool.js";
import { convexHull } from "./convexhull-tool.js";
import { knapsackSolve } from "./knapsack-tool.js";
import { splineInterpolate } from "./spline-tool.js";

// ── batch 59: graphs, linear algebra, calculus ──
import { dijkstraPath } from "./dijkstra-tool.js";
import { matrixDecomp } from "./matrixdecomp-tool.js";
import { linearSolve } from "./linearsolve-tool.js";
import { numericalDiff } from "./numdiff-tool.js";
import { numericalIntegrate } from "./numintegrate-tool.js";

// ── batch 60: signal processing, curves, root finding, matrix inverse ──
import { fftTransform } from "./fft-tool.js";
import { bezierCurve } from "./bezier-tool.js";
import { rootFind } from "./rootfind-tool.js";
import { matrixInverse } from "./matinverse-tool.js";
import { odeSolve } from "./ode-tool.js";
import { polynomialOps } from "./polynomial-tool.js";
import { hypothesisTest } from "./hypothesis-tool.js";
import { huffmanCode } from "./huffman-tool.js";
import { correlationCalc } from "./correlation-tool.js";
import { bitCount } from "./bitcount-tool.js";
import { runningStats } from "./runstats-tool.js";
import { graphAnalyze } from "./graph-tool.js";
import { convolution } from "./convolution-tool.js";
import { rleEncodeDecode } from "./rle2-tool.js";
import { descriptiveStats } from "./descriptive-tool.js";
import { bfsSearch } from "./bfs-tool.js";
import { monteCarloEstimate } from "./montecarlo-tool.js";
import { dfsSearch } from "./dfs-tool.js";
import { percentileCalc } from "./percentile-tool.js";
import { mstFind } from "./mst-tool.js";

import { pageRank } from "./pagerank-tool.js";
import { astarPath } from "./astar-tool.js";
import { simplexSolve } from "./simplex-tool.js";
import { hungarianAssign } from "./hungarian-tool.js";

import { kmeansCluster } from "./kmeans-tool.js";
import { bellmanFord } from "./bellmanford-tool.js";
import { floydWarshall } from "./floydwarshall-tool.js";
import { reservoirSample } from "./reservoir-tool.js";

import { bloomFilter } from "./bloomfilter-tool.js";
import { powerIteration } from "./poweriter-tool.js";
import { tspSolve } from "./tsp-tool.js";
import { lruSimulate } from "./lrucache-tool.js";

import { unionFindOps } from "./unionfind-tool.js";
import { tarjanScc } from "./tarjan-tool.js";
import { catalanCalc } from "./catalan-tool.js";
import { rabinKarpSearch } from "./rabinkarp-tool.js";

import { sieveOfEratosthenes } from "./sieve-tool.js";
import { suffixArrayBuild } from "./suffixarray-tool.js";
import { matChainOrder } from "./matchain-tool.js";
import { fenwickTree } from "./fenwick-tool.js";

import { segTree } from "./segtree-tool.js";
import { kmpSearch } from "./kmp-tool.js";
import { ahoCorasickSearch } from "./ahocorasick-tool.js";
import { zAlgorithm } from "./zalgo-tool.js";

import { trieOps } from "./trie-tool.js";
import { skipListSim } from "./skiplist-tool.js";
import { manacherPalindrome } from "./manacher-tool.js";
import { countingSort } from "./countingsort-tool.js";

import { radixSort } from "./radixsort-tool.js";
import { treapSim } from "./treap-tool.js";
import { longestIncreasingSubseq } from "./lis-tool.js";
import { kosarajuScc } from "./kosaraju-tool.js";
import { bucketSort } from "./bucketsort-tool.js";
import { edmondsKarp } from "./edmondskarp-tool.js";
import { avlTree } from "./avltree-tool.js";
import { bipartiteCheck } from "./bipartite-tool.js";
import { eulerPath } from "./eulerpath-tool.js";
import { sparseTable } from "./sparsetable-tool.js";
import { millerRabinTest } from "./millerrabin-tool.js";
import { rbTreeSim } from "./rbtree-tool.js";
import { heapSort } from "./heapsort-tool.js";
import { chineseRemainderTheorem } from "./crt-tool.js";
import { graphColoring } from "./graphcolor-tool.js";
import { extendedGcd } from "./extgcd-tool.js";
import { eulerTotient } from "./eulertotient-tool.js";
import { hopcroftKarp } from "./hopcroftcarp-tool.js";
import { intervalMerge } from "./intervalmerge-tool.js";
import { ternarySearch } from "./ternarysearch-tool.js";
import { shellSort } from "./shellsort-tool.js";
import { matrixExponentiation } from "./matexp-tool.js";
import { segmentIntersection } from "./segmentintersect-tool.js";
import { minVertexCover } from "./minvertexcover-tool.js";
import { suffixAutomaton } from "./suffixauto-tool.js";
import { gabowScc } from "./gabow-tool.js";
import { babyGiantStep } from "./babygiant-tool.js";
import { centroidDecomposition } from "./centroid-tool.js";
import { waveletTree } from "./wavelet-tool.js";
import { dinicMaxFlow } from "./dinic-tool.js";
import { lowestCommonAncestor } from "./lca-tool.js";
import { maxIndependentSet } from "./maxindepset-tool.js";
import { twoSat } from "./twosat-tool.js";
import { heavyLightDecomp } from "./hld-tool.js";
import { minCostMaxFlow } from "./mincostflow-tool.js";
import { persistentArray } from "./persistarray-tool.js";
import { suffixTree } from "./suffixtree-tool.js";
import { linkCutTree } from "./linkcut-tool.js";
import { graphCondensation } from "./condensation-tool.js";
import { mosAlgorithm } from "./mosalgo-tool.js";
import { cartesianTree } from "./cartesiantree-tool.js";
import { sternBrocotTree } from "./sternbrocot-tool.js";
import { chromaticNumber } from "./chromatic-tool.js";
import { eulerTour } from "./eulertour-tool.js";
import { gaussianElimination } from "./gausselim-tool.js";
import { eertree } from "./eertree-tool.js";
import { pollardRho } from "./pollardrho-tool.js";
import { ntt } from "./ntt-tool.js";
import { josephus } from "./josephus-tool.js";
import { berlekampMassey } from "./berlekamp-tool.js";
import { sosDp } from "./sos-tool.js";
import { xorBasis } from "./xorbase-tool.js";
import { moebiusFunction } from "./moebius-tool.js";
import { zFunction } from "./zfunction-tool.js";
import { chineseRemainder } from "./chineseremainder-tool.js";
import { lucasTheorem } from "./lucas-tool.js";
import { duvalFactorize } from "./duval-tool.js";
import { goertzel } from "./goertzel-tool.js";
import { burrowsWheeler } from "./bwt-tool.js";
import { ackermannFunction } from "./ackermann-tool.js";
import { deBruijn } from "./debruijn-tool.js";
import { shuntingYard } from "./shunting-tool.js";
import { fenwickRange } from "./fenwickrange-tool.js";
import { bitmaskOps } from "./bitmask-tool.js";
import { grayCode } from "./graycode-tool.js";
import { catmullRom } from "./catmullrom-tool.js";
import { rlEncode } from "./rlencode-tool.js";
import { topoCount } from "./topocount-tool.js";
import { boothRotation } from "./booth-tool.js";
import { prefixFunction } from "./prefixfn-tool.js";
import { matrixRank } from "./matrank-tool.js";
import { fenwick2D } from "./fenwick2d-tool.js";
import { continuedFraction } from "./contfrac-tool.js";
import { longestCommonPrefix } from "./lcprefix-tool.js";
import { lehmerCode } from "./lehmer-tool.js";
import { digitDp } from "./digitdp-tool.js";
import { coinChange } from "./coinchange-tool.js";
import { editDistance } from "./editdist-tool.js";
import { powerSet } from "./powerset-tool.js";
import { necklaceCount } from "./necklace-tool.js";
import { derangementCalc } from "./derangement-tool.js";
import { kmpAutomaton } from "./kmpautomaton-tool.js";
import { rmqSparse } from "./rmqsparse-tool.js";
import { partitionCount } from "./partition-tool.js";
import { stirlingNumbers } from "./stirling-tool.js";
import { haarWavelet } from "./waveletfn-tool.js";
import { convexHull3D } from "./convexhull3d-tool.js";
import { bezierClip } from "./bezierclip-tool.js";

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
import { gmailSearch, gmailRead, gmailSend } from "./gmail-tool.js";
import { driveSearch, driveRead } from "./google-drive-tool.js";
import { onedriveList, onedriveSearch, onedriveRead } from "./onedrive-tool.js";
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
} from "./commonsensepass-tool.js";

// --- XPass (conductor receipt across product checks) -------------------------
import { xpassAggregatedVerdict } from "./xpass-aggregated-verdict-tool.js";

// ─── Crews (Orchestrator Wizard) ──────────────────────────────────────────────
import { crewsStartRun, crewsGetRun, crewsListRuns } from "./crews-tool.js";

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

  // supabase-tool.ts
  supabase_list_projects:      (args) => listSupabaseProjects(args),
  supabase_get_project:        (args) => getSupabaseProject(args),
  supabase_list_organizations: (args) => listSupabaseOrganizations(args),
  supabase_execute_sql:        (args) => executeSupabaseSql(args),
  supabase_apply_migration:    (args) => applySupabaseMigration(args),

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

  // nobelprize-tool.ts
  nobel_prizes:              (args) => nobelPrizes(args),
  nobel_laureates:           (args) => nobelLaureates(args),
  // universities-tool.ts
  universities_search:       (args) => universitiesSearch(args),
  // fakestoreapi-tool.ts
  fakestore_products:        (args) => fakestoreProducts(args),
  fakestore_product:         (args) => fakestoreProduct(args),
  fakestore_categories:      (args) => fakestoreCategories(args),
  // mtg-tool.ts
  mtg_search_cards:          (args) => mtgSearchCards(args),
  mtg_get_card:              (args) => mtgGetCard(args),
  mtg_sets:                  (args) => mtgSets(args),
  // domainsdb-tool.ts
  domainsdb_search:          (args) => domainsdbSearch(args),
  domainsdb_tlds:            (args) => domainsdbTlds(args),
  // pokemontcg-tool.ts
  pokemon_tcg_search_cards:  (args) => pokemonTcgSearchCards(args),
  pokemon_tcg_sets:          (args) => pokemonTcgSets(args),

  // spacex-tool.ts
  spacex_latest_launch:      (args) => spacexLatestLaunch(args),
  spacex_launches:           (args) => spacexLaunches(args),
  spacex_rockets:            (args) => spacexRockets(args),
  // genderize-tool.ts
  genderize_predict:         (args) => genderizePredict(args),
  // nationalize-tool.ts
  nationalize_predict:       (args) => nationalizePredict(args),
  // qrserver-tool.ts
  qrserver_generate:         (args) => qrserverGenerate(args),
  // solarsystem-tool.ts
  solarsystem_bodies:        (args) => solarsystemBodies(args),
  solarsystem_body:          (args) => solarsystemBody(args),
  // pubchem-tool.ts
  pubchem_search:            (args) => pubchemSearch(args),
  pubchem_properties:        (args) => pubchemProperties(args),

  // openmeteo-marine-tool.ts
  marine_forecast:           (args) => marineForecast(args),
  // opentriviadb-tool.ts
  triviadb_questions:        (args) => triviaDbQuestions(args),
  triviadb_categories:       (args) => triviaDbCategories(args),
  // ipaddrinfo-tool.ts
  ip_address_lookup:         (args) => ipAddressLookup(args),
  // diceware-tool.ts
  diceware_passphrase:       (args) => dicewarePassphrase(args),
  // colornames-tool.ts
  color_name_lookup:         (args) => colorNameLookup(args),
  color_name_random:         (args) => colorNameRandom(args),
  // mhwdb-tool.ts
  mhw_monsters:              (args) => mhwMonsters(args),
  mhw_weapons:               (args) => mhwWeapons(args),
  // exchangerate3-tool.ts
  currency_api_rates:        (args) => currencyApiRates(args),
  currency_api_list:         (args) => currencyApiList(args),
  // jisho-tool.ts
  jisho_search:              (args) => jishoSearch(args),
  // colr-tool.ts
  colr_random_palette:       (args) => colrRandomPalette(args),
  // gameoflife-tool.ts
  game_of_life_step:         (args) => gameOfLifeStep(args),
  // fruityvice-tool.ts
  fruityvice_all:            (args) => fruityviceAll(args),
  fruityvice_by_name:        (args) => fruityviceByName(args),
  // opendota-tool.ts
  opendota_heroes:           (args) => opendotaHeroes(args),
  opendota_hero_stats:       (args) => opendotaHeroStats(args),
  opendota_pro_matches:      (args) => opendotaProMatches(args),
  // artic-tool.ts
  artic_search_artworks:     (args) => articSearchArtworks(args),
  artic_get_artwork:         (args) => articGetArtwork(args),
  // imgflip-tool.ts
  imgflip_get_memes:         (args) => imgflipGetMemes(args),
  // foodish-tool.ts
  foodish_random:            (args) => foodishRandom(args),
  foodish_by_category:       (args) => foodishByCategory(args),
  // acnhapi-tool.ts
  acnh_villagers:            (args) => acnhVillagers(args),
  acnh_fish:                 (args) => acnhFish(args),
  acnh_bugs:                 (args) => acnhBugs(args),
  // httpcat-tool.ts
  http_cat_image:            (args) => httpCatImage(args),
  // poetrydb-tool.ts
  poetry_search_by_author:   (args) => poetrySearchByAuthor(args),
  poetry_search_by_title:    (args) => poetrySearchByTitle(args),
  poetry_random:             (args) => poetryRandom(args),
  // citybikes-tool.ts
  citybikes_networks:        (args) => citybikesNetworks(args),
  citybikes_network:         (args) => citybikesNetwork(args),
  // wheretheiss-tool.ts
  iss_position:              (args) => issPosition(args),
  iss_pass_times:            (args) => issPassTimes(args),
  // coinlore-tool.ts
  coinlore_global:           (args) => coinloreGlobal(args),
  coinlore_tickers:          (args) => coinloreTickers(args),
  coinlore_coin:             (args) => coinloreCoin(args),
  // openmeteo-airquality-tool.ts
  air_quality_current:       (args) => airQualityCurrent(args),
  air_quality_forecast:      (args) => airQualityForecast(args),
  // officialjoke-tool.ts
  official_joke_random:      (args) => officialJokeRandom(args),
  official_joke_by_type:     (args) => officialJokeByType(args),
  official_joke_ten:         (args) => officialJokeTen(args),
  // multiavatar-tool.ts
  multiavatar_generate:      (args) => multiavatarGenerate(args),
  // openmeteo-flood-tool.ts
  flood_forecast:            (args) => floodForecast(args),
  // diseasesh-tool.ts
  covid_global:              (args) => covidGlobal(args),
  covid_country:             (args) => covidCountry(args),
  covid_vaccine:             (args) => covidVaccine(args),
  // fishwatch-tool.ts
  fishwatch_species:         (args) => fishwatchSpecies(args),
  fishwatch_species_detail:  (args) => fishwatchSpeciesDetail(args),
  // newton-tool.ts
  newton_math:               (args) => newtonMath(args),
  // placebear-tool.ts
  placebear_image:           (args) => placebearImage(args),
  // countryis-tool.ts
  country_by_ip:             (args) => countryByIp(args),
  // openmeteo-historical-tool.ts
  historical_weather:        (args) => historicalWeather(args),
  // ukpolice-tool.ts
  uk_police_forces:          (args) => ukPoliceForces(args),
  uk_police_crimes:          (args) => ukPoliceCrimes(args),
  // memegen-tool.ts
  memegen_templates:         (args) => memegenTemplates(args),
  memegen_create:            (args) => memegenCreate(args),
  // timeapi-tool.ts
  time_api_current_by_zone:  (args) => timeApiCurrentByZone(args),
  time_api_timezones:        (args) => timeApiTimezones(args),
  // postcodes-tool.ts
  postcode_lookup:           (args) => postcodeLookup(args),
  postcode_random:           (args) => postcodeRandom(args),
  // openmeteo-climate-tool.ts
  climate_normals:           (args) => climateNormals(args),
  // gbif-tool.ts
  gbif_search_species:       (args) => gbifSearchSpecies(args),
  gbif_species_detail:       (args) => gbifSpeciesDetail(args),
  gbif_occurrences:          (args) => gbifOccurrences(args),
  // crossref-tool.ts
  crossref_search_works:     (args) => crossrefSearchWorks(args),
  crossref_get_work:         (args) => crossrefGetWork(args),
  // nominatim-tool.ts
  nominatim_search:          (args) => nominatimSearch(args),
  nominatim_reverse:         (args) => nominatimReverse(args),
  // coincap-tool.ts
  coincap_assets:            (args) => coincapAssets(args),
  coincap_asset_detail:      (args) => coincapAssetDetail(args),
  coincap_rates:             (args) => coincapRates(args),
  // open-elevation-tool.ts
  open_elevation_lookup:     (args) => openElevationLookup(args),
  // itis-tool.ts
  itis_search_by_name:       (args) => itisSearchByName(args),
  itis_get_full_record:      (args) => itisGetFullRecord(args),
  // arxiv-tool.ts
  arxiv_search:              (args) => arxivSearch(args),
  // openalex-tool.ts
  openalex_search_works:     (args) => openalexSearchWorks(args),
  openalex_get_work:         (args) => openalexGetWork(args),
  openalex_search_authors:   (args) => openalexSearchAuthors(args),
  // dblp-tool.ts
  dblp_search_publications:  (args) => dblpSearchPublications(args),
  dblp_search_authors:       (args) => dblpSearchAuthors(args),
  // wikidata-tool.ts
  wikidata_search:           (args) => wikidataSearch(args),
  wikidata_get_entity:       (args) => wikidataGetEntity(args),
  // randomduck-tool.ts
  random_duck_image:         (args) => randomDuckImage(args),
  random_duck_list:          (args) => randomDuckList(args),
  // httpdog-tool.ts
  http_dog_image:            (args) => httpDogImage(args),
  // opensky-tool.ts
  opensky_states:            (args) => openskyStates(args),
  opensky_flights:           (args) => openskyFlights(args),
  // cvecircl-tool.ts
  circl_cve_lookup:          (args) => circlCveLookup(args),
  circl_cve_recent:          (args) => circlCveRecent(args),
  // vatcomply-tool.ts
  vatcomply_rates:           (args) => vatcomplyRates(args),
  vatcomply_countries:       (args) => vatcomplyCountries(args),
  // thecolorapi-tool.ts
  thecolorapi_id:            (args) => theColorApiId(args),
  thecolorapi_scheme:        (args) => theColorApiScheme(args),
  // placehold-tool.ts
  placehold_image:           (args) => placeholdImage(args),
  // languagetool-tool.ts
  languagetool_check:        (args) => languagetoolCheck(args),
  languagetool_languages:    (args) => languagetoolLanguages(args),
  // bgpview-tool.ts
  bgpview_asn:               (args) => bgpviewAsn(args),
  bgpview_asn_prefixes:      (args) => bgpviewAsnPrefixes(args),
  bgpview_ip:                (args) => bgpviewIp(args),
  // mymemory-tool.ts
  mymemory_translate:        (args) => mymemoryTranslate(args),
  // openchargemap-tool.ts
  openchargemap_search:      (args) => openchargemapSearch(args),
  // crates-tool.ts
  crates_search:             (args) => cratesSearch(args),
  crates_get:                (args) => cratesGet(args),
  // npm-registry-tool.ts
  npm_search:                (args) => npmSearch(args),
  npm_get_package:           (args) => npmGetPackage(args),
  // pypi-tool.ts
  pypi_get_package:          (args) => pypiGetPackage(args),
  pypi_get_version:          (args) => pypiGetVersion(args),

  // rdap-tool.ts
  rdap_domain:               (args) => rdapDomain(args),
  rdap_ip:                   (args) => rdapIp(args),

  // iban-tool.ts
  iban_validate:             (args) => ibanValidate(args),

  // stackexchange-tool.ts
  stackexchange_search:      (args) => stackexchangeSearch(args),
  stackexchange_question:    (args) => stackexchangeQuestion(args),

  // ripe-tool.ts
  ripe_network_info:         (args) => ripeNetworkInfo(args),
  ripe_asn_neighbours:       (args) => ripeAsnNeighbours(args),

  // gutendex-tool.ts
  gutendex_search:           (args) => gutendexSearch(args),
  gutendex_book:             (args) => gutendexBook(args),

  // dohdns-tool.ts
  dohdns_resolve:            (args) => dohdnsResolve(args),

  // nhtsa-tool.ts
  nhtsa_decode_vin:          (args) => nhtsaDecodeVin(args),
  nhtsa_recalls:             (args) => nhtsaRecalls(args),

  // geojs-tool.ts
  geojs_lookup:              (args) => geojsLookup(args),

  // isup-tool.ts
  isup_check:                (args) => isupCheck(args),

  // wayback-tool.ts
  wayback_check:             (args) => waybackCheck(args),

  // oeis-tool.ts
  oeis_search:               (args) => oeisSearch(args),

  // upcitemdb-tool.ts
  upc_lookup:                (args) => upcLookup(args),
  upc_search:                (args) => upcSearch(args),

  // fakerapi-tool.ts
  faker_persons:             (args) => fakerPersons(args),
  faker_companies:           (args) => fakerCompanies(args),
  faker_texts:               (args) => fakerTexts(args),

  // openfigi-tool.ts
  openfigi_mapping:          (args) => openfigiMapping(args),
  openfigi_search:           (args) => openfigiSearch(args),

  // libretranslate-tool.ts
  libretranslate_translate:  (args) => libretranslateTranslate(args),
  libretranslate_languages:  (args) => libretranslateLanguages(args),
  libretranslate_detect:     (args) => libretranslateDetect(args),

  // europeana-tool.ts
  europeana_search:          (args) => europeanaSearch(args),
  europeana_record:          (args) => europeanaRecord(args),

  // flyover-tool.ts
  iss_flyover:               (args) => issFlyover(args),

  // jsoncrack-tool.ts
  json_format:               (args) => jsoncrackFormat(args),

  // abstract-holidays-tool.ts
  country_info_detail:       (args) => abstractCountryInfo(args),
  long_weekends:             (args) => abstractLongWeekends(args),

  // cocktaildb2-tool.ts
  cocktail_by_ingredient:    (args) => cocktailByIngredient(args),
  cocktail_ingredient_info:  (args) => cocktailIngredientInfo(args),

  // regexr-tool.ts
  regex_test:                (args) => regexTest(args),

  // hashgen-tool.ts
  hash_generate:             (args) => hashGenerate(args),
  hash_compare:              (args) => hashCompare(args),

  // base64-tool.ts
  base64_encode:             (args) => base64Encode(args),
  base64_decode:             (args) => base64Decode(args),

  // urlencode-tool.ts
  url_encode:                (args) => urlEncode(args),
  url_decode:                (args) => urlDecode(args),

  // crontab-tool.ts
  crontab_explain:           (args) => crontabExplain(args),

  // jwt-tool.ts
  jwt_decode:                (args) => jwtDecode(args),

  // markdown-tool.ts
  markdown_to_html:          (args) => markdownToHtml(args),
  markdown_stats:            (args) => markdownStats(args),

  // cidr-tool.ts
  cidr_calculate:            (args) => cidrCalculate(args),

  // semver-tool.ts
  semver_parse:              (args) => semverParse(args),
  semver_compare:            (args) => semverCompare(args),

  // colorconvert-tool.ts
  color_hex_convert:         (args) => colorHexConvert(args),

  // epoch-tool.ts
  epoch_convert:             (args) => epochConvert(args),
  epoch_now:                 (args) => epochNow(args),

  // difftext-tool.ts
  diff_text:                 (args) => diffText(args),

  // passwordgen-tool.ts
  password_generate:         (args) => passwordGenerate(args),

  // slug-tool.ts
  text_slugify:              (args) => slugify(args),

  // lorem2-tool.ts
  lorem_generate:            (args) => loremGenerate(args),

  // csvparse-tool.ts
  csv_parse:                 (args) => csvParse(args),

  // wordcount-tool.ts
  word_count:                (args) => wordCount(args),

  // jsonformat-tool.ts
  json_prettify:             (args) => jsonFormat(args),

  // htmlstrip-tool.ts
  html_strip:                (args) => htmlStrip(args),

  // uuidgen-tool.ts
  uuid_generate:             (args) => uuidGenerate(args),

  // charcount-tool.ts
  char_frequency:            (args) => charFrequency(args),

  // ipvalidate-tool.ts
  ip_validate:               (args) => ipValidate(args),

  // stringcase-tool.ts
  string_case:               (args) => stringCase(args),

  // aspectratio-tool.ts
  aspect_ratio:              (args) => aspectRatio(args),

  // percentage-tool.ts
  percentage_calc:           (args) => percentageCalc(args),

  // roman-tool.ts
  roman_convert:             (args) => romanConvert(args),

  // morse-tool.ts
  morse_convert:             (args) => morseConvert(args),

  // binaryconv-tool.ts
  number_base_convert:       (args) => numberBaseConvert(args),

  // levenshtein-tool.ts
  string_distance:           (args) => stringDistance(args),

  // loremname-tool.ts
  lorem_name_generate:       (args) => loremNameGenerate(args),

  // textstats-tool.ts
  text_readability:          (args) => textReadability(args),

  // timezone-tool.ts
  timezone_info:             (args) => timezoneInfo(args),

  // colorblend-tool.ts
  color_blend:               (args) => colorBlend(args),

  // fibonacci-tool.ts
  fibonacci_sequence:        (args) => fibonacciSequence(args),

  // primecheck-tool.ts
  prime_check:               (args) => primeCheck(args),

  // sortlines-tool.ts
  sort_lines:                (args) => sortLines(args),

  // countdowncalc-tool.ts
  countdown_calc:            (args) => countdownCalc(args),

  // unitpressure-tool.ts
  pressure_convert:          (args) => pressureConvert(args),

  // emojilookup-tool.ts
  emoji_lookup:              (args) => emojiLookup(args),

  // natoalphabet-tool.ts
  nato_convert:              (args) => natoConvert(args),

  // bitwise-tool.ts
  bitwise_calc:              (args) => bitwiseCalc(args),

  // gcdlcm-tool.ts
  gcd_lcm_calc:              (args) => gcdLcmCalc(args),

  // tempconvert-tool.ts
  temperature_convert:       (args) => temperatureConvert(args),

  // statistics-tool.ts
  statistics_calc:           (args) => statisticsCalc(args),

  // textwrap-tool.ts
  text_wrap:                 (args) => textWrap(args),

  // braille-tool.ts
  braille_convert:           (args) => brailleConvert(args),

  // piglatin-tool.ts
  pig_latin_convert:         (args) => pigLatinConvert(args),

  // rot13-tool.ts
  rot13_convert:             (args) => rot13Convert(args),

  // reversetext-tool.ts
  reverse_text:              (args) => reverseText(args),

  // palindrome-tool.ts
  palindrome_check:          (args) => palindromeCheck(args),

  // acronymgen-tool.ts
  acronym_generate:          (args) => acronymGenerate(args),

  // wordfreq-tool.ts
  wordfreq_analyse:          (args) => wordfreqAnalyse(args),

  // markdowntable-tool.ts
  markdowntable_convert:     (args) => markdowntableConvert(args),

  // runlength-tool.ts
  runlength_process:         (args) => runlengthProcess(args),

  // luhn-tool.ts
  luhn_validate:             (args) => luhnValidate(args),

  // charcodes-tool.ts
  charcodes_convert:         (args) => charcodesConvert(args),

  // soundex-tool.ts
  soundex_encode:            (args) => soundexEncode(args),

  // frequency-tool.ts
  frequency_analyse:         (args) => frequencyAnalyse(args),

  // entropy-tool.ts
  entropy_calculate:         (args) => entropyCalculate(args),

  // ngram-tool.ts
  ngram_extract:             (args) => ngramExtract(args),

  // camelsnake-tool.ts
  camelsnake_convert:        (args) => camelsnakeConvert(args),

  // metaphone-tool.ts
  metaphone_encode:          (args) => metaphoneEncode(args),

  // tfidf-tool.ts
  tfidf_calculate:           (args) => tfidfCalculate(args),

  // readability-tool.ts
  readability_score:         (args) => readabilityScore(args),

  // tokencount-tool.ts
  tokencount_estimate:       (args) => tokencountEstimate(args),

  // crc32-tool.ts
  crc32_calculate:           (args) => crc32Calculate(args),

  // jaccard-tool.ts
  jaccard_similarity:        (args) => jaccardSimilarity(args),

  // hamming-tool.ts
  hamming_distance:          (args) => hammingDistance(args),

  // cosinesim-tool.ts
  cosinesim_compare:         (args) => cosinesimCompare(args),

  // damerau-tool.ts
  damerau_distance:          (args) => damerauDistance(args),

  // markov-tool.ts
  markov_generate:           (args) => markovGenerate(args),

  // vigenere-tool.ts
  vigenere_process:          (args) => vigenereProcess(args),

  // atbash-tool.ts
  atbash_process:            (args) => atbashProcess(args),

  // railfence-tool.ts
  railfence_process:         (args) => railfenceProcess(args),

  // phonetic-tool.ts
  phonetic_spell:            (args) => phoneticSpell(args),

  // matrix-tool.ts
  matrix_operate:            (args) => matrixOperate(args),

  // setops-tool.ts
  setops_calculate:          (args) => setopsCalculate(args),

  // collatz-tool.ts
  collatz_sequence:          (args) => collatzSequence(args),

  // pascaltri-tool.ts
  pascaltri_generate:        (args) => pascaltriGenerate(args),

  // histogram-tool.ts
  histogram_create:          (args) => histogramCreate(args),

  // regression-tool.ts
  regression_fit:            (args) => regressionFit(args),

  // baseconvert-tool.ts
  base_convert:              (args) => baseConvert(args),

  // gcd-tool.ts
  gcd_calculate:             (args) => gcdCalculate(args),

  // permutation-tool.ts
  permutation_calc:          (args) => permutationCalc(args),

  // combination-tool.ts
  combination_calc:          (args) => combinationCalc(args),

  // proportion-tool.ts
  proportion_solve:          (args) => proportionSolve(args),

  // quadratic-tool.ts
  quadratic_solve:           (args) => quadraticSolve(args),

  // primefactor-tool.ts
  prime_factor:              (args) => primeFactor(args),

  // zscore-tool.ts
  zscore_calculate:          (args) => zscoreCalculate(args),

  // angleconv-tool.ts
  angle_convert:             (args) => angleConvert(args),

  // polygon-tool.ts
  polygon_calculate:         (args) => polygonCalculate(args),

  // sigmoid-tool.ts
  sigmoid_calculate:         (args) => sigmoidCalculate(args),

  // interpolate-tool.ts
  interpolate_calc:          (args) => interpolateCalc(args),

  // modpow-tool.ts
  modular_arithmetic:        (args) => modularArithmetic(args),

  // ratiosimplify-tool.ts
  ratio_simplify:            (args) => ratioSimplify(args),

  // binomprob-tool.ts
  binomial_probability:      (args) => binomialProbability(args),

  // normaldistr-tool.ts
  normal_distribution:       (args) => normalDistribution(args),

  // trianglesolve-tool.ts
  triangle_solve:            (args) => triangleSolve(args),

  // standardform-tool.ts
  standard_form:             (args) => standardForm(args),

  // complexnum-tool.ts
  complex_calc:              (args) => complexCalc(args),

  // wavelength-tool.ts
  wavelength_convert:        (args) => wavelengthConvert(args),

  // midpoint-tool.ts
  midpoint_calc:             (args) => midpointCalc(args),

  // slopeintercept-tool.ts
  slope_intercept:           (args) => slopeIntercept(args),

  // logbase-tool.ts
  log_base:                  (args) => logBase(args),

  // nthroot-tool.ts
  nth_root:                  (args) => nthRoot(args),

  // areacalc-tool.ts
  area_calculate:            (args) => areaCalculate(args),

  // dotproduct-tool.ts
  dot_product:               (args) => dotProduct(args),

  // crossproduct-tool.ts
  cross_product:             (args) => crossProduct(args),

  // weightedmean-tool.ts
  weighted_mean:             (args) => weightedMean(args),

  // variancecalc-tool.ts
  variance_calc:             (args) => varianceCalc(args),

  // poisson-tool.ts
  poisson_probability:       (args) => poissonProbability(args),

  // expgrowth-tool.ts
  exponential_growth:        (args) => exponentialGrowth(args),

  // geomseries-tool.ts
  geometric_series:          (args) => geometricSeries(args),

  // harmonicseries-tool.ts
  harmonic_series:           (args) => harmonicSeries(args),

  // piapprox-tool.ts
  pi_approx:                 (args) => piApprox(args),

  // taylor-tool.ts
  taylor_expand:             (args) => taylorExpand(args),

  // batch 58: algorithms & data structures
  string_lcs:                (args) => stringLcs(args),
  topo_sort:                 (args) => topoSort(args),
  convex_hull:               (args) => convexHull(args),
  knapsack_solve:            (args) => knapsackSolve(args),
  spline_interpolate:        (args) => splineInterpolate(args),

  // batch 59: graphs, linear algebra, calculus
  dijkstra_path:             (args) => dijkstraPath(args),
  matrix_decomp:             (args) => matrixDecomp(args),
  linear_solve:              (args) => linearSolve(args),
  numerical_diff:            (args) => numericalDiff(args),
  numerical_integrate:       (args) => numericalIntegrate(args),

  // batch 60: signal processing, curves, root finding, matrix inverse
  fft_transform:             (args) => fftTransform(args),
  bezier_curve:              (args) => bezierCurve(args),
  root_find:                 (args) => rootFind(args),
  matrix_inverse:            (args) => matrixInverse(args),

  // batch 61: ODE solver, polynomial ops, hypothesis testing, Huffman coding
  ode_solve:                 (args) => odeSolve(args),
  polynomial_ops:            (args) => polynomialOps(args),
  hypothesis_test:           (args) => hypothesisTest(args),
  huffman_code:              (args) => huffmanCode(args),

  // batch 62: correlation, bit count, running stats, graph analysis
  correlation_calc:          (args) => correlationCalc(args),
  bit_count:                 (args) => bitCount(args),
  running_stats:             (args) => runningStats(args),
  graph_analyze:             (args) => graphAnalyze(args),

  // batch 63: convolution, RLE encode/decode, descriptive stats, BFS
  convolution:               (args) => convolution(args),
  rle_encode_decode:         (args) => rleEncodeDecode(args),
  descriptive_stats:         (args) => descriptiveStats(args),
  bfs_search:                (args) => bfsSearch(args),

  // batch 64: Monte Carlo, DFS, percentile, MST
  monte_carlo_estimate:      (args) => monteCarloEstimate(args),
  dfs_search:                (args) => dfsSearch(args),
  percentile_calc:           (args) => percentileCalc(args),
  mst_find:                  (args) => mstFind(args),

  // batch 65: PageRank, A*, simplex, Hungarian
  page_rank:                 (args) => pageRank(args),
  astar_path:                (args) => astarPath(args),
  simplex_solve:             (args) => simplexSolve(args),
  hungarian_assign:          (args) => hungarianAssign(args),

  // batch 66: k-means, Bellman-Ford, Floyd-Warshall, reservoir sampling
  kmeans_cluster:            (args) => kmeansCluster(args),
  bellman_ford:              (args) => bellmanFord(args),
  floyd_warshall:            (args) => floydWarshall(args),
  reservoir_sample:          (args) => reservoirSample(args),

  // batch 67: Bloom filter, power iteration, TSP, LRU cache
  bloom_filter:              (args) => bloomFilter(args),
  power_iteration:           (args) => powerIteration(args),
  tsp_solve:                 (args) => tspSolve(args),
  lru_simulate:              (args) => lruSimulate(args),

  // batch 68: Union-Find, Tarjan SCC, Catalan, Rabin-Karp
  union_find:                (args) => unionFindOps(args),
  tarjan_scc:                (args) => tarjanScc(args),
  catalan_calc:              (args) => catalanCalc(args),
  rabin_karp_search:         (args) => rabinKarpSearch(args),

  // batch 69: Sieve, Suffix Array, Matrix Chain, Fenwick Tree
  sieve_of_eratosthenes:     (args) => sieveOfEratosthenes(args),
  suffix_array_build:        (args) => suffixArrayBuild(args),
  matrix_chain_order:        (args) => matChainOrder(args),
  fenwick_tree:              (args) => fenwickTree(args),

  // batch 70: Segment Tree, KMP, Aho-Corasick, Z-Algorithm
  segment_tree:              (args) => segTree(args),
  kmp_search:                (args) => kmpSearch(args),
  aho_corasick_search:       (args) => ahoCorasickSearch(args),
  z_algorithm:               (args) => zAlgorithm(args),

  // batch 71: Trie, Skip List, Manacher, Counting Sort
  trie_ops:                  (args) => trieOps(args),
  skip_list_sim:             (args) => skipListSim(args),
  manacher_palindrome:       (args) => manacherPalindrome(args),
  counting_sort:             (args) => countingSort(args),

  // batch 72: Radix Sort, Treap, LIS, Kosaraju SCC
  radix_sort:                (args) => radixSort(args),
  treap_sim:                 (args) => treapSim(args),
  longest_increasing_subsequence: (args) => longestIncreasingSubseq(args),
  kosaraju_scc:              (args) => kosarajuScc(args),

  // batch 73: Bucket Sort, Edmonds-Karp, AVL Tree, Bipartite Check
  bucket_sort:               (args) => bucketSort(args),
  edmonds_karp:              (args) => edmondsKarp(args),
  avl_tree:                  (args) => avlTree(args),
  bipartite_check:           (args) => bipartiteCheck(args),

  // batch 74: Euler Path, Sparse Table, Miller-Rabin, Red-Black Tree
  euler_path:                (args) => eulerPath(args),
  sparse_table:              (args) => sparseTable(args),
  miller_rabin_test:         (args) => millerRabinTest(args),
  rb_tree_sim:               (args) => rbTreeSim(args),

  // batch 75: Heap Sort, CRT, Graph Coloring, Extended GCD
  heap_sort:                 (args) => heapSort(args),
  chinese_remainder_theorem: (args) => chineseRemainderTheorem(args),
  graph_coloring:            (args) => graphColoring(args),
  extended_gcd:              (args) => extendedGcd(args),

  // batch 76: Euler Totient, Hopcroft-Karp, Interval Merge, Ternary Search
  euler_totient:             (args) => eulerTotient(args),
  hopcroft_karp:             (args) => hopcroftKarp(args),
  interval_merge:            (args) => intervalMerge(args),
  ternary_search:            (args) => ternarySearch(args),

  // batch 77: Shell Sort, Matrix Exponentiation, Segment Intersection, Min Vertex Cover
  shell_sort:                (args) => shellSort(args),
  matrix_exponentiation:     (args) => matrixExponentiation(args),
  segment_intersection:      (args) => segmentIntersection(args),
  min_vertex_cover:          (args) => minVertexCover(args),

  // batch 78: Suffix Automaton, Gabow SCC, Baby-step Giant-step, Centroid Decomposition
  suffix_automaton:          (args) => suffixAutomaton(args),
  gabow_scc:                 (args) => gabowScc(args),
  baby_giant_step:           (args) => babyGiantStep(args),
  centroid_decomposition:    (args) => centroidDecomposition(args),

  // batch 79: Wavelet Tree, Dinic Max Flow, LCA, Max Independent Set
  wavelet_tree:              (args) => waveletTree(args),
  dinic_max_flow:            (args) => dinicMaxFlow(args),
  lowest_common_ancestor:    (args) => lowestCommonAncestor(args),
  max_independent_set:       (args) => maxIndependentSet(args),

  // batch 80: 2-SAT, HLD, Min Cost Max Flow, Persistent Array
  two_sat:                       (args) => twoSat(args),
  heavy_light_decomposition:     (args) => heavyLightDecomp(args),
  min_cost_max_flow:             (args) => minCostMaxFlow(args),
  persistent_array:              (args) => persistentArray(args),

  // batch 81: Suffix Tree, Link-Cut Tree, Graph Condensation, Mo's Algorithm
  suffix_tree:                   (args) => suffixTree(args),
  link_cut_tree:                 (args) => linkCutTree(args),
  graph_condensation:            (args) => graphCondensation(args),
  mos_algorithm:                 (args) => mosAlgorithm(args),

  // batch 82: Cartesian Tree, Stern-Brocot Tree, Chromatic Number, Euler Tour
  cartesian_tree:                (args) => cartesianTree(args),
  stern_brocot_tree:             (args) => sternBrocotTree(args),
  chromatic_number:              (args) => chromaticNumber(args),
  euler_tour:                    (args) => eulerTour(args),

  // batch 83: Gaussian Elimination, Eertree, Pollard's Rho, NTT
  gaussian_elimination:          (args) => gaussianElimination(args),
  eertree:                       (args) => eertree(args),
  pollard_rho:                   (args) => pollardRho(args),
  ntt:                           (args) => ntt(args),

  // batch 84: Josephus, Berlekamp-Massey, SOS DP, XOR Basis
  josephus:                      (args) => josephus(args),
  berlekamp_massey:              (args) => berlekampMassey(args),
  sos_dp:                        (args) => sosDp(args),
  xor_basis:                     (args) => xorBasis(args),

  // batch 85: Moebius Function, Z-Function, Chinese Remainder, Lucas' Theorem
  moebius_function:              (args) => moebiusFunction(args),
  z_function:                    (args) => zFunction(args),
  chinese_remainder:             (args) => chineseRemainder(args),
  lucas_theorem:                 (args) => lucasTheorem(args),

  // batch 86: Duval, Goertzel, Burrows-Wheeler, Ackermann
  duval_factorize:               (args) => duvalFactorize(args),
  goertzel:                      (args) => goertzel(args),
  burrows_wheeler:               (args) => burrowsWheeler(args),
  ackermann:                     (args) => ackermannFunction(args),

  // batch 87: de Bruijn, Shunting-Yard, Fenwick Range, Bitmask Ops
  de_bruijn:                     (args) => deBruijn(args),
  shunting_yard:                 (args) => shuntingYard(args),
  fenwick_range:                 (args) => fenwickRange(args),
  bitmask_ops:                   (args) => bitmaskOps(args),

  // batch 88: Gray Code, Catmull-Rom, Run-Length Encoding, Topo Count
  gray_code:                     (args) => grayCode(args),
  catmull_rom:                   (args) => catmullRom(args),
  rl_encode:                     (args) => rlEncode(args),
  topo_count:                    (args) => topoCount(args),

  // batch 89: Booth, Prefix Function, Matrix Rank, Fenwick 2D
  booth_rotation:                (args) => boothRotation(args),
  prefix_function:               (args) => prefixFunction(args),
  matrix_rank:                   (args) => matrixRank(args),
  fenwick_2d:                    (args) => fenwick2D(args),

  // batch 90: Continued Fractions, Longest Common Prefix, Lehmer Code, Digit DP
  continued_fraction:            (args) => continuedFraction(args),
  longest_common_prefix:         (args) => longestCommonPrefix(args),
  lehmer_code:                   (args) => lehmerCode(args),
  digit_dp:                      (args) => digitDp(args),

  // batch 91: Coin Change, Edit Distance, Power Set, Necklace Count
  coin_change:                   (args) => coinChange(args),
  edit_distance:                 (args) => editDistance(args),
  power_set:                     (args) => powerSet(args),
  necklace_count:                (args) => necklaceCount(args),

  // batch 92: Derangement, KMP Automaton, RMQ Sparse, Partition
  derangement_calc:              (args) => derangementCalc(args),
  kmp_automaton:                 (args) => kmpAutomaton(args),
  rmq_sparse:                    (args) => rmqSparse(args),
  partition_count:               (args) => partitionCount(args),

  // batch 93: Stirling Numbers, Haar Wavelet, 3D Convex Hull, Bezier Clip
  stirling_numbers:              (args) => stirlingNumbers(args),
  haar_wavelet:                  (args) => haarWavelet(args),
  convex_hull_3d:                (args) => convexHull3D(args),
  bezier_clip:                   (args) => bezierClip(args),

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

  // gmail-tool.ts
  gmail_search:            (args) => gmailSearch(args),
  gmail_read:              (args) => gmailRead(args),
  gmail_send:              (args) => gmailSend(args),

  // google-drive-tool.ts
  drive_search:            (args) => driveSearch(args),
  drive_read:              (args) => driveRead(args),

  // onedrive-tool.ts
  onedrive_list:           (args) => onedriveList(args),
  onedrive_search:         (args) => onedriveSearch(args),
  onedrive_read:           (args) => onedriveRead(args),

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
