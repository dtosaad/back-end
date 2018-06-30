module.exports = async (ctx, next) => {
    let number = ctx.request.query.number;
    let result = [];
    for (let i = 1; i <= number; ++i) {
        result.push(`images/dishes/${i}.jpeg`);
    }
    console.log(result);
    ctx.body = result;
}
