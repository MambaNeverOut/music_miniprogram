// 云函数入口文件
const cloud = require('wx-server-sdk')

const TcbRouter = require('tcb-router')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const app = new TcbRouter({ event })

  app.use(async (ctx, next) => {
    ctx.data = {}
    ctx.data.openId = event.userInfo.openId
    await next()
    console.log('退出全局中间件');
  })

  app.router('music', async(ctx, next) => {
    console.log('进入音乐名称中间件');
    ctx.data.musicName = '我是name'
    await next()
    console.log('退出音乐名称中间件');
  }),
  async(ctx, next)=>{
    console.log('进入音乐类型中间件');
    ctx.data.musicType = 'DJ'
    ctx.body = {
      data: ctx.data
    }
    console.log('退出音乐类型中间件');
  }
  

  return app.serve()
}