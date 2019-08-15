const SerpWow = require('google-search-results-serpwow')
const serpwow = new SerpWow(process.env.SERPWOW_API_KEY)

async function robot(webpage) {

    await getGoogleSearchPosition(webpage)
    calculeTotalRate(webpage)

    async function getGoogleSearchPosition(webpage) {
        const query = webpage.keyword
        webpage.pageSearchRank = await fetchGoogleAndReturnPosition(query, webpage)
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

    function calculeTotalRate(webpage) {
        const totalRate = webpage.params.totalRate

        if (typeof webpage.pageSearchRank === 'number' && webpage.pageSearchRank < 11)
            totalRate = 9 + totalRate/10
        
        webpage.params.totalRate = totalRate
    }
}

module.exports = robot