/*
 * @Author: baizn
 * @Date: 2018-12-03 09:25:18
 * @LastEditors: baizn
 * @LastEditTime: 2018-12-03 09:26:05
 * @Description: 通用的接口和实现类
 */

// 可移动的方向
enum Direction {
  North,
  South,
  East,
  West
}

interface IMapSite {
  enter(): number
}

/**
 * 房间
 */
class Room implements IMapSite {
  private roomID: number
  public constructor(rootID) {
    this.roomID = rootID
    console.log(`创建了房间${this.roomID}`)
  }
  public enter(): number {
    return this.roomID
  }

  public setSide(direction: Direction, mapSite: IMapSite) {
    console.log(`在房间${this.roomID}的${direction}方向设置了${mapSite}`)
  }
}

/**
 * 墙
 */
class Wall implements IMapSite {
  constructor() {
    console.log('创建墙')
  }
  public enter(): number {
    return 0
  }
}

class Door implements IMapSite {
  public constructor(room1: IMapSite, room2: IMapSite) {
    console.log(`在房间${room1.enter()}和房间${room2.enter()}之间创建了门`)
  }
  public enter(): number {
    return 0
  }
}

class Maze {
  private rooms: IMapSite[] = []
  constructor() {}
  public addRoom(room: IMapSite): void {
    this.rooms.push(room)
  }

  public getRoomNo(num: number): IMapSite {
    return this.rooms[num]
  }
}