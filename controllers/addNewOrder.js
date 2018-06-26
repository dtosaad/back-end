query = require('./query.js')
module.exports = async (ctx, next)=>{
	info = ctx.request.body
	total_price=0

	for(var i = 0; i < info.dishes.length; ++i){
		var dish = info.dishes[i]
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

	user_id = info.user_id
	dinning_choice = info.dinning_choice

	//update users
	takeout_info = info.takeout_info
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

	//get info of discount
	queryObj={}
	queryObj.table='coupon'
	queryObj.columns=['money','amount']
	queryObj.key='discount_id'
	queryObj.keyValue=info.discount_id
	discount_info = await query.query(ctx, next, '', queryObj)
	discount_value = discount_info[0].money
	discount_amount = discount_info[0].amount
	total_price -= discount_value

	//delete discount
	--discount_amount
	sql = ''
	if(discount_amount<=0){
		sql = 'DELETE FROM `coupon` WHERE `discount_id`=\''+info.discount_id+'\''
	}else{
		sql = 'UPDATE `coupon` SET `amount`= \''+discount_amount+'\' WHERE `discount_id`=\''+info.discount_id+'\''
	}
	await query.query(ctx, next, sql, {})

	//update orders
	sql4 = 'INSERT INTO `orders` (`user_id1`, `dinning_choice`,`total_price`,`note`) VALUES (\''
		+user_id+'\', \''+dinning_choice+'\', \''+total_price+'\', \''+info.note+'\')'
	results = await query.query(ctx, next,sql4, {})
	order_id = results.insertId
	
	// update order_record (order_id, dish_id,amount)
	sql5 = 'INSERT INTO `order_record` (`order_id`, `dish_id`, `amount`) VALUES (\''
		+order_id+'\', \''+dish_id+'\', \''+info.people_count+'\')'
	await query.query(ctx, next,sql5, {})

	sql_delete = 'DELETE FROM `coupon` WHERE `discount_id`='+info.discount_id
	await query.query(ctx, next, sql_delete, {})
}