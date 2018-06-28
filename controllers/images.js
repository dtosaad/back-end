module.exports = async (ctx, next) => {
    let number = ctx.request.query.number;
    let result = [];
    for (let i = 1; i <= number; ++i) {
        result.push(`images/dishes/${i}.jpg`);
    }
    ctx.body = result;
}
