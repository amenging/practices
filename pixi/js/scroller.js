// Scroller类用于实现滚动
function Scroller (stage) {
  this.far = new View('imgs/bg-far.png', 512, 256, 0.064)
  stage.addChild(this.far)

  this.mid = new View('imgs/bg-mid.png', 512, 256, 0.32)
  this.mid.y = 128
  stage.addChild(this.mid)

  this.front = new Walls()
  stage.addChild(this.front)

  this.mapBuilder = new MapBuilder(this.front)

  this.viewportX = 0
}

Scroller.prototype.setViewportX = function (viewportX) {
  this.viewportX = viewportX
  this.far.setViewportX(viewportX)
  this.mid.setViewportX(viewportX)
  this.front.setViewportX(viewportX)
}

Scroller.prototype.getViewportX = function () {
  return this.viewportX
}

Scroller.prototype.moveViewportBy = function (num) {
  let newViewportX = this.getViewportX() + num
  this.setViewportX(newViewportX) 
}