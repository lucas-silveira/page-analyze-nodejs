function robot(webpage) {
    const urlSanitized = webpage.url.replace(/https?:\/\//, '')
    
    webpage.url = `http://${urlSanitized}`
}

module.exports = robot