mySql = require('mysql')
const config = require('../config')

exports.query = async (ctx, next, querystring, queryObj)=>{
const pool = mySql.createPool({
		host:config.mysql.host,
		user:config.mysql.user,
		password:config.mysql.pass,
		database:config.mysql.db
})
  pool.getConnection(function (err, connection) {
    // Use the connection
    connection.query('SELECT something FROM sometable', function (error, results, fields) {
      // And done with the connection.
      connection.release();

      // Handle error after the release.
      if (error) throw error;

      // Don't use the connection here, it has been returned to the pool.
    });
  });
  
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
			results = await query(querystring, values)
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

