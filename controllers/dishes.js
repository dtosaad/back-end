query = require('./query.js')

module.exports = async (ctx, next) => {
    try{
        userid = ctx.request.query.userid
        var queryObj
        var querystring
        if(!userid){
            queryObj = {}
            querystring = 'SELECT `*` FROM dishes'
        }else{
console.log('userid:',userid)
            querystring = 'SELECT * FROM (SELECT `dish_id`,sum(`amount`) as `user_ordered_count` FROM `order_record` WHERE `order_id` IN \
            (SELECT `order_id` FROM `orders` WHERE `user_id1` = '+userid+') GROUP BY `dish_id`) as tmp1\
			LEFT JOIN \
			(SELECT `dish_id`,`dish_name` as `name` FROM `dishes`) as tmp2 ON tmp1.`dish_id` = tmp2.`dish_id`'
        }
		
        var results = await query.query(ctx,next,querystring, queryObj)
        ctx.body = results
    }catch(e){
        ctx.body=e.message
    }
}