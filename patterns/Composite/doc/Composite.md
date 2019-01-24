### Composite

组合——对象结构性模式。

#### 1、意图

将对象组合成树形结构以表示“部分-整体”的层次结构。Composite使得用户对单个对象和组合对象的使用具有一致性。

#### 2、动机

在绘图编辑器和图形捕捉系统这样的图形应用程序中，用户可以使用简单的组件创建复杂的图表。用户可以组合多个简单组件以形成一些较大的组件，这些组件又可以组合成更大的组件。一个简单的实现方法是为Text和Line这样的图元定义一些类，另外定义一些类作为这些图元的容器类。

然而这种方法存在一个问题：使得这些类的代码必须去吧对待图元对象和容器对象。而实际上大多数情况下它们是一样的。Composite模式描述了如何使用递归组合，使得用户不必对这些类进行区别。如下图所示：

![](/Users/moyee/ant-repo/github/designPatterns/patterns/Composite/doc/composite-demo.png)

Composite模式的关键是一个抽象类，它既可以代表图元，又可以代表图元的容器。在图形系统中这个类就是Graphic，它声明了一些与特定图形对象相关的操作，如draw。同时也声明了所有的组合对象共享的一些操作，如一些作用于访问和管理它的子部件。

Picture类定义了一个Graphic对象的聚合。Picture的draw操作是通过对它的子部件调用draw实现的，Picture还用这种方法实现了一些与其子部件相关的操作。由于Picture接口与Graphic接口是一致的，因此Picture对象可以递归地组合其他Picture对象。

下图是一个典型的由递归组合的Graphic对象组成的组合对象结构。

![](/Users/moyee/ant-repo/github/designPatterns/patterns/Composite/doc/tree-composite.png)

#### 3、适用性

以下情况使用Composite模式：

- 想表示对象的部分-整体层次结构；
- 希望用户忽略组合对象与单个对象的不同，用户将统一地使用组合结构中的所有对象。

#### 4、结构

![](/Users/moyee/ant-repo/github/designPatterns/patterns/Composite/doc/composite.png)

典型的Composite对象结构如下所示：

![](/Users/moyee/ant-repo/github/designPatterns/patterns/Composite/doc/a-composite.png)

#### 5、参与者

- Component（Graphic）：
  - 为组合中的对象声明接口；
  - 在适当的情况下，实现所有类共有接口的缺省行为；
  - 声明一个接口用于访问和管理Component的子组件；
  - （可选）在递归结构中定义一个接口，用于访问一个父部件，并在合适的情况下实现它。
- Leaf（Rectangle、Line等）：
  - 在组合中表示叶子节点对象，叶节点没有子节点；
  - 在组合中定义图元对象的行为。
- Composite（Picture）：
  - 定义有子部件的那些部件的行为；
  - 存储子部件；
  - 在Component接口中实现与子部件有关的操作。
- Client：通过Component接口操纵组合部件的对象。

#### 6、协作

- 用户使用Component类接口与组合结构中的对象进行交互。如果接收者是一个叶节点，则直接处理请求。如果接收者是Composite，它通常将请求发送给它的子部件，在转发请求之前或之后可能执行一些辅助操作。

#### 7、效果

