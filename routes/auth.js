const express = require('express')
const hpwd = require('password-hash')
const Joi = require('@hapi/joi');
const connect = require('../database/config').auth
const jwt = require('jsonwebtoken')





const router = express.Router()

router.post('/', (req, res) => {
	schema = Joi.object({
		email: Joi.string().email().required(),
		password: Joi.string().required()
	})

	if (schema.validate(req.body).error) {
		return res.status(400).send({error:schema.validate(req.body).error.details[0].message})		
	}
	else {
		connect(req.body.email)
		.then(result => {
			const check = hpwd.verify(req.body.password, result[0].password)
			if (check) {
				jwt.sign({id:result[0].id, user_type:result[0].user_type}, 'secret', {expiresIn: '10d'}, (err, token) => {
					res.send({token})
				})
			}
			else {
				res.status(401).send({error:"incorrect password"})
			}
		})
		.catch(err => res.status(500).send({error: 'something went wrong'}))

	}


})

module.exports = router