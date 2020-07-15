const express = require('express')
const user = require('./routes/user')
const auth = require('./routes/auth')
const checkAuth = require('./middleware/checkAuth')
const requests = require('./routes/requests')
const donations = require('./routes/donations')
const multer = require('multer')
const path = require('path')
const upload = require('./middleware/uploadImage')
const uploadHandling = require('./routes/uploadHandling')



const app = express()

app.use(express.json())
app.use('/api/user', user)
app.use('/api/auth', auth)
app.use('/api/requests', checkAuth, requests)
app.use('/api/donations', checkAuth, donations)
app.use('/api/upload', uploadHandling)


app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html')
})


app.get('/img/:imgName', (req, res) => {
	const file = __dirname + '/uploads/' + req.params.imgName
	res.sendFile(file)
	
	
})



















app.listen(3000, () => console.log('server running on port 3000'))