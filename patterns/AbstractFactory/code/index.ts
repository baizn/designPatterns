/*
 * @Author: baizn
 * @Date: 2018-11-27 10:51:33
 * @LastEditors: baizn
 * @LastEditTime: 2018-11-27 18:28:11
 * @Description: 使用AbstractFactory模式创建迷宫实例
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

// Maze接口
interface IMazeFactory {
  makeMaze(): Maze
  makeWall(): IMapSite
  makeRoom(num: number): IMapSite
  makeDoor(room1: IMapSite, room2: IMapSite): IMapSite
}

/**
 * 实现Maze接口
 */
class MazeFactory implements IMazeFactory {
  public makeMaze(): Maze {
    return new Maze()
  }

  public makeWall(): IMapSite {
    return new Wall()
  }

  public makeRoom(num: number): Room {
    return new Room(num)
  }

  public makeDoor(room1: IMapSite, room2: IMapSite): IMapSite {
    return new Door(room1, room2)
  }
}

/**
 * 通过抽象工厂创建实例
 * @param factory 接口实例
 */
function mazeGame(factory: IMazeFactory): Maze {
  const maze: Maze = factory.makeMaze()
  const room1 = <Room>factory.makeRoom(1)
  const room2 = <Room>factory.makeRoom(2)
  const door = factory.makeDoor(room1, room2)

  maze.addRoom(room1)
  maze.addRoom(room2)

  // 设置房间里面的墙
  room1.setSide(Direction.North, factory.makeWall())
  // 设置窗位置
  room1.setSide(Direction.West, door)

  room2.setSide(Direction.South, factory.makeWall())
  room2.setSide(Direction.East, door)
  return maze
}

mazeGame(new MazeFactory())

class EnchantedRoom implements IMapSite {
  private type: string
  private id: number
  constructor(id: number, type: string) {
    this.id = id
    this.type = type
  }

  enter(): number {
    return this.id * 100
  }
}

// 重新实现IMazeFactory
class EnchantedMazeFactory implements IMazeFactory {
  public makeRoom(num: number): EnchantedRoom {
    return new EnchantedRoom(num, '')
  }

  public makeMaze(): Maze {
    return new Maze()
  }

  public makeWall(): IMapSite {
    return new Wall()
  }

  public makeDoor(room1: IMapSite, room2: IMapSite): IMapSite {
    return new Door(room1, room2)
  }
}

mazeGame(new EnchantedMazeFactory())
