export default {
  methods: {
    async wechatInit (url) {
      const res = await this.$store.dispatch('getWechatSignature', url)
      const { data, success } = res

      if (!success) throw new Error('不能成功获取服务器签名！')
      const wx = window.wx
      wx.config({
        // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        debug: true,
        appId: data.appId, // 必填，公众号的唯一标识
        timestamp: data.timestamp, // 必填，生成签名的时间戳
        nonceStr: data.noncestr, // 必填，生成签名的随机串
        signature: data.signature,// 必填，签名，见附录1
        jsApiList: [
          'previewImage',
          'hideAllNonBaseMenuItem',
          'showMenuItems',
          'updateAppMessageShareData',
          'updateTimelineShareData',
          'chooseWXPay'
        ] // 必填，需要使用的 JS 接口列表，所有JS接口列表见附录2
      })

      wx.ready(() => {
        // this.wechtSetMenu()
        // this.wechatShare({})
        // 自定义“分享给朋友”及“分享到QQ”按钮的分享内容
        wx.updateAppMessageShareData({
            title: 'xxxx', // 分享标题
            desc: 'aaaaaaaaaaa', // 分享描述
            link: 'http://baidu.com', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg', // 分享图标
            success: function () {
              // 设置成功
            }
        })

        // 自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容
        wx.updateTimelineShareData({
            title: 'xxxx', // 分享标题
            link: 'http://sina.com', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg', // 分享图标
            success: function () {
              // 设置成功
            }
        })

      })
    }
  }
}
