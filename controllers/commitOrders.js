query = require('./query')

module.exports = async(ctx, next) =>{
	//var table_id = ctx.params.table_id
	var user_id = ctx.request.query.user_id
	try{
		if(!user_id){
			throw new Error('user_id needed!')
		}
		queryObj = {}
		queryObj.columns = ['orderers_count']
		queryObj.table = 'distribution'
		queryObj.key = 'user_id2'
		queryObj.keyValue = user_id
		var orderers_counts = await query.query(ctx, next, '', queryObj)
		if(!orderers_counts){
			throw new Error('no orderers')
		}
		var orderers_count = orderers_counts[0].orderers_count - 1
		sql_update_orderers_count = 'UPDATE `distribution` SET `orderers_count`='+orderers_count+' WHERE `user_id2`=' + user_id
	}catch(e){
		ctx.body = e.message
	}
}