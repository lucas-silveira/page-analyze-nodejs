const startPageAnalyzeApi = require('../../index.js')

module.exports = {
    async getData(req, res) {
        const {url, keyword} = req.query
        const dataAnalyze = await startPageAnalyzeApi(url, keyword)

        return res.json(dataAnalyze)
    }
}