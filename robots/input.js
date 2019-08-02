const readline = require('readline-sync')

function robot(content) {

    content.url = askAndReturnUrl()
    content.product = askAndReturnProductName()

    function askAndReturnUrl() {
        return readline.question('Type url of the page: ')
    }

    function askAndReturnProductName() {
        return readline.question('Type product name: ')
    }
}

module.exports = robot