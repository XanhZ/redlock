const dotenv = require('dotenv')

dotenv.config()

const configs = Object.freeze({
	redis: {
		uri: process.env.REDIS_URI || 'redis://127.0.0.1:6379/0',
	},
	port: process.env.PORT || 3000,
})

module.exports = configs
