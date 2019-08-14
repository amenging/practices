// Scroller类用于实现滚动
function Scroller (stage) {
  // 远景
  this.far = new View('imgs/bg-far.png', 512, 256, 0.064)
  stage.addChild(this.far)

  // 中景
  this.mid = new View('imgs/bg-mid.png', 512, 256, 0.32)
  this.mid.y = 128
  stage.addChild(this.mid)

  // 近景
  this.front = new Walls()
  stage.addChild(this.front)

  // 近景地图构建
  this.mapBuilder = new MapBuilder(this.front)

  this.viewportX = 0
}

// 移动
Scroller.prototype.setViewportX = function (viewportX) {
  this.viewportX = viewportX
  this.far.setViewportX(viewportX)
  this.mid.setViewportX(viewportX)
  this.front.setViewportX(viewportX)
}

// 获取当前的位置
Scroller.prototype.getViewportX = function () {
  return this.viewportX
}

// 计算需要移动的距离
Scroller.prototype.moveViewportBy = function (num) {
  let newViewportX = this.getViewportX() + num
  this.setViewportX(newViewportX) 
}
