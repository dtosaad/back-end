query = require('./query.js')
module.exports = async (ctx, next)=>{
	info = ctx.request.body
	star = info.star
	queryObj = {}
    try{
        	dish_id = ctx.request.query.dish_id
			user_id = ctx.request.query.user_id
			if(!dish_id){
				throw new Error('dish_id needed!')
			} else {
				sql1 = 'SELECT `star`,`star_count` FROM `dishes` WHERE `dish_id` ='+dish_id
				var result1 = await query.query(ctx,next,sql1,queryObj)
				star_new = result1[0].star + star
				star_count = star_count+1
				sq12 = 'UPDATE `dishes` SET `star` = \''+star_new+'\', `star_count` = \''+star_count+'\' WHERE `dish_id` ='+dish_id
				await query.query(ctx,next,sql2,queryObj)
			}
        }catch(e){
        	ctx.body=e.message
        }	
}