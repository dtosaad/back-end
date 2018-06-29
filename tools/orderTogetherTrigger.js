request = require('request')
exports.trigger = async(ctx, next) => {
	request({
		method:'POST',
		url:'http://localhost:5757/weapp/tables/1/together'
	},function(e, res, body){
		if(e){
			console.log(e.message)
		}
	})
}