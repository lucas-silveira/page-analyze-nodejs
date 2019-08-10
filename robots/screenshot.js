const pageres = require('pageres')

async function robot(webpage) {
    await catchScreenshotPageFromUrl(webpage)
    
    async function catchScreenshotPageFromUrl(webpage) {
        console.log('> Capturando Screenshot...')
        try {
            await new pageres({delay: 2, filename: `${webpage.keyword}-${Math.floor(Math.random() * 1000)}`, format: 'jpg'})
            .src(webpage.url, ['1920x1080'])
            .dest('./webpage/')
            .run()
    
            webpage.screenshotUrl = `./webpage/${webpage.keyword}.jpg`
        } catch(err) {
            throw new Error(`Não foi possível capturar o screenshot da página. Motivo: ${err}`)
        }
    }
}

module.exports = robot