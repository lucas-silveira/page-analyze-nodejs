const express = require('express')
const cors = require('cors')
const routes = require('./src/routes.js')

const app = express()

app.use(express.json())
app.use(cors())
// app.use('/api/content/', express.static('webpage'))

app.use('/api', routes)

app.listen(3000)