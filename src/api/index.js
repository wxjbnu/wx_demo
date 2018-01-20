import wepy from 'wepy'
const api = {
  list: {
    url: '/zerg/public/api/v1/topic/{pageIndex}/{orderType}/{grade}/{subject}',
    methods: 'GET'
  }
}
const hostname = 'https://17348576.sudaquick.com'
export function wxhttp(url, params) {
  // console.log(api)
  const req = api[url]
  const r = /{(.*?)}/g
  let res = req.url

  let header = {
    'content-type': 'application/json'
    // 'token': 'token'
  }

  req.url.match(r).map((e) => {
    res = res.replace(e, params[e.substr(1, e.length - 2)])
  })
  // /^.+?\{(.+?)\}.*$/
  return new Promise((resolve, reject) => {
    wepy.request({
      url: hostname + res,
      method: req.methods,
      header,
      success: function (res) {
        console.log('success', res.data)
      },
      complete: function (r) {
        if (r.errMsg.indexOf('ok') > -1) {
          resolve(r)
        } else {
          reject(r)
        }
        console.log('complete', r)
      }
    })
  })

}
