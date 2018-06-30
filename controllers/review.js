query = require('./query.js')
module.exports = async (ctx, next)=>{
	info = ctx.request.body
	star = info.star
	queryObj = {}
    try{
      dish_id = ctx.params.dish_id
			user_id = ctx.request.query.user_id
			if(!dish_id){
				throw new Error('dish_id needed!')
			} else {
				sql1 = 'SELECT `star_times`,`star_count` FROM `dishes` WHERE `dish_id` ='+dish_id
				result1 = await query.query(ctx,next,sql1,queryObj)
				star_count = result1[0].star_count+star
				star_times = star_times+1
        console.log(dish_id,star_times,star_count)
				sq12 = 'UPDATE `dishes` SET `star_times` = \''+star_times+'\', `star_count` = \''+star_count+'\' WHERE `dish_id` ='+dish_id
				await query.query(ctx,next,sql2,queryObj)
			}
        }catch(e){
        	ctx.body=e.message
        }	
}