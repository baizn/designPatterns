/*
 * @Author: moyee
 * @Date: 2019-02-19 09:42:32
 * @LastEditors: moyee
 * @LastEditTime: 2019-02-19 10:01:20
 * @Description: 基于TS实现的Proxy模式
 */

 namespace ProxyModel {
   type Point = any
   
   abstract class Graphic {
     protected constructor() {}
     public abstract draw(point: Point): void;
     public abstract getExtent(): Point;
   }
   
   class Image extends Graphic {
     private _file: string;
    public constructor(file: string) {
      super()
      this._file = file
    }

    public handleMouse(event: Event): void {}
    public draw(point: Point) {}
    public getExtent(): Point {}
   }

   class ImageProxy extends Graphic {
     private _image: Image;
     private _extent: Point;
     private _fileName: string;

     public constructor(fileName: string) {
       super()
       this._fileName = fileName
       this._extent = [1, 2]
       this._image = null
     }

     public draw(point: Point) {}
     public getImage(): Image {
       if(!this._image) {
         this._image = new Image(this._fileName)
       }
       return this._image
     }

     public getExtent(): Point {
      return this._extent
     }
   }

   class DocumentText {
     public constructor() {}
     public insert(graphic: Graphic): void {}
   }

   // proxy
   const text = new DocumentText()
   text.insert(new ImageProxy('filename'))
 }