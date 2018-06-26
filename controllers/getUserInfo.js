module.exports = async (ctx, next) => {
    try{
        userid = ctx.params.userid
        if(!userid){
            throw new Error('userid needed!')
        }
        var queryObj = {}
        queryObj.columns = ['wechat_name','phone','location']
        queryObj.table = 'users'
        queryObj.key = 'user_id'
        queryObj.keyValue = userid
        var querystring
        var results = await query.query(ctx,next,querystring, queryObj)
        ctx.body = results[0]
    }catch(e){
        ctx.body=e.message
    }
}