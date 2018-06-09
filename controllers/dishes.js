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
            querystring = 'SELECT `dish_id`,`dish_name`,`amount` FROM `order_record` WHERE `order_id` IN \
            (SELECT `order_id` FROM `orders` WHERE `user_id1` = '+userid+')'
        }
		
        var results = await query.query(ctx,next,querystring, queryObj)
        ctx.body = results
    }catch(e){
        ctx.body=e.message
    }
}