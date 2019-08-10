const readline = require('readline-sync')

function robot(webpage) {

    webpage.url = askAndReturnUrl()
    webpage.keyword = askAndReturnKeyword()

    function askAndReturnUrl() {
        return readline.question('Type url of the page: ')
    }

    function askAndReturnKeyword() {
        return readline.question('Type a keyword: ')
    }
}

module.exports = robot