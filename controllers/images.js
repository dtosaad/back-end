path = require('path')
const fs = require('fs')
const imageDir = '../Assets/images'

module.exports = async (ctx, next) => {
    try{
        var m = new Map()
        number = ctx.request.query.number
        if(!number){
            throw new Error('image number needed!')
        }

        /*len = await fs.readdir(imageDir, (err, files) => {
          return files.length
        });
        if(number > len){
            throw new Error('requested images exceeds total amount')
        }
*/
        var paths = []
        var i = 0
        for(i = 0; i < number; ++i){
            var target = Math.floor(Math.random()*number)+1
            if(!(target in m)){
                m[target] = 1
                var p = path.resolve(target+".png")
                paths.push(p)
            }else{
                --i
            }
        }
        ctx.body = paths
    }catch(e){
        ctx.body=e.message
    }
}