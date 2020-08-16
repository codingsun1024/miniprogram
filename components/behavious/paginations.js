const behaviousBeh = Behavior({
  data: {
    dataArray: [],
    total: null,
    noneResult: false,
    show: false
  },
  methods: {
    setMoreData(dataArray) {
      const tempArray =
        this.data.dataArray.concat(dataArray)
      this.setData({
        dataArray: tempArray
      })
    },
    getCurrentStart() {
      return this.data.dataArray.length
    },
    setTotal(total) {
      this.data.total = total
      if (total == 0) {
        this.setData({
          noneResult: true
        })
      }
    },
    hasMore() {
      if (this.data.dataArray.length >= this.data.total) {
        return false
      } else {
        return true
      }
    },
    initialize() {
      this.setData({
        dataArray: [],
        show: false,
        noneResult: false
      })
      this.data.total = null
    }
  }

})

export {
  behaviousBeh
}