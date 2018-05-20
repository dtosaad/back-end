mySql = require('mysql')
const config = require('../config')

exports.search = async (ctx, next, table, querystring, queryObj)=>{
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
			querystring = 'INSERT INTO ?? SET ?'
			values=[table, queryObj]
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