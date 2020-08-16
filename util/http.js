import { config } from '../config'
const tips = {
    1: '抱歉，出现了一个错误',
    1005: 'appkey无效，请前往www.7yue.pro申请',
    3000: '期刊不存在'
}
class Http {
    request({ url, data = {}, method = 'GET'}) {
        return new Promise((resolve, reject) => {
            wx.request({
                url: config.api_base_url + url,
                data: data,
                method: method,
                header: {
                    'content-type': 'application/json',
                    'appkey': config.appkey
                },
                success: (res) => {
                    const code = res.statusCode.toString()
                    if (code.startsWith('2')) {
                        resolve(res.data)
                    }
                    else {
                        reject()
                        const error_code = res.data.error_code
                        this._show_error(error_code)
                    }
                },
                fail: (err) => {
                    reject()
                    this._show_error(1)
                }
            })
        })
    }
    _show_error(error_code) {
        if (!error_code) {
            error_code = 1
        }
        const tip = tips[error_code]
        wx.showToast({
            title: tip ? tip : tips[1],
            icon: 'none',
            duration: 2000
        })
    }
}

export { Http }