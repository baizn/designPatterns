### OCP原则

软件实体（类、模块、函数）都应当对扩展具有开放性，但对于修改具有封闭性。

当需要对已有代码作出一些修改时：

- 保持函数、类和模块当前本身的状态，或是近似于他们一般情况下的状态（即不可修改性）；
- 使用组合的方式（避免使用继承方式）来扩展现有的类、函数或模块，以使它们可能以不同的名称来暴露新的特性或功能。

```
interface IRunner {
  run: () => void;
}
class Runner implements IRunner {
  run(): void {
    console.log("9.78s");
  }
}

interface IJumper {
  jump: () => void;
}
class Jumper implements IJumper {
  jump(): void {
    console.log("8.95,");
  }
}
```

假如需要提供一个既会跑又会跳的对象，如果使用继承：

```
class RunnerAndJumper extends Runner {
  jump: () => void
}

```

则会使RunnerAndJumper和Runner耦合在一起，可以采用组合的方式：

```
class RunnerAndJumper {
  private runnerClass: IRunner;
  private jumperClass: IJumper;
  constructor(runner: IRunner, jumper: IJumper) {
    this.runnerClass = new runner();
    this.jumperClass = new jumper();
  }
  run() {
    this.runnerClass.run();
  }
  jump() {
    this.jumperClass.jump();
  }
}
```

上面的代码和依赖倒置原则中的例子很像，RunnerAndJumper类本身并没有和任何类耦合，它的职能是单一的，另外，我们可以使用DI对上面的代码进一步进行优化。

OCP原则带来的最大的好处是，当我们在实现我们的抽象层代码时，我们可以对未来可能需要作出改变的地方拥有一个比较完整的设想，这样当我们面临改变时，我们所对原有代码的修改，更切近改变本身，而不是一味修改已有的代码。

#### 插件和中间件

充分贯彻OCP原则的例子，便是插件与中间件架构，我们可以从三个角度来分析：

- 内核或容器：系统最核心的部分；
- 插件：在实现容器的基础上，一些核心功能都是以内置插件实现的；
- 中间件：通过中间件，在周期中添加中间业务逻辑，如Redux、express等都支持这种功能。

[详细参考链接](https://segmentfault.com/a/1190000013123183)