const robots = {
    input: require('./robots/input'),
    screenshot: require('./robots/screenshot'),
    html: require('./robots/html-analyze')
}

async function start(url, keyword) {
    const webpage = { url, keyword }

    robots.input(webpage)
    await robots.html(webpage)
    // await robots.screenshot(webpage)

    return webpage
}

module.exports = start