const robots = {
    input: require('./robots/input'),
    html: require('./robots/html-analyze'),
    search: require('./robots/search'),
    screenshot: require('./robots/screenshot')
}

async function start(url, keyword) {
    const webpage = { url, keyword }

    robots.input(webpage)
    await robots.html(webpage)
    await robots.search(webpage)
    // await robots.screenshot(webpage)

    return webpage
}

module.exports = start