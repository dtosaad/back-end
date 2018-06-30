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
//test
router.get('/hello',controllers.hello)
/*=========== APIs ===========*/
// API 1.1,用户登录
router.post('/users/signin',controllers.getUserid)
const sendCode = require('../tools/sendCode')
router.get('/users/signin',sendCode.sendCode)

// API 1.2, 获取用户信息
router.get('/users/:userid', controllers.getUserInfo)

// API 1.3、1.4，获取所有菜品列表、获取用户吃过的菜品列表
router.get('/dishes',controllers.dishes)

// API 1.5， 获取每日推荐的图片链接
router.get('/recommendation',controllers.images)

// API 1.6,  新建订单
router.post('/orders', controllers.addNewOrder)
const sendOrderData = require('../tools/sendOrderData')
router.get('/orders',sendOrderData)

// API 2.1， 获取桌子信息
router.get('/tables',controllers.getAllTables)
//API 2.1， 获取桌子信息
router.get('/tables/:table_id',controllers.queryTable)

// API2.1 确认参与协同点餐
router.post('/tables/:table_id/together', controllers.TogetherOrder.orderTogether)
const oTtrigger = require('../tools/orderTogetherTrigger')
router.get('/tables/:table_id/together', oTtrigger.trigger)

// API 2.2， 上传当前已点的菜品
router.post('/tables/:table_id/dishes', controllers.TogetherOrder.updateDish)
const updateDishTrigger = require('../tools/updateDishTrigger')
router.get('/tables/:table_id/dishes', updateDishTrigger) //controllers.queryOrders

// API 2.4
router.post('/orders/together', controllers.TogetherOrder.commitOrder)
const commitTrigger = require('../tools/commitTrigger')
router.get('/orders/together', commitTrigger)

// API 3.2， 预定桌位
router.post('/tables/:table_id', controllers.reservation)

// API 3.2 取消预订
router.delete('/tables/:table_id', controllers.cancelRes)

//API 4.1 菜品反馈
router.post('/dishes/:dish_id/review', controllers.review)

//API 4.2 菜品推荐

//API 4.3.1 获取用户当前的抵用券
router.get('/discounts', controllers.getDiscount)

// API 4.3.2，使用抵用券，修改API 1.6

// API4.4 外卖

module.exports = router
