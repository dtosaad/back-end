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

function add(table_id, user_id) {
	let table_index = table_id - 1
	orderers[table_index].add(user_id)
}

async function gether(ctx, next) {
	let user_id = parseInt(ctx.request.query.user_id)
	let table_id = parseInt(ctx.params.table_id)
	let table_index = table_id - 1
	if (!orderers[table_index].has(user_id)) {
		let sql = `SELECT orderers_count, orderers_total FROM \`table\` WHERE table_id=${table_id}`
		let [{ orderers_count, orderers_total }] = await query.query(ctx, next, sql, {})
		let update_sql = `UPDATE \`table\` SET orderers_count=${orderers_count+1},orderers_total=${orderers_total+1} WHERE table_id=${table_id}`
		await query.query(ctx, next, update_sql, {})
		orderers[table_index].add(user_id)
	}
	console.log('dishes', dishes[table_index])
	console.log('orderers', orderers[table_index])
	return next()
}

function update(ctx, next) {
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

async function commit(ctx, next) {
	let user_id = parseInt(ctx.request.query.user_id)
	let table_id = parseInt(ctx.params.table_id)
	let table_index = table_id - 1
	orderers[table_index].delete(user_id)
	let orderers_count = orderers[table_index].size
	let update_sql = `UPDATE \`table\` SET orderers_count=${orderers[table_index].size} WHERE table_id=${table_id}`
	await query.query(ctx, next, update_sql, {})
	console.log('dishes', dishes[table_index])
	console.log('orderers', orderers[table_index])
	ctx.body = { orderers_count }
	return next()
}

async function pay(ctx, next) {
	await require('./Order').pay(ctx, () => {})
	let table_id = parseInt(ctx.request.query.table_id)
	let table_index = table_id - 1
	dishes[table_index] = new Array(dishes_num)
	orderers[table_index] = new Set()
	return next()
}

exports = module.exports = {
	add,
	gether,
	update,
	commit,
	pay,
}
