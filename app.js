const Koa = require('koa')
const app = new Koa()
const debug = require('debug')('koa-weapp-demo')
const response = require('./middlewares/response')
const bodyParser = require('koa-bodyparser')
const koaJson = require('koa-json')
const serve = require('koa-static');
const logger = require('koa-logger')
const config = require('./config')

// 使用响应处理中间件
app.use(response)
app.use(bodyParser({strict:false}))//添加 {strict:false}以后，JSON就不会将合法json结构体判定为invalid JSON
app.use(koaJson())
app.use(logger())
app.use(serve(__dirname + '/Assets'))

// 引入路由分发
const router = require('./routes')
app.use(router.routes())

// 启动程序，监听端口
app.listen(config.port, () => debug(`listening on port ${config.port}`))
