import {
  KeywordModel
} from '../../models/keyword'
import {
  BookModel
} from '../../models/book'
import {
  behaviousBeh
} from '../behavious/paginations'
let keywordModel = new KeywordModel()
let bookModel = new BookModel()
Component({
  behaviors: [behaviousBeh],
  /**
   * 组件的属性列表
   */
  properties: {
    more: {
      type: String,
      observer: 'loadMore'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    show: false,
    historyWords: [],
    hotWords: [],
    q: '',
    loading: false,
    loadingCenter: false,
    loadingMore: false
  },
  attached() {
    this.setData({
        historyWords: keywordModel.getHistory()
      }),
      keywordModel.getHot().then(res => {
        this.setData({
          hotWords: res.hot
        })
      })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    loadMore() {
      if (!this.data.q) {
        return
      }
      if (this.data.loading) {
        return
      }
      if (this.hasMore()) {
        this.data.loading = true
        bookModel.search(this.getCurrentStart(), this.data.q).then(res => {
          this.setMoreData(res.books)
          this.data.loading = false
          this.setData({
            loadingMore: true
          })
        })
      } else {
        this.setData({
          loadingMore: false
        })
      }
    },
    onCancel() {
      this.triggerEvent('cancel')
      this.initialize()

    },
    onConfirm(event) {
      this._showLoadingCenter()
      let q = event.detail.value || event.detail.text
      bookModel.search(0, q).then(res => {
        this.setMoreData(res.books)
        this.setTotal(res.total)
        this.setData({
          show: true,
          q
        })
        keywordModel.addToHistory(q)
        this._hideLoadingCenter()
      })
    },
    // x号
    onDelete(event) {
      this.initialize()
      this.setData({
        q: ''
      })
    },
    _showLoadingCenter() {
      this.setData({
        loadingCenter: true
      })
    },
    _hideLoadingCenter() {
      this.setData({
        loadingCenter: false
      })
    },
  }
})