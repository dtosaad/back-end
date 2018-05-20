const Koa = require('koa')
const app = new Koa()
const debug = require('debug')('koa-weapp-demo')
const response = require('./middlewares/response')
const bodyParser = require('koa-bodyparser')
const koaJson = require('koa-json')
const config = require('./config')
const sendRequest = require('./tools/sendRequest')

initCtx = require('./middlewares/initCtx')

// 使用响应处理中间件
app.use(response)

// 解析请求体
app.use(bodyParser())
app.use(koaJson())
// 引入路由分发
const router = require('./routes')
app.use(router.routes())

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

app.use(sendRequest())
// 启动程序，监听端口
app.listen(config.port, () => debug(`listening on port ${config.port}`))
