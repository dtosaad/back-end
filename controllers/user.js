search = require('./search.js')

module.exports = async (ctx, next) => {
    // 通过 Koa 中间件进行登录态校验之后
    // 登录信息会被存储到 ctx.state.$wxInfo
    // 具体查看：
    try{
        	userid = ctx.request.query.userid
			if(!userid){
				throw new Error('userid needed!')
			}
			var queryObj = {}
			queryObj.columns = ['wechat_name','wechat_avatar','location']
			queryObj.table = 'users'
			queryObj.key = 'user_id'
			queryObj.keyValue = userid
			var querystring
			var results = await search.search(ctx,next,querystring, queryObj)
			ctx.body = results
        }catch(e){
        	ctx.body=e.message
        }
    /*if (ctx.state.$wxInfo.loginState === 1) {
        // loginState 为 1，登录态校验成功
        ctx.state.data = ctx.state.$wxInfo.userinfo
        
    } else {
        ctx.state.code = -1
    }*/
}
