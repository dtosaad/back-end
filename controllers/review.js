query = require('./query.js')
module.exports = async (ctx, next)=>{
	info = ctx.request.body
	star = info.star
	queryObj = {}
    try{
      let dish_id = parseInt(ctx.params.dish_id)
			let user_id = ctx.request.query.user_id
			if(!dish_id){
				throw new Error('dish_id needed!')
			} else {
				let sql1 = `SELECT star_times,star_count FROM dishes WHERE dish_id=${dish_id}`
				let result1 = await query.query(ctx,next,sql1,{})
				let star_count = result1[0].star_count+star
				let star_times = result1[0].star_times+1
        console.log(dish_id,star_times,star_count)
				let sq12 = `UPDATE dishes SET star_times=${star_times}, star_count=${star_count} WHERE dish_id = ${dish_id}`
				await query.query(ctx,next,sql2,{})
			}
        }catch(e){
        	ctx.body=e.message
        }	
}