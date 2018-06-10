query = require('./query')
module.exports = async (ctx, next)=>{
	table_id = ctx.params.table_id //ctx.request.params === undefined
	user_id = ctx.request.query.user_id //req.query
	try{
		if(!table_id || !user_id){
			throw new Error("table_id or user_id needed")
		}
		queryObj = {}
		queryObj.columns = ['dish_id', 'count']
		queryObj.table = 'table_dish'
		queryObj.key = 'table_id'
		queryObj.keyValue = table_id
		var orders = await query.query(ctx, next, '', queryObj)

		queryObj.columns = 'dish_name'
		queryObj.table = 'dishes'
		queryObj.key = 'dish_id'
		var results = []
		for(var i = 0; i < orders.length; ++i){
			queryObj.keyValue = orders[i].dish_id
			var dish_name = await query.query(ctx, next, '', queryObj)
			results.push({
				"dish_id":orders[i].dish_id,
				"name":dish_name,
				"ordered_count":orders[i].count
			})
		}
		//ctx.body = results
		return results
	}
	catch(e){
		ctx.body = e.message
	}
}