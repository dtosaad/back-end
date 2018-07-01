query = require('./query')

module.exports = async(ctx, next)=>{
	try{
		user_id = ctx.request.query.user_id
		if(!user_id){
			throw new Error('user_id needed!')
		}
		queryObj = {}
		queryObj.columns = ['discount_id', 'money']
		queryObj.table = 'coupon'
		queryObj.key = 'user_id'
		queryObj.keyValue = user_id
		sql = 'SELECT `discount_id`,`money` FROM `coupon` WHERE `user_id` = ' + user_id
		var discount_info = await query.query(ctx, next, sql, {})
		ctx.body = discount_info
	}catch (e){
		console.log(e.message)
	}
	
}