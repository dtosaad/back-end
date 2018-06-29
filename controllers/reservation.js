query = require('./query.js')

module.exports = async (ctx, next) => {
    // 通过 Koa 中间件进行登录态校验之后
    // 登录信息会被存储到 ctx.state.$wxInfo
    // 具体查看：
	/*queryObj = {}
    try {
      table_id = ctx.params.table_id
	  queryObj = {}
    try{
        	table_id = ctx.params.table_id
			user_id = ctx.request.query.user_id
      console.log('table_id:', table_id)
      console.log('user_id:', user_id)
			if(!table_id){
				throw new Error('table_id needed!')
			} else {
				sql1 = 'SELECT `user_id` FROM `distribution` WHERE `table_id` ='+table_id
				var result1 = await query.query(ctx,next,sql1,queryObj)
				user_id0 = result1[0].user_id
				if (!user_id0) {
          sql_tmp = 'SELECT `wechat_avatar` FROM `users` WHERE `user_id` ='+user_id
          var result2 = await query.query(ctx,next,sql_tmp,queryObj)
          user_avatar = result2[0].wechat_avatar
          sql2 = 'UPDATE `distribution` SET `user_id` = ' + user_id + ',`orderers_count` = 1, `user_avatar` = \'' + user_avatar + '\ \
                WHERE `table_id` ='+table_id
          console.log(sql2)
				  await query.query(ctx,next,sql2,queryObj)
          setTimeout(async function(){
            sql3 = 'UPDATE `distribution` SET `user_id` = NULL WHERE `table_id` =' + table_id
            console.log(sql3,table_id,query.query)
            await query.query(ctx,next,sql3,{})
          },900000)        
          			sql_tmp = 'SELECT `wechat_avatar` FROM `users` WHERE `user_id` ='+user_id
          			var result2 = await query.query(ctx,next,sql_tmp,queryObj)
          			user_avatar = result2[0].wechat_avatar
          			sql2 = 'UPDATE `distribution` SET `user_id` = ' + user_id + ',`orderers_count` = 1, `user_avatar` = \'' + user_avatar + '\ \
                		WHERE `table_id` ='+table_id
				  	await query.query(ctx,next,sql2,queryObj)    
				} else {
					throw new Error('table reserved or being used!')
				}
			}
    }catch(e){
      ctx.body=e.message
    }
        }catch(e){
        	ctx.body=e.message
        }*/

}