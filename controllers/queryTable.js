query = require('./query')
module.exports = async (ctx, next)=>{
	let table_id = ctx.params.table_id //ctx.request.params === undefined
	let sql = `SELECT * FROM table WHERE table_id = ${table_id}`
	let [table] = await query.query(ctx, next, sql, {})
	console.log(sql, table)
	ctx.body = table
}
