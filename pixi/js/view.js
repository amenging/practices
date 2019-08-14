// View类用于创建视图对象
function View (img, width, height, offset) {
  let texture = PIXI.Texture.fromImage(img)
  PIXI.extras.TilingSprite.call(this, texture, width, height)

  this.x = 0
  this.y = 0
  this.tilePosition.x = 0
  this.tilePosition.y = 0

  this.viewportX = 0

  this.offset = offset
}

View.prototype = Object.create(PIXI.extras.TilingSprite.prototype)

View.prototype.update = function () {
  this.tilePosition.x -= this.offset
}

View.prototype.setViewportX = function (newViewportX) {
  let distanceTravaled = newViewportX - this.viewportX
  this.viewportX = newViewportX
  this.tilePosition.x -= (distanceTravaled * this.offset)
}