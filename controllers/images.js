module.exports = async (ctx, next) => {
    let number = ctx.request.query.number;
    let result = [
        'images/dishes/5.jpeg',
        'images/dishes/6.jpeg',
        'images/dishes/13.jpeg'
    ];
    ctx.body = result;
}
