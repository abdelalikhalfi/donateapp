const multer = require('multer')
const express = require('express')
const upload = require('../middleware/uploadImage')
const uploadImg = require('../database/config').addImgtoDb



const router = express.Router()


router.post('/image', upload.single('attachement'), (req, res, next) => {
	const file = req.file
	if (!file) {
		const error = new Error('please upload file')
		error.httpStatusCode = 400
		return next(error)
	}
	else {
		uploadImg(file.filename, file.filename.split('.')[0], 20)
		.then(result => res.send({message: "Image uploaded successfully", 
			imgUrl:"http://127.0.0.1:3000/img/"+file.filename
		}))
		.catch(err => res.status(500).send(err))

	}
})




module.exports = router