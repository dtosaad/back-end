const request = require('request')

module.exports = async (ctx, next)=>{
	var data={
  		"dished": [
    		{
      			"dishid": 1,
      			"name": "蛋炒饭",
      			"price": 10.00,
      			"amount": 2
    		}
  		],
  		"people_count": 2,
  		"eating_mode": 1,
  		"note": "不要辣",
  		"takeout_info": {
    		"name": "偷外卖死全家",
    		"phone": 15521221390,
    		"location": "中山大学东校区慎思园 6 号"
  		}
	}
	request({
		url:'http://localhost:5757/weapp/orders',
		method:'POST',
		json:true,
		headers:{
			'content-type':'application/json'
		},
		body:JSON.stringify(data)
	},function(error,response,body){
		if(error){
			console.log(error.message)

		}
	})
}