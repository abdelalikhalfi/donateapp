const express = require('express')
const sqlAPI = require('../database/config')
const Joi = require('@hapi/joi');
const hpwd = require('password-hash')
const checkAuth = require('../middleware/checkAuth')





const router = express.Router()

router.get('/all', (req, res) => {
	sqlAPI.getUsers()
	.then(result => res.send(result))
	.catch(err => res.send(err))
})

router.get('/:id', (req, res) => {
	const schema = Joi.object({id: Joi.number().max(100000)})
	if (schema.validate(req.params).error) {
		return res.status(400).send(schema.validate(req.params).error.details[0].message)
	}
	else {
		sqlAPI.getUserById(req.params.id)
		.then(result => res.send(result.length > 0 ? result[0] : 'user not found'))
		.catch(err => res.send(err))	
	}
	
})


router.post('/signup', (req, res) => {
	const schema = Joi.object({
		email: Joi.string().email().required(),
		password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
		.min(7)
	})

	if (schema.validate(req.body).error) {
		return res.status(400).send({error:schema.validate(req.body).error.details[0].message})
	}
	else {
		sqlAPI.newUser(req.body.email, hpwd.generate(req.body.password), 'USER')
		.then(result => res.send({success: true}))
		.catch(err => res.status(500).send(err.errno === 1062 ? {error:'email already exist'} : 'something went wrong'))
	}
})

router.post('/signup/beneficier', (req, res) => {
	const schema = Joi.object({
		email: Joi.string().email().required(),
		password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
		.min(7)
	})

	if (schema.validate(req.body).error) {
		return res.status(400).send({error:schema.validate(req.body).error.details[0].message})
	}
	else {
		sqlAPI.newUser(req.body.email, hpwd.generate(req.body.password), 'BENEFICIER')
		.then(result => res.send({success: true}))
		.catch(err => res.status(500).send(err.errno === 1062 ? {error:'email already exist'} : 'something went wrong'))
	}
})

router.post('/beneficier/info', checkAuth, (req, res) => {
	const schema = Joi.object({
		request_type: Joi.string().required(),
		description: Joi.string().required(),
		fullName: Joi.string().required(),
		cin: Joi.string().required(),
		phone: Joi.string(),
		ville: Joi.string().required(),
		addresse : Joi.string().required(),
		amount: Joi.string().required(),
		rib_compte: Joi.string(),
		isAgree: Joi.number().required().max(1)
	})

	if (schema.validate(req.body).error) {
		return res.status(400).send({error:schema.validate(req.body).error.details[0].message})
	}
	else {
		const {request_type, description, fullName, cin, phone, ville, addresse, amount, rib_compte, isAgree} = req.body
		sqlAPI.addRequests(req.token.id, request_type, description, fullName, cin, phone, ville, addresse, amount, rib_compte, isAgree)
		.then(result => {
			res.send({success: true})
		})
		.catch(err => {
			res.status(500).send({error: "something went wrong, if the problem persist contact us"})
		})
	}
})









module.exports = router