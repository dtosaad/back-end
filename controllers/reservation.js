query = require('./query.js')

module.exports = async (ctx, next) => {
    // 通过 Koa 中间件进行登录态校验之后
    // 登录信息会被存储到 ctx.state.$wxInfo
    // 具体查看：
	queryObj = {}
    try {
      let table_id = ctx.params.table_id
      let user_id = ctx.request.query.user_id
      let status = parseInt(ctx.request.query.status)
      let sql_avatar = `SELECT wechat_avatar FROM users WHERE user_id=${user_id}`
      let [user_avatar] = await await query.query(ctx,next,sql_avatar,{})
      let sql = `UPDATE distribution SET user_id=${user_id},orderers_count=1,user_avatar=${user_avatar},status=${status} WHERE table_id=${table_id}`
      await query.query(ctx,next,sql,{})
      setTimeout(async function(){
        let sql = `UPDATE distribution SET user_id=NULL,orderers_count=0,user_avatar=NULL,status=0 WHERE table_id=${table_id}`
        await query.query(ctx,next,sql,{})
      }, 900000)
    } catch(e) {
      ctx.body = e.message
    }
}