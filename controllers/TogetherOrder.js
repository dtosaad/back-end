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

async function orderTogether(ctx, next) {
	let user_id = parseInt(ctx.request.query.user_id)
	let table_id = parseInt(ctx.params.table_id)
	let table_index = table_id - 1
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
	orderTogether,
	updateDish,
	commitOrder,
}
