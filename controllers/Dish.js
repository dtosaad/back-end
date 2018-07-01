query = require('./query.js')

async function all(ctx, next) {
    let querystring = 'SELECT `*` FROM dish'
    var results = await query.query(ctx,next,querystring, queryObj)
    ctx.body = results
}

async function mine(ctx, next) {
    let { user_id } = ctx.request.query
    let querystring = 'SELECT * FROM (SELECT `dish_id`,sum(`amount`) as `user_ordered_count` FROM `order_dish` WHERE `order_id` IN \
    (SELECT `order_id` FROM `order` WHERE `user_id` = '+user_id+') GROUP BY `dish_id`) as tmp1\
    LEFT JOIN \
    (SELECT `dish_id`,`dish_name` as `name` FROM `dish`) as tmp2 ON tmp1.`dish_id` = tmp2.`dish_id`'
    var results = await query.query(ctx,next,querystring, queryObj)
    ctx.body = results
}

exports = module.exports = {
    all,
    mine,
}