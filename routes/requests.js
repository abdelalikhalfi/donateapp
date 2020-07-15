const express = require('express')
const Joi = require('@hapi/joi');
const adminOnly = require('../middleware/adminOnly');
const getRequests = require('../database/config').getRequests;
const getRequestsById = require('../database/config').getRequestsById;
const getRequestsByCIN = require('../database/config').getRequestsByCIN
const getRequestsByStatus = require('../database/config').getRequestsByStatus
const getMyRequests = require('../database/config').getMyRequests







const router = express.Router()


router.get('/', adminOnly, (req, res) => {
	getRequests()
	.then(result => res.send(result))
	.catch(err => res.status(500).res.send({error: "something went wrong"}))
})


router.get('/id/:id', adminOnly, (req, res) => {
	const schema = Joi.object({
		id: Joi.number()
	})

	if (schema.validate(req.params).error) {
		return res.status(400).send(schema.validate(req.params).error.details[0].message)
	}
	else {
		getRequestsById(req.params.id)
		.then(result => res.send(result))
		.catch(err => res.status(500).send({error: "something went wrong"}))
	}
})


router.get('/cin/:cin', adminOnly, (req, res) => {
	schema = Joi.object({
		cin: Joi.string().max(9)
	})

	if (schema.validate(req.params).error) {
		return res.status(400).send(schema.validate(req.params).error.details[0].message)
	}
	else {
		getRequestsByCIN(req.params.cin)
		.then(result => res.send(result))
		.catch(err => res.status(500).send({error: "something went wrong"}))
	}
})

router.get('/status/:status', adminOnly, (req, res) => {
	schema = Joi.object({
		status: Joi.string().max(12)
	})

	if (schema.validate(req.params).error) {
		return res.status(400).send(schema.validate(req.params).error.details[0].message)
	}
	else {
		getRequestsByStatus(req.params.status)
		.then(result => res.send(result))
		.catch(err => res.status(500).send({error: "something went wrong"}))
	}
})


router.get('/me', (req, res) => {
	getMyRequests(req.token.id)
	.then(result => res.send(result))
	.catch(err => res.status(500).send({error: "something went wrong"}))
})




module.exports = router