const express = require('express')
const Logger = require('./src/utils/logger')
const configs = require('./src/configs')
const initRoute = require('./src/routes')
const { handleError } = require('./src/middlewares')

const app = express()
app.use(express.json())
initRoute(app)
app.use(handleError)

app.listen(configs.port, () => {
	Logger.info(`[APP_MODULE] App is ready on port ${configs.port}`)
})
