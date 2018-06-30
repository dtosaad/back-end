query = require('./query')

const tables_num = 28
const dishes_num = 25
const dishes = new Array(tables_num)
for (let i = 0; i < tables_num; ++i) {
	dishes[i] = new Array(dishes_num)
	for (let j = 0; j < dishes_num; ++j) {
		dishes[i][j] = 0
	}
}

module.exports = async (ctx, next) => {
	let delta = ctx.request.body
	let table_id = parseInt(ctx.params.table_id)
	let table_index = table_id - 1
	for (let i = 0; i < dishes_num; ++i) {
		dishes[table_index][i] += delta[i]
	}
	console.log(delta)
	console.log(dishes[table_index])
	ctx.body = dishes[table_index]
}
