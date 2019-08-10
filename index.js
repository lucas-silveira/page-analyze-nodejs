const robots = {
    input: require('./robots/input.js'),
    screenshot: require('./robots/screenshot.js'),
    html: require('./robots/html-analyze.js')
}

async function start() {
    const webpage = {}

    robots.input(webpage)
    await robots.screenshot(webpage)
    await robots.html(webpage)

    console.log(webpage)
}

start()