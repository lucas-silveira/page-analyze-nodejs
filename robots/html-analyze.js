const cheerio = require('cheerio')
const webscrape = require('webscrape')
const htmlEntities = require('html-entities').AllHtmlEntities

const entities = new htmlEntities()
const scraper = webscrape.default()

async function robot(webpage) {
    webpage.params = {}

    await fetchContentFromUrl(webpage)
    getPageTitlesParams(webpage)
    getPageImagesParams(webpage)
    getPageLinksParams(webpage)
    sanitizePageContent(webpage)
    getPageTextParams(webpage)
    calculeTotalRate(webpage)

    async function fetchContentFromUrl(webpage) {
        console.log('> Obtendo conteúdo html da página...')
        const webPageResponse = await scraper.get(webpage.url)
        const webPageBodyContent = webPageResponse.body
        const $ = cheerio.load(webPageBodyContent)
        const webPageBodyHtml = $('body').html()

        webpage.originalContent = webPageBodyHtml
    }

    function getPageTitlesParams(webpage) {
        webpage.params.titles = {}
        const $ = cheerio.load(webpage.originalContent)

        webpage.params.titles.length = $('h1, h2, h3, h4, h5, h6').length
        getNumberKeywords(webpage, $)
        calculeRate(webpage)

        function getNumberKeywords(webpage, $) {
            const keywordInLowerCase = webpage.keyword.toLowerCase()
            let i = 0

            $('h1, h2, h3, h4, h5, h6').each( function() {
                const currentTitleInLowerCase = entities.decode( $(this).text() ).toLowerCase()
                currentTitleInLowerCase.indexOf( keywordInLowerCase ) > -1 ? i++ : false
            })

            webpage.params.titles.hasKeyword = i
        }

        function calculeRate(webpage) {
            let rate = 0
            const keywords = webpage.params.titles.hasKeyword
            if (keywords > 1)
                rate = 1
            webpage.params.titles.rate = rate
        }
    }

    function getPageImagesParams(webpage) {
        webpage.params.images = {}
        const $ = cheerio.load(webpage.originalContent)

        webpage.params.images.length = $('img').length
        getNumberKeywords(webpage, $)
        calculeRate(webpage)

        function getNumberKeywords(webpage, $) {
            const keywordInLowerCase = webpage.keyword.toLowerCase()
            let i = 0

            $('img').each( function() {
                const currentAltTag = $(this).attr('alt')
                if (currentAltTag)
                    currentAltTag.toLowerCase().indexOf( keywordInLowerCase ) ? i++ : false
            })

            webpage.params.images.altHasKeyword = i
        }

        function calculeRate(webpage) {
            let rate = 0
            const imagesLength = webpage.params.images.length
            const keywords = webpage.params.images.altHasKeyword
            if (keywords > imagesLength*0.7)
                rate = 1
            webpage.params.images.rate = rate
        }
    }

    function getPageLinksParams(webpage) {
        const $ = cheerio.load(webpage.originalContent)
        const dominio = webpage.url.replace(/https?:\/\/(www.)?/gm, '').replace(/\.\w+/gm, '')

        webpage.params.links = {
            length: $('a').length,
            internalLinks: $(`[href*="${dominio}"]`).length,
            externalLinks: getNumberExternalLinks($)
        }
        calculeRate(webpage)

        function getNumberExternalLinks($) {
            return Math.abs($('a').length - $(`[href*="${dominio}"]`).length) //Math.abs transforma todo número em positivo
        }

        function calculeRate(webpage) {
            let rate = 0
            const internalLinksLength = webpage.params.links.internalLinks
            const externalLinksLength = webpage.params.links.externalLinks
            if (internalLinksLength > 0 && externalLinksLength > 0)
                rate = 1
            webpage.params.links.rate = rate
        }
    }

    function getPageTextParams(webpage) {
        webpage.params.text = {}

        getNumberKeywords(webpage)
        calculeRate(webpage)

        function getNumberKeywords(webpage) {
            const keywordInLowerCase = webpage.keyword.toLowerCase()
            const textInLowerCase = webpage.sanitizedContent.toLowerCase()
            const keywords = textInLowerCase.split(keywordInLowerCase)
            webpage.params.text.keywordLength = keywords.length
        }

        function calculeRate(webpage) {
            let rate = 0
            const keywords = webpage.params.text.keywordLength

            if (keywords > 2)
                rate = 1
            webpage.params.text.rate = rate
        }
        
    }

    function sanitizePageContent(webpage) {
        const contentWithoutTagsHtml = removeTagsHtmlOfContent(webpage.originalContent)
        const contentWithoutBlankLines = removeBlankLinesOfContent(contentWithoutTagsHtml)

        webpage.sanitizedContent = contentWithoutBlankLines

        function removeTagsHtmlOfContent(content) {
            const allLines = content.match( />[^\n<]+/g)
            const withoutDirt = allLines.filter( (line) => {
                if( /\t/g.test(line) || />$/g.test(line) )
                    return false
                else
                    return true
            })

            const withoutBlankLinesAndEndTagsHtml = withoutDirt.map ( (line) => {
                const lineWithoutDirts = line.replace(/^>/g, '')
                return entities.decode(lineWithoutDirts)
            })
            
            return withoutBlankLinesAndEndTagsHtml.join(' ')
        }

        function removeBlankLinesOfContent(content) {
            const allWords = content.split(' ')
            const contentWithoutBlankLines = allWords.filter( word => {
                if ( word.trim().length === 0 )
                    return false
                return true
            })

            return contentWithoutBlankLines.join(' ')
            
        }
    }

    function calculeTotalRate(webpage) {
        const ratesOfParams = [
            webpage.params.titles.rate,
            webpage.params.images.rate,
            webpage.params.links.rate,
            webpage.params.text.rate,
        ]

        const total = ratesOfParams.reduce( (acumulator, rate) => {
            return acumulator + rate
        })

        const totalRate = (total/4) * 10

        webpage.params.totalRate = totalRate
    }

}

module.exports = robot