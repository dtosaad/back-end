query = require('./query.js')

module.exports = async (ctx, next) => {
    // 通过 Koa 中间件进行登录态校验之后
    // 登录信息会被存储到 ctx.state.$wxInfo
    // 具体查看：
	queryObj = {}
    try{
        	table_id = ctx.request.query.table_id
			user_id = ctx.request.query.user_id
			if(!table_id){
				throw new Error('table_id needed!')
			} else {
				sql1 = 'SELECT `user_id` FROM `table` WHERE `table_id` ='+table_id
				var result1 = await query.query(ctx,next,sql1,queryObj)
				user_id0 = result1[0].user_id
				if (user_id == user_id0) {
				sq12 = 'UPDATE `table` SET `user_id` = NULL WHERE `table_id` ='+table_id
				await query.query(ctx,next,sql2,queryObj)
				} else {
					throw new Error('You have not reserved this table!')
				}
			}
        }catch(e){
        	ctx.body=e.message
        }

}