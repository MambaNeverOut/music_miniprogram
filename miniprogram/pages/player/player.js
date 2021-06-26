// pages/player/player.js
let musiclist = []
let nowPlayingIndex = 0
// 获取全局唯一的背景音频管理器
const backgroundAudiManager = wx.getBackgroundAudioManager()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    picUrl: '',
    isPlaying: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    nowPlayingIndex = options.index
    musiclist = wx.getStorageSync('musiclist')
    this._loadMusicDetail(options.musicId)
  },
  _loadMusicDetail(musicId) {
    console.log(musicId);
    // if ()
    backgroundAudiManager.stop()
    let music = musiclist[nowPlayingIndex]
    console.log(music);
    wx.setNavigationBarTitle({
      title: music.name
    })
    this.setData({ picUrl: music.al.picUrl, isPlaying: false })
    wx.showLoading({
      title: '歌曲加载中',
    })
    wx.cloud.callFunction({
      name: 'music',
      data: {
        musicId: musicId,
        $url: 'musicUrl',
      }
    }).then(res => {
      console.log(res);
      let result = res.result
      backgroundAudiManager.src = result.data[0].url
      backgroundAudiManager.title = music.name
      console.log(backgroundAudiManager);
      this.setData({
        isPlaying: true
      })
      wx.hideLoading()
    })
  },
  togglePlaying() {
    if (this.data.isPlaying) {
      backgroundAudiManager.pause()
    } else {
      backgroundAudiManager.play()
    }
    this.setData({
      isPlaying: !this.data.isPlaying
    })
  },
  onPrev() {
    nowPlayingIndex--;
    if (nowPlayingIndex < 0) {
      nowPlayingIndex = musiclist.length - 1
      this._loadMusicDetail(musiclist[nowPlayingIndex].id)
    }
  },
  onNext() {
    nowPlayingIndex++;
    if (nowPlayingIndex === musiclist.length) {
      nowPlayingIndex = 0
      this._loadMusicDetail(musiclist[nowPlayingIndex].id)
    }
   },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})