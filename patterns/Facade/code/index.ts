/*
 * @Author: moyee
 * @Date: 2019-02-18 09:43:56
 * @LastEditors: moyee
 * @LastEditTime: 2019-02-18 10:23:34
 * @Description: 基于TS的Facade模式的实现
 */

type Token = any
type Stream = any

/**
 * Scanner接收字符流并产生一个标识符流
 *
 * @abstract
 * @class Scanner
 */
class Scanner {
  private _inputStream: Stream
  public constructor(stream: Stream) {}
  public byteScanner(): void {}
  public scan(): Token {}
}

class Parser {
  public constructor() {}
  public tokenParser(): void {}
  public parse(scanner: Scanner, nodeBuild: ProgramNodeBuilder): void {}
}

class ProgramNodeBuilder {
  public constructor() {}
  public newVariable(name: string): IProgramNode {
    return
  }
}

interface IProgramNode {
  getSourcePosition(line: number, index: number): void;
  add(node: IProgramNode): void;
  remove(node: IProgramNode): void;
  traverse(code: ICodeGenerator): void;
}

interface ICodeGenerator {
  visit(): void;
  generator(name: Stream): void;
}

class CodeGenerator implements ICodeGenerator {
  visit(): void {}
  generator(name: Stream) {}
}

/**
 * Facade
 *
 * @class Complier
 */
class Complier {
  public cmoplier(input: Stream, output: Stream) {
    const scanner: Scanner = new Scanner(input)
    const parser: Parser = new Parser()
    const builder: ProgramNodeBuilder = new ProgramNodeBuilder()
    parser.parse(scanner, builder)

    const codeGenerator: CodeGenerator = new CodeGenerator()
    codeGenerator.visit()
    codeGenerator.generator(output)
    const node: IProgramNode = builder.newVariable('')
    node.traverse(codeGenerator)
  }
}