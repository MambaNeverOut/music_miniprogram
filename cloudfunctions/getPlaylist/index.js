const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// const rp = require('request-promise')

const axios = require('axios')

const URL = 'https://apis.imooc.com/personalized?icode=E1D96667BD149D5E'

exports.main = async (event, context) => {
  // const playlist = await rp(URL).then(res=>{
  //   return JSON.parse(res).result
  // })
  const { data } = await axios.get(URL);
  console.log(data);
  if (data.code >= 1000) {
    console.log(data.msg);
    return 0
  }
  const playlist = data.result
  console.log(playlist);

  if (playlist.length > 0) {
    await db.collection('playlist').add({
      data: [...playlist]
    }).then(res => {
      console.log('插入成功');
    }).catch(error => {
      console.log(error);
      console.error('插入失败');
    })
  }
}