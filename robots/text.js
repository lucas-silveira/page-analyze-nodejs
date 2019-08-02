// const cheerio = require('cheerio')
const webscrape = require('webscrape')
const htmlEntities = require('html-entities').AllHtmlEntities
const pageres = require('pageres')
const vision = require('@google-cloud/vision')

const client = new vision.ImageAnnotatorClient({
    keyFilename: './credentials/google-cloud-vision.json'
})
// const entities = new htmlEntities()
// const scraper = webscrape.default()

async function robot(webpage) {

    await fetchPageUrlAndReturnScreenshot(webpage)
    await fetchTextFromScreenshot(webpage.urlImage)
    // await fetchContentFromUrl(webpage)
    // sanitizeContent(webpage)

    async function fetchPageUrlAndReturnScreenshot(webpage) {
        try {
            await new pageres({delay: 2, filename: webpage.product, format: 'jpg'})
            .src(webpage.url, ['1280x1024'])
            .dest('./webpage/')
            .run()
    
            webpage.urlImage = `./webpage/${webpage.product}.jpg`
        } catch(err) {
            throw new Error(`Não foi possível capturar o screenshot da página. Motivo: ${err}`)
        }
    }

    async function fetchTextFromScreenshot(urlImage){
        try{
            const result = await client.labelDetection(urlImage)
            const labels = result.labelAnnotations
            console.log('Labels:')
            labels.forEach(label => console.log(label.description))
        } catch(err) {
            console.log(err)
        }
    }

    async function fetchContentFromUrl(webpage) {
        const webPageResponse = await scraper.get(webpage.url)
        const webPageBodyContent = webPageResponse.body
        const $ = cheerio.load(webPageBodyContent)
        const webPageBodyHtml = $('body').html()

        webpage.originalContent = webPageBodyHtml
    }

    function sanitizeContent(webpage) {
        const withoutTagsHtml = removeTagsHtml(webpage.originalContent)

        webpage.sanitizedContent = withoutTagsHtml

        function removeTagsHtml(webpage) {
            const allLines = webpage.match( />[^\n<]+/g)
            const withoutDirtT = allLines.filter( (line) => {
                if( /\t/g.test(line) || />$/g.test(line) )
                    return false
                else
                    return true
            })

            const withoutBlankLinesAndEndTagsHtml = withoutDirtT.map ( (line) => {
                const lineWithoutDirts = line.replace(/^>/g, '')
                return entities.decode(lineWithoutDirts)
            })
            

            console.log(withoutBlankLinesAndEndTagsHtml.join(' '))
            return withoutBlankLinesAndEndTagsHtml.join(' ')
        }
    }

}

module.exports = robot