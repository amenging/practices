let canvas = document.querySelector('#bar')
let ctx = canvas.getContext('2d')

let audioCtx = new (window.AudioContext || window.webkitAudioContext)()
let playAudioCtx = new (window.AudioContext || window.webkitAudioContext)()

// grab the mute button to use below

// set up the different audio nodes we will use for the app

// 创建一个AnalyserNode，可以用来获取音频时间和频率数据，以及实现数据可视化
let analyser1 = audioCtx.createAnalyser()
analyser1.minDecibels = -90
analyser1.maxDecibels = -10
analyser1.smoothingTimeConstant = 0.85

let concertHallBuffer
let distortion = audioCtx.createWaveShaper() // 创建了表示非线性失真的WaveShaperNode。该节点通常被用来给音频添加失真效果
let biquadFilter = audioCtx.createBiquadFilter() // 它代表代表一个双二阶滤波器，可以设置几种不同且常见滤波器类型：高通、低通、带通等。
let convolver = audioCtx.createConvolver() // 它可用于混合效果，比如说混响效果。
let gainNode = audioCtx.createGain() // 它可以控制音频的总音量。

// grab audio track via XHR for convolver node

let soundSource, vSource
let bufferLength
let dataArray

let startBtn = document.querySelector('#startBtn');

startBtn.addEventListener('click', function() {
    ajaxAudioTrack();
});

function ajaxAudioTrack () {
  let ajaxRequest = new window.XMLHttpRequest()

  ajaxRequest.open('GET', 'https://m701.music.126.net/20191029165839/c694b44a993b6c548dd57ef778a1ba45/jdyyaac/0e08/525a/0e53/9b81330b4ae00d0ffa1b99702172e0d9.m4a', true)

  ajaxRequest.responseType = 'arraybuffer'

  ajaxRequest.onload = function () {
    let audioData = ajaxRequest.response
    
    // decodeAudioData 从ArrayBuffer对象中异步解码音频文件. 
    // 在此情况下,这个ArrayBuffer对象通常是通过使用 responseType为arraybuffer类型的XMLHttpRequest方法来获取的. 
    // 该方法只能作用于完整的音频文件.
    audioCtx.decodeAudioData(audioData)
      .then(function (buffer) {
        concertHallBuffer = buffer

        // 创建一个 AudioBufferSourceNode 对象, 他可以通过AudioBuffer对象来播放和处理包含在内的音频数据. 
        // AudioBuffer可以通过AudioContext.createBuffer方法创建或者使用AudioContext.decodeAudioData方法解码音轨来创建。
        vSource = audioCtx.createBufferSource()
        vSource.buffer = concertHallBuffer

        // 将AudioBufferSourceNode连接到目标，以便我们可以听到声音
        vSource.connect(analyser1)
        analyser1.connect(audioCtx.destination)
        vSource.loop = true

        // soundSource.start()
        vSource.start()

        analyser1.fftSize = 2048

        // 一个无符号长整形(unsigned long)的值, 值为fftSize的一半。这通常等于将要用于可视化的数据值的数量。
        bufferLength = analyser1.frequencyBinCount
        dataArray = new Uint8Array(bufferLength)

        render()
      })
      .catch(function (e) { throw new Error('Error with decoding audio data' + e.err) })
  }

  ajaxRequest.send()
}

// set up canvas context for visualizer

function render () {
  let WIDTH = canvas.width
  let HEIGHT = canvas.height
  let draw

  ctx.clearRect(0, 0, WIDTH, HEIGHT)

  draw = function () {
    window.requestAnimationFrame(draw)
    analyser1.getByteFrequencyData(dataArray)

    ctx.fillStyle = 'rgb(0, 0, 0)'
    ctx.fillRect(0, 0, WIDTH, HEIGHT)

    const radian = Math.PI * 2 / bufferLength
    let circle = {
      x: 100,
      y: 100,
      r: 50
    }

    let barHeight

    for (let i = 0; i < bufferLength; i += 5) {
      barHeight = dataArray[i]

      let radianCurrent = i * radian

      let PosX = circle.x + circle.r * Math.cos(radianCurrent)
      let PosY = circle.y + circle.r * Math.sin(radianCurrent)

      ctx.strokeStyle="#0000ff"
      ctx.lineWidth=1

      ctx.beginPath()
      
      ctx.moveTo(PosX, PosY)
      ctx.lineTo(PosX + barHeight * Math.cos(radianCurrent), PosY + barHeight * Math.sin(radianCurrent))
      ctx.stroke()

      ctx.closePath()
    }
  }

  draw()
}
