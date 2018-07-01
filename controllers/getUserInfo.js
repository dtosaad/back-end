module.exports = async (ctx, next) => {
    try{
        let user_id = ctx.params.user_id
        var queryObj = {}
        queryObj.columns = ['wechat_name','phone','location']
        queryObj.table = 'users'
        queryObj.key = 'user_id'
        queryObj.keyValue = user_id
        var querystring
        var results = await query.query(ctx,next,querystring, queryObj)
        ctx.body = results[0]
    }catch(e){
        ctx.body=e.message
    }
}