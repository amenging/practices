// 对象池
function WallSpritePool () {
  this.createWindows()
  this.createDecorations()
  this.createFrontEdges()
  this.createBackEdges()
  this.createSteps()
}

WallSpritePool.prototype.createWindows = function () {
  this.windows = []

  this.addWindowSprites(6, 'window_01')
  this.addWindowSprites(6, 'window_02')
  this.shuffle(this.windows)
}

WallSpritePool.prototype.createDecorations = function () {
  this.decorations = []

  this.addDecorationSprites(6, 'decoration_01')
  this.addDecorationSprites(6, 'decoration_02')
  this.addDecorationSprites(6, 'decoration_03')

  this.shuffle(this.decorations)
}

WallSpritePool.prototype.createFrontEdges = function () {
  this.frontEdges = []

  this.addFrontEdgeSprites(2, 'edge_01')
  this.addFrontEdgeSprites(2, 'edge_02')

  this.shuffle(this.frontEdges)
}

WallSpritePool.prototype.createBackEdges = function () {
  this.backEdges = []

  this.addBackEdgeSprites(2, 'edge_01')
  this.addBackEdgeSprites(2, 'edge_02')

  this.shuffle(this.backEdges)
}

WallSpritePool.prototype.createSteps = function () {
  this.steps = []
  this.addStepSprites(2, 'step_01')
}

WallSpritePool.prototype.addWindowSprites = function (amount, frameId) {
  for (let i = 0; i < amount; i ++) {
    let sprite = PIXI.Sprite.fromFrame(frameId)
    this.windows.push(sprite)
  }
}

WallSpritePool.prototype.addDecorationSprites = function (amount, frameId) {
  for (let i = 0; i < amount; i ++) {
    let sprite = PIXI.Sprite.fromFrame(frameId)
    this.decorations.push(sprite)
  }      
}

WallSpritePool.prototype.addFrontEdgeSprites = function (amount, frameId) {
  for (let i = 0; i < amount; i ++) {
    let sprite = PIXI.Sprite.fromFrame(frameId)
    this.frontEdges.push(sprite)
  }      
}

WallSpritePool.prototype.addBackEdgeSprites = function (amount, frameId) {
  for (let i = 0; i < amount; i ++) {
    let sprite = PIXI.Sprite.fromFrame(frameId)
    sprite.anchor.x = 1
    sprite.scale.x = -1
    this.backEdges.push(sprite)
  }      
}

WallSpritePool.prototype.addStepSprites = function (amount, frameId) {
  for (let i = 0; i < amount; i ++) {
    let sprite = PIXI.Sprite.fromFrame(frameId)
    sprite.anchor.y = 0.25
    this.steps.push(sprite)
  }
}

// 随机打乱
WallSpritePool.prototype.shuffle = function (array) {
  let len = array.length
  let shuffles = len * 3
  for (let i = 0; i < shuffles; i ++) {
    let wallSlice = array.pop()
    let pos = Math.floor(Math.random() * (len - 1))
    array.splice(pos, 0, wallSlice)
  }
}

WallSpritePool.prototype.borrowWindow = function () {
  return this.windows.shift()
}

WallSpritePool.prototype.returnWindow = function (sprite) {
  this.windows.push(sprite)
}

WallSpritePool.prototype.borrowDecoration = function () {
  return this.decorations.shift()
}

WallSpritePool.prototype.returnDecoration = function (sprite) {
  this.decorations.push(sprite)
}

WallSpritePool.prototype.borrowFrontEdge = function () {
  return this.frontEdges.shift()
}

WallSpritePool.prototype.returnFrontEdge = function (sprite) {
  this.frontEdges.push(sprite)
}

WallSpritePool.prototype.borrowBackEdge = function () {
  return this.backEdges.shift()
}

WallSpritePool.prototype.returnBackEdge = function (sprite) {
  this.backEdges.push(sprite)
}

WallSpritePool.prototype.borrowStep = function () {
  return this.steps.shift()
}

WallSpritePool.prototype.returnStep = function (sprite) {
  this.steps.push(sprite)
}