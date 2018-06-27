query = require('./query')
module.exports = async (ctx, next)=>{
	table_id = ctx.params.table_id //ctx.request.params === undefined
	user_id = ctx.request.query.user_id //req.query
	try{
		if(!table_id){
			throw new Error("table_id needed")
		}
		queryObj = {}
		queryObj.columns = ['table_id', 'number', 'user_id', 'orderers_count']
		queryObj.table = 'distribution'
		queryObj.key = 'table_id'
		queryObj.keyValue = table_id
		var results = await query.query(ctx, next, '', queryObj)
		if(!results[0].user_id){
			//get user avatar
			queryObj = {}
			queryObj.columns='wechat_avatar'
			queryObj.table = 'users'
			queryObj.key='user_id'
			queryObj.keyValue = user_id
			var avatar_info = await query.query(ctx, next, '', queryObj)

			sql_update = 'UPDATE `distribution` SET `user_id`=\'' + user_id + '\', `user_avatar`=\''+avatar_info[0].wechat_avatar
				+'\', `orderers_count`=1 WHERE `table_id`=' + table_id
			await query.query(ctx, next, sql_update, {})

			sql_select = 'SELECT * FROM `distribution` WHERE `table_id` ='+table_id
			var results = await query.query(ctx, next, sql_select, {})
			ctx.body = results[0]
		}else{
			ctx.body = results[0]
			return results[0]
		}
	}
	catch(e){
		ctx.body = e.message
	}
}