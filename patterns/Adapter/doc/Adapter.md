### Adapter

适配器——类对象结构性模式。

#### 1、意图

将一个类的接口转换成客户希望的另外一个接口。Adapter模式使得原本由于接口不兼容而不能一起工作的那些类可以一起工作。

#### 2、别名

包装器Wrapper。

#### 3、动机

有时，为复用而设计的工具箱类不希望能被复用的原因仅仅是因为它的接口与专业应用领域所需要的接口不匹配。

有一个绘图编辑器，允许用户绘制和排列基本图元生成图片和图表。这个绘图编辑器的关键抽象是图形对象。图形对象有一个可编辑的形状，并可以绘制自身。图形对象的接口由一个称为Shape的抽象类定义。绘图编辑器为每一种图形对象定义了一个Shape的子类：LineShape类对应于直线，PolygonShape类对应于多边形，等等。

像LineShape和PolygonShape这样的基本几何图形的类比较容易实现，这是由于它们的绘图和编辑功能本来就很有限。但是对于可以显示和编辑正文的TextShape子类来说，实现相当困难，因为即使是基本的正文编辑也要涉及到复杂的屏幕刷新和缓冲区管理。同时，成品的用户界面工具箱可能已经提供了一个复杂的TextView类用于显示和编辑正文。理想的情况是可以复用这个TextView类以实现TextShape类，但当时的设计并没有考虑到Shape的存在，因此TextView和Shape对象不能互换。

针对上面的问题，可以定义一个TextShape类，由它来适配TextView的接口和Shape的接口。可以用两种方法做这件事：

- 继承Shape类的接口和TextView的实现；
- 将一个TextView实例作为TextShape的组成部分，并且使用TextView的接口实现TextShape。

这两种方法恰恰对应于Adapter模式的类和对象版本，我们将TextShape称之为适配器Adapter。

![](/Users/moyee/ant-repo/github/designPatterns/patterns/Adapter/doc/Adapter实例.png)

上面的类图说明了对象适配器实例。它说明了在Shape类中声名的BoundingBox请求如何被转换成在TextView类中定义的GetExtent请求。由于TextShape将TextView的接口与Shape的接口进行了匹配，因此绘图编辑器就可以复用原先并不兼容的TextView类。

Adapter时常还要负责提供那些被匹配的类所没有提供的功能，上面的类图中说明了适配器如何实现这些职责。由于绘图编辑器允许用户交互的将每一个Shape对象“拖动”到一个新的位置，而TextView设计中没有这个功能。我们可以实现TextShape类的createManipulator操作，从而增加这个缺少的功能，这个操作返回相应的Manipulator子类的一个实例。Manipulator是一个抽象类，它所描述的对象知道驱动Shape类响应相应的用户输入，例如将图形拖动到一个新的位置。对应于不同形状的图形，Manipulator有不同的子类。TextShape通过返回一个TextManipulator实例，增加了TextView种缺少而Shape需要的功能。

#### 4、适用性

以下情况使用Adapter模式：

- 想使用一个已经存在的类，而它的接口不符合需求；
- 想创建一个可以复用的类，该类可以与其他不相关的类或不可预见的类协同工作；
- （仅适用于对象Adapter）想使用一些已经存在的子类，但是不可能为每一个都进行子类化以匹配它们的接口。对象适配器可以适配它的父类接口。

#### 5、结构

类适配器使用多重继承对一个接口与另一个接口进行匹配，如下图所示：

![](/Users/moyee/ant-repo/github/designPatterns/patterns/Adapter/doc/Adapter.png)

对象匹配器依赖于对象组合，如下所示：

![](/Users/moyee/ant-repo/github/designPatterns/patterns/Adapter/doc/Adapter-obj.png)

#### 6、参与者

- Target（Shape）：定义Client使用的与特定领域相关的接口；
- Client（DrawingEditor）：与符合Target接口的对象协同；
- Adaptee（TextView）：定义一个已经存在的接口，这个接口需要适配；
- Adapter（TextShape）：对Adaptee的接口与Target接口进行适配。

#### 7、协作

Client在Adapter实例上调用一些操作，接着适配器调用Adaptee的操作实现这个请求。

#### 8、效果

类适配器和对象适配器有不同的权衡。

**类适配器：**

- 用一个具体的Adapter类对Adaptee和Target进行匹配，结果是当我们想要匹配一个类以及所有它的子类时，类Adapter将不能胜任；
- 使用Adapter可以重定义Adaptee的部分行为，因为Adapter是Adaptee的一个子类；
- 仅仅引入了一个对象，并不需要额外的指针以间接得到adaptee。

**对象适配器：**

- 允许一个Adapter与多个Adaptee——即Adaptee本身以及它的所有子类同时工作，Adapter也可以一次给所有的Adaptee添加功能；
- 使得重定义Adaptee的行为比较困难。需要生成Adaptee的子类并且使得Adapter引用这个子类而不是引用Adaptee本身。

使用Adapter模式时需要考虑的一些因素：

- Adapter的匹配程度：对Adaptee的接口与Target的接口进行匹配的工作量各个Adapter可能不一样。工作范围可能是，从简单的接口转换到支持完全不同的操作集合。Adapter的工作量取决于Target接口与Adaptee接口的相似程度；
- 可插入的Adapter：当其他的类使用一个类时，如果所需的假定条件越少，这个类就更具有可复用性。如果将接口匹配构建为一个类，就不需要假定对其他的类可见的是一个相同的接口。也就是说，接口匹配使得我们可以将自己的类加入到一些现有的系统中去，而这些系统对这个类的接口可能会有所不同；
- 使用双向适配器提供透明操作：使用适配器的一个潜在问题是，它们不对所有的客户都透明。被适配的对象不再兼容Adaptee的接口，因此并不是所有Adaptee对象可以被使用的地方它都可以被使用。双向适配器提供了这样的透明性。在两个不同的客户需要用不同的方式查看同一个对象时，双向适配器尤其有用。

#### 9、实现

尽管Adapter模式的实现方式通常简单直接，但是仍需要注意以下问题：

- 使用C++实现适配器类：在使用C++实现适配器类时，Adapter类应该采用公共方式继承Target类，并且用私有方式继承Adaptee类。因此，Adapter类应该是Target的子类型，但不是Adaptee的子类型；
- 可插入的适配器：有许多方法可以实现可插入的适配器。首先为Adaptee找到一个窄接口，即可用于适配的最小操作集。因为包含较少操作的窄接口相对包含较多操作的宽接口比较容易进行匹配。对于这个窄接口，有以下三个实现途径：
  - 使用抽象操作；
  - 使用代理对象；
  - 参数化适配器：模块构造支持无子类化的适配，一个模块可以匹配一个请求，并且适配器可以为每个请求存储一个模块。

Manip