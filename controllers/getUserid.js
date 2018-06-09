wx = require('wx')
query = require('./query')
config = require('../config')
axios = require('axios')

module.exports = async (ctx,next)=>{
	var info = JSON.parse(ctx.request.body)
	var code = info.code
    var wechat_name = info.wechat_name
    var wechat_avatar = info.wechat_avatar
    //var location = info.location
	var appid = config.appId
	var appsecret = config.appSecret
	var url = 'https://api.weixin.qq.com/sns/jscode2session?appid='+appid
	   +'&secret='+appsecret+'&js_code='+code+'&grant_type=authorization_code'
	var openid = await axios.get(url)
	.then(function(response){
        return response.openid
	})
	.catch(function(error){
		console.log(error.message)
	})
    return '12345'
    queryObj = {}
    queryObj.columns = 'user_id'
    queryObj.table = 'users'
    queryObj.key = 'openid'
    queryObj.keyValue = openid
    var results = await query.query(ctx, next, '', queryObj)
    if(!results.length){
        querystring = 'INSERT INTO `users` (`wechat_name`, `wechat_avatar`, `location`, `openid`) VALUES ('
            +wechat_name+','+wechat_avatar+','+openid+')'
        results = await query.query(ctx, next, querystring, {})
        return results.insertId
    }else{
        return results[0].user_id
    }
}