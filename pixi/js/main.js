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
Main.SCROLL_ACCELERATION = 0.005 // 加速度

// 更新视图
Main.prototype.update = function () {
  this.scroller.moveViewportBy(this.scrollSpeed)

  this.scrollSpeed += Main.SCROLL_ACCELERATION

  if (this.scrollSpeed > Main.MAX_SCROLL_SPEED) this.scrollSpeed = Main.MAX_SCROLL_SPEED

  this.renderer.render(this.stage)

  requestAnimationFrame(this.update.bind(this))
}

// 加载
Main.prototype.loadSpriteSheet = function () {
  let loader = PIXI.loader
  loader.add('wall', 'imgs/wall.json')
  loader.add('bg-mid', 'imgs/bg-mid.png')
  loader.add('bg-far', 'imgs/bg-far.png')
  loader.once('complete', this.spriteSheetLoaded.bind(this)) // 加载完成后初始化舞台
  loader.load()
}

Main.prototype.spriteSheetLoaded = function () {
  // 初始化舞台
  this.scroller = new Scroller(this.stage)

  requestAnimationFrame(this.update.bind(this))
}
