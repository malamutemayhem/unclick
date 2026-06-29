// additional-handlers.ts
// AUTO-GENERATED index. Do not edit by hand. Each connector's imports + handler
// entries live in src/wiring/<slug>.ts; this assembles them into
// ADDITIONAL_HANDLERS in the original order. Regenerate with
// scripts/gen-stage3b-split.mjs.

import { bggHandlers } from "./wiring/bgg.js";
import { rawgHandlers } from "./wiring/rawg.js";
import { riotHandlers } from "./wiring/riot.js";
import { bungieHandlers } from "./wiring/bungie.js";
import { supercellHandlers } from "./wiring/supercell.js";
import { legoHandlers } from "./wiring/lego.js";
import { untappdHandlers } from "./wiring/untappd.js";
import { pandascoreHandlers } from "./wiring/pandascore.js";
import { amberHandlers } from "./wiring/amber.js";
import { willyweatherHandlers } from "./wiring/willyweather.js";
import { domainHandlers } from "./wiring/domain.js";
import { troveHandlers } from "./wiring/trove.js";
import { australiapostHandlers } from "./wiring/australiapost.js";
import { sendleHandlers } from "./wiring/sendle.js";
import { ipaustraliaHandlers } from "./wiring/ipaustralia.js";
import { tabHandlers } from "./wiring/tab.js";
import { thelottHandlers } from "./wiring/thelott.js";
import { abnHandlers } from "./wiring/abn.js";
import { ptvHandlers } from "./wiring/ptv.js";
import { nvdHandlers } from "./wiring/nvd.js";
import { hunterHandlers } from "./wiring/hunter.js";
import { haveibeenpwnedHandlers } from "./wiring/haveibeenpwned.js";
import { virustotalHandlers } from "./wiring/virustotal.js";
import { abuseipdbHandlers } from "./wiring/abuseipdb.js";
import { urlscanHandlers } from "./wiring/urlscan.js";
import { shodanHandlers } from "./wiring/shodan.js";
import { resendHandlers } from "./wiring/resend.js";
import { vercelHandlers } from "./wiring/vercel.js";
import { supabaseHandlers } from "./wiring/supabase.js";
import { togglHandlers } from "./wiring/toggl.js";
import { emailHandlers } from "./wiring/email.js";
import { usgsHandlers } from "./wiring/usgs.js";
import { openaqHandlers } from "./wiring/openaq.js";
import { openfoodfactsHandlers } from "./wiring/openfoodfacts.js";
import { ebirdHandlers } from "./wiring/ebird.js";
import { carboninterfaceHandlers } from "./wiring/carboninterface.js";
import { toiletsHandlers } from "./wiring/toilets.js";
import { calculatorHandlers } from "./wiring/calculator.js";
import { unitConverterHandlers } from "./wiring/unit-converter.js";
import { datetimeHandlers } from "./wiring/datetime.js";
import { textHandlers } from "./wiring/text.js";
import { mealHandlers } from "./wiring/meal.js";
import { espnHandlers } from "./wiring/espn.js";
import { sleeperHandlers } from "./wiring/sleeper.js";
import { deezerHandlers } from "./wiring/deezer.js";
import { colorHandlers } from "./wiring/color.js";
import { randomHandlers } from "./wiring/random.js";
import { notionHandlers } from "./wiring/notion.js";
import { readwiseHandlers } from "./wiring/readwise.js";
import { raindropHandlers } from "./wiring/raindrop.js";
import { clockifyHandlers } from "./wiring/clockify.js";
import { splitwiseHandlers } from "./wiring/splitwise.js";
import { instapaperHandlers } from "./wiring/instapaper.js";
import { monicaHandlers } from "./wiring/monica.js";
import { feedlyHandlers } from "./wiring/feedly.js";
import { hackernewsHandlers } from "./wiring/hackernews.js";
import { openf1Handlers } from "./wiring/openf1.js";
import { tmdbHandlers } from "./wiring/tmdb.js";
import { triviaHandlers } from "./wiring/trivia.js";
import { pokeapiHandlers } from "./wiring/pokeapi.js";
import { cocktailHandlers } from "./wiring/cocktail.js";
import { dictionaryHandlers } from "./wiring/dictionary.js";
import { jokeHandlers } from "./wiring/joke.js";
import { holidaysHandlers } from "./wiring/holidays.js";
import { dogceoHandlers } from "./wiring/dogceo.js";
import { rickandmortyHandlers } from "./wiring/rickandmorty.js";
import { xkcdHandlers } from "./wiring/xkcd.js";
import { breweryHandlers } from "./wiring/brewery.js";
import { jikanHandlers } from "./wiring/jikan.js";
import { chucknorrisHandlers } from "./wiring/chucknorris.js";
import { catfactsHandlers } from "./wiring/catfacts.js";
import { swapiHandlers } from "./wiring/swapi.js";
import { dnd5eHandlers } from "./wiring/dnd5e.js";
import { deckofcardsHandlers } from "./wiring/deckofcards.js";
import { adviceslipHandlers } from "./wiring/adviceslip.js";
import { agifyHandlers } from "./wiring/agify.js";
import { quotableHandlers } from "./wiring/quotable.js";
import { boredHandlers } from "./wiring/bored.js";
import { superheroHandlers } from "./wiring/superhero.js";
import { opennotifyHandlers } from "./wiring/opennotify.js";
import { tarotHandlers } from "./wiring/tarot.js";
import { aoe2Handlers } from "./wiring/aoe2.js";
import { affirmationHandlers } from "./wiring/affirmation.js";
import { jsonplaceholderHandlers } from "./wiring/jsonplaceholder.js";
import { picsumHandlers } from "./wiring/picsum.js";
import { bibleHandlers } from "./wiring/bible.js";
import { frankfurterHandlers } from "./wiring/frankfurter.js";
import { zenquotesHandlers } from "./wiring/zenquotes.js";
import { kanyeHandlers } from "./wiring/kanye.js";
import { dadjokeHandlers } from "./wiring/dadjoke.js";
import { uselessfactsHandlers } from "./wiring/uselessfacts.js";
import { randomfoxHandlers } from "./wiring/randomfox.js";
import { httpbinHandlers } from "./wiring/httpbin.js";
import { reqresHandlers } from "./wiring/reqres.js";
import { corporatebsHandlers } from "./wiring/corporatebs.js";
import { worldtimeHandlers } from "./wiring/worldtime.js";
import { sunrisesunsetHandlers } from "./wiring/sunrisesunset.js";
import { zippopotamusHandlers } from "./wiring/zippopotamus.js";
import { yesnoHandlers } from "./wiring/yesno.js";
import { evilinsultHandlers } from "./wiring/evilinsult.js";
import { dogapiHandlers } from "./wiring/dogapi.js";
import { apifootballHandlers } from "./wiring/apifootball.js";
import { catapiHandlers } from "./wiring/catapi.js";
import { spaceflightHandlers } from "./wiring/spaceflight.js";
import { archiveorgHandlers } from "./wiring/archiveorg.js";
import { ipifyHandlers } from "./wiring/ipify.js";
import { exchangerate2Handlers } from "./wiring/exchangerate2.js";
import { makeupHandlers } from "./wiring/makeup.js";
import { githubEmojiHandlers } from "./wiring/github-emoji.js";
import { metmuseumHandlers } from "./wiring/metmuseum.js";
import { loremHandlers } from "./wiring/lorem.js";
import { placekittenHandlers } from "./wiring/placekitten.js";
import { shibeHandlers } from "./wiring/shibe.js";
import { cataasHandlers } from "./wiring/cataas.js";
import { punkapiHandlers } from "./wiring/punkapi.js";
import { colormindHandlers } from "./wiring/colormind.js";
import { dummyjsonHandlers } from "./wiring/dummyjson.js";
import { excuserHandlers } from "./wiring/excuser.js";
import { dogfactsHandlers } from "./wiring/dogfacts.js";
import { amiiboHandlers } from "./wiring/amiibo.js";
import { dummyimageHandlers } from "./wiring/dummyimage.js";
import { ipinfoHandlers } from "./wiring/ipinfo.js";
import { ghibliHandlers } from "./wiring/ghibli.js";
import { finalspaceHandlers } from "./wiring/finalspace.js";
import { mcsrvstatHandlers } from "./wiring/mcsrvstat.js";
import { disneyapiHandlers } from "./wiring/disneyapi.js";
import { harrypotterHandlers } from "./wiring/harrypotter.js";
import { emojihubHandlers } from "./wiring/emojihub.js";
import { avatarapiHandlers } from "./wiring/avatarapi.js";
import { robohashHandlers } from "./wiring/robohash.js";
import { openlib2Handlers } from "./wiring/openlib2.js";
import { countryflagHandlers } from "./wiring/countryflag.js";
import { mediawikiHandlers } from "./wiring/mediawiki.js";
import { bibleverseHandlers } from "./wiring/bibleverse.js";
import { urlhausHandlers } from "./wiring/urlhaus.js";
import { tvmazeHandlers } from "./wiring/tvmaze.js";
import { freetogameHandlers } from "./wiring/freetogame.js";
import { cheapsharkHandlers } from "./wiring/cheapshark.js";
import { isevenHandlers } from "./wiring/iseven.js";
import { iceandfireHandlers } from "./wiring/iceandfire.js";
import { randomuserHandlers } from "./wiring/randomuser.js";
import { digimonHandlers } from "./wiring/digimon.js";
import { stapiHandlers } from "./wiring/stapi.js";
import { breakingbadHandlers } from "./wiring/breakingbad.js";
import { tacofancyHandlers } from "./wiring/tacofancy.js";
import { publicapisHandlers } from "./wiring/publicapis.js";
import { wgerHandlers } from "./wiring/wger.js";
import { animechanHandlers } from "./wiring/animechan.js";
import { lotrHandlers } from "./wiring/lotr.js";
import { coinpaprikaHandlers } from "./wiring/coinpaprika.js";
import { openfdaHandlers } from "./wiring/openfda.js";
import { funtranslationsHandlers } from "./wiring/funtranslations.js";
import { datamuseHandlers } from "./wiring/datamuse.js";
import { balldontlieHandlers } from "./wiring/balldontlie.js";
import { worldbankHandlers } from "./wiring/worldbank.js";
import { carbonintensityHandlers } from "./wiring/carbonintensity.js";
import { lyricsHandlers } from "./wiring/lyrics.js";
import { urbandictionaryHandlers } from "./wiring/urbandictionary.js";
import { nobelprizeHandlers } from "./wiring/nobelprize.js";
import { universitiesHandlers } from "./wiring/universities.js";
import { fakestoreapiHandlers } from "./wiring/fakestoreapi.js";
import { mtgHandlers } from "./wiring/mtg.js";
import { domainsdbHandlers } from "./wiring/domainsdb.js";
import { pokemontcgHandlers } from "./wiring/pokemontcg.js";
import { spacexHandlers } from "./wiring/spacex.js";
import { genderizeHandlers } from "./wiring/genderize.js";
import { nationalizeHandlers } from "./wiring/nationalize.js";
import { qrserverHandlers } from "./wiring/qrserver.js";
import { solarsystemHandlers } from "./wiring/solarsystem.js";
import { pubchemHandlers } from "./wiring/pubchem.js";
import { openmeteoMarineHandlers } from "./wiring/openmeteo-marine.js";
import { opentriviadbHandlers } from "./wiring/opentriviadb.js";
import { ipaddrinfoHandlers } from "./wiring/ipaddrinfo.js";
import { dicewareHandlers } from "./wiring/diceware.js";
import { colornamesHandlers } from "./wiring/colornames.js";
import { mhwdbHandlers } from "./wiring/mhwdb.js";
import { exchangerate3Handlers } from "./wiring/exchangerate3.js";
import { jishoHandlers } from "./wiring/jisho.js";
import { colrHandlers } from "./wiring/colr.js";
import { gameoflifeHandlers } from "./wiring/gameoflife.js";
import { fruityviceHandlers } from "./wiring/fruityvice.js";
import { opendotaHandlers } from "./wiring/opendota.js";
import { articHandlers } from "./wiring/artic.js";
import { imgflipHandlers } from "./wiring/imgflip.js";
import { foodishHandlers } from "./wiring/foodish.js";
import { acnhapiHandlers } from "./wiring/acnhapi.js";
import { httpcatHandlers } from "./wiring/httpcat.js";
import { poetrydbHandlers } from "./wiring/poetrydb.js";
import { citybikesHandlers } from "./wiring/citybikes.js";
import { wheretheissHandlers } from "./wiring/wheretheiss.js";
import { coinloreHandlers } from "./wiring/coinlore.js";
import { openmeteoAirqualityHandlers } from "./wiring/openmeteo-airquality.js";
import { officialjokeHandlers } from "./wiring/officialjoke.js";
import { multiavatarHandlers } from "./wiring/multiavatar.js";
import { openmeteoFloodHandlers } from "./wiring/openmeteo-flood.js";
import { diseaseshHandlers } from "./wiring/diseasesh.js";
import { fishwatchHandlers } from "./wiring/fishwatch.js";
import { newtonHandlers } from "./wiring/newton.js";
import { placebearHandlers } from "./wiring/placebear.js";
import { countryisHandlers } from "./wiring/countryis.js";
import { openmeteoHistoricalHandlers } from "./wiring/openmeteo-historical.js";
import { ukpoliceHandlers } from "./wiring/ukpolice.js";
import { memegenHandlers } from "./wiring/memegen.js";
import { timeapiHandlers } from "./wiring/timeapi.js";
import { postcodesHandlers } from "./wiring/postcodes.js";
import { openmeteoClimateHandlers } from "./wiring/openmeteo-climate.js";
import { gbifHandlers } from "./wiring/gbif.js";
import { crossrefHandlers } from "./wiring/crossref.js";
import { nominatimHandlers } from "./wiring/nominatim.js";
import { coincapHandlers } from "./wiring/coincap.js";
import { openElevationHandlers } from "./wiring/open-elevation.js";
import { itisHandlers } from "./wiring/itis.js";
import { arxivHandlers } from "./wiring/arxiv.js";
import { openalexHandlers } from "./wiring/openalex.js";
import { dblpHandlers } from "./wiring/dblp.js";
import { wikidataHandlers } from "./wiring/wikidata.js";
import { randomduckHandlers } from "./wiring/randomduck.js";
import { httpdogHandlers } from "./wiring/httpdog.js";
import { openskyHandlers } from "./wiring/opensky.js";
import { cvecirclHandlers } from "./wiring/cvecircl.js";
import { vatcomplyHandlers } from "./wiring/vatcomply.js";
import { thecolorapiHandlers } from "./wiring/thecolorapi.js";
import { placeholdHandlers } from "./wiring/placehold.js";
import { languagetoolHandlers } from "./wiring/languagetool.js";
import { bgpviewHandlers } from "./wiring/bgpview.js";
import { mymemoryHandlers } from "./wiring/mymemory.js";
import { openchargemapHandlers } from "./wiring/openchargemap.js";
import { cratesHandlers } from "./wiring/crates.js";
import { npmRegistryHandlers } from "./wiring/npm-registry.js";
import { pypiHandlers } from "./wiring/pypi.js";
import { rdapHandlers } from "./wiring/rdap.js";
import { ibanHandlers } from "./wiring/iban.js";
import { stackexchangeHandlers } from "./wiring/stackexchange.js";
import { ripeHandlers } from "./wiring/ripe.js";
import { gutendexHandlers } from "./wiring/gutendex.js";
import { dohdnsHandlers } from "./wiring/dohdns.js";
import { nhtsaHandlers } from "./wiring/nhtsa.js";
import { geojsHandlers } from "./wiring/geojs.js";
import { isupHandlers } from "./wiring/isup.js";
import { waybackHandlers } from "./wiring/wayback.js";
import { oeisHandlers } from "./wiring/oeis.js";
import { upcitemdbHandlers } from "./wiring/upcitemdb.js";
import { fakerapiHandlers } from "./wiring/fakerapi.js";
import { openfigiHandlers } from "./wiring/openfigi.js";
import { libretranslateHandlers } from "./wiring/libretranslate.js";
import { europeanaHandlers } from "./wiring/europeana.js";
import { flyoverHandlers } from "./wiring/flyover.js";
import { jsoncrackHandlers } from "./wiring/jsoncrack.js";
import { abstractHolidaysHandlers } from "./wiring/abstract-holidays.js";
import { cocktaildb2Handlers } from "./wiring/cocktaildb2.js";
import { regexrHandlers } from "./wiring/regexr.js";
import { hashgenHandlers } from "./wiring/hashgen.js";
import { base64Handlers } from "./wiring/base64.js";
import { urlencodeHandlers } from "./wiring/urlencode.js";
import { crontabHandlers } from "./wiring/crontab.js";
import { jwtHandlers } from "./wiring/jwt.js";
import { markdownHandlers } from "./wiring/markdown.js";
import { cidrHandlers } from "./wiring/cidr.js";
import { semverHandlers } from "./wiring/semver.js";
import { colorconvertHandlers } from "./wiring/colorconvert.js";
import { epochHandlers } from "./wiring/epoch.js";
import { difftextHandlers } from "./wiring/difftext.js";
import { passwordgenHandlers } from "./wiring/passwordgen.js";
import { slugHandlers } from "./wiring/slug.js";
import { lorem2Handlers } from "./wiring/lorem2.js";
import { csvparseHandlers } from "./wiring/csvparse.js";
import { wordcountHandlers } from "./wiring/wordcount.js";
import { jsonformatHandlers } from "./wiring/jsonformat.js";
import { htmlstripHandlers } from "./wiring/htmlstrip.js";
import { uuidgenHandlers } from "./wiring/uuidgen.js";
import { charcountHandlers } from "./wiring/charcount.js";
import { ipvalidateHandlers } from "./wiring/ipvalidate.js";
import { stringcaseHandlers } from "./wiring/stringcase.js";
import { aspectratioHandlers } from "./wiring/aspectratio.js";
import { percentageHandlers } from "./wiring/percentage.js";
import { romanHandlers } from "./wiring/roman.js";
import { morseHandlers } from "./wiring/morse.js";
import { binaryconvHandlers } from "./wiring/binaryconv.js";
import { levenshteinHandlers } from "./wiring/levenshtein.js";
import { loremnameHandlers } from "./wiring/loremname.js";
import { textstatsHandlers } from "./wiring/textstats.js";
import { timezoneHandlers } from "./wiring/timezone.js";
import { colorblendHandlers } from "./wiring/colorblend.js";
import { fibonacciHandlers } from "./wiring/fibonacci.js";
import { primecheckHandlers } from "./wiring/primecheck.js";
import { sortlinesHandlers } from "./wiring/sortlines.js";
import { countdowncalcHandlers } from "./wiring/countdowncalc.js";
import { unitpressureHandlers } from "./wiring/unitpressure.js";
import { emojilookupHandlers } from "./wiring/emojilookup.js";
import { natoalphabetHandlers } from "./wiring/natoalphabet.js";
import { bitwiseHandlers } from "./wiring/bitwise.js";
import { gcdlcmHandlers } from "./wiring/gcdlcm.js";
import { tempconvertHandlers } from "./wiring/tempconvert.js";
import { statisticsHandlers } from "./wiring/statistics.js";
import { textwrapHandlers } from "./wiring/textwrap.js";
import { brailleHandlers } from "./wiring/braille.js";
import { piglatinHandlers } from "./wiring/piglatin.js";
import { rot13Handlers } from "./wiring/rot13.js";
import { reversetextHandlers } from "./wiring/reversetext.js";
import { palindromeHandlers } from "./wiring/palindrome.js";
import { acronymgenHandlers } from "./wiring/acronymgen.js";
import { wordfreqHandlers } from "./wiring/wordfreq.js";
import { markdowntableHandlers } from "./wiring/markdowntable.js";
import { runlengthHandlers } from "./wiring/runlength.js";
import { luhnHandlers } from "./wiring/luhn.js";
import { charcodesHandlers } from "./wiring/charcodes.js";
import { soundexHandlers } from "./wiring/soundex.js";
import { frequencyHandlers } from "./wiring/frequency.js";
import { entropyHandlers } from "./wiring/entropy.js";
import { ngramHandlers } from "./wiring/ngram.js";
import { camelsnakeHandlers } from "./wiring/camelsnake.js";
import { metaphoneHandlers } from "./wiring/metaphone.js";
import { tfidfHandlers } from "./wiring/tfidf.js";
import { readabilityHandlers } from "./wiring/readability.js";
import { tokencountHandlers } from "./wiring/tokencount.js";
import { crc32Handlers } from "./wiring/crc32.js";
import { jaccardHandlers } from "./wiring/jaccard.js";
import { hammingHandlers } from "./wiring/hamming.js";
import { cosinesimHandlers } from "./wiring/cosinesim.js";
import { damerauHandlers } from "./wiring/damerau.js";
import { markovHandlers } from "./wiring/markov.js";
import { vigenereHandlers } from "./wiring/vigenere.js";
import { atbashHandlers } from "./wiring/atbash.js";
import { railfenceHandlers } from "./wiring/railfence.js";
import { phoneticHandlers } from "./wiring/phonetic.js";
import { matrixHandlers } from "./wiring/matrix.js";
import { setopsHandlers } from "./wiring/setops.js";
import { collatzHandlers } from "./wiring/collatz.js";
import { pascaltriHandlers } from "./wiring/pascaltri.js";
import { histogramHandlers } from "./wiring/histogram.js";
import { regressionHandlers } from "./wiring/regression.js";
import { baseconvertHandlers } from "./wiring/baseconvert.js";
import { gcdHandlers } from "./wiring/gcd.js";
import { permutationHandlers } from "./wiring/permutation.js";
import { combinationHandlers } from "./wiring/combination.js";
import { proportionHandlers } from "./wiring/proportion.js";
import { quadraticHandlers } from "./wiring/quadratic.js";
import { primefactorHandlers } from "./wiring/primefactor.js";
import { zscoreHandlers } from "./wiring/zscore.js";
import { angleconvHandlers } from "./wiring/angleconv.js";
import { polygonHandlers } from "./wiring/polygon.js";
import { sigmoidHandlers } from "./wiring/sigmoid.js";
import { interpolateHandlers } from "./wiring/interpolate.js";
import { modpowHandlers } from "./wiring/modpow.js";
import { ratiosimplifyHandlers } from "./wiring/ratiosimplify.js";
import { binomprobHandlers } from "./wiring/binomprob.js";
import { normaldistrHandlers } from "./wiring/normaldistr.js";
import { trianglesolveHandlers } from "./wiring/trianglesolve.js";
import { standardformHandlers } from "./wiring/standardform.js";
import { complexnumHandlers } from "./wiring/complexnum.js";
import { wavelengthHandlers } from "./wiring/wavelength.js";
import { midpointHandlers } from "./wiring/midpoint.js";
import { slopeinterceptHandlers } from "./wiring/slopeintercept.js";
import { logbaseHandlers } from "./wiring/logbase.js";
import { nthrootHandlers } from "./wiring/nthroot.js";
import { areacalcHandlers } from "./wiring/areacalc.js";
import { dotproductHandlers } from "./wiring/dotproduct.js";
import { crossproductHandlers } from "./wiring/crossproduct.js";
import { weightedmeanHandlers } from "./wiring/weightedmean.js";
import { variancecalcHandlers } from "./wiring/variancecalc.js";
import { poissonHandlers } from "./wiring/poisson.js";
import { expgrowthHandlers } from "./wiring/expgrowth.js";
import { geomseriesHandlers } from "./wiring/geomseries.js";
import { harmonicseriesHandlers } from "./wiring/harmonicseries.js";
import { piapproxHandlers } from "./wiring/piapprox.js";
import { taylorHandlers } from "./wiring/taylor.js";
import { nasaHandlers } from "./wiring/nasa.js";
import { openmeteoHandlers } from "./wiring/openmeteo.js";
import { radiobrowserHandlers } from "./wiring/radiobrowser.js";
import { gdeltHandlers } from "./wiring/gdelt.js";
import { numbersHandlers } from "./wiring/numbers.js";
import { omdbHandlers } from "./wiring/omdb.js";
import { openlibraryHandlers } from "./wiring/openlibrary.js";
import { musicbrainzHandlers } from "./wiring/musicbrainz.js";
import { geniusHandlers } from "./wiring/genius.js";
import { ticketmasterHandlers } from "./wiring/ticketmaster.js";
import { seatgeekHandlers } from "./wiring/seatgeek.js";
import { eventbriteHandlers } from "./wiring/eventbrite.js";
import { foursquareHandlers } from "./wiring/foursquare.js";
import { lastfmHandlers } from "./wiring/lastfm.js";
import { discogsHandlers } from "./wiring/discogs.js";
import { setlistfmHandlers } from "./wiring/setlistfm.js";
import { bandsintownHandlers } from "./wiring/bandsintown.js";
import { podcastindexHandlers } from "./wiring/podcastindex.js";
import { lichessHandlers } from "./wiring/lichess.js";
import { chessdotcomHandlers } from "./wiring/chessdotcom.js";
import { fplHandlers } from "./wiring/fpl.js";
import { guardianHandlers } from "./wiring/guardian.js";
import { newsapiHandlers } from "./wiring/newsapi.js";
import { alphavantageHandlers } from "./wiring/alphavantage.js";
import { coingeckoHandlers } from "./wiring/coingecko.js";
import { coinmarketcapHandlers } from "./wiring/coinmarketcap.js";
import { openexchangeratesHandlers } from "./wiring/openexchangerates.js";
import { wiseHandlers } from "./wiring/wise.js";
import { ipapiHandlers } from "./wiring/ipapi.js";
import { restcountriesHandlers } from "./wiring/restcountries.js";
import { tomorrowioHandlers } from "./wiring/tomorrowio.js";
import { twitchHandlers } from "./wiring/twitch.js";
import { redditHandlers } from "./wiring/reddit.js";
import { mastodonHandlers } from "./wiring/mastodon.js";
import { blueskyHandlers } from "./wiring/bluesky.js";
import { discordHandlers } from "./wiring/discord.js";
import { slackHandlers } from "./wiring/slack.js";
import { telegramHandlers } from "./wiring/telegram.js";
import { lineHandlers } from "./wiring/line.js";
import { figmaHandlers } from "./wiring/figma.js";
import { amazonHandlers } from "./wiring/amazon.js";
import { shopifyHandlers } from "./wiring/shopify.js";
import { yelpHandlers } from "./wiring/yelp.js";
import { xeroHandlers } from "./wiring/xero.js";
import { ebayHandlers } from "./wiring/ebay.js";
import { etsyHandlers } from "./wiring/etsy.js";
import { stripeHandlers } from "./wiring/stripe.js";
import { paypalHandlers } from "./wiring/paypal.js";
import { squareHandlers } from "./wiring/square.js";
import { quickbooksHandlers } from "./wiring/quickbooks.js";
import { plaidHandlers } from "./wiring/plaid.js";
import { woocommerceHandlers } from "./wiring/woocommerce.js";
import { csuiteHandlers } from "./wiring/csuite.js";
import { qcHandlers } from "./wiring/qc.js";
import { vaultHandlers } from "./wiring/vault.js";
import { keychainHandlers } from "./wiring/keychain.js";
import { githubHandlers } from "./wiring/github.js";
import { gitlabHandlers } from "./wiring/gitlab.js";
import { clickupHandlers } from "./wiring/clickup.js";
import { linearHandlers } from "./wiring/linear.js";
import { airtableHandlers } from "./wiring/airtable.js";
import { trelloHandlers } from "./wiring/trello.js";
import { sentryHandlers } from "./wiring/sentry.js";
import { postmanHandlers } from "./wiring/postman.js";
import { twilioHandlers } from "./wiring/twilio.js";
import { pushoverHandlers } from "./wiring/pushover.js";
import { whatsappHandlers } from "./wiring/whatsapp.js";
import { youtubeHandlers } from "./wiring/youtube.js";
import { spotifyHandlers } from "./wiring/spotify.js";
import { higgsfieldHandlers } from "./wiring/higgsfield.js";
import { heygenHandlers } from "./wiring/heygen.js";
import { runwayHandlers } from "./wiring/runway.js";
import { pikaHandlers } from "./wiring/pika.js";
import { klingHandlers } from "./wiring/kling.js";
import { elevenlabsHandlers } from "./wiring/elevenlabs.js";
import { replicateHandlers } from "./wiring/replicate.js";
import { stabilityHandlers } from "./wiring/stability.js";
import { openaiHandlers } from "./wiring/openai.js";
import { anthropicHandlers } from "./wiring/anthropic.js";
import { asanaHandlers } from "./wiring/asana.js";
import { mondayHandlers } from "./wiring/monday.js";
import { calendlyHandlers } from "./wiring/calendly.js";
import { pinterestHandlers } from "./wiring/pinterest.js";
import { tiktokHandlers } from "./wiring/tiktok.js";
import { steamHandlers } from "./wiring/steam.js";
import { igdbHandlers } from "./wiring/igdb.js";
import { speedrunHandlers } from "./wiring/speedrun.js";
import { exchangerateHandlers } from "./wiring/exchangerate.js";
import { mailchimpHandlers } from "./wiring/mailchimp.js";
import { sendgridHandlers } from "./wiring/sendgrid.js";
import { mapboxHandlers } from "./wiring/mapbox.js";
import { algoliaHandlers } from "./wiring/algolia.js";
import { pineconeHandlers } from "./wiring/pinecone.js";
import { mixpanelHandlers } from "./wiring/mixpanel.js";
import { hubspotHandlers } from "./wiring/hubspot.js";
import { jiraHandlers } from "./wiring/jira.js";
import { jobsmithHandlers } from "./wiring/jobsmith.js";
import { contentfulHandlers } from "./wiring/contentful.js";
import { webflowHandlers } from "./wiring/webflow.js";
import { digitaloceanHandlers } from "./wiring/digitalocean.js";
import { todoistHandlers } from "./wiring/todoist.js";
import { pipedriveHandlers } from "./wiring/pipedrive.js";
import { confluenceHandlers } from "./wiring/confluence.js";
import { unsplashHandlers } from "./wiring/unsplash.js";
import { giphyHandlers } from "./wiring/giphy.js";
import { miroHandlers } from "./wiring/miro.js";
import { shortcutHandlers } from "./wiring/shortcut.js";
import { wikipediaHandlers } from "./wiring/wikipedia.js";
import { codaHandlers } from "./wiring/coda.js";
import { brevoHandlers } from "./wiring/brevo.js";
import { uptimerobotHandlers } from "./wiring/uptimerobot.js";
import { dropboxHandlers } from "./wiring/dropbox.js";
import { gmailHandlers } from "./wiring/gmail.js";
import { googleDriveHandlers } from "./wiring/google-drive.js";
import { onedriveHandlers } from "./wiring/onedrive.js";
import { bitbucketHandlers } from "./wiring/bitbucket.js";
import { cloudinaryHandlers } from "./wiring/cloudinary.js";
import { wordpressHandlers } from "./wiring/wordpress.js";
import { ghostHandlers } from "./wiring/ghost.js";
import { klaviyoHandlers } from "./wiring/klaviyo.js";
import { zendeskHandlers } from "./wiring/zendesk.js";
import { intercomHandlers } from "./wiring/intercom.js";
import { typeformHandlers } from "./wiring/typeform.js";
import { calcomHandlers } from "./wiring/calcom.js";
import { posthogHandlers } from "./wiring/posthog.js";
import { netlifyHandlers } from "./wiring/netlify.js";
import { datadogHandlers } from "./wiring/datadog.js";
import { deeplHandlers } from "./wiring/deepl.js";
import { assemblyaiHandlers } from "./wiring/assemblyai.js";
import { groqHandlers } from "./wiring/groq.js";
import { nudgeonlyHandlers } from "./wiring/nudgeonly.js";
import { igniteonlyHandlers } from "./wiring/igniteonly.js";
import { pushonlyHandlers } from "./wiring/pushonly.js";
import { neonHandlers } from "./wiring/neon.js";
import { upstashHandlers } from "./wiring/upstash.js";
import { tursoHandlers } from "./wiring/turso.js";
import { renderHandlers } from "./wiring/render.js";
import { flyioHandlers } from "./wiring/flyio.js";
import { mistralHandlers } from "./wiring/mistral.js";
import { cohereHandlers } from "./wiring/cohere.js";
import { perplexityHandlers } from "./wiring/perplexity.js";
import { lemonsqueezyHandlers } from "./wiring/lemonsqueezy.js";
import { convertkitHandlers } from "./wiring/convertkit.js";
import { pagerdutyHandlers } from "./wiring/pagerduty.js";
import { circleciHandlers } from "./wiring/circleci.js";
import { segmentHandlers } from "./wiring/segment.js";
import { postmarkHandlers } from "./wiring/postmark.js";
import { gumroadHandlers } from "./wiring/gumroad.js";
import { togetheraiHandlers } from "./wiring/togetherai.js";
import { testpassHandlers } from "./wiring/testpass.js";
import { commonsensepassHandlers } from "./wiring/commonsensepass.js";
import { xpassAggregatedVerdictHandlers } from "./wiring/xpass-aggregated-verdict.js";
import { legalpassHandlers } from "./wiring/legalpass.js";
import { uxpassHandlers } from "./wiring/uxpass.js";
import { seopassHandlers } from "./wiring/seopass.js";
import { geopassHandlers } from "./wiring/geopass.js";
import { compliancepassHandlers } from "./wiring/compliancepass.js";
import { flowpassHandlers } from "./wiring/flowpass.js";
import { securitypassHandlers } from "./wiring/securitypass.js";
import { copypassHandlers } from "./wiring/copypass.js";
import { sloppassHandlers } from "./wiring/sloppass.js";
import { fidelitycopyHandlers } from "./wiring/fidelitycopy.js";
import { crewsHandlers } from "./wiring/crews.js";

export const ADDITIONAL_HANDLERS: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  ...bggHandlers,
  ...rawgHandlers,
  ...riotHandlers,
  ...bungieHandlers,
  ...supercellHandlers,
  ...legoHandlers,
  ...untappdHandlers,
  ...pandascoreHandlers,
  ...amberHandlers,
  ...willyweatherHandlers,
  ...domainHandlers,
  ...troveHandlers,
  ...australiapostHandlers,
  ...sendleHandlers,
  ...ipaustraliaHandlers,
  ...tabHandlers,
  ...thelottHandlers,
  ...abnHandlers,
  ...ptvHandlers,
  ...nvdHandlers,
  ...hunterHandlers,
  ...haveibeenpwnedHandlers,
  ...virustotalHandlers,
  ...abuseipdbHandlers,
  ...urlscanHandlers,
  ...shodanHandlers,
  ...resendHandlers,
  ...vercelHandlers,
  ...supabaseHandlers,
  ...togglHandlers,
  ...emailHandlers,
  ...usgsHandlers,
  ...openaqHandlers,
  ...openfoodfactsHandlers,
  ...ebirdHandlers,
  ...carboninterfaceHandlers,
  ...toiletsHandlers,
  ...calculatorHandlers,
  ...unitConverterHandlers,
  ...datetimeHandlers,
  ...textHandlers,
  ...mealHandlers,
  ...espnHandlers,
  ...sleeperHandlers,
  ...deezerHandlers,
  ...colorHandlers,
  ...randomHandlers,
  ...notionHandlers,
  ...readwiseHandlers,
  ...raindropHandlers,
  ...clockifyHandlers,
  ...splitwiseHandlers,
  ...instapaperHandlers,
  ...monicaHandlers,
  ...feedlyHandlers,
  ...hackernewsHandlers,
  ...openf1Handlers,
  ...tmdbHandlers,
  ...triviaHandlers,
  ...pokeapiHandlers,
  ...cocktailHandlers,
  ...dictionaryHandlers,
  ...jokeHandlers,
  ...holidaysHandlers,
  ...dogceoHandlers,
  ...rickandmortyHandlers,
  ...xkcdHandlers,
  ...breweryHandlers,
  ...jikanHandlers,
  ...chucknorrisHandlers,
  ...catfactsHandlers,
  ...swapiHandlers,
  ...dnd5eHandlers,
  ...deckofcardsHandlers,
  ...adviceslipHandlers,
  ...agifyHandlers,
  ...quotableHandlers,
  ...boredHandlers,
  ...superheroHandlers,
  ...opennotifyHandlers,
  ...tarotHandlers,
  ...aoe2Handlers,
  ...affirmationHandlers,
  ...jsonplaceholderHandlers,
  ...picsumHandlers,
  ...bibleHandlers,
  ...frankfurterHandlers,
  ...zenquotesHandlers,
  ...kanyeHandlers,
  ...dadjokeHandlers,
  ...uselessfactsHandlers,
  ...randomfoxHandlers,
  ...httpbinHandlers,
  ...reqresHandlers,
  ...corporatebsHandlers,
  ...worldtimeHandlers,
  ...sunrisesunsetHandlers,
  ...zippopotamusHandlers,
  ...yesnoHandlers,
  ...evilinsultHandlers,
  ...dogapiHandlers,
  ...apifootballHandlers,
  ...catapiHandlers,
  ...spaceflightHandlers,
  ...archiveorgHandlers,
  ...ipifyHandlers,
  ...exchangerate2Handlers,
  ...makeupHandlers,
  ...githubEmojiHandlers,
  ...metmuseumHandlers,
  ...loremHandlers,
  ...placekittenHandlers,
  ...shibeHandlers,
  ...cataasHandlers,
  ...punkapiHandlers,
  ...colormindHandlers,
  ...dummyjsonHandlers,
  ...excuserHandlers,
  ...dogfactsHandlers,
  ...amiiboHandlers,
  ...dummyimageHandlers,
  ...ipinfoHandlers,
  ...ghibliHandlers,
  ...finalspaceHandlers,
  ...mcsrvstatHandlers,
  ...disneyapiHandlers,
  ...harrypotterHandlers,
  ...emojihubHandlers,
  ...avatarapiHandlers,
  ...robohashHandlers,
  ...openlib2Handlers,
  ...countryflagHandlers,
  ...mediawikiHandlers,
  ...bibleverseHandlers,
  ...urlhausHandlers,
  ...tvmazeHandlers,
  ...freetogameHandlers,
  ...cheapsharkHandlers,
  ...isevenHandlers,
  ...iceandfireHandlers,
  ...randomuserHandlers,
  ...digimonHandlers,
  ...stapiHandlers,
  ...breakingbadHandlers,
  ...tacofancyHandlers,
  ...publicapisHandlers,
  ...wgerHandlers,
  ...animechanHandlers,
  ...lotrHandlers,
  ...coinpaprikaHandlers,
  ...openfdaHandlers,
  ...funtranslationsHandlers,
  ...datamuseHandlers,
  ...balldontlieHandlers,
  ...worldbankHandlers,
  ...carbonintensityHandlers,
  ...lyricsHandlers,
  ...urbandictionaryHandlers,
  ...nobelprizeHandlers,
  ...universitiesHandlers,
  ...fakestoreapiHandlers,
  ...mtgHandlers,
  ...domainsdbHandlers,
  ...pokemontcgHandlers,
  ...spacexHandlers,
  ...genderizeHandlers,
  ...nationalizeHandlers,
  ...qrserverHandlers,
  ...solarsystemHandlers,
  ...pubchemHandlers,
  ...openmeteoMarineHandlers,
  ...opentriviadbHandlers,
  ...ipaddrinfoHandlers,
  ...dicewareHandlers,
  ...colornamesHandlers,
  ...mhwdbHandlers,
  ...exchangerate3Handlers,
  ...jishoHandlers,
  ...colrHandlers,
  ...gameoflifeHandlers,
  ...fruityviceHandlers,
  ...opendotaHandlers,
  ...articHandlers,
  ...imgflipHandlers,
  ...foodishHandlers,
  ...acnhapiHandlers,
  ...httpcatHandlers,
  ...poetrydbHandlers,
  ...citybikesHandlers,
  ...wheretheissHandlers,
  ...coinloreHandlers,
  ...openmeteoAirqualityHandlers,
  ...officialjokeHandlers,
  ...multiavatarHandlers,
  ...openmeteoFloodHandlers,
  ...diseaseshHandlers,
  ...fishwatchHandlers,
  ...newtonHandlers,
  ...placebearHandlers,
  ...countryisHandlers,
  ...openmeteoHistoricalHandlers,
  ...ukpoliceHandlers,
  ...memegenHandlers,
  ...timeapiHandlers,
  ...postcodesHandlers,
  ...openmeteoClimateHandlers,
  ...gbifHandlers,
  ...crossrefHandlers,
  ...nominatimHandlers,
  ...coincapHandlers,
  ...openElevationHandlers,
  ...itisHandlers,
  ...arxivHandlers,
  ...openalexHandlers,
  ...dblpHandlers,
  ...wikidataHandlers,
  ...randomduckHandlers,
  ...httpdogHandlers,
  ...openskyHandlers,
  ...cvecirclHandlers,
  ...vatcomplyHandlers,
  ...thecolorapiHandlers,
  ...placeholdHandlers,
  ...languagetoolHandlers,
  ...bgpviewHandlers,
  ...mymemoryHandlers,
  ...openchargemapHandlers,
  ...cratesHandlers,
  ...npmRegistryHandlers,
  ...pypiHandlers,
  ...rdapHandlers,
  ...ibanHandlers,
  ...stackexchangeHandlers,
  ...ripeHandlers,
  ...gutendexHandlers,
  ...dohdnsHandlers,
  ...nhtsaHandlers,
  ...geojsHandlers,
  ...isupHandlers,
  ...waybackHandlers,
  ...oeisHandlers,
  ...upcitemdbHandlers,
  ...fakerapiHandlers,
  ...openfigiHandlers,
  ...libretranslateHandlers,
  ...europeanaHandlers,
  ...flyoverHandlers,
  ...jsoncrackHandlers,
  ...abstractHolidaysHandlers,
  ...cocktaildb2Handlers,
  ...regexrHandlers,
  ...hashgenHandlers,
  ...base64Handlers,
  ...urlencodeHandlers,
  ...crontabHandlers,
  ...jwtHandlers,
  ...markdownHandlers,
  ...cidrHandlers,
  ...semverHandlers,
  ...colorconvertHandlers,
  ...epochHandlers,
  ...difftextHandlers,
  ...passwordgenHandlers,
  ...slugHandlers,
  ...lorem2Handlers,
  ...csvparseHandlers,
  ...wordcountHandlers,
  ...jsonformatHandlers,
  ...htmlstripHandlers,
  ...uuidgenHandlers,
  ...charcountHandlers,
  ...ipvalidateHandlers,
  ...stringcaseHandlers,
  ...aspectratioHandlers,
  ...percentageHandlers,
  ...romanHandlers,
  ...morseHandlers,
  ...binaryconvHandlers,
  ...levenshteinHandlers,
  ...loremnameHandlers,
  ...textstatsHandlers,
  ...timezoneHandlers,
  ...colorblendHandlers,
  ...fibonacciHandlers,
  ...primecheckHandlers,
  ...sortlinesHandlers,
  ...countdowncalcHandlers,
  ...unitpressureHandlers,
  ...emojilookupHandlers,
  ...natoalphabetHandlers,
  ...bitwiseHandlers,
  ...gcdlcmHandlers,
  ...tempconvertHandlers,
  ...statisticsHandlers,
  ...textwrapHandlers,
  ...brailleHandlers,
  ...piglatinHandlers,
  ...rot13Handlers,
  ...reversetextHandlers,
  ...palindromeHandlers,
  ...acronymgenHandlers,
  ...wordfreqHandlers,
  ...markdowntableHandlers,
  ...runlengthHandlers,
  ...luhnHandlers,
  ...charcodesHandlers,
  ...soundexHandlers,
  ...frequencyHandlers,
  ...entropyHandlers,
  ...ngramHandlers,
  ...camelsnakeHandlers,
  ...metaphoneHandlers,
  ...tfidfHandlers,
  ...readabilityHandlers,
  ...tokencountHandlers,
  ...crc32Handlers,
  ...jaccardHandlers,
  ...hammingHandlers,
  ...cosinesimHandlers,
  ...damerauHandlers,
  ...markovHandlers,
  ...vigenereHandlers,
  ...atbashHandlers,
  ...railfenceHandlers,
  ...phoneticHandlers,
  ...matrixHandlers,
  ...setopsHandlers,
  ...collatzHandlers,
  ...pascaltriHandlers,
  ...histogramHandlers,
  ...regressionHandlers,
  ...baseconvertHandlers,
  ...gcdHandlers,
  ...permutationHandlers,
  ...combinationHandlers,
  ...proportionHandlers,
  ...quadraticHandlers,
  ...primefactorHandlers,
  ...zscoreHandlers,
  ...angleconvHandlers,
  ...polygonHandlers,
  ...sigmoidHandlers,
  ...interpolateHandlers,
  ...modpowHandlers,
  ...ratiosimplifyHandlers,
  ...binomprobHandlers,
  ...normaldistrHandlers,
  ...trianglesolveHandlers,
  ...standardformHandlers,
  ...complexnumHandlers,
  ...wavelengthHandlers,
  ...midpointHandlers,
  ...slopeinterceptHandlers,
  ...logbaseHandlers,
  ...nthrootHandlers,
  ...areacalcHandlers,
  ...dotproductHandlers,
  ...crossproductHandlers,
  ...weightedmeanHandlers,
  ...variancecalcHandlers,
  ...poissonHandlers,
  ...expgrowthHandlers,
  ...geomseriesHandlers,
  ...harmonicseriesHandlers,
  ...piapproxHandlers,
  ...taylorHandlers,
  ...nasaHandlers,
  ...openmeteoHandlers,
  ...radiobrowserHandlers,
  ...gdeltHandlers,
  ...numbersHandlers,
  ...omdbHandlers,
  ...openlibraryHandlers,
  ...musicbrainzHandlers,
  ...geniusHandlers,
  ...ticketmasterHandlers,
  ...seatgeekHandlers,
  ...eventbriteHandlers,
  ...foursquareHandlers,
  ...lastfmHandlers,
  ...discogsHandlers,
  ...setlistfmHandlers,
  ...bandsintownHandlers,
  ...podcastindexHandlers,
  ...lichessHandlers,
  ...chessdotcomHandlers,
  ...fplHandlers,
  ...guardianHandlers,
  ...newsapiHandlers,
  ...alphavantageHandlers,
  ...coingeckoHandlers,
  ...coinmarketcapHandlers,
  ...openexchangeratesHandlers,
  ...wiseHandlers,
  ...ipapiHandlers,
  ...restcountriesHandlers,
  ...tomorrowioHandlers,
  ...twitchHandlers,
  ...redditHandlers,
  ...mastodonHandlers,
  ...blueskyHandlers,
  ...discordHandlers,
  ...slackHandlers,
  ...telegramHandlers,
  ...lineHandlers,
  ...figmaHandlers,
  ...amazonHandlers,
  ...shopifyHandlers,
  ...yelpHandlers,
  ...xeroHandlers,
  ...ebayHandlers,
  ...etsyHandlers,
  ...stripeHandlers,
  ...paypalHandlers,
  ...squareHandlers,
  ...quickbooksHandlers,
  ...plaidHandlers,
  ...woocommerceHandlers,
  ...csuiteHandlers,
  ...qcHandlers,
  ...vaultHandlers,
  ...keychainHandlers,
  ...githubHandlers,
  ...gitlabHandlers,
  ...clickupHandlers,
  ...linearHandlers,
  ...airtableHandlers,
  ...trelloHandlers,
  ...sentryHandlers,
  ...postmanHandlers,
  ...twilioHandlers,
  ...pushoverHandlers,
  ...whatsappHandlers,
  ...youtubeHandlers,
  ...spotifyHandlers,
  ...higgsfieldHandlers,
  ...heygenHandlers,
  ...runwayHandlers,
  ...pikaHandlers,
  ...klingHandlers,
  ...elevenlabsHandlers,
  ...replicateHandlers,
  ...stabilityHandlers,
  ...openaiHandlers,
  ...anthropicHandlers,
  ...asanaHandlers,
  ...mondayHandlers,
  ...calendlyHandlers,
  ...pinterestHandlers,
  ...tiktokHandlers,
  ...steamHandlers,
  ...igdbHandlers,
  ...speedrunHandlers,
  ...exchangerateHandlers,
  ...mailchimpHandlers,
  ...sendgridHandlers,
  ...mapboxHandlers,
  ...algoliaHandlers,
  ...pineconeHandlers,
  ...mixpanelHandlers,
  ...hubspotHandlers,
  ...jiraHandlers,
  ...jobsmithHandlers,
  ...contentfulHandlers,
  ...webflowHandlers,
  ...digitaloceanHandlers,
  ...todoistHandlers,
  ...pipedriveHandlers,
  ...confluenceHandlers,
  ...unsplashHandlers,
  ...giphyHandlers,
  ...miroHandlers,
  ...shortcutHandlers,
  ...wikipediaHandlers,
  ...codaHandlers,
  ...brevoHandlers,
  ...uptimerobotHandlers,
  ...dropboxHandlers,
  ...gmailHandlers,
  ...googleDriveHandlers,
  ...onedriveHandlers,
  ...bitbucketHandlers,
  ...cloudinaryHandlers,
  ...wordpressHandlers,
  ...ghostHandlers,
  ...klaviyoHandlers,
  ...zendeskHandlers,
  ...intercomHandlers,
  ...typeformHandlers,
  ...calcomHandlers,
  ...posthogHandlers,
  ...netlifyHandlers,
  ...datadogHandlers,
  ...deeplHandlers,
  ...assemblyaiHandlers,
  ...groqHandlers,
  ...nudgeonlyHandlers,
  ...igniteonlyHandlers,
  ...pushonlyHandlers,
  ...neonHandlers,
  ...upstashHandlers,
  ...tursoHandlers,
  ...renderHandlers,
  ...flyioHandlers,
  ...mistralHandlers,
  ...cohereHandlers,
  ...perplexityHandlers,
  ...lemonsqueezyHandlers,
  ...convertkitHandlers,
  ...pagerdutyHandlers,
  ...circleciHandlers,
  ...segmentHandlers,
  ...postmarkHandlers,
  ...gumroadHandlers,
  ...togetheraiHandlers,
  ...testpassHandlers,
  ...commonsensepassHandlers,
  ...xpassAggregatedVerdictHandlers,
  ...legalpassHandlers,
  ...uxpassHandlers,
  ...seopassHandlers,
  ...geopassHandlers,
  ...compliancepassHandlers,
  ...flowpassHandlers,
  ...securitypassHandlers,
  ...copypassHandlers,
  ...sloppassHandlers,
  ...fidelitycopyHandlers,
  ...crewsHandlers,
};
