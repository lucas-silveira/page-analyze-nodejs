const SerpWow = require('google-search-results-serpwow')
const serpwow = new SerpWow('BDC08D9390754BD0B1C64C3D54E6C9EB')

async function robot(webpage) {

    await getGoogleSearchPosition(webpage)

    async function getGoogleSearchPosition(webpage) {
        const query = webpage.keyword
        webpage.searchPosition = await fetchGoogleAndReturnPosition(query, webpage)
    }

    async function fetchGoogleAndReturnPosition(query, webpage) {
        const response = await serpwow.json({
            q: query,
            gl: 'br',
            hl: 'pt',
            location: 'Campinas,State of Sao Paulo,Brazil',
            google_domain: 'google.com.br',
            num: 100
        })
        const pageTargetPosition = response.organic_results.filter( item => {
            return item.link.indexOf(webpage.sanitizedUrl) > -1
        })
        const position = pageTargetPosition[0].position

        return position > 0 ? position : 'N/A'
    }
}

module.exports = robot