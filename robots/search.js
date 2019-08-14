const { google } = require('googleapis')
const customSearch = google.customsearch('v1')
const googleSearchCredentials = require('../credentials/google-search.json')

async function robot(webpage) {
    await getGoogleSearchPosition(webpage)

    async function getGoogleSearchPosition(webpage) {
        const query = webpage.keyword
        webpage.searchRankPosition = await fetchGoogleAndReturnPosition(query, webpage)
    }

    async function fetchGoogleAndReturnPosition(query, webpage) {
        const response = await customSearch.cse.list({
            auth: googleSearchCredentials.apiKey,
            cx: googleSearchCredentials.searchEngineId,
            q: query,
            gl: 'br',
            lr: 'lang_pt'
        })

        const pageTargetPosition = response.data.items.findIndex( item => {
            return item.link.indexOf(webpage.sanitizedUrl) > -1
        })

        return pageTargetPosition
    }
}

module.exports = robot