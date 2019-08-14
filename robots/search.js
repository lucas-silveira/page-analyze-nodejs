const { google } = require('googleapis')
const customSearch = google.customsearch('v1')
const googleSearchCredentials = {
    apiKey: process.env.GOOGLE_API_KEY,
    searchEngineId: process.env.GOOGLE_SEARCH_ENGINE_ID
}

async function robot(webpage) {

    await getGoogleSearchPosition(webpage)

    async function getGoogleSearchPosition(webpage) {
        const query = webpage.keyword
        webpage.searchPosition = await fetchGoogleAndReturnPosition(query, webpage)
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