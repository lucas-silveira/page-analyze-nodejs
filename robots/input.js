function robot(webpage) {
    const sanitizedUrl = webpage.url.replace(/https?:\/\//, '')
    
    webpage.sanitizedUrl = sanitizedUrl
    webpage.url = `http://${sanitizedUrl}`
}

module.exports = robot