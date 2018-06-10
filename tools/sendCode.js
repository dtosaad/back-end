const request = require('request')

exports.sendCode = async (ctx,next)=>{
	var data={
		"code":"somecode",
		"wechat_name":"xxx",
		"wechat_avatar":"xxx"
	}
	request({
		url:'http://localhost:5757/weapp/users/signin',
		method:'POST',
		json:true,
		headers:{
			'content-type':'application/json'
		},
		body:JSON.stringify(data)
	},function(error,response,dody){
		if(error){
			console.log(error.message)
		}
	})
}