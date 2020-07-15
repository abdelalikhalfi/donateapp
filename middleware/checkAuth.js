const jwt = require('jsonwebtoken')


module.exports = function verify(req, res, next) {
	jwt.verify(req.header('access-token'), 'secret', (err, decoded) => {
		if (err) {
			res.status(403).send({error: err.message})
		}
		else {
			req.token = decoded
			console.log(req.token)
			next()
		}
	})
}
