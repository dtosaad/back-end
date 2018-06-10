query = require('./query')
module.exports = async (ctx, next)=>{
	table_id = ctx.params.table_id
	try{
		if(!table_id){
			throw new Error('table_id needed!')
		}
		queryObj = {}
		queryObj.columns = 'orderers_count'
		queryObj.table = 'distribution'
		queryObj.key = 'table_id'
		queryObj.keyValue = table_id
		var orderers_count_origin = await query.query(ctx, next, '', queryObj)
		if(!orderers_count_origin){
			throw new Error('order together with nobody')
		}
		var orderers_count = orderers_count_origin[0].orderers_count + 1
		sql_update = 'UPDATE `distribution` SET `orderers_count`='+orderers_count+' WHERE `table_id`=' + table_id
		var results = await query.query(ctx, next, sql_update, {})
	}catch(e){
		ctx.body = e.message
	}
}