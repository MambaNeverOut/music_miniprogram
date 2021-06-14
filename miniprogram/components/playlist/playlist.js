Component({
  properties: {
    playlist: {
      type: Object
    }
  },
  observers: {  // 监听属性变化（watch）
    ['playlist.playCount'](count) {
      this.setData({
        _count: this._tranNumber(count, 2)
      })
    }
  },
  data: {
    _count: 0
  },
  methods: {
    _tranNumber(num, point) {
      let numStr = num.toString().split('.')[0]
      if (numStr.length < 6) {
        return numStr
      } else if (numStr.length >= 6 && numStr.length <= 8) {
        let decimal = numStr.substring(numStr.length - 4, numStr.length - 4 + point)
        return parseFloat(parseInt(numStr / 10000) + '.' + decimal) + '万'
      }else if(numStr.length > 8){
        let decimal = numStr.substring(numStr.length - 8, numStr.length - 8 + point)
        return parseFloat(parseInt(numStr / 100000000) + '.' + decimal) + '亿'
      }
    }
  }
})