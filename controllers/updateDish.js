query = require('./query')
tables_order_together = new Map()

module.exports = async (ctx, next) => {
	info = ctx.request.body
console.log('update dish info:',info)
	var table_id = ctx.params.table_id
console.log('table_id:',table_id)
	var current_orders
	if(tables_order_together.has(table_id)){ //桌位已经存在协同点餐
console.log('already')
		current_orders = tables_order_together.get(table_id)
		for(var i=0; i<info.length; ++i){
			if(current_orders.has(info[i].dish_id)){//此菜品已点过，检查ordered_count是否改变
				if(info[i].ordered_count != current_orders.get(info[i].dish_id).ordered_count){
					current_orders.get(info[i].dish_id).ordered_count = info[i].ordered_count
				}
			}else{
				current_orders.set(info[i].dish_id, info[i])
			}
		}
	}else{ // 桌位刚开始协同点餐
console.log('not yet')
		current_orders = new Map()
		for(var i=0;i<info.length; ++i){
			current_orders.set(info[i].dish_id, info[i])
		}
		tables_order_together.set(table_id,current_orders)
	}
	//console.log('\n\ntables_order_together:', tables_order_together,'\n\n')
console.log('tables_order_together:',tables_order_together)
console.log('this:',tables_order_together.get(table_id))
	result = []
	for(let [dishid, dish] of tables_order_together.get(table_id)){
		console.log('type of dish:',typeof(dish))
		result.push(dish)
		console.log('    ',dish.dish_id)
		console.log('    ',dish.name)
	}
console.log('result:',result)
	ctx.body = result
}