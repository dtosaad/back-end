module.exports = (ctx,next)=>{
	ctx.param = {
		body:ctx.request.body,
		query:ctx.request.query
	}
	return next()
}