const cloud = require('wx-server-sdk')

cloud.init()

exports.main = async (event, context) => {
  console.log(event);
  console.log(context);
  return await cloud.database().collection('playlist').skip(event.start).limit(event.count).orderBy('createTime', 'desc').get().then(res => {
    return res
  })
}