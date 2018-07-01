query = require('./query')
config = require('../config')
axios = require('axios')

module.exports = async (ctx,next)=>{
    let getOpenId = function (id, secret, code) {
        return new Promise((resolve, reject) => {
            let url = `https://api.weixin.qq.com/sns/jscode2session?appid=${id}&secret=${secret}&js_code=${code}&grant_type=authorization_code`;
            request(url, (error, response, body) => {
                if (error) {
                    reject(error)
                }else{
                    resolve(response)
                }
            });
        })
    }
    try{
        var info = ctx.request.body
        var code = info.code
        var wechat_name = info.wechat_name
        var wechat_avatar = info.wechat_avatar
        //var location = info.location
        var appid = config.appId
        var appsecret = config.appSecret
        /*var url = 'https://api.weixin.qq.com/sns/jscode2session?appid='+appid
        +'&secret='+appsecret+'&js_code='+code+'&grant_type=authorization_code'
        var openid = await axios.get(url)
        .then(function(response){
    
            return response.openid
        })
        .catch(function(error){
            console.log(error.message)
        })*/
        let result = await getOpenId(appid, appsecret, code)
        var openid = JSON.parse(result.body).openid
        queryObj = {}
        queryObj.columns = 'user_id'
        queryObj.table = 'users'
        queryObj.key = 'openid'
        queryObj.keyValue = openid
        var results = await query.query(ctx, next, '', queryObj)
        var user_id = null
        if(!results || !results.length){
            querystring=''
            if(openid){
                querystring = 'INSERT INTO `users` (`wechat_name`, `wechat_avatar`, `openid`) VALUES (\''
                +wechat_name+'\',\''+wechat_avatar+'\',\''+openid+'\')'
                results_insert = await query.query(ctx, next, querystring, {})
                user_id = results_insert.insertId
            }else{
                querystring = 'INSERT INTO `users` (`wechat_name`, `wechat_avatar`) VALUES (\''
                +wechat_name+'\',\''+wechat_avatar+'\')'
            }
            
        }else{
            user_id = results[0].user_id
        }
        ans = {
            "open_id": openid,
            "user_id": user_id
        }
        ctx.body = ans
    }
    catch(e){
        ctx.response.body=e.message
    }
        
}