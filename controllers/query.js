mySql = require('mysql')
const config = require('../config')

exports.query = async (ctx, next, querystring, queryObj)=>{
	const pool = mySql.createPool({
			host:config.mysql.host,
			user:config.mysql.user,
			password:config.mysql.pass,
			database:config.mysql.db
		})

	let query = function( sql, values ) {  	
  		// 返回一个 Promise
	  	return new Promise(( resolve, reject ) => {
    		pool.getConnection(function(err, connection) {
      			if (err) {
		        	reject( err )
    	  		} else {
        			connection.query(sql, values, ( err, result) => {
          				if ( err ) {
	           				reject( err )
          				} else {
		           			resolve( result )
			        	}
        	  			// 结束会话
          				connection.release()
	        		})
      			}
    		})
  		})
	}
	try{
		let results
		if(!querystring){
			querystring = 'SELECT ?? FROM ?? WHERE ?? = ?'
			values=[queryObj.columns, queryObj.table, queryObj.key, queryObj.keyValue]
console.log('query.js values:\n',values)
			results = await query(querystring, values)
console.log('query.js query results:\n',results)
		}else{
console.log('query.js querystring:\n',querystring)
			results = await query(querystring)

console.log('query.js query results:\n',results)
		}
		return results
	}
	catch(e){
		ctx.response.body = e.message
	}
}

