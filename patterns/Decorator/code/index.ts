/*
 * @Author: moyee
 * @Date: 2019-02-18 09:28:46
 * @LastEditors: moyee
 * @LastEditTime: 2019-02-18 09:42:37
 * @Description: 基于TS的Decorator模式的实现
 */
abstract class VisualComponent {
  public constructor() {}
  public abstract draw(): void
  public abstract resize(): void
}

/**
 * VisualComponent的子类Decorator
 *
 * @class Decorator
 * @extends {VisualComponent}
 */
class Decorator extends VisualComponent {
  private component: VisualComponent
  public constructor(component: VisualComponent) {
    super()
  }
  public draw(): void {
    this.component.draw()
  }
  public resize(): void {
    this.component.resize()
  }
}

/**
 * 定义Decorator的子类BorderDecorator，重定义draw操作用于绘制边框
 *
 * @class BorderDecorator
 * @extends {Decorator}
 */
class BorderDecorator extends Decorator {
  private width: number
  private _component: VisualComponent
  public constructor(component: VisualComponent, borderWidth: number) {
    super(component)
    this.width = borderWidth
    this._component = component
  }

  private drawBorder(width: number) {
    console.log(`绘制${width}px的边框`)
  }

  public draw(): void {
    this._component.draw()
    this.drawBorder(this.width)
  }
}