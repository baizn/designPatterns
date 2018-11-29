/*
 * @Author: baizn
 * @Date: 2018-11-28 10:01:02
 * @LastEditors: baizn
 * @LastEditTime: 2018-11-28 10:26:31
 * @Description: 使用Builder模式实现迷宫的创建
 */
interface IMapSite {
  enter(): number
}

 // Builder接口
interface IMazeBuilder {
  buildMaze(): void
  buildRoom(num: number): void
  buildDoor(formId: number, toId: number): void
  getMaze(): Maze
}

class StandardMazeBuilder implements IMazeBuilder {
  private _currentMaze: Maze
  constructor() {}

  buildMaze() {
    this._currentMaze = new Maze()
  }

  buildRoom(num: number): void {
    if(!this._currentMaze.getRoomNo(num)) {
      const room: Room = new Room(num)
      this._currentMaze.addRoom(room)
      room.setSide(Direction.North, new Wall())
      room.setSide(Direction.West, new Wall())
    }
  }

  buildDoor(formId: number, toId: number): void {
    const room1 = <Room>this._currentMaze.getRoomNo(formId)
    const room2 = this._currentMaze.getRoomNo(toId)
    const door = new Door(room1, room2)
    room1.setSide(Direction.South, door)
  }

  getMaze() {
    return this._currentMaze
  }
}

class MazeGame {
  createMaze(mazeBuilder: IMazeBuilder) {
    mazeBuilder.buildMaze()
    mazeBuilder.buildRoom(1)
    mazeBuilder.buildRoom(2)
    mazeBuilder.buildDoor(1, 2)
    return mazeBuilder.getMaze()
  }
}

const game = new MazeGame()
game.createMaze(new StandardMazeBuilder())
