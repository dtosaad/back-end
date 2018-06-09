request = require('request')
module.exports = async(ctx, next) => {
	data = {
		"data":[
  			{
    			"dish_id": 1,
    			"name": "蛋炒饭",
    			"ordered_count": 1 
  			},
  			{
	  			"dish_id": 2,
    			"name": "炒粉",
    			"ordered_count": 2 
  			},
  			{
	  			"dish_id": 3,
    			"name": "炒饭",
    			"ordered_count": 3
  			}
		]
	}
	request({
		url:'http://localhost:5757/weapp/tables/1/dishes',
		method:'POST',
		json:true,//缺少这一行使用JSON.parse时会报错：unexpected token o in JSON at position 1
		headers:{
			'content-type':'application/json'
		},
		body:JSON.stringify(data)
	},function(e, res, body){
		if(e){
			console.log(e.message)
		}
	})
}