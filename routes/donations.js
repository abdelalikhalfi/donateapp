const express = require('express')
const Joi = require('@hapi/joi')
const adminOnly = require('../middleware/adminOnly')
const donate = require('../database/config').donate
const getDonations = require('../database/config').getDonations





const router = express.Router()


router.post('/donate', (req, res) => {
	const schema = Joi.object({
		request_id : Joi.number().required(),
		amount: Joi.number().required(),
		transaction_type: Joi.string().required(),
		message: Joi.string()
	})
	const {request_id, amount, transaction_type, message} = req.body
	donate(req.token.id, request_id, amount, transaction_type, message)
	.then(result => res.send({success: true}))
	.catch(err => res.status(500).send({error: "something went wrong"}))
})


router.get('/', adminOnly, (req, res) => {
	getDonations()
	.then(result => res.send(result))
	.catch(err => res.status(500).send({error: "something went wrong"}))

})


module.exports = router