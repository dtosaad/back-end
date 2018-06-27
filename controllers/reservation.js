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
				sql1 = 'SELECT `user_id2` FROM `distribution` WHERE `table_id` ='+table_id
				var result1 = await query.query(ctx,next,sql1,queryObj)
				user_id0 = result1[0].user_id2
				if (!user_id0) {
				sq12 = 'UPDATE `distribution` SET `user_id2` = \''+user_id+'\' WHERE `table_id` ='+table_id
				await query.query(ctx,next,sql2,queryObj)
				sql3 = 'CREATE EVENT event_0 \
				        ON SCHEDULE AT CURRENT_TIMESTAMP + INTERVAL 15 MINUTE \
						DO \
						    UPDATE `distribution` SET `user_id2` = NULL WHERE `table_id` ='+table_id
				await query.query(ctx,next,sql3,queryObj)
				} else {
					throw new Error('table reserved or being used!')
				}
			}
        }catch(e){
        	ctx.body=e.message
        }

}