import 'promise-polyfill/src/polyfill'
import 'whatwg-fetch'

export default function(context, inject) {

  const wxConfig = () => {
    
    if (process.env.NODE_ENV !== 'production') return

    if (!wx) {
      console.error(`
wx not found
      `)
      return
    }
    let jssdkReady = true
    const ADDRESS_WX_CONFIG = 'http://47.116.129.205:8000/jssdk-config'
    const url = location.origin + location.pathname + location.search
    fetch(
      `${ADDRESS_WX_CONFIG}` +
      '?' +
      `url=${url}`
    )
      .then(response => response.json())
      .then(response => {
        console.log(`
jssdk config response
${response}
        `)

        wx.config(Object.assign({}, response, {
          debug: false
        }))
  
        wx.ready(() => {
          console.log(`
is jssdk ready
${jssdkReady}
          `)

          const titleShare = '我为2021年抽了支开运签，你也来试试吧！'
          const descriptionShare = '新年新气象，来支开运签！2021运势全掌握，更有“金御守”等你来拿。'
          const linkShare = 'http://www.c9-d.com/3li6xun/xinniankaiyun'
          const thumbnailShare = 'http://www.c9-d.com/3li6xun/xinniankaiyun/thumbnail.jpg'

          if (jssdkReady) {
            wx.updateAppMessageShareData({ 
              title: titleShare,
              desc: descriptionShare,
              link: linkShare, 
              imgUrl: thumbnailShare,
              success: function () {
                console.log('updateAppMessageShareData done')
              }
            })
            wx.updateTimelineShareData({ 
              title: titleShare,
              link: linkShare,
              imgUrl: thumbnailShare,
              success: function () {
                console.log('updateTimelineShareData done')
              }
            })
          }

        })
  
        wx.error(error => {
          console.error(`
jssdk error
%O        
          `, error)
          jssdkReady = false
        })
      })
  }

  inject('wxConfig', wxConfig) 
}