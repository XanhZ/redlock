/**
 * @typedef {import('express').Request} Request Express Request
 * @typedef {import('express').Response} Response Express Response
 * @typedef {import('express').NextFunction} NextFunction Express Next Function
 */

const Logger = require('../utils/logger')

/**
 * @param {Error} error
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
function handleError(error, req, res, next) {
	Logger.error(`[REQUEST_ERROR]:`, error)
	const status = error.status ?? 500
	return res.status(status).json({
        message: error.message || 'Request fail due to something'
    })
}

module.exports = handleError
