const request = require('request')

exports.sendCode = async (ctx,next)=>{
	var data={
		"code":"023QewHC1Rho440w73LC1vjiHC1QewHr",
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
		body:data//JSON.stringify(data)
	},function(error,response,dody){
		if(error){
			console.log(error.message)
		}
	})
}