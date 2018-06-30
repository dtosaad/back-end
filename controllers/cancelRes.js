query = require('./query.js')

module.exports = async (ctx, next) => {
    // 通过 Koa 中间件进行登录态校验之后
    // 登录信息会被存储到 ctx.state.$wxInfo
    // 具体查看：
	queryObj = {}
    try{
		table_id = ctx.params.table_id
		user_id = ctx.request.query.user_id
		if(!table_id){
			throw new Error('table_id needed!')
		} else {
			let sql = `UPDATE distribution SET user_id=NULL,status=0,user_avatar=NULL,orderers_count=0 WHERE table_id=${table_id}`
			console.log(sql)
			await query.query(ctx,next,sql,queryObj)
		}
	} catch(e){
		ctx.body=e.message
	}

}