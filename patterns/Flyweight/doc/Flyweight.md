### Flyweight

享元模式——对象结构性模式。

#### 1、意图

运用共享技术有效地支持大量细粒度的对象。

#### 2、动机

有些应用程序得益于在其整个设计过程中采用对象技术，但简单化的实现代价极大。

Flyweight模式描述了如何共享对象，使得可以细粒度地使用它们而无需高昂的代价。

Flyweight是一个共享对象，它可以同时在多个场景中使用，并且在每个场景中Flyweight都可以作为一个独立的对象——这一点与非共享对象的实例没有区别。

#### 3、适用性

Flyweight模式的有效性很大程度上取决于如何使用它以及在何处使用它。当以下情况都成立时使用Flyweight模式：

- 一个应用使用了大量的对象；
- 完全由于使用大量的对象，造成很大的存储开销；
- 对象的大多数状态都可变为外部状态；
- 如果删除对象的外部状态，那么可以用相对较少的共享对象取代很多组对象；
- 应用程序不依赖于对象标识。

#### 4、结构

![](/Users/moyee/ant-repo/github/designPatterns/patterns/Flyweight/doc/flyweight.png)

#### 5、参与者

- Flyweight：描述一个接口，通过这个接口Flyweight可以接受并作用于外部状态；
- ConcreteFlyweight：实现Flyweight接口，并为内部状态增加存储空间。ConcreteFlyweight对象必须是可共享的，它所存储的状态必须是内部的，即它必须独立于ConcreteFlyweight对象的场景；
- UnsharedConcreteFlyweight：并非所有的Flyweight子类都需要被共享，在Flyweight对象结构的某些层次，UnsharedConcreteFlyweight对象通常将ConcreteFlyweight对象作为子节点；
- FlyweightFactory：
  - 创建并管理Flyweight对象；
  - 确保合理地共享Flyweight。
- Client：
  - 维持一个对Flyweight的引用；
  - 计算或存储一个或多个Flyweight的外部状态。

#### 6、协作

- Flyweight执行时所需的状态必定是内部或外部的。内部状态存储于ConcreteFlyweight对象之中；而外部对象则由Client对象存储或计算，当用户调用Flyweight对象的操作时，将该状态传递给它；
- 用户不应直接对ConcreteFlyweight类进行实例化，而只能从FlyweightFactory对象得到ConcreteFlyweight对象，这可以保证对它们适当的进行共享。

#### 7、效果

使用Flyweight模式时，传输、查找和计算外部状态都会产生运行时的开销，尤其当Flyweight原先被存储为内部状态时。然而，空间上的节省抵消了这些开销，共享的Flyweight越多，空间节省也就越大。

存储节约由以下几个因素决定：

- 因为共享，实例总数减少的数目；
- 对象内部状态的平均数目；
- 外部状态是计算的还是存储的。

用共享减少内部状态的消耗，用计算时间换取对外部状态的存储。

#### 8、实现

在实现Flyweight模式时，注意以下几点：

1. 删除外部状态：该模式的可用性在很大程度上取决于是否容易识别外部状态并将它从共享对象中删除；
2. 管理共享对象：因为对象是共享的，用户不能直接对它进行实例化，因此FlyweightFactory可以帮助用户查找某个特定的Flyweight对象。

共享还意味着某种形式的引用计数和垃圾回收，这样当一个Flyweight不再使用时，可以回收它的存储空间。

