const readline = require('readline-sync')
const robots = {
    'text': require('./robots/text.js')
}

function start() {
    const content = {}

    content.url = askAndReturnUrl()
    content.product = askAndReturnProductName()

    function askAndReturnUrl() {
        return readline.question('Type url of the page: ')
    }

    function askAndReturnProductName() {
        return readline.question('Type product name: ')
    }

    console.log(content)
}

start()