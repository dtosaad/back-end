query = require('./query')

module.exports = async(ctx, next)=>{
	try{
		user_id = ctx.request.query.userid
		if(!user_id){
			throw new Error('user_id needed!')
		}
		queryObj = {}
		queryObj.columns = ['discount_id', 'money']
		queryObj.table = 'coupon'
		queryObj.key = 'user_id3'
		queryObj.keyValue = user_id
		var discount_info = await query.query(ctx, next, '', queryObj)
		return discount_info
	}catch (e){
		console.log(e.message)
	}
	
}