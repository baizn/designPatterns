/*
 * @Author: baizn
 * @Date: 2018-12-04 14:05:37
 * @LastEditors: baizn
 * @LastEditTime: 2018-12-04 16:11:04
 * @Description: 使用TS实现Singleton模式
 */

 // 定义接口中方法
interface ISingletonFactory {
  register(name: string, instance: ISingletonFactory): void
  // getInstance(): ISingletonFactory
  lookup(name: string): ISingletonFactory
}

type InstanceObject = {
  key: string,
  value: ISingletonFactory
}

class SingletomMazaFactory implements ISingletonFactory {
  private static instance: SingletomMazaFactory = null
  private list: Array<InstanceObject> = []
  protected constructor() {

  }

  register(name: string, instance: SingletomMazaFactory): void {
    this.list.push({
      key: name,
      value: instance
    })
  }

  lookup(name: string): ISingletonFactory {
    let currentInstance = null
    for(let ins of this.list) {
      if(name === ins.key) {
        currentInstance = ins.value
      }
    }
    return currentInstance
  }

  static getInstance(): ISingletonFactory {
    if(!this.instance) {
      // 这里可以根据单例注册表，实例化不同的类
      this.instance = new SingletomMazaFactory()
    } 
    return this.instance
  }
}

SingletomMazaFactory.getInstance()
