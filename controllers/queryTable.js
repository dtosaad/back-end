query = require('./query')
module.exports = async (ctx, next)=>{
	table_id = ctx.params.table_id //ctx.request.params === undefined
	user_id = ctx.request.query.user_id //req.query
	try{
		if(!table_id){
			throw new Error("table_id needed")
		}
		queryObj = {}
		queryObj.columns = ['table_id', 'number', 'user_id2', 'orderers_count']
		queryObj.table = 'distribution'
		queryObj.key = 'table_id'
		queryObj.keyValue = table_id
		querystring = ''
		var results = await query.query(ctx, next, querystring, queryObj)
		if(!results[0].user_id2){
			sql_update = 'UPDATE `distribution` SET `user_id2`='+user_id+', `orderers_count`=1 WHERE `table_id`=' + table_id
			var results = await query.query(ctx, next, sql_update, {})
		}else{

			ctx.body = results[0]
			return results[0]
		}
	}
	catch(e){
		ctx.body = e.message
	}
}