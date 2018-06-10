query = require('./query.js')

module.exports = async (ctx, next) => {
    // 通过 Koa 中间件进行登录态校验之后
    // 登录信息会被存储到 ctx.state.$wxInfo
    // 具体查看：
    try{
		table_id = ctx.request.query.table_id
		var queryObj = {}
		var queryString
		if (!table_id) {
			queryString = 'SELECT `*` FROM table'
		} else {
		    queryObj.columns = ['table_id','number','user_id','user_avatar']
			queryObj.table = 'table'
			queryObj.key = 'table_id'
			queryObj.keyValue = userid
		}
		var results = await query.query(ctx,next,querystring, queryObj)
        ctx.body = results
        }catch(e){
        	ctx.body=e.message
        }

}