### Proxy

代理模式——对象结构型模式。

#### 1、意图

为其他对象提供一种代理以控制对这个对象的访问。

#### 2、动机

对一个对象进行访问控制的一个原因是为了只有在我们确实需要这个对象时才对它进行创建和初始化。

对于每一个开销很大的对象，应该根据需要进行创建，当一个图像变为可见时会产生这样的需要。在文档中我们用什么来代替这个图像呢？解决方案是使用另一个对象，即图像Proxy，替代那个真正的图像。Proxy可以代替一个图像对象，并且在需要时负责实例化这个图像对象。

![](/Users/moyee/ant-repo/github/designPatterns/patterns/Proxy/doc/proxy-demo.png)

#### 3、适用性

在需要用比较通用和复杂的对象指针代替简单的指针的时候，使用Proxy模式。

1. 远程代理（Remote Proxy）为一个对象在不同的地址空间提供局部代表；
2. 虚代理（Virtual Proxy）根据需要创建开销很大的对象；
3. 保护代理（Protection Proxy）控制对原始对象的访问，保护代理用于对象应该有不同的访问权限的时候；
4. 智能指引（Smart Reference）取代了简单的指针，它在访问对象时执行一些附加操作，典型用途包括：
   1. 对指向实际对象的引用计数，这样当该对象没有引用时，可以自动释放它；
   2. 当第一次引用一个持久对象时，将它装入内存；
   3. 在访问一个实际对象前，检查是否已经锁定了它，以确保其它对象不能被改变它。

#### 4、结构

![](/Users/moyee/ant-repo/github/designPatterns/patterns/Proxy/doc/proxy.png)

#### 5、参与者

- Proxy（ImageProxy）：
  - 保存一个引用使得代理可以访问实体，若RealSubject和Subject的接口相同，Proxy会引用Subject；
  - 提供一个与Subject的接口相同的接口，这样代理就可以用来替代实体；
  - 控制对实体的存取，并可能负责创建和删除它；
  - 其他功能依赖于代理的类型；
  - Remote Proxy负责对请求及其参数进行编码，并向不同地址空间中的实体发送已编码的请求；
  - Virtual Proxy可以缓存实体的附加信息，以便延迟对它的访问；
  - Protection Proxy检查调用者是否具有实现一个请求所必需的访问权限。
- Subject（Graphic）：定义RealSubject和Proxy的共用接口，这样就使得任何使用RealSubject的地方都可以使用Proxy；
- RealSubject（Image）：定义Proxy所代表的实体。

#### 6、协作

代理根据其种类，在适当的时候向RealSubject转发请求。

#### 7、效果

Proxy模式在访问对象时引入了一定程度的间接性。根据代理的类型，附加的间接性有多种用途：

1. Remote Proxy可以隐藏一个对象存在于不同地址空间的事实；
2. Virtual Proxy可以进行最优化，如根据要求创建对象；
3. Protection Proxy和Smart Reference都允许在访问一个对象时有一些附加的内务处理。

#### 8、实现

Proxy模式可以利用以下一些语言特性：

1. 重载C++中的存取运算符；
2. Proxy并不总是需要知道实体的类型。