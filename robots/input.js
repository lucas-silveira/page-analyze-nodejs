function robot(webpage) {
    const sanitizedUrl = webpage.url.replace(/https?:\/\//, '')
    
    webpage.sanitizedUrl = sanitizedUrl.trim()
    webpage.url = `http://${sanitizedUrl}`
}

module.exports = robot