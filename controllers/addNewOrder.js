query = require('./query.js')
module.exports = async (ctx, next)=>{
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
		order_id = results.insertId
		
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
	}
	catch(e){
		ctx.body = e.message
	}
}