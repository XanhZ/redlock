const { default: Redis } = require('ioredis')
const configs = require('../configs/index')

const redisUri = configs.redis.uri
const redis = new Redis(redisUri)

module.exports = redis
