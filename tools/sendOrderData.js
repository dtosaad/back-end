const request = require('request')

module.exports = async (ctx, next)=>{
	var data={
		  "user_id":15333334,
  		"dishes": [
  			{
      			"dish_id": 1,
      			"dish_name": "蛋炒饭",
      			"price": 10.00,
      			"amount": 2
  			},
  			{
      			"dish_id": 2,
      			"dish_name": "炒粉",
      			"price": 10.00,
      			"amount": 2
  			}
  		],
  		"people_count": 2,
  		"dinning_choice": 1,
  		"note": "不要辣",
  		"takeout_info": {
    		"name": "偷外卖死全家",
    		"phone": 15521221390,
    		"location": "中山大学东校区慎思园 6 号"
  		},
      "discount_id":1
	}
	request({
		url:'http://localhost:5757/weapp/orders',
		method:'POST',
		json:true,
		headers:{
			'content-type':'application/json'
		},
		body:data//JSON.stringify(data)
	},function(error,response,body){
		if(error){
			console.log(error.message)
		}
	})
}