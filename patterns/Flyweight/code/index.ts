/*
 * @Author: moyee
 * @Date: 2019-02-19 09:16:18
 * @LastEditors: moyee
 * @LastEditTime: 2019-02-19 09:42:17
 * @Description: 基于TS实现FlyWeight模式
 */
type Font = any
type BTress = any

abstract class GlyphContext {
  private _index: number;
  private fonts: BTress;

  public constructor() {}
  public abstract next(step: number): void;
  public abstract insert(quantity: number): void;
  public abstract getFont(): Font;
  public abstract setFont(font: Font, span: number): void;
}

abstract class Glyph {
  protected constructor() {}
  public abstract draw(window: Window, context: GlyphContext): void;
  public abstract setFont(font: Font, context: GlyphContext): void;
  public abstract getFont(context: GlyphContext): Font;
  public abstract isDone(context: GlyphContext): boolean;
  public abstract current(context: GlyphContext): Glyph;
}

class Character extends Glyph {
  private _charcode: number
  public constructor(char: number) {
    super()
    this._charcode = char
  }

  public draw(window: Window, context: GlyphContext) {}
  public setFont(font: Font, context: GlyphContext) {}
  public getFont(context: GlyphContext): Font {}
  public isDone(context: GlyphContext): boolean {
    return true
  }
  public current(context: GlyphContext): Glyph {
    return
  }
}

const NCHARCODES = 128
class GlyphFactory {
  private _chartacter: Character[];
  public constructor() {
    for(let i: number = 0; i < NCHARCODES; i++) {
      this._chartacter[i] = this.createCharacter(0)
    }
  }

  public createCharacter(num: number): Character {
    if(!this._chartacter[num]) {
      this._chartacter[num] = new Character(num)
    }
    return this._chartacter[num]
  }
}

