query = require('./query.js')

async function create(ctx, next) {
	try{
		info = ctx.request.body
		total_price = 0
		takeout_info = info.takeout_info
		discount_id = info.discount_id
		note = info.note
		dishes = info.dishes
		user_id = info.user_id
		dinning_choice = info.dinning_choice

		for(var i = 0; i < dishes.length; ++i){
			var dish = dishes[i]
			dish_id = dish.dish_id
			amount = dish.amount
			total_price += amount * dish.price
			//update dishes
			sql_select = 'SELECT `ordered_count` FROM `dishes` WHERE `dish_id` ='+dish_id
			var results = await query.query(ctx, next, sql_select, {})
			original_count = results[0].ordered_count
			var new_count = amount+original_count
			sql_update = 'UPDATE `dishes` SET `ordered_count`= '+new_count+' WHERE `dish_id`='+dish_id
			await query.query(ctx, next, sql_update, {})
		}

		//update users(if needed)
		if(takeout_info){
			queryObj = {}
			queryObj.table = 'users'
			queryObj.columns = ['wechat_name','phone','location']
			queryObj.key = 'user_id'
			queryObj.keyValue = user_id
				user_info = await query.query(ctx, next, '', queryObj)
			wechat_name = !user_info[0].wechat_name?takeout_info.name:user_info[0].wechat_name
			phone = !user_info[0].phone?takeout_info.phone:user_info[0].phone
			location = !user_info[0].location?takeout_info.location:user_info[0].location

			sql_update = 'UPDATE `users` SET `wechat_name`=\'' + wechat_name + '\', `location`=\''
				+ location + '\', `phone`=\'' + phone + '\' WHERE `user_id`=\'' + user_id + '\''
			await query.query(ctx, next, sql_update, {})
		}

		//get info of discount(if needed)
		if(discount_id){
			queryObj={}
			queryObj.table='coupon'
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
				sql = 'DELETE FROM `coupon` WHERE `discount_id`=\''+discount_id+'\''
			}else{
				sql = 'UPDATE `coupon` SET `amount`= \''+discount_amount+'\' WHERE `discount_id`=\''+discount_id+'\''
			}
		console.log(sql)
			await query.query(ctx, next, sql, {})
		}

		//update orders
		sql4 = 'INSERT INTO `orders` (`user_id`, `dinning_choice`,`total_price`,`note`) VALUES (\''
			+user_id+'\', \''+dinning_choice+'\', \''+total_price+'\', \''+ note +'\')'
		results = await query.query(ctx, next,sql4, {})
		let order_id = results.insertId
		
		for(var i = 0; i < dishes.length; ++i){
			var dish = dishes[i]
			dish_id = dish.dish_id
			amount = dish.amount
		
			// insert into order_record (order_id, dish_id, amount)
			sql_insert_order_record = 'INSERT INTO `order_record` (`order_id`, `dish_id`, `amount`) VALUES (\''
				+ order_id + '\', \'' + dish_id + '\', \'' + amount + '\')'

			await query.query(ctx, next, sql_insert_order_record, {})
		}

		// add coupon
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
			sql_select_coupon = 'SELECT * FROM `coupon` WHERE `user_id` = \'' + user_id 
				+ '\' AND `money` = \'' + new_discount_money + '\''
			coupon_info = await query.query(ctx, next, sql_select_coupon, {})

			let sql_coupon
			if(coupon_info && coupon_info.length){
				if(coupon_info[0].amount){
					sql_coupon = 'UPDATE `coupon` SET `amount`= ' + (coupon_info[0].amount+1)
					+ ' WHERE `discount_id`=' + coupon_info[0].discount_id
				}else{
					sql_coupon = 'INSERT INTO `coupon` (`user_id`, `money`,`amount`) VALUES (\''
						+user_id+'\', \''+new_discount_money+'\', \'1\')'
				}
			}else{
				sql_coupon = 'INSERT INTO `coupon` (`user_id`, `money`,`amount`) VALUES (\''
					+user_id+'\', \''+new_discount_money+'\', \'1\')'
			}
			await query.query(ctx, next, sql_coupon, {})
		}

		// 更新 table 中的 order_id
		let { table_id } = ctx.request.body
		let table_sql = `UPDATE distribution SET order_id=${order_id} WHERE table_id=${table_id}`
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
		let sql = `SELECT * FROM order_record WHERE order_id=${order_id} AND dish_id=${dish.dish_id}`
		let [or] = await query.query(ctx, next, sql, {})
		let new_amount = 0
		if (old_dish) {
			new_amount = or.amount + dish.amount
		}
		let update_sql = `UPDATE order_record SET amount=${new_amount} WHERE od_id=${or.od_id}`
		await query.query(ctx, next, update_sql, {})
		money += dish.money * dish.amount
	}
	let sql = `SELECT * FROM orders WHERE order_id=${order_id}`
	let [{ total_price }] = await query.query(ctx, next, sql, {})
	let update_sql = `UPDATE orders SET total_price=${total_price+money} WHERE order_id=${order_id}`
	await query.query(ctx, next, update_sql, {})
}

async function pay(ctx, next) {
	let user_id = parseInt(ctx.request.query.user_id)
	let order_id = parseInt(ctx.params.order_id)
	let table_id = ctx.request.body.table_id
	let update_order_sql = `UPDATE orders SET user_id=${user_id} WHERE order_id=${order_id}`
	await query.query(ctx, next, update_order_sql, {})
	let update_table_sql = `UPDATE distribution SET user_id=NULL,orderers_count=0,orderers_total=0,user_avatar=NULL,status=0,order_id=NULL WHERE table_id=${table_id}`
	await query.query(ctx, next, update_table_sql, {})
	return next()
}

exports = module.exports = {
	create,
	addDishes,
	pay,
}