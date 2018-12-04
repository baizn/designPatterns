/*
 * @Author: baizn
 * @Date: 2018-12-03 09:05:48
 * @LastEditors: baizn
 * @LastEditTime: 2018-12-03 10:04:38
 * @Description: Factory Method模式TS实现
 */

interface IMazeGame {
  createMazeGame(): Maze

  // factory method
  makeMaze(): Maze
  makeRoom(num: number): IMapSite
  makeWall(): IMapSite
  makeDoor(room1: Room, room2: Room): IMapSite
}

// 常规实现类
class MazeGame implements IMazeGame {
  makeMaze(): Maze {
    return new Maze()
  }

  makeRoom(num: number): IMapSite {
    return new Room(num)
  }

  makeWall(): IMapSite {
    return new Wall()
  }

  makeDoor(room1: Room, room2: Room): IMapSite {
    return new Door(room1, room2)
  }

  createMazeGame(): Maze {
    const maze = this.makeMaze()
    const room1 = <Room>this.makeRoom(2)
    const room2 = <Room>this.makeRoom(3)
    const door = this.makeDoor(room1, room2)
    maze.addRoom(room1)
    maze.addRoom(room2)

    room1.setSide(Direction.North, this.makeWall())
    room1.setSide(Direction.East, door)
    
    return maze
  }
}

// 实现IMAPSite接口，实现增强型的Wall
class EnchantedWall implements IMapSite {
  enter(): number {
    return 1
  }
}

class EnchantedMazeGame implements IMazeGame {
  makeMaze(): Maze {
    return new Maze()
  }

  makeWall(): IMapSite {
    return new EnchantedWall()
  }

  makeRoom(num: number): IMapSite {
    return new Room(num)
  }

  makeDoor(room1: Room, room2: Room): IMapSite {
    return new Door(room1, room2)
  }

  createMazeGame(): Maze {
    const maze = this.makeMaze()
    return maze
  }

  // 实现类中可扩展自己的方法
  protected speed(name: string): number {
    return name ? 1 : 0
  }
}