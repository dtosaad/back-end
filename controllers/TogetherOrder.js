query = require('./query')

const tables_num = 28
const dishes_num = 25
const dishes = new Array(tables_num)
const orderers = new Array(tables_num)
for (let i = 0; i < tables_num; ++i) {
	dishes[i] = new Array(dishes_num)
	orderers[i] = new Set()
	for (let j = 0; j < dishes_num; ++j) {
		dishes[i][j] = 0
	}
}

async function reservation(ctx, next) {
	queryObj = {}
	let table_id = parseInt(ctx.params.table_id)
	let table_index = table_id - 1
	let user_id = parseInt(ctx.request.query.user_id)
	let status = parseInt(ctx.request.query.status)
	let sql_avatar = `SELECT wechat_avatar FROM users WHERE user_id=${user_id}`
	let [{ wechat_avatar }] = await query.query(ctx,next,sql_avatar,{})
	let sql = `UPDATE distribution SET user_id=${user_id},orderers_count=1,user_avatar="${wechat_avatar}",status=${status} WHERE table_id=${table_id}`
	console.log(sql)
	await query.query(ctx,next,sql,{})
	orderers[table_index].add(user_id)
		// let timeout = status === 1 ? 2*60*60*100 : 15*60*1000
		// setTimeout(async function() {
		// 	let sql = `UPDATE distribution SET user_id=NULL,orderers_count=0,user_avatar=NULL,status=0 WHERE table_id=${table_id}`
		// 	await query.query(ctx,next,sql,{})
		// }, timeout)
}

async function orderTogether(ctx, next) {
	let user_id = parseInt(ctx.request.query.user_id)
	let table_id = parseInt(ctx.params.table_id)
	let table_index = table_id - 1
	console.log('*********', user_id, ctx.request.query.user_id)
	if (!orderers[table_index].has(user_id)) {
		orderers[table_index].add(user_id)
		let sql = `UPDATE distribution SET orderers_count=${orderers[table_index].size} WHERE table_id=${table_id}`
		await query.query(ctx, next, sql, {})
	}
	console.log('dishes', dishes[table_index])
	console.log('orderers', orderers[table_index])
	return next()
}

function updateDish(ctx, next) {
	let delta = ctx.request.body
	let table_id = parseInt(ctx.params.table_id)
	let table_index = table_id - 1
	for (let i = 0; i < dishes_num; ++i) {
		dishes[table_index][i] += delta[i]
	}
	console.log('dishes', dishes[table_index])
	ctx.body = dishes[table_index]
	return next()
}

async function commitOrder(ctx, next) {
	let user_id = parseInt(ctx.request.query.user_id)
	let table_id = parseInt(ctx.params.table_id)
	let table_index = table_id - 1
	orderers[table_index].delete(user_id)
	let sql = `UPDATE distribution SET orderers_count=${orderers[table_index].size} WHERE table_id=${table_id}`
	await query.query(ctx, next, sql, {})
	ctx.body = { orderers_count: orderers[table_index].size }
	console.log('dishes', dishes[table_index])
	console.log('orderers', orderers[table_index])
	return next()
}

exports = module.exports = {
	reservation,
	orderTogether,
	updateDish,
	commitOrder,
}
