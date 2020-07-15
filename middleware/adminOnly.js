




module.exports = function checkIfAdmin(req, res, next) {
	if (req.token.user_type === "ADMIN") next()
	else return res.status(403).send({error:'You don\'t have access rights to this content'})	
}