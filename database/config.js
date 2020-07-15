const mysql = require('mysql')


const configuration = {
	host: "localhost",
	user: "root",
	password: "abdelali",
	database: "donateBD"
}

const connect = mysql.createConnection(configuration)


const sqlApi = {
	getUsers() {
		return new Promise((resolve, reject) => {
			const queryCmd = "select id, email, create_time, user_type from user"
			connect.query(queryCmd, (err, res) => {
				if (!err) return resolve(res)
				else
					return reject({error:err.sqlMessage})	
			})
		})
	},

	getUserById(id) {
		return new Promise((resolve, reject) => {
			const queryCmd = `select id, email, create_time, user_type from user where id= ${id}`
			connect.query(queryCmd, (err, res) => {
				if (!err) return resolve(res)
				else
					return reject({error:err.sqlMessage})	
			})
		})
	},

	newUser(email, password, user_type) {
		return new Promise((resolve, reject) => {
			const queryCmd = `insert into user (email, password, user_type) values (${connect.escape(email)}, \
			${connect.escape(password)}, ${connect.escape(user_type)})`
			connect.query(queryCmd, (err, res) => {
				if (!err) return resolve(res)
				else return reject(err)	
			})
		})
	},

	auth(email) {
		return new Promise((resolve, reject) => {
			const queryCmd = `select id, email, password, user_type from user where email = \
			${connect.escape(email)}`
			connect.query(queryCmd, (err, res) => {
				if (!err) return resolve(res)
				else return reject(err)	
			})
		})
	},

	addRequests(user_id, request_type, description, fullName, cin, phone,
		ville, addresse, amount, rib_compte, isAgree) {
		return new Promise((resolve, reject) => {
			const queryCmd = `
			insert into requests 
			(
				user_id,
				request_type,
				description,
				fullName,
				cin,
				phone,
				ville,
				addresse,
				amount,
				rib_compte,
				isAgree
			) values (
				${user_id},
				${connect.escape(request_type)},
				${connect.escape(description)},
				${connect.escape(fullName)},
				${connect.escape(cin)},
				${connect.escape(phone)},
				${connect.escape(ville)},
				${connect.escape(addresse)},
				${connect.escape(amount)},
				${connect.escape(rib_compte)},
				${connect.escape(isAgree)}

			)
			`
			connect.query(queryCmd, (err, res) => {
				if (!err) return resolve(res)
				else return reject(err)	
			})
		})
	},

	getRequests() {
		return new Promise((resolve, reject) => {
			const queryCmd = ` select * from requests`
			connect.query(queryCmd, (err, res) => {
				if (!err) return resolve(res)
				else return reject(err)	
			})
		})
	},

	getRequestsById(id) {
		return new Promise((resolve, reject) => {
			const queryCmd = ` select * from requests where id = ${connect.escape(id)}`
			connect.query(queryCmd, (err, res) => {
				if (!err) return resolve(res)
				else return reject(err)	
			})
		})
	},

	getRequestsByCIN(cin) {
		return new Promise((resolve, reject) => {
			const queryCmd = ` select * from requests where cin = ${connect.escape(cin)}`
			connect.query(queryCmd, (err, res) => {
				if (!err) return resolve(res)
				else return reject(err)	
			})
		})
	},

	getRequestsByStatus(status) {
		return new Promise((resolve, reject) => {
			const queryCmd = ` select * from requests where status = ${connect.escape(status)}`
			connect.query(queryCmd, (err, res) => {
				if (!err) return resolve(res)
				else return reject(err)	
			})
		})
	},

	getMyRequests(user_id) {
		return new Promise((resolve, reject) => {
			const queryCmd = ` select * from requests where user_id = ${connect.escape(user_id)}`
			connect.query(queryCmd, (err, res) => {
				if (!err) return resolve(res)
				else return reject(err)	
			})
		})
	},


	donate(volunter_id, request_id, amount, transaction_type, message) {
		return new Promise((resolve, reject) => {
			const queryCmd = `insert into donate_requests 
			(
				volunter_id,
				request_id,
				amount,
				transaction_type,
				message
			)
			values (
				${volunter_id},
				${connect.escape(request_id)},
				${connect.escape(amount)},
				${connect.escape(transaction_type)},
				${connect.escape(message)}
			)
			`
			connect.query(queryCmd, (err, res) => {
				if (!err) return resolve(res)
				else return reject(err)	
			})
		})
	},


	getDonations() {
		return new Promise((resolve, reject) => {
			const queryCmd = ` select * from donate_requests`
			connect.query(queryCmd, (err, res) => {
				if (!err) return resolve(res)
				else return reject(err)	
			})
		})
	},

	addImgtoDb(imgName, attachementID, uploaded_by_ID) {
		return new Promise((resolve, reject) => {
			const queryCmd = `insert into attachements (attachement_type, imgName, attachementID, uploaded_by_ID)
			values ('image', ${connect.escape(imgName)}, ${connect.escape(attachementID)}, ${uploaded_by_ID} )`

			connect.query(queryCmd, (err, result) => {
				if (!err) return resolve(result)
				else return reject(err)	
			})
		})
	}

}

module.exports = sqlApi


