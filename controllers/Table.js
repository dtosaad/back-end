query = require('./query.js')

async function take(ctx, next) {
	queryObj = {}
	let table_id = parseInt(ctx.params.table_id)
	let user_id = parseInt(ctx.request.query.user_id)
	let status = parseInt(ctx.request.query.status)
	let sql_avatar = `SELECT wechat_avatar FROM user WHERE user_id=${user_id}`
	let [{ wechat_avatar }] = await query.query(ctx,next,sql_avatar,{})
	let sql = `UPDATE table SET user_id=${user_id},orderers_count=1,user_avatar="${wechat_avatar}",status=${status} WHERE table_id=${table_id}`
	console.log(sql)
	await query.query(ctx,next,sql,{})
}

async function leave(ctx, next) {
  let table_id = ctx.params.table_id
  let sql = `UPDATE table SET user_id=NULL,status=0,user_avatar=NULL,orderers_count=0,orderers_total=0 WHERE table_id=${table_id}`
  await query.query(ctx,next,sql,queryObj)
}

exports = module.exports = {
  take,
  leave,
}
