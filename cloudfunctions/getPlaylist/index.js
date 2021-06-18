const cloud = require('wx-server-sdk')

cloud.init({
  env: 'translate-env-mea2w'
})

const db = cloud.database()

// const rp = require('request-promise')

const axios = require('axios')

const URL = 'https://apis.imooc.com/personalized?icode=E1D96667BD149D5E'

const playlistCollection = db.collection('playlist')
const MAX_LIMIT = 100;
exports.main = async (event, context) => {
  // const playlist = await rp(URL).then(res=>{
  //   return JSON.parse(res).result
  // })
  // const list = await playlistCollection.get();

  const countResult = await playlistCollection.count();
  const total = countResult.total;
  const batchTimes = Math.ceil(total / MAX_LIMIT)
  const tasks = [];
  for (let i = 0; i < batchTimes; i++) {
    let promise = playlistCollection.skip(MAX_LIMIT * i).limit(MAX_LIMIT).get();
    tasks.push(promise)
  }
  console.log(tasks);
  let list = {
    data: []
  }
  if (tasks.length > 0) {
    list = (await Promise.all(tasks)).reduce((acc, cur) => {
      console.log(acc);
      console.log(cur);
      return {
        data: acc.data.concat(cur.data)
      }
    })
  }
  const { data } = await axios.get(URL);
  console.log(data);
  if (data.code >= 1000) {
    console.log(data.msg);
    return 0
  }
  const playlist = data.result
  console.log(playlist);
  const newData = []
  for (let i = 0; i < playlist.length; i++) {
    let flag = true
    for (let j = 0; j < list.length; j++) {
      if (playlist[i].id === list[j].id) {
        flag = false;
        break;
      }
    }
    if (flag) {
      newData.push(playlist[i])
    }
  }
console.log(newData);
  if (newData.length > 0) {
    await playlistCollection.add({
      data: newData
    }).then(res => {
      console.log('插入成功');
    }).catch(error => {
      console.log(error);
      console.error('插入失败');
    })
  }
  return newData.length
}