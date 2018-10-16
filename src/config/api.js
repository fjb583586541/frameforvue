// 接口
const url = {
  getRegisterCode: '/api/message/getRegisterCode',
  register: '/api/account/register',
  fastInCode: '/api/message/fastInCode',
  fastIn: '/api/account/fastIn',
  detail: '/api/product/detail',
  getProductDiscount: '/api/discount/getProductDiscount',
  receiveCoupon: '/api/discount/receiveCoupon',
  wechatSign: '/api/service/wechatSign',
  test: '/api/test/test2'
}

// 常量
const define = {
  ROOT: root(['192.168.1.82']), // 搬砖者
  AXIOSTIMEOUT: 30000, // 请求时间的最大值
  AXIOSBASEURL: process.env.NODE_ENV === 'production' ? 'http://' + window.location.host + '/mweb' : '/dev', // 接口前缀
  OSSPATH: 'https://niub-dev.oss-cn-shanghai.aliyuncs.com/',
  STORAGEPREFIX: 'oo_', // 本地存储key前缀
  STORAGETYPE: window.sessionStorage, // 本地存储方式 默认sessionStorage 方法
}

function root(IPv4s) {
  let hostname = window.location.hostname
  for (let i = 0; i < IPv4s.length; i++) {
    if (IPv4s[i] == hostname) {
      return true
    }
  }
  return false
}

export default Object.assign(url, define)