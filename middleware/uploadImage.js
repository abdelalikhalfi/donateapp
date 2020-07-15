const multer = require('multer')
const path = require('path')


const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, __dirname + '/../uploads')
	},
	filename: (req, file, cb) => {
		cb(null, Math.random().toString(36).substr(2, 9) + '.png')	
	}
})


const upload = multer({
	storage,
	fileFilter: (req, file, next) => {
		var ext = path.extname(file.originalname);
		if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return next("Only images are allowed")
        }
        next(null, true)
	}
})

module.exports = upload