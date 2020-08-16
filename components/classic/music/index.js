// components/classic/music/index.js
import {
  classicBeh
} from '../classic-beh.js'
// properties(Read only)(duration,currentTime,paused,buffered)
// properties(src(m4a, aac, mp3, wav),startTime,title,epname,singer,coverImgUrl,webUrl,protocol)
var backAudioManager = wx.getBackgroundAudioManager();
Component({
  /**
   * 组件的属性列表
   */
  behaviors: [classicBeh],
  properties: {
    src: String,
    title: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    playing: false,
    pauseSrc: 'images/player@waitting.png',
    playSrc: 'images/player@playing.png',
  },
  attached(event) {
    this._recoverStatus()
    this._monitorSwitch()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onPlay(event) {
      if (!this.data.playing) {
        this.setData({
          playing: true
        })
        backAudioManager.src = this.properties.src
        backAudioManager.title = this.properties.title
      } else {
        this.setData({
          playing: false
        })
        backAudioManager.pause()
      }
    },
    _recoverStatus() {
      if (backAudioManager.paused) {
        this.setData({
          playing: false
        })
        return
      }
      if (backAudioManager.src == this.properties.src) {
        this.setData({
          playing: true
        })
      }
    },
    _monitorSwitch: function () {
      backAudioManager.onPlay(() => {
        this._recoverStatus()
      })
      backAudioManager.onPause(() => {
        this._recoverStatus()
      })
      backAudioManager.onStop(() => {
        this._recoverStatus()
      })
      backAudioManager.onEnded(() => {
        this._recoverStatus()
      })
    }
  },
})