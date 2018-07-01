query = require('./query.js')

module.exports = async (ctx, next) => {
    try{
        let user_id = parseInt(ctx.request.query)
        var queryObj
        var querystring
        if(!user_id){
            queryObj = {}
            querystring = 'SELECT `*` FROM dishes'
        }else{
            querystring = 'SELECT * FROM (SELECT `dish_id`,sum(`amount`) as `user_ordered_count` FROM `order_record` WHERE `order_id` IN \
            (SELECT `order_id` FROM `orders` WHERE `user_id` = '+user_id+') GROUP BY `dish_id`) as tmp1\
			LEFT JOIN \
			(SELECT `dish_id`,`dish_name` as `name` FROM `dishes`) as tmp2 ON tmp1.`dish_id` = tmp2.`dish_id`'
        }
		
        var results = await query.query(ctx,next,querystring, queryObj)
        ctx.body = results
    }catch(e){
        ctx.body=e.message
    }
}