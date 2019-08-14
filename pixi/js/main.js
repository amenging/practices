// Main类用于初始化舞台和更新视图
function Main () {
  this.stage = new PIXI.Container()

  this.renderer = PIXI.autoDetectRenderer(
    512,
    384,
    { view: document.getElementById('game-canvas') }
  )

  this.scrollSpeed = Main.MIN_SCROLL_SPEED

  this.loadSpriteSheet()
}

Main.MIN_SCROLL_SPEED = 5
Main.MAX_SCROLL_SPEED = 15
Main.SCROLL_ACCELERATION = 0.005

Main.prototype.update = function () {
  this.scroller.moveViewportBy(this.scrollSpeed)

  this.scrollSpeed += Main.SCROLL_ACCELERATION

  if (this.scrollSpeed > Main.MAX_SCROLL_SPEED) this.scrollSpeed = Main.MAX_SCROLL_SPEED

  this.renderer.render(this.stage)

  requestAnimationFrame(this.update.bind(this))
}

Main.prototype.loadSpriteSheet = function () {
  let loader = PIXI.loader
  loader.add('wall', 'imgs/wall.json')
  loader.add('bg-mid', 'imgs/bg-mid.png')
  loader.add('bg-far', 'imgs/bg-far.png')
  loader.once('complete', this.spriteSheetLoaded.bind(this))
  loader.load()
}

Main.prototype.spriteSheetLoaded = function () {
  this.scroller = new Scroller(this.stage)

  requestAnimationFrame(this.update.bind(this))

  // this.pool = new WallSpritePool()
  // this.wallSlices = []
}

// Main.prototype.generateTestWallSpan = function () {
//   let lookupTable = [
//     this.pool.borrowFrontEdge,
//     this.pool.borrowWindow,
//     this.pool.borrowDecoration,
//     this.pool.borrowStep,
//     this.pool.borrowWindow,
//     this.pool.borrowBackEdge
//   ]

//   const yPos = [
//     128,
//     128,
//     128,
//     192,
//     192,
//     192
//   ]

//   for (let i = 0; i < lookupTable.length; i ++) {
//     let func = lookupTable[i]

//     var sprite = func.call(this.pool)
//     sprite.x = 64 + (i * 64)
//     sprite.y = yPos[i]

//     this.wallSlices.push(sprite)

//     this.stage.addChild(sprite)
//   }
// }

// Main.prototype.clearTestWallSpan = function () {
//   console.log(this.wallSlices)
//   let lookupTable = [
//     this.pool.returnFrontEdge,
//     this.pool.returnWindow,
//     this.pool.returnDecoration,
//     this.pool.returnStep,
//     this.pool.returnWindow,
//     this.pool.returnBackEdge
//   ]

//   for (let i = 0; i < lookupTable.length; i ++) {
//     let func = lookupTable[i]
//     let sprite = this.wallSlices[i]

//     this.stage.removeChild(sprite)
//     func.call(this.pool, sprite)
//   }

//   this.wallSlices = []
// }