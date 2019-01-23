### Bridge

桥接模式——对象结构性模式。

#### 1、意图

将抽象部分与它的实现部分分离，使它们都可以独立地变化。

#### 2、动机

当一个抽象可能有多个实现时，通常用继承来协调它们。抽象类定义对该抽象的接口，而具体的子类则用不同方式加以实现。但是此方法有时不够灵活，继承机制将抽象部分与它的实现部分固定在一起，使得难以对抽象部分和实现部分独立地进行修改、扩充和重用。

考虑一个用户界面工具箱中，一个可移植的Window抽象部分的实现。例如，这一抽象部分应该允许用户开发一些在X Window System和IBM的Presentation Manager（PM）系统中都可以使用的应用程序。运用继承机制，我们可以定义Window抽象类和它的两个子类XWindow与PMWindow，由它们分别实现不同系统平台上的Window界面。但继承机制有两个不足之处：

- 扩展Window抽象使之适用于不同种类的窗口或新的系统平台很不方便。假设有Window的一个子类IconWindow，它专门将Window抽象用于图标处理。为了使IconWindow支持两个系统平台，我们必须实现两个新类XIconWindow和PMIconWindow，更为糟糕的是，我们不得不为每一种类型的窗口都定义两个雷。而为了支持第三个系统平台我们还必须为每一种窗口定义一个新的Window子类，如下图所示：

  ![](/Users/moyee/ant-repo/github/designPatterns/patterns/Bridge/doc/Bridge-demo.png)

- 继承机制使得客户代码与平台相关。每当客户创建一个窗口时，必须要实例化一个具体的类，这个类有特定的实现部分。例如，创建Xwindow对象会将Window抽象与X Window的实现部分绑定起来，这使得客户程序依赖于X Window的实现部分，这将使得很难将客户代码移植到其他平台上去。

客户在创建窗口时应该不涉及到其具体实现部分。仅仅是窗口的实现部分依赖于应用运行的平台。这样客户代码在创建窗口时就不应涉及到特定的平台。

Bridge模式解决以上问题的方法是，将Window抽象和它的实现部分分别放在独立的类层次结构中。其中一个类层次结构针对窗口接口（Window、IconWindow、TransientWindow），另外一个独立的类层次结构针对平台相关的窗口实现部分，这个类层次结构的根类为WindowImpl。如XwindowImpl子类提供了一个基于X Window系统的实现，如下图所示：

![](/Users/moyee/ant-repo/github/designPatterns/patterns/Bridge/doc/Bridge-anli.png)

对Window子类的所有操作都是用WindowImpl接口中的抽象操作实现的。这就将窗口的抽象与系统平台相关的实现部分分离开来。因此，我们将Window与WindowImpl之间的关系称之为**桥接**，因为它在抽象类与它的实现之间起到了桥梁作用，使它们可以独立地变化。

#### 3、适用性

以下一些情况使用Bridge模式：

- 不希望在抽象与它的实现部分之间有一个固定的绑定关系；
- 类的抽象以及它的实现都应该可以通过生成子类的方法加以扩充，这时Bridge模式使你可以对不同的抽象接口和实现部分进行组合，并分别对它们进行扩充；
- 对一个抽象的实现部分的修改应对客户不产生影响，即客户的代码不必重新编译；
- 想对客户完全隐藏抽象的实现部分；
- 有许多类要生成，这样一种类层次结构说明你必须将一个对象分解成两个部分；
- 想在多个对象间共享实现，但同时要求客户并不知道这一点。

#### 4、结构

![](/Users/moyee/ant-repo/github/designPatterns/patterns/Bridge/doc/Bridge.png)

#### 5、参与者

- Abstraction（Window）：
  - 定义抽象类的接口；
  - 维护一个指向Implementor类型对象的指针。
- RefinedAbstraction（IconWindow）：扩充由Abstraction定义的接口；
- Implementor（WindowImpl）：定义实现类的接口，该接口不一定要与Abstraction的接口完全一致；事实上这两个接口可以完全不同。一般来讲，Implementor接口仅提供基本操作，而Abstraction则定义了基于这些基本操作的较高层次的操作；
- ConcreteImplementor（XWindowImpl，PMWindowImpl）：实现Implementor接口并定义它的具体实现。

#### 6、协作

Abstraction将Client的请求转发给它的Implementor对象。

#### 7、效果

Bridge模式有以下一些优点：

- 分离接口及其实现部分：一个实现未必不变地绑定在一个接口上。抽象类的实现可以在运行时刻进行配置，一个对象甚至可以在运行时刻改变它的实现；
- 提高可扩充性：可以独立地对Abstraction和Implementor层次结构进行扩充；
- 实现细节对客户透明：可以对客户隐藏实现细节。

#### 8、实现

使用Bridge模式时需要注意以下问题：

- 仅有一个Implementor：在仅有一个实现的时候，没有必要创建一个抽象的Implementor类。这是Bridge模式的退化情况，在Abstraction与Implementor之间有一种一对一的关系。尽管如此，当你希望改变一个类的实现不会影响已有的客户程序时，模式的分离机制还是非常有用的：不必编译，只需重新连接即可；
- 创建正确的Implementor对象：当存在多个Implementor类的时候，如果Abstraction知道所有的ConcreteImplementor类，它就可以在它的构造器中对其中的一个类进行初始化，它可以通过传递给构造器的参数确定实例化哪一个类；另一种方法是首先选择一个缺省的实现，然后根据需要改变这个实现；也可以代理给另一个对象，由它一次决定；
- 共享Implementor对象；
- 采用多重继承机制。