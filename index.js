const robots = {
    input: require('./robots/input.js'),
    text: require('./robots/text.js')
}

async function start() {
    const webpage = {}

    robots.input(webpage)
    await robots.text(webpage)

    console.log(webpage)
}

start()