/**
 * @typedef {import('express').Request} Request Express Request
 * @typedef {import('express').Response} Response Express Response
 * @typedef {import('express').NextFunction} NextFunction Express Next Function
 */
const { Redis, Redlock } = require('../connections')
const Logger = require('../utils/logger')
const sleep = require('../utils/sleep')

module.exports = class LockController {
	constructor() {
		/** @private */
		this._logPrefix = '[LOCK_CONTROLLER]'
        this.handle = this.handle.bind(this)
	}

	/**
	 * @param {Request} req
	 * @param {Response} res
     * @param {NextFunction} next
	 */
	async handle(req, res, next) {
        try {
            const { body } = req
            Logger.info(`${this._logPrefix}: Request Body`, body)
    
            const { key, value } = body
    
            const resource = `locks:${key}`
            const ttl = 20000 // 20s
    
            Logger.info(`${this._logPrefix}: Locking resource ${resource}...`)
            const lock = await Redlock.lock(resource, ttl)
            Logger.info(`${this._logPrefix}: Lock acquired!`)
    
            Logger.info(`${this._logPrefix}: Setting key=${key} | value=${value} ...`)
            await Redis.set(key, value)
    
            Logger.info(`${this._logPrefix}: Waiting for 10s...`)
            await sleep(10000)
    
            Logger.info(`${this._logPrefix}: Unlocking resource ${resource}...`)
            await lock.unlock()
            Logger.info(`${this._logPrefix}: Unlock resource ${resource} successfully`)
    
            return res.sendStatus(200)
        } catch (error) {
            next(error)
        }
	}
}
