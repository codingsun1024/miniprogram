import {
    Http
} from '../util/http'
class Classic extends Http {
    getLatest() {
        return this.request({
            url: 'classic/latest',
        }).then(res => {
            this._setLatestIndex(res.index)
            let key = this._getKey(res.index)
            wx.setStorageSync(key, res)
            return res
        })
    }
    getMyFavor() {
        const params = {
            url: 'classic/favor',
        }
        return this.request(params)
    }
    getClassic(index, nextOrPrevious) {
        let key = nextOrPrevious == 'next' ? this._getKey(index + 1) : this._getKey(index - 1)
        let classic = wx.getStorageSync(key)
        if (!classic) {
            return this.request({
                url: `classic/${index}/${nextOrPrevious}`
            }).then(res => {
                wx.setStorageSync(this._getKey(res.index), res)
                return res
            })
        } else {
            return Promise.resolve(classic)
        }
    }
    isFirst(index) {
        return index == 1 ? true : false
    }
    isLatest(index) {
        return this._getLatestIndex('latest') == index ? true : false
    }
    _setLatestIndex(index) {
        wx.setStorageSync('latest', index);
    }
    _getLatestIndex() {
        let index = wx.getStorageSync('latest')
        return index
    }
    _getKey(index) {
        const key = 'classic-' + index
        return key
    }
}

export {
    Classic
}