/**
 * ajax 服务路由集合
 */
const router = require('koa-router')({
    prefix: '/weapp'
})
const controllers = require('../controllers')

// 从 sdk 中取出中间件
// 这里展示如何使用 Koa 中间件完成登录态的颁发与验证
const { auth: { authorizationMiddleware, validationMiddleware } } = require('../qcloud')

// --- 登录与授权 Demo --- //
// 登录接口
router.get('/login', authorizationMiddleware, controllers.login)
 
// --- 图片上传 Demo --- //
// 图片上传接口，小程序端可以直接将 url 填入 wx.uploadFile 中
router.post('/upload', controllers.upload)

// --- 信道服务接口 Demo --- //
// GET  用来响应请求信道地址的
router.get('/tunnel', controllers.tunnel.get)
// POST 用来处理信道传递过来的消息
router.post('/tunnel', controllers.tunnel.post)

// --- 客服消息接口 Demo --- //
// GET  用来响应小程序后台配置时发送的验证请求
router.get('/message', controllers.message.get)
// POST 用来处理微信转发过来的客服消息
router.post('/message', controllers.message.post)

/*=========== APIs ===========*/

// API 1.1,用户登录
router.post('/users/signin',controllers.getUserid)

// API 1.2 获取用户信息
router.get('/users/:user_id', controllers.getUserInfo)

// API 1.3 & 1.4 获取所有菜品列表、获取用户吃过的菜品列表
router.get('/dishes',controllers.dishes)

// API 1.5 获取每日推荐的图片链接
router.get('/recommendation',controllers.images)

// ====================== 2018.06.30 更新

router.post('/orders', controllers.Order.create)  // 普通&协同
router.put('/orders/:order_id', controllers.Order.addDishes)  // 普通&协同
router.post('/orders/:order_id/pay', controllers.Order.pay)  // 普通
router.post('/orders/:order_id/pay/together', controllers.TogetherOrder.pay)  // 协同
router.post('/tables/:table_id/together', controllers.TogetherOrder.gether)
router.post('/tables/:table_id/dishes', controllers.TogetherOrder.update)
router.post('/tables/:table_id/commit', controllers.TogetherOrder.commit)

// ======================

// API 2.1 获取桌子信息
router.get('/tables',controllers.getAllTables)
router.get('/tables/:table_id',controllers.queryTable)

// API 3.2 坐下/预定桌位
router.post('/tables/:table_id', controllers.Table.take)
router.delete('/tables/:table_id', controllers.Table.leave)

// API 4.1 菜品反馈
router.post('/dishes/:dish_id/review', controllers.review)

// API 4.3.1 抵用券
router.get('/discounts', controllers.getDiscount)


module.exports = router
