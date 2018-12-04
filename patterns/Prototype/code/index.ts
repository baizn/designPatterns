/*
 * @Author: baizn
 * @Date: 2018-12-04 09:09:51
 * @LastEditors: baizn
 * @LastEditTime: 2018-12-04 10:42:59
 * @Description: 使用TS实现Prototype设计模式
 */
// 基于Prototype模式实现的Door类
class Door implements IMapSite {
  private room1: Room
  private room2: Room
  constructor(door: Door) {
    this.room1 = door.room1
    this.room2 = door.room2
  }

  // 初始化Door
  initialize(room1: Room, room2: Room) {
    this.room1 = room1
    this.room2 = room2
  }

  // clone
  clone(): Door {
    return new Door(this)
  }

  enter() {
    return 0
  }
}

// 基于Prototype模式实现的Wall类
class Wall implements IMapSite {
  constructor(wall: Wall) {
    
  }

  enter() {
    return 1
  }

  clone(): Wall {
    return new Wall(this)
  }
}

interface IMazeFactory {
  makeMaze(): Maze
  makeRoom(num: number): IMapSite
  makeWall(): IMapSite
  makeDoor(room1: Room, room2: Room): IMapSite
}

// 基于Prototype模式实现的工厂类
class MazePrototypeFactory implements IMazeFactory {
  private maze: Maze
  private room: Room
  private wall: Wall
  private door: Door

  constructor(maze: Maze, room: Room, wall: Wall, door: Door) {
    this.maze = maze
    this.room = room
    this.wall = wall
    this.door = door
  }

  makeMaze(): Maze {
    return new Maze()
  }

  makeDoor(room1: Room, room2: Room): IMapSite {
    const door = this.door.clone()
    door.initialize(room1, room2)
    return door
  }

  makeWall(): Wall {
    return this.wall.clone()
  }

  makeRoom(num: number): Room {
    return new Room(num)
  }
}

class MazeGameProto {
  createMaze(mazeFactory: IMazeFactory) {
    const maze = mazeFactory.makeMaze()
    const r1 = mazeFactory.makeRoom(0)
    const r2 = mazeFactory.makeRoom(1)
    mazeFactory.makeWall()
    mazeFactory.makeDoor(r1, r2)
    return maze
  }
}

const game1 = new MazePrototypeFactory(new Maze(), new Room(0), new Wall(null), new Door(null))

const protoGame = new MazeGameProto()
protoGame.createMaze(game1)
