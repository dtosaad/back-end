query = require('./query.js')

async function get(ctx, next) {
	let order_id = parseInt(ctx.params.order_id)
	let sql = `SELECT * FROM order WHERE order_id=${order_id}`
	let [order] = await query.query(ctx, next, sql, {})
	let dish_sql = `SELECT dish_id,amount FROM order_dish WHERE order_id=${order_id}`
	order.dishes = await query.query(ctx, next, dish_sql, {})
	ctx.body = order
}

async function create(ctx, next) {
	try{
		let user_id = parseInt(ctx.request.query.user_id)
		info = ctx.request.body
		total_price = 0
		takeout_info = info.takeout_info
		discount_id = info.discount_id
		note = info.note
		dishes = info.dishes
		dinning_choice = info.dinning_choice

		for(var i = 0; i < dishes.length; ++i){
			var dish = dishes[i]
			dish_id = dish.dish_id
			amount = dish.amount
			total_price += amount * dish.price
			//update dishes
			sql_select = 'SELECT `ordered_count` FROM `dish` WHERE `dish_id` ='+dish_id
			var results = await query.query(ctx, next, sql_select, {})
			original_count = results[0].ordered_count
			var new_count = amount+original_count
			sql_update = 'UPDATE `dish` SET `ordered_count`= '+new_count+' WHERE `dish_id`='+dish_id
			await query.query(ctx, next, sql_update, {})
		}

		//update user(if needed)
		if(takeout_info){
			queryObj = {}
			queryObj.table = 'user'
			queryObj.columns = ['wechat_name','phone','location']
			queryObj.key = 'user_id'
			queryObj.keyValue = user_id
				user_info = await query.query(ctx, next, '', queryObj)
			wechat_name = !user_info[0].wechat_name?takeout_info.name:user_info[0].wechat_name
			phone = !user_info[0].phone?takeout_info.phone:user_info[0].phone
			location = !user_info[0].location?takeout_info.location:user_info[0].location

			sql_update = 'UPDATE `user` SET `wechat_name`=\'' + wechat_name + '\', `location`=\''
				+ location + '\', `phone`=\'' + phone + '\' WHERE `user_id`=\'' + user_id + '\''
			await query.query(ctx, next, sql_update, {})
		}

		//get info of discount(if needed)
		if(discount_id){
			queryObj={}
			queryObj.table='discount'
			queryObj.columns=['money','amount']
			queryObj.key='discount_id'
			queryObj.keyValue=discount_id
			discount_info = await query.query(ctx, next, '', queryObj)

			discount_value = discount_info[0].money
			discount_amount = discount_info[0].amount
			total_price -= discount_value

			//delete discount
			--discount_amount
			sql = ''
			if(discount_amount<=0){
				sql = 'DELETE FROM `discount` WHERE `discount_id`=\''+discount_id+'\''
			}else{
				sql = 'UPDATE `discount` SET `amount`= \''+discount_amount+'\' WHERE `discount_id`=\''+discount_id+'\''
			}
		console.log(sql)
			await query.query(ctx, next, sql, {})
		}

		//update order
		sql4 = 'INSERT INTO `order` (`user_id`, `dinning_choice`,`total_price`,`note`) VALUES (\''
			+user_id+'\', \''+dinning_choice+'\', \''+total_price+'\', \''+ note +'\')'
		results = await query.query(ctx, next,sql4, {})
		let order_id = results.insertId
		
		for(var i = 0; i < dishes.length; ++i){
			var dish = dishes[i]
			dish_id = dish.dish_id
			amount = dish.amount
		
			// insert into order_dish (order_id, dish_id, amount)
			sql_insert_order_dish = 'INSERT INTO `order_dish` (`order_id`, `dish_id`, `amount`) VALUES (\''
				+ order_id + '\', \'' + dish_id + '\', \'' + amount + '\')'

			await query.query(ctx, next, sql_insert_order_dish, {})
		}

		// add discount
		new_discount_money = 0
		flag = false
		if(total_price >= 300){
			new_discount_money = 30
			flag = true
		}else if(total_price >= 200){
			new_discount_money = 20
			flag = true
		}else if(total_price >= 100){
			new_discount_money = 10
			flag = true
		}
		if(flag){
			sql_select_discount = 'SELECT * FROM `discount` WHERE `user_id` = \'' + user_id 
				+ '\' AND `money` = \'' + new_discount_money + '\''
			discount_info = await query.query(ctx, next, sql_select_discount, {})

			let sql_discount
			if(discount_info && discount_info.length){
				if(discount_info[0].amount){
					sql_discount = 'UPDATE `discount` SET `amount`= ' + (discount_info[0].amount+1)
					+ ' WHERE `discount_id`=' + discount_info[0].discount_id
				}else{
					sql_discount = 'INSERT INTO `discount` (`user_id`, `money`,`amount`) VALUES (\''
						+user_id+'\', \''+new_discount_money+'\', \'1\')'
				}
			}else{
				sql_discount = 'INSERT INTO `discount` (`user_id`, `money`,`amount`) VALUES (\''
					+user_id+'\', \''+new_discount_money+'\', \'1\')'
			}
			await query.query(ctx, next, sql_discount, {})
		}

		// 更新 table 中的 order_id
		let { table_id } = ctx.request.body
		let table_sql = `UPDATE table SET order_id=${order_id} WHERE table_id=${table_id}`
		await query.query(ctx, next, table_sql, {})

		ctx.body = { order_id }
	}
	catch(e){
		ctx.body = e.message
	}
}

async function addDishes(ctx, next) {
	let order_id = parseInt(ctx.params.order_id)
	let user_id = parseInt(ctx.request.query.user_id)
	let new_dishes = ctx.request.body
	let money = 0.00
	for (let dish of new_dishes) {
		let sql = `SELECT * FROM order_dish WHERE order_id=${order_id} AND dish_id=${dish.dish_id}`
		let [old_dish] = await query.query(ctx, next, sql, {})
		if (old_dish) {
			let new_amount = old_dish. + dish.amount
			let sql = `UPDATE order_dish SET amount=${new_amount} WHERE od_id=${old_dish.od_id}`
			await query.query(ctx, next, sql, {})
		} else {
			let sql = `INSERT INTO order_dish (order_id,dish_id,amount) VALUES (${order_id},${dish.dish_id},${dish.amount})`
			await query.query(ctx, next, sql, {})
		}
		money += dish.price * dish.amount
	}
	let sql = `SELECT * FROM order WHERE order_id=${order_id}`
	let [{ total_price }] = await query.query(ctx, next, sql, {})
	let update_sql = `UPDATE order SET total_price=${total_price+money} WHERE order_id=${order_id}`
	await query.query(ctx, next, update_sql, {})
}

async function pay(ctx, next) {
	let user_id = parseInt(ctx.request.query.user_id)
	let order_id = parseInt(ctx.params.order_id)
	let table_id = ctx.request.body.table_id
	let update_order_sql = `UPDATE order SET user_id=${user_id} WHERE order_id=${order_id}`
	await query.query(ctx, next, update_order_sql, {})
	let update_table_sql = `UPDATE table SET user_id=NULL,orderers_count=0,orderers_total=0,user_avatar=NULL,status=0,order_id=NULL WHERE table_id=${table_id}`
	await query.query(ctx, next, update_table_sql, {})
	return next()
}

exports = module.exports = {
	get,
	create,
	addDishes,
	pay,
}