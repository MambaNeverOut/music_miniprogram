const cloud = require('wx-server-sdk')
const TcbRouter = require('tcb-router')
const rp = require('request-promise')
const axios = require('axios')

const BASE_URL = 'https://apis.imooc.com'

const ICODE = 'icode=E1D96667BD149D5E'
cloud.init({
  env: 'translate-env-mea2w'
})

exports.main = async (event, context) => {
  const app = new TcbRouter({ event })

  app.router('playlist', async (ctx, next) => {
    ctx.body = await cloud.database().collection('playlist')
      .skip(event.start)
      .limit(event.count)
      .orderBy('createTime', 'desc')
      .get()
      .then((res) => {
        return res
      })
  })
  app.router('musiclist', async (ctx, next) => {
    // ctx.body = await rp(BASE_URL + '/playlist/detail?id=' + parseInt(event.playlistId)+'&' +ICODE).then(res=>{
    //   return JSON.parse(res)
    // })
    const res = await axios.get(`${BASE_URL}/playlist/detail?id=${parseInt(event.playlistId)}&${ICODE}`)
    ctx.body = res.data
  })
  app.router('musicUrl', async (ctx, next) => {
    const res = await axios.get(`${BASE_URL}/song/url?id=${parseInt(event.musicId)}&${ICODE}`)
    ctx.body = res.data
  })
  app.router('lyric', async (ctx, next) => {
    const res = await axios.get(`${BASE_URL}/lyric/url?id=${parseInt(event.musicId)}&${ICODE}`)
    ctx.body = res.data
  })
  return app.serve()
}