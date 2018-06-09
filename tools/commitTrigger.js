request = require('request')
module.exports = async(ctx, next)=>{
	request({
		method:'POST',
		url:'http://localhost:5757/weapp/orders/together?user_id=15333333'
	},function(e, res, body){
		if(e){
			console.log(e.message)
		}
	})
}