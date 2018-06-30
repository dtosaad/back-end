mySql = require('mysql')
const config = require('../config')

const pool = mySql.createPool({
	host: config.mysql.host,
	user: config.mysql.user,
	password: config.mysql.pass,
	database: config.mysql.db
})

let connection = null
pool.getConnection(function(err, conn) {
	connection = conn
})

let query = function(sql, values) {  	
	// 返回一个 Promise
	return new Promise(( resolve, reject ) => {
		connection.query(sql, values, (err, result) => {
			if (err) {
				reject(err)
			} else {
				resolve(result)
			}
		})
	})
}

exports.query = async (ctx, next, querystring, queryObj) => {
	try {
		let results
		if(!querystring){
			querystring = 'SELECT ?? FROM ?? WHERE ?? = ?'
			values=[queryObj.columns, queryObj.table, queryObj.key, queryObj.keyValue]
			results = await query(querystring, values)
		}else{
			results = await query(querystring)
		}
		return results
	}
	catch(e){
		ctx.response.body = e.message
	}
}