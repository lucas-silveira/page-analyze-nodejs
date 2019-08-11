const robots = {
    screenshot: require('./robots/screenshot.js'),
    html: require('./robots/html-analyze.js')
}

async function start(url, keyword) {
    const webpage = {
        url: url,
        keyword: keyword
    }

    // await robots.screenshot(webpage)
    await robots.html(webpage)

    return webpage
}

module.exports = start