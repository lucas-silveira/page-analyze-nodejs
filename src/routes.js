const express = require('express')
const routes = express.Router()
const PageAnalyzeController = require('./controllers/PageAnalyzeController.js')

routes.get('/page-analyze', PageAnalyzeController.getData)

module.exports = routes