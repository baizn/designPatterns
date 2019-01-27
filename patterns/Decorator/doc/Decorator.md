### Decorator

装饰模式——对象结构性模式。

#### 1、意图

动态地给一个对象添加一些额外的职责。就增加功能来说，Decorator模式相比生成子类更为灵活。

#### 2、动机

有时我们希望给某个对象而不是整个类添加一些功能。例如，一个图形用户界面工具箱允许你对任意一个用户界面组件添加一些特性，如边框，或一些行为，如窗口滚动。

使用继承机制是添加功能的一种有效途径，从其他类继承过来的边框特性可以被多个子类的实例所使用。但这种方法不够灵活，因为边框的选择是静态的，用户不能控制对组件加边框的方式和时机。

一种较为灵活的方式是将组件嵌入另一个对象中，由这个对象添加边框。称这个嵌入的对象为**装饰**。这个装饰与它所装饰的组件接口一致，因此它对使用该组件的客户透明。

![](/Users/moyee/ant-repo/github/designPatterns/patterns/decorator/doc/decorator-demo.png)

ScrollDecorator和BorderDecorator类是Decorator类的子类。Decorator类是一个可视组件的抽象类，用于装饰其他可视组件。

VisualComponent是一个描述可视对象的抽象类，它定义了绘制和事件处理的接口。注意Decorator类怎样将绘制请求简单地发送给它的组件，以及Decorator的子类如何扩展这个操作。

Decorator的子类为特定功能可以自由地添加一些操作。

#### 3、适用性

以下情况使用Decorator模式：

- 在不影响其他对象的情况下，以动态、透明的方式给某个对象添加职责；
- 处理那些可以撤销的职责；
- 当不能采用生成子类的方法进行扩充时：一种情况是可能有大量独立的扩展，为支持每一种组合将产生大量的子类，使得子类数目呈爆炸式增长，另一种情况可能是因为类定义被隐藏，或类定义不能用于生成子类。

#### 4、结构

![](/Users/moyee/ant-repo/github/designPatterns/patterns/decorator/doc/decorator.png)

#### 5、参与者

- Component（VisualComponent）：定义一个对象接口，可以给这些对象动态地添加职责；
- ConcreteComponent（TextView）：定义一个对象，可以给这个对象添加一些职责；
- Decorator：维持一个指向Component对象的指针，并定义一个与Component接口一致的接口；
- ConcreteDecorator（BorderDecorator）：向组件添加职责。

#### 6、协作

Decorator将请求转发给它的Component对象，并有可能在转发请求前后执行一些附加的动作。

#### 7、效果

Decorator模式至少有两个主要优点和两个缺点：

1. 比静态继承更灵活；
2. 避免在层次结构高层的类有太多的特征；
3. Decorator与它的Component不一样：Decorator是一个透明的包装，如果我们从对象标识的观点出发，一个被装饰了的组件与这个组件是有差别的，因此，使用装饰时不应该依赖对象标识；
4. 有许多小对象。

#### 8、实现

使用Decorator模式时应该注意以下几点：

1. 接口的一致性：装饰对象的接口必须与它所装饰的Component的接口是一致的，所以所有的ConcreteDecorator类必须有一个公共的父类；
2. 省略抽象的Decorator类：当需要添加一个职责时，没有必要定义抽象的Decorator类；
3. 保持Component类的简单性；
4. 改变对象外壳和改变对象内核：将Decorator看作一个对象的外壳，它可以改变这个对象的行为，另一种方法是改变对象的内核，Strategy模式就是一个用于改变内核的模式。

