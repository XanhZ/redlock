const express = require('express')
const { lockController } = require('../controllers')

const router = express.Router()

/**
 * @param {express.Express} app
 */
function initRoute(app) {
	router.post('/lock-and-set-value', lockController.handle)

	app.use(router)
}

module.exports = initRoute
