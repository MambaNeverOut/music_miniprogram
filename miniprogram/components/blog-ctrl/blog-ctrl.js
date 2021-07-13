// components/blog-ctrl/blog-ctrl.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },
  externalClasses: ['iconfont', 'icon-pinglun', 'icon-fenxiang'],

  /**
   * 组件的初始数据
   */
  data: {
    // 登录组件是否显示
    loginShow: false, 
     // 底部弹出层是否显示
     modalShow: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onComment() {
      this.setData({
        loginShow: true,
      })
      // 判断用户是否授权
      /* wx.getSetting({
        success: (res) => {
          console.log(res)
          if (res.authSetting['scope.userInfo']) {
            wx.getUserInfo({
              success: (res) => {
                userInfo = res.userInfo
                // 显示评论弹出层
                this.setData({
                  modalShow: true,
                })
              }
            })
          } else {
            this.setData({
              loginShow: true,
            })
          }
        }
      }) */
    },
    onLoginsuccess(event) {
      userInfo = event.detail
      // 授权框消失，评论框显示
      this.setData({
        loginShow: false,
      }, () => {
        this.setData({
          modalShow: true,
        })
      })
    },

    onLoginfail() {
      wx.showModal({
        title: '授权用户才能进行评价',
        content: '',
      })
    },
    // 调起客户端小程序订阅消息界面
    subscribeMsg() {
      console.log('评论');
      const tmplId = 'Fz8q-QVsnTQ-Y8KV4UZz7DuoFkaAW5qbMcKUB8vYmbc'
      wx.requestSubscribeMessage({
        tmplIds: [tmplId],
        success: (res) => {
          console.log(res)
          if (res[tmplId] === 'accept') {
            this.onComment()
          } else {
            wx.showToast({
              icon: 'none',
              title: '订阅失败，无法评论',
            })
          }
        }
      })
    },
 
  }
})
