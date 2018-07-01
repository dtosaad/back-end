query = require('./query.js')

async function all(ctx, next) {
	let sql = 'SELECT * FROM \`table\`'
	let tables = await query.query(ctx, next, sql, {})
	ctx.body = tables
}

async function one(ctx, next) {
	let table_id = ctx.params.table_id
	let sql = `SELECT * FROM \`table\` WHERE table_id = ${table_id}`
	let [table] = await query.query(ctx, next, sql, {})
	ctx.body = table
}

async function take(ctx, next) {
	queryObj = {}
	let table_id = parseInt(ctx.params.table_id)
	let user_id = parseInt(ctx.request.query.user_id)
	let status = parseInt(ctx.request.query.status)
	let sql_avatar = `SELECT wechat_avatar FROM user WHERE user_id=${user_id}`
	let [{ wechat_avatar }] = await query.query(ctx,next,sql_avatar,{})
	let sql = `UPDATE \`table\` SET user_id=${user_id},orderers_count=1,orderers_total=1,user_avatar="${wechat_avatar}",status=${status} WHERE table_id=${table_id}`
	await query.query(ctx,next,sql,{})
	require('./TogetherOrder').add(table_id, user_id)
}

async function leave(ctx, next) {
  let table_id = ctx.params.table_id
  let sql = `UPDATE \`table\` SET user_id=NULL,status=0,user_avatar=NULL,orderers_count=0,orderers_total=0 WHERE table_id=${table_id}`
  await query.query(ctx, next, sql, {})
}

exports = module.exports = {
  all,
  one,
  take,
  leave,
}
