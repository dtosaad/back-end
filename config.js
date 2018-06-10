const CONF = {
    port: '5757',
    rootPathname: '',

    // 微信小程序 App ID
    appId: 'wxde99d98b14941b95',

    // 微信小程序 App Secret
    appSecret: 'e012c7570d36867c6f66d8dd6bd433e7',

    // 是否使用腾讯云代理登录小程序
    useQcloudLogin: true,

    /**
     * MySQL 配置，用来存储 session 和用户信息
     * 若使用了腾讯云微信小程序解决方案
     * 开发环境下，MySQL 的初始密码为您的微信小程序 appid
     */
    mysql: {
        host: 'localhost',
        port: 3306,
        user: 'root',
<<<<<<< HEAD
        db: 'sysucanteen0',
        pass: '15331430',
=======
        db: 'cAuth',
        pass: 'wxde99d98b14941b95',//'dtosaad2018',
        char: 'utf8mb4'
    },
    /*mysql: {
        host: 'localhost',
        port: 3306,
        user: 'root',
        db: 'sysu-canteen0',
        pass: '15331427',
>>>>>>> 4831aad891a134e3b851d278314a8503768424b2
        char: 'utf8mb4'
    },*/

    cos: {
        /**
         * 地区简称
         * @查看 https://cloud.tencent.com/document/product/436/6224
         */
        region: 'ap-guangzhou',
        // Bucket 名称
        fileBucket: 'qcloudtest',
        // 文件夹
        uploadFolder: ''
    },

    // 微信登录态有效期
    wxLoginExpires: 7200,
    wxMessageToken: 'abcdefgh'
}

module.exports = CONF
