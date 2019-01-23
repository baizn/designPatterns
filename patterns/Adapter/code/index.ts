/*
 * @Author: moyee
 * @Date: 2019-01-22 16:17:30
 * @LastEditors: moyee
 * @LastEditTime: 2019-01-23 09:19:56
 * @Description: 适配器模式实现
 */

// 自定义Point类型
type Point = {
  x: number;
  y: number;
}

class Manipluator {

}

type Coord = {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}

// 已经存在的类，需要适配的实现类
class TextView {
  getOrigin(x: Coord, y: Coord): void {};
  getExtent(width: Coord, height: Coord): void {};
  isEmpty(): boolean {
    return false
  }
}

// Shape接口
interface IShape {
  boundingBox(bottomLeft: Point, topRight: Point): void;
  createManipulator(): Manipluator;
}

/**
 * TextShape继承TextView，实现自定义的接口
 * 类层面的适配器
 *
 * @class TextShape
 * @extends {TextView}
 * @implements {IShape}
 */
class TextShape extends TextView implements IShape {
  public constructor() {
    super()
  }

  /**
   * 
   *
   * @param {Point} bl
   * @param {Point} tr
   * @memberof TextShape
   */
  boundingBox(bl: Point, tr: Point): void {
    const bottom: Coord = {}
    const left: Coord = {}
    const width: Coord = {}
    const height: Coord = {}

    // 调用继承的已经存在的接口的方法
    this.getOrigin(bottom, left)
    this.getExtent(width, height)

    bl = {
      x: bottom.x,
      y: left.y
    }

    tr = {
      x: bottom.height,
      y: left.width
    }
  }

  /**
   * 适配器实现过程中比较常用的一种方式：直接转发请求
   *
   * @returns {boolean}
   * @memberof TextShape
   */
  isEmpty(): boolean {
    return this.isEmpty()
  }

  createManipulator(): Manipluator {
    return new Manipluator()
  }
}

/**
 * 对象适配器
 *
 * @class TextShapeObj
 * @implements {IShape}
 */
class TextShapeObj implements IShape {
  private textView: TextView
  boundingBox(bl: Point, tr: Point): void {
    const bottom: Coord = {}
    const left: Coord = {}
    const width: Coord = {}
    const height: Coord = {}
    this.textView.getOrigin(bottom, left)
    this.textView.getExtent(width, height)
    bl = {
      x: bottom.x,
      y: left.y
    }

    tr = {
      x: bottom.height,
      y: left.width
    }
  }

  createManipulator(): Manipluator {
    return new Manipluator()
  }
}